<template>
  <div v-if="providers.length > 0"  class="flex flex-col space-y-2">
    <h4 class="text-2xl text-slate-100">{{ heading }}</h4>
    <div class="grid grid-flow-col space-x-2">
      <div v-for="provider in providers" v-key="provider.provider_id">
        <img :src="provider.logo_url" class="w-10 rounded-lg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TitleProviders",
  props: {
    heading: String,
    types: Array,
    title_id: String
  },
  data() {
    return {
        providers: {}
    }
  },
  methods: {
    async fetchWatch() {
      const url = `https://api.themoviedb.org/3/movie/${this.title_id}/watch/providers`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            `Bearer ${process.env.VUE_APP_TMDB_BEARER_TOKEN}`,
        },
      };

      console.log(process.env.VUE_APP_TMDB_BEARER_TOKEN);

      const response = await fetch(url, options);
      const data = await response.json();

      return data.results.GB;
    }
  },
  async created() {
    let providers = await this.fetchWatch();
    
    providers = this.types.flatMap(type => providers?.[type] || []);

    this.providers = providers
      .map((provider) => ({
        ...provider,
        logo_url: provider.logo_path
          ? `https://image.tmdb.org/t/p/original/${provider.logo_path}`
          : "",
      }))
      .filter(
        (provider, index, array) =>
          array.findIndex((p) => p.provider_id === provider.provider_id) ===
          index
      );
  }
};
</script>
