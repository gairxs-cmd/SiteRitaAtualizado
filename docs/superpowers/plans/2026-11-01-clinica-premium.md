# Landing Page Clínica Áurea Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir o starter do Vite por uma landing page odontológica premium, responsiva, acessível e orientada ao agendamento.

**Architecture:** Um componente React sem dependências adicionais renderiza seções semânticas a partir de conteúdo local. A camada visual fica dividida entre reset/tokens globais e estilos da landing page; um teste de integração renderiza a aplicação pelo pipeline SSR do próprio Vite.

**Tech Stack:** React 19, Vite 8, CSS moderno, `node:test`, renderização estática do React.

**Spec:** `docs/superpowers/specs/2026-11-01-clinica-premium-design.md`

## Global Constraints

- Não utilizar fotos de equipe.
- Manter React 19 e Vite 8 e não adicionar bibliotecas de interface.
- Usar somente identidade, endereço e conteúdo fictícios.
- Preservar navegação acessível, foco visível e suporte a movimento reduzido.
- Trabalhar localmente, sem publicação.

## Review Focus

- Em telas estreitas, nenhuma seção deve causar rolagem horizontal e os CTAs devem continuar utilizáveis.
- Sem JavaScript adicional, navegação e FAQ devem continuar acessíveis por links e elementos HTML nativos.
- Com `prefers-reduced-motion`, animações e transições não essenciais devem ser removidas.
- O documento deve manter um único `h1` e regiões semânticas identificáveis.
- Links de contato fictícios não devem simular uma integração real inexistente.

---

### Task 1: Estrutura e conteúdo da landing page

**Files:**
- Create: `test/App.test.mjs`
- Modify: `package.json`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: pipeline JSX/CSS do Vite e `renderToStaticMarkup` do React.
- Produces: componente padrão `App` com navegação, conteúdo institucional, FAQ e CTA `#contato`.

- [ ] **Step 1: Criar teste de integração que renderiza `App` e exige marca, título principal, regiões e CTAs**
- [ ] **Step 2: Executar `npm test` e confirmar falha porque o starter não contém a Clínica Áurea**
- [ ] **Step 3: Implementar o markup semântico e o conteúdo em `src/App.jsx`**
- [ ] **Step 4: Executar `npm test` e confirmar aprovação**

### Task 2: Sistema visual e responsividade

**Files:**
- Modify: `src/App.css`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: classes e estrutura semântica produzidas pela Task 1.
- Produces: tokens de cor/tipografia, layouts responsivos, arte abstrata, estados interativos e redução de movimento.

- [ ] **Step 1: Acrescentar ao teste verificações da presença da arte decorativa e das classes estruturais críticas**
- [ ] **Step 2: Executar `npm test` e confirmar a nova falha esperada**
- [ ] **Step 3: Implementar tokens, layout desktop, breakpoints móvel/tablet, foco e movimento reduzido**
- [ ] **Step 4: Executar `npm test` e confirmar aprovação**

### Task 3: Metadados e identidade do documento

**Files:**
- Modify: `index.html`
- Modify: `public/favicon.svg`

**Interfaces:**
- Consumes: nome e descrição definidos na especificação.
- Produces: documento `pt-BR`, título, descrição, cor de tema e favicon próprios.

- [ ] **Step 1: Criar teste de metadados que exige idioma, título e descrição da Clínica Áurea**
- [ ] **Step 2: Executar `npm test` e confirmar falha contra o HTML do starter**
- [ ] **Step 3: Atualizar `index.html` e o favicon SVG**
- [ ] **Step 4: Executar `npm test`, `npm run lint` e `npm run build`**

### Task 4: Verificação visual local

**Files:**
- Verify: aplicação compilada e preview local

**Interfaces:**
- Consumes: build de produção aprovado.
- Produces: evidência de que a página abre corretamente e mantém a composição responsiva disponível para inspeção.

- [ ] **Step 1: Iniciar o preview local conforme as orientações do ambiente**
- [ ] **Step 2: Inspecionar a primeira dobra e uma largura móvel quando houver infraestrutura de navegador**
- [ ] **Step 3: Corrigir somente falhas observadas, repetindo testes, lint e build**

