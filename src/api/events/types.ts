export type Event = {
  name: string
  id: string
  media: {
    id: string
    image: {
      url: string
    }
  }[]
  venue: {
    name: string
    address: {
      street: string
      city: string
      state: string
      zipcode: number
      coordinates: {
        latitude: number
        longitude: number
      }
    }
  }
}