# Em Bonito MS — Landing Page V2

Landing page local, mobile-first, criada em React + Vite. A narrativa apresenta Bonito/MS como destino antes de conduzir o visitante ao planejamento com a Em Bonito MS.

## Objetivo da V2

Evoluir a experiência visual e a narrativa da landing page, com foco em responsividade, apresentação do destino e conversão dos visitantes em atendimentos.

## Stack

React, Vite, TypeScript e CSS.

## Executar

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
npm run preview
```

> Este projeto ainda está em desenvolvimento.

## Estrutura

- `src/main.jsx`: conteúdo, navegação e seções da página.
- `src/styles.css`: sistema visual e responsividade.
- `public/images`: cópias otimizadas das fotos efetivamente usadas.
- `Fotos bonistar`: fotografias originais, preservadas sem alteração.
- `scripts/prepare-images.ps1`: preparação reproduzível dos assets.
- `scripts/audit-current.cjs`: auditoria Playwright da landing page anterior.
- `scripts/validate-local.cjs`: validação Playwright em desktop, tablet e mobile.
- `audit/current`: auditoria e screenshots da página anterior.
- `audit/v2`: relatório e screenshots full-page da V2.

## Observações de integração

Os CTAs usam o redirecionador oficial de atendimento encontrado na página atual, com UTMs específicas da V2. Nenhum pixel, tag de analytics ou envio de formulário foi configurado nesta etapa local.
