import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { useAuth } from '@/core';

import { client } from '../common';
import type { User } from './types';

type Response = User;
type Variables = void

export const useUser = createQuery<Response, Variables, AxiosError>({
  queryKey: ['me'],
  fetcher: () => {
    const token = useAuth.getState().token?.access
    client.interceptors.request.clear()
    client.interceptors.request.use((config) => {
      config.headers.Authorization = token
      return config
    })


    return client.post("", {
      query: `
        query AuthenticatedItem {
            authenticatedItem {
                ... on User {
                    username
                    role
                    id
                    avatar {
                      url
                    }
                    city {
                      id
                      name
                    }
                }
            }
        }

      `
    }).then(res => {
      return res.data.data.authenticatedItem
    })
  },
});
