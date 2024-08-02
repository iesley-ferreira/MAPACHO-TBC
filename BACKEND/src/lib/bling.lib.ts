import path from 'node:path';
import { writeFileSync } from 'node:fs';

class BlingLib {
  private token: string
  private pathBase: string = path.resolve(__dirname, '..', 'data', 'bling')

  constructor(token: string) {
    this.token = token
  }

  public async createPathBase() {

  }
}
