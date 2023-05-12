import { TransformableInfo, Format } from 'logform';
import { format } from 'winston';

type TagOpts = {
  tag?: string;
};

type TaggableInfo = TransformableInfo & TagOpts;

interface TaggedFormat {
  (opts: TagOpts): Format;
}

export const taggedFormat: TaggedFormat = format((info: TaggableInfo, opts) => {
  const tag: string = info.tag ?? opts.tag;

  if (tag) {
    info.message = `[${tag}] ${info.message}`;
  }

  if (info.tag) {
    delete info.tag;
  }

  return info;
});
