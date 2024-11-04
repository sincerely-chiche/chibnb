<template>
  <div class="fixed w-full bg-white z-10 shadow-sm">
    <div class="py-4 border-b-[1px]">
      <AppContainer>
        <div class="flex items-center justify-between gap-3 md:gap-0">
          <!-- Logo -->
          <NavbarLogo />

          <!-- Search -->
          <NavbarSearch />

          <!-- User menu -->
          <NavbarUserMenu />
        </div>
      </AppContainer>
    </div>
    <NavbarCategories />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
