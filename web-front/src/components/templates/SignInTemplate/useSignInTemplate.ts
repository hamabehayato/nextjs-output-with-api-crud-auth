/**
 * useSignInTemplate
 *
 * @package hooks
 */
import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { signInApi } from '@/apis/authApi';
import { NAVIGATION_LIST } from '@/constants/navigations';
import { EventType } from '@/interfaces/Event';
import { UserType } from '@/interfaces/User';

type Params = {
  signIn: (user: UserType) => Promise<void>;
};

type StatesType = {
  email: string;
  password: string;
};

type ActionsType = {
  handleChangeEmail: EventType['onChangeInput'];
  handleChangePassword: EventType['onChangeInput'];
  handleSignIn: EventType['onSubmit'];
};

/**
 * useSignInTemplate
 * @param param0
 * @returns
 */
export const useSignInTemplate = ({ signIn }: Params) => {
  /* local state */
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  /* actions */
  /**
   * nameの更新処理
   * @param {*} event
   */
  const handleChangeEmail: EventType['onChangeInput'] = useCallback((event) => setEmail(event.target.value), []);

  /**
   * email の更新処理
   * @param {*} event
   */
  const handleChangePassword: EventType['onChangeInput'] = useCallback((event) => setPassword(event.target.value), []);

  /**
   * 会員等力処理
   */
  const handleSignIn: EventType['onSubmit'] = useCallback(
    async (event) => {
      event.preventDefault();

      if (email === '' || password === '') return;

      const res = await signInApi(email, password);

      if (res?.data?.user) {
        localStorage.setItem('access_token', res.data.accessToken);
        router.push(NAVIGATION_LIST.TOP);
      }
    },
    // これらが更新された時のみ、関数を再生成する
    [email, password, router, signIn]
  );

  const states: StatesType = {
    email,
    password,
  };
  const actions: ActionsType = {
    handleChangeEmail,
    handleChangePassword,
    handleSignIn,
  };

  return [states, actions] as const;
};
