<template>
  <div class="flex flex-col items-center mb-32 space-y-16 w-full md:w-3/4 lg:w-1/2">
    <h1 class="font-black text-black dark:text-white text-3xl">
      Search for a movie or TV show.
    </h1>
    <div class="relative max-w-full w-128">
      <form>
        <input
          @keyup="searchMovies"
          v-model="searchQuery"
          type="text"
          class="border bg-slate-200 border-slate-300 text-slate-900 outline-0 px-4 py-2 rounded w-full dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          placeholder="Start typing..."
        />
      </form>
      <SearchResults
        :resultsProp="results"
        v-if="
          searchQuery.length > 0 && Object.keys(results.movies).length !== 0
        "
      />
    </div>
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
      this.results.movies = await tmdb.searchTitles("movies", this.searchQuery);
    },
  },
};
</script>
