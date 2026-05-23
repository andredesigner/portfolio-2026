<template>
  <div class="home-page">
    <TheHeader context="UX Designer" action-label="Sobre" action-href="#about" />

    <section ref="heroRef" class="home-hero site-container editorial-grid">
      <div class="home-hero__statement grid-main">
        <h1 class="type-h1">
          visão sistêmica e execução high-end para experiências digitais.
        </h1>
      </div>
    </section>

    <section class="home-projects" id="projects">
      <div class="site-container editorial-grid home-projects__grid">
        <BaseTextLink class="home-section-link" label="Projetos" href="#projects" />
        <div class="home-projects__list">
          <ProjectCard
            v-for="(project, index) in displayedProjects"
            :key="project.uid"
            :project="project"
            :index="project.uid === 'arquivo' ? 4 : index"
            :bounded="index === displayedProjects.length - 1"
          />
        </div>
      </div>
    </section>

    <section id="about" class="home-about site-container editorial-grid">
      <p class="home-about__note type-big">
        Design, sistema. Alguma coisa e presença digital para produtos com ambição visual mas algo.
      </p>
      <div class="home-about__content">
        <div class="home-about__media-copy">
          <div class="home-about__portrait-frame">
            <img class="home-about__portrait" :src="profileSrc" alt="Retrato de André Oliveira">
          </div>
          <div class="home-about__text">
            <h2 class="type-h3">
              Design, sistema e presença digital para produtos com ambição visual.
            </h2>
            <div class="type-body home-about__body">
              <p>
                Atuo na interseção entre produto, marca e tecnologia, construindo experiências digitais precisas, escaláveis e visualmente memoráveis.
              </p>
              <p>
                Projetando produtos digitais refinados por meio de UX, refinamento visual e design de interação.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { projects } from '~/utils/portfolioContent'

const heroRef = ref<HTMLElement | null>(null)
const profileSrc = '/figma/profile.png'
const { setPageSeo } = usePageSeo()
const displayedProjects = computed(() => projects.filter((project) => project.uid === 'onebox' || project.uid === 'arquivo'))

setPageSeo({
  title: 'André Oliveira Portfolio',
  description: 'Portfólio de UX/UI Design e Brand Design com foco em craft visual, estratégia e interação.'
})

onMounted(() => {
  const motion = useMotion()

  motion.animateIn(heroRef.value, {
    y: 18,
    duration: 0.9,
    delay: 0.1
  })
})
</script>

<style scoped>
.home-page {
  background: rgb(var(--color-paper));
  gap: var(--grid-gap);
  display: flex;
  flex-direction: column;
}

.home-hero {
  min-height: 352px;
  padding-bottom: 64px;
  align-items: start;
}

.home-hero__statement {
  grid-column: 3 / span 4;
}

.home-projects {
  border-top: 1px solid rgb(var(--color-line));
  background: rgb(var(--color-paper) / 0.88);
  backdrop-filter: blur(16px);
}

.home-projects__grid {
  padding-top: 48px;
  padding-bottom: 48px;
}

.home-section-link {
  grid-column: 1;
  align-self: start;
  position: sticky;
  top: 36px;
}

.home-projects__list {
  grid-column: 3 / span 4;
}

.home-about {
  padding-top: 48px;
  padding-bottom: 64px;
  border-top: 1px solid rgb(var(--color-line));
  background: rgb(var(--color-paper));
  color: rgb(var(--color-ink));
}

.home-about__note {
  grid-column: 1 / span 2;
  max-width: 198px;
}

.home-about__content {
  grid-column: 3 / span 4;
}

.home-about__media-copy {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
}

.home-about__portrait-frame {
  width: 197px;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(46, 46, 46, 0) 0%, rgba(46, 46, 46, 0) 12.02%, #2E2E2E 12.03%, #2E2E2E 100%);
}

.home-about__portrait {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

.home-about__text {
  width: min(100%, 426px);
}

.home-about__body {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 32px;
}

.home-about__columns p + p,
.home-about__body p + p {
  margin-top: 0;
}

@media (max-width: 1100px) {
  .home-hero {
    min-height: 260px;
    padding-bottom: 40px;
  }

  .home-hero__statement,
  .home-projects__list,
  .home-section-link,
  .home-about__note,
  .home-about__content {
    grid-column: 1;
  }

  .home-projects__grid,
  .home-about {
    padding-top: 36px;
    padding-bottom: 36px;
  }

  .home-about__media-copy {
    align-items: flex-start;
    flex-direction: column;
  }

}
</style>
