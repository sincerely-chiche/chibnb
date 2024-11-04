<template>
  <div>
    <!-- Nav bar -->
    <Navbar></Navbar>

    <div class="pb-20 pt-[220px]">
      <slot />
    </div>

    <AuthRegister />
    <AuthLogin />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
