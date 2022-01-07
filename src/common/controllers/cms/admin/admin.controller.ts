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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
    CreateAdminDto,
    AdminParamDto,
    UpdateAdminDto,
    AdminDto,
    AdminQueryDto,
    ResponseDto,
    FindAndCountAllDto,
} from '@app/dto';
import { AdminService } from '@app/services';
import { CmsJwtAuthGuard } from '@app/guards';
import { Admin } from '@app/models/pg';
import { SUCCESS } from '@app/successCodes';

@Controller('cms/admin')
@ApiTags('Admin')
@ApiBearerAuth('Authorization')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Version('1.0')
    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(CmsJwtAuthGuard)
    async findOne(@Param() params: AdminParamDto): Promise<ResponseDto> {
        const data = await this.adminService.findOne(params.id);
        return new ResponseDto({
            status: HttpStatus.OK,
            code: SUCCESS.code,
            message: SUCCESS.message,
            result: new AdminDto(JSON.parse(JSON.stringify(data))),
        });
    }

    @Version('1.0')
    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(CmsJwtAuthGuard)
    async findAndCountAll(@Query() query: AdminQueryDto): Promise<ResponseDto> {
        const datas = await this.adminService.findAndCountAll(query);
        return new ResponseDto({
            status: HttpStatus.OK,
            code: SUCCESS.code,
            message: SUCCESS.message,
            result: new FindAndCountAllDto<Admin>(
                JSON.parse(JSON.stringify(datas)),
            ),
        });
    }

    @Version('1.0')
    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(CmsJwtAuthGuard)
    async create(@Body() body: CreateAdminDto): Promise<ResponseDto> {
        const createAdmin = await this.adminService.create(body);
        return new ResponseDto({
            status: HttpStatus.CREATED,
            code: SUCCESS.code,
            message: SUCCESS.message,
            result: new AdminDto(JSON.parse(JSON.stringify(createAdmin))),
        });
    }

    @Version('1.0')
    @Put(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(CmsJwtAuthGuard)
    async update(
        @Param() params: AdminParamDto,
        @Body() body: UpdateAdminDto,
    ): Promise<ResponseDto> {
        if (body.email) {
            await this.adminService.checkExist(params.id, body.email);
        }
        const updatedData = await this.adminService.update(params.id, body);
        return new ResponseDto({
            status: HttpStatus.OK,
            code: SUCCESS.code,
            message: SUCCESS.message,
            result: new AdminDto(JSON.parse(JSON.stringify(updatedData))),
        });
    }

    @Version('1.0')
    @Delete(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(CmsJwtAuthGuard)
    async remove(@Param() params: AdminParamDto): Promise<ResponseDto> {
        await this.adminService.remove(params.id);
        return new ResponseDto({
            status: HttpStatus.OK,
            code: SUCCESS.code,
            message: SUCCESS.message,
        });
    }
}
