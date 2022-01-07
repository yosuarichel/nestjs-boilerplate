import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtSignOptions, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import * as Randomstring from 'randomstring';
import * as crypto from 'crypto';
import {
    AdminDto,
    AuthAdminRegisterDto,
    AuthForgotPassword,
    AdminSessionDto,
} from '@app/dto';
import {
    AdminService,
    AdminSessionService,
    SettingService,
    UtilsService,
} from '@app/services';
import {
    EMAIL_NOT_VERIFIED,
    INACTIVE_ACCOUNT,
    INVALID_CONFIRMATION_PASSWORD,
    INVALID_CREDENTIAL,
    UNAUTHORIZED,
    WRONG_OTP,
} from 'src/common/constants/error_codes';

@Injectable()
export class CmsAuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly adminService: AdminService,
        private readonly jwtService: JwtService,
        private readonly adminSessionService: AdminSessionService,
        private readonly utilsService: UtilsService,
        private readonly settingService: SettingService,
        private readonly sequelize: Sequelize,
    ) {}
    private readonly smtpConfig = this.configService.get('smtp');

    verifyPassword(password: string, hashedPassword: string): boolean {
        const hash = crypto.createHash('sha256').update(password).digest('hex');
        return hashedPassword === hash;
    }

    async generateJwt(payload: any, options?: JwtSignOptions): Promise<string> {
        return this.jwtService.signAsync(payload, options);
    }

    async generateSession(adminId: bigint): Promise<AdminSessionDto> {
        const session = crypto
            .createHash('sha256')
            .update(`${adminId}+${Date.now()}`)
            .digest('hex');

        const setting = await this.settingService.findOne(1);
        const expireAmount = setting.cms_expiry.split(';')[0];
        const expireTimeUnit = setting.cms_expiry.split(';')[1];
        const isSessionExist = await this.adminSessionService.findOneByAdminId(
            adminId,
        );
        const getDiff = this.utilsService.getExpiryValue(
            expireAmount,
            expireTimeUnit,
        );
        if (isSessionExist) {
            return isSessionExist.update({
                session,
                expiry_value: getDiff.diff,
                is_logged_in: true,
                expired_at: getDiff.expiry,
            });
        }
        return this.adminSessionService.create({
            admin_id: adminId,
            session,
            expiry_value: getDiff.diff,
            is_logged_in: true,
            expired_at: getDiff.expiry,
        });
    }

    async verifyAdmin(email: string, password: string): Promise<AdminDto> {
        const admin = await this.adminService.findOneByEmail(email);
        if (this.verifyPassword(password, admin.password)) {
            if (!admin.is_active) {
                throw new UnauthorizedException({
                    code: INACTIVE_ACCOUNT.code,
                    message: INACTIVE_ACCOUNT.message,
                });
            }
            if (!admin.is_email_verified) {
                throw new UnauthorizedException({
                    code: EMAIL_NOT_VERIFIED.code,
                    message: EMAIL_NOT_VERIFIED.message,
                });
            }
            if (!admin.role_id) {
                throw new UnauthorizedException({
                    code: UNAUTHORIZED.code,
                    message: UNAUTHORIZED.message,
                });
            }
            return admin;
        }
        throw new UnauthorizedException({
            code: INVALID_CREDENTIAL.code,
            message: INVALID_CREDENTIAL.message,
        });
    }

    async registerAdmin(
        data: AuthAdminRegisterDto,
        url: string,
    ): Promise<AdminDto> {
        let t = null;
        try {
            t = await this.sequelize.transaction();
            const admin = await this.adminService.create(data, {
                transaction: t,
            });
            if (admin) {
                await this.utilsService.sendMail({
                    layout: 'verification-email',
                    sender: {
                        name: 'Bills',
                        address: this.smtpConfig.email,
                    },
                    recipient: data.email,
                    subject: 'Verification CMS Bills',
                    data: {
                        name: data.name,
                        url: `http://${url}/api/v1.0/cms/auth/verification/email/${data.email_verification_token}`,
                    },
                });
            }
            await t.commit();
            return admin;
        } catch (e) {
            if (t) await t.rollback();
            throw e;
        }
    }

    async destroySession(session: string): Promise<AdminSessionDto> {
        return this.adminSessionService.destroySession(session);
    }

    async profile(email: string): Promise<AdminDto> {
        return this.adminService.findOneByEmail(email);
    }

    async verifyEmail(token: string): Promise<AdminDto> {
        const admin = await this.adminService.findOneByEmailVerifToken(token);
        if (admin.is_email_verified) {
            return null;
        }
        if (admin.is_active) {
            return null;
        }
        await admin.update({
            is_email_verified: true,
            is_active: true,
            email_verification_token: null,
        });
        return admin;
    }

    async sendEmailOtp(email: string): Promise<any> {
        let t = null;
        try {
            const admin = await this.adminService.findOneByEmail(email);
            if (!admin.is_active) {
                throw new UnauthorizedException({
                    code: INACTIVE_ACCOUNT.code,
                    message: INACTIVE_ACCOUNT.message,
                });
            }
            if (!admin.is_email_verified) {
                throw new UnauthorizedException({
                    code: EMAIL_NOT_VERIFIED.code,
                    message: EMAIL_NOT_VERIFIED.message,
                });
            }
            const randomString = Randomstring.generate({
                length: 6,
                charset: 'numeric',
            });
            t = await this.sequelize.transaction();
            await admin.update(
                {
                    confirmation_otp: randomString,
                },
                {
                    transaction: t,
                },
            );
            await this.utilsService.sendMail({
                layout: 'otp-email',
                sender: {
                    name: 'Trivia',
                    address: this.smtpConfig.smtp.email,
                },
                recipient: admin.email,
                subject: 'Forgot password OTP - CMS Trivia',
                data: {
                    name: admin.name,
                    otp: randomString,
                },
            });
            await t.commit();
            return admin;
        } catch (e) {
            if (t) await t.rollback();
            throw e;
        }
    }

    async forgotPassword(data: AuthForgotPassword): Promise<any> {
        let t = null;
        try {
            data.password = crypto
                .createHash('sha256')
                .update(data.password)
                .digest('hex');
            data.confirm_password = crypto
                .createHash('sha256')
                .update(data.confirm_password)
                .digest('hex');
            const admin = await this.adminService.findOneByEmail(data.email);
            if (!admin.is_active) {
                throw new UnauthorizedException({
                    code: INACTIVE_ACCOUNT.code,
                    message: INACTIVE_ACCOUNT.message,
                });
            }
            if (!admin.is_email_verified) {
                throw new UnauthorizedException({
                    code: EMAIL_NOT_VERIFIED.code,
                    message: EMAIL_NOT_VERIFIED.message,
                });
            }
            if (admin.confirmation_otp !== data.otp) {
                throw new UnauthorizedException({
                    code: WRONG_OTP.code,
                    message: WRONG_OTP.message,
                });
            }
            if (data.password !== data.confirm_password) {
                throw new UnauthorizedException({
                    code: INVALID_CONFIRMATION_PASSWORD.code,
                    message: INVALID_CONFIRMATION_PASSWORD.message,
                });
            }
            t = await this.sequelize.transaction();
            await admin.update(
                {
                    password: data.password,
                    confirmation_otp: null,
                },
                {
                    transaction: t,
                },
            );
            await this.adminSessionService.destroySessionByUserId(admin.id);
            await t.commit();
            return admin;
        } catch (e) {
            if (t) await t.rollback();
            throw e;
        }
    }
}
