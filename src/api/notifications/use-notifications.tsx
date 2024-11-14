import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import { type Notification } from './types';

type Response = Notification[];
type Variables = void;

export const useNotifications = createQuery<Response, Variables, AxiosError>({
  queryKey: ['notifications'],
  fetcher: () => {
    return client
      .post('', {
        query: `
          query Notifications {
            notifications (orderBy: { createdAt: desc }) {
                id
                comment {
                  id
                  post {
                    id
                    media(take: 1) {
                      image {
                        url
                      }
                    }
                  }
                  author {
                      username
                  }
                }
                like {
                  id
                  user {
                    username
                  }
                  post {
                    id
                    media(take: 1) {
                      image {
                        url
                      }
                    }
                  }
                }
            }
          }
 

      `,
      }
      )
      .then((res) => res.data.data.notifications);
  },
});
