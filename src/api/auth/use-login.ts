import { type AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client, queryClient } from '../common';

type Variables = {
  email: string
  password: string
}
type Response = {
  sessionToken: string
}

export const useLogin = createMutation<Response, Variables, AxiosError>({
  onSuccess: () => {
    console.log("sdjksajdksajdsa")
    queryClient.invalidateQueries({ queryKey: ["me"] })
  },
  mutationFn: async (variables) => {
    return client.post("/", 
      {
        variables: {
          username: variables.email,
          password: variables.password
        },
        query: `
          mutation AuthenticateUserWithPassword ($username: String!, $password: String!) {
            authenticateWithPassword(username: $username, password: $password) {
                ... on ItemAuthenticationWithPasswordSuccess {
                    sessionToken
                }
            }
          }

      `,
      }).then(res => {
      return res.data.data.authenticateWithPassword
    })},
    onError: (error) => {
      console.log(error.message)
      console.log(error.response)
    }
});
