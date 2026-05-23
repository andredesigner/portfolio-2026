# Arquitetura

## Components
Componentes reutilizáveis globais.

Atuais:
- `BrandLogo`: wordmark responsivo a partir de SVG local.
- `BrandSymbol`: símbolo vertical usado no encerramento da página.
- `TheHeader`: header sticky semântico com logo, contexto e link de ação.
- `ProjectCard`: card textual de projeto reaproveitado na home e no próximo projeto.
- `TheFooter`: CTA global, links, wordmark e símbolo.
- `BasePillLink`: links em formato pill para currículo/e-mail.

## Slices
Blocos controlados pelo Prismic.

## Layouts
Estruturas de páginas.

## Composables
Lógicas reutilizáveis.

## Motion
Animações GSAP modularizadas.

Regra atual: motion deve entrar por `useMotion.ts` e respeitar `prefers-reduced-motion`. A reconstrução Figma prioriza HTML/CSS estável antes de adicionar novos efeitos.

## Reaproveitamento

Manter:
- Nuxt 3, Prismic, Slice Machine, GSAP, SEO composable e estrutura `/app`.
- Assets locais em `app/public/figma`.
- Componentes globais, após adequação ao novo Figma.

Descartar/evitar no layout principal:
- variações experimentais em `/pages/experimentos` como fonte de verdade.
- layout antigo de 4 colunas.
- cards decorativos e seções que não existem nos dois frames finais.
