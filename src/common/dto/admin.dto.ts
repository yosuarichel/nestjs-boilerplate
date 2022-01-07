import {
    IsString,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsNumber,
    IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Pagination, AdminOrderBy, OrderType } from '@app/enums';

export class AdminDto {
    @ApiProperty({ type: Number })
    readonly id?: bigint;

    @ApiProperty({ type: Number })
    role_id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    @Transform((value) => !!value)
    password: string;

    @ApiProperty()
    email_verification_token?: string;

    @ApiProperty()
    confirmation_otp?: string;

    @ApiProperty()
    is_email_verified?: boolean;

    @ApiProperty()
    is_active?: boolean;

    @ApiProperty()
    created_at?: string;

    @ApiProperty()
    updated_at?: string;

    @ApiProperty()
    deleted_at?: string;

    constructor(partial?: Partial<AdminDto>) {
        Object.assign(this, partial);
    }
}

export class AdminParamDto {
    @ApiProperty()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    readonly id: number;
}

export class AdminQueryDto {
    @ApiProperty()
    @IsOptional()
    @IsEnum(Pagination)
    pagination: Pagination;

    @ApiProperty()
    @IsOptional()
    @IsNumberString()
    page: number;

    @ApiProperty()
    @IsOptional()
    @IsNumberString()
    row: number;

    @ApiProperty()
    @IsOptional()
    @IsEnum(AdminOrderBy)
    order_by: AdminOrderBy;

    @ApiProperty()
    @IsOptional()
    @IsEnum(OrderType)
    order_type: OrderType;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) =>
        value === true || value === 'true' ? true : false,
    )
    active: boolean;

    @ApiProperty()
    @IsOptional()
    @IsString()
    search: string;
}

export class CreateAdminDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    role_id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    email_verification_token?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    confirmation_otp?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    @Transform(({ value }) =>
        value === true || value === 'true' ? true : false,
    )
    is_active?: boolean;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) =>
        value === true || value === 'true' ? true : false,
    )
    is_email_verified?: boolean;
}

export class UpdateAdminDto {
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    role_id: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    password?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    email_verification_token?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    confirmation_otp?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    @Transform(({ value }) =>
        value === true || value === 'true' ? true : false,
    )
    is_active?: boolean;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) =>
        value === true || value === 'true' ? true : false,
    )
    is_email_verified?: boolean;
}
