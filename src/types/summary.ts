//要約スキーマ
export type SummaryBook = Partial<{
  title: string;
  book_name: string;
  content: any;
  discription: string;
  category: any;
  sub_category: any;
  user_id: any;
  user_name: string;
  thumbnail: string;
  favorite_id: [];
  favorite_count: number;
  publishing_status: string;
  create_date: firebase.firestore.Timestamp;
  update_date: firebase.firestore.Timestamp;
}>;

export type Category = Partial<{
  name: string;
  slug: string;
  display_order: number;
  image: string;
}>;

export type SubCategory = Partial<{
  category_id: string;
  name: string;
  slug: string;
  display_order: number;
}>;

export type ResSummaryBook = SummaryBook & {
  id?: string;
};

export type ResCategory = Category & {
  id?: string;
};

export type ResSubCategory = SubCategory & {
  id?: string;
};
