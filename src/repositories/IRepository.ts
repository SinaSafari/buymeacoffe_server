export interface IRepository<T, P> {
  getAll(): Promise<Array<T>>;
  getSingle(id: number): Promise<T | undefined>;
  create(payload: P): Promise<T>;
  updatePut(payload: P): Promise<T | undefined>;
  updatePatch(payload: P): Promise<T | undefined>;
  delete(payload: P): Promise<boolean | undefined>;
}
