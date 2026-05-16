<template>
  <NuxtLink class="brand-logo" to="/" aria-label="André Oliveira">
    <img :src="logoSrc" alt="André Oliveira" width="584" height="72">
  </NuxtLink>
</template>

<script setup lang="ts">
const logoSrc = '/figma/logo-andreo.svg'
</script>

<style scoped>
.brand-logo {
  display: block;
  width: min(584px, 100%);
}

.brand-logo img {
  width: 100%;
  height: auto;
}
</style>
