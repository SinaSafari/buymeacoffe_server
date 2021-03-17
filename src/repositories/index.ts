export interface IRepository<T> {
  entityRepository: any;
  getAll(): Promise<Array<T>>;
  getSingle(id: number): Promise<T>;
  create(payload: any): Promise<T>;
  updatePut(payload: any): Promise<T>;
  updatePatch?(payload: any): Promise<T>;
  delete(payload: any): boolean;
}
