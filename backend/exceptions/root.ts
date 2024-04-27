export class HttpException extends Error {
    message: string;
    errorCode: ErrorCode;
    statusCode: number;
    errors: any;

    constructor(message: string, errorCode: ErrorCode, statusCode: number, errors: any) {
        super(message)
        this.message = message
        this.errorCode = errorCode
        this.statusCode = statusCode
        this.errors = errors
    }
}

export enum ErrorCode {
    COMPANY_NOT_FOUND = 2001,
    COMPANY_ALREADY_EXIST = 2002,
    COMPANY_CODE_ALREADY_IN_USE = 2005,
    COMPANY_DESCRIPTION_ALREADY_IN_USE = 2006,
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXIST = 1002,
    INCORRECT_PASSWORD = 1003,
    ROLE_NOT_FOUND = 1004,
    CODE_ALREADY_IN_USE = 1005,
    EMAIL_ALREADY_IN_USE = 1006,
    UNPROCESSABLE_ENTITY = 20001,
    INTERNAL_EXCEPTION = 500,
    BAD_REQUEST_EXCEPTION = 400,
    NOT_FOUND_EXCEPTION = 404,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403
}