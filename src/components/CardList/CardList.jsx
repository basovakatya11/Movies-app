// import { id } from 'date-fns/locale'
import React from 'react'
import PropTypes from 'prop-types'

import MovieCard from '../Card'

import './CardList.css'

function CardList({ movies, onRateChange, ratedMoviesList }) {
  const getRatingValue = (movieId) => {
    const ratedMovie = ratedMoviesList.find(({ id }) => id === movieId)
    const rating = ratedMovie ? ratedMovie.rating : 0
    return rating
  }
  const cardList = movies.map(({ rating, ...movieProps }) => {
    const ratingValue = typeof rating === 'undefined' ? getRatingValue(movieProps.id) : rating
    return (
      <MovieCard
        key={movieProps.id}
        {...movieProps}
        onRateChange={(rate) => onRateChange(movieProps.id, rate)}
        rating={ratingValue}
      />
    )
  })
  return <div className="card-list">{cardList}</div>
}

CardList.propTypes = {
  movies: PropTypes.array.isRequired,
  onRateChange: PropTypes.func.isRequired,
  ratedMoviesList: PropTypes.array.isRequired,
}

export default CardList
