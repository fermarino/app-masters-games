import styles from '@/components/Header/Header.module.css'

import SearchInput from '../Search/Search';


const Header = ({ onSearch }) => {
  return (
    <header>
      <div className={styles.container}>
        <h1 className={styles.logo}>MG</h1>
        <SearchInput onSearch={onSearch} />
      </div>
    </header>
  );
};

export default Header;