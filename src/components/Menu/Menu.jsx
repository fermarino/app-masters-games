
import { FaTimes } from 'react-icons/fa'
import { FaBars } from 'react-icons/fa'
import styles from '@/components/Menu/Menu.module.css'
import { useState } from 'react'

import GenreButton from '../GenreButton/GenreButton'
import Search from '../Search/Search'

const Menu = ({ genres, handleClickFilter, onSearch }) => {

  const [menu, setMenu] = useState(false)

  const toggleMenu = () => setMenu(!menu)

  return (
    <>

      <div className={styles.openMenu}>
        <FaBars onClick={toggleMenu} className={styles.menuBars} />
      </div>
      <nav className={menu ? styles.navMenuActive : styles.navMenu}>

        <div onClick={toggleMenu}>
          <div className={styles.navbarToggle}>
            <FaTimes className={styles.menuBars} />
          </div>
        </div>
        <ul className={styles.navMenuItens} onClick={toggleMenu}>

          <Search onSearch={onSearch} />
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