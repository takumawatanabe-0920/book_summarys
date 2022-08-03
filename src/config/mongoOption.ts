import * as mongoose from 'mongoose';
export { ClientSession } from 'mongoose';

type PaginationOptions = {
  page?: number;
  limit?: number;
  sort?: string;
  direction?: 'asc' | 'desc';
};

namespace repositories {
  export type BaseOptions = {
    session?: mongoose.ClientSession;
  };
}

export { PaginationOptions, repositories };
