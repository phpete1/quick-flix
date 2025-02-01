export default class Tmdb {
  constructor() {
    this.bearer_token = import.meta.env.VUE_APP_TMDB_BEARER_TOKEN;
  }

  async getTitle(endpoint, id) {
    let result = await this.fetchTitle(id);

    result.backdrop_url = this.getImageUrl(result.backdrop_path, '');
    result.poster_url = this.getImageUrl(result.poster_path, '1000x1500');
    result.release_year = this.getReleaseYear(result.release_date);
    result.vote_average_percentage = `${Math.floor(result.vote_average*10)}%`;

    return result;
  }

  async getProviders(id, types) {
    let results = await this.fetchProviders(id);

    results = results.results.GB;

    results = types.flatMap(type => results?.[type] || []);

    results = results
      .map((result) => ({
        ...result,
        logo_url: this.getImageUrl(result.logo_path),
      }))
      .filter(
        (result, index, array) =>
          array.findIndex((p) => p.provider_id === result.provider_id) ===
          index
      );

    return results;
  }

  async searchTitles(endpoint, query) {
    let results = await this.fetchMovies(query);

    results.results = results.results.map((result) => ({
      ...result,

      poster_url: this.getImageUrl(result.poster_path, '1000x1500'),

      release_year: this.getReleaseYear(result.release_date),
    }));

    return results;
  }

  async fetchMovies(query) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this.bearer_token}`,
      },
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-GB&page=1`,
      options
    );

    return await response.json();
  }

  async fetchProviders(id) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          `Bearer ${this.bearer_token}`,
      },
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/watch/providers`,
      options
    );

    return await response.json();
  }

  async fetchTitle(id) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this.bearer_token}`,
      },
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      options
    );

    return await response.json();
  }

  getImageUrl(path, placeholderSize = '') {
    return path 
      ? `https://image.tmdb.org/t/p/original/${path}`
      : (placeholderSize ? this.getPlaceholderUrl(placeholderSize) : null)

  }

  getPlaceholderUrl(dimentions) {
    return `https://placehold.co/${dimentions}`;
  }

  getReleaseYear(date) {
    return date ? date.split('-')[0] : null;
  }
}
