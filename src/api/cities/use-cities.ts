import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { City } from './types';

type Response = City[];
type Variables = void;

export const useCities = createQuery<Response, Variables, AxiosError>({
  queryKey: ['cities'],
  fetcher: () => {
    return client.post("", {
      query: `
        query {
          Cities {
            docs {
              name
              id
            }
          }
        }
      `
    }).then(res => res.data.data.Cities.docs);
  },
});

