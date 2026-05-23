<template>
  <component
    :is="tag"
    :href="isAnchor ? href : undefined"
    :to="!isAnchor ? href : undefined"
    class="text-link"
  >{{ label }}
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  label: string
  href?: string
}>(), {
  href: '#'
})

const isAnchor = computed(() => props.href.startsWith('#') || props.href.startsWith('http') || props.href.startsWith('mailto:') || props.href.endsWith('.pdf'))
const tag = computed(() => isAnchor.value ? 'a' : resolveComponent('NuxtLink'))
</script>

<style scoped>
.text-link {
  display: inline-flex;
  gap: 4px;
  align-items: flex-end;
  color: rgb(var(--color-accent));
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
  position: relative;
  justify-self: start;
}

.text-link::after {
  content: "";
  margin-bottom: 6px;
  width: 4px;
  height: 4px;
  background-color: rgb(var(--color-line));
}
</style>
