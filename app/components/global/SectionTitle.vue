<template>
  <div class="section-title editorial-grid">
    <div class="section-title__inner">
      <h2 class="type-h2">{{ title }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped>
.section-title {
  width: 100%;
  padding-block: 64px;
}

.section-title__inner {
  grid-column: 2 / span 3;
  position: sticky;
  top: 60px;
  backdrop-filter: blur(16px);
}

@media (max-width: 900px) {
  .section-title {
    padding-block: 48px;
  }

  .section-title__inner {
    grid-column: 1;
  }
}
</style>
