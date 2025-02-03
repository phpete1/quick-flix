<template>
  <ul class="space-x-4 text-slate-900 dark:text-slate-50 text-lg">
    <li
      class="border-slate-900 dark:border-slate-100 cursor-pointer inline-block"
      :class="tab === 'details' ? ['font-semibold', 'border-b-2'] : ''"
      @click="switchTab('details')"
    >
      Details
    </li>
    <li
      class="border-slate-900 dark:border-slate-100 cursor-pointer inline-block"
      :class="tab === 'people' ? ['font-semibold', 'border-b-2'] : ''"
      @click="switchTab('people')"
    >
      Cast & Crew
    </li>
    <li
      class="border-slate-900 dark:border-slate-100 cursor-pointer inline-block"
      :class="tab === 'reviews' ? ['font-semibold', 'border-b-2'] : ''"
      @click="switchTab('reviews')"
    >
      Reviews
    </li>
  </ul>
  <div
    v-if="tab === 'details'"
    class="gap-8 lg:gap-16 grid grid-cols-1 lg:grid-cols-3 p-2 rounded relative w-full"
  >
    <TitleDetail title="Budget" :detail="budget_formatted" />
    <TitleDetail title="Certificate" :detail="certificate" />
    <TitleDetail title="Release Date" :detail="release_date" />
    <TitleDetail title="Production Companies">
      <template #detail>
        <ul>
          <li v-for="company in title.production_companies">
            {{ company.name }}
          </li>
        </ul>
      </template>
    </TitleDetail>
    <TitleDetail title="Countries">
      <template #detail>
        <ul v-if="title.production_countries.length > 0">
          <li v-for="country in title.production_countries">
            {{ country.name }}
          </li>
        </ul>
      </template>
    </TitleDetail>
    <TitleDetail title="Runtime" :detail="title.runtime_friendly" />
    <TitleDetail title="Status" :detail="title.status" />
  </div>

  <div v-if="tab === 'people'" class="flex flex-col space-y-4 h-64">
    <h4 class="font-semibold dark:text-slate-100 text-2xl">Cast</h4>
    <div class="gap-12 grid grid-cols-3 lg:grid-cols-4">
      <div v-for="person in people.cast" class="flex flex-col space-y-2">
        <img
          :src="person.profile_url"
          class="aspect-square object-cover object-[50%_15%] w-full rounded-3xl"
        />
        <div class="flex flex-col">
          <span class="font-semibold text-slate-100">{{ person.name }}</span>
          <span class="text-slate-400">{{ person.character }}</span>
        </div>
      </div>
    </div>

    <h4 class="font-semibold dark:text-slate-100 text-2xl">Crew</h4>
    <template v-for="job in people.crew_grouped">
      <h5 class="font-semibold dark:text-slate-100 text-lg">{{ job.name }}</h5>
      <div class="gap-12 grid grid-cols-3 lg:grid-cols-4">
        <div v-for="person in job.crew" class="flex flex-col space-y-2">
          <img
            :src="person.profile_url"
            class="aspect-square object-cover object-[50%_15%] w-full rounded-3xl"
          />
          <div class="flex flex-col">
            <span class="font-semibold text-slate-100">{{ person.name }}</span>
            <span class="text-slate-400">{{ person.job }}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import TitleDetail from "./TitleDetail.vue";
import Tmdb from "@/utils/Tmdb";

export default {
  name: "TitleFacts",
  components: {
    TitleDetail,
  },
  data() {
    return {
      tab: "people",
      release_dates: null,
      people: {},
    };
  },
  props: {
    title: Object,
  },
  methods: {
    switchTab(tab) {
      this.tab = tab;
    },
  },
  computed: {
    budget_formatted() {
      return this.title.budget
        ? `$${this.title.budget.toLocaleString("en-US")}`
        : "N/A";
    },
    certificate() {
      return this.release_dates?.default_release_date?.certification || "N/A";
    },
    release_date() {
      return (
        this.release_dates?.default_release_date?.release_date_friendly || "N/A"
      );
    },
  },
  async created() {
    const tmdb = new Tmdb();

    this.release_dates = await tmdb.getReleaseDates(
      this.title.id,
      this.title.origin_country[0]
    );

    this.people = await tmdb.getPeople(this.title.id);
  },
};
</script>
