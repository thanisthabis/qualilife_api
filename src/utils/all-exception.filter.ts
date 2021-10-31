import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { fromError } from 'src/common/interfaces';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {

    private readonly logger = new Logger(AllExceptionFilter.name);
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    catch(exception: any, host: ArgumentsHost) {
        // Log handdle error
        this.logger.error(exception);

        let res = exception

        if(exception.response.message != undefined) {
            res = exception.response
        }

        const payload = fromError(res.message, res.status);

        const ctx = host.switchToHttp();
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        if(exception instanceof HttpException) status = (<HttpException>exception).getStatus();
        const response = ctx.getResponse<Response>();
        response
            .status(status)
            .json(payload);
    }    
}