import { password as passwordHash } from 'bun';
import { Elysia, ElysiaInstance, NotFoundError } from 'elysia';
import { db } from '~/_common';
import { User } from './types';

db.users = [];
let userIndex = 1;

export const userRoutes = (app: Elysia<ElysiaInstance>) =>
  app.group('/users', (app) =>
    app
      .get('', () => {
        return db.users;
      })
      .get('/:id', ({ set, params }) => {
        const user = db.users.find((user) => user.id === Number(params.id));

        if (!user) {
          set.status = 404;
          return {
            msg: `No record found for ${params.id}`,
          };
        }

        return user;
      })
      .post(
        '',
        async ({ body: { password: rawPassword, ...other } }) => {
          const password = await passwordHash.hash(rawPassword);

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
          body: User,
        }
      )
      .patch('/:id', ({ body, params }) => {
        const user = db.users.find((user) => user.id === Number(params.id));
        if (!user) {
          throw new NotFoundError();
        }

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
