export type Post = {
  description: string;
  id: number;
  createdAt: string;
  image: {
    url: string;
    width: number
    height: number
  };
  createdBy: {
    id: number
    username: string
    avatar: {
      url: string
    }
  }
};
