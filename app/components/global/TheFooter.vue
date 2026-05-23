<template>
  <footer id="contact" class="site-footer">
    <div class="site-container site-footer__inner editorial-grid">
      <h2 class="site-footer__title type-h3">
        Vamos conversar sobre design, negócios ou um dos meus hobbies, como tênis ou carros?
      </h2>

      <div class="site-footer__actions" aria-label="Ações de contato">
        <a
          v-for="action in footerActions"
          :key="action.label"
          class="site-footer__action"
          :href="action.href"
        >
          <span class="site-footer__action-title">{{ action.label }}</span>
          <span class="site-footer__action-meta">{{ action.action }}</span>
        </a>
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

const footerActions = [
  {
    label: 'E-mail',
    action: 'Enviar',
    href: 'mailto:hello@example.com'
  },
  {
    label: 'Currículo',
    action: 'Baixar',
    href: '/curriculo.pdf'
  },
  {
    label: 'Linkedin',
    action: 'Acessar',
    href: 'https://www.linkedin.com/'
  }
]
</script>

<style scoped>
.site-footer {
  position: relative;
  background: rgb(var(--color-paper));
  color: rgb(var(--color-ink));
}

.site-footer__inner {
  position: relative;
  z-index: 1;
  grid-template-rows: auto auto auto;
  row-gap: 32px;
  padding: 48px;
  background: rgb(var(--color-paper));
}

.site-footer__title {
  grid-column: 5 / span 2;
}

.site-footer__actions {
  grid-column: 1 / span 6;
  grid-row: 2;
  display: flex;
  flex-direction: column;
}

.site-footer__action {
  display: grid;
  min-height: 138px;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  column-gap: var(--grid-gap);
  align-items: center;
  padding-block: 32px;
  border-top: 1px solid rgb(var(--color-line));
  color: rgb(var(--color-ink));
  transition: color 260ms cubic-bezier(0.22, 1, 0.36, 1), padding-inline 260ms cubic-bezier(0.22, 1, 0.36, 1);
}

.site-footer__action:last-child {
  border-bottom: 1px solid rgb(var(--color-line));
}

.site-footer__action:hover {
  color: rgb(var(--color-accent));
  padding-inline: 12px;
}

.site-footer__action-title {
  grid-column: 1 / span 3;
  font-size: 64px;
  font-weight: 500;
  line-height: 1.16;
  text-transform: uppercase;
  overflow-wrap: break-word;
}

.site-footer__action-meta {
  grid-column: 5 / span 2;
  display: inline-flex;
  gap: 4px;
  align-items: flex-end;
  justify-self: start;
  color: rgb(var(--color-accent));
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
}

.site-footer__action-meta::after {
  content: "";
  margin-bottom: 6px;
  width: 4px;
  height: 4px;
  background-color: rgb(var(--color-line));
}

.site-footer__bottom {
  grid-column: 1 / span 6;
  grid-row: 3;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: var(--grid-gap);
  align-items: flex-end;
  min-height: 88px;
}

.site-footer__linkedin {
  grid-column: 1 / span 2;
}

.site-footer__copyright {
  grid-column: 3;
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

.site-footer__wordmark {
  position: sticky;
  bottom: 0;
  z-index: 0;
  width: 100%;
  padding: 96px 48px 48px;
}

@media (max-width: 1100px) {
  .site-footer__inner {
    padding: 48px var(--space-page);
  }

  .site-footer__title,
  .site-footer__linkedin,
  .site-footer__copyright,
  .site-footer__action-title,
  .site-footer__action-meta {
    grid-column: 1 / -1;
  }

  .site-footer__title {
    width: 100%;
  }

  .site-footer__bottom {
    grid-template-columns: 1fr;
  }

  .site-footer__top {
    grid-column: 1 / -1;
  }

  .site-footer__copyright {
    order: 3;
  }

  .site-footer__top {
    order: 2;
  }

  .site-footer__action {
    min-height: 112px;
    grid-template-columns: 1fr;
    gap: 12px;
    padding-block: 24px;
  }

  .site-footer__action:hover {
    padding-inline: 0;
  }

  .site-footer__action-title {
    font-size: 42px;
  }

  .site-footer__top {
    justify-self: end;
  }

  .site-footer__wordmark {
    padding: 48px 20px 16px;
  }
}
</style>
