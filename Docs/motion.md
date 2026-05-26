# Motion System

## Objetivo

O motion do portfolio deve funcionar como uma camada de refinamento: discreta, responsiva ao scroll e sem chamar mais atencao que a composicao visual.

A referencia aplicada no projeto segue o padrao observado na pagina do Mac da Apple:

- entrada por cadeia quando um grupo chega no viewport;
- movimento curto, com pouca distancia;
- foco em `opacity` + `transform`;
- delays pequenos por indice;
- sem bounce, elastic ou overshoot;
- sem animar propriedades de layout quando nao for necessario.

## Implementacao

O sistema esta centralizado em `app/composables/useMotion.ts`.

Ele expoe tres funcoes:

- `initPageMotion(root)`: inicializa todos os elementos com `data-motion`.
- `animateIn(target, options)`: helper pontual para animacoes manuais simples.
- `scroll(target, options)`: helper para animacoes vinculadas ao scroll com `ScrollTrigger`.

No layout global, `initPageMotion(document)` roda no client em `onMounted` e novamente quando a rota muda. O cleanup e feito com `gsap.context().revert()` para evitar duplicar triggers.

## API Declarativa

Use atributos no template para ativar motion sem criar logica local no componente.

### Reveal simples

```vue
<section
  data-motion="reveal"
  data-motion-duration="0.9"
>
  ...
</section>
```

Comportamento:

- estado inicial: `autoAlpha: 0`, `y: -4`;
- estado final: `autoAlpha: 1`, `y: 0`;
- dispara uma vez quando o elemento chega ao viewport;
- trigger default: `top 85%`;
- ease default: `power1.out`.

### Grupo com animacao em cadeia

```vue
<div
  data-motion="group"
  data-motion-group
  data-motion-delay="0.15"
  data-motion-duration="0.9"
  data-motion-stagger="0.15"
>
  <ProjectRow data-motion-item />
  <ProjectRow data-motion-item />
  <ProjectRow data-motion-item />
</div>
```

Comportamento:

- o container controla o trigger;
- apenas filhos com `data-motion-item` entram na cadeia;
- cada item respeita o `stagger` do grupo;
- itens internos nao sao animados duas vezes.

## Atributos Disponiveis

- `data-motion="reveal"`: anima um elemento isolado.
- `data-motion="group"`: anima filhos em cadeia.
- `data-motion-group`: marca o elemento como container de grupo.
- `data-motion-item`: marca item animavel dentro de um grupo.
- `data-motion-duration="0.9"`: duracao em segundos.
- `data-motion-delay="0.15"`: delay inicial em segundos.
- `data-motion-stagger="0.08"`: intervalo entre itens do grupo.
- `data-motion-y="-4"`: deslocamento vertical inicial em px.
- `data-motion-start="top 85%"`: start customizado do ScrollTrigger.

Defaults atuais:

- `duration`: `0.9`
- `delay`: `0`
- `stagger`: `0.04`
- `y`: `-4`
- `start`: `top 85%`
- `ease`: `power1.out`

## Onde Esta Aplicado

### Home hero

`app/pages/index.vue`

- `data-motion="reveal"`
- `data-motion-delay="0.1"`
- `data-motion-duration="0.9"`

Uso: entrada inicial suave do bloco de hero.

### Project rows

`app/pages/index.vue` + `app/components/global/ProjectRow.vue`

Container:

- `data-motion="group"`
- `data-motion-group`
- `data-motion-delay="0.15"`
- `data-motion-duration="0.9"`
- `data-motion-stagger="0.15"`

Cada `ProjectRow`:

- `data-motion="reveal"`
- `data-motion-item`
- `data-motion-duration="0.9"`

Uso: entrada em cadeia dos projetos, seguindo o padrao dos produtos Mac.

### About

`app/components/global/AboutSection.vue`

- titulo, statement, note e imagem usam reveal isolado;
- corpo textual usa grupo com `data-motion-stagger="0.08"`.

Uso: composicao entra em blocos, mantendo leitura natural.

### Contact

`app/components/global/ContactSection.vue`

- grid usa grupo;
- titulo, botao, copyright e links sao `data-motion-item`.

Uso: entrada compacta em cadeia no fechamento da pagina.

### Wordmark footer

`app/components/global/WordmarkFooter.vue`

- section usa grupo;
- botao "Subir" e wordmark sao itens.

Uso: fechamento com entrada coordenada, sem animar o sticky em si.

## Regras De Uso

- Use `data-motion` em secoes ou blocos reais, nao em cada palavra.
- Prefira `group` quando houver lista, grid, rows ou links relacionados.
- Prefira `reveal` quando o elemento for uma unidade visual independente.
- Mantenha deslocamento pequeno: `-4`, `8` ou `12` px.
- Use `0.9s` para entrada editorial.
- Use `0.3s` a `0.5s` apenas para estados de interacao local.
- Use stagger entre `0.04s` e `0.08s` para grupos compactos.
- Use stagger de `0.15s` quando a cadeia deve ficar perceptivel, como nos projetos.
- Nao anime `height`, `width`, `padding`, `margin` ou grid sem necessidade real.
- Nao use bounce, elastic ou overshoot.
- Nao duplique animacoes locais se o elemento ja estiver dentro de um grupo.

## Acessibilidade

O sistema respeita `prefers-reduced-motion: reduce`.

Quando o usuario prefere reduzir movimento:

- elementos com `data-motion` sao exibidos com `autoAlpha: 1`;
- transform e removido;
- ScrollTrigger nao e criado para reveals.

## Performance

O sistema usa propriedades baratas para o browser:

- `opacity`;
- `transform`;
- `autoAlpha`.

O ScrollTrigger e carregado dinamicamente apenas no client. Isso preserva SSR do Nuxt e evita executar GSAP no servidor.

## Exemplo Para Nova Secao

```vue
<section class="case-intro" data-motion="group" data-motion-group data-motion-stagger="0.08">
  <p class="type-label" data-motion-item>
    Case
  </p>
  <h1 class="type-h1" data-motion-item>
    Nome do projeto
  </h1>
  <p class="type-big" data-motion-item>
    Descricao curta do projeto.
  </p>
</section>
```

## Exemplo Para Um Elemento Isolado

```vue
<figure
  class="case-hero__media"
  data-motion="reveal"
  data-motion-duration="0.9"
  data-motion-y="8"
>
  <img src="/figma/project-hero.png" alt="">
</figure>
```

## Quando Usar Helpers Manuais

Use `animateIn` ou `scroll` apenas quando o comportamento declarativo nao for suficiente.

Exemplo:

```ts
const motion = useMotion()

onMounted(() => {
  motion.animateIn(elementRef.value, {
    y: 12,
    duration: 0.7,
    ease: 'power3.out'
  })
})
```

Para efeitos scrubados:

```ts
const motion = useMotion()

onMounted(() => {
  motion.scroll(mediaRef.value, {
    yPercent: -8,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  })
})
```

Use esses helpers com parcimonia. O padrao principal do projeto deve continuar sendo declarativo via `data-motion`.
