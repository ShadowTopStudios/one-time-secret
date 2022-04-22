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
        var QRCode = require('qrcode');
        var request = require('request');

        _this.secretStore.set(secretKey, <{secret: string}> { secret: encryptedMessage }, +<string> parsedBody.ttl);

        const secretUrl = new URL('/fetch', process.env.DOMAIN);
        secretUrl.searchParams.append('key', secretKey);
        secretUrl.searchParams.append('iv', iv.toString('hex'));
        secretUrl.searchParams.append('pass', pass);

        request({
            url: "https://is.gd/create.php?format=simple&url="+encodeURIComponent(secretUrl.toString()),
            json: true
        }, async function (error: any, reqResponse: any, body: any) {
            if (!error && reqResponse.statusCode == 200) {
              QRCode.toDataURL(body, function (err: any, url: any) {
                if(!err) {
                  response.writeHead(200, { 'Content-Type': 'text/html' });
                  response.end(_this.render(body, url));
                }
              });     
            } else {
                console.log('error', error);
                response.writeHead(402, { 'Content-Type': 'text/html' });
                response.end(_this.render("failed to generate short url"));
            }
            resolve(undefined);
        });

       
      });
    });
  }
}
