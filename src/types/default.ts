export type ResultResponse<T> = Partial<{
  status: number;
  data: T;
  error: any;
}>;
