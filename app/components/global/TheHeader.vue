<template>
  <header ref="headerRef" class="site-header">
    <a class="site-header__skip-link" href="#main-content">
      Pular para o conteúdo
    </a>
    <nav class="site-container site-header__nav editorial-grid" aria-label="Navegação principal">
      <BrandSymbol class="site-footer__symbol" />
      <BrandLogo class="site-header__logo" />
      <p v-if="context" class="site-header__context">
        {{ context }}
      </p>
      <BaseTextLink class="site-header__action" :label="actionLabel" :href="actionHref" />
    </nav>
  </header>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  context?: string
  actionLabel?: string
  actionHref?: string
  symbolBehavior?: 'always' | 'sticky' | 'hidden'
  symbolRevealTarget?: string
}>(), {
  context: '',
  actionLabel: '',
  actionHref: '',
  symbolBehavior: 'always',
  symbolRevealTarget: ''
})

const route = useRoute()
const isCaseDetail = computed(() => route.name === 'cases-uid')
const headerRef = ref<HTMLElement | null>(null)
const actionLabel = computed(() => props.actionLabel || (isCaseDetail.value ? 'Fechar' : 'Sobre'))
const actionHref = computed(() => props.actionHref || (isCaseDetail.value ? '/' : '#about'))
const context = computed(() => props.context.trim())
</script>

<style scoped>
.site-header {
  top: 0;
  z-index: 50;
  height: 208px;
  background: rgb(var(--color-paper));
}

.site-header__nav {
  height: 208px;
  align-items: start;
  padding-top: 48px;
}

.site-header__skip-link {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

.site-header__skip-link:focus {
  position: fixed;
  z-index: 100;
  top: 16px;
  left: 16px;
  width: auto;
  height: auto;
  clip: auto;
  color: rgb(var(--color-paper));
  background: rgb(var(--color-accent));
  padding: 12px 16px;
}

.site-header__logo {
  grid-column: 1;
  width: 194px;
}

.site-header__context {
  grid-column: 3;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  text-transform: uppercase;
}

.site-header__action {
  grid-column: 6;
  justify-self: start;
}

@media (max-width: 1100px) {
  .site-header {
    height: 116px;
  }

  .site-header__nav {
    height: 116px;
    grid-template-columns: 1fr auto;
    padding-top: 24px;
  }

  .site-header__logo {
    grid-column: 1;
    width: 150px;
  }

  .site-header__context {
    grid-column: 1;
  }

  .site-header__action {
    grid-column: 2;
    grid-row: 1;
  }
}
</style>
