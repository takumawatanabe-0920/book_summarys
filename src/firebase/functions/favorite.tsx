// import dayjs from "dayjs"
import { firebase } from '../config';
const db = firebase.firestore();
import { Favorite, ResFavorite, ResultResponse } from '../../types';

// done
export const createFavorite = async (
  values: Favorite,
): Promise<ResultResponse<ResFavorite>> => {
  const { user_id, summary_id } = values;
  if (!user_id || !summary_id) {
    return { status: 400, error: 'user_id or summary_id is exist' };
  }
  values.create_date = firebase.firestore.Timestamp.now();
  values.updatedAt = firebase.firestore.Timestamp.now();
  const response = db
    .collection('favorite')
    .add({
      ...values,
    })
    .then((res) => {
      const data: ResFavorite = { id: res.id };
      return { status: 200, data };
    })
    .catch((error) => {
      return { status: 400, data: error };
    });

  return response;
};
// done
export const deleteFavorite = async (
  favoriteId: string,
): Promise<ResultResponse<ResFavorite>> => {
  if (!favoriteId) {
    return { status: 400, error: 'favoriteId is exist' };
  }
  const response = db
    .collection('favorite')
    .doc(favoriteId)
    .delete()
    .then((res) => {
      return { status: 200 };
    })
    .catch((error) => {
      return { status: 400, error };
    });

  return response;
};
