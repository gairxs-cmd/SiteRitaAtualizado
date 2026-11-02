import assert from 'node:assert/strict'
import { readdir, stat } from 'node:fs/promises'
import { after, before, test } from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { build, createServer } from 'vite'
import { whatsappLink } from '../src/config/contact.js'
import { professionalRegistration } from '../src/config/professional.js'
import { reviews } from '../src/data/siteContent.js'
import { specialties } from '../src/data/specialties.js'

let app
let vite

before(async () => {
  vite = await createServer({
    logLevel: 'silent',
    server: { middlewareMode: true },
    appType: 'custom',
  })

  const module = await vite.ssrLoadModule('/src/App.jsx')
  app = module.default
})

after(async () => {
  await vite?.close()
})

function renderApp(pathname = '/') {
  return renderToStaticMarkup(createElement(app, { pathname }))
}

test('apresenta a identidade profissional e a autoridade informada sem manter a marca anterior', () => {
  const markup = renderApp()
  const headings = markup.match(/<h1[\s>]/g) ?? []

  assert.match(markup, /Dra\. Rita de Cássia/)
  assert.match(markup, /Cirurgiã-Dentista/)
  assert.match(markup, /23 anos de carreira/)
  assert.equal(professionalRegistration, 'CRO-SP 79479')
  assert.equal((markup.match(/CRO-SP 79479/g) ?? []).length, 2)
  assert.doesNotMatch(markup, /CRO-XXXXXXX/)
  assert.equal(headings.length, 1)
  assert.doesNotMatch(markup, /Clínica Áurea|AURA Odontologia/)
})

test('apresenta cinco cards de especialidades com Facetas e Lentes no mesmo card', () => {
  const markup = renderApp()
  assert.equal(specialties.length, 5)
  assert.equal((markup.match(/<article class="specialty-card"/g) ?? []).length, 5)
  for (const specialty of specialties) {
    assert.match(markup, new RegExp(`/especialidades/${specialty.slug}`))
    assert.match(markup, new RegExp(specialty.title))
  }
  assert.equal((markup.match(/<h3>Facetas e Lentes Dentais<\/h3>/g) ?? []).length, 1)
  for (const [, contents] of markup.matchAll(/<a class="specialty-card-main"[^>]*>([\s\S]*?)<\/a>/g)) {
    assert.doesNotMatch(contents, /<a[\s>]/)
  }
})

test('usa apenas fotografias reais da Dra. Rita nas três áreas editoriais', () => {
  const markup = renderApp()

  assert.match(markup, /\/images\/hero-dra-rita-mesa\.jpg\.JPG/)
  assert.match(markup, /\/images\/dra-rita-espelho\.jpg\.JPG/)
  assert.match(markup, /\/images\/dra-rita-sorrindo\.jpg\.JPG/)
  assert.equal((markup.match(/<figcaption>Dra\. Rita de Cássia<\/figcaption>/g) ?? []).length, 3)
  const editorialPhotos = [...markup.matchAll(/<figure class="editorial-photo[^>]*>[\s\S]*?<img[^>]*alt="([^"]+)"/g)]
  assert.equal(editorialPhotos.length, 3)
  assert.ok(editorialPhotos.every(([, alt]) => !/ilustrativa/i.test(alt)))
  assert.doesNotMatch(markup, /Modelo em retrato|doutora-(?:hero|apresentacao|retrato)\.jpg/)
})

test('disponibiliza as cinco imagens originais das especialidades sem duplicar os arquivos existentes', async () => {
  const names = await readdir(new URL('../public/images/', import.meta.url))
  const illustrations = ['Harmonizacao.jpg', 'implantes.jpg', 'blefaro-procedimento.jpg.JPG', 'protese.jpg', 'Faceta e lente.jpg']
  assert.equal(names.length, 17)
  assert.ok(illustrations.every((name) => names.includes(name)))
  assert.equal(names.filter((name) => !illustrations.includes(name) && name.endsWith('.jpg.JPG')).length, 12)
  for (const name of names) {
    const photo = await stat(new URL(`../public/images/${name}`, import.meta.url))
    assert.ok(photo.size > 0, `${name} está vazio`)
    if (!illustrations.includes(name)) assert.ok(photo.size < 500_000, `${name} excede 500 KB`)
  }
})

test('mostra a imagem correta em cada card e na página da respectiva especialidade', () => {
  const home = renderApp()
  const images = ['Harmonizacao.jpg', 'implantes.jpg', 'blefaro-procedimento.jpg.JPG', 'protese.jpg', 'Faceta e lente.jpg']
  specialties.forEach((specialty, index) => {
    const src = `/images/${images[index]}`
    const card = home.split('<article class="specialty-card"')[index + 1].split('</article>')[0]
    const detail = renderApp(`/especialidades/${specialty.slug}`)
    assert.ok(specialty.image, `${specialty.title} está sem imagem`)
    assert.equal(specialty.image.src, src)
    assert.ok(card.includes(`src="${encodeURI(src)}"`))
    assert.ok(detail.includes(`src="${encodeURI(src)}"`))
    assert.match(detail, /class="detail-photo/)
  })
})

test('mantém uma única fotografia do Hero entre o título e os detalhes na ordem estrutural', () => {
  const markup = renderApp()
  const intro = markup.indexOf('class="hero-intro"')
  const media = markup.indexOf('class="hero-media"')
  const details = markup.indexOf('class="hero-details"')
  const heroPhoto = markup.match(/src="\/images\/hero-dra-rita-mesa\.jpg\.JPG"/g) ?? []

  assert.ok(intro >= 0)
  assert.ok(media > intro)
  assert.ok(details > media)
  assert.equal(heroPhoto.length, 1)
})

test('isola os hovers do Hero dos elementos transformados pelo GSAP', () => {
  const markup = renderApp()

  assert.match(markup, /class="hero-title-hover"><h1>/)
  assert.equal((markup.match(/class="hero-action-motion"/g) ?? []).length, 2)
  assert.match(markup, /class="hero-signature-motion" data-hero-signature="true"><div class="hero-signature"/)
  assert.doesNotMatch(markup, /<h1 class="hover-heading"/)
})

test('mantém nomes e endereços exatos das duas clínicas e oferece pesquisas no Google Maps', () => {
  const markup = renderApp()
  const mapLinks = markup.match(/class="map-link"/g) ?? []

  assert.match(markup, /NOVO OLHAR/)
  assert.match(markup, /Clínica Affetos/)
  assert.match(markup, /Rua Batista Renzi, 96 — Suzano, São Paulo\./)
  assert.match(markup, /ORAL FACE/)
  assert.match(markup, /Rua Teresa Clementina Tomasine de Freitas, 248/)
  assert.match(markup, /Parque Maria Helena/)
  assert.match(markup, /Suzano — SP/)
  assert.match(markup, /08683-280/)
  assert.equal(mapLinks.length, 2)
  assert.equal((markup.match(/abre em nova aba/g) ?? []).length, 2)
  assert.match(markup, /query_place_id=ChIJaQOPtVN7zpQRdPLKV_oJ3Y8/)
  assert.doesNotMatch(markup, /share\.google\/cKwlGJavrtfVDb5n9/)
})

test('substitui o formulário por contato direto sem links de avaliações externas', () => {
  const markup = renderApp()

  assert.match(markup, /Histórias de confiança\./)
  assert.doesNotMatch(markup, /Ver todas as avaliações no Google|Ver no Google|share\.google\/AQGgt4C2b0n6LNQKT/)
  assert.doesNotMatch(markup, /Nenhum depoimento fictício|Esta área receberá somente avaliações/)
  assert.match(markup, /class="contact-card"/)
  assert.match(markup, /Agendar avaliação pelo WhatsApp/)
  assert.match(markup, /Tirar dúvidas pelo WhatsApp/)
  assert.doesNotMatch(markup, /O contato pelo WhatsApp não confirma automaticamente uma consulta|class="contact-note"/)
  assert.doesNotMatch(markup, /<form|data-demo-form/)
  assert.ok(markup.includes(whatsappLink('appointment').replaceAll('&', '&amp;')))
  assert.ok(markup.includes(whatsappLink('questions').replaceAll('&', '&amp;')))
  assert.doesNotMatch(markup, /canal oficial (?:será|deve ser) incluído/i)
  assert.doesNotMatch(markup, /mailto:|tel:/i)
})

test('mantém exatamente os seis autores fornecidos e comentários escritos completos', () => {
  assert.deepEqual(reviews.map(({ author }) => author), [
    'Neusa Cajaiba', 'Gregory Bastos', 'Alfredo Soares',
    'Fran Rodrigues', 'Andreia Oliveira', 'Kelly Mamed',
  ])
  assert.ok(reviews.every(({ comment }) => comment.trim().length > 0))
  assert.match(reviews[0].comment, /O lugar é esse sem dúvida\.$/)
  assert.match(reviews[2].comment, /Estado de São Paulo e Brasil!$/)
  assert.match(reviews[3].comment, /Deus continue abençoando grandemente\.$/)
  assert.doesNotMatch(JSON.stringify(reviews), /rating|stars|date|avatar/)
})

test('mostra as seis avaliações completas em carrossel com cinco estrelas SVG', () => {
  const section = renderApp().split('<section class="section testimonials"')[1].split('</section>')[0]
  assert.equal((section.match(/<article class="review-card"/g) ?? []).length, 6)
  assert.equal((section.match(/aria-label="5 de 5 estrelas"/g) ?? []).length, 6)
  assert.equal((section.match(/<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2\.5/g) ?? []).length, 30)
  assert.match(section, /Avaliação anterior/)
  assert.match(section, /Próxima avaliação/)
  assert.doesNotMatch(section, /Ler avaliação completa/)
  assert.doesNotMatch(section, /Relatos individuais não representam garantia de resultados/)
  assert.ok(reviews.every(({ comment }) => section.includes(comment.replaceAll('&', '&amp;'))))
  assert.match(section, /Histórias de confiança\./)
  assert.match(section, /Avaliações de pacientes sobre o atendimento\./)
  assert.doesNotMatch(section, /★/)
})

test('coloca as avaliações abaixo da introdução e oferece agendamento nas duas seções', () => {
  const markup = renderApp()
  const specialtiesSection = markup.split('<section class="section specialties"')[1].split('</section>')[0]
  const testimonialsSection = markup.split('<section class="section testimonials"')[1].split('</section>')[0]
  const appointmentHref = whatsappLink('appointment').replaceAll('&', '&amp;')

  assert.ok(testimonialsSection.indexOf('class="testimonials-intro"') < testimonialsSection.indexOf('class="review-list"'))
  assert.match(testimonialsSection, /class="review-list"[^>]*tabindex="0"/)
  const appointmentButton = `class="button button-outline section-cta-button" href="${appointmentHref}" target="_blank" rel="noopener noreferrer">Quero agendar minha consulta`
  assert.ok(specialtiesSection.includes(appointmentButton))
  assert.ok(testimonialsSection.includes(appointmentButton))
  assert.ok(specialtiesSection.indexOf('class="specialties-grid"') < specialtiesSection.indexOf('Quero agendar minha consulta'))
  assert.ok(testimonialsSection.indexOf('class="review-list"') < testimonialsSection.indexOf('Quero agendar minha consulta'))
})

test('remove avisos provisórios da interface', () => {
  const markup = renderApp()
  assert.doesNotMatch(markup, /CRO-XXXXXXX|Projeto demonstrativo|Antes de publicar|Área informada de atuação|versão demonstrativa|regulatory-note/i)
})

test('renderiza as cinco páginas de detalhes com dados e navegação próprios', () => {
  for (const specialty of specialties) {
    const markup = renderApp(`/especialidades/${specialty.slug}`)
    assert.match(markup, new RegExp(`<h1>${specialty.title}</h1>`))
    assert.ok(markup.includes(specialty.summary))
    assert.match(markup, /O que é o procedimento\?/)
    assert.match(markup, /Como funciona a avaliação\?/)
    assert.match(markup, /O que considerar antes do tratamento\?/)
    assert.match(markup, /href="\/#especialidades"/)
    assert.match(markup, /Tirar dúvidas pelo WhatsApp/)
    assert.match(markup, /CRO-SP 79479/)
    assert.doesNotMatch(markup, /detail-gallery|imagem quebrada/)
  }
})

test('entrega o sistema responsivo e acessível no CSS de produção', async () => {
  const result = await build({ logLevel: 'silent', build: { write: false } })
  const output = Array.isArray(result) ? result.flatMap((item) => item.output) : result.output
  const css = output.find((item) => item.type === 'asset' && item.fileName.endsWith('.css'))

  assert.ok(css)
  assert.match(css.source, /\.photo-frame/)
  assert.match(css.source, /\.clinics-grid/)
  assert.match(css.source, /@media \(width<=720px\)/)
  assert.match(css.source, /prefers-reduced-motion:reduce/)
  assert.match(css.source, /min-height:44px/)
  assert.match(css.source, /:focus-visible/)
  assert.match(css.source, /\.contact-card/)
  assert.match(css.source, /\.about-seal\{[^}]*z-index:2/)
  assert.match(css.source, /\.footer-grid a:not\(\.brand\)\{min-height:44px/)
  assert.match(css.source, /--gold-dark:#765b32/)
  assert.match(css.source, /\.button-gold(?:,\.button-dark)?\{[^}]*color:var\(--white\);[^}]*background:#765b32/)
  assert.match(css.source, /(?:\.button-gold,)?\.button-dark\{[^}]*color:var\(--white\);[^}]*background:#765b32/)
  assert.doesNotMatch(css.source, /\.button-gold\{[^}]*linear-gradient/)
  assert.match(css.source, /@media \(hover:hover\) and \(pointer:fine\)/)
  assert.match(css.source, /\.specialty-card:hover \.specialty-card-surface/)
  assert.match(css.source, /\.clinic-card:hover \.clinic-card-surface/)
  assert.match(css.source, /\.editorial-photo:hover \.photo-hover-surface/)
  assert.match(css.source, /\.authority-emblem:hover/)
  assert.match(css.source, /\.contact-card:hover \.contact-card-surface/)
  assert.match(css.source, /grid-template-areas:"intro media"\s*"details media"/)
  assert.match(css.source, /grid-template-areas:"intro"\s*"media"\s*"details"/)
  assert.match(css.source, /\.hero-media\{min-height:0/)
})

test('inclui GSAP e ScrollTrigger no bundle sem impedir renderização por SSR', async () => {
  const result = await build({ logLevel: 'silent', build: { write: false } })
  const output = Array.isArray(result) ? result.flatMap((item) => item.output) : result.output
  const javascript = output
    .filter((item) => item.type === 'chunk')
    .map((item) => item.code)
    .join('\n')

  assert.match(javascript, /ScrollTrigger/)
  assert.match(javascript, /prefers-reduced-motion: no-preference/)
  assert.match(javascript, /\[data-hero-intro\] h1/)
  assert.match(javascript, /\[data-hero-media\] \.photo-frame/)
  assert.match(javascript, /inset\(100% 0% 0% 0%\)/)
  assert.match(javascript, /\[data-hero-details\]/)
  assert.match(javascript, /\[data-hero-signature\]/)
  assert.match(javascript, /\(min-width: 769px\)/)
  assert.match(javascript, /\[data-parallax\]:not\(\[data-hero-media\]\) img/)
})

test('publica metadados institucionais da Dra. Rita sem manter a identidade anterior', async () => {
  const result = await build({ logLevel: 'silent', build: { write: false } })
  const output = Array.isArray(result) ? result.flatMap((item) => item.output) : result.output
  const html = output.find((item) => item.type === 'asset' && item.fileName === 'index.html')

  assert.ok(html)
  assert.match(html.source, /<html lang="pt-BR">/)
  assert.match(html.source, /<title>Dra\. Rita de Cássia \| Cirurgiã-Dentista em Suzano<\/title>/)
  assert.match(html.source, /name="description" content="Site institucional da Dra\. Rita de Cássia/)
  assert.doesNotMatch(html.source, /Clínica Áurea|AURA Odontologia/)
})
