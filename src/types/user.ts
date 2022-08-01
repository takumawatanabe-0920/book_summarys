type OnlyEmailLogin = Pick<Login, 'email'>;

export type RegisterUser = Partial<{
  displayName: string;
  photoURL: string;
  email: string;
  password: string;
  create_date: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}>;

export type User = Partial<{
  displayName: string;
  photoURL: string;
  token: string;
  email: string;
  create_date: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}>;

export type Login = Partial<{
  email: string;
  password: string;
}>;

export type ResLogin = OnlyEmailLogin & {
  uid?: string;
};

export type ResUser = User & {
  id?: string;
};
