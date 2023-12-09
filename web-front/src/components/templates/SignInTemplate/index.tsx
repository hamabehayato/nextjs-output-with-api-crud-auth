/**
 * SignUpTemplate
 *
 * @package components
 */
import { FC } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { InputForm } from '@/components/atoms/InputForm';
import { CommonButton } from '@/components/atoms/CommonButton';
import { useSignInTemplate } from './useSignInTemplate';
import styles from './style.module.css';

export const SignInTemplate: FC = () => {
  const { signIn } = useAuthContext();
  const [{ email, password }, { handleChangeEmail, handleChangePassword, handleSignIn }] = useSignInTemplate({
    signIn,
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <InputForm type="email" value={email} placeholder="Email" onChange={handleChangeEmail} />
        <InputForm type="password" value={password} placeholder="Password" onChange={handleChangePassword} />

        <CommonButton type="submit" title="Sign In" />
      </form>
    </div>
  );
};
