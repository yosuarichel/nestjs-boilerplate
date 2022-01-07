import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
    ForbiddenException,
    HttpStatus,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
    UnprocessableEntityException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as _ from 'lodash';
import * as Sentry from '@sentry/minimal';
import {
    API_NOT_FOUND,
    BAD_REQUEST,
    FORBIDDEN,
    SERVICE_NOT_AVAILABE,
    SYSTEM_ERROR,
    UNAUTHORIZED,
    VALIDATION_ERROR,
} from 'src/common/constants/error_codes';
import { ResponseException } from '@app/exceptions';
import { Response } from '@app/interfaces';

@Catch()
export class ErrorResponseFilter implements ExceptionFilter {
    async catch(exception: any, host: ArgumentsHost): Promise<any> {
        const context = host.switchToHttp();
        const request = context.getRequest();
        const response = context.getResponse();
        if (!_.isEmpty(request.files)) {
            await Promise.all(
                request.files.map(async (x: Express.Multer.File) => {
                    if (fs.existsSync(x.path)) fs.unlinkSync(x.path);
                }),
            );
        }
        if (!_.isEmpty(request.file)) {
            if (fs.existsSync(request.file.path))
                fs.unlinkSync(request.file.path);
        }

        if (exception instanceof ResponseException) {
            return response
                .status(exception.getStatus())
                .json(exception.responseData);
        }
        if (exception instanceof BadRequestException) {
            const res = exception.getResponse() as Response;
            return response.status(exception.getStatus()).json({
                status: exception.getStatus(),
                code: res.code || BAD_REQUEST.code,
                message: res.message || BAD_REQUEST.message,
                result: res.result,
            });
        }
        if (exception instanceof UnauthorizedException) {
            const res = exception.getResponse() as Response;
            return response.status(exception.getStatus()).json({
                status: exception.getStatus(),
                code: res.code || UNAUTHORIZED.code,
                message: res.message || UNAUTHORIZED.message,
                result: res.result,
            });
        }
        if (exception instanceof ForbiddenException) {
            const res = exception.getResponse() as Response;
            return response.status(exception.getStatus()).json({
                status: exception.getStatus(),
                code: res.code || FORBIDDEN.code,
                message: res.message || FORBIDDEN.message,
                result: res.result,
            });
        }
        if (exception instanceof NotFoundException) {
            const res = exception.getResponse() as Response;
            return response.status(exception.getStatus()).json({
                status: exception.getStatus(),
                code: res.code || API_NOT_FOUND.code,
                message: res.message || API_NOT_FOUND.message,
                result: res.result,
            });
        }
        if (exception instanceof UnprocessableEntityException) {
            const res = exception.getResponse() as Response;
            return response.status(exception.getStatus()).json({
                status: exception.getStatus(),
                code: res.code || VALIDATION_ERROR.code,
                message: res.message || VALIDATION_ERROR.message,
                result: res.result,
            });
        }
        if (exception instanceof ServiceUnavailableException) {
            const res = exception.getResponse() as Response;
            return response.status(exception.getStatus()).json({
                status: exception.getStatus(),
                code: res.code || SERVICE_NOT_AVAILABE.code,
                message: res.message || SERVICE_NOT_AVAILABE.message,
                result: res.result,
            });
        }
        if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.info('Exception response from error filter =>', exception);
        }
        Sentry.captureException(exception);
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            code: SYSTEM_ERROR.code,
            message: SYSTEM_ERROR.message,
        });
    }
}
