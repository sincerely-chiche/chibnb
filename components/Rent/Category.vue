<template>
  <div
    class="rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition-all cursor-pointer"
    :class="{ 'border-black': selected, 'border-neutral-200': !selected }"
  >
    <Icon :name="icon" size="30" />
    <div class="font-semibold">{{ label }}</div>
  </div>
</template>

<script lang="ts" setup>
interface CategoryBoxProps {
  icon: string;
  label: string;
  selected?: boolean;
}

const props = defineProps<CategoryBoxProps>();
</script>

<style></style>
