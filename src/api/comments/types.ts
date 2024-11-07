import { type User } from "../auth/types"

export type Comment = {
  content: string
  author: User,
  createdAt: string
  id: number
}