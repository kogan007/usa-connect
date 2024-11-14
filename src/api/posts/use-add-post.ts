import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client, queryClient } from '../common';
import type { Post } from './types';

type Variables = { content: string, city: string};
type Response = Post;

export const useAddPost = createMutation<Response, Variables, AxiosError>({
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["posts"]})
  },
  mutationFn: async (variables) =>
    client.post("", {
      variables: {
        input: {
          content: variables.content,
          city: {
            connect: {
              id: variables.city
            }
          }
        }
      },
      query: `
        mutation CreatePost($input: PostCreateInput!) {
          createPost(data: $input) {
              id
          }
        }
      `
    }).then((response) => {
      return response.data
    }),
});
