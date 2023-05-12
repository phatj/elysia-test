import { Elysia, ElysiaInstance } from 'elysia';
import { createHash } from 'node:crypto';
import { db } from '~/_common';
import { User } from './types';

db.users = [];
let userIndex = 1;

export const userRoutes = (app: Elysia<ElysiaInstance>) =>
  app.group('/users', (app) =>
    app
      .get('/', () => {
        return db.users;
      })
      .get('/:id', ({ params }) => {
        return db.users.find((user) => user.id === Number(params.id));
      })
      .post(
        '/',
        ({ body: { password: rawPassword, ...other } }) => {
          const hash = createHash('sha256');
          const password = hash.update(rawPassword).digest('hex');

          const user: User = {
            id: userIndex++,
            ...other,
            password,
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          db.users.push(user);

          return user;
        },
        {
          schema: {
            body: User,
          },
        }
      )
      .patch('/:id', ({ body, params }) => {
        const user = db.users.find((user) => user.id === Number(params.id));
        Object.assign(user, body);

        return user;
      })
      .delete('/:id', ({ set, params }) => {
        const index = db.users.findIndex(
          (user) => user.id === Number(params.id)
        );

        if (index < 0) {
          set.status = 404;
          return {
            msg: `No record found for ${params.id}`,
          };
        }

        const user = {
          ...db.users[index],
        };

        db.users.splice(index, 1);

        return user;
      })
  );
