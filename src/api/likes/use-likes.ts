import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import { type Like } from './types';


type Response = Like[];
type Variables = {
  postId: number
};

export const useLikes = createQuery<Response, Variables, AxiosError>({
  queryKey: ['likes'],
  fetcher: (variables) => {
    return client
      .post('', {
        variables: {
          data: {
            resource: {
              relationTo: "posts",
              value: String(variables.postId),
            }
          }
        },
        query: `
          query Likes ($data: Like_resource_Relation) {
            Likes(where: $data) {
                docs {
                    id
                    user {
                      username
                    }
                }
            }
          }
      `,
      })
      .then((res) => {
        return res.data.data.Likes.docs
      });
  },
});
