import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { Event } from './types';

type Response = Event[];
type Variables = {
  cityId: number;
};

export const useEvents = createQuery<Response, Variables, AxiosError>({
  queryKey: ['posts'],
  fetcher: (variables) => {
    return client
      .post('', {
        variables: {
          cityId: String(variables.cityId),
        },
        query: `
          query Events($cityId: JSON) {
            Events(where: { city: { equals: $cityId } }) {
                docs {
                    name
                    id
                    media {
                        url
                        width
                        height
                    }
                    city {
                        name
                    }
                    description
                    address {
                      coordinates
                    }
                }
            }
          }
      `,
      })
      .then((res) => res.data.data.Events.docs)
  },
});
