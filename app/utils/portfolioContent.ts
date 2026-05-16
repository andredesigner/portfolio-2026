export type ProjectSummary = {
  uid: string
  client: string
  year: string
  title: string
  summary: string
}

export type CaseImage = {
  src: string
  alt: string
  layout?: 'full' | 'half'
}

export const projects: ProjectSummary[] = [
  {
    uid: 'onebox',
    client: 'Onebox',
    year: '2026',
    title: 'Elevando a presença digital de uma empresa orientada por tecnologia',
    summary: 'Projetando produtos digitais refinados por meio de UX, refinamento visual e design de interação.'
  },
  {
    uid: 'udda',
    client: 'UDda',
    year: '2026',
    title: 'Ajudando pais a encontrarem brinquedos educativos com mais confiança',
    summary: 'Projetando produtos digitais refinados por meio de UX, refinamento visual e design de interação.'
  },
  {
    uid: 'klima',
    client: 'Klima',
    year: '2026',
    title: 'Criando produtos digitais para um mundo mais sustentável',
    summary: 'Projetando produtos digitais refinados por meio de UX, refinamento visual e design de interação.'
  },
  {
    uid: 'grupo-paes',
    client: 'Grupo Paes',
    year: '2026',
    title: 'Modernizando a experiência digital de uma construtora em expansão',
    summary: 'Projetando produtos digitais refinados por meio de UX, refinamento visual e design de interação.'
  },
  {
    uid: 'arquivo',
    client: '',
    year: '2017 - 2026',
    title: 'Arquivo',
    summary: 'Projetando produtos digitais refinados por meio de UX, refinamento visual e design de interação.'
  }
]

export const featuredCase = {
  uid: 'onebox',
  client: 'Onebox',
  eyebrow: 'Onebox',
  year: '2026',
  title: 'Onebox',
  subtitle: 'Elevando a presença digital de uma empresa orientada por tecnologia.',
  intro:
    'Designer de produto com forte capacidade visual, visão sistêmica e execução high-end para experiências digitais.',
  body:
    'Lorem ipsum dolor sit amet consectetur. Id proin viverra adipiscing orci. Ullamcorper est dui suspendisse erat facilisis eu sapien. Convallis quis integer ac at. Nullam placerat fusce ipsum ultrices diam nec non leo. Aliquam sed nulla tortor sociis porttitor.',
  secondBody:
    'Quisque sit scelerisque vivamus mauris. Quam sed nunc sit vitae sed. Pretium sit ornare tempus est turpis nullam morbi a. Molestie eget elit pharetra id fermentum lobortis lacinia magna quisque. Massa adipiscing nulla vel nulla cursus risus tristique in.',
  imageAlt: 'Projeto Onebox aplicado em uma direção visual de learning book.'
}

export const contactLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'Linkeding', href: 'https://www.linkedin.com/' },
  { label: 'Currículo', href: '/curriculo.pdf', variant: 'outline' },
  { label: 'E-mail', href: 'mailto:hello@example.com', variant: 'green' }
]
