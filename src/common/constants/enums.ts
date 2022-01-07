export enum ErrorCodePrefix {
    NOT_FOUND = '00',
    REQUIRED = '01',
    DUPLICATE = '02',
    INVALID = '03',
    MISSING = '04',
    FAILED = '05',
    DEFAULT = '111',
}

export enum Os {
    android = 'android',
    iphone = 'iphone',
    ipad = 'ipad',
}

export enum Gender {
    m = 'm',
    f = 'f',
}

export enum AdminStatus {
    active = 'active',
    inactive = 'inactive',
}

export enum OrderType {
    asc = 'asc',
    desc = 'desc',
    ASC = 'ASC',
    DESC = 'DESC',
}

export enum Pagination {
    true = 'true',
    false = 'false',
}

export enum AdminRoles {
    Superadmin = 'superadmin',
    Admin = 'admin',
}

export enum SettingOrderBy {
    id = 'id',
    is_app_maintenance = 'is_app_maintenance',
    app_maintenance_message = 'app_maintenance_message',
    cms_expiry = 'cms_expiry',
    terms_and_conditions = 'terms_and_conditions',
    enabled_payment = 'enabled_payment',
    created_at = 'created_at',
    updated_at = 'updated_at',
    deleted_at = 'deleted_at',
}

export enum Admin {
    id = 'id',
    name = 'name',
    email = 'email',
    password = 'password',
    is_active = 'is_active',
    created_at = 'created_at',
    updated_at = 'updated_at',
    deleted_at = 'deleted_at',
}

export enum AdminRoleOrderBy {
    id = 'id',
    name = 'name',
    created_at = 'created_at',
    updated_at = 'updated_at',
    deleted_at = 'deleted_at',
}

export enum AdminOrderBy {
    id = 'id',
    role_id = 'role_id',
    name = 'name',
    email = 'email',
    password = 'password',
    email_verification_token = 'email_verification_token',
    confirmation_otp = 'confirmation_otp',
    is_email_verified = 'is_email_verified',
    is_active = 'is_active',
    created_at = 'created_at',
    updated_at = 'updated_at',
    deleted_at = 'deleted_at',
}

export enum UserOrderBy {
    id = 'id',
    platform_id = 'platform_id',
    foreign_user_id = 'foreign_user_id',
    created_at = 'created_at',
    updated_at = 'updated_at',
    deleted_at = 'deleted_at',
}

export enum LogOrderBy {
    id = 'id',
    description = 'platform_id',
    created_at = 'created_at',
}
