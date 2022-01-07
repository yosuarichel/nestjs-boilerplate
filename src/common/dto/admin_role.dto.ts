import {
    IsString,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { AdminRoleOrderBy, OrderType, Pagination } from '@app/enums';

export class AdminRoleDto {
    readonly id?: number;
    name: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;

    constructor(partial?: Partial<AdminRoleDto>) {
        Object.assign(this, partial);
    }
}

export class AdminRoleParamDto {
    @ApiProperty()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    readonly id: number;
}

export class AdminRoleQueryDto {
    @ApiProperty()
    @IsOptional()
    @IsEnum(Pagination)
    pagination?: Pagination;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    page?: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    row?: number;

    @ApiProperty()
    @IsOptional()
    @IsEnum(AdminRoleOrderBy)
    order_by?: AdminRoleOrderBy;

    @ApiProperty()
    @IsOptional()
    @IsEnum(OrderType)
    order_type?: OrderType;

    @ApiProperty()
    @IsOptional()
    @IsString()
    search?: string;
}

export class CreateAdminRoleDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.toUpperCase())
    readonly name: string;
}

export class UpdateAdminRoleDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.toUpperCase())
    readonly name?: string;
}
