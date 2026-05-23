<template>
  <component
    :is="tag"
    class="project-card"
    :class="{ 'project-card--bounded': bounded }"
    :to="isLinked ? to : undefined"
  >
    <div class="project-card__meta">
      <p class="type-big">{{ number }}</p>
      <div>
        <p v-if="project.client" class="type-label">{{ project.client }}</p>
        <p class="type-big">{{ project.year }}</p>
      </div>
    </div>
    <h3 class="project-card__title type-h2">{{ project.title }}</h3>
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

const isLinked = computed(() => props.project.uid !== 'arquivo')
const tag = computed(() => isLinked.value ? resolveComponent('NuxtLink') : 'article')
const to = computed(() => `/cases/${props.project.uid}`)
const number = computed(() => String(props.index + 1).padStart(2, '0'))
</script>

<style scoped>
.project-card {
  width: 100%;
  display: flex;
  gap: 32px;
  align-items: end;
  min-width: 0;
  padding-block: 40px;
  border-bottom: 1px solid rgb(var(--color-line));
  color: rgb(var(--color-ink));
}

.project-card:last-child {
  border-bottom: none;
}

.project-card--bounded {
  border-bottom-color: rgb(var(--color-line));
}

.project-card__meta {
  flex: 0 0 197px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 128px;
}

.project-card__title {
  flex: 1 1 auto;
  min-width: 0;
  color: rgb(var(--color-ink));
}

.type-big {
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
}

@media (max-width: 1100px) {
  .project-card {
    flex-direction: column;
    gap: 24px;
    align-items: start;
    padding-block: 32px;
    max-width: 350px;
  }

  .project-card__meta {
    flex-basis: auto;
    min-height: auto;
    gap: 24px;
  }
}
</style>
