import React from 'react'

import styles from '@/components/Game/Game.module.css'

const Game = (props) => {
  return (
    <li className={styles.game}>
      <h2>{props.title}</h2>
      <h3>{props.genre}</h3>
      <p>{props.short__description}</p>
    </li>
  )
}

export default Game