/**
 * useAuth
 *
 * @package hooks
 */
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { UserType } from '@/interfaces/User';
import { NAVIGATION_LIST, NAVIGATION_PATH } from '@/constants/navigations';

/**
 * useAuth
 * @returns
 */
export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  /**
   * グローバルの認証状態をログイン済にする (ログイン)
   */
  const signIn = useCallback(async (user: UserType) => {
    setUser(user);
    setIsAuth(true);
  }, []);

  // useEffect(() => {
  //   authRouting();
  // }, [authRouting]);

  return {
    user,
    isAuth,
    signIn,
  };
};
