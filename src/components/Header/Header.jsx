import styles from './Header.module.css'

import Menu from '@/components/Menu/Menu'
import Search from '../Search/Search';
import Image from 'next/image';
import Logo from '../../../public/logo.svg'
import LoginButton from '../LoginButton/LoginButton';


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
            <Image src={Logo} alt='Logo do Masters Games'/>
          <div className={styles.desktopSearch}>
            <Search onSearch={onSearch} />
            <LoginButton/>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;