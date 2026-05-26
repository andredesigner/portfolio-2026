type TweenOptions = gsap.TweenVars

type ScrollAnimationOptions = TweenOptions & {
  trigger?: Element | string
  start?: string
  end?: string
  scrub?: boolean | number
}

type PageMotionCleanup = () => void

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

  const initPageMotion = async (root: ParentNode = document): Promise<PageMotionCleanup> => {
    if (import.meta.server) {
      return () => {}
    }

    const motionTargets = Array.from(root.querySelectorAll<HTMLElement>('[data-motion]'))
    if (!motionTargets.length) {
      return () => {}
    }

    const [{ gsap }, { ScrollTrigger }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ])

    gsap.registerPlugin(ScrollTrigger)

    if (prefersReducedMotion()) {
      gsap.set(motionTargets, {
        autoAlpha: 1,
        clearProps: 'transform'
      })

      return () => {}
    }

    const context = gsap.context(() => {
      motionTargets.forEach((target) => {
        if (target.hasAttribute('data-motion-item') && target.closest('[data-motion-group]') !== target) {
          return
        }

        const motionType = target.dataset.motion || 'reveal'
        if (motionType === 'about-title') {
          return
        }

        const duration = Number(target.dataset.motionDuration || 0.9)
        const delay = Number(target.dataset.motionDelay || 0)
        const stagger = Number(target.dataset.motionStagger || 0.04)
        const y = Number(target.dataset.motionY || 16)
        const itemTargets = target.hasAttribute('data-motion-group')
          ? Array.from(target.querySelectorAll<HTMLElement>('[data-motion-item]'))
          : [target]

        if (!itemTargets.length) {
          return
        }

        gsap.fromTo(
          itemTargets,
          {
            autoAlpha: 0,
            y
          },
          {
            autoAlpha: 1,
            y: 0,
            duration,
            delay,
            ease: 'power1.out',
            stagger: motionType === 'group' ? stagger : 0,
            scrollTrigger: {
              trigger: target,
              start: target.dataset.motionStart || 'top 85%',
              once: true
            }
          }
        )
      })
    })

    return () => {
      context.revert()
    }
  }

  return {
    animateIn,
    initPageMotion,
    scroll
  }
}
