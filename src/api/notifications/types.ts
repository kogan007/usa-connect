import { type User } from "../auth"
import { type Post } from "../posts"

export type Notification = {
  id: string
  like: LikeNotification
  comment: never
} | { 
  id: string
  comment: CommentNotification
  like: never
}

type LikeNotification = {
  id: string
  user: User
  post: Post
}

type CommentNotification = {
  id: string
  post: Post
  author: User
}