<template>
  <!-- Loading Spinner or Placeholder -->
  <div class="flex flex-col space-y-32 z-10">
    <div class="flex flex-row gap-8 text-left lg:w-256 w-full">
      <div class="hidden md:block w-fit">
        <img class="rounded-lg w-64" :src="title.poster_url" />
      </div>
      <div class="flex flex-col items-start space-y-4 flex-1">
        <TitleOverview :title="title" v-if="Object.keys(title).length && !facts" />
        <TitleFacts :title="title" v-if="Object.keys(title).length && facts" />
      </div>
    </div>
  </div>

  <div
    v-if="title.backdrop_url"
    class="absolute top-0 bottom-0 left-0 right-0 bg-slate-200 dark:bg-slate-950"
  >
    <img
      :src="title.backdrop_url"
      class="object-cover w-full h-full opacity-20 dark:opacity-10"
    />
  </div>
</template>

<script>
import TitleFacts from '@/components/TitleFacts.vue';
import TitleOverview from '@/components/TitleOverview.vue';

import Tmdb from '@/utils/Tmdb';

export default {
  name: 'TitleView',
  components: {
    TitleOverview,
    TitleFacts
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  data() {
    return {
      title: {},
      facts: true
    };
  },
  async created() {
    const tmdb = new Tmdb();
    this.title = await tmdb.getTitle('movie', this.id);
  },
};
</script>
