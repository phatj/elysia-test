import { createLogger, format, transports } from 'winston';
import { taggedFormat } from './tagged-format';

const filter = format((info) => {
  const { LOG_FILTER } = process.env;
  const matcher = new RegExp(`^\\[${LOG_FILTER}`);

  if (LOG_FILTER && !info.message.match(matcher)) {
    return false;
  }

  return info;
});

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
export const logger = createLogger({
  level: process.env.DEBUG === 'true' ? 'debug' : 'info',
  format: format.combine(
    filter(),
    taggedFormat({ tag: 'app' }),
    format.splat(),
    format.simple()
  ),
  transports: [new transports.Console()],
});
