import {
    IsString,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsBoolean,
    IsNumber,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Pagination, SettingOrderBy, OrderType } from '@app/enums';

export class SettingDto {
    readonly id?: number;

    is_app_maintenance: boolean;

    app_maintenance_message: string;

    cms_expiry: string;

    app_expiry: string;

    terms_and_conditions: string;

    limit_balance_billfazz: number;

    limit_balance_aviana: number;

    created_at?: string;

    updated_at?: string;

    deleted_at?: string;

    constructor(partial?: Partial<SettingDto>) {
        Object.assign(this, partial);
    }
}

export class SettingParamDto {
    @ApiProperty()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    readonly id: number;
}

export class SettingQueryDto {
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
    @IsEnum(SettingOrderBy)
    order_by: SettingOrderBy;

    @ApiProperty()
    @IsOptional()
    @IsEnum(OrderType)
    order_type: OrderType;
}

export class CreateSettingDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    @Transform(({ value }) =>
        value === true || value === 'true' ? true : false,
    )
    is_app_maintenance: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    app_maintenance_message: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    cms_expiry: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    app_expiry: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    terms_and_conditions: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    limit_balance_billfazz: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    limit_balance_aviana: number;
}

export class UpdateSettingDto {
    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) =>
        value === true || value === 'true' ? true : false,
    )
    is_app_maintenance?: boolean;

    @ApiProperty()
    @IsOptional()
    @IsString()
    app_maintenance_message?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    cms_expiry?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    app_expiry?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    terms_and_conditions?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    limit_balance_billfazz?: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    limit_balance_aviana?: number;
}
