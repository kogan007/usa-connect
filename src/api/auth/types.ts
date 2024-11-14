import { type City } from "../cities"

export type User = {
  role: string
  email: string
  username: string
  city: City
  avatar: {
    url: string
  }
  id: string
  followersCount: number
  followingCount: number
  postsCount: number
  storiesCount: number
}