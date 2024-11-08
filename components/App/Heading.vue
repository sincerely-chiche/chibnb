<template>
  <div :class="[center ? 'text-center' : 'text-left']">
    <div class="text-2xl font-bold">
      {{ title }}
    </div>
    <div class="font-light text-neutral-500 mt-2">
      {{ subtitle }}
    </div>
  </div>
</template>

<script lang="ts" setup>
interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

defineProps<HeadingProps>();
</script>

<style></style>
