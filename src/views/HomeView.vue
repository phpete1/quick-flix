<template>
  <div class="flex flex-col mb-32 space-y-4 w-1/2">
    <h1 class="font-black text-white text-3xl">
      Search for a movie or TV show.
    </h1>
    <form>
      <input
        @keyup="searchMovie"
        v-model="searchQuery"
        type="text"
        class="bg-slate-800 border border-slate-700 outline-0 px-4 py-2 rounded text-white w-3/4"
        placeholder="Start typing..."
      />
    </form>
    <SearchResults :resultsProp="results" v-if="searchQuery.length > 0 && Object.keys(results.movies).length !== 0" />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchResults from "@/components/SearchResults.vue";

export default {
  name: "HomeView",
  data() {
    return {
      searchQuery: "",
      results: {
        movies: {},
      },
    };
  },
  components: {
    SearchResults,
  },
  methods: {
    async searchMovie() {
      const url = `https://api.themoviedb.org/3/search/movie?query=${this.searchQuery}&include_adult=false&language=en-GB&page=1`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            `Bearer ${process.env.VUE_APP_TMDB_BEARER_TOKEN}`,
        },
      };

      const response = await fetch(url, options)
        .then((res) => res.json())
        .then((json) => (this.results.movies = json))
        .catch((err) => console.error(err));
    },
  },
};
</script>
