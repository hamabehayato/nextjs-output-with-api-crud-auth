/**
 * BaseLayout
 *
 * @package components
 */
import { ReactNode } from 'react';
import { Navigation } from '@/components/molcules/Navigation';
import styles from './styles.module.css';

type Props = {
  children: ReactNode;
  title: string;
};

export const BaseLayout = ({ children, title }: Props) => {
  /**
   * BaseLayout
   * @returns {JSX.Element}
   * @constructor
   */
  return (
    <div className={styles.container}>
      <section>
        <Navigation />
      </section>
      <div className={styles.contents}>
        <div className={styles.titleBox}>
          <h2>{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
};
