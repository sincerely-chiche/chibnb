<template>
  <div class="flex flex-row items-center justify-between">
    <div class="flex flex-col">
      <div class="font-medium">{{ title }}</div>
      <div class="font-light text-gray-600">{{ subtitle }}</div>
    </div>
    <div class="flex flex-row items-center gap-4">
      <div
        @click="onReduce"
        class="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition-all"
      >
        <Icon name="mi:remove" />
      </div>
      <div class="font-light text-xl text-neutral-600">{{ value }}</div>
      <div
        @click="onAdd"
        class="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition-all"
      >
        <Icon name="mi:add" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: String,
  subtitle: String,
  value: {
    type: Number,
    default: () => 1,
  },
});

const emits = defineEmits(["change"]);

function onAdd() {
  console.log("increasing", props.value + 1);

  emits("change", props.value + 1);
}
function onReduce() {
  if (props.value === 1) {
    return;
  }
  emits("change", props.value - 1);
}
</script>

<style></style>
