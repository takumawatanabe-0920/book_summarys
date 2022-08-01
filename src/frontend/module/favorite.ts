import client from 'src/frontend/apiClient';
const FavoriteBasePath = `${process.env.WEB_ORIGIN}${process.env.PORT}/api/v1/favorites`;
const UserFavoriteBasePath = `${process.env.WEB_ORIGIN}${process.env.PORT}/api/v1/users/:userId/favorites`;
const SummaryFavoriteBasePath = `${process.env.WEB_ORIGIN}${process.env.PORT}/api/v1/summaries/:summaryId/favorites`;

export interface Favorite {
  _id?: string;
  user: string;
  summary: string;
  updatedAt: Date;
  createdAt: Date;
}

const loadAll = async (): Promise<Favorite[]> => {
  try {
    const response = await client.get(`${FavoriteBasePath}`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const count = async (): Promise<number> => {
  try {
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

const loadFroUser = async (id: string): Promise<Favorite> => {
  try {
    const response = await client.get(`${UserFavoriteBasePath}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const loadSummaryFroUser = async (userId: string): Promise<Favorite> => {
  try {
    const response = await client.get(
      `${SummaryFavoriteBasePath}/user/${userId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const create = async (args: Partial<Favorite>): Promise<Favorite> => {
  try {
    const { summary, user } = args;
    const response = await client.post(`${SummaryFavoriteBasePath}`, {
      summary,
      user,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: string): Promise<Favorite> => {
  try {
    const response = await client.delete(`${SummaryFavoriteBasePath}/${id}`);
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
