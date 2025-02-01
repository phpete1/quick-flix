<template>
  <div class="bg-slate-100 dark:bg-slate-950 flex flex-col h-screen p-8 md:p-8">
    <Header class="flex-none z-10" />
    <div class="flex-1 flex items-center justify-center overflow-auto">
      <router-view />
    </div>
    <Footer class="flex-none z-10" />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

import { useConfigStore } from './stores/ConfigStore';

export default {
  name: 'Quickflix',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      configStore: useConfigStore(),
    };
  },
  created() {
    this.applyTheme(this.configStore.theme);
  },
  methods: {
    applyTheme(theme) {
      const htmlElement = document.documentElement;
      const browserTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : '';
      const selectedTheme =
        theme === 'auto' ? browserTheme : theme;

      if (selectedTheme === 'dark') {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
    },
  },
  watch: {
    'configStore.theme'(theme) {
      this.applyTheme(theme);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
