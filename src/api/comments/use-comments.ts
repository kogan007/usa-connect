import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { Comment } from './types';

type Response = Comment[];
type Variables = {
  postId: string
};

export const useComments = createQuery<Response, Variables, AxiosError>({
  queryKey: ['comments'],
  fetcher: (variables) => {
    return client
      .post('', {
        variables: {
          postId: variables.postId,
        },
        query: `
          query Comments($postId: ID!) {
            comments(where: { post: { id: { equals: $postId } } }) {
                content
                id
                author {
                    username
                    avatar {
                        url
                    }
                }
                createdAt
            }
        }
      `,
      })
      .then((res) => {
        return res.data.data.comments
      });
  },
});
