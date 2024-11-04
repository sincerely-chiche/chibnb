<template>
  <Dialog :open="isModalVisible" @update:open="$emit('onClose')">
    <DialogTrigger> Edit Profile </DialogTrigger>
    <DialogContent>
      <DialogHeader class="flex flex-col justify-center items-center">
        <DialogTitle v-if="title" class="">{{ title }}</DialogTitle>
        <DialogDescription v-if="description">
          {{ description }}
        </DialogDescription>
      </DialogHeader>

      <slot />
    </DialogContent>
  </Dialog>
</template>

<script setup>
const props = defineProps({
  isOpen: Boolean,
  title: String,
  description: String,
});

const emit = defineEmits(["onClose"]);

const isModalVisible = computed({
  get() {
    return props.isOpen;
  },
  set(val) {
    emit("onClose");
  },
});
</script>

<style lang="scss" scoped></style>
