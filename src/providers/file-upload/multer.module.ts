import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';

@Module({
    imports: [
        MulterModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                storage: diskStorage({
                    destination: (req, file, cb) => {
                        const dir = `${
                            configService.get('common').upload_path
                        }/${file.fieldname}/`;
                        if (!fs.existsSync(dir)) {
                            fs.mkdirSync(dir, { recursive: true });
                        }
                        return cb(null, dir);
                    },
                    filename: (req, file, cb) => {
                        const hash = `${Date.now()}-${file.originalname.replace(
                            /\s/g,
                            '-',
                        )}`;
                        return cb(null, hash);
                    },
                }),
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [],
    exports: [MulterModule],
})
export class FileUploadModule {}
