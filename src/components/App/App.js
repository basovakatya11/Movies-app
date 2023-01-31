import React from 'react'
import { Spin, Alert } from 'antd'

import CardList from '../CardList'
import TmdbService from '../../services/tmdb-service'

import './App.css'

export default class App extends React.Component {
  tmdbService = new TmdbService()

  state = {
    error: null,
    isContentLoaded: false,
    isGenresLoaded: false,
    results: [],
    genres: [],
  }

  componentDidMount() {
    this.tmdbService
      .getMoviesInfo()
      .then((result) => {
        this.setState({
          isContentLoaded: true,
          results: result,
        })
      })
      .catch(this.onError)

    this.tmdbService
      .getGenresInfo()
      .then((result) => {
        this.setState({
          isGenresLoaded: true,
          genres: result,
        })
      })
      .catch(this.onError)
  }

  onError = (error) => {
    this.setState({
      isContentLoaded: true,
      error,
    })
  }

  render() {
    const { error, isContentLoaded, isGenresLoaded, results, genres } = this.state
    if (error) {
      return <Alert message="Error" description={error.message} type="error" showIcon />
    }
    if (!isContentLoaded || !isGenresLoaded) {
      return (
        <div className="spin">
          <Spin tip="loading" size="large" />
        </div>
      )
    }
    return (
      <div className="app">
        <CardList movies={results} genres={genres} />
      </div>
    )
  }
}
