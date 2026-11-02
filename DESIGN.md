# Design System — Dra. Rita de Cássia

## Direção

Site institucional editorial, feminino e premium para uma cirurgiã-dentista com 23 anos de carreira. A linguagem combina branco quente, dourado fosco, grafite e fotografia ampla, evitando tanto o visual hospitalar genérico quanto o luxo excessivamente ornamental.

## Referência estudada

- Fonte: https://barbas.digital/portfolio/dra-virginia-pires/
- Captura: desktop, 1440 × 1000, página completa, consultada em 01/11/2026 via Firecrawl.
- Evidências extraídas: uso de Space Grotesk e Raleway; títulos próximos de 88 px; fundo branco; escala tipográfica forte; fotografia em grandes áreas; sequência editorial com poucas bordas e controles discretos.
- Limitação: a captura integral foi obtida como URL assinada, mas o ambiente não conseguiu abrir seus pixels diretamente. A análise visual detalhada foi complementada pelas imagens da página listadas no HTML e pelos dados de branding; portanto, espaçamentos da referência são estimativas, não medidas exatas.

O novo projeto não replica layouts, textos, marcas ou componentes da referência. Ele aproveita apenas princípios gerais: escala, respiro, protagonismo fotográfico e ritmo editorial.

## Tokens propostos

- `--paper`: `#fbfaf7` — fundo principal.
- `--white`: `#ffffff` — cartões e áreas de contraste.
- `--ink`: `#23201d` — texto principal.
- `--muted`: `#716b65` — texto secundário.
- `--gold`: `#a9874f` — ações e detalhes.
- `--gold-dark`: `#7d6238` — texto dourado com contraste.
- `--champagne`: `#eee5d6` — fundos suaves.
- `--line`: `rgba(80, 67, 50, 0.16)` — divisórias.
- Títulos: `Cormorant Garamond`, com fallback Georgia, usando fonte local/remota apenas se já disponível; implementação inicial usa fallback seguro para não criar dependência externa.
- Texto: `Inter`, `Segoe UI`, Arial, sans-serif.
- Container: 1240 px; grid de 12 colunas implícitas; espaços de seção entre 96 e 148 px.
- Bordas: 0–2 px nos blocos editoriais e 999 px em botões; sombras amplas e discretas apenas em fotografias/cartões flutuantes.

## Componentes

- Header translúcido com assinatura tipográfica e CTA dourado.
- Hero dividido: título editorial e retrato vertical com legenda de imagem ilustrativa.
- Marcador de autoridade “23 anos” sobreposto sem alegações adicionais.
- Seções com rótulo pequeno em caixa alta, título serifado e corpo de leitura curta.
- Cards de especialidade numerados com microinteração de linha dourada.
- Dois cards de clínica com endereços exatos e links de pesquisa no Google Maps.
- Área de depoimentos vazia e honesta, reservada para conteúdo real autorizado.
- FAQ com `details/summary`.
- Formulário demonstrativo sem submissão, contato inventado ou captura de dados.

## Tratamento das imagens

- `/images/doutora-hero.jpg`: hero, enquadramento amplo e prioritário.
- `/images/doutora-apresentacao.jpg`: seção de trajetória, carregamento tardio.
- `/images/doutora-retrato.jpg`: seção de autoridade, corte mais fechado.
- Todas recebem legenda discreta “Imagem ilustrativa — substituir por fotografia oficial antes da publicação”.
- Não usar nome, `alt` ou legenda que identifique a modelo como Dra. Rita.
- Arquivos de origem têm entre 3859 × 5789 e 4000 × 6000 px, cerca de 1,9 MB cada. Usar dimensões explícitas, `object-fit`, `decoding="async"`, prioridade somente no hero e `loading="lazy"` nas demais; gerar derivados WebP/AVIF antes da publicação quando houver pipeline de imagem aprovado.
- Confirmar licença, autorização e proveniência das imagens antes da publicação.

## Contrato factual imutável

- Nome: Dra. Rita de Cássia.
- Profissão: Cirurgiã-Dentista.
- Registro provisório: CRO-XXXXXXX.
- Experiência: 23 anos de carreira.
- Áreas informadas, a validar antes de publicar: Harmonização Orofacial (HOF), Implantodontia e Blefaroplastia.
- NOVO OLHAR — local de atendimento: Clínica Affetos. Endereço: Rua Batista Renzi, 96 — Suzano, São Paulo.
- ORAL FACE — Rua Teresa Clementina Tomasine de Freitas, 248. Bairro: Parque Maria Helena. Cidade: Suzano — SP. CEP: 08683-280.

## Movimento

- GSAP + ScrollTrigger: revelação de títulos, entrada de fotografias, parallax de até 6% e progressão suave de cards.
- Sem animação quando `prefers-reduced-motion: reduce` estiver ativo.
- Em celulares, reduzir deslocamento e remover parallax contínuo.

## Conformidade antes da publicação

- Confirmar o número real do CRO e substituir `CRO-XXXXXXX`.
- Verificar junto aos conselhos profissionais a forma correta de comunicar especialidades, habilitações e procedimentos, em especial Harmonização Orofacial, Implantodontia e Blefaroplastia.
- Confirmar títulos profissionais e o direito de uso das fotografias oficiais.
- Adicionar contatos, política de privacidade e mecanismo real de agendamento somente após validação.
- FAQ e SEO não podem introduzir indicações, benefícios, segurança, recuperação, prognóstico ou resultados clínicos não fornecidos.
