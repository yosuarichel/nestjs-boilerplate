export interface Response {
    status?: number;
    code: number | string;
    message: string;
    result?: any;
}
