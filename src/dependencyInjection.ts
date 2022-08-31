import { createServer } from 'http';

import { HTTPD } from './httpd/HTTPD';
import { RequestHandler } from './httpd/RequestHandler';
import { getRouter } from './WebControllers/router';
import { AuthorController } from './WebControllers/AuthorController';
import { ConfirmationController } from './WebControllers/ConfirmationController';
import { LoadingController } from './WebControllers/LoadingController';
import { FetchController } from './WebControllers/FetchController';
import { render as ConfirmationView } from './templates/ConfirmationView';
import { render as AuthorView } from './templates/AuthorView';
import { render as LoadingView } from './templates/LoadingView';
import { InMemoryStorage } from './one-time-secret/InMemoryStorage';
import { generateNewSlug } from './CSRNGSlugs/SlugGenerator';
import { generateIv, encrypt, decrypt } from './crypto/crypto';

import { env } from './env';
import { logger } from './logger';

const secretStore = new InMemoryStorage();

const createHttpd = (router: any) => {
  const nodeServer = createServer();
  const requestHandler = new RequestHandler(logger, router);
  const httpd = new HTTPD(logger, nodeServer, requestHandler, env.HTTP_PORT, env.HTTP_TIMEOUT_MS);

  return httpd;
};

const authorController = new AuthorController(env, AuthorView);
const confirmationController = new ConfirmationController(
  env,
  ConfirmationView,
  secretStore,
  generateNewSlug,
  generateIv,
  encrypt,
);

// add new page that displays the middleware loading page
const loadingController = new LoadingController(
  LoadingView
);

const fetchController = new FetchController(
  secretStore,
  decrypt
);

const createApp = () => {
  const router = getRouter(
    env.PUBLISH_SECRET_URI,
    fetchController.execute.bind(fetchController),
    confirmationController.execute.bind(confirmationController),
    authorController.execute.bind(authorController),
    loadingController.execute.bind(loadingController)
  );

  const httpd = createHttpd(router);

  return httpd;
};

export { createApp };
