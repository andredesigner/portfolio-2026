<template>
  <footer id="contact" class="site-footer">
    <div class="site-container site-footer__inner">
      <div class="editorial-grid">
        <h2 class="site-footer__title type-h3">
          Vamos conversar sobre design, negócios ou um dos meus hobbies, como tênis ou carros?
        </h2>
      </div>

      <div class="site-footer__links">
        <div v-for="link in contactLinks" :key="link.label" class="site-footer__link-slot">
          <BasePillLink :label="link.label" :href="link.href" :variant="link.variant as 'default' | 'outline' | 'green' | undefined" />
        </div>
      </div>

      <div class="site-footer__bottom">
        <p class="site-footer__copyright">© {{ currentYear }} André Oliveira</p>
        <button class="button-reset site-footer__top" type="button" @click="scrollToTop">
          Subir
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { contactLinks } from '~/utils/portfolioContent'

const currentYear = new Date().getFullYear()
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<style scoped>
.site-footer {
  padding-block: 80px;
  background: rgb(var(--color-paper));
  color: rgb(var(--color-ink));
}

.site-footer__inner {
  display: flex;
  flex-direction: column;
  gap: 64px;
}

.site-footer__title {
  grid-column: 2 / span 3;
  max-width: 892px;
}

.site-footer__links {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 276px));
  gap: var(--grid-gap);
}

.site-footer__link-slot {
  min-width: 0;
}

.site-footer__bottom {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--grid-gap);
  align-items: center;
}

.site-footer__copyright {
  grid-column: 2;
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
}

.site-footer__top {
  grid-column: 4;
  justify-self: end;
  width: 88px;
  height: 88px;
  border-radius: 999px;
  background: rgb(var(--color-accent));
  color: rgb(var(--color-paper));
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
}

@media (max-width: 900px) {
  .site-footer {
    padding-block: 56px;
  }

  .site-footer__title,
  .site-footer__copyright,
  .site-footer__top {
    grid-column: 1;
  }

  .site-footer__links,
  .site-footer__bottom {
    grid-template-columns: 1fr;
  }

  .site-footer__top {
    justify-self: start;
  }
}
</style>
