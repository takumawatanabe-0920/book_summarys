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
  favorites: any[];
}

type LoadAllArgs = {
  params: {
    userId?: string;
    categoryId?: string;
    publishingStatus?: string;
  } & QueryOptions;
  dataRange?: 'all' | 'month' | 'week';
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
  dataRange?: 'all' | 'month' | 'week';
};

const loadAll = async (args: LoadAllArgs): Promise<Summary[]> => {
  const { params = {}, dataRange = 'all' } = args;
  let startDate: Date;
  let endDate: Date;
  if (dataRange === 'month') {
    const date = new Date();
    startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  } else if (dataRange === 'week') {
    const today = new Date();
    const this_year = today.getFullYear();
    const this_month = today.getMonth();
    const date = today.getDate();
    const day_num = today.getDay();
    const this_monday = date - day_num + 1;
    const this_sunday = this_monday + 6;
    startDate = new Date(this_year, this_month, this_monday);
    endDate = new Date(this_year, this_month, this_sunday);
  } else if (dataRange === 'all') {
    startDate = new Date(2020, 11);
    endDate = new Date();
  }
  try {
    const response = await client.get(`${SummaryBasePath}`, {
      params: { ...params, startDate, endDate },
    });
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
