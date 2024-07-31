import fs from 'node:fs';
import { ICommand } from '../interfaces/command.interface';
import { configJSON, pathConfigJson, pathDataBase, pathPastDataBase } from '../conf/index.conf';

export = {
  async execute() {

    if (!fs.existsSync(pathPastDataBase)) {
      fs.mkdirSync(pathPastDataBase);
      console.log(`Pasta criada: ${pathPastDataBase}`);
    }

    fs.writeFileSync(pathConfigJson, JSON.stringify(configJSON, null, 2));
    fs.writeFileSync(pathDataBase, JSON.stringify({}, null, 2));

    console.log('Aplicação BlingApp iniciada!');
  }

} as ICommand;
