/**
 * useSignUpTemplate
 *
 * @package hooks
 */
import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { signUpApi } from '@/apis/authApi';
import { NAVIGATION_LIST } from '@/constants/navigations';
import { EventType } from '@/interfaces/Event';
import { UserType } from '@/interfaces/User';

type Params = {
  signIn: (user: UserType) => Promise<void>;
};

type StatesType = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

type ActionsType = {
  handleChangeName: EventType['onChangeInput'];
  handleChangeEmail: EventType['onChangeInput'];
  handleChangePassword: EventType['onChangeInput'];
  handleChangePasswordConfirm: EventType['onChangeInput'];
  handleSignUp: EventType['onSubmit'];
};

/**
 * useSignUpTemplate
 * @param param0
 * @returns
 */
export const useSignUpTemplate = ({ signIn }: Params) => {
  /* local state */
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  /* actions */
  /**
   * nameの更新処理
   * @param {*} event
   */
  const handleChangeName: EventType['onChangeInput'] = useCallback((event) => setName(event.target.value), []);

  /**
   * email の更新処理
   * @param {*} event
   */
  const handleChangeEmail: EventType['onChangeInput'] = useCallback((event) => setEmail(event.target.value), []);

  /**
   * password の更新処理
   * @param {*} e
   */
  const handleChangePassword: EventType['onChangeInput'] = useCallback((event) => setPassword(event.target.value), []);

  /**
   * password の更新処理
   * @param {*} e
   */
  const handleChangePasswordConfirm: EventType['onChangeInput'] = useCallback(
    (event) => setPasswordConfirm(event.target.value),
    []
  );

  /**
   * 会員登録処理
   */
  const handleSignUp: EventType['onSubmit'] = useCallback(
    async (event) => {
      event.preventDefault();

      if (password !== passwordConfirm) return;
      if (name === '' || email === '' || password === '') return;

      const res = await signUpApi(name, email, password);

      if (res?.data?.user) {
        localStorage.setItem('access_token', res.data.accessToken);
        router.push(NAVIGATION_LIST.TOP);
      }
    },
    // これらが更新された時のみ、関数を再生成する
    [name, email, password, passwordConfirm, router, signIn]
  );

  const states: StatesType = {
    name,
    email,
    password,
    passwordConfirm,
  };
  const actions: ActionsType = {
    handleChangeName,
    handleChangeEmail,
    handleChangePassword,
    handleChangePasswordConfirm,
    handleSignUp,
  };

  return [states, actions] as const;
};
