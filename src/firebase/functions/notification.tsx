import {
  Notification,
  ResultResponse,
  ResSummaryBook,
  ResSummaryComment,
  ResNotification,
} from '../../types';
import { getSummaryBook, getIdComment } from '../functions';
import { firebase } from '../config';
// import dayjs from "dayjs"
const db = firebase.firestore();

// done
export const createNotification = (values: Notification) => {
  const { target_id, type, user_id, target_user_id } = values;
  if (!target_id || !type || !user_id || !target_user_id) {
    console.log('not good');
    return;
  }
  values.is_read = false;
  values.create_date = firebase.firestore.Timestamp.now();
  values.update_date = firebase.firestore.Timestamp.now();
  const response = db
    .collection('notification')
    .add({
      ...values,
    })
    .then((res) => {
      const data = { id: res.id };
      return { status: 200, data };
    })
    .catch((error) => {
      return { status: 400, error };
    });

  return response;
};

// done
export const getMyNotifications = (
  target_user_id: string,
  type: string,
): Promise<ResNotification[]> => {
  const response = db
    .collection('notification')
    .where('target_user_id', '==', target_user_id)
    .where('type', '==', type)
    .orderBy('update_date', 'desc')
    .get()
    .then(async (res) => {
      if (res.docs.length <= 0) return [];
      const resData = await Promise.all(
        res.docs.map(async (doc) => {
          const resSummary: ResultResponse<ResSummaryBook> =
            await getSummaryBook(doc.data().target_id);
          let summary: ResSummaryBook;
          if (resSummary && resSummary.status === 200) {
            summary = resSummary.data;
          }
          let summaryComment: ResSummaryComment;
          if (!summary) {
            const resSummaryComment: ResultResponse<ResSummaryComment> =
              await getIdComment(doc.data().target_id);
            if (resSummaryComment && resSummaryComment.status === 200) {
              summaryComment = resSummaryComment.data;
            }
          }
          return {
            id: doc.id,
            ...doc.data(),
            target_id:
              summary && summary.id
                ? summary
                : summaryComment && summaryComment
                ? summaryComment
                : '',
          };
        }),
      );
      return resData;
    });

  return response;
};

// done
export const getMyNotReadNotificationsCount = (
  target_user_id: string,
): Promise<number> => {
  const response = db
    .collection('notification')
    .where('target_user_id', '==', target_user_id)
    .where('is_read', '==', false)
    .get()
    .then((snap) => {
      return snap.size;
    })
    .catch((error) => {
      console.log(error);
      return 0;
    });

  return response;
};

// done
export const updateReadNotifications = async (
  target_user_id: string,
  type: string,
): Promise<any> => {
  const batch = await db.batch();
  const resCount = await db
    .collection('notification')
    .where('target_user_id', '==', target_user_id)
    .where('type', '==', type)
    .where('is_read', '==', false)
    .get()
    .then(async (res) => {
      let count = 0;
      await Promise.all(
        res.docs.map(async (doc: any) => {
          count++;
          const notificationRef = await db
            .collection('notification')
            .doc(doc.id);
          batch.update(notificationRef, { is_read: true });
        }),
      );
      await batch.commit();
      return count;
    })
    .catch((error) => {
      console.log(error);
      return 0;
    });
  return resCount;
};
