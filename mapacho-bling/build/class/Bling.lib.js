"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlingLib = void 0;
const RequestBling_lib_1 = __importDefault(require("./RequestBling.lib"));
const authBling_model_1 = require("../models/authBling.model");
const schedules_utils_1 = __importDefault(require("../utils/schedules.utils"));
class BlingLib {
    constructor() {
        this.requestBling = new RequestBling_lib_1.default();
        this.authBlingModel = new authBling_model_1.AuthBlingModel();
        this.dataToken = null;
        this.clientId = '';
        this.clientSecret = '';
        this.authCode = '';
        this.redirectUri = undefined;
        this.directionsApiKey = undefined;
    }
    async initializer(data) {
        const tokenDataBase = await this.authBlingModel.getAuthBling();
        this.dataToken = tokenDataBase;
        this.clientId = data.clientId;
        this.clientSecret = data.clientSecret;
        this.authCode = data.authCode;
        return await this.tokenProcess();
    }
    async tokenProcess() {
        const isExpiredTime = await this.verifyTokenTimeExpiration();
        console.log(isExpiredTime);
        if (isExpiredTime && this.dataToken) {
            const newToken = await this.requestBling.refreshToken({
                clientId: this.clientId,
                clientSecret: this.clientSecret,
                refreshToken: this.dataToken?.refresh_token,
            });
            this.dataToken = newToken;
        }
        else if (!this.dataToken) {
            const newToken = await this.requestBling.getFistToken({
                clientId: this.clientId,
                clientSecret: this.clientSecret,
                authCode: this.authCode,
                directionsApiKey: this.directionsApiKey,
                redirectUri: this.redirectUri
            });
            const tokenCreated = await this.authBlingModel.createAuthBling(newToken);
            this.dataToken = tokenCreated;
        }
        if (this.dataToken) {
            this.loopRefreshToken(this.dataToken.expires_in, this.dataToken.updatedAt);
        }
        return this.dataToken;
    }
    async loopRefreshToken(expires_in, updateAt) {
        const time = schedules_utils_1.default.timeSchedule(expires_in, updateAt);
        schedules_utils_1.default.scheduleTime(time, async () => {
            const newToken = await this.requestBling.refreshToken({
                clientId: this.clientId,
                clientSecret: this.clientSecret,
                refreshToken: this.dataToken?.refresh_token,
            });
            await this.authBlingModel.updateAuthBling(newToken);
        });
    }
    async verifyTokenTimeExpiration() {
        if (this.dataToken) {
            console.log(schedules_utils_1.default.timeSchedule(this.dataToken.expires_in, this.dataToken.updatedAt));
            return schedules_utils_1.default.timeSchedule(this.dataToken.expires_in, this.dataToken.updatedAt) <= 0;
        }
        return false;
    }
}
exports.BlingLib = BlingLib;
