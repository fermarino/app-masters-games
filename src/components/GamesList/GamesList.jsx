import React, { useState } from 'react'
import styles from '@/components/GamesList/GamesList.module.css'

import Game from '../Game/Game'
import SearchInput from '../Search/Search'
import GenreButton from '../GenreButton/GenreButton'
import Header from '../Header/Header'

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

  const filteredGamesGenre = filteredGames.filter(
    (game) =>
      isActive === 'All' || game.genre.toLowerCase() === isActive.toLowerCase()
  );

  const handleSearch = (value) => {
    setSearch(value);
  }

  const handleSelectAll = () => {
    setIsActive('All');
  }

  return (
    <>
      <Header onSearch={handleSearch} />

      <ul className={styles.genresContainer}>
        <GenreButton
          genre={'All'}
          isActive={isActive === 'All'}
          onClick={handleSelectAll}
          allGenres
        />
        {filteredGenres.map((genre) => (
          <GenreButton
            key={genre}
            genre={genre}
            isActive={isActive === genre}
            onClick={handleClickFilter}
          />
        ))}
      </ul>

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
      </div>
    </>
  )
}

export default GamesList