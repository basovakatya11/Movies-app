export default class TmdbService {
  async getResource(url) {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`)
    }

    const body = await response.json()
    return body
  }

  async getMoviesInfo() {
    const result = await this.getResource(
      'https://api.themoviedb.org/3/search/movie?api_key=afd2636738a1f7ebde459a2c19fe4930&language=en-US&page=1&query=return'
    )
    return result.results
  }

  async getGenresInfo() {
    const result = await this.getResource(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=afd2636738a1f7ebde459a2c19fe4930&language=en-US'
    )
    return result.genres
  }
}
