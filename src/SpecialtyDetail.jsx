import { useEffect } from 'react'
import { ArrowIcon } from './components/Icons.jsx'
import { SiteFooter, SiteHeader } from './components/SiteChrome.jsx'
import { whatsappLink } from './config/contact.js'
import './SpecialtyDetail.css'

// TODO: Confirmar habilitações e o escopo de divulgação da blefaroplastia antes da publicação.
export default function SpecialtyDetail({ specialty }) {
  useEffect(() => {
    document.title = `${specialty.title} | Dra. Rita de Cássia`
    document.querySelector('meta[name="description"]')?.setAttribute('content', specialty.summary)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', specialty.summary)
    window.scrollTo(0, 0)
  }, [specialty])

  const information = [
    ['O que é o procedimento?', specialty.what],
    ['Como funciona a avaliação?', specialty.evaluation],
    ['O que considerar antes do tratamento?', specialty.considerations],
  ]

  return (
    <div className="site-shell specialty-detail">
      <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
      <SiteHeader />
      <main id="conteudo">
        <section className="detail-hero">
          <div className={`container detail-hero-grid${specialty.image ? ' has-image' : ''}`}>
            <div className="detail-hero-copy">
              <p className="eyebrow"><span>Especialidade · {specialty.number}</span></p>
              <h1>{specialty.title}</h1>
              <p className="detail-summary">{specialty.summary}</p>
              <div className="detail-actions">
                <a className="button button-dark" href={whatsappLink('questions')} target="_blank" rel="noopener noreferrer">Tirar dúvidas pelo WhatsApp <ArrowIcon /></a>
                <a className="text-link" href="/#especialidades">Voltar às especialidades <ArrowIcon /></a>
              </div>
            </div>
            {specialty.image && (
              <figure className={`detail-photo${specialty.image.fit === 'contain' ? ' is-contain' : ''}`}>
                <img src={encodeURI(specialty.image.src)} alt={specialty.image.alt} width={specialty.image.width} height={specialty.image.height} decoding="async" />
              </figure>
            )}
          </div>
        </section>

        <section className="section detail-information" aria-label={`Informações gerais sobre ${specialty.title}`}>
          <div className="container detail-information-grid">
            <div className="detail-information-intro">
              <p className="eyebrow"><span>Informações gerais</span></p>
              <h2>Uma conversa começa com informação.</h2>
            </div>
            <div className="detail-information-list">
              {information.map(([title, copy], index) => (
                <article key={title}>
                  <span>0{index + 1}</span>
                  <div><h3>{title}</h3><p>{copy}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {specialty.gallery.length > 0 && (
          <section className="section detail-gallery" aria-label={`Fotografias de ${specialty.title}`}>
            <div className="container detail-gallery-grid">
              {specialty.gallery.map((image) => (
                <figure key={image.src}><img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" /></figure>
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
