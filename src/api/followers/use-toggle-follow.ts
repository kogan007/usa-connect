import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client, queryClient } from '../common';
import type { Follow } from './types';

type Variables = { username: string };
type Response = Follow;

export const useToggleFollow = createMutation<Response, Variables, AxiosError>({
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["user"]})
  },
  mutationFn: async (variables) =>
    client.post("", {
      variables: {
        username: variables.username
      },
      query: `  
        mutation ToggleFollow($username: String!) {
          toggleFollow(username: $username) {
            ... on ToggleFollowSuccessful {
              message
              id
            }
          }
        }
      `
    }).then((response) => {
      return response.data
    }),
});
