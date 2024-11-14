import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { type User } from '../auth/types';
import { client } from '../common';


type Response = { follower: User }[]
type Variables = {
  username: string
}; 

export const useUserFollowers = createQuery<Response, Variables, AxiosError>({
  queryKey: ['followers'],
  fetcher: (variables) => {
    return client.post("", {
      variables: {
        username: variables.username
      },
      query: `
       query Follows($username: String) {
        Follows(where: { followingUsername: { equals: $username }}) {
          docs {
            follower {
              username
            }
          }
        }
       }
      `
    
    }).then(res => res.data.data.Follows.docs)
  },
});
