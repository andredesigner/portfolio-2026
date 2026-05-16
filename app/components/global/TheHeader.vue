<template>
  <header ref="headerRef" class="site-header">
    <BrandSymbol v-if="shouldShowSymbol" />
    <a
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-4 focus:py-3 focus:text-paper"
      href="#main-content"
    >
      Pular para o conteúdo
    </a>
    <nav class="site-container site-header__nav editorial-grid" aria-label="Navegação principal">
      <p v-if="context" class="site-header__context">
        {{ context }}
      </p>
      <div class="site-header__action">
        <BasePillLink :label="actionLabel" :href="actionHref" />
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  context?: string
  actionLabel?: string
  actionHref?: string
  symbolBehavior?: 'always' | 'sticky' | 'hidden'
}>(), {
  context: '',
  actionLabel: '',
  actionHref: '',
  symbolBehavior: 'always'
})

const route = useRoute()
const isCaseDetail = computed(() => route.name === 'cases-uid')
const headerRef = ref<HTMLElement | null>(null)
const isSticky = ref(props.symbolBehavior === 'always')

const actionLabel = computed(() => props.actionLabel || (isCaseDetail.value ? 'Fechar' : 'Contato'))
const actionHref = computed(() => props.actionHref || (isCaseDetail.value ? '/' : '#contact'))
const context = computed(() => props.context.trim())
const shouldShowSymbol = computed(() => {
  if (props.symbolBehavior === 'hidden') {
    return false
  }

  if (props.symbolBehavior === 'sticky') {
    return isSticky.value
  }

  return true
})

const updateStickyState = () => {
  if (props.symbolBehavior !== 'sticky' || !headerRef.value) {
    return
  }

  isSticky.value = window.scrollY >= headerRef.value.offsetTop
}

onMounted(() => {
  if (props.symbolBehavior !== 'sticky') {
    return
  }

  updateStickyState()
  window.addEventListener('scroll', updateStickyState, { passive: true })
  window.addEventListener('resize', updateStickyState)
})

onBeforeUnmount(() => {
  if (props.symbolBehavior !== 'sticky') {
    return
  }

  window.removeEventListener('scroll', updateStickyState)
  window.removeEventListener('resize', updateStickyState)
})
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  height: 60px;
  background: rgb(var(--color-paper));
}

.site-header__nav {
  height: 60px;
  align-items: center;
}

.site-header__context {
  grid-column: 2 / span 2;
  color: rgb(var(--color-ink));
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  text-transform: uppercase;
}

.site-header__action {
  grid-column: 4;
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 900px) {
  .site-header {
    height: auto;
    min-height: 60px;
  }

  .site-header__nav {
    grid-template-columns: 1fr auto;
    padding-left: 64px;
  }

  .site-header__context,
  .site-header__action {
    grid-column: 1;
  }

  .site-header__action {
    grid-column: 2;
  }
}
</style>
