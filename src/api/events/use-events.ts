import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { Event } from './types';

type Response = Event[];
type Variables = {
  cityId: string;
};

export const useEvents = createQuery<Response, Variables, AxiosError>({
  queryKey: ['events'],
  fetcher: (variables) => {
    console.log(variables.cityId)
    return client
      .post('', {
        variables: {
          cityId: String(variables.cityId),
        },
        query: `
          query Events ($cityId: ID!) {
            events(where: { city: { id: { equals: $cityId } } }) {
              name
              id
              media {
                id
                image {
                    url
                }
              }
              venue {
                name
                address {
                  street
                  city
                  state
                  zipcode
                  coordinates
                }
              }
            }
          }

      `,
      })
      .then((res) => res.data.data.events)
  },
});
