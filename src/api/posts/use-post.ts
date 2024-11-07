import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { Post } from './types';

type Response = Post;
type Variables = {
  postId: number
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
          query Post($postId: Int!) {
            Post(id: $postId) {
                description
                id
                image {
                    url
                    width
                    height
                }
                createdBy {
                    id
                    username
                    avatar {
                        url
                    }
                }
            }
        }

      `,
      })
      .then((res) => res.data.data.Post);
  },
});
