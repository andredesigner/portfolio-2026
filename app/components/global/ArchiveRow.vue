<template>
  <section class="archive-row pr-pl-12" aria-label="Arquivo de projetos">
    <ProjectRow
      :project="archiveProject"
      kind="archive"
      :show-number="false"
    />
  </section>
</template>

<script setup lang="ts">
import type { ProjectSummary } from '~/utils/portfolioContent'

const props = defineProps<{
  project?: ProjectSummary
}>()

const archiveProject = computed<ProjectSummary>(() => props.project ?? {
  uid: 'arquivo',
  client: '',
  year: '2017 - 2026',
  title: 'Arquivo',
  summary: ''
})
</script>
