export type Resolve<T> = T extends Promise<infer R> ? R : any;
export type ValueOf<T> = T[keyof T];
