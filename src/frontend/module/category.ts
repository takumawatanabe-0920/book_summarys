import client from 'src/frontend/apiClient';
import { QueryOptions } from 'src/types/common';
const CategoryBasePath = `${process.env.WEB_ORIGIN}${process.env.PORT}/api/v1/categories`;

export interface Category {
  _id?: string;
  name: string;
  slug: string;
  displayOrder: number;
  image?: string;
  updatedAt: Date;
  createdAt: Date;
}

type LoadAllArgs = {
  params: QueryOptions;
};

const loadAll = async (args: LoadAllArgs): Promise<Category[]> => {
  const { params = {} } = args;
  try {
    const response = await client.get(`${CategoryBasePath}`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { loadAll };