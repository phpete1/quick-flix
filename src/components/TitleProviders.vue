<template>
  <div v-if="providers.length > 0"  class="flex flex-col space-y-2">
    <h4 class="text-2xl tex-slate-900 dark:text-slate-100">{{ heading }}</h4>
    <div class="grid grid-flow-col grid-cols-12">
      <div v-for="provider in providers" v-key="provider.provider_id" class="pr-2">
        <img :src="provider.logo_url" class="w-8 rounded-lg" />
      </div>
    </div>
  </div>
</template>

<script>
import Tmdb from '@/utils/Tmdb';

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
  async created() {
    const tmdb = new Tmdb();
    this.providers = await tmdb.getProviders(this.title_id, this.types);
  }
};
</script>
