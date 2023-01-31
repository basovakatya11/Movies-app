import React from 'react'
import './GenresList.css'

export default class GenresList extends React.Component {
  minId = 11

  render() {
    const { genres, genreIds } = this.props
    const genresNames = genreIds.map((id) => {
      const obj = genres.find((elem) => elem.id === id)
      return obj.name
    })
    const genreBlocks = genresNames.map((genre) => {
      return (
        <div key={this.minId++} className="genres__block">
          {genre}
        </div>
      )
    })

    return <div className="content__genres genres">{genreBlocks}</div>
  }
}
