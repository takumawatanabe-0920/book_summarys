import client from 'src/frontend/apiClient';
import { QueryOptions } from 'src/types/common';
const SummaryBasePath = `${process.env.WEB_ORIGIN}${process.env.PORT}/api/v1/summaries`;

export interface Summary {
  _id?: string;
  id?: string;
  title: string;
  bookName: string;
  content: string;
  discription: string;
  thumbnail: string;
  publishingStatus: string;
  image: string;
  category: any;
  subCategory: any;
  user: string;
  updatedAt: Date;
  createdAt: Date;
}

type LoadAllArgs = {
  params: {
    userId?: string;
    categoryId?: string;
    publishingStatus?: string;
  } & QueryOptions;
};

const publishingSettings = [
  { id: 'public', name: '公開' },
  { id: 'private', name: '非公開' },
] as const;

type CountArgs = {
  params: {
    userId?: string;
    categoryId?: string;
    publishingStatus?: string;
  };
};

const loadAll = async (args: LoadAllArgs): Promise<Summary[]> => {
  const { params = {} } = args;
  try {
    const response = await client.get(`${SummaryBasePath}`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const count = async (args: CountArgs): Promise<number> => {
  const { params = {} } = args;
  try {
    const response = await client.get(`${SummaryBasePath}/count`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const load = async (id: string): Promise<Summary> => {
  try {
    const response = await client.get(`${SummaryBasePath}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const create = async (args: Partial<Summary>): Promise<Summary> => {
  try {
    const {
      title,
      bookName,
      content,
      discription,
      thumbnail,
      publishingStatus,
      image,
      category,
      subCategory,
      user,
    } = args;
    const response = await client.post(`${SummaryBasePath}`, {
      title,
      bookName,
      content,
      discription,
      thumbnail,
      publishingStatus,
      image,
      category,
      subCategory,
      user,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: string, args: Partial<Summary>): Promise<Summary> => {
  try {
    const {
      title,
      bookName,
      content,
      discription,
      thumbnail,
      publishingStatus,
      image,
      category,
      subCategory,
      user,
    } = args;
    const response = await client.put(`${SummaryBasePath}/${id}`, {
      title,
      bookName,
      content,
      discription,
      thumbnail,
      publishingStatus,
      image,
      category,
      subCategory,
      user,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: string): Promise<Summary> => {
  try {
    const response = await client.delete(`${SummaryBasePath}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { loadAll, load, update, count, create, remove, publishingSettings };
