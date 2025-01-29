<template>
  <div class="bg-slate-950 flex flex-col h-screen p-8 md:p-8">
    <Header class="flex-none z-10" />
    <div class="flex-1 flex items-center justify-center overflow-auto">
      <router-view />
    </div>
    <Footer class="flex-none z-10" />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Quickflix',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
