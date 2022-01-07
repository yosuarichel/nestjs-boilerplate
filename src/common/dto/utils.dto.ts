export class GetExpiryValue {
    diff: number;
    expiry: any;
}

export class MailSender {
    name: string;
    address: string;
}

export class SendMailDto {
    layout: string;
    sender: MailSender | string;
    recipient: string | string[];
    subject: string;
    data: Record<string, any>;
}
