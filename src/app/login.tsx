import { useRouter } from 'expo-router';
import React from 'react';

import { useLogin } from '@/api';
import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { useAuth } from '@/core';
import { FocusAwareStatusBar } from '@/ui';
export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  const { mutate: login } = useLogin()

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    login(data, {
      onSuccess: (res) => {
        const token = res.sessionToken
        signIn({ access: token });
        router.push("/")
      }
    })
    // signIn({ access: 'access-token', refresh: 'refresh-token' });
    // router.push('/');
  };
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
