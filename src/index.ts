import { logger } from '@/logger';
import { Elysia } from 'elysia';
import { userRoutes } from './users';

const app = new Elysia();

app.use(userRoutes);
app.get('/', () => 'Hello Elysia');

app.listen(process.env.PORT || 8080);

logger.info(
  '🦊 Elysia is running at %s:%d',
  app.server?.hostname,
  app.server?.port
);

export type App = typeof app;
