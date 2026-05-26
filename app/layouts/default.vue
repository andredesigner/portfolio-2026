<template>
  <div class="app-shell">
    <TheHeader v-if="showGlobalHeader" />
    <main id="main-content" class="app-shell__main">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const showGlobalHeader = computed(() => route.path !== '/')
const motion = useMotion()
let cleanupPageMotion: (() => void) | undefined

const runPageMotion = async () => {
  cleanupPageMotion?.()
  await nextTick()
  cleanupPageMotion = await motion.initPageMotion(document)
}

onMounted(() => {
  runPageMotion()
})

onBeforeUnmount(() => {
  cleanupPageMotion?.()
})

watch(() => route.fullPath, () => {
  runPageMotion()
})
</script>

<style scoped>
.app-shell {
  isolation: isolate;
  min-height: 100dvh;
  background: rgb(var(--color-paper));
  color: rgb(var(--color-ink));
}

.app-shell__main {
  position: relative;
  z-index: 1;
  min-height: 100dvh;
  background: rgb(var(--color-paper));
}
</style>
