import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { type User } from '../auth/types';
import { client } from '../common';


type Response = {
  user: User
  postCount: number
  followerCount: number
  followingCount: number
};
type Variables = {
  username: string
}; 

export const useUserByUsername = createQuery<Response, Variables, AxiosError>({
  queryKey: ['user'],
  fetcher: (variables) => {
    return client.post("", {
      variables: {
        username: variables.username
      },
      query: `
       query Users ($username: String!) {
          Users(where: { username: { equals: $username } }) {
              docs {
                  username
                  role
                  id
                  avatar {
                      url
                  }
                  city {
                      name
                  }
              }
          }
          countPosts(where: { username: { equals: $username }}) {
            totalDocs
          }
          countFollows(where: { followingUsername: { equals: $username } }) {
            totalDocs
          }
          followingCount: countFollows(where: { followerUsername: { equals: $username } }) {
            totalDocs
          }
        }
      `
    
    }).then(res => ({
      user: res.data.data.Users.docs[0],
      postCount: res.data.data.countPosts.totalDocs,
      followerCount: res.data.data.countFollows.totalDocs,
      followingCount: res.data.data.followingCount.totalDocs,
    }))
  },
});
