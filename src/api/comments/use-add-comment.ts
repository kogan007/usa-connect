import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client, queryClient } from '../common';
import type { Comment } from './types';

type Variables = { postId: string, content: string };
type Response = Comment;

export const useAddComment = createMutation<Response, Variables, AxiosError>({
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['comments']})
  },
  mutationFn: async (variables) =>
    client.post("", {
      variables,
      query: `
        mutation CreateComment ($postId: ID!, $content: String!) {
            createComment(data: { post: { connect: { id: $postId }}, content: $content }) {
                id
            }
        }

      `
    }).then((response) => {
      return response.data
    })
});
