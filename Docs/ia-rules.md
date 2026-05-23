# AI Rules

Sempre:
- reutilizar componentes
- evitar duplicação
- modularizar código
- respeitar SSR
- evitar hydration issues
- evitar animações pesadas
- usar GSAP corretamente
- usar cleanup de animações
- usar semantic HTML
- garantir acessibilidade
- seguir os frames Figma `499:2486` e `506:2853` como fonte visual das páginas principais
- manter tokens globais em `app/assets/css/main.css`
- usar links, headings e landmarks semânticos

Nunca:
- criar código duplicado
- usar inline styles
- usar animações sem scrub quando dependem do scroll
- usar !important
- quebrar arquitetura existente
- depender de URLs temporárias do Figma em produção
- usar os experimentos como fonte de verdade para a home ou case final
