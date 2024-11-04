<template>
  <div></div>
</template>
<script setup>
const { onOpen } = useLogin();

onMounted(() => {
  onOpen();
});
</script>
