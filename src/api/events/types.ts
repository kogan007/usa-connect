export type Event = {
  name: string
  id: number
  description: {
    children: {
      text: string
    }[] 
  }[]
  media: {
    url: string
    width: number
    height: number
  }[]
  city: {
    name: string
  }
  address: {
    coordinates: {
      latitude: number
      longitude: number
    }
  }
}