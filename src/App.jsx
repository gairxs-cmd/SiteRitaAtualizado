import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowIcon, PinIcon, SparkIcon, StarIcon, WhatsAppIcon } from './components/Icons.jsx'
import { SiteFooter, SiteHeader } from './components/SiteChrome.jsx'
import { whatsappLink } from './config/contact.js'
import { professionalRegistration } from './config/professional.js'
import { clinics, faqItems, reviews } from './data/siteContent.js'
import { specialties } from './data/specialties.js'
import { usePageAnimations } from './hooks/usePageAnimations.js'
import SpecialtyDetail from './SpecialtyDetail.jsx'
import './App.css'

function ImageFigure({ src, width, height, alt, className = '', priority = false }) {
  return (
    <figure className={`editorial-photo ${className}`} data-photo>
      <div className="photo-hover-surface">
        <div className="photo-frame">
          <img
            src={src}
            width={width}
            height={height}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
          />
        </div>
      </div>
      <figcaption>Dra. Rita de Cássia</figcaption>
    </figure>
  )
}

function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`section-heading section-heading-${align} hover-heading`} data-heading>
      <p className="eyebrow"><span>{eyebrow}</span></p>
      <h2>{title.split(' ').map((word, index) => <span className="heading-word-mask" key={`${word}-${index}`}><span>{word}{' '}</span></span>)}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  )
}

function SpecialtyCard({ item }) {
  return (
    <article className="specialty-card" data-reveal>
      <div className="specialty-card-surface hover-card">
        <div className="specialty-topline"><span>{item.number}</span><span>{item.shortTitle}</span></div>
        <a className="specialty-card-main" href={`/especialidades/${item.slug}`} aria-label={`Conhecer ${item.title}`}>
          <div className="specialty-card-visual">
            <div className="specialty-mark" aria-hidden="true"><SparkIcon /></div>
            <div className={`specialty-card-photo${item.image.fit === 'contain' ? ' is-contain' : ''}`}>
              <img src={encodeURI(item.image.src)} alt={item.image.alt} width={item.image.width} height={item.image.height} loading="lazy" decoding="async" />
            </div>
          </div>
          <h3>{item.title}</h3>
          <p>{item.cardDescription}</p>
        </a>
        <a className="specialty-contact" href={whatsappLink()} target="_blank" rel="noopener noreferrer">Conversar na avaliação <ArrowIcon /></a>
      </div>
    </article>
  )
}

function ClinicCard({ clinic, index }) {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.mapQuery)}${clinic.mapPlaceId ? `&query_place_id=${encodeURIComponent(clinic.mapPlaceId)}` : ''}`

  return (
    <article className={`clinic-card clinic-card-${index + 1}`} data-reveal>
      <div className="clinic-card-surface hover-card">
        <div className="clinic-card-head">
          <span className="clinic-index">0{index + 1}</span>
          <PinIcon />
        </div>
        <p className="clinic-eyebrow">{clinic.eyebrow}</p>
        <h3>{clinic.name}</h3>
        {clinic.location && <p className="clinic-location">{clinic.location}</p>}
        <address>
          {clinic.addressLines.map((line) => <span key={line}>{line}</span>)}
        </address>
        <a className="map-link" href={mapUrl} target="_blank" rel="noopener noreferrer">
          Como chegar <span className="sr-only">(abre em nova aba)</span> <ArrowIcon />
        </a>
      </div>
    </article>
  )
}

function ReviewCard({ review, index }) {
  return (
    <article className="review-card" aria-label={`Avaliação de ${review.author}`}>
      <div className="review-card-surface">
        <div className="review-card-head">
          <span className="review-index">0{index + 1}</span>
          <span className="review-source">Google</span>
        </div>
        <div className="review-stars" role="img" aria-label="5 de 5 estrelas">
          {Array.from({ length: 5 }, (_, star) => <StarIcon key={star} />)}
        </div>
        <h3>{review.author}</h3>
        <p className="review-comment">{review.comment}</p>
      </div>
    </article>
  )
}

function ReviewsCarousel() {
  const trackRef = useRef(null)
  const [position, setPosition] = useState({ index: 0, visible: 2, atStart: true, atEnd: false })

  const updatePosition = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const first = track.querySelector('.review-card')
    if (!first) return
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0
    const stride = first.getBoundingClientRect().width + gap
    setPosition({
      index: Math.round(track.scrollLeft / stride),
      visible: Math.max(1, Math.round((track.clientWidth + gap) / stride)),
      atStart: track.scrollLeft <= 2,
      atEnd: track.scrollLeft + track.clientWidth >= track.scrollWidth - 2,
    })
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined
    const observer = new ResizeObserver(updatePosition)
    observer.observe(track)
    track.addEventListener('scroll', updatePosition, { passive: true })
    updatePosition()
    return () => {
      observer.disconnect()
      track.removeEventListener('scroll', updatePosition)
    }
  }, [updatePosition])

  const move = (direction) => {
    const track = trackRef.current
    const first = track?.querySelector('.review-card')
    if (!track || !first) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0
    const stride = first.getBoundingClientRect().width + gap
    const visible = Math.max(1, Math.round((track.clientWidth + gap) / stride))
    const index = Math.max(0, Math.min(position.index + direction, reviews.length - visible))
    setPosition({ index, visible, atStart: index === 0, atEnd: index === reviews.length - visible })
    track.scrollTo({ left: index * stride, behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <div className="reviews-column">
      <div className="review-list" id="review-list" ref={trackRef} role="region" aria-roledescription="carrossel" aria-label="Avaliações de pacientes" tabIndex={0}>
        {reviews.map((review, index) => <ReviewCard review={review} index={index} key={review.author} />)}
      </div>
      <div className="reviews-navigation">
        <span aria-live="polite">{String(position.index + 1).padStart(2, '0')}–{String(Math.min(position.index + position.visible, reviews.length)).padStart(2, '0')} / {String(reviews.length).padStart(2, '0')}</span>
        <div>
          <button type="button" onClick={() => move(-1)} disabled={position.atStart} aria-label="Avaliação anterior">←</button>
          <button type="button" onClick={() => move(1)} disabled={position.atEnd} aria-label="Próxima avaliação">→</button>
        </div>
      </div>
    </div>
  )
}

function HomePage() {
  const pageRef = useRef(null)
  usePageAnimations(pageRef)

  return (
    <div className="site-shell" ref={pageRef}>
      <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>

      <SiteHeader home />

      <main id="conteudo">
        <section className="hero" id="inicio">
          <div className="container hero-grid">
            <div className="hero-intro" data-hero-intro>
              <p className="eyebrow"><span>Cirurgiã-Dentista · {professionalRegistration}</span></p>
              <div className="hero-title-hover">
                <h1><span>Cuidado que</span> <em>acolhe.</em><br />Experiência que inspira.</h1>
              </div>
            </div>

            <div className="hero-media" data-hero-media data-parallax>
              <div className="hero-gold-disc" aria-hidden="true" />
              <ImageFigure src="/images/hero-dra-rita-mesa.jpg.JPG" width="2400" height="1600" alt="Dra. Rita de Cássia em sua mesa de trabalho" className="hero-photo" priority />
              <span className="vertical-note" aria-hidden="true">Estética · Precisão · Cuidado</span>
            </div>

            <div className="hero-details" data-hero-details>
              <p className="hero-description">Uma trajetória dedicada ao cuidado, à escuta e ao planejamento individualizado em cada atendimento.</p>
              <div className="hero-actions">
                <span className="hero-action-motion">
                  <a className="button button-dark hero-whatsapp" href={whatsappLink()} target="_blank" rel="noopener noreferrer">Agendar pelo WhatsApp <ArrowIcon /></a>
                </span>
                <span className="hero-action-motion">
                  <a className="text-link" href="#sobre">Conheça a trajetória</a>
                </span>
              </div>
              <div className="hero-signature-motion" data-hero-signature>
                <div className="hero-signature">
                  <span>23</span><p><strong>anos de carreira</strong><small>Trajetória profissional</small></p>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-scroll" aria-hidden="true"><span /> Role para descobrir</div>
        </section>

        <section className="intro-strip" aria-label="Informações profissionais">
          <div className="container intro-strip-grid">
            <p className="hover-info"><span>01</span>Dra. Rita de Cássia</p>
            <p className="hover-info"><span>02</span>Cirurgiã-Dentista</p>
            <p className="hover-info"><span>03</span>Oral Face &amp; Novo Olhar</p>
          </div>
        </section>

        <section className="section about" id="sobre">
          <div className="container about-grid">
            <div className="about-media" data-parallax>
              <ImageFigure src="/images/dra-rita-espelho.jpg.JPG" width="2400" height="1600" alt="Dra. Rita de Cássia em seu ambiente de atendimento" className="about-photo" />
              <div className="about-seal" aria-hidden="true"><span>23</span> anos</div>
            </div>
            <div className="about-copy">
              <SectionHeading eyebrow="Sobre a profissional" title="Experiência, presença e um olhar atento a cada história." />
              <div className="about-body" data-reveal>
                <p className="about-lead">Dra. Rita de Cássia é Cirurgiã-Dentista e construiu uma trajetória de 23 anos pautada pela proximidade e pelo cuidado individual.</p>
                <p>Proprietária das clínicas Oral Face e Novo Olhar, reúne experiência profissional e atenção individual em cada conversa sobre cuidado odontológico.</p>
                <a className="text-link" href="#especialidades">Ver áreas de atuação <ArrowIcon /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="section specialties" id="especialidades">
          <div className="container">
            <SectionHeading
              eyebrow="Áreas de atuação"
              title="Um olhar integrado para face, sorriso e expressão."
              description="Conheça as áreas abordadas e como funciona a avaliação individual."
              align="center"
            />
            <div className="specialties-grid">
              {specialties.map((item) => <SpecialtyCard item={item} key={item.number} />)}
            </div>
            <div className="section-cta">
              <a className="button button-outline section-cta-button" href={whatsappLink('appointment')} target="_blank" rel="noopener noreferrer">Quero agendar minha consulta <ArrowIcon /></a>
            </div>
          </div>
        </section>

        <section className="section differentials">
          <div className="container differentials-grid">
            <div className="differentials-copy">
              <SectionHeading eyebrow="Diferenciais profissionais" title="Cuidado construído com tempo, escuta e consistência." />
            </div>
            <div className="differentials-list">
              <article className="hover-info" data-reveal><span>01</span><h3>23 anos de carreira</h3><p>Uma trajetória dedicada ao atendimento odontológico e à relação com cada paciente.</p></article>
              <article className="hover-info" data-reveal><span>02</span><h3>Atuação em duas clínicas</h3><p>Atendimentos nas clínicas Oral Face e Novo Olhar, em Suzano.</p></article>
              <article className="hover-info" data-reveal><span>03</span><h3>Atendimento individual</h3><p>Escuta, clareza e planejamento orientam a conversa sobre cada atendimento.</p></article>
            </div>
          </div>
        </section>

        <section className="section clinics" id="clinicas">
          <div className="container">
            <SectionHeading eyebrow="Nossas clínicas" title="Dois espaços, a mesma presença profissional." description="Consulte os endereços informados e abra a pesquisa correspondente no Google Maps." />
            <div className="clinics-grid">
              {clinics.map((clinic, index) => <ClinicCard clinic={clinic} index={index} key={clinic.name} />)}
            </div>
          </div>
        </section>

        <section className="authority">
          <div className="container authority-grid">
            <div className="authority-copy">
              <p className="eyebrow eyebrow-light"><span>Trajetória profissional</span></p>
              <div className="authority-statement">
                <div className="authority-emblem hover-number">
                  <p className="authority-number">23</p>
                  <span className="authority-rule" aria-hidden="true" />
                </div>
                <h2 className="hover-heading"><span className="authority-line"><span>anos de carreira</span></span><span className="authority-line"><span>dedicados ao cuidado.</span></span></h2>
              </div>
              <div className="authority-tags" aria-label="Áreas de atuação">
                <span>HOF</span><span>Implantodontia</span><span>Blefaroplastia</span>
              </div>
            </div>
            <div className="authority-media" data-parallax>
              <ImageFigure src="/images/dra-rita-sorrindo.jpg.JPG" width="2400" height="1600" alt="Retrato da Dra. Rita de Cássia sorrindo" className="authority-photo" />
            </div>
          </div>
        </section>

        <section className="section testimonials" aria-labelledby="depoimentos-titulo">
          <div className="container testimonials-grid">
            <div className="testimonials-intro">
              <p className="eyebrow"><span>Experiências reais</span></p>
              <h2 className="hover-heading" id="depoimentos-titulo">Histórias de confiança.</h2>
              <p>Avaliações de pacientes sobre o atendimento.</p>
            </div>
            <ReviewsCarousel />
            <div className="section-cta section-cta-reviews">
              <a className="button button-outline section-cta-button" href={whatsappLink('appointment')} target="_blank" rel="noopener noreferrer">Quero agendar minha consulta <ArrowIcon /></a>
            </div>
          </div>
        </section>

        <section className="section faq" id="faq">
          <div className="container faq-grid">
            <SectionHeading eyebrow="Informações importantes" title="Dúvidas antes de conversar." description="Respostas objetivas para planejar seu contato." />
            <div className="faq-list">
              {faqItems.map((item, index) => (
                <details key={item.question} data-reveal>
                  <summary><span>0{index + 1}</span>{item.question}<i aria-hidden="true">+</i></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact" id="contato">
          <div className="container contact-grid">
            <div className="contact-copy">
              <SectionHeading eyebrow="Contato e agendamento" title="O primeiro passo é uma conversa cuidadosa." />
              <p>Uma conversa é o primeiro passo para conhecer os atendimentos e solicitar uma avaliação. Escolha o assunto e fale diretamente pelo WhatsApp.</p>
            </div>
            <div className="contact-card" data-reveal>
              <div className="contact-card-surface hover-info">
                <div className="contact-card-icon"><WhatsAppIcon /></div>
                <p className="contact-card-kicker">Contato direto</p>
                <h3>Fale com nossa equipe</h3>
                <p>Agende sua avaliação ou esclareça suas dúvidas diretamente pelo WhatsApp, de forma rápida e prática.</p>
                <div className="contact-card-actions">
                  <a className="button button-gold" href={whatsappLink('appointment')} target="_blank" rel="noopener noreferrer"><WhatsAppIcon />Agendar avaliação pelo WhatsApp <ArrowIcon /></a>
                  <a className="button button-outline" href={whatsappLink('questions')} target="_blank" rel="noopener noreferrer"><WhatsAppIcon />Tirar dúvidas pelo WhatsApp <ArrowIcon /></a>
                </div>
                <span className="contact-card-footnote">Você será direcionado ao WhatsApp em uma nova aba.</span>
              </div>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter home />
    </div>
  )
}

function App({ pathname = typeof window === 'undefined' ? '/' : window.location.pathname }) {
  const slug = pathname.match(/^\/especialidades\/([^/]+)\/?$/)?.[1]
  const specialty = specialties.find((item) => item.slug === slug)
  return specialty ? <SpecialtyDetail specialty={specialty} /> : <HomePage />
}

export default App
