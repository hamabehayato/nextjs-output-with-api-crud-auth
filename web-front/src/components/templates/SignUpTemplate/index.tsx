/**
 * SignUpTemplate
 *
 * @package components
 */
import { FC } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { InputForm } from '@/components/atoms/InputForm';
import { CommonButton } from '@/components/atoms/CommonButton';
import { useSignUpTemplate } from './useSignUpTemplate';
import styles from './style.module.css';

export const SignUpTemplate: FC = () => {
  const { signIn } = useAuthContext();
  const [
    { name, email, password, passwordConfirm },
    { handleChangeName, handleChangeEmail, handleChangePassword, handleChangePasswordConfirm, handleSignUp },
  ] = useSignUpTemplate({ signIn });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <InputForm type="text" value={name} placeholder="Name" onChange={handleChangeName} />
        <InputForm type="email" value={email} placeholder="Email" onChange={handleChangeEmail} />
        <InputForm type="password" value={password} placeholder="Password" onChange={handleChangePassword} />
        <InputForm
          type="password"
          value={passwordConfirm}
          placeholder="Password Confirm"
          onChange={handleChangePasswordConfirm}
        />

        <CommonButton type="submit" title="Sign Up" />
      </form>
    </div>
  );
};
