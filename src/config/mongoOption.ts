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
  console.log('0: ==========================================================');
  const session = await startSession();
  console.log('1: ==========================================================');
  let result: T;
  try {
    await session.withTransaction(async (session) => {
      result = await block(session);
    });
    console.log(
      '3: ==========================================================',
    );
  } catch (err) {
    throw err;
  } finally {
    console.log(
      '4: ==========================================================',
    );
    session.endSession();
  }
  console.log('5: ==========================================================');
  return result;
};
export { PaginationOptions, repositories, withTransaction };
