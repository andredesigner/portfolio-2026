<template>
  <component
    :is="tag"
    class="project-row"
    :class="[
      `project-row--${kind}`,
      `project-row--${layout}`
    ]"
    :to="isNuxtLink ? href : undefined"
    :href="isAnchor ? href : undefined"
    :aria-label="isLinked ? `Abrir projeto ${project.client || project.title}` : undefined"
    data-motion="reveal"
    data-motion-item
    data-motion-duration="0.9"
  >
    <div class="project-row__inner">
      <div class="project-row__meta">
        <p v-if="showNumber" class="project-row__number type-label">
          {{ number }}
        </p>
        <div class="project-row__details type-label">
          <p>{{ project.year }}</p>
          <p v-if="project.client" class="project-row__client">
            {{ project.client }}
          </p>
        </div>
      </div>
      <h3 class="project-row__title type-project-title">
        {{ project.title }}
      </h3>
    </div>
  </component>
</template>

<script setup lang="ts">
import type { ProjectSummary } from '~/utils/portfolioContent'
import { isNativeHref } from '~/utils/linkTarget'

const props = withDefaults(defineProps<{
  project: ProjectSummary
  index?: number
  kind?: 'project' | 'archive'
  layout?: 'full' | 'contained'
  showNumber?: boolean
}>(), {
  index: 0,
  kind: 'project',
  layout: 'full',
  showNumber: true
})

const href = computed(() => props.project.casePath || '')
const isLinked = computed(() => Boolean(href.value))
const isAnchor = computed(() => isLinked.value && isNativeHref(href.value))
const isNuxtLink = computed(() => isLinked.value && !isAnchor.value)
const tag = computed(() => {
  if (isAnchor.value) {
    return 'a'
  }

  return isNuxtLink.value ? resolveComponent('NuxtLink') : 'article'
})
const number = computed(() => String(props.index + 1).padStart(2, '0'))
</script>

<style scoped>
.project-row {
  display: block;
  width: 100%;
  padding-inline: var(--space-edge);
  border-bottom: 1px solid rgb(var(--color-line) / 0.18);
  background: rgb(var(--color-paper));
  color: rgb(var(--color-ink));
}

.project-row__inner {
  display: grid;
  width: min(100%, var(--content-home));
  grid-template-columns: var(--project-meta-width) minmax(0, 1fr);
  align-items: end;
  margin-inline: auto;
  padding-block: 32px;
  border-bottom: 1px solid rgb(var(--color-line));
}

.project-row--contained {
  padding-inline: 0;
  border-bottom: 0;
}

.project-row--contained .project-row__inner {
  width: 100%;
}

.project-row__meta {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%
}

.project-row__details {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  height: 100%;
  align-items: end;
}

.project-row__client {
  width: 90px;
}

.project-row__title {
  min-width: 0;
}

@media (max-width: 1100px) {
  .project-row {
    overflow: hidden;
  }

  .project-row__inner {
    width: calc(100vw - (var(--space-edge) * 2) - var(--project-mobile-offset));
    max-width: 366px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
    margin-inline: 0;
    margin-left: var(--project-mobile-offset);
    padding-top: 32px;
    padding-bottom: 64px;
  }

  .project-row--contained .project-row__inner {
    width: 100%;
    max-width: none;
    margin-left: 0;
  }

  .project-row__meta {
    min-height: auto;
    gap: 32px;
  }

  .project-row__details {
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }

  .project-row__client {
    width: 90px;
    text-align: left;
  }
}
</style>
