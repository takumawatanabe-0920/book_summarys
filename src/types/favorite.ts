export type Favorite = Partial<{
  user_id: string;
  summary_id: any;
  create_date: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}>;

export type ResFavorite = Favorite & {
  id?: string;
};
