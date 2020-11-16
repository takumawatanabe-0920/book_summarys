import React from "react"
import dayjs from "dayjs"
import firebase from "../config"
const db = firebase.firestore()
import {
  Favorite,
  ResFavorite,
  ResultResponse,
  ResultResponseList
} from "../../types"

export const getFavorite = (
  userId?: string,
  summaryId?: string
): Promise<ResultResponseList<ResFavorite>> => {
  if (!userId) return
  if (!summaryId) return
  const response = db
    .collection("favorite")
    .where("user_id", "==", userId)
    .where("summary_id", "==", summaryId)
    .get()
    .then(res => {
      let resData: ResFavorite[] = res.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
      return { status: 200, data: resData }
    })
    .catch(error => {
      return { status: 400, error }
    })
  return response
}

export const getFavorites = (): Promise<ResultResponseList<ResFavorite>> => {
  const response = db
    .collection("favorite")
    .get()
    .then(res => {
      let resData: ResFavorite[] = res.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
      return { status: 200, data: resData }
    })
    .catch(error => {
      return { status: 400, error }
    })

  return response
}

export const getDonefavorite = (
  id: string
): Promise<ResultResponse<Favorite>> => {
  const response = db
    .collection("favorite")
    .doc(id)
    .get()
    .then(doc => {
      if (doc.exists) {
        return { id: doc.id, status: 200, ...doc.data() }
      }
    })
    .catch(error => {
      return { status: 400, error }
    })

  return response
}

export const getfavoriteNum = async (summaryId?: string): Promise<number> => {
  let count: number = 0
  await db
    .collection("favorite")
    .where("summary_id", "==", summaryId)
    .get()
    .then(res =>
      res.docs.map(doc => {
        return count++
      })
    )
  return count ? count : 0
}

export const createFavorite = (values: Favorite) => {
  const { user_id, summary_id } = values
  if (!user_id || !summary_id) {
    console.log("idがありません")
    return
  }
  values.create_date = dayjs().unix()
  values.update_date = dayjs().unix()
  const response = db
    .collection("favorite")
    .add({
      ...values
    })
    .then(res => {
      return res.id
    })
  return response
}

export const deleteFavorite = (
  favoriteId: string
): Promise<ResultResponse<Favorite>> => {
  if (!favoriteId) {
    console.log("idが存在しません。")
    return
  }
  const response = db
    .collection("favorite")
    .doc(favoriteId)
    .delete()
    .then(res => {
      return { status: 200 }
    })
    .catch(error => {
      return { status: 400, error }
    })

  return response
}