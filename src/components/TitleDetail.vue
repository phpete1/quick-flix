<template>
  <div class="flex flex-col space-y-2">
    <span
      class="border-slate-800 dark:border-slate-300 font-semibold text-slate-800 dark:text-slate-300 text-sm uppercase w-full"
      >{{ title }}</span
    >
    <span class="text-slate-900 dark:text-slate-100">
      <span v-if="!$slots.detail">
        {{ detail }}
      </span>
      <slot v-else name="detail"></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "TitleDetail",
  props: {
    title: String,
    detail: String,
  },
};
</script>
