import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { Post } from './types';

type Response = Post
type Variables = {
  postId: string
};

export const usePost = createQuery<Response, Variables, AxiosError>({
  queryKey: ['post'],
  fetcher: (variables) => {
    return client
      .post('', {
        variables: {
          postId: variables.postId,
        },
        query: `
          query Post($postId: ID!) {
            post(where: { id: $postId }) {
                content
                id
                media {
                  image {
                    url
                    width
                    height
                  }
                }
                createdBy {
                    id
                    username
                    avatar {
                        url
                    }
                }
                likesCount
            }
        }

      `,
      })
      .then((res) => {
        return res.data.data.post
      });
  },
});
