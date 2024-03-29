import client from 'src/frontend/apiClient';
import { QueryOptions } from 'src/types/common';
import { WebOrigin } from 'src/frontend/config';
const SubCategoryBasePath = `${WebOrigin}/api/v1/subCategories`;

export interface SubCategory {
  _id?: string;
  name: string;
  slug: string;
  displayOrder: number;
  image?: string;
  updatedAt: Date;
  createdAt: Date;
}

type LoadAllArgs = {
  params: { categoryId: string } & QueryOptions;
};

const loadAll = async (args: LoadAllArgs): Promise<SubCategory[]> => {
  const { params = {} } = args;
  try {
    const response = await client.get(`${SubCategoryBasePath}`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { loadAll };
