import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { User } from './types';

type Response = User;
type Variables = {
  token: string
}; 

export const useUser = createQuery<Response, Variables, AxiosError>({
  queryKey: ['user'],
  fetcher: (variables) => {
    return client.post("", {
      query: `
        query MeUser {
          meUser {
              user {
                  role
                  email
                  username
                  id
                  city {
                    name
                  }
              }
          }
        }
      `
    }, {
      headers: {
        "Authorization": `JWT ${variables.token}`
      }
    }).then(res => res.data.data.meUser.user)
  },
});
