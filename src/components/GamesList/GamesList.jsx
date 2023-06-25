import { useState } from 'react'
import styles from './GamesList.module.css'

import Game from '../Game/Game'
import Header from '../Header/Header'
import BackToTop from '../BackToTop/BackToTop'

const GamesList = (props) => {

  const [search, setSearch] = useState('');
  const [isActive, setIsActive] = useState('All');


  const lowerSearch = search.toLowerCase();

  const handleSearch = (value) => {
    setSearch(value);
  }


  const filteredGames = props.games.filter((game) => game.title.toLowerCase().includes(lowerSearch))

  const filteredGenres = props.games.reduce((genres, game) => {
    if (!genres.includes(game.genre)) {
      genres.push(game.genre);
    }
    return genres;
  }, []);


  const handleClickFilter = (genre) => {
    setIsActive(genre);
  };

  const filteredGamesGenre = filteredGames.filter(
    (game) =>
      isActive === 'All' || game.genre.toLowerCase() === isActive.toLowerCase()
  );



  return (
    <>
      <Header
        onSearch={handleSearch}
        genres={filteredGenres}
        handleClickFilter={handleClickFilter} />

      <main>
        <div className={styles.container}>
          <div className={styles.gamesList}>
            {filteredGamesGenre.map((game) => (
              <Game
                key={game.id}
                title={game.title}
                genre={game.genre}
                thumbnail={game.thumbnail}
                short_description={game.short_description}
              />
            ))}
            <BackToTop />
          </div>
        </div>
      </main>
    </>
  )
}

export default GamesList