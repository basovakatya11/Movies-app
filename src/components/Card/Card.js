import React from 'react'
import './Card.css'
import { format } from 'date-fns'

import 'inter-ui/inter.css'
import GenresList from '../GenresList'

import noPoster from './image-not-found-svg.png'

export default class Card extends React.Component {
  truncateString = (string, maxLength) => {
    if (string.length > maxLength) {
      const trimmedString = string.substr(0, maxLength)
      return `${trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')))} ...`
    }
    return string
  }

  render() {
    const {
      overview,
      original_title: originalTitle,
      release_date: releaseDate,
      poster_path: posterPath,
      genre_ids: genreIds,
      genres,
    } = this.props

    const image = posterPath ? `https://image.tmdb.org/t/p/original${posterPath}` : noPoster
    const plot = this.truncateString(overview, 203)
    const formatedDate = releaseDate ? format(new Date(releaseDate), 'MMMM dd, yyyy') : null

    return (
      <div className="card">
        <img className="card__image" alt="movie" src={image} />
        <div className="card__content content">
          <h3 className="content__title">{originalTitle}</h3>
          <div className="content__date">{formatedDate}</div>
          <GenresList genreIds={genreIds} genres={genres} />
          <div className="content__plot">{plot}</div>
        </div>
      </div>
    )
  }
}
