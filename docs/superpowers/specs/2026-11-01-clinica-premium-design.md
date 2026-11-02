# Landing page Clínica Áurea — Design

## Intenção

Criar a primeira versão de uma landing page fictícia para uma clínica odontológica de alto padrão. A página deve transmitir cuidado, precisão e tranquilidade, conduzir o visitante até o agendamento e funcionar bem em telas grandes e pequenas.

## Objetivos

- Apresentar a clínica, seus diferenciais e tratamentos com uma narrativa clara.
- Usar uma estética premium, moderna e elegante, sem aparência hospitalar genérica.
- Destacar chamadas para agendamento em pontos naturais da jornada.
- Entregar HTML semântico, navegação acessível, foco visível e responsividade.
- Não utilizar fotos de equipe.

## Não objetivos

- Integrar agenda, WhatsApp, CRM ou backend nesta primeira versão.
- Criar área do paciente ou fluxo de autenticação.
- Fazer alegações médicas, estatísticas reais ou atribuir credenciais a profissionais.

## Restrições

- Manter React 19 e Vite 8 já instalados.
- Trabalhar localmente, sem publicação.
- Usar conteúdo e identidade fictícios.
- Evitar novas dependências quando a plataforma já oferecer o necessário.
- Não usar fotos de equipe; a primeira versão será visualmente forte sem fotografias.

## Abordagens consideradas

1. **Editorial orgânica — escolhida.** Fundo marfim, verde profundo, tipografia serifada nos títulos, detalhes em dourado suave e uma ilustração abstrata inspirada em anatomia dental. É distinta, acolhedora e premium sem depender de fotografias.
2. **Clínica tecnológica.** Branco, azul frio, grades precisas e visual de equipamento. Comunica tecnologia, mas tende a parecer mais genérico e menos acolhedor.
3. **Fotográfica tradicional.** Imagens grandes de instalações e pacientes. Pode criar identificação rápida, mas exige ativos externos e reduz o controle sobre a linguagem visual nesta primeira versão.

## Estrutura da experiência

1. Cabeçalho fixo com marca, navegação por âncoras e CTA.
2. Hero com promessa central, dois CTAs, sinais de confiança e composição visual abstrata.
3. Faixa de princípios da experiência da clínica.
4. Seção de tratamentos com quatro áreas de atuação.
5. Seção sobre a experiência e três etapas do atendimento.
6. Depoimento ilustrativo inserido no contexto fictício, sem nomes ou métricas verificáveis.
7. FAQ com elementos nativos expansíveis.
8. CTA final e rodapé com contato e localização fictícios.

## Sistema visual

- Paleta: marfim quente, verde floresta, verde sálvia, branco e dourado discreto.
- Tipografia: Georgia para títulos editoriais e uma pilha de fontes de sistema para textos.
- Formas: cantos amplos, linhas finas, círculos translúcidos e detalhes orgânicos.
- Movimento: entradas e microinterações suaves, desativadas quando o usuário prefere movimento reduzido.
- Imagem principal: composição CSS/SVG abstrata, sem pessoa ou fotografia de equipe.

## Acessibilidade e qualidade

- Hierarquia correta de títulos, regiões semânticas e links de salto.
- Contraste legível, alvos de toque adequados e foco visível.
- Menu adaptável sem depender de JavaScript para acessar os links principais.
- Layouts específicos para desktop, tablet e celular.
- Teste automatizado da estrutura e do conteúdo principal, além de lint e build.

## Decisões do implementador

- Nome fictício: Clínica Áurea.
- Localização fictícia: Jardins, São Paulo.
- CTA usa um link de contato demonstrativo (`#contato`) em vez de integração externa.
- A página será implementada em um componente principal e dados de conteúdo separados apenas quando isso melhorar testabilidade e manutenção.
