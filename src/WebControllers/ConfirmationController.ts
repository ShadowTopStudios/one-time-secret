import { IncomingMessage, ServerResponse } from 'http';
import * as querystring from 'querystring';

import { WebControllerInterface } from './WebControllerInterface';
import { StorageInterface } from '../one-time-secret/StorageInterface';

export class ConfirmationController implements WebControllerInterface {
  public constructor(
    private env: { KEY_NAME_RANDOM_BYTES: number, DOMAIN: string , MAX_UPLOAD_KB: number },
    private render: Function,
    private secretStore: StorageInterface,
    private generateNewSlug: Function,
    private generateIv: Function,
    private encrypt: Function
  ) {}

  public execute(request: IncomingMessage, response: ServerResponse) {
    const secretKey = this.generateNewSlug(this.env.KEY_NAME_RANDOM_BYTES);
    return new Promise((resolve, reject) => {
      let body = '';
      request.on('data', (data) => {
        body += data;
        if (body.length > 1024 * this.env.MAX_UPLOAD_KB) { // 128 kb // TODO set as envvar
          request.connection.destroy();
          reject();
        }
      });

      request.on('end', async () => {
        const parsedBody = querystring.parse(body);
        const iv = this.generateIv();
        const pass = this.generateIv().toString('hex');
        const encryptedMessage = this.encrypt(parsedBody.secret, iv, pass);
        let _this = this;
        _this.secretStore.set(secretKey, <{secret: string}> { secret: encryptedMessage }, +<string> parsedBody.ttl);

        const secretUrl = new URL('/fetch', `https://bdodroid-shadowtopstudios-one-time-secret-5grv7v9jfvpgq-8080.githubpreview.dev`);
        secretUrl.searchParams.append('key', secretKey);
        secretUrl.searchParams.append('iv', iv.toString('hex'));
        secretUrl.searchParams.append('pass', pass);

        var urlShortener = require("node-url-shortener");

        urlShortener.short(encodeURIComponent(secretUrl.toString()), function (err: any, url: String) {
          if(err){
            console.log(err);
            response.writeHead(402, { 'Content-Type': 'text/html' });
            response.end(_this.render("failed to generate short url"));
            resolve(undefined);
          }else{ 
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(_this.render(url.toString()));
            resolve(undefined);
          }
        });
      });
    });
  }
}
