import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
    FindAndCountOptions,
    FindOptions,
    InstanceDestroyOptions,
    InstanceUpdateOptions,
    SaveOptions,
} from 'sequelize';
import {
    CreateSettingDto,
    UpdateSettingDto,
    SettingDto,
    SettingQueryDto,
    FindAndCountAllDto,
} from '@app/dto';
import { Setting } from '@app/models/pg';
import { CreatePagination } from '../../helpers/misc.helper';
import { Pagination, SettingOrderBy, OrderType } from '@app/enums';
import { SETTING_NOT_FOUND } from 'src/common/constants/error_codes';

@Injectable()
export class SettingService {
    constructor(
        @InjectModel(Setting)
        private readonly settingModel: typeof Setting,
    ) {}

    // Get data by id
    async findOne(id: number, options?: FindOptions): Promise<Setting> {
        const setting = await this.settingModel.findOne({
            where: {
                id,
            },
            ...options,
        });
        if (!setting) {
            throw new NotFoundException({
                code: SETTING_NOT_FOUND.code,
                message: SETTING_NOT_FOUND.message,
            });
        }
        return setting;
    }

    // Get all data
    async findAndCountAll(
        {
            pagination = Pagination.true,
            page = 1,
            row = 10,
            order_by = SettingOrderBy.id,
            order_type = OrderType.asc,
        }: SettingQueryDto,
        options?: FindAndCountOptions,
    ): Promise<FindAndCountAllDto<Setting>> {
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
        return this.settingModel.findAndCountAll(filter);
    }

    // Create new data
    async create(
        data: CreateSettingDto,
        options?: SaveOptions,
    ): Promise<Setting> {
        const setting = new Setting();
        setting.is_app_maintenance = data.is_app_maintenance;
        setting.app_maintenance_message = data.app_maintenance_message;
        setting.cms_expiry = data.cms_expiry;
        setting.app_expiry = data.app_expiry;
        setting.terms_and_conditions = data.terms_and_conditions;
        setting.limit_balance_billfazz = data.limit_balance_billfazz;
        setting.limit_balance_aviana = data.limit_balance_aviana;

        return setting.save(options);
    }

    // Update data
    async update(
        id: number,
        data: UpdateSettingDto,
        options?: InstanceUpdateOptions,
    ): Promise<SettingDto> {
        const setting = await this.findOne(id);
        return setting.update(data, options);
    }

    // Remove data
    async remove(id: number, options?: InstanceDestroyOptions): Promise<any> {
        const setting = await this.findOne(id);
        return setting.destroy(options);
    }
}
