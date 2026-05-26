<template>
  <section
    class="wordmark-footer"
    aria-label="Encerramento"
    data-motion="group"
    data-motion-group
    data-motion-stagger="0.08"
  >
    <a class="wordmark-footer__top" href="#__nuxt" data-motion-item>
      Subir
    </a>
    <BrandLogo
      class="wordmark-footer__logo"
      decorative
    />
  </section>
</template>

<style scoped>
.wordmark-footer {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 232px var(--space-edge) 80px;
  background: rgb(var(--color-wordmark));
  color: rgb(var(--color-ink));
  position: sticky;
  bottom: 0;
  z-index: 0;
}

.wordmark-footer__top {
  position: absolute;
  top: -4px;
  right: 130px;
  display: inline-flex;
  width: 112px;
  height: 112px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-brand);
  background: rgb(var(--color-paper));
  color: rgb(var(--color-ink));
  font-size: 20px;
  font-weight: 500;
  line-height: 20px;
  text-align: center;
}

@media (max-width: 1100px) {
  .wordmark-footer {
    min-height: 190px;
    align-items: flex-end;
    justify-content: flex-start;
    padding: 112px var(--space-edge) 32px;
  }

  .wordmark-footer__logo {
    width: min(100%, 366px);
  }

  .wordmark-footer__top {
    right: var(--space-edge);
    width: 91px;
    height: 91px;
  }
}
</style>
