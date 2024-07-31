#!/usr/bin/env ts-node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const index_conf_1 = require("./conf/index.conf");
commander_1.program.version('0.0.1');
for (const file of index_conf_1.commandFiles) {
    const command = require(`${index_conf_1.pathPastCommands}/${file}`); // Importar o arquivo
    const [nameCommand,] = file.split('.');
    commander_1.program
        .command(nameCommand)
        .description('Inicialização da blingApp')
        .action(command.execute);
}
commander_1.program.parse(process.argv);
