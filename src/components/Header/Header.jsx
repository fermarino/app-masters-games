import styles from '@/components/Header/Header.module.css'
import { useState } from 'react';

import SearchInput from '../Search/Search';
import Menu from '@/components/Menu/Menu'


const Header = ({ onSearch, genres, handleClickFilter}) => {

  const [menu, setMenu] = useState(false)

  const showMenu = () => setMenu(!menu)

  return (
    <header>
      <div className={styles.container}>
        
        <Menu
            genres={genres}
            handleClickFilter={handleClickFilter}
        />
        
        <h1 className={styles.logo}>MG</h1>

        <SearchInput onSearch={onSearch} />
      </div>
    </header>
  );
};

export default Header;