import React from "react"

export type Notification = Partial<{
  user_id: string
  user_name: string
  type: "favorite" | "company" | "summary_comment"
  target_id: any
  create_date: number
  update_date: number
  is_read: boolean
}>

export type ResNotification = Notification & {
  id?: string
}
