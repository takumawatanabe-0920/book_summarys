import client from 'src/frontend/apiClient';

const SummaryBasePath = `${process.env.WEB_ORIGIN}${process.env.PORT}/api/v1/summaries`;

export interface User {
  _id?: string;
  id?: string;
  email: string;
  password: string;
  token?: string;
  displayName: string;
  photoURL?: string;
}

type LoadAllArgs = {
  params: {
    sortBy: string;
    order: string;
    userId: string;
    categoryId: string;
    publishingStatus: string;
    startDate: string;
    endDate: string;
  };
};

type CountArgs = {
  params: {
    userId: string;
    categoryId: string;
    publishingStatus: string;
  };
};

const loadAll = async (args: LoadAllArgs): Promise<User[]> => {
  const { params = {} } = args;
  try {
    const response = await client.get(`${SummaryBasePath}`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const count = async (args: CountArgs): Promise<User[]> => {
  const { params = {} } = args;
  try {
    const response = await client.get(`${SummaryBasePath}/count`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const load = async (id: string): Promise<User> => {
  try {
    const response = await client.get(`${SummaryBasePath}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const create = async (args: User): Promise<User> => {
  try {
    const response = await client.post(`${SummaryBasePath}`, args);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: string, args: User): Promise<User> => {
  try {
    const response = await client.put(`${SummaryBasePath}/${id}`, args);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: string): Promise<User> => {
  try {
    const response = await client.delete(`${SummaryBasePath}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { loadAll, load, update, count, create, remove };
