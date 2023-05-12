import { logger } from '@/logger';
import { Elysia } from 'elysia';
import { userRoutes } from './users';

const app = new Elysia();

app.use(userRoutes);

app.listen(8080);

logger.info(
  '🦊 Elysia is running at %s:%d',
  app.server.hostname,
  app.server.port
);
