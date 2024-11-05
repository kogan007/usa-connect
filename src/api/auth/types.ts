import { type City } from "../cities"

export type User = {
  role: string
  email: string
  username: string
  city: City
  id: number
}