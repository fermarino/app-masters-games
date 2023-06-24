import styles from '@/components/Header/Header.module.css'

import Menu from '@/components/Menu/Menu'
import Search from '../Search/Search';


const Header = ({ onSearch, genres, handleClickFilter }) => {

  return (
    <>
      <header>

        <div className={styles.container}>
          <Menu
            genres={genres}
            handleClickFilter={handleClickFilter}
            onSearch={onSearch}
          />
            <h1 className={styles.logo}>MG</h1>
          <div className={styles.desktopSearch}>
            <Search onSearch={onSearch} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;