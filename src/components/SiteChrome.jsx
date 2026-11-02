import { whatsappLink } from '../config/contact.js'
import { professionalRegistration } from '../config/professional.js'

function Brand({ footer = false, home = false }) {
  return (
    <a className={`brand${footer ? ' brand-footer' : ''}`} href={`${home ? '' : '/'}#inicio`} aria-label="Dra. Rita de Cássia — início">
      <span className="brand-monogram" aria-hidden="true">RC</span>
      <span className="brand-copy"><strong>Dra. Rita</strong><small>de Cássia</small></span>
    </a>
  )
}

export function SiteHeader({ home = false }) {
  const section = (id) => `${home ? '' : '/'}#${id}`
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand home={home} />
        <nav className="main-nav" aria-label="Navegação principal">
          <a href={section('sobre')}>Sobre</a>
          <a href={section('especialidades')}>Especialidades</a>
          <a href={section('clinicas')}>Clínicas</a>
          <a href={section('faq')}>Dúvidas</a>
        </nav>
        <a className="button button-gold header-cta" href={whatsappLink()} target="_blank" rel="noopener noreferrer">Agendar pelo WhatsApp</a>
      </div>
    </header>
  )
}

export function SiteFooter({ home = false }) {
  const section = (id) => `${home ? '' : '/'}#${id}`
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-intro"><Brand footer home={home} /><p>Cirurgiã-Dentista · 23 anos de carreira</p><p>{professionalRegistration}</p></div>
        <div><h2>Novo Olhar</h2><p>Clínica Affetos</p><p>Rua Batista Renzi, 96 — Suzano, São Paulo.</p></div>
        <div><h2>Oral Face</h2><p>Rua Teresa Clementina Tomasine de Freitas, 248</p><p>Parque Maria Helena · Suzano — SP · CEP: 08683-280</p></div>
        <div><h2>Navegação</h2><a href={section('sobre')}>Sobre</a><a href={section('especialidades')}>Especialidades</a><a href={section('clinicas')}>Clínicas</a><a href={section('faq')}>FAQ</a></div>
      </div>
      <div className="container footer-bottom"><p>© 2026 Dra. Rita de Cássia</p><a href={section('inicio')}>Voltar ao topo ↑</a></div>
    </footer>
  )
}
