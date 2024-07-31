"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const node_fs_1 = __importDefault(require("node:fs"));
const index_conf_1 = require("../conf/index.conf");
module.exports = {
    async execute() {
        if (!node_fs_1.default.existsSync(index_conf_1.pathPastDataBase)) {
            node_fs_1.default.mkdirSync(index_conf_1.pathPastDataBase);
            console.log(`Pasta criada: ${index_conf_1.pathPastDataBase}`);
        }
        node_fs_1.default.writeFileSync(index_conf_1.pathConfigJson, JSON.stringify(index_conf_1.configJSON, null, 2));
        node_fs_1.default.writeFileSync(index_conf_1.pathDataBase, JSON.stringify({}, null, 2));
        console.log('Aplicação BlingApp iniciada!');
    }
};
