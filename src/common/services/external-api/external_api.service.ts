import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ExternalApiService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}
    private readonly vendorConfig = this.configService.get('vendor');
    private readonly billfazz_balance_path = '/app/deposits/balance';

    async reqBillfazzBalance(): Promise<any> {
        const getAPI = this.httpService.get(
            `${this.vendorConfig.billfazz.host}${this.billfazz_balance_path}`,
            {
                headers: {
                    authorization: this.vendorConfig.billfazz.basic_auth,
                },
            },
        );
        return new Promise((resolve, reject) =>
            getAPI.pipe().subscribe({
                next: (response) => {
                    return resolve(response.data);
                },
                error: (e) => {
                    return reject(e.response);
                },
            }),
        );
    }
}
