<template>
  <!-- Loading Spinner or Placeholder -->
  <div class="flex flex-col space-y-32 z-10">
    <div class="grid grid-flow-col gap-8 text-left lg:max-w-256 w-full">
      <div class="hidden md:block">
        <img class="rounded-lg w-64" :src="title.poster_url" />
      </div>
      <div class="flex flex-col items-start space-y-4">
        <div>
          <h2 class="font-black text-4xl text-slate-950 dark:text-slate-50">{{ title.title }}</h2>
          <div class="flex flex-row space-x-4">
            <span class="text-slate-950 dark:text-slate-50">{{ title.release_year }}</span>
            <div class="space-x-2">
              <i class="fa-solid fa-star text-yellow-500"></i>
              <span class="text-slate-900 dark:text-slate-100">{{ title.vote_average_percentage }}</span>
            </div>
          </div>
        </div>
        <p class="text-slate-900 dark:text-slate-100 line-clamp-2">{{ title.overview }}</p>
        <TitleProviders
          heading="Stream"
          :types="['flatrate', 'free']"
          :title_id="id"
        />
        <TitleProviders
          heading="Buy / Rent"
          :types="['buy', 'rent']"
          :title_id="id"
        />
      </div>
    </div>
  </div>

  <div
    v-if="title.backdrop_url"
    class="absolute top-0 bottom-0 left-0 right-0 bg-slate-50 dark:bg-slate-950"
  >
    <img
      :src="title.backdrop_url"
      class="object-cover w-full h-full opacity-10"
    />
  </div>
</template>

<script>
import TitleProviders from "@/components/TitleProviders.vue";

import Tmdb from "@/utils/Tmdb";

export default {
  name: "TitleView",
  components: {
    TitleProviders,
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  data() {
    return {
      title: {},
      stream: {},
      buyRent: {},
    };
  },
  async created() {
    const tmdb = new Tmdb();
    this.title = await tmdb.getTitle("movie", this.id);
    console.log(this.title);
  },
};
</script>
