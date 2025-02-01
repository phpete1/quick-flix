<template>
  <div
    v-if="
      (Object.keys(results.movies).length !== 0 &&
      results.movies.total_results > 0)
    "
    class="absolute bg-slate-100 h-80 text-left mt-2 overflow-hidden rounded-lg top-full w-full"
  >
    <div class="h-full overflow-auto">
      <h3 class="p-4 text-2xl">Movies</h3>
      <div class="flex flex-col">
        <SearchResult
          :key="result.id"
          v-for="result in results.movies.results"
          class="cursor-pointer flex flex-row p-4 space-x-4 hover:bg-slate-300"
          :result="result"
        />
      </div>
    </div>
  </div>
  <div
    v-else
    class="bg-slate-100 flex flex-col items-center font-bold mx-auto p-4 rounded-lg space-y-2 w-3/4"
  >
    <p>No results.</p>
    <img src="/no-results.gif" class="mx-auto rounded w-1/2" />
  </div>
</template>

<script>
import SearchResult from "./SearchResult.vue";

export default {
  name: "SearchResults",
  props: {
    resultsProp: Object,
  },
  components: {
    SearchResult,
  },
  data() {
    return {
      results: {
        movies: {}, // Initialize `results` with an empty structure
      },
    };
  },
  watch: {
    resultsProp: {
      handler(updatedResults) {
        if (
          Object.keys(updatedResults.movies || {}).length !== 0 &&
          updatedResults.movies.results
        ) {
          this.results = updatedResults;
        } else {
          this.results = {
            movies: {}, // Reset `results` to an empty structure
          };
        }
      },
      deep: true, // Watch nested properties in `resultsProp`
      immediate: true, // Run watcher immediately on component initialization
    },
  },
};
</script>
