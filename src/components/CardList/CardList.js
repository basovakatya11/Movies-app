// import { id } from 'date-fns/locale'
import React from 'react'

import Card from '../Card'

import './CardList.css'

function CardList({ movies, genres, onRateChange, ratedMoviesList }) {
  const getRatingValue = (movieId) => {
    const ratedMovie = ratedMoviesList.find(({ id }) => id === movieId)
    const rating = ratedMovie ? ratedMovie.rating : 0
    return rating
  }
  const cardList = movies.map(({ rating, ...movieProps }) => {
    const ratingValue = typeof rating === 'undefined' ? getRatingValue(movieProps.id) : rating
    return (
      <Card
        key={movieProps.id}
        {...movieProps}
        genres={genres}
        onRateChange={(rate) => onRateChange(movieProps.id, rate)}
        rating={ratingValue}
      />
    )
  })
  return <div className="card-list">{cardList}</div>
}

export default CardList
