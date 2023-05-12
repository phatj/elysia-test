import { Static } from '@sinclair/typebox';
import { t } from 'elysia';
import { InferStorage, Model } from '~/_common';

export const User = t.Object(
  {
    firstName: t.String(),
    lastName: t.String(),
    email: t.String(),
    password: t.String(),
  },
  { additionalProperties: false }
);

export interface User extends Static<typeof User>, Model {}

declare module '~/_common' {
  interface DataStore {
    users: InferStorage<User>;
  }
}
