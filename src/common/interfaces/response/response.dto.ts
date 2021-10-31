import { ErrorDTO } from "./error.dto";

// export class ResponseDTO<T, E extends ErrorDTO = ErrorDTO>{
//     data: T;
//     limit: number;
//     offset: number;
//     errors: E;
//     message: string;
//     constructor(data: T = null, limit = 25, offset = 0, errors: E = null, message = "None") {
//         this.data = data;
//         this.limit = limit;
//         this.offset = offset;
//         this.errors = errors;
//         this.message = message;
//     }
// }

export class ResponseDTO<T>{
    data: T;
    message: string;
    constructor(data: T = null, message = "None") {
        this.data = data;
        this.message = message;
    }
}

export class ResponseOffsetDTO<T>{
    data: T;
    limit: number;
    offset: number;
    message: string;
    constructor(data: T = null, limit = 25, offset = 0, message = "None") {
        this.data = data;
        this.limit = limit;
        this.offset = offset;
        this.message = message;
    }
}

export const fromError = <T>(err: Error | string, code?: string, message?:string): ErrorDTO => new ErrorDTO(err, code ? code : 'NA', message ? message : 'Fail');