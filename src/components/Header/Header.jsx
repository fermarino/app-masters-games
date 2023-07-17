import React, { useState } from 'react';
import styles from './Header.module.css';
import Menu from '@/components/Menu/Menu';
import Search from '../Search/Search';
import Image from 'next/image';
import Logo from '../../../public/logo.svg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/config/firebase';
import { FaUserCircle, FaAngleDown } from 'react-icons/fa';

const Header = ({ onSearch, genres, handleClickFilter, user }) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    auth.signOut().then(() => {
      router.push('/');
    });
  };

  const handleFavorites = () => {
    router.push('/favorites');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header>
      <div className={styles.container}>
        <Menu genres={genres} handleClickFilter={handleClickFilter} onSearch={onSearch} />
        <Link href='/'>
          <Image src={Logo} alt="Logo do Masters Games" />
        </Link>
        <div className={styles.desktopSearch}>
          <Search onSearch={onSearch} />
        </div>
        {user ? (
          <div className={styles.userAccount}>
            <button
              className={`${styles.accountButton} ${isDropdownOpen ? styles.open : ''}`}
              onClick={toggleDropdown}
            >
              <FaUserCircle className={styles.avatarIcon} />
              <FaAngleDown className={styles.arrowIcon} />
            </button>
            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <button className={styles.menuButton} onClick={handleFavorites}>
                  Favoritos
                </button>
                <button className={styles.menuButton} onClick={handleLogout}>
                  Sair
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.userAccount}>
            <Link href="/auth">
              <button className={styles.loginButton}>Login</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
