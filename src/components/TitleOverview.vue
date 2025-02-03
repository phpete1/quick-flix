<template>
  <div>
    <h2 class="font-black text-4xl text-slate-950 dark:text-slate-50">
      {{ title.title }}
    </h2>
    <div class="flex flex-row space-x-4">
      <span class="text-slate-950 dark:text-slate-50">{{
        title.release_year
      }}</span>
      <div class="space-x-2">
        <i class="fa-solid fa-star text-yellow-500"></i>
        <span class="text-slate-900 dark:text-slate-100">{{
          title.vote_average_percentage
        }}</span>
      </div>
    </div>
  </div>
  <p class="text-slate-900 dark:text-slate-100 line-clamp-2">
    {{ title.overview }}
  </p>
  <TitleProviders
    heading="Stream"
    :types="['flatrate', 'free']"
    :title_id="title.id"
  />
  <TitleProviders
    heading="Buy / Rent"
    :types="['buy', 'rent']"
    :title_id="title.id"
  />
</template>

<script>
import TitleProviders from './TitleProviders.vue';

export default {
    name: 'TitleOverview',
    props: {
        title: Object
    },
    components: {
        TitleProviders
    }
}
</script>