import styles from '@/components/GamesList/GamesList.module.css'
import React, { useState } from 'react'

import Game from '../Game/Game'

const GamesList = (props) => {

  const [search, setSearch] = useState('');
  const [isActive, setIsActive] = useState('All');

  const lowerSearch = search.toLowerCase();

  const filteredGames = props.games.filter((game) => game.title.toLowerCase().includes(lowerSearch))

  //Requisições do Botão

  const filteredGenres = props.games.reduce((genres, game) => {
    if (!genres.includes(game.genre)) {
      genres.push(game.genre);
    }
    return genres;
  }, []);


  const handleClickFilter = (genre) => {
    setIsActive(genre);
  };

  const filteredGamesGenre = filteredGames.filter((game) =>
    isActive === 'All' || game.genre.toLowerCase() === isActive.toLowerCase()
  );

  return (
    <>
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredGenres.map((genre) => (

        <button
          key={genre}
          className={isActive === genre ? styles.active : styles.button}
          onClick={() => handleClickFilter(genre)}>
          {genre}
        </button>
      ))}
      <ul className={styles.gamesList}>
        {filteredGamesGenre.map((game) => (
          <Game
            key={game.id}
            title={game.title}
            genre={game.genre}
            thumbnail={game.thumbnail}
            short_description={game.short_description}
          />
        ))}
      </ul>
    </>
  )
}

export default GamesList