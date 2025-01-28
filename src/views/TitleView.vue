<template>
  <!-- Loading Spinner or Placeholder -->
  <div v-if="loading" class="loading-spinner">Loading...</div>
  <div class="flex flex-col space-y-32 w-3/5 z-10">
    <div class="grid grid-flow-col gap-8 text-left">
      <div>
        <img class="rounded-lg w-64" :src="title.poster_url" />
      </div>
      <div class="flex flex-col items-start justify-center space-y-4">
        <div>
          <h2 class="font-black text-4xl text-slate-50">{{ title.title }}</h2>
        </div>
        <p class="text-white line-clamp-2">{{ title.overview }}</p>
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

  <div class="absolute top-0 bottom-0 left-0 right-0 bg-slate-950">
    <img
      :src="title.backdrop_url"
      class="object-cover w-full h-full opacity-10"
    />
  </div>
</template>

<script>
import TitleProviders from "@/components/TitleProviders.vue";
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
  methods: {
    async fetchTitle() {
      const url = `https://api.themoviedb.org/3/movie/${this.id}?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            `Bearer ${process.env.VUE_APP_TMDB_BEARER_TOKEN}`,
        },
      };

      const response = await fetch(url, options);
      let data = await response.json();

      data.backdrop_url = data.backdrop_path
        ? `https://image.tmdb.org/t/p/original/${data.backdrop_path}`
        : "";
      data.poster_url = data.poster_path
        ? `https://image.tmdb.org/t/p/original/${data.poster_path}`
        : "";
      data.tagline =
        data.tagline && data.tagline.endsWith(".")
          ? data.tagline.slice(0, -1)
          : data.tagline;

      return data;
    },
  },
  async created() {
    this.title = await this.fetchTitle();
  },
};
</script>
