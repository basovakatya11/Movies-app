import React from 'react'

import CardList from '../CardList'

import './App.css'

export default class App extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    results: [],
    genres: [],
  }

  componentDidMount() {
    fetch(
      'https://api.themoviedb.org/3/search/movie?api_key=afd2636738a1f7ebde459a2c19fe4930&language=en-US&page=1&query=return'
    )
      .then((response) => response.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            results: result.results,
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          })
        }
      )

    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=afd2636738a1f7ebde459a2c19fe4930&language=en-US')
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          genres: result.genres,
        })
      })
  }

  render() {
    const { error, isLoaded, results, genres } = this.state
    if (error) {
      return <div>Oшибка: {error.message}</div>
    }
    if (!isLoaded) {
      return <div>Загрузка...</div>
    }
    return (
      <div className="app">
        <CardList movies={results} genres={genres} />
      </div>
    )
  }
}
