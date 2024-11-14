import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';


type Response = {}
type Variables = {
  username: string
}; 

export const useUserStories = createQuery<Response, Variables, AxiosError>({
  queryKey: ['user-stories'],
  fetcher: (variables) => {
    const date = new Date()
    date.setDate(date.getDate() - 1)
    return client.post("", {
      variables: {
        username: variables.username,
        storyFilter: date.toISOString()
      },
      query: `
        query Stories ($username: String!, $storyFilter: DateTime) {
          stories (
            where: { createdBy: { username: { equals: $username } }, createdAt: { gte: $storyFilter } }
          ) {
            id
            image {
              url
            }
          }
        }
      `
    }).then(res => {
      return res.data.data.stories
    })
  },
});
