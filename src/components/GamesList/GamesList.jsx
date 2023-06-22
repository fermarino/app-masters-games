import React from 'react'
import Image from 'next/image'

const GamesList = (props) => {
  return (
    <ul>
      {props.games.map((game) => (
        <li key={game.id}>
          <h1>{game.title}</h1>
          <p>{game.short_description}</p>
        </li>
      ))}
    </ul>
  )
}

export default GamesList