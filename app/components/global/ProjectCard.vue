<template>
  <component
    :is="tag"
    class="project-card"
    :class="{ 'project-card--bounded': bounded }"
    :style="cardOffsetStyle"
    :to="isLinked ? to : undefined"
  >
    <p class="project-card__number type-big">{{ number }}</p>
    <div class="project-card__content">
      <div class="project-card__meta">
        <p v-if="project.client" class="type-label">{{ project.client }}</p>
        <p class="type-big">{{ project.year }}</p>
      </div>
      <h3 class="project-card__title type-h2">{{ project.title }}</h3>
    </div>
  </component>
</template>

<script setup lang="ts">
import type { ProjectSummary } from '~/utils/portfolioContent'

const props = withDefaults(defineProps<{
  project: ProjectSummary
  bounded?: boolean
  index?: number
  theme?: 'dark' | 'light' | 'accent'
}>(), {
  bounded: false,
  index: 0,
  theme: 'light'
})

const isLinked = computed(() => Boolean(props.project.casePath))
const tag = computed(() => isLinked.value ? resolveComponent('NuxtLink') : 'article')
const to = computed(() => props.project.casePath)
const number = computed(() => String(props.index + 1).padStart(2, '0'))
const cardOffsetStyle = computed(() => `--project-card-offset: ${props.index * 64}px`)
</script>

<style scoped>
.project-card {
  width: 100%;
  display: grid;
  grid-template-columns: 197px minmax(0, 654px);
  gap: 32px;
  align-items: center;
  min-width: 0;
  padding-block: 40px;
  border-bottom: 1px solid rgb(var(--color-line));
  color: rgb(var(--color-ink));
  position: sticky;
  top: var(--project-card-offset, 0);
  background: rgb(var(--color-paper));
}

.project-card:last-child {
  border-bottom: none;
}

.project-card--bounded {
  border-bottom-color: rgb(var(--color-line));
}

.project-card__number {
  align-self: stretch;
}

.project-card__content {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-end;
  gap: 32px;
}

.project-card__meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.project-card__title {
  min-width: 0;
  color: rgb(var(--color-ink));
  text-transform: uppercase;
}

@media (max-width: 1100px) {
  .project-card {
    grid-template-columns: 1fr;
    gap: 24px;
    align-items: start;
    padding-block: 32px;
    max-width: 350px;
  }

  .project-card__meta {
    gap: 4px;
  }

  .project-card__content {
    gap: 24px;
  }
}
</style>
