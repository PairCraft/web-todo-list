const BASE_URL = 'http://localhost:3000';

export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500
}

export class ErrorData {
    status: HttpStatus;
    message: string;

    constructor(status: HttpStatus, message: string) {
        this.status = status;
        this.message = message;
    }
}

export async function fetchData<T>(url?: string, options?: RequestInit, isRequireAuth: boolean = false): Promise<T | undefined> {

    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    let auth = {};
    if (isRequireAuth) {
        const token = localStorage.getItem('token');
        auth = { Authorization: `Bearer ${token}` };
    }

    const headers = {
        ...defaultHeaders,
        ...options?.headers,
        ...auth
    };

    try {
        const response = await fetch(`${BASE_URL}/${url}`, { ...options, headers });

        if (!response.ok) {
            const errorBody = await response.json();
            const error = new ErrorData(response.status, errorBody.message);
            throw error;
        }

        if (response.status === HttpStatus.NO_CONTENT) {
            return undefined;
        }

        return await response.json() as T;
    } catch (error) {
        console.error(`Fetch error: ${error}`);
        throw (error);
    }
}