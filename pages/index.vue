<template>
  <div>Welcome home</div>
  <pre>
  {{ user }}
  </pre>

  <form @submit.prevent="logout">
    <Button :variant="'primary'">Sign out</Button>
  </form>
</template>

<script setup>
const user = useUser();
definePageMeta({
  middleware: "protect",
});

async function logout() {
  await $fetch("/api/logout", {
    method: "POST",
  });
  user.value = null;
  await navigateTo("/login");
}
</script>

<style lang="scss" scoped></style>
