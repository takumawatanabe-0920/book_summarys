import React from "react"
import firebase from "../firebase/config.jsx"
const db = firebase.firestore()

export const getCategories = () => {
  const snapShot = db
    .collection("category")
    .get()
    .then(res =>
      res.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
    )

  return snapShot
}

export const getCategory = (id: string) => {
  const snapShot = db
    .collection("category")
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

export const getSubCategories = () => {
  const snapShot = db
    .collection("sub_category")
    .get()
    .then(res =>
      res.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
    )

  return snapShot
}

export const getSubCategory = (id: string) => {
  const snapShot = db
    .collection("sub_category")
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
        return doc.data().values
      } else {
        console.log("404")
      }
    })
    .catch(error => {
      console.log(`データを取得できませんでした (${error})`)
    })

  return snapShot
}
