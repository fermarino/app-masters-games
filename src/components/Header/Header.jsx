import styles from './Header.module.css';

import Menu from '@/components/Menu/Menu';
import Search from '../Search/Search';
import Image from 'next/image';
import Logo from '../../../public/logo.svg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/config/firebase';

const Header = ({ onSearch, genres, handleClickFilter, user }) => {
  const router = useRouter();

  const handleLogout = () => {
    auth.signOut().then(() => {
      router.push('/');
    });
  };

  const handleFavorites = () => {
    router.push('/favorites');
  };

  return (
    <header>
      <div className={styles.container}>
        <Menu genres={genres} handleClickFilter={handleClickFilter} onSearch={onSearch} />
        <Image src={Logo} alt="Logo do Masters Games" />
        <div className={styles.desktopSearch}>
          <Search onSearch={onSearch} />
          {user ? (
            <>
              <button onClick={handleFavorites}>Favoritos</button>
              <button onClick={handleLogout}>Sair</button>
            </>
          ) : (
            <Link href="/auth">
              <button>Entre na sua conta</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
