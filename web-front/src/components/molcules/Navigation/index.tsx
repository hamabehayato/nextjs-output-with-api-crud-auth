/**
 * Navigation
 *
 * @package components
 */
import { useAuthContext } from '@/contexts/AuthContext';
import { useSignNavigation } from './useNavigation';
import { NavigationLink } from '@/components/atoms/NavagationLink';
import { NAVIGATION_LIST } from '@/constants/navigations';
import styles from './styles.module.css';

/**
 * Navigation
 * @returns {JSX.Element}
 * @constructor
 */
export const Navigation = () => {
  const { signOut } = useAuthContext();
  const [{ handleSignOut }] = useSignNavigation({ signOut });

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Todo List</h1>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <NavigationLink label={'Top'} linkPath={NAVIGATION_LIST.TOP} />
          <NavigationLink label={'Create'} linkPath={NAVIGATION_LIST.CREATE} />
          <li className={styles.item}>
            <button onClick={handleSignOut}>Sign Out</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
