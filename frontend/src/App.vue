<script>
import AppHeader from "@/components/header.vue";
export default {
  components: {
    AppHeader,
  },
};
</script>

<template>
  <AppHeader />
  <div class="container mt-3 mx-auto my-auto h-[80vh]">
    <router-view />
  </div>
</template>

<style></style>
