import React from "react"
import { SummaryBook } from "./../../types/summary"
import config from "../../firebase/config"
const { firebase } = config
const db = firebase.firestore()

export const createSummary = (values: SummaryBook) => {
  const { title, content, category, user_id } = values
  if (!title || !content || !category || !user_id) {
    console.log("データがたりません")
    return
  }
  db.collection("summary")
    .add({
      ...values
    })
    .then(res => {})
    .catch(error => {})
}

export const getSummaries = () => {
  const snapShot = db
    .collection("summary")
    .get()
    .then(res =>
      res.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
    )

  return snapShot
}

export const getSummaryBook = (id: string) => {
  const snapShot = db
    .collection("summary")
    .doc(id)
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data()
      } else {
        console.log("404")
      }
    })
    .catch(error => {
      console.log(`データを取得できませんでした (${error})`)
    })

  return snapShot
}
