import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import { type SearchResponse } from './types';

type Response = SearchResponse;
type Variables = {
  input: string;
};

export const useSearch = createQuery<Response, Variables, AxiosError>({
  queryKey: ['search'],
  fetcher: (variables) => {
    return client
      .post('', {
        variables: {
          query: variables.input,
        },
        query: `
        query Search($query: String!) {
          search(query: $query) {
            username
            avatar {
              url
            }
          }
        }

      `,
      })
      .then((res) => {
        return res.data.data.search
      });
  },
});
