"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlingLib = void 0;
const node_path_1 = __importDefault(require("node:path"));
const RequestBling_lib_1 = __importDefault(require("./RequestBling.lib"));
class BlingLib {
    constructor() {
        this.pathBase = node_path_1.default.resolve(__dirname, '..', 'data', 'bling');
        this.requestBling = new RequestBling_lib_1.default();
    }
    async initializer(data) {
        const newToken = this.requestBling.getFistToken({
            clientId: data.clientId,
            clientSecret: data.clientSecret,
            authCode: data.authCode,
            directionsApiKey: data.directionsApiKey,
            redirectUri: data.redirectUri
        });
        console.log(newToken);
        return newToken;
    }
    async createPathBase() {
    }
}
exports.BlingLib = BlingLib;
