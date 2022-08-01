// import dayjs from "dayjs"
import { firebase } from '../config';
const db = firebase.firestore();
import {
  Favorite,
  ResFavorite,
  ResultResponse,
  ResultResponseList,
  ResSummaryBook,
} from '../../types';
import { load as loadSummary } from 'src/frontend/module/summary';
// done
export const getFavorite = (
  userId?: string,
  summaryId?: string,
): Promise<ResultResponseList<ResFavorite>> => {
  if (!userId) return;
  if (!summaryId) return;
  const response = db
    .collection('favorite')
    .where('user_id', '==', userId)
    .where('summary_id', '==', summaryId)
    .get()
    .then((res) => {
      const resData: ResFavorite[] = res.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      return { status: 200, data: resData };
    })
    .catch((error) => {
      return { status: 400, error };
    });
  return response;
};

// done
export const getMyFavorites = async (
  limit?: number,
  page?: number,
  userId?: string,
): Promise<ResultResponseList<ResFavorite>> => {
  if (!limit) return;
  let data;
  const skip = page - 1;
  if (skip === 0) {
    data = skip;
  } else {
    data = await db
      .collection('favorite')
      .where('user_id', '==', userId)
      .orderBy('update_date', 'desc')
      .limit(limit * skip)
      .get()
      .then(
        (documentresponses) =>
          documentresponses.docs[documentresponses.docs.length - 1],
      );
  }

  let next;
  if (!data) {
    next = await db
      .collection('favorite')
      .where('user_id', '==', userId)
      .orderBy('update_date', 'desc')
      .endAt(data)
      .limit(limit)
      .get()
      .then(async (res) => {
        const resdata = await Promise.all(
          res.docs.map(async (doc) => {
            const resSummary: any = await loadSummary(doc.data().summary_id);
            let summary: ResSummaryBook;
            if (resSummary && resSummary.status === 200) {
              summary = resSummary.data;
            }
            return { id: doc.id, ...doc.data(), summary_id: summary };
          }),
        );
        return { status: 200, data: resdata };
      })
      .catch(function (error) {
        console.log(error);
        return { status: 400, error };
      });
  } else {
    next = await db
      .collection('favorite')
      .where('user_id', '==', userId)
      .orderBy('update_date', 'desc')
      .startAfter(data)
      .limit(limit)
      .get()
      .then(async (res) => {
        const resdata = await Promise.all(
          res.docs.map(async (doc) => {
            const resSummary: any = await loadSummary(doc.data().summary_id);
            let summary: ResSummaryBook;
            if (resSummary && resSummary.status === 200) {
              summary = resSummary.data;
            }
            return { id: doc.id, ...doc.data(), summary_id: summary };
          }),
        );
        return { status: 200, data: resdata };
      })
      .catch(function (error) {
        console.log(error);
        return { status: 400, error };
      });
  }

  return next;
};

// done
export const createFavorite = async (
  values: Favorite,
): Promise<ResultResponse<ResFavorite>> => {
  const { user_id, summary_id } = values;
  if (!user_id || !summary_id) {
    return { status: 400, error: 'user_id or summary_id is exist' };
  }
  values.create_date = firebase.firestore.Timestamp.now();
  values.update_date = firebase.firestore.Timestamp.now();
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
