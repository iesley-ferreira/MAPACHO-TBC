"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthBlingModel = void 0;
const prisma_provider_1 = __importDefault(require("../providers/prisma.provider"));
class AuthBlingModel {
    async getAuthBling() {
        return await prisma_provider_1.default.authBling.findFirst();
    }
    async updateAuthBling(data) {
        const token = await this.getAuthBling();
        return await prisma_provider_1.default.authBling.update({
            where: {
                id: token?.id
            },
            data,
        });
    }
    async createAuthBling(data) {
        return await prisma_provider_1.default.authBling.create({
            data,
        });
    }
}
exports.AuthBlingModel = AuthBlingModel;
