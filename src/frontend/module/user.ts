import client from 'src/frontend/apiClient';
const UserBasePath = `${process.env.WEB_ORIGIN}${process.env.PORT}/api/v1/users`;
const AuthBasePath = `${process.env.WEB_ORIGIN}${process.env.PORT}/api/v1/auth`;
export interface User {
  _id?: string;
  id?: string;
  email: string;
  password: string;
  token?: string;
  displayName: string;
  photoURL?: string;
}
type SignupArgs = User;

const signup = async (args: SignupArgs): Promise<User> => {
  try {
    const { email, password, displayName } = args;
    const response = await client.post(`${AuthBasePath}/signup`, {
      email,
      password,
      displayName,
    });
    console.log({ response });
    if (!response.data?.token) {
      throw new Error('token is required');
    }
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

type LoginArgs = Pick<User, 'email' | 'password'>;

const login = async (args: LoginArgs): Promise<User> => {
  try {
    const { email, password } = args;
    const response = await client.post(`${AuthBasePath}/login`, {
      email,
      password,
    });
    console.log({ response });
    if (!response.data?.token) {
      throw new Error('token is required');
    }
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const showMe = async (): Promise<User> => {
  try {
    const response = await client.get(`${AuthBasePath}/@me`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const logout = async (): Promise<void> => {
  try {
    localStorage.removeItem('token');
  } catch (error) {
    throw error;
  }
};

const loadAll = async (): Promise<User[]> => {
  try {
    const response = await client.get(`${UserBasePath}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const load = async (id: string): Promise<User> => {
  try {
    const response = await client.get(`${UserBasePath}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: string, args: User): Promise<User> => {
  try {
    const response = await client.put(`${UserBasePath}/${id}`, args);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deactivate = async (id: string): Promise<User> => {
  try {
    const response = await client.delete(`${UserBasePath}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { signup, login, logout, loadAll, load, update, deactivate, showMe };
