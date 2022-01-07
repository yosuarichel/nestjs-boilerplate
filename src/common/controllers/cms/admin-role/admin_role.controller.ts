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
    CreateAdminRoleDto,
    AdminRoleParamDto,
    UpdateAdminRoleDto,
    AdminRoleDto,
    AdminRoleQueryDto,
    ResponseDto,
    FindAndCountAllDto,
} from '@app/dto';
import { AdminRoleService } from '@app/services';
import { CmsJwtAuthGuard } from '@app/guards';
import { AdminRole } from '@app/models/pg';
import { SUCCESS } from '@app/successCodes';

@ApiTags('Admin Role')
@Controller('cms/admin-role')
export class AdminRoleController {
    constructor(private readonly adminRoleService: AdminRoleService) {}

    @Version('1.0')
    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(CmsJwtAuthGuard)
    async findOne(@Param() params: AdminRoleParamDto): Promise<ResponseDto> {
        const data = await this.adminRoleService.findOne(params.id);
        return new ResponseDto({
            status: HttpStatus.OK,
            code: SUCCESS.code,
            message: SUCCESS.message,
            result: new AdminRoleDto(JSON.parse(JSON.stringify(data))),
        });
    }

    @Version('1.0')
    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(CmsJwtAuthGuard)
    async findAndCountAll(
        @Query() query: AdminRoleQueryDto,
    ): Promise<ResponseDto> {
        const datas = await this.adminRoleService.findAndCountAll(query);
        return new ResponseDto({
            status: HttpStatus.OK,
            code: SUCCESS.code,
            message: SUCCESS.message,
            result: new FindAndCountAllDto<AdminRole>(
                JSON.parse(JSON.stringify(datas)),
            ),
        });
    }

    @Version('1.0')
    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(CmsJwtAuthGuard)
    async create(@Body() body: CreateAdminRoleDto): Promise<ResponseDto> {
        const createAdmin = await this.adminRoleService.create(body);
        return new ResponseDto({
            status: HttpStatus.CREATED,
            code: SUCCESS.code,
            message: SUCCESS.message,
            result: new AdminRoleDto(JSON.parse(JSON.stringify(createAdmin))),
        });
    }

    @Version('1.0')
    @Put(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(CmsJwtAuthGuard)
    async update(
        @Param() params: AdminRoleParamDto,
        @Body() body: UpdateAdminRoleDto,
    ): Promise<ResponseDto> {
        const updatedData = await this.adminRoleService.update(params.id, body);
        return new ResponseDto({
            status: HttpStatus.OK,
            code: SUCCESS.code,
            message: SUCCESS.message,
            result: new AdminRoleDto(JSON.parse(JSON.stringify(updatedData))),
        });
    }

    @Version('1.0')
    @Delete(':id')
    @UseGuards(CmsJwtAuthGuard)
    async remove(@Param() params: AdminRoleParamDto): Promise<ResponseDto> {
        await this.adminRoleService.remove(params.id);
        return new ResponseDto({
            status: HttpStatus.OK,
            code: SUCCESS.code,
            message: SUCCESS.message,
        });
    }
}
