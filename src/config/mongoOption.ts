import * as mongoose from 'mongoose';
import { ClientSession, startSession } from 'mongoose';
export { ClientSession } from 'mongoose';

const defaultOptions = {
  defaultTransactionOptions: {
    readPreference: 'primary',
  },
};
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

const withTransaction = async <T>(
  block: (session: ClientSession) => Promise<T>,
): Promise<T> => {
  const session = await startSession();
  let result: T;
  try {
    await session.withTransaction(async (session) => {
      result = await block(session);
    });
  } catch (err) {
    throw err;
  } finally {
    session.endSession();
  }
  return result;
};
export { PaginationOptions, repositories, withTransaction };
