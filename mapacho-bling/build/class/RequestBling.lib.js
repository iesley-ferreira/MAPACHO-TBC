"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class RequestBling {
    constructor() {
        this.axios = axios_1.default.create({
            baseURL: 'https://bling.com.br/Api/v3',
        });
    }
    async getFistToken(data) {
        const credentials = Buffer.from(`${data.clientId}:${data.clientSecret}`).toString('base64');
        try {
            const response = await this.axios.post('/oauth/token', {}, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${credentials}`,
                    'Accept': 'application/json',
                },
                data: {
                    code: data.authCode,
                    grant_type: 'authorization_code',
                }
            });
            return response.data;
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = RequestBling;
