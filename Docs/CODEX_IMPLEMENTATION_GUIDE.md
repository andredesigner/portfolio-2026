# CODEX_IMPLEMENTATION_GUIDE.md

## Contexto do projeto

Este projeto é o portfólio profissional de André Oliveira, UX/UI Designer e Brand Designer.

O objetivo é criar uma experiência digital premium, editorial e estratégica, com alto nível de craft visual, performance, acessibilidade e controle de conteúdo via Prismic CMS.

O portfólio deve comunicar:

- maturidade em UX/UI
- visão de produto
- domínio visual
- pensamento sistêmico
- experiência com branding
- conhecimento técnico em front-end
- refinamento em motion e interação

Referências de sensação:

- portfolios premium de designers sênior/head
- sites editoriais
- Awwwards
- Heights Agency
- Apple
- Locomotive-style motion
- sistemas visuais limpos, técnicos e sofisticados

---

## Stack recomendada

Utilizar:

- Nuxt
- Prismic CMS
- Slice Machine
- GSAP
- ScrollTrigger
- Tailwind CSS ou SCSS
- TypeScript

A escolha entre Tailwind e SCSS deve priorizar estabilidade, clareza, organização e fidelidade visual ao Figma.

---

## Objetivo técnico

Implementar o front-end do portfólio com:

- arquitetura limpa
- componentes reutilizáveis
- slices controláveis pelo Prismic
- páginas dinâmicas
- transições entre páginas
- animações no scroll
- SEO por página
- acessibilidade
- performance
- código fácil de manter

Não implementar tudo de uma vez. Trabalhar por fases.

---

## Regras gerais para o Codex

Sempre:

- analisar antes de implementar
- propor plano técnico antes de alterar muitos arquivos
- implementar em etapas pequenas
- explicar quais arquivos foram criados ou alterados
- reutilizar componentes existentes
- evitar duplicação de código
- manter HTML semântico
- priorizar acessibilidade
- respeitar responsividade
- evitar soluções frágeis
- evitar animações pesadas
- garantir cleanup de animações GSAP
- respeitar SSR/hydration do Nuxt
- usar nomes claros para componentes, slices e composables
- separar conteúdo, apresentação e motion

Nunca:

- criar código duplicado
- misturar regras de CMS dentro de componentes visuais sem necessidade
- usar inline styles sem necessidade
- usar `!important` como solução principal
- implementar animações sem considerar `prefers-reduced-motion`
- quebrar a estrutura do Slice Machine
- criar muitos slices específicos sem necessidade
- fazer grandes refatorações sem explicar antes

---

## Arquitetura recomendada

Estrutura base sugerida:

```txt
/app ou raiz do projeto, conforme padrão atual do Nuxt utilizado
  /assets
  /components
  /composables
  /layouts
  /pages
  /slices
  /utils
  /server
  /public
/customtypes
/docs
```

Separação de responsabilidades:

```txt
components/   → componentes globais reutilizáveis
slices/       → blocos controlados pelo Prismic
layouts/      → estruturas de página
pages/        → rotas Nuxt
composables/  → lógicas reutilizáveis
utils/        → funções auxiliares
assets/       → estilos, imagens processadas, tokens
public/       → arquivos públicos estáticos
customtypes/  → modelos do Prismic
```

---

## Estrutura de dados recomendada no Prismic

A arquitetura deve ser baseada em slices.

O Prismic controla conteúdo.
O Nuxt controla layout.
O GSAP controla motion.

---

# 1. Singleton: `settings`

Documento global do site.

## Objetivo

Controlar informações globais:

- SEO padrão
- logo
- header
- footer
- redes sociais
- links principais
- contato
- currículo

## Campos recomendados

```txt
site_name → Key Text
site_description → Text
logo → Image
favicon → Image

email → Key Text

linkedin_url → Link
instagram_url → Link
dribbble_url → Link
behance_url → Link
resume_url → Link

footer_text → Rich Text

default_seo_title → Key Text
default_seo_description → Text
default_og_image → Image
```

---

# 2. Singleton: `home`

Documento da página inicial.

## Objetivo

Controlar a home do portfólio.

## Campos fixos

```txt
seo_title → Key Text
seo_description → Text
seo_image → Image
```

## Slice Zone

```txt
body → Slice Zone
```

## Slices da home

- Hero
- Intro Statement
- Projects List
- About Preview
- CTA

---

# 3. Repeatable Type: `page`

Para páginas institucionais como:

- Sobre
- páginas futuras

## Campos fixos

```txt
title → Key Text
uid → UID
seo_title → Key Text
seo_description → Text
seo_image → Image
```

## Slice Zone

```txt
body → Slice Zone
```

---

# 4. Repeatable Type: `case`

Cada projeto do portfólio:

- Onebox
- Udda
- Klima
- Grupo Paes
- Hyundai
- outros projetos futuros

## Campos fixos

```txt
project_name → Key Text
uid → UID
headline → Text
short_description → Text

client → Key Text
year → Number ou Key Text
role → Key Text
category → Key Text

cover_image → Image
thumbnail → Image

featured_project → Boolean

seo_title → Key Text
seo_description → Text
seo_image → Image
```

## Slice Zone

```txt
body → Slice Zone
```

O conteúdo do case deve ser montado por slices, e não por muitos campos fixos.

---

## Slices recomendados

Criar poucos slices, flexíveis e reutilizáveis.

---

# Slice: `Hero`

Usado na Home, About e Case Detail.

## Campos

```txt
title → Rich Text ou Key Text
subtitle → Text
image → Image
background_image → Image
background_color → Select ou Color
theme → Select: light / dark / brand
```

---

# Slice: `IntroStatement`

Para frases grandes e editoriais.

## Campos

```txt
statement → Rich Text
max_width → Select
alignment → Select: left / center / right
```

---

# Slice: `ProjectsList`

Seção de projetos da Home.

## Objetivo

Listar projetos cadastrados como `case`.

## Campos

```txt
title → Key Text
projects → Group ou Content Relationship para case
```

Cada projeto deve vir do documento `case`, não ser digitado manualmente.

---

# Slice: `AboutPreview`

Seção de apresentação da Home.

## Campos

```txt
title → Rich Text
image → Image
columns → Group
  - heading → Text
  - content → Rich Text
```

---

# Slice: `TextContent`

Bloco editorial de texto.

## Campos

```txt
eyebrow → Key Text
title → Rich Text
content → Rich Text
alignment → Select
max_width → Select
```

---

# Slice: `FullscreenMedia`

Imagem ou vídeo grande.

## Campos

```txt
image → Image
video_url → Link
caption → Text
aspect_ratio → Select
```

---

# Slice: `TwoColumnMedia`

Para imagens lado a lado, como aplicações de marca.

## Campos

```txt
left_image → Image
right_image → Image
caption → Text
```

---

# Slice: `MediaGrid`

Para múltiplas imagens em grid.

## Campos

```txt
items → Group
  - image → Image
  - caption → Text
layout → Select: 2-col / 3-col / asymmetrical
```

---

# Slice: `Metrics`

Para resultados e indicadores.

## Campos

```txt
items → Group
  - value → Key Text
  - label → Key Text
  - description → Text
```

---

# Slice: `ProjectNavigation`

Seção final do detalhe do projeto, com link para próximo projeto ou listagem.

## Campos

```txt
label → Key Text
next_project → Content Relationship para case
description → Text
```

---

# Slice: `CTA`

Chamada final reutilizável.

## Campos

```txt
title → Rich Text
primary_button_label → Key Text
primary_button_link → Link
secondary_button_label → Key Text
secondary_button_link → Link
```

---

## Componentes globais recomendados

```txt
AppHeader
AppFooter
AppLogo
BaseButton
BaseLink
SectionTitle
ProjectRow
ProjectCard
RichTextRenderer
MediaRenderer
SeoHead
PageTransition
Preloader
```

---

## Motion system

Usar GSAP de forma modular.

Criar animações em arquivos separados quando possível:

```txt
/utils/motion/pageTransitions.ts
/utils/motion/scrollReveal.ts
/utils/motion/stickyProjects.ts
/utils/motion/preloader.ts
```

## Regras de motion

- movimentos suaves
- sem bounce exagerado
- sem elastic agressivo
- sem flickering
- scrub em animações conectadas ao scroll
- cleanup ao desmontar página
- respeitar `prefers-reduced-motion`
- evitar animar propriedades caras quando possível
- priorizar `transform` e `opacity`

## Interações desejadas

### Transição de páginas

- saída suave da página atual
- entrada suave da próxima página
- sem flash branco
- sem travamento

### Projetos sticky

Na home, os projetos podem utilizar comportamento sticky.

Quando o próximo projeto entra na viewport:

- o projeto atual reduz escala suavemente
- sem alterar opacidade
- animação acompanhando o scroll
- usar ScrollTrigger com `scrub: true`

### Preloader

- aparecer apenas na primeira entrada da sessão
- não aparecer em navegação interna
- usar `sessionStorage`
- animação simples e premium

---

## SEO

Cada página deve ter:

```txt
title
meta description
og:title
og:description
og:image
canonical
```

SEO deve vir do Prismic quando possível.

Fallback deve vir de `settings`.

---

## Acessibilidade

Obrigatório:

- HTML semântico
- heading hierarchy correta
- links com texto claro
- aria-label em links apenas com ícone
- foco visível
- contraste adequado
- imagens com alt text vindo do Prismic
- botões reais para ações, links reais para navegação
- respeitar `prefers-reduced-motion`

---

## Performance

Obrigatório:

- otimizar imagens
- lazy loading em imagens abaixo da dobra
- evitar scripts desnecessários
- evitar animações pesadas
- reduzir layout shift
- usar dimensões em imagens quando possível
- carregar fontes de forma otimizada

---

## Ordem recomendada de implementação

## Fase 1 — Fundação técnica

- validar dependências
- configurar Nuxt
- configurar Prismic
- configurar Slice Machine
- configurar GSAP
- criar estrutura de pastas
- criar layout base
- criar Header/Footer básicos
- garantir build sem erros

## Fase 2 — Modelagem Prismic

- criar `settings`
- criar `home`
- criar `page`
- criar `case`
- criar slices principais

## Fase 3 — Componentes globais

- Header
- Footer
- Logo
- Buttons
- ProjectRow
- RichTextRenderer
- SeoHead

## Fase 4 — Home

- Hero
- Intro Statement
- Projects List
- About Preview
- CTA

## Fase 5 — Case Detail

- Hero do projeto
- FullscreenMedia
- TextContent
- TwoColumnMedia
- MediaGrid
- ProjectNavigation
- CTA

## Fase 6 — Motion

- page transitions
- preloader
- scroll reveals
- sticky project effect

## Fase 7 — QA

- responsividade
- acessibilidade
- SEO
- performance
- lighthouse
- revisão visual com Figma

---

## Como trabalhar com o Figma MCP

Antes de implementar qualquer tela, analisar:

```txt
- tokens visuais
- grid
- espaçamentos
- tipografia
- cores
- componentes reutilizáveis
- blocos que devem virar slices
- elementos globais
- estados responsivos
```

Depois entregar:

```txt
1. mapa de componentes
2. mapa de slices
3. estrutura de dados no Prismic
4. plano de implementação
```

Somente depois começar a codar.

---

## Direção visual

O projeto deve parecer:

- editorial
- técnico
- premium
- minimalista
- estratégico
- sofisticado
- com ritmo visual forte

Evitar:

- excesso de efeitos
- animações chamativas demais
- estética genérica de template
- componentes desnecessários
- páginas rígidas demais

---

## Critério de sucesso

A implementação estará correta quando:

- o layout estiver fiel ao Figma
- o conteúdo puder ser editado pelo Prismic
- os slices forem reutilizáveis
- as páginas forem performáticas
- as transições forem suaves
- o código estiver organizado
- a arquitetura permitir crescimento
- o portfólio transmitir nível sênior/head
