# Site da Dra. Rita de Cássia

Site React + Vite com Home e cinco páginas de especialidades.

## Desenvolvimento

```sh
npm install
npm run dev
```

`npm run build` gera `dist/` e um `index.html` com metadados próprios para cada especialidade em `dist/especialidades/<slug>/`. As URLs sem barra final são atendidas pelo `vercel.json` na Vercel. Em outra hospedagem, configure essas URLs para servir o `index.html` da pasta correspondente e preserve os arquivos de `dist/`.

## Fotografias das especialidades

Os dados estão em `src/data/specialties.js`. Para adicionar imagens, preencha `image` com `{ src, alt, width, height }` e acrescente objetos do mesmo formato a `gallery`. Coloque os arquivos em `public/images/` e use caminhos que comecem por `/images/`. Sem imagens, as páginas mantêm o layout tipográfico.

## Revisões antes da publicação

- Confirmar a inscrição `CRO-SP 79479` na consulta oficial do CRO-SP.
- Confirmar habilitações e a forma de divulgar Blefaroplastia.
- Confirmar a permissão de republicação das avaliações e a adequação da publicidade odontológica.
- Conferir os destinos dos mapas das duas clínicas em dispositivos reais.
