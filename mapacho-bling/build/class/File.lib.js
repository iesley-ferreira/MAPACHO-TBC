"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
class File {
    constructor() {
        this.pathPast = node_path_1.default.resolve(process.cwd(), 'bling');
        this.pathBase = node_path_1.default.resolve(this.pathPast, 'data.json');
        this.pathConfigJson = node_path_1.default.resolve(this.pathPast, 'config.json');
        if (!node_fs_1.default.existsSync(this.pathPast)) {
            node_fs_1.default.mkdirSync(this.pathPast);
            console.log(`Pasta criada: ${this.pathPast}`);
        }
    }
    writeFileSync(data) {
        node_fs_1.default.writeFileSync(this.pathBase, JSON.stringify(data, null, 2));
    }
    readFileSync() {
        return JSON.parse(node_fs_1.default.readFileSync(this.pathBase, 'utf-8'));
    }
}
exports.File = File;
