import React from 'react';
const db = firebase.firestore();
import {
  RegisterUser,
  Login,
  ResultResponse,
  ResultResponseList,
  ResUser,
  ResUser as CurrentUser,
} from '../../types';
import { firebase } from '../config';
import { responseUploadImage } from './';
import { getImage } from '../../firebase/functions/defalt';

export const getCurrentUser = (): CurrentUser => {
  const currentUserData = localStorage.getItem('user');
  const currentUser: CurrentUser = currentUserData
    ? JSON.parse(currentUserData)
    : '';
  return currentUser;
};

export const register = async (
  email: string,
  password: string,
  displayName: string,
  photoURL: string,
): Promise<ResultResponse<RegisterUser>> => {
  const resUser: ResultResponseList<ResUser> = await checkAlreadyEmail(email);
  if (resUser && resUser.status === 200 && resUser.data.length > 0) {
    return { status: 400, error: 'user is exist' };
  }
  const response = firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async (result) => {
      const user = db
        .collection('user')
        .add({
          displayName,
          photoURL,
          login_id: result.user.uid,
          email: result.user.email,
          create_date: firebase.firestore.Timestamp.now(),
          update_date: firebase.firestore.Timestamp.now(),
        })
        .then(async (res) => {
          await setUser(res.id, 'register');
          return { status: 200 };
        })
        .catch((error) => {
          console.log(error);
          return { status: 400, error };
        });
      return user;
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, error };
    });
  return response;
};

export const updateUser = async (
  id: string,
  uid: string,
  displayName: string,
  photoURL: string,
): Promise<ResultResponse<RegisterUser>> => {
  const response = db
    .collection('user')
    .doc(id)
    .update({
      displayName,
      photoURL,
      update_date: firebase.firestore.Timestamp.now(),
    })
    .then(async (res) => {
      await setUser(uid, 'login');
      return { status: 200 };
    })
    .catch((error) => {
      console.log(error);
      return { status: 400 };
    });
  return response;
};

export const login = (
  email: string,
  password: string,
): Promise<ResultResponse<Login>> => {
  const response = firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(
      async (res) => {
        await setUser(res.user.uid, 'login');
        return { status: 200 };
      },
      (err) => {
        return { status: 400 };
      },
    );
  return response;
};

export const logout = (): Promise<ResultResponse<Login>> => {
  const response = firebase
    .auth()
    .signOut()
    .then(async (res) => {
      await deleteLocalStrage('user');
      return { status: 200 };
    })
    .catch((error) => {
      return { status: 400, error };
    });
  return response;
};

export const getIdUser = (id: string): Promise<ResultResponse<ResUser>> => {
  const response = db
    .collection('user')
    .doc(id)
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        let photoURL: string = '';
        if (doc.data().photoURL) {
          photoURL = await responseUploadImage(doc.data().photoURL);
        }
        const data = { id: doc.id, ...doc.data(), photoURL };
        return { status: 200, data };
      }
    })
    .catch((error) => {
      return { status: 400, error };
    });

  return response;
};

const getUidUser = (uid: string): Promise<ResultResponse<ResUser[]>> => {
  const response = db
    .collection('user')
    .where('login_id', '==', uid)
    .get()
    .then(async (res) => {
      let resData: ResUser[] = await Promise.all(
        res.docs.map(async (doc) => {
          let photoURL: string = '';
          if (doc.data().photoURL) {
            photoURL = await responseUploadImage(doc.data().photoURL);
          }
          return { id: doc.id, ...doc.data(), photoURL };
        }),
      );
      return { status: 200, data: resData };
    })
    .catch((error) => {
      return { status: 400, error };
    });

  return response;
};

const checkAlreadyEmail = (
  email: string,
): Promise<ResultResponse<ResUser[]>> => {
  const response = db
    .collection('user')
    .where('email', '==', email)
    .get()
    .then((res) => {
      let resData: ResUser[] = res.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      return { status: 200, data: resData };
    })
    .catch((error) => {
      return { status: 400, error };
    });

  return response;
};

//private
const setLocalStrage = (user: CurrentUser): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

const deleteLocalStrage = (key: string): void => {
  localStorage.removeItem(key);
};

const setUser = async (
  id: string,
  type: string,
): Promise<ResultResponse<ResUser>> => {
  let resUser: ResultResponse<ResUser | ResUser[]>;
  if (type === 'register') {
    resUser = await getIdUser(id);
  } else if (type === 'login') {
    resUser = await getUidUser(id);
  }
  let user: ResUser;
  if (resUser && resUser.status === 200) {
    user = Array.isArray(resUser.data) ? resUser.data[0] : resUser.data;
  } else if (resUser && resUser.status === 400) {
    return { status: 400, error: 'user is not find' };
  }
  firebase.auth().onAuthStateChanged((login) => {
    if (login) {
      const { uid, email } = login;
      let { id, displayName, photoURL, update_date, create_date } = user;

      const currentUser: CurrentUser = {
        id,
        displayName,
        photoURL,
        login_id: uid,
        update_date,
        create_date,
        email,
      };
      setLocalStrage(currentUser);
    } else {
      return { status: 400, error: 'login is not yet' };
    }
  });
};
