<template>
  <section ref="sectionRef" id="about" class="about-section">
    <div class="about-section__grid">
      <h2
        ref="titleRef"
        id="about-title"
        class="about-section__title"
        data-motion="about-title"
        data-motion-duration="0.9"
        aria-labelledby="about-title"
      >
        {{ title }}
      </h2>

      <p
        class="about-section__statement"
        data-motion="reveal"
        data-motion-duration="0.9"
      >
        {{ statement }}
      </p>

      <p
        class="about-section__note type-body"
        data-motion="reveal"
        data-motion-duration="0.9"
      >
        {{ note }}
      </p>

      <figure
        class="about-section__portrait-frame"
      >
        <img
          class="about-section__portrait"
          :src="imageSrc"
          :alt="imageAlt"
          width="197"
          height="224"
        >
      </figure>

      <div
        class="about-section__body type-big"
        data-motion="group"
        data-motion-group
        data-motion-stagger="0.08"
      >
        <p v-for="paragraph in body" :key="paragraph" data-motion-item>
          {{ paragraph }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  body?: string[]
  imageAlt?: string
  imageSrc?: string
  note?: string
  statement?: string
  title?: string
}>(), {
  body: () => [
    'Projetando produtos digitais refinadAtuo na interseção entre produto, marca e tecnologia, construindo experiências digitais precisas, escaláveis e visualmente memoráveis.os por meio de UX, refinamento visual e design de interação.',
    'Marca e tecnologia, construindo experiências digitais precisas, escaláveis e visualmente memoráveis.os por meio de UX, refinamento visual e design de interação.'
  ],
  imageAlt: 'Retrato de André Oliveira',
  imageSrc: '/figma/profile.png',
  note: 'Projetando produtos digitais refinados na interseção entre produto, marca e tecnologia.',
  statement: 'Design, sistema. Alguma coisa e presença digital para produtos com ambição visual mas algo.',
  title: 'Sobre'
})

const sectionRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
let motionContext: { revert: () => void } | undefined

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(async () => {
  if (prefersReducedMotion() || !sectionRef.value || !titleRef.value) {
    return
  }

  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger')
  ])

  gsap.registerPlugin(ScrollTrigger)

  motionContext = gsap.context(() => {
    ScrollTrigger.matchMedia({
      '(max-width: 1100px)': () => {
        gsap.fromTo(
          titleRef.value,
          { x: -32 },
          {
            x: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.value,
              start: 'top 95%',
              end: 'top 35%',
              scrub: 0.8
            }
          }
        )
      }
    })
  }, sectionRef.value)
})

onBeforeUnmount(() => {
  motionContext?.revert()
})
</script>

<style scoped>
.about-section {
  overflow: hidden;
  background: rgb(var(--color-ink));
  color: rgb(var(--color-paper));
}

.about-section__grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: auto auto auto;
  column-gap: var(--space-edge);
  width: 100%;
  padding: 128px var(--space-edge) 0;
}

.about-section__title {
  grid-column: 2 / span 3;
  grid-row: 1;
  color: rgb(var(--color-paper));
  font-size: 96px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 1.536px;
  text-transform: uppercase;
}

.about-section__statement {
  grid-column: 5 / span 6;
  grid-row: 2;
  align-self: start;
  padding-top: 80px;
  padding-bottom: 64px;
  color: rgb(var(--color-paper));
  font-size: 44px;
  font-weight: 500;
  line-height: 64px;
  letter-spacing: 0.352px;
}

.about-section__note {
  grid-column: 2 / span 2;
  grid-row: 3;
  align-self: start;
  padding-top: 32px;
}

.about-section__portrait-frame {
  grid-column: 4 / span 3;
  grid-row: 3;
  align-self: end;
  justify-self: start;
  width: min(100%, 357px);
  margin: 0;
}

.about-section__portrait {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.about-section__body {
  grid-column: 8 / span 4;
  grid-row: 3;
  align-self: start;
  width: min(100%, 472px);
  padding-top: 32px;
  line-height: 32px;
  letter-spacing: 0.08px;
}

.about-section__body p + p {
  margin-top: 16px;
}

@media (max-width: 1100px) {
  .about-section__grid {
    display: flex;
    flex-direction: column;
    gap: 31px;
    padding: 0 var(--space-edge) 0;
  }

  .about-section__title {
    order: 1;
    margin-top: -8px;
    font-size: clamp(160px, 143vw, 560px);
    line-height: 0.9;
    letter-spacing: 2.56px;
    white-space: nowrap;
  }

  .about-section__statement {
    order: 2;
    width: min(100%, 366px);
    padding: 0;
    font-size: 32px;
    line-height: 42px;
    letter-spacing: 0.256px;
  }

  .about-section__note {
    order: 3;
    width: min(100%, 275px);
    padding-top: 32px;
  }

  .about-section__body {
    order: 4;
    width: min(100%, 365px);
    padding-top: 0;
  }

  .about-section__portrait-frame {
    order: 5;
    align-self: flex-end;
    width: min(100%, 274px);
  }
}
</style>
