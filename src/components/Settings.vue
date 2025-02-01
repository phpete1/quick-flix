<template>
  <Teleport to="body">
    <div class="fixed top-0 bottom-0 left-0 right-0 p-4 z-20" v-show="isOpen">
      <div
        class="bg-slate-50 fixed top-0 bottom-0 left-0 right-0 h-full opacity-75 w-full dark:bg-slate-950"
      ></div>

      <div class="flex justify-center items-center relative w-full h-full">
        <div
          class="bg-slate-100 border-slate-200 border flex flex-col rounded-lg w-full md:w-3/4 lg:w-1/2 2xl:w-1/3 dark:bg-slate-800 dark:border-slate-700 "
        >
          <div
            class="border-b border-slate-200 flex flex-row justify-between items-center p-4 dark:border-slate-700"
          >
            <h2 class="text-xl text-slate-900 dark:text-slate-100">Settings</h2>
            <i
              class="fa-solid fa-xmark cursor-pointer text-slate-600 dark:text-slate-400"
              @click="closeModal"
            ></i>
          </div>
          <div class="p-4 space-y-4">
            <div class="grid grid-cols-12">
              <div class="col-span-8 flex flex-col">
                <span class="font-semibold text-slate-900 dark:text-slate-100">Region</span>
                <span class="text-sm italic text-slate-600 dark:text-slate-400"
                  >Used to determine where to stream or buy content.</span
                >
              </div>
              <div class="col-span-4">
                <select
                  class="bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 cursor-pointer text-slate-950 dark:text-slate-50 text-sm rounded-lg block w-full p-2.5"
                  name="country"
                  v-model="selectedRegion"
                  @change="configStore.setConfig('region', selectedRegion)"
                >
                  <option>Choose a country</option>
                  <option
                    v-for="country in countries"
                    :value="country.code"
                    :key="country.code"
                  >
                    {{ country.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-12">
              <div class="col-span-3 flex flex-col space-y-2">
                <span class="font-semibold text-slate-100">Theme</span>
              </div>
              <div class="col-span-4 col-start-9">
                <select
                  class="bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 cursor-pointer text-slate-950 dark:text-slate-50 text-sm rounded-lg block w-full p-2.5"
                  name="theme"
                  v-model="selectedTheme"
                  @change="configStore.setConfig('theme', selectedTheme)"
                >
                  <option>Choose a theme</option>
                  <option value="auto">Auto</option>
                  <option class="dark" value="dark">Dark</option>
                  <option class="light" value="light">Light</option>
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
import { useConfigStore } from "@/stores/ConfigStore";
import { countries } from "@/utils/Countries";
export default {
  name: "Settings",
  data() {
    return {
      countries,
    };
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
  },
  setup() {
    const configStore = useConfigStore();

    const selectedRegion = configStore.region;
    const selectedTheme = configStore.theme;

    return { configStore, selectedRegion, selectedTheme };
  },
};
</script>
