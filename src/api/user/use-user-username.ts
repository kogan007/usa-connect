import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { type User } from '../auth/types';
import { client } from '../common';


type Response = {
  user: User & {
    amFollowing: 0 | 1
  }
  likesCount: number
}
type Variables = {
  username: string
  loggedInUsername: string
}; 

export const useUserByUsername = createQuery<Response, Variables, AxiosError>({
  queryKey: ['user'],
  fetcher: (variables) => {
    const date = new Date()
    date.setDate(date.getDate() - 1)
    return client.post("", {
      variables: {
        username: variables.username,
        me: variables.loggedInUsername,
        storyFilter: date.toISOString()
      },
      query: `
       query User($username: String!, $me: String!, $storyFilter: DateTime) {
          user(where: { username: $username }) {
              username
              role
              id
              avatar {
                  url
              }
              city {
                  name
              }
              storiesCount(where: { createdAt: { gte: $storyFilter }})
              followersCount
              followingCount
              postsCount
              amFollowing: followersCount(where: { follower: { username: { equals: $me } } })
          }
          likesCount(
            where: { post: { createdBy: { username: { equals: $username }}}}
          )
        }

      `
    
    }).then(res => {
      return {
        user: res.data.data.user,
        likesCount: res.data.data.likesCount
      }
    })
  },
});
