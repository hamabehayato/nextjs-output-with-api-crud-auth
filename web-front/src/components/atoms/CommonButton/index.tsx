/**
 * CommonButton
 *
 * @package components
 */
import { FC } from 'react'
import styles from './styles.module.css'

// button 中身のテキストは 'title' で定義されている
type Props = JSX.IntrinsicElements['button']

/**
 * CommonButton
 * @returns {JSX.Element}
 * @constructor
 */
export const CommonButton: FC<Props> = (props) => {
  const { title, type, onClick } = props

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} type={type} onClick={onClick}>
        {title}
      </button>
    </div>
  )
}
