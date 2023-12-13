/**
 * useSignInTemplate
 *
 * @package hooks
 */
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { NAVIGATION_LIST } from '@/constants/navigations';
import { EventType } from '@/interfaces/Event';

type Params = {
  signOut: () => Promise<void>;
};

// type StatesType = {
//   email: string;
//   password: string;
// };

type ActionsType = {
  handleSignOut: EventType['onSubmitButton'];
};

/**
 * useSignInTemplate
 * @param param0
 * @returns
 */
export const useSignNavigation = ({ signOut }: Params) => {
  /* local state */
  const router = useRouter();

  /* actions */

  /**
   * ログアウト処理
   */
  const handleSignOut: EventType['onSubmitButton'] = useCallback(
    async (event) => {
      event.preventDefault();
      localStorage.removeItem('access_token');
      signOut();
      router.push(NAVIGATION_LIST.SIGNIN);
    },
    // これらが更新された時のみ、関数を再生成する
    [signOut, router]
  );

  // const states: StatesType = {
  //   email,
  //   password,
  // };
  const actions: ActionsType = {
    handleSignOut,
  };

  return [actions] as const;
};
