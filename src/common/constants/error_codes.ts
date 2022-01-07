import { ErrorCodePrefix } from '@app/enums';

// Request
export const UNAUTHORIZED = {
    code: 'UNAUTHORIZED',
    message: 'Unauthorized',
};
export const BAD_REQUEST = {
    code: 'BAD_REQUEST',
    message: 'Bad request',
};
export const FORBIDDEN = {
    code: 'FORBIDDEN',
    message: 'Forbidden',
};

// General Error
export const SYSTEM_ERROR = {
    code: `GE${ErrorCodePrefix.DEFAULT}1`,
    message: 'System error',
};
export const VALIDATION_ERROR = {
    code: `GE${ErrorCodePrefix.DEFAULT}2`,
    message: 'Validation error',
};
export const SYSTEM_MAINTENANCE = {
    code: `GE${ErrorCodePrefix.DEFAULT}3`,
    message: 'System maintenance',
};
export const SERVICE_NOT_AVAILABE = {
    code: `GE${ErrorCodePrefix.DEFAULT}4`,
    message: 'Service not available',
};
// -- Invalid
export const INVALID_DEVICE = {
    code: `GE${ErrorCodePrefix.INVALID}1`,
    message: 'Invalid device',
};
// -- Not Found
export const API_NOT_FOUND = {
    code: `GE${ErrorCodePrefix.NOT_FOUND}1`,
    message: 'Api not found',
};
export const USER_AGENT_NOT_FOUND = {
    code: `GE${ErrorCodePrefix.NOT_FOUND}2`,
    message: 'User agent not found',
};
export const USER_ID_NOT_FOUND = {
    code: `GE${ErrorCodePrefix.NOT_FOUND}3`,
    message: 'User id not found',
};
export const TYPE_NOT_FOUND = {
    code: `GE${ErrorCodePrefix.NOT_FOUND}4`,
    message: 'Type not found',
};
// -- Required
export const SESSION_REQUIRED = {
    code: `GE${ErrorCodePrefix.REQUIRED}1`,
    message: 'Session required',
};

// Auth Error
export const AUTHORIZATION_FAILED = {
    code: `AU${ErrorCodePrefix.DEFAULT}1`,
    message: 'Authorization failed',
};
export const MISSING_AUTHORIZATION_HEADER = {
    code: `AU${ErrorCodePrefix.DEFAULT}2`,
    message: 'Missing authorization header',
};
export const NOT_AUTHORIZED = {
    code: `AU${ErrorCodePrefix.DEFAULT}3`,
    message: 'Not authorized',
};
export const FORBIDDEN_REQUEST = {
    code: `AU${ErrorCodePrefix.DEFAULT}4`,
    message: 'Forbidden request',
};
export const INACTIVE_ACCOUNT = {
    code: `AU${ErrorCodePrefix.INVALID}5`,
    message: 'Inactive account',
};
export const UNAUTHORIZED_ROLE = {
    code: `AU${ErrorCodePrefix.DEFAULT}6`,
    message: 'Unauthorized role',
};
export const PERMISSION_NOT_ALLOWED = {
    code: `AU${ErrorCodePrefix.DEFAULT}7`,
    message: 'Permission not allowed',
};
export const INACTIVE_PLATFORM = {
    code: `AU${ErrorCodePrefix.DEFAULT}8`,
    message: 'Inactive platform',
};
export const EMAIL_NOT_VERIFIED = {
    code: `AU${ErrorCodePrefix.DEFAULT}9`,
    message: 'Email not verified',
};
export const ACCOUNT_NOT_REGISTERED = {
    code: `AU${ErrorCodePrefix.DEFAULT}10`,
    message: 'Account not registered',
};
export const WRONG_OTP = {
    code: `AU${ErrorCodePrefix.DEFAULT}11`,
    message: 'Wrong OTP',
};
// -- Invalid
export const INVALID_CONFIRMATION_PASSWORD = {
    code: `AU${ErrorCodePrefix.INVALID}1`,
    message: 'Invalid confirmation password',
};
export const INVALID_CREDENTIAL = {
    code: `AU${ErrorCodePrefix.INVALID}2`,
    message: 'Invalid credential',
};

// File Error
export const FILE_EXT_NOT_ALLOWED = {
    code: `FL${ErrorCodePrefix.DEFAULT}1`,
    message: 'File ext not allowed',
};
export const FILE_MUST_BE_IMAGE = {
    code: `FL${ErrorCodePrefix.DEFAULT}2`,
    message: 'File must be image',
};
export const FILE_MUST_BE_VALID_MEDIA = {
    code: `FL${ErrorCodePrefix.DEFAULT}3`,
    message: 'File must be valid media',
};
// -- Required
export const FILE_REQUIRED = {
    code: `FL${ErrorCodePrefix.REQUIRED}1`,
    message: 'File required',
};

// Admin Error
// -- Not Found
export const ADMIN_NOT_FOUND = {
    code: `AD${ErrorCodePrefix.NOT_FOUND}1`,
    message: 'Admin not found',
};
// -- Duplicate
export const ADMIN_USERNAME_ALREADY_USED = {
    code: `AD${ErrorCodePrefix.DUPLICATE}1`,
    message: 'Admin username already used',
};
export const ADMIN_EMAIL_ALREADY_USED = {
    code: `AD${ErrorCodePrefix.DUPLICATE}2`,
    message: 'Admin email already used',
};

// Role Error
// -- Not Found
export const ROLE_NOT_FOUND = {
    code: `RL${ErrorCodePrefix.NOT_FOUND}1`,
    message: 'Role not found',
};
// -- Duplicate
export const ROLE_NAME_ALREADY_USED = {
    code: `RL${ErrorCodePrefix.DUPLICATE}2`,
    message: 'Role name already exist',
};

// Setting Error
// -- Not Found
export const SETTING_NOT_FOUND = {
    code: `ST${ErrorCodePrefix.NOT_FOUND}1`,
    message: 'Setting not found',
};

// User Error
// -- Not Found
export const USER_NOT_FOUND = {
    code: `US${ErrorCodePrefix.NOT_FOUND}1`,
    message: 'User not found',
};
// -- Duplicate
export const USER_ALREADY_USED = {
    code: `US${ErrorCodePrefix.DUPLICATE}1`,
    message: 'User already exist',
};

// Log Error
// -- Not Found
export const LOG_NOT_FOUND = {
    code: `LO${ErrorCodePrefix.NOT_FOUND}1`,
    message: 'Log not found',
};
