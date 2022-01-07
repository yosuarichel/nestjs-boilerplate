import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
    CreateAdminSessionDto,
    UpdateAdminSessionDto,
    AdminSessionDto,
} from '@app/dto';
import { AdminSession } from '@app/models/pg';
import {
    FindAndCountOptions,
    FindOptions,
    InstanceDestroyOptions,
    InstanceUpdateOptions,
    SaveOptions,
} from 'sequelize/types';
import { UNAUTHORIZED } from 'src/common/constants/error_codes';

@Injectable()
export class AdminSessionService {
    constructor(
        @InjectModel(AdminSession)
        private readonly adminSessionModel: typeof AdminSession,
    ) {}

    // Get data by id
    findOneById(id: bigint, options?: FindOptions): Promise<AdminSession> {
        return this.adminSessionModel.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ['created_at', 'updated_at', 'deleted_at'],
            },
            ...options,
        });
    }

    // Get data by admin_id
    findOneByAdminId(
        admin_id: bigint,
        options?: FindAndCountOptions,
    ): Promise<AdminSession> {
        return this.adminSessionModel.findOne({
            where: {
                admin_id,
            },
            attributes: {
                exclude: ['created_at', 'updated_at', 'deleted_at'],
            },
            ...options,
        });
    }

    // Get data by session
    findOneBySession(
        session: string,
        options?: FindOptions,
    ): Promise<AdminSession> {
        return this.adminSessionModel.findOne({
            where: {
                session,
            },
            attributes: {
                exclude: ['created_at', 'updated_at', 'deleted_at'],
            },
            ...options,
        });
    }

    // Get data by session
    findValidSession(
        session: string,
        options?: FindOptions,
    ): Promise<AdminSession> {
        return this.adminSessionModel.findOne({
            where: {
                session,
                is_logged_in: true,
            },
            attributes: {
                exclude: ['created_at', 'updated_at', 'deleted_at'],
            },
            ...options,
        });
    }

    // Create new data
    async create(
        data: CreateAdminSessionDto,
        options?: SaveOptions,
    ): Promise<AdminSessionDto> {
        const adminSession = new AdminSession();
        adminSession.admin_id = data.admin_id;
        adminSession.session = data.session;
        adminSession.expiry_value = data.expiry_value;
        adminSession.is_logged_in = data.is_logged_in;
        adminSession.expired_at = data.expired_at;

        return adminSession.save(options);
    }

    // Update data by admin_id
    async updateByAdminId(
        adminId: bigint,
        data: UpdateAdminSessionDto,
        options?: InstanceUpdateOptions,
    ): Promise<AdminSessionDto> {
        const adminSession = await this.findOneByAdminId(adminId);
        if (!adminSession) {
            return null;
        }
        return adminSession.update(data, options);
    }

    // Update data by session
    async updateBySession(
        session: string,
        data: UpdateAdminSessionDto,
        options?: InstanceUpdateOptions,
    ): Promise<AdminSessionDto> {
        const adminSession = await this.findOneBySession(session);
        if (!adminSession) {
            return null;
        }
        return adminSession.update(data, options);
    }

    // Update data by id
    async updateById(
        id: bigint,
        data: UpdateAdminSessionDto,
        options?: InstanceUpdateOptions,
    ): Promise<AdminSessionDto> {
        const adminSession = await this.findOneById(id);
        if (!adminSession) {
            return null;
        }
        return adminSession.update(data, options);
    }

    // Remove data
    async remove(id: bigint, options?: InstanceDestroyOptions): Promise<any> {
        const adminSession = await this.findOneById(id);
        if (!adminSession) {
            return null;
        }
        return adminSession.destroy(options);
    }

    // Update is_logged_in to false
    async destroySession(
        session: string,
        options?: InstanceUpdateOptions,
    ): Promise<AdminSessionDto> {
        const adminSession = await this.findValidSession(session);
        if (!adminSession) {
            throw new UnauthorizedException({
                code: UNAUTHORIZED.code,
                message: UNAUTHORIZED.message,
            });
        }
        return adminSession.update(
            {
                is_logged_in: false,
            },
            options,
        );
    }

    // Update is_logged_in to false
    async destroySessionByUserId(
        adminId: bigint,
        options?: InstanceUpdateOptions,
    ): Promise<AdminSessionDto> {
        const adminSession = await this.findOneByAdminId(adminId);
        if (!adminSession) {
            return null;
        }
        return adminSession.update(
            {
                is_logged_in: false,
            },
            options,
        );
    }
}
