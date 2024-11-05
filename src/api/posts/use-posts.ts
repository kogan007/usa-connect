import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { Post } from './types';

type Response = Post[];
type Variables = {
  userId: number;
};

export const usePosts = createQuery<Response, Variables, AxiosError>({
  queryKey: ['posts'],
  fetcher: (variables) => {
    return client
      .post('', {
        variables: {
          userId: String(variables.userId),
        },
        query: `
        query GetPosts($userId: JSON) {
          Posts(where: { createdBy: { equals: $userId }}) {
            docs {
              description
              id
              createdAt
              image {
                url
              }
            }
          }
        }
      `,
      })
      .then((res) => res.data.data.Posts.docs);
  },
});
