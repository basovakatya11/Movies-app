import React from 'react'
import store from 'store'
import { Spin, Alert, Typography } from 'antd'

import CardList from '../CardList'
import SearchInput from '../SearchInput'
import PaginationComponent from '../Pagination'
import TmdbService from '../../services/tmdb-service'
import Header from '../Header'
import { Provider } from '../TMDBServiceContext'

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
    searchValue: '',
    isMoviesLoaded: false,
    currentPage: 1,
    totalItems: null,
    guestSessionId: null,
    tabNumber: '1',
    ratedMoviesList: [],
  }

  componentDidMount() {
    if (!store.get('guestSessionId')) {
      this.createGuestSession()
    } else {
      this.setState({
        guestSessionId: store.get('guestSessionId'),
      })
    }

    this.getPopularMovies()
    this.getGenresList()
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchValue, currentPage, tabNumber } = this.state
    if (searchValue !== prevState.searchValue) {
      this.updateMoviesList(searchValue)
    } else if (currentPage !== prevState.currentPage) {
      this.updateMoviesList(searchValue, currentPage)
    } else if (tabNumber !== prevState.tabNumber) {
      if (tabNumber === '2') {
        this.setState(
          {
            tabNumber,
            currentPage: 1,
          },
          () => {
            this.getRatedMovies()
          }
        )
      } else if (tabNumber === '1') {
        this.setState(
          {
            tabNumber,
            currentPage: 1,
          },
          () => {
            this.getPopularMovies()
          }
        )
      }
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

  onTabChange = (tabNumber) => {
    this.setState({
      tabNumber,
      isContentLoaded: false,
      searchValue: '',
    })
  }

  onRateChange = (id, rate) => {
    const { guestSessionId } = this.state
    if (rate === 0) {
      this.tmdbService.deleteRatedMovie(id, guestSessionId).catch(this.onError)
    }
    this.tmdbService.setMovieRating(id, guestSessionId, rate).catch(this.onError)
  }

  getGenresList() {
    this.tmdbService
      .getGenresList()
      .then((result) => {
        this.setState({
          isGenresLoaded: true,
          genres: result,
        })
      })
      .catch(this.onError)
  }

  getPopularMovies(pageNumber) {
    this.tmdbService
      .getPopularMovies(pageNumber)
      .then(({ results, totalItems }) => {
        this.setState({
          isContentLoaded: true,
          isMoviesLoaded: true,
          results,
          totalItems,
        })
      })
      .catch(this.onError)
  }

  getRatedMovies() {
    const { guestSessionId, pageNumber } = this.state
    this.tmdbService
      .getRatedMovies(guestSessionId, pageNumber)
      .then(({ results, totalItems }) => {
        this.setState({
          isContentLoaded: true,
          isMoviesLoaded: true,
          totalItems,
          ratedMoviesList: results,
        })
      })
      .catch(this.onError)
  }

  createGuestSession = () => {
    this.tmdbService
      .guestSession()
      .then((id) => {
        store.set('guestSessionId', id)
        this.setState({
          guestSessionId: id,
        })
      })
      .catch(this.onError)
  }

  updateMoviesList(value, page) {
    const { tabNumber } = this.state
    if (tabNumber === '2') {
      this.getRatedMovies(page)
      return
    }
    if (value === '') {
      this.getPopularMovies(page)
    } else {
      this.tmdbService
        .getMoviesInfo(value, page)
        .then(({ results, totalItems }) => {
          this.setState({
            isMoviesLoaded: true,
            results,
            totalItems,
          })
        })
        .catch(this.onError)
    }
  }

  render() {
    const {
      error,
      isContentLoaded,
      isGenresLoaded,
      results,
      genres,
      isMoviesLoaded,
      currentPage,
      totalItems,
      tabNumber,
      searchValue,
      ratedMoviesList,
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
    const listAndPagination =
      isMoviesLoaded && results.length > 0 ? (
        <>
          <CardList
            movies={tabNumber === '1' ? results : ratedMoviesList}
            onRateChange={this.onRateChange}
            ratedMoviesList={ratedMoviesList}
          />
          <PaginationComponent onPageChange={this.onPageChange} currentPage={currentPage} totalItems={totalItems} />
        </>
      ) : null

    const noResultMessage =
      isMoviesLoaded && results.length === 0 ? <Text type="secondary">По вашему запросу ничего не найдено</Text> : null

    const searchInput =
      tabNumber === '1' ? <SearchInput onSearchMovies={this.onChangeSearchValue} label={searchValue} /> : null
    return (
      <Provider value={genres}>
        <div className="app">
          <Header onChange={this.onTabChange} tabNumber={tabNumber} />
          {searchInput}
          {spinner}
          {listAndPagination}
          {noResultMessage}
        </div>
      </Provider>
    )
  }
}
