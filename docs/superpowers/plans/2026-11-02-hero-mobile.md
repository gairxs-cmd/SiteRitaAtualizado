# Hero Mobile Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Colocar a fotografia entre título e descrição no mobile sem duplicá-la ou alterar o layout desktop.

**Architecture:** Três blocos irmãos compartilham uma CSS Grid com áreas diferentes por breakpoint. Uma timeline GSAP exclusiva coordena a entrada inicial e os reveals genéricos continuam atendendo as outras seções.

**Tech Stack:** React 19, Vite 8, CSS responsivo, GSAP 3, node:test.

**Spec:** `docs/superpowers/specs/2026-11-02-hero-mobile-design.md`

## Global Constraints

- Uma única `doutora-hero.jpg` e um único Hero.
- Ordem DOM: intro, media, details.
- Mobile até 768 px; larguras de validação: 320, 375, 390, 430 e 768 px.
- WhatsApp `5511916623062`, Maps Oral Face direto e dourado `#D4AF37`.
- Respeitar `prefers-reduced-motion` e manter conteúdo profissional.

## Review Focus

- A fotografia deve ser o primeiro conteúdo depois do título em todas as larguras móveis.
- A grade desktop deve manter texto à esquerda e foto à direita.
- A altura da mídia móvel não pode criar vazio antes da foto.
- Timeline não pode esconder conteúdo com reduced motion.
- Links de WhatsApp e Maps devem apontar exatamente aos destinos fornecidos.

---

### Task 1: Estrutura, integrações e layout

**Files:**
- Modify: `test/App.test.mjs`
- Modify: `src/App.jsx`
- Modify: `src/App.css`
- Modify: `src/index.css`
- Modify: `src/data/siteContent.js`

- [ ] Escrever testes falhos para ordem estrutural, uma fotografia, WhatsApp, Maps e tokens/layout mobile.
- [ ] Executar `npm.cmd test` e confirmar falhas pelos contratos ausentes.
- [ ] Implementar blocos `hero-intro`, `hero-media`, `hero-details`, integrações e CSS Grid responsivo.
- [ ] Executar `npm.cmd test` e confirmar aprovação.

### Task 2: Motion e verificação

**Files:**
- Modify: `test/App.test.mjs`
- Modify: `src/hooks/usePageAnimations.js`

- [ ] Escrever teste falho para seletores/timeline específicos do Hero e reduced motion.
- [ ] Implementar timeline de título, máscara/foto, detalhes e assinatura.
- [ ] Executar testes, lint e build.
- [ ] Validar as cinco larguras e ausência de overflow.

