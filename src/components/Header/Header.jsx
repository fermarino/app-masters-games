import styles from './Header.module.css'

import Menu from '@/components/Menu/Menu'
import Search from '../Search/Search';
import Image from 'next/image';
import Logo from '../../../public/logo.svg'

import { useRouter } from 'next/navigation';
import { auth } from '@/config/firebase';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';


const Header = ({ onSearch, genres, handleClickFilter, user, showFavorites, handleFavorites }) => {

  const [loggedUser, setLoggedUser] = useState(user);
  const router = useRouter();

  const handleLogout = () => {
    auth.signOut().then(() => {
      setLoggedUser(null);
      router.push('/');
    });
  };

  return (
    <>
      <header>

        <div className={styles.container}>
          <Menu
            genres={genres}
            handleClickFilter={handleClickFilter}
            onSearch={onSearch}
          />
          <Image src={Logo} alt='Logo do Masters Games' />
          <div className={styles.desktopSearch}>
            <Search onSearch={onSearch} />
            {loggedUser ? (
              <>
                <button onClick={handleFavorites}>
                {showFavorites ? 'Todos' : 'Favoritos'}
                </button>
                <button onClick={handleLogout}>Sair</button>
              </>
            ) : (
              <button onClick={handleFavorites}>Entre na sua conta</button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;