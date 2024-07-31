#!/usr/bin/env ts-node

import { program } from 'commander';
import { commandFiles, pathPastCommands } from './conf/index.conf';
import { ICommand } from './interfaces/command.interface';

program.version('0.0.1');

for (const file of commandFiles) {
  const command: ICommand = require(`${pathPastCommands}/${file}`); // Importar o arquivo

  const [nameCommand, ] = file.split('.');

  program
    .command(nameCommand)
    .description('Inicialização da blingApp')
    .action(command.execute);
}

program.parse(process.argv);
