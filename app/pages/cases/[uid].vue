<template>
  <article class="case-page">
    <section class="case-hero">
      <div class="site-container">
        <div class="case-hero__grid editorial-grid">
          <div class="case-hero__content">
            <h1 class="type-h1-display">{{ featuredCase.title }}</h1>
            <p class="type-big">{{ featuredCase.subtitle }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="case-content">
      <div class="site-container case-content__inner">
        <img class="case-image case-image--full" :src="projectHeroSrc" :alt="featuredCase.imageAlt">

        <div class="case-text editorial-grid">
          <div class="case-text__content">
            <h2 class="type-h3">{{ featuredCase.intro }}</h2>
            <div class="case-text__body type-big">
              <p>{{ featuredCase.body }}</p>
              <p>{{ featuredCase.secondBody }}</p>
            </div>
          </div>
        </div>

        <img class="case-image case-image--full" :src="projectHeroSrc" :alt="featuredCase.imageAlt">

        <div class="case-image-grid">
          <img class="case-image" :src="projectToteSrc" alt="Sacola com aplicação visual do projeto Onebox">
          <img class="case-image" :src="projectToteSrc" alt="Variação de sacola com aplicação visual do projeto Onebox">
        </div>

        <div class="case-note editorial-grid">
          <p class="type-big">
            Lorem ipsum dolor sit amet consectetur. Augue fringilla a mattis egestas. Sed ullamcorper lorem faucibus quisque nisi et. Molestie tempor eleifend cras posuere a consectetur donec. Tellus quam bibendum vestibulum mauris justo.
          </p>
        </div>

        <img class="case-image case-image--full" :src="projectHeroSrc" :alt="featuredCase.imageAlt">
      </div>
    </section>

    <section class="next-project">
      <div class="site-container">
        <SectionTitle title="Veja esse projeto" />
        <ProjectCard :project="nextProject" theme="accent" bounded />
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { featuredCase, projects } from '~/utils/portfolioContent'

const route = useRoute()
const projectHeroSrc = '/figma/project-hero.png'
const projectToteSrc = '/figma/project-tote.png'
const { setPageSeo } = usePageSeo()
const currentProjectIndex = computed(() => projects.findIndex((project) => project.uid === route.params.uid))
const nextProject = computed(() => {
  const nextIndex = currentProjectIndex.value + 1

  return projects[nextIndex] ?? projects[0]
})

setPageSeo({
  title: `${featuredCase.title} | André Oliveira`,
  description: featuredCase.subtitle
})

watchEffect(() => {
  if (route.params.uid !== featuredCase.uid) {
    throw createError({ statusCode: 404, statusMessage: 'Case não encontrado' })
  }
})
</script>

<style scoped>
.case-page {
  background: rgb(var(--color-paper));
}

.case-hero {
  padding-block: 80px;
}

.case-hero__grid {
  padding-block: 120px;
}

.case-hero__content {
  grid-column: 2 / span 3;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.case-content {
  padding-block: 80px;
}

.case-content__inner {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.case-image {
  width: 100%;
  object-fit: cover;
}

.case-image--full {
  aspect-ratio: 1198 / 752;
}

.case-text {
  padding-block: 64px;
}

.case-text__content {
  grid-column: 2 / span 3;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.case-text__body p + p {
  margin-top: 16px;
}

.case-image-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--grid-gap);
}

.case-image-grid .case-image {
  aspect-ratio: 584 / 752;
  height: 752px;
}

.case-note {
  padding-block: 64px;
}

.case-note p {
  grid-column: 3 / span 2;
}

.next-project {
  padding-block: 80px;
}

@media (max-width: 900px) {
  .case-hero,
  .case-content,
  .next-project {
    padding-block: 56px;
  }

  .case-hero__grid {
    padding-block: 72px;
  }

  .case-hero__content,
  .case-text__content,
  .case-note p {
    grid-column: 1;
  }

  .case-image-grid {
    grid-template-columns: 1fr;
  }

  .case-image-grid .case-image {
    height: auto;
  }
}
</style>
