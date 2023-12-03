/**
 * TextAreaForm
 *
 * @package components
 */
import { FC } from 'react'
import styles from './styles.module.css'

// JSX.IntrinsicElements['textarea']は　textarea　に関する(value, onChange などの)型情報を定義する
type Props = JSX.IntrinsicElements['textarea']

/**
 * TextAreaForm
 * @returns {JSX.Element}
 * @constructor
 */
// FC は、React関数コンポーネントを定義するための型
export const TextArea: FC<Props> = ({ disabled = false, value, placeholder, onChange }) => {
  return (
    <div className={styles.container}>
      <textarea
        disabled={disabled}
        className={styles.textarea}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
