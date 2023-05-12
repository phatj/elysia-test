import { InferStorage, Model } from '~/_common';

export interface User extends Model {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

declare module '~/_common' {
  interface DataStore {
    users: InferStorage<User>;
  }
}
