import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
    Op,
    FindAndCountOptions,
    FindOptions,
    CreateOptions,
    InstanceUpdateOptions,
    InstanceDestroyOptions,
} from 'sequelize';
import * as crypto from 'crypto';
import {
    CreateAdminDto,
    UpdateAdminDto,
    AdminDto,
    AdminQueryDto,
    FindAndCountAllDto,
} from '@app/dto';
import { Admin, AdminRole } from '@app/models/pg';
import { CreatePagination } from '../../helpers/misc.helper';
import { Pagination, AdminOrderBy, OrderType } from '@app/enums';
import {
    ADMIN_EMAIL_ALREADY_USED,
    ADMIN_NOT_FOUND,
} from 'src/common/constants/error_codes';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(Admin)
        private readonly adminModel: typeof Admin,
    ) {}

    // Get data by id
    async findOne(id: number, options?: FindOptions): Promise<Admin> {
        const admin = await this.adminModel.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: AdminRole,
                    as: 'admin_role',
                    attributes: {
                        exclude: ['created_at', 'updated_at', 'deleted_at'],
                    },
                },
            ],
            ...options,
        });
        if (!admin) {
            throw new NotFoundException({
                code: ADMIN_NOT_FOUND.code,
                message: ADMIN_NOT_FOUND.message,
            });
        }
        return admin;
    }

    // Get all data
    async findAndCountAll(
        {
            pagination = Pagination.true,
            page = 1,
            row = 10,
            order_by = AdminOrderBy.id,
            order_type = OrderType.asc,
            active,
            search,
        }: AdminQueryDto,
        options?: FindAndCountOptions,
    ): Promise<FindAndCountAllDto<Admin>> {
        const filter = {
            order: [[order_by, order_type]],
            where: {},
            include: [
                {
                    model: AdminRole,
                    as: 'admin_role',
                    attributes: {
                        exclude: ['created_at', 'updated_at', 'deleted_at'],
                    },
                },
            ],
            ...options,
        } as FindAndCountOptions;
        if (pagination === 'true') {
            const pager = CreatePagination(page, row);
            Object.assign(filter, { limit: pager.row, offset: pager.page });
        }
        if (active) {
            Object.assign(filter.where, { is_active: active });
        }
        if (search) {
            Object.assign(filter.where, {
                name: {
                    [Op.iLike]: `%${search}%`,
                },
            });
        }
        return this.adminModel.findAndCountAll(filter);
    }

    // Create new data
    async create(
        data: CreateAdminDto,
        options?: CreateOptions,
    ): Promise<Admin> {
        const hashedPasssword = crypto
            .createHash('sha256')
            .update(data.password)
            .digest('hex');
        const insertData = {
            role_id: data.role_id,
            name: data.name,
            email: data.email,
            password: hashedPasssword,
            is_active: data.is_active,
            is_email_verified: data.is_email_verified,
            email_verification_token: data.email_verification_token,
            confirmation_otp: data.confirmation_otp,
        } as Admin;
        return this.adminModel.create(insertData, options);
    }

    // Update data
    async update(
        id: number,
        data: UpdateAdminDto,
        options?: InstanceUpdateOptions,
    ): Promise<AdminDto> {
        const admin = await this.findOne(id);
        if (!admin) {
            throw new NotFoundException({
                code: ADMIN_NOT_FOUND.code,
                message: ADMIN_NOT_FOUND.message,
            });
        }
        if (data.password) {
            data.password = crypto
                .createHash('sha256')
                .update(data.password)
                .digest('hex');
        }
        return admin.update(data, options);
    }

    // Remove data
    async remove(id: number, options?: InstanceDestroyOptions): Promise<any> {
        const admin = await this.findOne(id);
        if (!admin) {
            throw new NotFoundException({
                code: ADMIN_NOT_FOUND.code,
                message: ADMIN_NOT_FOUND.message,
            });
        }
        return admin.destroy(options);
    }

    // Check duplicate data
    async checkExist(id?: number, email?: string): Promise<boolean> {
        const filter = {
            where: {},
        };
        if (id) {
            Object.assign(filter.where, { id: { [Op.not]: id } });
        }
        if (email) {
            Object.assign(filter.where, { email: { [Op.iLike]: email } });
        }
        const admin = await this.adminModel.findOne(filter);
        if (admin) {
            throw new BadRequestException({
                code: ADMIN_EMAIL_ALREADY_USED.code,
                message: ADMIN_EMAIL_ALREADY_USED.message,
            });
        }
        return !!admin;
    }

    // Get data by email
    async findOneByEmail(email: string): Promise<Admin> {
        const admin = await this.adminModel.findOne({
            where: {
                email,
            },
        });
        if (!admin) {
            throw new NotFoundException({
                code: ADMIN_NOT_FOUND.code,
                message: ADMIN_NOT_FOUND.message,
            });
        }
        return admin;
    }

    // Get data by email verification token
    async findOneByEmailVerifToken(token: string): Promise<Admin> {
        const admin = await this.adminModel.findOne({
            where: {
                email_verification_token: token,
            },
        });
        if (!admin) {
            throw new NotFoundException({
                code: ADMIN_NOT_FOUND.code,
                message: ADMIN_NOT_FOUND.message,
            });
        }
        return admin;
    }
}
