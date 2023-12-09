/**
 * InpurForm
 *
 * @package components
 */
import { FC } from 'react';
import styles from './styles.module.css';

type Props = JSX.IntrinsicElements['input'];

/**
 * InputForm
 * @returns {JSX.Element}
 * @constructor
 */
export const InputForm: FC<Props> = ({ type, disabled = false, value, placeholder, onChange }) => {
  return (
    <div className={styles.container}>
      <input
        type={type}
        disabled={disabled}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
