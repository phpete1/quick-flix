<template>
  <div class="flex flex-col mb-32 space-y-4 w-1/2">
    <h1 class="font-black text-white text-3xl">
      Search for a movie or TV show.
    </h1>
    <form>
      <input
        @keyup="searchMovies"
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
import Tmdb from "@/utils/Tmdb";

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
    async searchMovies() {
      const tmdb = new Tmdb();
      this.results.movies = await tmdb.searchTitles('movies', this.searchQuery);
    },
  }
};
</script>
