import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import { type Notification } from './types';

type Response = Notification[];
type Variables = void;

export const useNotificationCount = createQuery<Response, Variables, AxiosError>({
  queryKey: ['notificationCount'],
  fetcher: () => {
    return client
      .post('', {
        query: `
          query NotificationsCount {
            notificationsCount
          }
      `,
      })
      .then((res) => res.data.data.notificationsCount);
  },
});
