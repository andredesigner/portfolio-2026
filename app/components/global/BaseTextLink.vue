<template>
  <component
    :is="tag"
    :href="isAnchor ? href : undefined"
    :to="!isAnchor ? href : undefined"
    :target="isExternal && externalTarget === '_blank' ? '_blank' : undefined"
    :rel="isExternal && externalTarget === '_blank' ? 'noopener noreferrer' : undefined"
    class="text-link"
    :class="[
      `text-link--${tone}`,
      `text-link--${size}`,
      { 'text-link--no-dot': !showDot }
    ]"
  >{{ label }}
  </component>
</template>

<script setup lang="ts">
import { isExternalHref, isNativeHref } from '~/utils/linkTarget'

const props = withDefaults(defineProps<{
  label: string
  href?: string
  tone?: 'accent' | 'ink' | 'paper'
  size?: 'label' | 'big'
  showDot?: boolean
  externalTarget?: '_self' | '_blank'
}>(), {
  href: '#',
  tone: 'accent',
  size: 'label',
  showDot: true,
  externalTarget: '_self'
})

const isAnchor = computed(() => isNativeHref(props.href))
const isExternal = computed(() => isExternalHref(props.href))
const tag = computed(() => isAnchor.value ? 'a' : resolveComponent('NuxtLink'))
</script>

<style scoped>
.text-link {
  display: inline-flex;
  gap: 4px;
  align-items: flex-end;
  color: rgb(var(--color-accent));
  font-weight: 500;
  position: relative;
  justify-self: start;
  text-transform: uppercase;
}

.text-link--label {
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 1.6px;
}

.text-link--big {
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0;
}

.text-link--accent {
  color: rgb(var(--color-accent));
}

.text-link--ink {
  color: rgb(var(--color-ink));
}

.text-link--paper {
  color: rgb(var(--color-paper));
}

.text-link::after {
  content: "";
  margin-bottom: 6px;
  width: 4px;
  height: 4px;
  background-color: rgb(var(--color-line));
}

.text-link--paper::after {
  background-color: rgb(var(--color-paper));
}

.text-link--no-dot::after {
  content: none;
}
</style>
