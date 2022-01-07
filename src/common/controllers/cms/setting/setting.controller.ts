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
    CreateSettingDto,
    SettingParamDto,
    UpdateSettingDto,
    SettingDto,
    SettingQueryDto,
    ResponseDto,
    FindAndCountAllDto,
} from '@app/dto';
import { CmsJwtAuthGuard } from '@app/guards';
import { SettingService } from '@app/services';
import { Setting } from '@app/models/pg';
import { SUCCESS } from '@app/successCodes';

@ApiTags('Setting')
@Controller('cms/setting')
export class SettingController {
    constructor(private readonly settingService: SettingService) {}

    @Version('1.0')
    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(CmsJwtAuthGuard)
    async findOne(@Param() params: SettingParamDto): Promise<ResponseDto> {
        const data = await this.settingService.findOne(params.id);
        return new ResponseDto({
            status: HttpStatus.OK,
            code: SUCCESS.code,
            message: SUCCESS.message,
            result: new SettingDto(JSON.parse(JSON.stringify(data))),
        });
    }

    @Version('1.0')
    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(CmsJwtAuthGuard)
    async findAndCountAll(
        @Query() query: SettingQueryDto,
    ): Promise<ResponseDto> {
        const datas = await this.settingService.findAndCountAll(query);
        return new ResponseDto({
            status: HttpStatus.OK,
            code: SUCCESS.code,
            message: SUCCESS.message,
            result: new FindAndCountAllDto<Setting>(
                JSON.parse(JSON.stringify(datas)),
            ),
        });
    }

    @Version('1.0')
    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(CmsJwtAuthGuard)
    async create(@Body() body: CreateSettingDto): Promise<ResponseDto> {
        const createData = await this.settingService.create(body);
        return new ResponseDto({
            status: HttpStatus.CREATED,
            code: SUCCESS.code,
            message: SUCCESS.message,
            result: new SettingDto(JSON.parse(JSON.stringify(createData))),
        });
    }

    @Version('1.0')
    @Put(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(CmsJwtAuthGuard)
    async update(
        @Param() params: SettingParamDto,
        @Body() body: UpdateSettingDto,
    ): Promise<ResponseDto> {
        const updatedData = await this.settingService.update(params.id, body);
        return new ResponseDto({
            status: HttpStatus.OK,
            code: SUCCESS.code,
            message: SUCCESS.message,
            result: new SettingDto(JSON.parse(JSON.stringify(updatedData))),
        });
    }

    @Version('1.0')
    @Delete(':id')
    @UseGuards(CmsJwtAuthGuard)
    async remove(@Param() params: SettingParamDto): Promise<ResponseDto> {
        await this.settingService.remove(params.id);
        return new ResponseDto({
            status: HttpStatus.OK,
            code: SUCCESS.code,
            message: SUCCESS.message,
        });
    }
}
