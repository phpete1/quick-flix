<template>
    <nav class="text-black dark:text-white">
      <router-link to="/about">About</router-link>
    </nav>

    <i class="fa-solid fa-gear absolute cursor-pointer bottom-4 right-4 text-slate-500" @click="showSettings = true"></i>
    <Settings :isOpen="showSettings" @close="showSettings = false" />
</template>

<script>
import Settings from './Settings.vue';

export default {
    name: 'Footer',
    components: {
      Settings
    },
    data (){
      return {
        showSettings: false
      }
    }
}
</script>