import { Elysia } from 'elysia';
import { DataStore } from './_common';
import { logger } from '@/logger';

const app = new Elysia();

app.get('/', () => 'Hello Elysia').listen(8080);

const db: DataStore = {
  users: [],
};

app.group('/users', (app) =>
  app
    .get('/', () => {
      return db.users;
    })
    .get('/:id', ({ params }) => {
      return db.users.find((user) => user.id === Number(params.id));
    })
    .post('/', ({ body }) => {
      return body;
    })
    .patch('/:id', () => {
      return true;
    })
    .delete('/:id', () => {
      return true;
    })
);

logger.info(
  '🦊 Elysia is running at %s:%d',
  app.server.hostname,
  app.server.port
);
