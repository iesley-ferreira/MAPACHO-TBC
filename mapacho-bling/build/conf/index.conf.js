"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configJSON = exports.commandFiles = exports.pathPastCommands = exports.pathConfigJson = exports.pathDataBase = exports.pathPastDataBase = void 0;
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
exports.pathPastDataBase = node_path_1.default.resolve(process.cwd(), 'bling');
exports.pathDataBase = node_path_1.default.resolve(exports.pathPastDataBase, 'data.json');
exports.pathConfigJson = node_path_1.default.resolve(exports.pathPastDataBase, 'config.json');
exports.pathPastCommands = node_path_1.default.resolve(__dirname, '..', 'commands');
exports.commandFiles = node_fs_1.default.readdirSync(exports.pathPastCommands).filter(file => file.endsWith('.command.ts'));
exports.configJSON = {
    userCache: false
};
