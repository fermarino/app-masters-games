import React, { useState } from 'react'
import Image from 'next/image'

import styles from '@/components/GamesList/GamesList.module.css'
import Game from '../Game/Game'

const GamesList = (props) => {

  const [search, setSearch] = useState('');

  const lowerSearch = search.toLowerCase();

  const filteredGames = props.games.filter((game) => game.title.toLowerCase().includes(lowerSearch))

  const filteredGenres = props.games.reduce((genres, game) => {
    if (!genres.includes(game.genre)) {
      genres.push(game.genre);
    }
    return genres;
  }, []);

  return (
    <>
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredGenres.map((genre) => (
        <button key={genre}>
          {genre}
        </button>

      ))}
      <ul className={styles.gamesList}>
        {filteredGames.map((game) => (
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