# Site institucional Dra. Rita de Cássia — Design

## Intenção

Substituir integralmente a identidade anterior por um site institucional premium para Dra. Rita de Cássia, apresentando trajetória, especialidades informadas e clínicas com transparência e sem inventar credenciais, resultados, avaliações ou contatos.

## Objetivos

- Criar narrativa editorial clara e responsiva com fotografia ampla.
- Dar destaque aos 23 anos de carreira, às três especialidades informadas e às duas clínicas.
- Preservar endereços e grafias fornecidos exatamente.
- Sinalizar que as imagens são ilustrativas e que CRO/títulos/comunicação profissional precisam de validação antes da publicação.
- Oferecer FAQ, links de localização e formulário estritamente demonstrativo.

## Contrato factual

- Dra. Rita de Cássia — Cirurgiã-Dentista — CRO-XXXXXXX — 23 anos de carreira.
- Áreas informadas, sujeitas à validação profissional antes da publicação: Harmonização Orofacial (HOF), Implantodontia e Blefaroplastia.
- NOVO OLHAR — local de atendimento: Clínica Affetos — Rua Batista Renzi, 96 — Suzano, São Paulo.
- ORAL FACE — Rua Teresa Clementina Tomasine de Freitas, 248 — Parque Maria Helena — Suzano — SP — CEP: 08683-280.
- A interface deve dizer explicitamente que títulos, habilitações, registro e comunicação dessas áreas precisam ser verificados conforme as normas dos conselhos profissionais antes da publicação.

## Não objetivos

- Publicar o site, integrar agenda, armazenar dados ou criar contatos fictícios.
- Afirmar títulos de especialista, certificações, prêmios ou resultados não fornecidos.
- Apresentar a modelo das fotografias como a profissional real.
- Introduzir no FAQ ou SEO alegações sobre indicação, segurança, recuperação, benefícios, prognóstico ou resultados clínicos.

## Abordagens

1. Editorial claro branco/dourado — escolhida por aderir ao briefing e valorizar as imagens existentes.
2. Cinematográfica escura — descartada por reduzir a sensação acolhedora solicitada.
3. Clínica minimalista branca — descartada por se aproximar de um template genérico.

## Estrutura

Header; hero; trajetória; especialidades; diferenciais; clínicas; autoridade; área reservada a depoimentos reais; FAQ; contato demonstrativo; rodapé regulatório.

## Restrições

- React + Vite existentes.
- GSAP e ScrollTrigger somente com suporte a movimento reduzido.
- Imagens locais em `public/images` e sem identificação da modelo.
- Conteúdo em português brasileiro.
- Links externos apenas para pesquisas dos endereços fornecidos no Google Maps.
- Links de mapas devem usar a query literal codificada, `target="_blank"` e `rel="noopener noreferrer"`.
- O formulário não possui `action`; seu botão é `type="button"` e o aviso de demonstração fica visível e associado ao bloco.
- FAQ acessível por `details/summary`, foco visível, contraste AA e alvos de toque de pelo menos 44 px.

## Decisões do implementador

- Nome visual abreviado no monograma: `RC`.
- CTAs de agendamento levam ao formulário demonstrativo interno.
- O formulário não envia nem armazena dados e exibe essa condição antes dos campos.
- A área de depoimentos não contém frases simuladas; mostra um estado editorial reservado a relatos reais autorizados.
