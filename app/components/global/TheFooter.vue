<template>
  <footer id="contact" class="site-footer">
    <div class="site-container site-footer__inner editorial-grid">
      <h2 class="site-footer__title type-h3">
        Vamos conversar sobre design, negócios ou um dos meus hobbies, como tênis ou carros?
      </h2>

      <div class="site-footer__links">
        <BaseTextLink class="site-footer__linkedin" label="Linkedin" href="https://www.linkedin.com/" />
        <BasePillLink label="Currículo" href="/curriculo.pdf" variant="outline" />
        <BasePillLink label="E-mail" href="mailto:hello@example.com" variant="green" />
      </div>

      <div class="site-footer__bottom">
        <p class="site-footer__copyright">© {{ currentYear }} André Oliveira</p>
        <a class="button-reset site-footer__top" href="#__nuxt">Subir</a>
      </div>
    </div>
    <BrandLogo class="site-footer__wordmark" />
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.site-footer {
  padding-top: 48px;
  background: rgb(var(--color-paper));
  color: rgb(var(--color-ink));
  overflow: hidden;
}

.site-footer__inner {
  grid-template-rows: auto auto auto;
  row-gap: 32px;
  padding: 48px;
}

.site-footer__title {
  grid-column: 3 / span 4;
}

.site-footer__links {
  grid-column: 1 / span 6;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: var(--grid-gap);
  align-items: center;
}

.site-footer__linkedin {
  grid-column: 1 / span 2;
}

.site-footer__bottom {
  grid-column: 1 / span 6;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: var(--grid-gap);
  align-items: flex-end;
  min-height: 88px;
}

.site-footer__copyright {
  grid-column: 2;
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
}

.site-footer__top {
  grid-column: 6;
  justify-self: end;
  width: 88px;
  height: 88px;
  border-radius: 999px;
  border: 4px solid rgb(var(--color-accent));
  color: rgb(var(--color-accent));
  font-size: 20px;
  font-weight: 500;
  line-height: 78px;
  text-align: center;
}

.site-footer__links :deep(.pill-link--outline) {
  grid-column: 3 / span 2;
}

.site-footer__links :deep(.pill-link--green) {
  grid-column: 5 / span 2;
}

.site-footer__wordmark {
  width: 100%;
  padding: 48px;
}

@media (max-width: 1100px) {
  .site-footer {
    padding-top: 40px;
  }

  .site-footer__title,
  .site-footer__linkedin,
  .site-footer__copyright {
    grid-column: 1;
  }

  .site-footer__links,
  .site-footer__bottom {
    grid-template-columns: 1fr;
  }

  .site-footer__links :deep(.pill-link--outline),
  .site-footer__links :deep(.pill-link--green),
  .site-footer__top {
    grid-column: 1;
  }

  .site-footer__top {
    justify-self: start;
  }

  .site-footer__wordmark {
    padding: 48px 20px 16px;
  }
}
</style>
