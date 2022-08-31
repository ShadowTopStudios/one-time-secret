import { IncomingMessage, ServerResponse } from 'http';
import * as nodeUrl from 'url';

import { WebControllerInterface } from './WebControllerInterface';
import { StorageInterface } from '../one-time-secret/StorageInterface';
const sqlite3 = require('sqlite3').verbose();

export class FetchController implements WebControllerInterface {
  public constructor(
    private secretStore: StorageInterface,
    private decrypt: Function
  ) {}

  public async execute(request: IncomingMessage, response: ServerResponse) {
    const url = nodeUrl.parse(<string> request.url, true);

    try{
      const db = new sqlite3.Database('zonos_encrypt_decrypt.db', (err: any) => {
        if (err) {
         
          console.error(err.message);
        }
        console.log('Connected to the in-memory SQlite database.');
      });

      db.run(`DELETE FROM oneTimeMapper WHERE secretIdentifier LIKE '%${request.url}%'`, (err: any) => {
        if (err) {
          console.error(err);
        }
        console.log("deleted");
      });

      db.close();
    }catch(err){
      console.log(err);
    }

    response.writeHead(200, { 'Content-Type': 'text/plain' });

    const secret = await this.secretStore.get(<string> url.query.key);
    // Brute forces will have to wait 200ms or flood the server.
    setTimeout(() => {
      if (! (url.query.key && url.query.iv && url.query.pass)) {
        response.end('');
        return;
      }

      if (!secret.secret) {
        response.end('');
        return;
      }

      const iv = Buffer.from(<string> url.query.iv, 'hex');
      const pass = url.query.pass;

      const decrypted = this.decrypt(secret.secret, iv, pass);
      response.end(decrypted);
    }, 200);
  }
}
