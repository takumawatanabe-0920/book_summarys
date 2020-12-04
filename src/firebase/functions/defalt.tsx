import React from "react"
import dayjs from "dayjs"
import { useLocation } from "react-router-dom"
import { firebase, storage } from "./../../firebase/config"
import { ResultResponse } from "./../../types"

export const readQuery = (key?: string): string => {
  return new URLSearchParams(useLocation().search).get(key)
}

export const formatDateHour = (_datetime?: number): string => {
  return _datetime ? dayjs.unix(_datetime).format("YYYY-MM-DD HH:mm:ss") : ""
}

export const uploadImage = (
  image: File,
  path: string
): Promise<ResultResponse<any>> => {
  console.log(image)
  const response = storage
    .ref(`/images/${path}/${image.name}`)
    .put(image)
    .then(res => {
      return { status: 200, data: `/images/${path}/${image.name}` }
    })
    .catch(error => {
      return { status: 400, error }
    })
  return response
}

export const getImage = (_imgPath: string): Promise<ResultResponse<string>> => {
  if (!_imgPath) return
  const ref = firebase
    .storage()
    .ref()
    .child(_imgPath)

  const response = ref
    .getDownloadURL()
    .then(url => {
      return { status: 200, data: url }
    })
    .catch(error => {
      return { status: 400, error }
    })
  return response
}

export const formatUserIcon = async (_photoUrl: string): Promise<string> => {
  const resUserIcon = await getImage(_photoUrl)
  if (resUserIcon && resUserIcon.status === 200) {
    return resUserIcon.data ? resUserIcon.data : ""
  }
}
