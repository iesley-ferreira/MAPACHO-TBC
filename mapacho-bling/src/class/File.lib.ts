import path from 'node:path'
import fs from 'node:fs'

export class File {
  private pathPast = path.resolve(process.cwd(), 'bling');
  private pathBase = path.resolve(this.pathPast, 'data.json');

  constructor() {
    if (!fs.existsSync(this.pathPast)) {
      fs.mkdirSync(this.pathPast);
      console.log(`Pasta criada: ${this.pathPast}`);
    }
  }

  public writeFileSync(data: any) {
    fs.writeFileSync(this.pathBase, JSON.stringify(data, null, 2));
  }

  public readFileSync() {
    return JSON.parse(fs.readFileSync(this.pathBase, 'utf-8'));
  }
}
