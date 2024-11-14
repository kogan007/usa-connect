export type Post = {
  content: string;
  id: string;
  createdAt: string;
  media: {
    image: Image
  }[]
  likesCount: number
  createdBy: {
    id: number
    username: string
    avatar: {
      url: string
    }
  }
};

type Image = {
  url: string;
  width: number
  height: number
}