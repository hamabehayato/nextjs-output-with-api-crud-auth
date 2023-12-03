/**
 * NavigationLink
 *
 * @package components
 */
import { FC } from 'react'
import Link from 'next/link'
import styles from './styles.module.css'

type Props = {
  label: string
  linkPath: string
}

/**
 * NavigationLink
 * @returns {JSX.Element}
 * @constructor
 */
export const NavigationLink: FC<Props> = ({ label, linkPath }) => {
  return (
    <li className={styles.item}>
      <Link href={linkPath}>{label}</Link>
    </li>
  )
}
