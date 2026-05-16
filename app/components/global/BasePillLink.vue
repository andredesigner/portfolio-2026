<template>
  <component
    :is="tag"
    :href="isAnchor ? href : undefined"
    :to="!isAnchor ? href : undefined"
    class="pill-link"
    :class="`pill-link--${variant}`"
  >
    <span v-if="variant === 'green'" class="pill-link__dot" />
    <span>{{ label }}</span>
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  label: string
  href?: string
  variant?: 'default' | 'outline' | 'green' | 'solid'
}>(), {
  href: '#',
  variant: 'default'
})

const isAnchor = computed(() => props.href.startsWith('http') || props.href.startsWith('mailto:') || props.href.endsWith('.pdf') || props.href.startsWith('#'))
const tag = computed(() => isAnchor.value ? 'a' : resolveComponent('NuxtLink'))
</script>

<style scoped>
.pill-link {
  display: inline-flex;
  min-height: 60px;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 16px 24px;
  border-radius: 999px;
  color: rgb(var(--color-accent));
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1), background-color 260ms cubic-bezier(0.22, 1, 0.36, 1);
}

.pill-link:hover {
  transform: translateY(-2px);
}

.pill-link--outline {
  width: 100%;
  border: 4px solid rgb(var(--color-accent));
  background: rgb(var(--color-paper));
}

.pill-link--green {
  width: 100%;
  background: rgb(var(--color-green));
  border: 4px solid rgb(var(--color-green));
}

.pill-link--solid {
  width: 88px;
  height: 88px;
  padding: 16px;
  background: rgb(var(--color-accent));
  color: rgb(var(--color-paper));
  text-align: center;
}

.pill-link__dot {
  width: 16px;
  height: 16px;
  background: rgb(var(--color-accent));
}
</style>
