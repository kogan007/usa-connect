import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { Post } from './types';

type Response = Post[];
type Variables = {
  username?: string;
  cityId?: string;
  textOnly?: boolean
  showAllPosts?: boolean,
  sort?: "asc" | "desc"
};

export const usePosts = createQuery<Response, Variables, AxiosError>({
  queryKey: ['posts'],
  fetcher: (variables) => {

    return client
      .post('', {
        variables: {
          orderBy: {
            createdAt: variables.sort ?? "asc",
          },
          ...(variables.username || variables.cityId) && {
            whereInput: {
              ...variables.username && ({
                createdBy: {
                  username: {
                    equals: variables.username
                  }
                },
              }),
              ...typeof variables.textOnly !== "undefined"&& ({
                textOnly: {
                  equals: variables.textOnly
                }
              })
          }},
          },
          
        query: `
          query Posts($whereInput: PostWhereInput!, $orderBy: [PostOrderByInput!]) {
              posts(
                  where: $whereInput
                  orderBy: $orderBy
              ) {
                  id
                  content
                  createdAt
                  media(take: 1) {
                    id
                    image {
                      url
                      width
                      height
                    }
                  }
                  createdBy {
                      id
                      username
                      avatar {
                          url
                      }
                  }
                  likesCount
              }
          }

      `,
      })
      .then((res) => {

        return res.data.data.posts
      })
  },
});
