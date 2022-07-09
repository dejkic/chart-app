export interface IUpdateable<T> {
    update: (obj: Partial<T>) => T;
}