import React from 'react'
import './Card.css'
import { format } from 'date-fns'
import { Rate, Card } from 'antd'
import PropTypes from 'prop-types'

import 'inter-ui/inter.css'
import GenresList from '../GenresList'
import { Consumer } from '../TMDBServiceContext'

import noPoster from './image-not-found.jpg'

class MovieCard extends React.Component {
  state = {
    starsCount: this.props.rating,
  }

  onStarsChange = (value) => {
    this.setState({
      starsCount: value,
    })
    const { onRateChange } = this.props
    onRateChange(value)
  }

  truncateString = (string, maxLength) => {
    if (string.length > maxLength) {
      const trimmedString = string.substr(0, maxLength)
      return `${trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')))} ...`
    }
    return string
  }

  render() {
    const { overview, originalTitle, releaseDate, posterPath, genreIds, generalRating } = this.props

    const { starsCount } = this.state

    const imageUrl = posterPath ? `https://image.tmdb.org/t/p/original${posterPath}` : noPoster
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
      <Card hoverable className="card">
        <div className="card__image">
          <img alt={`movie ${originalTitle}`} src={imageUrl} />
        </div>
        <div className="card__header">
          <div className="header__title">{originalTitle}</div>
          <div className={progressClassNames}>{Math.round(generalRating * 10) / 10}</div>
        </div>
        <div className="card__release-date">{formatedDate}</div>
        <Consumer>
          {(genres) => (
            <div className="card__genres-list">
              <GenresList genreIds={genreIds} genres={genres} />
            </div>
          )}
        </Consumer>
        <div className="card__plot">{plot}</div>
        <div className="card__rate">
          <Rate
            allowHalf="true"
            count="10"
            value={starsCount}
            onChange={this.onStarsChange}
            style={{ fontSize: '18px' }}
          />
        </div>
      </Card>
    )
  }
}

Card.propTypes = {
  overview: PropTypes.string,
  originalTitle: PropTypes.string,
  releaseDate: PropTypes.string,
  posterPath: PropTypes.string,
  genreIds: PropTypes.array,
  generalRating: PropTypes.number,
}

export default MovieCard
