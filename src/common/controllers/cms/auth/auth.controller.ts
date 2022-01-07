import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Redirect,
    Req,
    UnauthorizedException,
    UseGuards,
    UseInterceptors,
    Version,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { ApiTags } from '@nestjs/swagger';
import { CmsAuthService, AdminRoleService } from '@app/services';
import {
    AuthAdminRegisterDto,
    AuthAdminDto,
    AuthEmailVerifyParam,
    AuthSendEmailOtp,
    AuthForgotPassword,
    AuthAdminLoginDto,
    ResponseDto,
} from '@app/dto';
import { CmsJwtAuthGuard } from '@app/guards';
import { UNAUTHORIZED } from 'src/common/constants/error_codes';
import { SUCCESS } from '@app/successCodes';

@ApiTags('Auth')
@Controller('cms/auth')
export class AuthController {
    constructor(
        private readonly authService: CmsAuthService,
        private readonly adminRoleService: AdminRoleService,
    ) {}

    @Version('1.0')
    @Post('login')
    @UseInterceptors(ClassSerializerInterceptor)
    @HttpCode(HttpStatus.OK)
    async loginAdmin(
        @Req() req: any,
        @Body() body: AuthAdminLoginDto,
    ): Promise<ResponseDto> {
        const admin = await this.authService.verifyAdmin(
            body.email,
            body.password,
        );
        await this.adminRoleService.findOne(admin.role_id);
        const generateSession = await this.authService.generateSession(
            admin.id,
        );
        const token = await this.authService.generateJwt({
            role_id: admin.role_id,
            email: admin.email,
            is_active: admin.is_active,
            session: generateSession.session,
            session_expiry: generateSession.expiry_value,
        });
        return new ResponseDto({
            status: HttpStatus.OK,
            code: SUCCESS.code,
            message: SUCCESS.message,
            result: {
                session: generateSession.session,
                session_expire_value: generateSession.expiry_value,
                session_expired_at: generateSession.expired_at,
                access_token: token,
            },
        });
    }

    @Version('1.0')
    @Post('register')
    @UseInterceptors(ClassSerializerInterceptor)
    @HttpCode(HttpStatus.OK)
    async registerAdmin(
        @Req() req: any,
        @Body() body: AuthAdminRegisterDto,
    ): Promise<ResponseDto> {
        body.email_verification_token = crypto
            .createHash('sha256')
            .update(`${body.email}+${Date.now()}`)
            .digest('hex');
        body.confirmation_otp = undefined;

        await this.adminRoleService.findOne(body.role_id);

        const registerData = await this.authService.registerAdmin(
            body,
            req.headers.host,
        );

        return new ResponseDto({
            status: HttpStatus.CREATED,
            code: SUCCESS.code,
            message: SUCCESS.message,
            result: new AuthAdminDto(JSON.parse(JSON.stringify(registerData))),
        });
    }

    @Version('1.0')
    @Post('logout')
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(CmsJwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async logoutAdmin(@Req() req: any): Promise<ResponseDto> {
        const destroySession = await this.authService.destroySession(
            req.user.session,
        );
        if (!destroySession) {
            throw new UnauthorizedException({
                code: UNAUTHORIZED.code,
                message: UNAUTHORIZED.message,
            });
        }
        return new ResponseDto({
            status: HttpStatus.OK,
            code: SUCCESS.code,
            message: SUCCESS.message,
        });
    }

    @Version('1.0')
    @Get('profile')
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(CmsJwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async profile(@Req() req: any): Promise<ResponseDto> {
        const admin = await this.authService.profile(req.user.email);
        return new ResponseDto({
            status: HttpStatus.OK,
            code: SUCCESS.code,
            message: SUCCESS.message,
            result: new AuthAdminDto(JSON.parse(JSON.stringify(admin))),
        });
    }

    @Version('1.0')
    @Get('verification/email/:token')
    @Redirect('https://cms-trivia-dev.nyte.co.id/login', 302)
    async verifyEmail(@Param() params: AuthEmailVerifyParam): Promise<any> {
        const admin = await this.authService.verifyEmail(params.token);
        return {
            url: admin
                ? 'https://cms-trivia-dev.nyte.co.id/login'
                : 'https://cms-trivia-dev.nyte.co.id/not-found',
        };
    }

    @Version('1.0')
    @Post('otp/email')
    @UseInterceptors(ClassSerializerInterceptor)
    @HttpCode(HttpStatus.OK)
    async sendEmailOtp(@Body() body: AuthSendEmailOtp): Promise<ResponseDto> {
        await this.authService.sendEmailOtp(body.email);
        return new ResponseDto({
            status: HttpStatus.OK,
            code: SUCCESS.code,
            message: SUCCESS.message,
        });
    }

    @Version('1.0')
    @Post('forgot-password')
    @UseInterceptors(ClassSerializerInterceptor)
    @HttpCode(HttpStatus.OK)
    async forgotPassword(
        @Body() body: AuthForgotPassword,
    ): Promise<ResponseDto> {
        await this.authService.forgotPassword(body);
        return new ResponseDto({
            status: HttpStatus.OK,
            code: SUCCESS.code,
            message: SUCCESS.message,
        });
    }
}
