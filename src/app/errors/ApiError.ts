export interface ApiOriginalError {
    message?: string;
    code?: number;
    data?: Record<string, unknown>;
}

export class ApiError extends Error {
    public originalStatusCode: number;

    public originalError: ApiOriginalError;

    constructor(error: { originalError: ApiOriginalError; originalStatusCode: number }) {
        const originalError = error.originalError || {};
        super(originalError.message);
        this.originalStatusCode = error.originalStatusCode;
        this.originalError = originalError;
    }
}
