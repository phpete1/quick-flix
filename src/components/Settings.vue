<template>
  <Teleport to="body">
    <div
      class="fixed top-0 bottom-0 left-0 right-0 p-4"
      v-show="isOpen"
    >
      <div class="fixed top-0 bottom-0 left-0 right-0 bg-slate-950 h-full opacity-75 w-full z-10"></div>

      <div class="flex justify-center items-center relative w-full h-full z-20">
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
              <div class="col-start-9">Setting</div>
            </div>
            <div class="grid grid-cols-12">
              <div class="col-span-3 flex flex-col space-y-2">
                <span class="font-semibold">Theme</span>
              </div>
              <div class="col-start-9">Setting</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: "Settings",
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
};
</script>
