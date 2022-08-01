//要約スキーマ
export type Category = Partial<{
  name: string;
  slug: string;
  displayOrder: number;
  image: string;
}>;

export type SubCategory = Partial<{
  category_id: string;
  name: string;
  slug: string;
  displayOrder: number;
}>;

export type ResCategory = Category & {
  id?: string;
};

export type ResSubCategory = SubCategory & {
  id?: string;
};
