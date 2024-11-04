import { type AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';

type Variables = {
  email: string
  password: string
}
type Response = {
  data: {
    loginUser: {
      token: string
    }
  }
}

export const useLogin = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: "",
      method: 'POST',
      data: {
        variables,
        query: `
          mutation Login($email: String!, $password: String! )  {
            loginUser(email: $email, password: $password) {
              token
              user {
                id
                email
              }
            }
          }
      `,
      },
    }).then(res => res.data),
});
