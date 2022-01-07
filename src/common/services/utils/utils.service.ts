import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';
import * as hbs from 'nodemailer-express-handlebars';
import * as nodemailer from 'nodemailer';
import * as Bucket from '@macroad/macroad-bucket';
import * as fs from 'fs';
import { GetExpiryValue, SendMailDto } from '@app/dto';

@Injectable()
export class UtilsService {
    constructor(private readonly configService: ConfigService) {}
    private readonly smtpConfig = this.configService.get('smtp');
    private readonly minioConfig = this.configService.get('minio');

    getExpiryValue(amount: any, timeUnit: any): GetExpiryValue {
        const now = moment().tz('Asia/Jakarta').format();
        const expiry = moment(now)
            .add(amount, `${timeUnit}`)
            .tz('Asia/Jakarta');
        const diff = expiry.diff(now) / 1000;
        return {
            diff,
            expiry,
        };
    }

    checkExpiredDate(startDate: Date, endDate: string): boolean {
        const start = startDate;
        const end = endDate;
        const diff =
            moment(end)
                .tz('Asia/Jakarta')
                .diff(moment(start).tz('Asia/Jakarta')) / 1000;
        return diff <= 0 ? true : false;
    }

    sendMail({
        layout,
        sender = this.smtpConfig.email,
        recipient,
        subject,
        data,
    }: SendMailDto): any {
        const transporter = nodemailer.createTransport({
            host: this.smtpConfig.host,
            port: this.smtpConfig.port,
            secureConnection: false,
            auth: {
                user: this.smtpConfig.username,
                pass: this.smtpConfig.key,
            },
        });
        const options = {
            viewEngine: {
                extname: '.hbs', // handlebars extension
                layoutsDir: './public/templates/email/', // location of handlebars templates
                defaultLayout: layout,
                partialsDir: './public/templates/email/', // location of your subtemplates aka. header, footer etc
            },
            viewPath: './public/templates/email/',
            extName: '.hbs',
        };
        transporter.use('compile', hbs(options));

        const mailData = {
            from: sender,
            // to: ['yosuasmjtk86@gmail.com', 'albert.darmali@codify.id', 'jason.japutra@codify.id'],
            to: recipient,
            subject,
            template: layout,
            context: data,
        };
        return transporter.sendMail(mailData);
    }
    async uploadFileToMinio(
        mediaPath: any,
        hash: boolean,
        foldering: string,
    ): Promise<any> {
        const macroadBucket = new Bucket.BasicFunctions(
            this.minioConfig.host,
            this.minioConfig.secret,
        );
        const uploadFile = await macroadBucket.upload(
            mediaPath,
            hash,
            foldering,
        );
        if (fs.existsSync(mediaPath)) fs.unlinkSync(mediaPath);
        return uploadFile;
    }

    formatCurrency(number: number): string {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(number);
    }
}
