<template>
  <div
    class="flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-primary transition-all cursor-pointer"
    :class="[
      selected
        ? 'border-b-primary text-primary'
        : 'text-neutral-500 border-transparent',
    ]"
  >
    <Icon :name="icon" size="26" />
    <div class="font-medium text-sm">{{ label }}</div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  icon: String,
  label: String,
  selected: {
    type: Boolean,
    required: false,
  },
});
</script>

<style></style>
