import { CreateLogDto, LogQueryDto, UpdateLogDto } from '@app/dto';
import { OrderType, Pagination, LogOrderBy } from '@app/enums';
import { CreatePagination } from '@app/helpers/misc.helper';
import { Log, LogDocument } from '@app/models/mongo';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LOG_NOT_FOUND } from '@app/errorCodes';

@Injectable()
export class LogService {
    constructor(
        @InjectModel(Log.name) private readonly model: Model<LogDocument>,
    ) {}

    // Get data by id
    async findOne(id: string): Promise<Log> {
        const log = await this.model.findById(id).exec();
        if (!log) {
            throw new NotFoundException({
                code: LOG_NOT_FOUND.code,
                message: LOG_NOT_FOUND.message,
            });
        }
        return log;
    }

    // Get all data
    async findAndCountAll({
        pagination = Pagination.true,
        page = 1,
        row = 10,
        order_by = LogOrderBy.id,
        order_type = OrderType.asc,
    }: LogQueryDto): Promise<any> {
        const filter = {
            offset: 1,
            limit: 10,
            order: [[order_by, order_type]],
            where: {},
        };
        if (pagination === 'true') {
            const pager = CreatePagination(page, row);
            Object.assign(filter, {
                limit: pager.row,
                offset: pager.page,
            });
        }
        const logs = await this.model
            .find()
            .skip(filter.offset)
            .limit(filter.limit)
            .exec();
        return {
            count: logs.length,
            rows: logs,
        };
    }

    // Create new data
    async create(data: CreateLogDto): Promise<Log> {
        return await new this.model({
            ...data,
            created_at: Date.now(),
        }).save();
    }

    // Update data
    async update(id: string, data: UpdateLogDto): Promise<Log> {
        const log = await this.model
            .findByIdAndUpdate(id, data, {
                new: true,
            })
            .exec();
        return log;
    }

    // Remove data
    async remove(id: string): Promise<any> {
        const log = await this.model.findByIdAndRemove(id).exec();
        return log;
    }
}
