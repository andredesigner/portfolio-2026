<template>
  <article class="case-page">
    <section class="case-hero site-container editorial-grid">
      <div class="case-hero__content">
        <h1 class="type-h1-display">{{ featuredCase.title }}</h1>
        <p class="type-big">{{ featuredCase.subtitle }}</p>
      </div>
      <aside class="case-hero__meta" aria-label="Informações do projeto">
        <p>{{ featuredCase.year }}</p>
        <ul>
          <li v-for="service in featuredProject?.services" :key="service">
            {{ service }}
          </li>
        </ul>
      </aside>
    </section>

    <section class="case-detail-media site-container editorial-grid" aria-labelledby="details-title">
      <p id="details-title" class="case-detail-media__label">Detalhes</p>
      <img class="case-detail-media__image" :src="projectHeroSrc" :alt="featuredCase.imageAlt">
    </section>

    <section class="case-statement site-container editorial-grid">
      <h2 class="type-h3">{{ featuredCase.intro }}</h2>
    </section>

    <section class="case-duo site-container editorial-grid" aria-label="Aplicações visuais do projeto">
      <img class="case-duo__image" :src="projectToteSrc" alt="Sacola com aplicação visual do projeto Onebox">
      <img class="case-duo__image" :src="projectToteSrc" alt="Variação de sacola com aplicação visual do projeto Onebox">
    </section>

    <section class="case-text site-container editorial-grid">
      <div class="case-text__content type-big">
        <p>{{ featuredCase.body }}</p>
        <p>{{ featuredCase.secondBody }}</p>
      </div>
    </section>

    <section class="next-project site-container editorial-grid">
      <p class="next-project__label type-big">Veja esse também.</p>
      <div class="next-project__card">
        <ProjectCard :project="relatedProject" :index="0" bounded />
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
const featuredProject = computed(() => projects.find((project) => project.uid === featuredCase.uid))
const relatedProject = computed(() => featuredProject.value ?? projects[0])

setPageSeo({
  title: `${featuredCase.title} | André Oliveira`,
  description: featuredCase.subtitle,
  image: projectHeroSrc
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
  min-height: 384px;
  padding-bottom: 48px;
  align-items: start;
}

.case-hero__content {
  grid-column: 3 / span 3;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.case-hero__meta {
  grid-column: 6;
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: rgb(var(--color-ink));
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

.case-hero__meta ul {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.case-detail-media {
  padding-top: 48px;
  padding-bottom: 48px;
  background: rgb(var(--color-paper));
}

.case-detail-media__label {
  grid-column: 1;
  align-self: start;
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
}

.case-detail-media__image {
  grid-column: 1 / span 6;
  width: 100%;
  height: auto;
  aspect-ratio: 1344 / 844;
  object-fit: cover;
}

.case-statement {
  padding-top: 16px;
  padding-bottom: 64px;
}

.case-statement h2 {
  grid-column: 3 / span 3;
}

.case-duo {
  padding-bottom: 64px;
}

.case-duo__image {
  grid-column: span 3;
  width: 100%;
  aspect-ratio: 654 / 842;
  object-fit: cover;
}

.case-text {
  padding-top: 16px;
  padding-bottom: 64px;
}

.case-text__content {
  grid-column: 3 / span 4;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.next-project {
  padding-top: 48px;
  padding-bottom: 48px;
  border-top: 1px solid rgb(var(--color-line));
  background: rgb(var(--color-paper));
}

.next-project__label {
  grid-column: 1 / span 2;
}

.next-project__card {
  grid-column: 3 / span 4;
}

@media (max-width: 1100px) {
  .case-hero {
    min-height: 300px;
    padding-bottom: 40px;
  }

  .case-hero__content,
  .case-hero__meta,
  .case-detail-media__label,
  .case-detail-media__image,
  .case-statement h2,
  .case-text__content,
  .next-project__label,
  .next-project__card {
    grid-column: 1;
    width: 100%;
    max-width: 350px;
  }

  .case-hero__meta {
    align-self: start;
  }

  .case-duo {
    gap: 20px;
  }

  .case-duo__image {
    grid-column: 1;
  }
}
</style>
