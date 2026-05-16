<template>
  <header ref="headerRef" class="site-header">
    <BrandSymbol
      v-if="symbolBehavior !== 'hidden'"
      class="site-header__symbol"
      :class="[
        `site-header__symbol--${symbolBehavior}`,
        { 'site-header__symbol--visible': shouldShowSymbol }
      ]"
    />
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
const isSticky = ref(props.symbolBehavior === 'always')
let stickyStart = 0
let symbolScrollAnimation: gsap.core.Tween | null = null
let symbolScrollTrigger: { kill: () => void } | null = null

const actionLabel = computed(() => props.actionLabel || (isCaseDetail.value ? 'Fechar' : 'Contato'))
const actionHref = computed(() => props.actionHref || (isCaseDetail.value ? '/' : '#contact'))
const context = computed(() => props.context.trim())
const symbolBehavior = computed(() => props.symbolBehavior)
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

  if (props.symbolRevealTarget) {
    const revealTarget = document.querySelector<HTMLElement>(props.symbolRevealTarget)

    if (revealTarget) {
      isSticky.value = revealTarget.getBoundingClientRect().bottom <= 0
      return
    }
  }

  isSticky.value = window.scrollY >= stickyStart - 1
}

const updateStickyStart = () => {
  stickyStart = headerRef.value?.offsetTop ?? stickyStart
  updateStickyState()
}

onMounted(() => {
  if (props.symbolBehavior !== 'sticky') {
    return
  }

  stickyStart = headerRef.value?.offsetTop ?? 0
  updateStickyState()
  window.addEventListener('scroll', updateStickyState, { passive: true })
  window.addEventListener('resize', updateStickyStart)

  if (import.meta.server || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const symbol = headerRef.value?.querySelector<HTMLElement>('.site-header__symbol')
  const revealTarget = props.symbolRevealTarget
    ? document.querySelector<HTMLElement>(props.symbolRevealTarget)
    : null

  if (!symbol) {
    return
  }

  Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger')
  ]).then(([{ gsap }, { ScrollTrigger }]) => {
    gsap.registerPlugin(ScrollTrigger)

    symbolScrollAnimation = gsap.fromTo(
      symbol,
      { y: 0, yPercent: -100 },
      {
        y: 0,
        yPercent: 0,
        ease: 'none',
        paused: true,
        overwrite: true,
        immediateRender: false
      }
    )

    const trigger = ScrollTrigger.create({
      trigger: revealTarget || headerRef.value || symbol,
      start: revealTarget ? 'bottom top' : 'top top',
      end: revealTarget ? 'bottom+=72 top' : 'top+=72 top',
      scrub: true,
      animation: symbolScrollAnimation,
      onUpdate: self => {
        isSticky.value = self.progress > 0
      },
      onLeave: () => {
        isSticky.value = true
      },
      onLeaveBack: () => {
        isSticky.value = false
      }
    })

    symbolScrollTrigger = trigger
    trigger.refresh()
  })
})

watch(shouldShowSymbol, async isVisible => {
  if (props.symbolBehavior !== 'sticky' || symbolScrollAnimation || import.meta.server) {
    return
  }

  await nextTick()

  const symbol = headerRef.value?.querySelector<HTMLElement>('.site-header__symbol')

  if (!symbol) {
    return
  }

  const { gsap } = await import('gsap')

  gsap.to(symbol, {
    yPercent: isVisible ? 0 : -100,
    duration: 0.42,
    ease: 'power3.out',
    overwrite: true
  })
})

onMounted(async () => {
  if (props.symbolBehavior !== 'always' || import.meta.server) {
    return
  }

  await nextTick()

  const symbol = headerRef.value?.querySelector<HTMLElement>('.site-header__symbol')

  if (!symbol) {
    return
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    symbol.style.transform = 'translate3d(0, 0, 0)'
    return
  }

  const { gsap } = await import('gsap')

  gsap.fromTo(
    symbol,
    { yPercent: -100 },
    {
      yPercent: 0,
      duration: 0.42,
      ease: 'power3.out',
      overwrite: true
    }
  )
})

onBeforeUnmount(() => {
  if (props.symbolBehavior !== 'sticky') {
    return
  }

  window.removeEventListener('scroll', updateStickyState)
  window.removeEventListener('resize', updateStickyStart)
  symbolScrollTrigger?.kill()
  symbolScrollAnimation?.kill()
  symbolScrollTrigger = null
  symbolScrollAnimation = null
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

.site-header__symbol {
  pointer-events: none;
  transform: translate3d(0, -100%, 0);
  will-change: transform;
}

.site-header__symbol--visible {
  pointer-events: auto;
}

.site-header__symbol--always.site-header__symbol--visible {
  transform: translate3d(0, 0, 0);
}

.site-header__context {
  grid-column: 2 / span 2;
  color: rgb(var(--color-ink));
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
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
