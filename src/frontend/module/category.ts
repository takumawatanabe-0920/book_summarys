import client from 'src/frontend/apiClient';
import { WebOrigin } from 'src/frontend/config';
const CategoryBasePath = `${WebOrigin}/api/v1/categories`;

export interface Category {
  _id?: string;
  name: string;
  slug: string;
  displayOrder: number;
  image?: string;
  updatedAt: Date;
  createdAt: Date;
}

const loadAll = async (): Promise<Category[]> => {
  try {
    const response = await client.get(`${CategoryBasePath}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { loadAll };
