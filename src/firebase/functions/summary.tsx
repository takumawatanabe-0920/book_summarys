import {
  ResSummaryBook,
  ResultResponseList,
  ResultResponse,
  ResCategory,
} from '../../types';
import { firebase } from '../config';
import { getCategory, getSubCategory } from './';
import { load as loadUser } from 'src/frontend/module/user';
const db = firebase.firestore();

// done
export const updateFavoriteSummaries = async (
  favorite_id?: string,
  summary_id?: string,
): Promise<void> => {
  const sfDocRef = db.collection('summary').doc(summary_id);
  db.runTransaction((transaction) => {
    return transaction.get(sfDocRef).then((doc) => {
      const favArray = doc.data().favorite_id;
      const isDoneFavorite: boolean = favArray.includes(favorite_id);
      if (isDoneFavorite) {
        const index = favArray.indexOf(favorite_id);
        if (index > -1) {
          favArray.splice(index, 1);
        }
      } else {
        favArray.push(favorite_id);
      }
      transaction.update(sfDocRef, {
        favorite_id: favArray,
        favorite_count: favArray.length,
      });
    });
  }).catch((error) => {
    // This will be an "population is too big" error.
    console.error(error);
  });
};

// done FEで日付ロジックを持たせる
export const getRankingSummaries = async (
  limit?: number,
  publishing_status?: string,
  data_range?: string,
): Promise<ResultResponseList<ResSummaryBook>> => {
  let BeginningOfDate: Date;
  let EndOfDate: Date;
  if (data_range === 'month') {
    const date = new Date();
    BeginningOfDate = new Date(date.getFullYear(), date.getMonth(), 1);
    EndOfDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  } else if (data_range === 'week') {
    const today = new Date();
    const this_year = today.getFullYear();
    const this_month = today.getMonth();
    const date = today.getDate();
    const day_num = today.getDay();
    const this_monday = date - day_num + 1;
    const this_sunday = this_monday + 6;
    BeginningOfDate = new Date(this_year, this_month, this_monday);
    EndOfDate = new Date(this_year, this_month, this_sunday);
  } else if (data_range === 'all') {
    BeginningOfDate = new Date(2020, 11);
    EndOfDate = new Date();
  }

  const sinceAtDate = firebase.firestore.Timestamp.fromDate(BeginningOfDate);
  const recentAtDate = firebase.firestore.Timestamp.fromDate(EndOfDate);

  const response = await db
    .collection('summary')
    .where('publishing_status', '==', publishing_status)
    .orderBy('update_date', 'asc')
    .orderBy('favorite_count', 'desc')
    .startAt(sinceAtDate)
    .endAt(recentAtDate)
    .limit(limit)
    .get()
    .then(async (res) => {
      const resData: any = await Promise.all(
        res.docs.map(async (doc) => {
          const resCategory: ResultResponse<ResCategory> = await getCategory(
            doc.data().category,
          );
          let category: ResCategory;
          const resSubCategory: ResultResponse<ResCategory> =
            await getSubCategory(doc.data().sub_category);
          let sub_category: ResCategory;
          if (resCategory && resCategory.status === 200) {
            category = resCategory.data;
          }
          if (resSubCategory && resSubCategory.status === 200) {
            sub_category = resSubCategory.data;
          }

          return { id: doc.id, ...doc.data(), category, sub_category };
        }),
      );
      return { status: 200, data: resData };
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, error };
    });
  return response;
};

// done
export const getOneConditionsSummaries = async (
  limit?: number,
  page?: number,
  sort?: [string, firebase.firestore.OrderByDirection],
  queryList?: string[],
): Promise<ResultResponseList<ResSummaryBook>> => {
  const [fieldPath, query] = queryList;
  const [orderFieldPath, directionStr] = sort;

  const response = await db
    .collection('summary')
    .where(fieldPath, '==', query)
    .orderBy(orderFieldPath, directionStr)
    .limit(limit)
    .get()
    .then(async (res) => {
      const resData: ResSummaryBook[] = await Promise.all(
        res.docs.map(async (doc) => {
          const resCategory: ResultResponse<ResCategory> = await getCategory(
            doc.data().category,
          );
          let category: ResCategory;
          const resSubCategory: ResultResponse<ResCategory> =
            await getSubCategory(doc.data().sub_category);
          const user = await loadUser(doc.data().user_id);
          let sub_category: ResCategory;
          if (resCategory && resCategory.status === 200) {
            category = resCategory.data;
          }
          if (resSubCategory && resSubCategory.status === 200) {
            sub_category = resSubCategory.data;
          }

          return {
            id: doc.id,
            ...doc.data(),
            category,
            sub_category,
            user_id: user ? user : doc.data().user_id,
          };
        }),
      );
      return { status: 200, data: resData };
    })
    .catch(function (error) {
      console.log(error);
      return { status: 400, error };
    });
  return response;
};
