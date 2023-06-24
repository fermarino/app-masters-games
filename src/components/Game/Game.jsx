import React from 'react'

import styles from '@/components/Game/Game.module.css'
import Image from 'next/image'

const Game = (props) => {
  return (
    <div className={styles.cardGame}>
      <div className={styles.gameInfo}>
        <h2 className={styles.gameTitle}>{props.title}</h2>
        <h3 className={styles.gameGenre}>{props.genre}</h3>
      </div>
      <Image src={props.thumbnail} alt={props.title} width={300} height={300} className={styles.gameImg}/>
      <p className={styles.gameDesc}>{props.short_description}</p>
    </div>
  )
}

export default Game