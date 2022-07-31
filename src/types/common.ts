export type Resolve<T> = T extends Promise<infer R> ? R : any;
export type ValueOf<T> = T[keyof T];

export type QueryOptions = {
  startDate?: string;
  endDate?: string;
  limit?: number;
  skip?: number;
  page?: number;
  sortBy?: string;
  order?: string;
};
