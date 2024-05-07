import { ApiError } from 'src/app/errors';
import { HttpClientConfig } from './HttpClientConfig';

type Request = {
    url: string;
    method: string;
    headers?: Record<string, string>;
    body?: unknown;
};

class HttpClient {
    private initalConfig: Partial<HttpClientConfig>;

    private refreshAccessJob: Promise<void> | null = null;

    private unauthorizedListeners: Array<() => void> = [];

    constructor(
        private readonly apiUrl: string,
        private readonly prefix: string,
        passedConfig: Partial<HttpClientConfig> = {},
    ) {
        const defaultConfig: HttpClientConfig = {
            headers: {
                'content-type': 'application/json',
            },
            credentials: 'include',
        };

        const headers = passedConfig.headers || defaultConfig.headers;
        this.initalConfig = { headers };

        if (passedConfig.credentials === '') return;
        this.initalConfig.credentials = passedConfig.credentials || defaultConfig.credentials;
    }

    onUnauthorized(listener: () => void) {
        this.unauthorizedListeners.push(listener);
    }

    async get<ResponseType = any>(url: string) {
        return this.request<ResponseType>({
            url,
            method: 'GET',
        });
    }

    async post<
        PayloadType = any,
        ResponseType = any,
        HeadersType extends Record<string, string> = any,
    >(url: string, payload: PayloadType, headers?: HeadersType) {
        return this.request<ResponseType>({
            url,
            method: 'POST',
            body: payload,
            headers,
        });
    }

    async put<
        PayloadType = any,
        ResponseType = any,
        HeadersType extends Record<string, string> = any,
    >(url: string, payload: PayloadType, headers?: HeadersType) {
        return this.request<ResponseType>({
            url,
            method: 'PUT',
            body: payload,
            headers,
        });
    }

    private async request<ResponseType>(reqPayload: Request): Promise<ResponseType> {
        try {
            return await this.rawRequest<ResponseType>(reqPayload);
        } catch (err) {
            if (!(err instanceof ApiError) || err.originalStatusCode !== 403) {
                throw err;
            }

            await this.refreshAccess();
            return this.rawRequest<ResponseType>(reqPayload);
        }
    }

    private async rawRequest<ResponseType>({
        url,
        method,
        headers,
        body,
    }: Request): Promise<ResponseType> {
        const accessToken = this.getAccessToken();

        const mergedConfig = {
            ...this.initalConfig,
            method,
            headers: {
                Authorization: accessToken ? `Bearer ${accessToken}` : '',
                ...this.initalConfig.headers,
                ...headers,
            },
        };
        //@ts-ignore
        const isJsonContentType = mergedConfig.headers['content-type'] === 'application/json';
        console.log(mergedConfig);
        const response = await fetch(`${this.apiUrl}${this.prefix}${url}`, {
            ...mergedConfig,
            //@ts-ignore
            body: isJsonContentType ? JSON.stringify(body) : body,
        });

        const json = await response.json();

        const isJsonDataExist = Array.isArray(json.data) ? !!json.data.length : !!json.data;

        if (!json.result && !isJsonDataExist) {
            throw new ApiError({
                originalError: json.error,
                originalStatusCode: response.status,
            });
        }

        return json.data ? json.data : json;
    }

    private getAccessToken(): string | null {
        return localStorage.getItem('accessToken');
    }

    private getRefreshToken(): string | null {
        return localStorage.getItem('refreshToken');
    }

    private async refreshAccess(): Promise<void> {
        if (this.refreshAccessJob) return this.refreshAccessJob;

        const refreshToken = this.getRefreshToken();

        if (refreshToken === null) {
            return;
        }

        this.refreshAccessJob = this.rawRequest<void>({
            url: '/auth/refresh',
            method: 'POST',
            body: {
                refreshToken,
            },
        })
            .catch((err) => {
                this.notifyUnauthorized();

                throw err;
            })
            .finally(() => {
                this.refreshAccessJob = null;
            });

        return this.refreshAccessJob;
    }

    private notifyUnauthorized() {
        this.unauthorizedListeners.forEach((listener) => {
            try {
                listener();
            } catch (err) {
                console.error(err);
            }
        });
    }
}

export default HttpClient;
