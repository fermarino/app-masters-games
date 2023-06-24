import styles from '@/components/Header/Header.module.css'
import { useState } from 'react';

import SearchInput from '../Search/Search';
import Menu from '@/components/Menu/Menu'


const Header = ({ onSearch, genres, handleClickFilter}) => {

  return (
    <header>
      <div className={styles.container}>
        
        <Menu
            genres={genres}
            handleClickFilter={handleClickFilter}
            onSearch={onSearch}
        />
        
        <h1 className={styles.logo}>MG</h1>
      </div>
    </header>
  );
};

export default Header;