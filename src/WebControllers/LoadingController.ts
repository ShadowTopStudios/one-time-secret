import { IncomingMessage, ServerResponse } from 'http';
import * as nodeUrl from 'url';

import { WebControllerInterface } from './WebControllerInterface';
const sqlite3 = require('sqlite3').verbose();

export class LoadingController implements WebControllerInterface {
  public constructor(
//    private env: { PUBLISH_SECRET_URI: string },
    private render: Function
  ) {}

  public execute(request: IncomingMessage, response: ServerResponse) {
    
    const url = nodeUrl.parse(<string> request.url, true);
    
    const dbKey =  url.query.key;

    const db = new sqlite3.Database('zonos_encrypt_decrypt.db', (err: any) => {
      if (err) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(this.render());
        return console.error(err.message);
      }
      console.log('Connected to the in-memory SQlite database.');
    });

    db.get("SELECT secretIdentifier FROM oneTimeMapper WHERE randomIdentifier = ?", [dbKey], (err: any, row: any) => {
      if (err || !row) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(this.render());
        return console.error(err);
      }
      console.log(row);

      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(this.render(row.secretIdentifier));
      
    });
    db.close();
    console.log("closed connection");

  }
}
