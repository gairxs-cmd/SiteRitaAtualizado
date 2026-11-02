import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger)
}

export function usePageAnimations(scope) {
  useGSAP(
    () => {
      if (typeof window === 'undefined') return undefined

      const root = scope.current
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: reduce)', () => {
        root?.setAttribute('data-motion-status', 'reduced')
      })

      try {
        media.add('(prefers-reduced-motion: no-preference)', () => {
        root?.setAttribute('data-motion-status', 'active')
        const running = new Set()
        const observed = new Set()
        const onEnter = (trigger, createAnimation, start = 'top 82%') => {
          const element = typeof trigger === 'string' ? root?.querySelector(trigger) : trigger
          if (!element) return
          element.setAttribute('data-motion-state', 'pending')
          observed.add(element)
          ScrollTrigger.create({
            trigger: element,
            start,
            once: true,
            onEnter: () => {
              try {
                element.setAttribute('data-motion-state', 'running')
                const animation = createAnimation()
                if (animation) {
                  running.add(animation)
                  animation.eventCallback('onComplete', () => element.setAttribute('data-motion-state', 'complete'))
                } else {
                  element.setAttribute('data-motion-state', 'complete')
                }
              } catch (error) {
                element.setAttribute('data-motion-state', 'error')
                gsap.set([element, ...element.querySelectorAll('*')], { clearProps: 'all' })
                console.error('Falha em uma animação de rolagem:', error)
              }
            },
          })
        }
        const reveals = gsap.utils.toArray('[data-reveal]').filter((element) =>
          !element.matches('.specialty-card, .clinic-card, .contact-card') && !element.closest('.differentials-list'))
        const headings = gsap.utils.toArray('[data-heading]')
        const photos = gsap.utils.toArray('[data-photo]:not(.hero-photo)')
        const mobile = window.matchMedia('(max-width: 768px)').matches
        const travel = mobile ? 28 : 50

        const heroTimeline = gsap.timeline({
          defaults: { ease: 'power3.out' },
        })

        heroTimeline
          .from('[data-hero-intro] .eyebrow', {
            autoAlpha: 0,
            y: 18,
            duration: 0.45,
          })
          .from('[data-hero-intro] h1', {
            autoAlpha: 0,
            y: 34,
            duration: 0.72,
          }, '-=0.24')
          .from('[data-hero-media] .photo-frame', {
            clipPath: 'inset(100% 0% 0% 0%)',
            duration: 0.82,
            ease: 'power2.out',
          }, '-=0.26')
          .from('[data-hero-media] img', {
            scale: 1.12,
            duration: 1.08,
            ease: 'power2.out',
          }, '<')
          .from('[data-hero-media] figcaption, [data-hero-media] .vertical-note', {
            autoAlpha: 0,
            duration: 0.35,
          }, '-=0.42')
          .from('[data-hero-details] .hero-description', {
            autoAlpha: 0,
            y: 22,
            duration: 0.5,
          }, '-=0.5')
          .from('[data-hero-details] .hero-actions > *', {
            autoAlpha: 0,
            y: 18,
            duration: 0.42,
            stagger: 0.09,
          }, '-=0.36')
          .from('[data-hero-signature]', {
            autoAlpha: 0,
            y: 16,
            duration: 0.48,
          }, '-=0.24')

        onEnter('.authority', () => gsap.timeline({ defaults: { ease: 'power3.out' } })
          .from('.authority-number', { autoAlpha: 0, y: mobile ? 28 : 50, scale: 0.9, duration: 0.9 })
          .from('.authority-rule', { scaleX: 0, duration: 0.55 }, '-=0.38')
          .from('.authority-line > span', { autoAlpha: 0, yPercent: 105, duration: 0.68, stagger: 0.13 }, '-=0.22')
          .from('.authority-tags span', { autoAlpha: 0, y: 18, duration: 0.46, stagger: 0.1 }, '-=0.28'), 'top 78%')

        const reviewsIntro = root?.querySelector('.testimonials-intro')
        const reviewsColumn = root?.querySelector('.reviews-column')
        onEnter(reviewsIntro, () => gsap.timeline({ defaults: { ease: 'power3.out' } })
          .fromTo(reviewsIntro.querySelector('.eyebrow'), { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.5 })
          .fromTo(reviewsIntro.querySelector('h2'), { autoAlpha: 0, y: mobile ? 24 : 32 },
            { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.22')
          .fromTo(reviewsIntro.querySelector('p:last-child'), { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.55 }, '-=0.35'))
        onEnter(reviewsColumn, () => gsap.fromTo(
          reviewsColumn.querySelectorAll('.review-card-surface'),
          { autoAlpha: 0, y: mobile ? 18 : 26 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out' },
        ), 'top 88%')

        ScrollTrigger.create({
          start: 32,
          onUpdate: (self) => {
            scope.current?.querySelector('.site-header')?.classList.toggle('is-scrolled', self.scroll() > 32)
          },
        })

        headings.forEach((heading) => {
          const words = heading.querySelectorAll('.heading-word-mask > span')
          onEnter(heading, () => gsap.timeline()
            .fromTo(heading.querySelector('.eyebrow'), { autoAlpha: 0, x: -20 },
              { autoAlpha: 1, x: 0, duration: 0.55, ease: 'power2.out' })
            .fromTo(words, { autoAlpha: 0, y: travel },
              { autoAlpha: 1, y: 0, duration: 0.8, stagger: mobile ? 0.035 : 0.065,
                ease: 'power3.out' }, '-=0.32'))
        })

        for (const selector of ['.specialties-grid', '.clinics-grid', '.differentials-list']) {
          const group = scope.current?.querySelector(selector)
          if (!group) continue
          const cards = group.querySelectorAll('article')
          onEnter(group, () => gsap.fromTo(cards,
            { autoAlpha: 0, y: mobile ? 24 : 35 },
            { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.12,
              ease: 'power3.out' }))
        }

        reveals.forEach((element) => {
          onEnter(element, () => gsap.fromTo(
            element,
            { autoAlpha: 0, y: mobile ? 24 : 35 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
            },
          ))
        })

        photos.forEach((element) => {
          const frame = element.querySelector('.photo-frame')
          const image = frame?.querySelector('img')
          if (!frame || !image) return
          onEnter(element, () => gsap.timeline()
            .fromTo(frame, { clipPath: 'inset(100% 0% 0% 0%)' },
              { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.05, ease: 'power3.out' })
            .fromTo(image, { scale: 1.12 }, { scale: 1, duration: 1.1, ease: 'power2.out' }, '<'), 'top 78%')
        })

        const desktop = gsap.matchMedia()
        desktop.add('(min-width: 769px)', () => {
          gsap.utils.toArray('[data-parallax]:not([data-hero-media]) img').forEach((image) => {
            gsap.to(image, {
              yPercent: 2.5,
              ease: 'none',
              scrollTrigger: {
                trigger: image.closest('[data-photo]'),
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.7,
              },
            })
          })
        })

        let active = true
        const refresh = () => {
          if (active) ScrollTrigger.refresh()
        }
        const frame = window.requestAnimationFrame(refresh)
        window.addEventListener('load', refresh, { once: true })
        document.fonts?.ready.then(refresh)

        return () => {
          active = false
          window.cancelAnimationFrame(frame)
          window.removeEventListener('load', refresh)
          running.forEach((animation) => animation.revert())
          observed.forEach((element) => element.removeAttribute('data-motion-state'))
          heroTimeline.kill()
          desktop.revert()
        }
        })
      } catch (error) {
        media.revert()
        root?.setAttribute('data-motion-status', 'fallback')
        console.error('Falha ao inicializar as animações da página:', error)
      }

      return () => media.revert()
    },
    { scope },
  )
}
