import React from 'react'

import Card from '../Card'

import './CardList.css'

function CardList({ movies, genres }) {
  const cardList = movies.map((movie) => <Card key={movie.id} {...movie} genres={genres} />)
  return <div className="card-list">{cardList}</div>
}

export default CardList
