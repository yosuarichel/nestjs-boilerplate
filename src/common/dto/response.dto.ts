import { ApiProperty } from '@nestjs/swagger';
import { Response } from '@app/interfaces';

export class ResponseDto implements Response {
    @ApiProperty()
    status?: number;

    @ApiProperty()
    code: number | string;

    @ApiProperty()
    message: string;

    @ApiProperty()
    result?: any;

    constructor(partial?: Partial<ResponseDto>) {
        Object.assign(this, partial);
    }
}

export class FindAndCountAllDto<Type> {
    @ApiProperty()
    count: number;

    @ApiProperty()
    rows: Type[];

    constructor(partial?: Partial<FindAndCountAllDto<Type>>) {
        Object.assign(this, partial);
    }
}
