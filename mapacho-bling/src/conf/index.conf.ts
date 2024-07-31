import path from 'node:path';
import fs from 'node:fs';

export const pathPastDataBase = path.resolve(process.cwd(), 'bling');

export const pathDataBase = path.resolve(pathPastDataBase, 'data.json');
export const pathConfigJson = path.resolve(pathPastDataBase, 'config.json');

export const pathPastCommands = path.resolve(__dirname, '..', 'commands');
export const commandFiles = fs.readdirSync(pathPastCommands).filter(file => file.endsWith('.command.ts'));


export const configJSON = {
  userCache: false
}
