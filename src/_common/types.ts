export interface Model {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type InferStorage<T extends Model> = Array<T>;

export interface DataStore {}
