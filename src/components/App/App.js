import React from 'react'
import { Spin, Alert, Typography } from 'antd'

import CardList from '../CardList'
import SearchInput from '../SearchInput'
import PaginationComponent from '../Pagination'
import TmdbService from '../../services/tmdb-service'

import './App.css'

const { Text } = Typography

export default class App extends React.Component {
  tmdbService = new TmdbService()

  state = {
    error: null,
    isContentLoaded: false,
    isGenresLoaded: false,
    results: [],
    genres: [],
    searchValue: 'return',
    isMoviesLoaded: false,
    currentPage: 1,
    totalItems: null,
  }

  componentDidMount() {
    const { searchValue } = this.state
    this.updateMoviesList(searchValue)

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

  componentDidUpdate(prevProps, prevState) {
    const { searchValue, currentPage } = this.state
    if (searchValue !== prevState.searchValue) {
      this.updateMoviesList(searchValue)
    } else if (currentPage !== prevState.currentPage) {
      this.updateMoviesList(searchValue, currentPage)
    }
  }

  onError = (error) => {
    this.setState({
      isContentLoaded: true,
      isMoviesLoaded: true,
      error,
    })
  }

  onChangeSearchValue = (value) => {
    this.setState({
      isMoviesLoaded: false,
      searchValue: value,
      currentPage: 1,
    })
  }

  onPageChange = (pageNumber) => {
    this.setState({
      currentPage: pageNumber,
      isMoviesLoaded: false,
    })
  }

  updateMoviesList(value, page) {
    if (!value) {
      this.setState({
        isMoviesLoaded: true,
      })
      return
    }
    this.tmdbService
      .getMoviesInfo(value, page)
      .then((result) => {
        this.setState({
          isContentLoaded: true,
          isMoviesLoaded: true,
          results: result.results,
          totalItems: result.total_results,
        })
      })
      .catch(this.onError)
  }

  render() {
    const {
      error,
      isContentLoaded,
      isGenresLoaded,
      results,
      genres,
      searchValue,
      isMoviesLoaded,
      currentPage,
      totalItems,
    } = this.state
    if (error) {
      return <Alert message="Error" description={error.message} type="error" showIcon />
    }
    if (!isContentLoaded || !isGenresLoaded) {
      return (
        <div className="spin-1">
          <Spin tip="loading" size="large" />
        </div>
      )
    }
    const spinner = !isMoviesLoaded ? (
      <div className="spin-2">
        <Spin tip="loading" size="large" />
      </div>
    ) : null
    const cardList =
      isMoviesLoaded && searchValue && results.length > 0 ? <CardList movies={results} genres={genres} /> : null

    const noResultMessage =
      isMoviesLoaded && searchValue && results.length === 0 ? (
        <Text type="secondary">По вашему запросу ничего не найдено</Text>
      ) : null
    const pagination =
      isMoviesLoaded && searchValue && results.length > 0 ? (
        <PaginationComponent onPageChange={this.onPageChange} currentPage={currentPage} totalItems={totalItems} />
      ) : null
    return (
      <div className="app">
        <SearchInput onSearchMovies={this.onChangeSearchValue} />
        {spinner}
        {cardList}
        {noResultMessage}
        {pagination}
      </div>
    )
  }
}
