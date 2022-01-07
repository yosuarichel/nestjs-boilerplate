import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Version,
    UseInterceptors,
    ClassSerializerInterceptor,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
    CreateLogDto,
    LogParamDto,
    UpdateLogDto,
    LogDto,
    LogQueryDto,
    ResponseDto,
    FindAndCountAllDto,
} from '@app/dto';
import { CmsJwtAuthGuard } from '@app/guards';
import { LogService } from '@app/services';
import { Log } from '@app/models/mongo';
import { SUCCESS } from 'src/common/constants/success_codes';

@ApiTags('Log')
@Controller('cms/log')
export class LogController {
    constructor(private readonly logService: LogService) {}

    @Version('1.0')
    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(CmsJwtAuthGuard)
    async findOne(@Param() params: LogParamDto): Promise<ResponseDto> {
        const data = await this.logService.findOne(params.id);
        return new ResponseDto({
            status: HttpStatus.OK,
            code: SUCCESS.code,
            message: SUCCESS.message,
            result: new LogDto(JSON.parse(JSON.stringify(data))),
        });
    }

    @Version('1.0')
    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(CmsJwtAuthGuard)
    async findAndCountAll(@Query() query: LogQueryDto): Promise<ResponseDto> {
        const datas = await this.logService.findAndCountAll(query);
        return new ResponseDto({
            status: HttpStatus.OK,
            code: SUCCESS.code,
            message: SUCCESS.message,
            result: new FindAndCountAllDto<Log>(
                JSON.parse(JSON.stringify(datas)),
            ),
        });
    }

    @Version('1.0')
    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(CmsJwtAuthGuard)
    async create(@Body() body: CreateLogDto): Promise<ResponseDto> {
        const createData = await this.logService.create(body);
        return new ResponseDto({
            status: HttpStatus.CREATED,
            code: SUCCESS.code,
            message: SUCCESS.message,
            result: new LogDto(JSON.parse(JSON.stringify(createData))),
        });
    }

    @Version('1.0')
    @Put(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(CmsJwtAuthGuard)
    async update(
        @Param() params: LogParamDto,
        @Body() body: UpdateLogDto,
    ): Promise<ResponseDto> {
        const updatedData = await this.logService.update(params.id, body);
        return new ResponseDto({
            status: HttpStatus.OK,
            code: SUCCESS.code,
            message: SUCCESS.message,
            result: new LogDto(JSON.parse(JSON.stringify(updatedData))),
        });
    }

    @Version('1.0')
    @Delete(':id')
    @UseGuards(CmsJwtAuthGuard)
    async remove(@Param() params: LogParamDto): Promise<ResponseDto> {
        await this.logService.remove(params.id);
        return new ResponseDto({
            status: HttpStatus.OK,
            code: SUCCESS.code,
            message: SUCCESS.message,
        });
    }
}
