import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { FaBars } from 'react-icons/fa'
import styles from '@/components/Menu/Menu.module.css'
import { useState } from 'react'

import GenreButton from '../GenreButton/GenreButton'

const Menu = ({ genres, handleClickFilter }) => {

  const [menu, setMenu] = useState(false)

  const showMenu = () => setMenu(!menu)


  return (
    <>
      <div className={styles.navbar}>
        <FaBars onClick={showMenu} className={styles.menuBars} />
      </div>
      <nav className={menu ? styles.navMenuActive : styles.navMenu}>
        <ul className={styles.navMenuItens} onClick={showMenu}>
          <li className={styles.navbarToggle}>
            <FaTimes className={styles.menuBars} />
          </li>
            <GenreButton genre={'All'} onClick={handleClickFilter} />
            {genres &&
              genres.map((genre) => (
                <GenreButton
                  key={genre}
                  genre={genre}
                  onClick={handleClickFilter}
                />
              ))}
        </ul>
      </nav>
    </>
  );
}

export default Menu