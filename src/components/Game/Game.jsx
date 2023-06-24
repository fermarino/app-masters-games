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
      <Image src={props.thumbnail} alt={props.title} className={styles.gameImg}
        width={0}
        height={0}
        sizes="100vw" />
      <p className={styles.gameDesc}>{props.short_description}</p>
    </div>
  )
}

export default Game