import {
    IsString,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsNumber,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Pagination, LogOrderBy, OrderType } from '@app/enums';

export class LogDto {
    readonly id?: number;

    description: boolean;

    created_at?: string;

    constructor(partial?: Partial<LogDto>) {
        Object.assign(this, partial);
    }
}

export class LogParamDto {
    @ApiProperty()
    @IsString()
    id: string;
}

export class LogQueryDto {
    @ApiProperty()
    @IsOptional()
    @IsEnum(Pagination)
    pagination: Pagination;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    page: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    row: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsEnum(LogOrderBy)
    order_by: LogOrderBy;

    @ApiProperty()
    @IsOptional()
    @IsEnum(OrderType)
    order_type: OrderType;
}
export class CreateLogDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;
}

export class UpdateLogDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    description?: string;
}
