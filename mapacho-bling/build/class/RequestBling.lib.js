"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const authBling_model_1 = require("../models/authBling.model");
class RequestBling {
    constructor() {
        this.authBlingModel = new authBling_model_1.AuthBlingModel();
        this.axios = axios_1.default.create({
            baseURL: 'https://bling.com.br/Api/v3',
        });
    }
    request(request) {
        try {
            return this.axios(request);
        }
        catch (error) {
            console.error(error);
            return {
                data: {
                    message: 'Erro na requisição',
                },
                status: 500,
            };
        }
    }
    async getFistToken(data) {
        const credentials = Buffer.from(`${data.clientId}:${data.clientSecret}`).toString('base64');
        const response = await this.request({
            url: '/oauth/token',
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${credentials}`,
                'Accept': 'application/json',
            },
            data: {
                code: data.authCode,
                grant_type: 'authorization_code',
            },
        });
        return response.data;
    }
    async refreshToken(data) {
        const credentials = Buffer.from(`${data.clientId}:${data.clientSecret}`).toString('base64');
        const response = await this.request({
            url: '/oauth/token',
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${credentials}`,
                'Accept': 'application/json',
            },
            data: {
                refresh_token: data.refreshToken,
                grant_type: 'refresh_token',
            },
        });
        return response.data;
    }
    async getProducts() {
        const tokenDataBase = await this.authBlingModel.getAuthBling();
        const {} = await this.request({
            url: '/produtos',
            method: 'get',
            data: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokenDataBase?.access_token}`,
            },
            // params: {
            // }
        });
    }
}
exports.default = RequestBling;
