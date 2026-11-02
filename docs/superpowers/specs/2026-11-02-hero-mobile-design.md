# Hero mobile — design estrutural

## Intenção

Reposicionar a única fotografia principal imediatamente após o título no celular, para apresentar a profissional antes da descrição e das ações, sem alterar a composição visual do desktop.

## Abordagem escolhida

O Hero terá três irmãos semânticos em uma única grade: `hero-intro`, `hero-media` e `hero-details`. No desktop, intro e details ocupam a coluna esquerda e media ocupa a direita nas duas linhas. Até 768 px, a grade vira uma coluna na ordem DOM: intro, media, details. A fotografia não será duplicada.

## Contratos

- Ordem mobile: identificação/CRO, título, fotografia, descrição, WhatsApp, trajetória, 23 anos.
- WhatsApp: `5511916623062`, com CTA “Agendar pelo WhatsApp”.
- Oral Face: `https://share.google/cKwlGJavrtfVDb5n9`.
- Novo Olhar mantém o endereço e sua busca atual.
- Dourado principal: `#D4AF37`.
- A fotografia mantém legenda ilustrativa, moldura arredondada, `object-fit: cover` e rosto enquadrado.
- GSAP usa uma timeline rápida no Hero: intro, máscara/foto com zoom leve, details e assinatura; reduced motion mostra tudo imediatamente.
- O restante do site e o conteúdo profissional não mudam.

## Alternativas descartadas

- `order` sobre a grade antiga: não move a imagem para dentro do fluxo entre título e descrição.
- Duplicar a fotografia ou criar dois Heroes: aumenta download, manutenção e risco de acessibilidade.

