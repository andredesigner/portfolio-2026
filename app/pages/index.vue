<template>
  <div class="home-page">
    <FlagBand />

    <section ref="heroRef" class="home-hero">
      <div class="site-container">
        <div class="home-hero__brand editorial-grid">
          <BrandLogo id="home-brand-logo" class="home-hero__logo" />
        </div>
      </div>
    </section>

    <TheHeader
      context="Product Designer — UX/UI"
      action-label="Contato"
      action-href="#contact"
      symbol-behavior="sticky"
      symbol-reveal-target="#home-brand-logo"
    />

    <section class="home-statement">
      <div class="site-container">
        <div class="home-hero__statement editorial-grid">
          <h1 class="type-h1">
            Designer de produto com forte capacidade visual, visão sistêmica e execução high-end para experiências digitais.
          </h1>
        </div>
      </div>
    </section>

    <section class="home-projects">
      <div class="site-container">
        <SectionTitle title="Projetos" />
        <div>
          <ProjectCard
            v-for="(project, index) in projects"
            :key="project.uid"
            :project="project"
            theme="accent"
            :bounded="index === projects.length - 1"
          />
        </div>
      </div>
    </section>

    <section class="home-about">
      <div class="site-container home-about__inner">
        <div class="editorial-grid">
          <h2 class="home-about__title type-h3">
            Designer de produto com forte capacidade visual, visão sistêmica e execução high-end para experiências digitais.
          </h2>
          <div class="home-about__portrait-frame">
            <img class="home-about__portrait" :src="profileSrc" alt="Retrato de André Oliveira">
          </div>
        </div>

        <div class="home-about__columns editorial-grid">
          <p class="type-h5">
            Projetando produtos digitais refinados por meio de UX, refinamento visual e design de interação.
          </p>
          <div class="type-big">
            <p>Lorem ipsum dolor sit amet consectetur. Augue fringilla a mattis egestas.</p>
            <p>Sed ullamcorper lorem faucibus quisque nisi et. Molestie tempor eleifend cras posuere a consectetur donec.</p>
            <p>Tellus quam bibendum vestibulum mauris justo. Sagittis et non nibh id et sed ullamcorper nunc.</p>
          </div>
          <div class="type-big">
            <p>Lorem ipsum dolor sit amet consectetur. Augue fringilla a mattis egestas.</p>
            <p>Sed ullamcorper lorem faucibus quisque nisi et. Molestie tempor eleifend cras posuere a consectetur donec.</p>
            <p>Tellus quam bibendum vestibulum mauris justo. Sagittis et non nibh id et sed ullamcorper nunc.</p>
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
}

.home-hero {
  padding-top: 80px;
  padding-bottom: 32px;
}

.home-hero__brand {
  align-items: end;
}

.home-hero__logo {
  grid-column: 2 / span 2;
}

.home-hero__statement {
  padding-top: 120px;
  padding-bottom: 120px;
}

.home-hero__statement h1 {
  grid-column: 2 / span 3;
  max-width: 892px;
}

.home-projects {
  padding-block: 80px;
  background: rgb(var(--color-paper));
  color: rgb(var(--color-ink));
}

.home-projects :deep(.project-card) {
  color: rgb(var(--color-accent));
}

.home-about {
  padding-block: 80px;
  background: rgb(var(--color-ink));
  color: rgb(var(--color-paper));
}

.home-about__inner {
  display: flex;
  flex-direction: column;
  gap: 64px;
  padding-top: 120px;
}

.home-about__title {
  grid-column: 2 / span 2;
}

.home-about__portrait-frame {
  grid-column: 4;
  width: 276px;
  height: 312px;
  overflow: hidden;
  background: linear-gradient(221.5deg, #f2f2f2 0%, #040404 100%);
}

.home-about__portrait {
  display: block;
  width: 276px;
  height: 312px;
  object-fit: cover;
}

.home-about__columns p + p {
  margin-top: 16px;
}

@media (max-width: 900px) {
  .home-hero,
  .home-projects,
  .home-about {
    padding-block: 56px;
  }

  .home-hero__logo,
  .home-hero__statement h1,
  .home-about__title,
  .home-about__portrait-frame {
    grid-column: 1;
  }

  .home-hero__statement {
    padding-block: 80px 40px;
  }

  .home-about__inner {
    padding-top: 40px;
  }

  .home-about__portrait-frame,
  .home-about__portrait {
    width: min(276px, 100%);
  }
}
</style>
