import client from 'src/frontend/apiClient';
import { QueryOptions } from 'src/types/common';
import { getId } from 'src/config/objectId';
import { WebOrigin } from 'src/frontend/config';
const FavoriteBasePath = `${WebOrigin}/api/v1/favorites`;
const UserFavoriteBasePath = ({ userId }) =>
  `${WebOrigin}/api/v1/users/${userId}/favorites`;
const SummaryFavoriteBasePath = ({ summaryId }) =>
  `${WebOrigin}/api/v1/summaries/${summaryId}/favorites`;

export interface Favorite {
  _id?: string;
  user: string;
  summary: any;
  updatedAt: Date;
  createdAt: Date;
}

const loadAll = async (): Promise<Favorite[]> => {
  try {
    const response = await client.get(`${FavoriteBasePath}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

type CountArgs = {
  params: {
    userId?: string;
    summaryId?: string;
  };
};
const count = async (args: CountArgs): Promise<number> => {
  try {
    const { params = {} } = args;
    const response = await client.get(`${FavoriteBasePath}/count`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const load = async (id: string): Promise<Favorite> => {
  try {
    const response = await client.get(`${FavoriteBasePath}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

type LoadForUserArgs = {
  params: {
    userId: string;
  } & QueryOptions;
};
const loadFroUser = async (args: LoadForUserArgs): Promise<Favorite[]> => {
  const { params = { userId: '' } } = args;
  try {
    const response = await client.get(
      `${UserFavoriteBasePath({ userId: params.userId })}`,
      { params },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const loadSummaryFroUser = async ({
  userId,
  summaryId,
}: {
  userId: string;
  summaryId: string;
}): Promise<Favorite> => {
  try {
    const response = await client.get(
      `${SummaryFavoriteBasePath({ summaryId })}/user/${userId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const create = async (args: Partial<Favorite>): Promise<Favorite> => {
  try {
    const { summary, user } = args;
    const response = await client.post(
      `${SummaryFavoriteBasePath({ summaryId: getId(summary) })}`,
      {
        summary,
        user,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async ({
  favoriteId,
  summaryId,
}: {
  favoriteId: string;
  summaryId: string;
}): Promise<Favorite> => {
  try {
    const response = await client.delete(
      `${SummaryFavoriteBasePath({
        summaryId,
      })}/${favoriteId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  loadAll,
  loadSummaryFroUser,
  loadFroUser,
  load,
  count,
  create,
  remove,
};
