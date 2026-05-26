<template>
  <div class="home-page">
    <section
      class="home-hero figma-edge"
      aria-labelledby="home-title"
      data-motion-delay="0.1"
      data-motion-duration="0.9"
    >
      <div class="home-hero__container figma-container">
        <TheHeader
          context="UX Designer"
          action-label="Sobre"
          action-href="#about"
          symbol-behavior="hidden"
          variant="compact"
        />
        <div class="home-hero__statement">
          <h1 id="home-title" class="type-h1" data-motion="reveal">
            Visão sistêmica e execução high-end para experiências digitais.
          </h1>
        </div>
      </div>
    </section>

    <section class="home-projects pr-pl-12" id="projects">
      <div
        class="home-projects__list"
        data-motion="group"
        data-motion-group
        data-motion-delay="0.15"
        data-motion-duration="0.9"
        data-motion-stagger="0.32"
      >
        <ProjectRow
          v-for="(project, index) in displayedProjects"
          :key="project.uid"
          :project="project"
          :index="index"
        />
      </div>
    </section>

    <AboutSection />

    <ArchiveRow v-if="archiveProject" :project="archiveProject" />
  </div>
</template>

<script setup lang="ts">
import { projects } from '~/utils/portfolioContent'

const { setPageSeo } = usePageSeo()
const displayedProjects = computed(() => projects.filter((project) => project.uid !== 'arquivo').slice(0, 3))
const archiveProject = computed(() => projects.find((project) => project.uid === 'arquivo'))

setPageSeo({
  title: 'André Oliveira Portfolio',
  description: 'Portfólio de UX/UI Design e Brand Design com foco em craft visual, estratégia e interação.'
})
</script>

<style scoped>
.home-page {
  background: rgb(var(--color-paper));
  display: flex;
  flex-direction: column;
}

.home-hero {
  background: rgb(var(--color-paper));
}

.home-hero__container {
  display: flex;
  flex-direction: column;
}

.home-hero__statement {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 64px;
  padding-bottom: 96px;
}

.home-projects {
  border-top: 1px solid rgb(var(--color-line));
  background: rgb(var(--color-paper));
}

.home-projects__list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (max-width: 1100px) {
  .home-hero__statement {
    padding-top: 64px;
    padding-bottom: 64px;
  }
}
</style>
