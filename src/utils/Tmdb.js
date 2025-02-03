import { useConfigStore } from "@/stores/ConfigStore";
import { format, intervalToDuration } from "date-fns";

export default class Tmdb {
  constructor() {
    const configStore = useConfigStore();
    this.bearer_token = import.meta.env.VITE_VUE_APP_TMDB_BEARER_TOKEN;
    this.region = configStore.region;
  }

  async getTitle(endpoint, id) {
    let result = await this.fetchTitle(id);

    result.backdrop_url = this.getImageUrl(result.backdrop_path, "");
    result.poster_url = this.getImageUrl(result.poster_path, "1000x1500");
    result.release_year = result?.release_date
      ? this.getReleaseYear(result.release_date)
      : "";
    result.vote_average_percentage = `${Math.floor(result.vote_average * 10)}%`;
    result.runtime_friendly = this.getMinutes(result.runtime);

    result.production_companies = result.production_companies.map(
      (company) => ({
        ...company,
        logo_url: this.getImageUrl(company.logo_path),
      })
    );

    return result;
  }

  async getReleaseDates(id, origin_country) {
    let results = await this.fetchReleaseDates(id);

    results =
      results.results.find((result) => result.iso_3166_1 === this.region) ??
      results.results.find(
        (result) => result.iso_3166_1 === results.origin_country
      ) ??
      results.results[0] ??
      {};

    results.default_release_date = results?.release_dates
      ? this.getDefaultReleaseDate(results.release_dates)
      : null;

    return results;
  }

  getDefaultReleaseDate(releaseDates) {
    if (releaseDates.length === 0 || !releaseDates) {
      return null;
    }

    /**
     * TMDB types priority order:
     * 3 = Theatrical Wide (official main release in cinemas) - Primary official rating
     * 2 = Theatrical Limited (e.g., small early releases before a wide release) - If wide release is missing
     * 4 = Digital (e.g., Netflix, Prime Video, Disney+, VOD) - For streaming services & VOD releases
     * 1 = Premiere (e.g., film festivals, special events) - Film festival releases (only if no better options)
     * 5 = Physical (e.g., DVD, Blu-ray, home video) - DVD/Blu-ray certification as fallback
     * 6 = TV (broadcast on television, often with different content or ratings) - Last resort, as TV versions might be edited
     */
    const typesOrder = [3, 2, 4, 1, 5, 6];

    let sortedReleaseDates = releaseDates.sort((a, b) => {
      return typesOrder.indexOf(a.type) - typesOrder.indexOf(b.type);
    });

    const bestRelease =
      sortedReleaseDates.find((release) => release.certification) ??
      sortedReleaseDates[0];

    if (bestRelease) {
      bestRelease.release_date_friendly = this.getReleaseDate(
        bestRelease.release_date
      );
      return bestRelease;
    }

    return null;
  }

  async getPeople(id) {
    let results = await this.fetchPeople(id);

    results.cast = results.cast.map((person) => ({
      ...person,
      profile_url: this.getImageUrl(person.profile_path, "500x500"),
    }));

    results.crew = results.crew.map((person) => ({
      ...person,
      profile_url: this.getImageUrl(person.profile_path, "500x500"),
    }));

    results.crew_grouped = [];
    const crew_grouped = results.crew.reduce((crew, person) => {
      if (!crew[person.job]) {
        crew[person.job] = {
          name: person.job,
          crew: [],
        };
        results.crew_grouped.push(person.job);
      }

      crew[person.job].crew.push(person);
      return crew;
    }, {});

    results.crew_grouped = results.crew_grouped.map((job, index) => ({
      index, // Numeric index
      name: crew_grouped[job].name,
      crew: crew_grouped[job].crew,
    }));

    return results;
  }

  async getProviders(id, types) {
    let results = await this.fetchProviders(id);

    results = results.results[this.region];

    results = types.flatMap((type) => results?.[type] || []);

    results = results
      .map((result) => ({
        ...result,
        logo_url: this.getImageUrl(result.logo_path),
      }))
      .filter(
        (result, index, array) =>
          array.findIndex((p) => p.provider_id === result.provider_id) === index
      );

    return results;
  }

  async searchTitles(endpoint, query) {
    let results = await this.fetchMovies(query);

    results.results = results.results.map((result) => ({
      ...result,

      poster_url: this.getImageUrl(result.poster_path, "1000x1500"),

      release_year: result?.release_date
        ? this.getReleaseYear(result.release_date)
        : "",
    }));

    return results;
  }

  async fetchMovies(query) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${this.bearer_token}`,
      },
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      options
    );

    return await response.json();
  }

  async fetchPeople(id) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${this.bearer_token}`,
      },
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
      options
    );

    return await response.json();
  }

  async fetchProviders(id) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${this.bearer_token}`,
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
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${this.bearer_token}`,
      },
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      options
    );

    return await response.json();
  }

  async fetchReleaseDates(id) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${this.bearer_token}`,
      },
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/release_dates`,
      options
    );

    return await response.json();
  }

  getImageUrl(path, placeholderSize = "") {
    return path
      ? `https://image.tmdb.org/t/p/original/${path}`
      : placeholderSize
      ? this.getPlaceholderUrl(placeholderSize)
      : null;
  }

  getPlaceholderUrl(dimentions) {
    return `https://placehold.co/${dimentions}`;
  }

  getReleaseYear(date) {
    return format(new Date(date), "yyyy");
  }

  getReleaseDate(date) {
    return format(new Date(date), "do MMM yyyy");
  }

  getMinutes(minutes) {
    if (minutes < 60) return `${minutes}m`;

    const duration = intervalToDuration({ start: 0, end: minutes * 60 * 1000 });
    return `${duration.hours}hr ${duration.minutes}m`;
  }
}
