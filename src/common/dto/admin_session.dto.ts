import { Transform } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsBoolean,
    IsOptional,
    IsDate,
} from 'class-validator';

export class AdminSessionDto {
    readonly id?: bigint;

    admin_id: bigint;

    session: string;

    is_logged_in: boolean;

    expiry_value: number;

    expired_at: string;

    created_at?: string;

    updated_at?: string;

    deleted_at?: string;

    constructor(partial?: Partial<AdminSessionDto>) {
        Object.assign(this, partial);
    }
}

export class CreateAdminSessionDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    admin_id: bigint;

    @IsNotEmpty()
    @IsString()
    session: string;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    expiry_value: number;

    @IsNotEmpty()
    @Transform(({ value }) =>
        value === true || value === 'true' ? true : false,
    )
    @IsBoolean()
    is_logged_in: boolean;

    @IsNotEmpty()
    @IsDate()
    expired_at: string;
}

export class UpdateAdminSessionDto {
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    admin_id?: bigint;

    @IsOptional()
    @IsString()
    session?: string;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    expiry_value?: number;

    @IsOptional()
    @Transform(({ value }) =>
        value === true || value === 'true' ? true : false,
    )
    @IsBoolean()
    is_logged_in?: boolean;

    @IsOptional()
    @IsDate()
    expired_at?: string;
}
