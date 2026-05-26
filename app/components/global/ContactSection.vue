<template>
  <section id="contact" class="contact-section" aria-labelledby="contact-title">
    <div
      class="contact-section__grid"
      data-motion="group"
      data-motion-group
      data-motion-stagger="0.08"
    >
      <h2
        id="contact-title"
        class="contact-section__title type-contact-title"
        data-motion-item
      >
        {{ title }}
      </h2>

      <BasePillLink
        class="contact-section__email"
        :label="emailLabel"
        :href="emailHref"
        variant="dark"
        size="large"
        data-motion-item
      />

      <p class="contact-section__copyright" data-motion-item>
        © {{ currentYear }} André Oliveira
      </p>

      <BaseTextLink
        class="contact-section__resume"
        label="Currículo"
        :href="resumeHref"
        tone="ink"
        :show-dot="false"
        data-motion-item
      />

      <BaseTextLink
        class="contact-section__linkedin"
        label="Linkedin"
        :href="linkedinHref"
        tone="ink"
        :show-dot="false"
        external-target="_blank"
        data-motion-item
      />
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  emailHref?: string
  emailLabel?: string
  linkedinHref?: string
  resumeHref?: string
  title?: string
}>(), {
  emailHref: 'mailto:hello@example.com',
  emailLabel: 'E-mail',
  linkedinHref: 'https://www.linkedin.com/',
  resumeHref: '/curriculo.pdf',
  title: 'Vamos conversar sobre design, negócios ou um dos meus hobbies, como tênis ou carros?'
})

const currentYear = new Date().getFullYear()
</script>

<style scoped>
.contact-section {
  position: relative;
  background: rgb(var(--color-paper));
  color: rgb(var(--color-ink));
  z-index: 1;
}

.contact-section__grid {
  display: grid;
  min-height: 382px;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: auto 1fr;
  gap: 64px var(--space-edge);
  padding: 64px var(--space-edge);
}

.contact-section__title {
  grid-column: 2 / span 7;
  grid-row: 1;
  width: min(100%, 708px);
}

.contact-section__email {
  grid-column: 10 / span 2;
  grid-row: 1;
  align-self: end;
  width: 100%;
}

.contact-section__copyright,
.contact-section__resume,
.contact-section__linkedin {
  align-self: end;
}

.contact-section__copyright {
  grid-column: 1 / span 2;
  grid-row: 2;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
}

.contact-section__resume {
  grid-column: 4 / span 2;
  grid-row: 2;
}

.contact-section__linkedin {
  grid-column: 8 / span 2;
  grid-row: 2;
}

@media (max-width: 1100px) {
  .contact-section__grid {
    min-height: 564px;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-template-rows: auto minmax(0, 1fr) auto auto;
    gap: 64px var(--space-edge);
    padding: 32px var(--space-edge);
  }

  .contact-section__title {
    grid-column: 1 / -1;
    grid-row: 1;
    width: min(100%, 366px);
  }

  .contact-section__email {
    grid-column: 2 / span 3;
    grid-row: 2;
    align-self: end;
  }

  .contact-section__resume {
    grid-column: 1 / span 2;
    grid-row: 3;
  }

  .contact-section__linkedin {
    grid-column: 3 / span 2;
    grid-row: 3;
  }

  .contact-section__copyright {
    grid-column: 1 / -1;
    grid-row: 4;
    font-size: 14px;
    line-height: 1;
  }
}
</style>
