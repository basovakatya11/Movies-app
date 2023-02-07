import React from 'react'
import './Card.css'
import { format } from 'date-fns'
import { Rate } from 'antd'

import 'inter-ui/inter.css'
import GenresList from '../GenresList'
import { Consumer } from '../TMDBServiceContext'

import noPoster from './image-not-found-svg.png'

export default class Card extends React.Component {
  state = {
    starsCount: this.props.rating,
  }

  onStarsChange = (value) => {
    const { onRateChange } = this.props
    onRateChange(value)
    this.setState({
      starsCount: value,
    })
  }

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
      vote_average: generalRating,
    } = this.props

    const { starsCount } = this.state

    const image = posterPath ? `https://image.tmdb.org/t/p/original${posterPath}` : noPoster
    const plot = this.truncateString(overview, 203)
    const formatedDate = releaseDate ? format(new Date(releaseDate), 'MMMM dd, yyyy') : null
    let progressClassNames = 'header__progress'
    if (generalRating >= 3 && generalRating < 5) {
      progressClassNames += ' orange'
    }
    if (generalRating >= 5 && generalRating < 7) {
      progressClassNames += ' yellow'
    }
    if (generalRating >= 7) {
      progressClassNames += ' green'
    }

    return (
      <div className="card">
        <img className="card__image" alt="movie" src={image} />
        <div className="card__content content">
          <div className="content__header header">
            <h3>{originalTitle}</h3>
            <div className={progressClassNames}>{Math.round(generalRating * 10) / 10}</div>
          </div>
          <div className="content__date">{formatedDate}</div>
          <Consumer>{(genres) => <GenresList genreIds={genreIds} genres={genres} />}</Consumer>
          <div className="content__plot">{plot}</div>
          <div className="content__rate">
            <Rate
              allowHalf="true"
              count="10"
              value={starsCount}
              onChange={this.onStarsChange}
              style={{ fontSize: '18px' }}
            />
          </div>
        </div>
      </div>
    )
  }
}
