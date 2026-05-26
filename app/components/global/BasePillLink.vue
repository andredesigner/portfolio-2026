<template>
  <component
    :is="tag"
    :href="isAnchor ? href : undefined"
    :to="!isAnchor ? href : undefined"
    :target="isExternal && externalTarget === '_blank' ? '_blank' : undefined"
    :rel="isExternal && externalTarget === '_blank' ? 'noopener noreferrer' : undefined"
    class="pill-link"
    :class="[
      `pill-link--${variant}`,
      `pill-link--${size}`
    ]"
  >
    <span>{{ label }}</span>
  </component>
</template>

<script setup lang="ts">
import { isExternalHref, isNativeHref } from '~/utils/linkTarget'

const props = withDefaults(defineProps<{
  label: string
  href?: string
  variant?: 'default' | 'outline' | 'green' | 'solid' | 'dark' | 'paper'
  size?: 'default' | 'large' | 'circle'
  externalTarget?: '_self' | '_blank'
}>(), {
  href: '#',
  variant: 'default',
  size: 'default',
  externalTarget: '_self'
})

const isAnchor = computed(() => isNativeHref(props.href))
const isExternal = computed(() => isExternalHref(props.href))
const tag = computed(() => isAnchor.value ? 'a' : resolveComponent('NuxtLink'))
</script>

<style scoped>
.pill-link {
  display: inline-flex;
  min-height: 56px;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  border-radius: 999px;
  color: rgb(var(--color-accent));
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
  transition: transform 260ms var(--ease-brand), background-color 260ms var(--ease-brand), color 260ms var(--ease-brand);
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
  background: rgb(var(--color-accent));
  border: 4px solid rgb(var(--color-accent));
  color: rgb(var(--color-paper));
}

.pill-link--solid {
  width: 88px;
  height: 88px;
  padding: 16px;
  background: rgb(var(--color-accent));
  color: rgb(var(--color-paper));
  text-align: center;
}

.pill-link--dark {
  background: rgb(var(--color-ink));
  color: rgb(var(--color-paper));
}

.pill-link--paper {
  background: rgb(var(--color-paper));
  color: rgb(var(--color-ink));
}

.pill-link--large {
  min-height: 112px;
  padding: 32px;
}

.pill-link--circle {
  width: 91px;
  height: 91px;
  min-height: 91px;
  padding: 24px;
  text-align: center;
}

</style>
