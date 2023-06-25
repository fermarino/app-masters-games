import { FaTimes, FaBars } from 'react-icons/fa';
import styles from './Menu.module.css'
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

        <div className={styles.menuSearch}>
          <Search onSearch={onSearch} />
        </div>
        
        <ul className={styles.navMenuItens} onClick={toggleMenu}>


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