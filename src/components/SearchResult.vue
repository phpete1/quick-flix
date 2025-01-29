<template>
  <router-link :to="{ name: 'movies', params: { id: result.id } }" class="cursor-pointer flex flex-row p-4 space-x-4 hover:bg-slate-300">
    <div class="w-1/6">
      <img :src="result.poster_url" class="rounded" />
    </div>
    <div class="flex flex-col space-y-2 w-5/6">
      <div>
        <h4 class="font-semibold leading-5 line-clamp-1 text-lg">{{ result.title }}</h4>
        <p class="text-sm text-slate-500" v-if="result.release_year">
          {{ result.release_year }}
        </p>
      </div>
      <div>
        <p class="line-clamp-2">{{ result.overview }}</p>
      </div>
    </div>
</router-link>
</template>

<script>
export default {
  name: "SearchResult",
  props: {
    result: Object,
  },
};
</script>
