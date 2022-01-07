import {
    BadRequestException,
    HttpException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { Response } from '@app/interfaces';

export class ResponseException extends HttpException {
    constructor(public responseData: Response, status: number) {
        super(responseData, status);
        this.responseData = {
            status: this.getStatus(),
            ...responseData,
        };
    }
}

export class BadRequestCustomException extends BadRequestException {
    constructor(response: Response) {
        super(response);
    }
}

export class UnauthorizedCustomException extends UnauthorizedException {
    constructor(response: Response) {
        super(response);
    }
}

export class NotFoundCustomException extends NotFoundException {
    constructor(response: Response) {
        super(response);
    }
}

export class UnprocessableEntityCustomException extends UnprocessableEntityException {
    constructor(response: Response) {
        super(response);
    }
}

export class InternalServerErrorCustomException extends InternalServerErrorException {
    constructor(response: Response) {
        super(response);
    }
}

export class ServiceUnavailableCustomException extends ServiceUnavailableException {
    constructor(response: Response) {
        super(response);
    }
}
