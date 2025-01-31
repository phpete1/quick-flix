<template>
  <Teleport to="body">
    <div class="fixed top-0 bottom-0 left-0 right-0 p-4 z-100" v-show="isOpen">
      <div
        class="fixed top-0 bottom-0 left-0 right-0 bg-slate-950 h-full opacity-75 w-full"
      ></div>

      <div class="flex justify-center items-center relative w-full h-full">
        <div class="bg-slate-50 flex flex-col rounded w-full md:w-3/4 lg:w-1/2">
          <div
            class="border-b border-slate-300 flex flex-row justify-between items-center p-4"
          >
            <h2 class="text-xl text-slate-950">Settings</h2>
            <i class="fa-solid fa-xmark cursor-pointer" @click="closeModal"></i>
          </div>
          <div class="p-4 space-y-4">
            <div class="grid grid-cols-12">
              <div class="col-span-3 flex flex-col space-y-2">
                <span class="font-semibold">Region</span>
                <span class="text-sm italic text-slate-600"
                  >Used to determine where to stream or buy content.</span
                >
              </div>
              <div class="col-span-4 col-start-9">
                <select
                  class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg block w-full p-2.5"
                  name="country"
                  v-model="selectedRegion"
                  @change="updateSetting('region', selectedRegion)"
                >
                  <option>Choose a country</option>
                  <option v-for="country in countries" :value="country.code" :key="country.code">{{ country.name }}</option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-12">
              <div class="col-span-3 flex flex-col space-y-2">
                <span class="font-semibold">Theme</span>
              </div>
              <div class="col-span-4 col-start-9">
                <select
                  class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg block w-full p-2.5"
                  name="theme"
                  v-model="selectedTheme"
                  @change="updateSetting('theme', selectedTheme)"
                >
                  <option>Choose a theme</option>
                  <option value="auto">Auto</option>
                  <option class="dark" value="dark">Dark</option>
                  <option class="light"value="light">Light</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { countries } from '@/utils/Countries';
export default {
  name: "Settings",
  data(){
    return {
        countries,
        region: this.$settings.get('region'),
        theme: this.$settings.get('theme'),
        selectedRegion: this.$settings.get('region'),
        selectedTheme: this.$settings.get('theme'),
    }
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["close"],
  methods: {
    closeModal() {
      this.$emit("close");
    },
    updateSetting(key, value) {
        this.$settings.set(key, value);
    }
  }
};
</script>
