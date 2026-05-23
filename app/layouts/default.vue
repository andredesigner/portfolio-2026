<template>
  <div class="app-shell">
    <TheHeader v-if="showGlobalHeader" />
    <main id="main-content">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const showGlobalHeader = computed(() => route.path !== '/')
</script>

<style scoped>
.app-shell {
  min-height: 100dvh;
  background: rgb(var(--color-paper));
  color: rgb(var(--color-ink));
}
</style>
