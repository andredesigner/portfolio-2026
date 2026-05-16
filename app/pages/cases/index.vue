<template>
  <section class="cases-index">
    <div class="site-container">
      <SectionTitle title="Projetos" />
      <ProjectCard
        v-for="project in projects"
        :key="project.uid"
        :project="project"
        theme="light"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { projects } from '~/utils/portfolioContent'

const { setPageSeo } = usePageSeo()

setPageSeo({
  title: 'Cases | André Oliveira',
  description: 'Projetos selecionados de UX/UI Design e Brand Design.'
})
</script>

<style scoped>
.cases-index {
  min-height: 100dvh;
  padding-block: 80px;
}
</style>
