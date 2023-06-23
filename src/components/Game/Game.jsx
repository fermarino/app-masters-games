import React from 'react'

import styles from '@/components/Game/Game.module.css'
import Image from 'next/image'

const Game = (props) => {
  return (
      <div className={styles.cardGame}>
        <h2>{props.title}</h2>
        <h3>{props.genre}</h3>
        <Image src={props.thumbnail} alt={props.title} width={300} height={300} />
        <p>{props.short_description}</p>
      </div>
  )
}

export default Game