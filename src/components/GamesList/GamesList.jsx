import React from 'react'
import Image from 'next/image'

import styles from '@/components/GamesList/GamesList.module.css'
import Game from '../Game/Game'

const GamesList = (props) => {
  return (
    <ul className={styles.gamesList}>
      {props.games.map((game) => (
        <Game
          key={game.id}
          title={game.title}
          genre={game.genre}
          thumbnail={game.thumbnail}
          short_description={game.short_description}
        />
      ))}
    </ul>
  )
}

export default GamesList