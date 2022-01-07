import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import {
    IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class AuthAdminDto {
    readonly id: bigint;

    name: string;

    email: string;

    @Transform((value) => !!value)
    password: string;

    @Exclude()
    email_verification_token: string;

    @Exclude()
    confirmation_otp: string;

    is_email_verified: boolean;

    is_active: boolean;

    @Exclude()
    created_at: string;

    @Exclude()
    updated_at: string;

    @Exclude()
    deleted_at: string;

    constructor(partial?: Partial<AuthAdminDto>) {
        Object.assign(this, partial);
    }
}

export class AuthAdminLoginDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}

export class AuthAdminRegisterDto {
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
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) =>
        value === true || value === 'true' ? true : false,
    )
    is_active: boolean;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) =>
        value === true || value === 'true' ? true : false,
    )
    is_email_verified: boolean;
}

export class AuthEmailVerifyParam {
    @ApiProperty()
    @IsString()
    token: string;
}

export class AuthSendEmailOtp {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}

export class AuthForgotPassword {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    otp: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    confirm_password: string;
}

export class GenerateTokenUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    identifier_id: string;
}

export class DecodeBasicAuthResult {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;
}
