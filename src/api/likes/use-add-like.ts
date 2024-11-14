import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client, queryClient } from '../common';
import type { Like } from './types';

type Variables = { postId?: string };
type Response = Like;

export const useAddLike = createMutation<Response, Variables, AxiosError>({
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["post"]})
  },
  mutationFn: async (variables) =>
    client.post("", {
      variables: {
        data: {
          ...variables.postId && {
            post: {
              connect: {
                id: variables.postId
              }
            }
          }
        }
      },
      query: `
       mutation CreateLike ($data: LikeCreateInput!) {
          createLike(data: $data) {
              id
          }
        }
      `
    }).then((response) => {
      return response.data
    }),
});
