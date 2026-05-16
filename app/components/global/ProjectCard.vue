<template>
  <NuxtLink
    class="project-card editorial-grid"
    :class="[`project-card--${theme}`, { 'project-card--bounded': bounded }]"
    :to="to"
  >
    <div class="project-card__meta">
      <p v-if="project.client" class="type-label">{{ project.client }}</p>
      <p class="type-body">{{ project.year }}</p>
    </div>
    <h3 class="project-card__title type-h3">{{ project.title }}</h3>
    <p class="project-card__summary type-body">{{ project.summary }}</p>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { ProjectSummary } from '~/utils/portfolioContent'

const props = withDefaults(defineProps<{
  project: ProjectSummary
  theme?: 'dark' | 'light' | 'accent'
  bounded?: boolean
}>(), {
  theme: 'dark',
  bounded: false
})

const to = computed(() => props.project.uid === 'arquivo' ? '/cases' : `/cases/${props.project.uid}`)
</script>

<style scoped>
.project-card {
  width: 100%;
  align-items: end;
  padding-block: 80px;
  border-top: 1px solid currentColor;
  color: rgb(var(--color-paper));
}

.project-card--bounded {
  border-bottom: 1px solid currentColor;
}

.project-card--light {
  color: rgb(var(--color-ink));
}

.project-card--accent {
  color: rgb(var(--color-accent));
}

.project-card__meta {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.project-card__title {
  grid-column: span 2;
  max-width: 584px;
}

.project-card__summary {
  max-width: 276px;
}

@media (max-width: 900px) {
  .project-card {
    align-items: start;
    padding-block: 48px;
  }

  .project-card__title,
  .project-card__summary {
    grid-column: 1;
    max-width: none;
  }
}
</style>
