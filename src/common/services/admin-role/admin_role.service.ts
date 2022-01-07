import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
    FindAndCountOptions,
    FindOptions,
    InstanceDestroyOptions,
    InstanceUpdateOptions,
    SaveOptions,
    Op,
} from 'sequelize';
import {
    CreateAdminRoleDto,
    UpdateAdminRoleDto,
    AdminRoleQueryDto,
    FindAndCountAllDto,
} from '@app/dto';
import { AdminRole } from '@app/models/pg';
import { CreatePagination } from '../../helpers/misc.helper';
import { Pagination, AdminRoleOrderBy, OrderType } from '@app/enums';
import {
    ROLE_NAME_ALREADY_USED,
    ROLE_NOT_FOUND,
} from 'src/common/constants/error_codes';

@Injectable()
export class AdminRoleService {
    constructor(
        @InjectModel(AdminRole)
        private readonly adminRoleModel: typeof AdminRole,
    ) {}

    // Get data by id
    async findOne(id: number, options?: FindOptions): Promise<AdminRole> {
        const adminRole = await this.adminRoleModel.findOne({
            where: {
                id,
            },
            ...options,
        });
        if (!adminRole) {
            throw new NotFoundException({
                code: ROLE_NOT_FOUND.code,
                message: ROLE_NOT_FOUND.message,
            });
        }
        return adminRole;
    }

    // Get all data
    async findAndCountAll(
        {
            pagination = Pagination.true,
            page = 1,
            row = 10,
            order_by = AdminRoleOrderBy.id,
            order_type = OrderType.asc,
            search,
        }: AdminRoleQueryDto,
        options?: FindAndCountOptions,
    ): Promise<FindAndCountAllDto<AdminRole>> {
        const filter = {
            order: [[order_by, order_type]],
            where: {},
            ...options,
        } as FindAndCountOptions;
        if (pagination === 'true') {
            const pager = CreatePagination(page, row);
            Object.assign(filter, {
                limit: pager.row,
                offset: pager.page,
            });
        }
        if (search) {
            Object.assign(filter.where, {
                name: {
                    [Op.iLike]: `%${search}%`,
                },
            });
        }
        return this.adminRoleModel.findAndCountAll(filter);
    }

    // Create new data
    async create(
        data: CreateAdminRoleDto,
        options?: SaveOptions,
    ): Promise<AdminRole> {
        const admin = new AdminRole();
        admin.name = data.name;

        return admin.save(options);
    }

    // Update data
    async update(
        id: number,
        data: UpdateAdminRoleDto,
        options?: InstanceUpdateOptions,
    ): Promise<AdminRole> {
        const admin = await this.findOne(id);
        return admin.update(data, options);
    }

    // Remove data
    async remove(id: number, options?: InstanceDestroyOptions): Promise<any> {
        const admin = await this.findOne(id);
        return admin.destroy(options);
    }

    // Check duplicate data
    async checkExist(id?: number, name?: string): Promise<boolean> {
        const filter = {
            where: {},
        };
        if (id) {
            Object.assign(filter.where, { id: { [Op.not]: id } });
        }
        if (name) {
            Object.assign(filter.where, { name: { [Op.iLike]: name } });
        }
        const adminRole = await this.adminRoleModel.findOne(filter);
        if (adminRole) {
            throw new BadRequestException({
                code: ROLE_NAME_ALREADY_USED.code,
                message: ROLE_NAME_ALREADY_USED.message,
            });
        }

        return !!adminRole;
    }
}
