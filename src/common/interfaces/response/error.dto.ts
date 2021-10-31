export class ErrorDTO {
    message: string;
    code: string;
    details: string;
    constructor(err: Error | string, code?: string, message?: string) {

        this.code = code;
        this.message = message;

        if (typeof err === 'string') {
            this.details = err;
            return;
        }
        // err is Error
        this.details = err.stack ? err.stack : err.message;
    }
}