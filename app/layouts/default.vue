<template>
  <div class="min-h-dvh bg-paper text-ink">
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
