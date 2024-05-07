export type HttpClientConfig = {
    headers: [string, string][] | Record<string, string> | Headers;
    credentials: RequestCredentials | string;
};
