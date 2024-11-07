import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { Post } from './types';

type Response = Post[];
type Variables = {
  userId?: number;
  cityId?: number;
};

export const usePosts = createQuery<Response, Variables, AxiosError>({
  queryKey: ['posts'],
  fetcher: (variables) => {
    return client
      .post('', {
        variables: {
          userId: String(variables.userId),
          cityId: String(variables.cityId),
        },
        query: `
        query GetPosts(${variables.userId ? '$userId: JSON,' : ''} ${variables.cityId ? '$cityId: JSON' : ''}) {
          Posts(${variables.userId ? 'where: { createdBy: { equals: $userId }},' : ''}
          ${variables.cityId ? 'where: { city: { equals: $cityId }},' : ''}
          ) {
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
      .then((res) => res.data.data.Posts.docs)
  },
});
