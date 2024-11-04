<template>
  <AppContainer>
    <div class="pt-4 flex items-center justify-between overflow-x-auto">
      <NavbarCategory
        v-for="item in categories"
        :key="item.label"
        :label="item.label"
        :icon="item.icon"
        :selected="category === item.label"
      ></NavbarCategory>
    </div>
  </AppContainer>
</template>

<script setup>
import { categories } from "@/utils";

const category = computed(() => useRoute().query.category);
</script>

<style lang="scss" scoped></style>
