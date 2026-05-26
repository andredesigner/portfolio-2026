<template>
  <header
    ref="headerRef"
    class="site-header"
    :class="`site-header--${variant}`"
  >
    <a class="site-header__skip-link" href="#main-content">
      Pular para o conteúdo
    </a>
    <nav
      class="site-header__nav"
      :class="navClass"
      aria-label="Navegação principal"
    >
      <BrandSymbol v-if="showSymbol" class="site-footer__symbol" />
      <BrandLogo class="site-header__logo" :block="false" />
      <p v-if="context" class="site-header__context">
        {{ context }}
      </p>
      <BaseTextLink
        class="site-header__action"
        :label="actionLabel"
        :href="actionHref"
        :tone="variant === 'compact' ? 'ink' : 'accent'"
        :show-dot="variant === 'default'"
      />
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
  variant?: 'default' | 'compact'
}>(), {
  context: '',
  actionLabel: '',
  actionHref: '',
  symbolBehavior: 'always',
  symbolRevealTarget: '',
  variant: 'default'
})

const route = useRoute()
const isCaseDetail = computed(() => route.name === 'cases-uid')
const headerRef = ref<HTMLElement | null>(null)
const actionLabel = computed(() => props.actionLabel || (isCaseDetail.value ? 'Fechar' : 'Sobre'))
const actionHref = computed(() => props.actionHref || (isCaseDetail.value ? '/' : '#about'))
const context = computed(() => props.context.trim())
const showSymbol = computed(() => props.symbolBehavior !== 'hidden')
const variant = computed(() => props.variant)
const navClass = computed(() => variant.value === 'compact'
  ? 'site-header__nav--compact'
  : 'site-container editorial-grid site-header__nav--default')
</script>

<style scoped>
.site-header {
  top: 0;
  z-index: 50;
  background: rgb(var(--color-paper));
}

.site-header--default {
  height: 208px;
}

.site-header--compact {
  height: auto;
}

.site-header__nav {
  align-items: start;
}

.site-header__nav--default {
  height: 208px;
  padding-top: 48px;
}

.site-header__nav--compact {
  display: grid;
  width: min(100%, var(--content-home));
  grid-template-columns: minmax(0, 275px) auto;
  grid-template-rows: auto auto;
  column-gap: 24px;
  row-gap: 16px;
  margin-inline: auto;
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

.site-header__nav--compact .site-header__logo {
  grid-column: 1;
  grid-row: 1;
  width: 187px;
}

.site-header__context {
  grid-column: 3;
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
}

.site-header__nav--default .site-header__context {
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 1.6px;
  text-transform: uppercase;
}

.site-header__nav--compact .site-header__context {
  grid-column: 1;
  grid-row: 2;
}

.site-header__action {
  grid-column: 6;
  justify-self: start;
}

.site-header__nav--compact .site-header__action {
  grid-column: 2;
  grid-row: 1;
  justify-self: end;
}

@media (max-width: 1100px) {
  .site-header--default {
    height: 116px;
  }

  .site-header__nav--default {
    height: 116px;
    grid-template-columns: 1fr auto;
    padding-top: 24px;
  }

  .site-header__nav--compact {
    grid-template-columns: minmax(0, 275px) auto;
    padding-top: 16px;
  }

  .site-header__logo {
    grid-column: 1;
    width: 150px;
  }

  .site-header__nav--compact .site-header__logo {
    width: 187px;
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
