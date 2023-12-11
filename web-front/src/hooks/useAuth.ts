/**
 * useAuth
 *
 * @package hooks
 */
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { authenticationApi } from '@/apis/authApi';
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

  /**
   * グローバルの認証状態を未ログインにする (ログアウト)
   */
  const signOut = useCallback(async () => {
    setUser(undefined);
    setIsAuth(false);
  }, []);

  /**
   * 未ログインページにいるか判定処理
   */
  const isExitBeforeAuthPage = useCallback(() => {
    return router.pathname === NAVIGATION_PATH.SIGNIN || router.pathname === NAVIGATION_PATH.SIGNUP;
  }, [router.pathname]);

  /**
   * 非ログイン状態でログイン後の画面を開いたらリダイレクト
   */
  const authRouting = useCallback(async (): Promise<void> => {
    let auth = false;

    const res = await authenticationApi();

    if (res?.data?.user) {
      setUser(res?.data?.user);
      setIsAuth(true);
      auth = true;
    }

    // 未ログイン状態でログイン済ページにいる場合、ログイン画面にリダイレクト
    if (!auth && !isExitBeforeAuthPage()) router.push(NAVIGATION_LIST.SIGNIN);
    // ログイン状態で未ログインページにいる場合、Todo 一覧画面にリダイレクト
    if (auth && isExitBeforeAuthPage()) router.push(NAVIGATION_LIST.TOP);
  }, [isExitBeforeAuthPage, router]);

  useEffect(() => {
    authRouting();
  }, [authRouting]);

  return {
    user,
    isAuth,
    signIn,
    signOut,
  };
};
