type TweenOptions = gsap.TweenVars

type ScrollAnimationOptions = TweenOptions & {
  trigger?: Element | string
  start?: string
  end?: string
  scrub?: boolean | number
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const useMotion = () => {
  const animateIn = async (target: Element | null, options: TweenOptions = {}) => {
    if (!target || import.meta.server || prefersReducedMotion()) {
      return
    }

    const { gsap } = await import('gsap')

    return gsap.from(target, {
      autoAlpha: 0,
      y: 12,
      duration: 0.7,
      ease: 'power3.out',
      ...options
    })
  }

  const scroll = async (target: Element | null, options: ScrollAnimationOptions = {}) => {
    if (!target || import.meta.server || prefersReducedMotion()) {
      return
    }

    const [{ gsap }, { ScrollTrigger }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ])

    gsap.registerPlugin(ScrollTrigger)

    return gsap.to(target, {
      ease: 'none',
      scrollTrigger: {
        trigger: options.trigger || target,
        start: options.start || 'top bottom',
        end: options.end || 'bottom top',
        scrub: options.scrub ?? true
      },
      ...options
    })
  }

  return {
    animateIn,
    scroll
  }
}
