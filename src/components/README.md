# Componentes n8n Docs BR

Esta pasta contém todos os componentes React utilizados na documentação do n8n Brasil.

## 📁 Estrutura

```
src/components/
├── common/                 # Componentes base reutilizáveis
│   ├── BaseCard/          # Card base para todos os cards
│   ├── TagList/           # Lista de tags reutilizável
│   ├── StatItem/          # Item de estatística reutilizável
│   └── index.ts           # Exportações dos componentes comuns
├── processors/            # Processadores de conteúdo
│   ├── BaseProcessor/     # Processador base
│   └── index.ts           # Exportações dos processadores
├── ArticleCard/           # Card de artigos
├── CardGrid/              # Grid de cards responsivo
├── CommunityStats/        # Estatísticas da comunidade
├── GuidanceCard/          # Cards de orientação
├── HighlightCard/         # Cards de destaque
├── IntegrationSearch/     # Busca de integrações
├── IonicIcon/             # Componente de ícones
├── MathRenderer/          # Renderizador matemático
├── RepoCard/              # Cards de repositórios
├── RSTProcessor/          # Processador RST
├── SphinxProcessor/       # Processador Sphinx
└── HybridProcessor/       # Processador híbrido
```

## 🎯 Componentes Base (common/)

### BaseCard

Componente base para todos os cards da aplicação.

```tsx
import { BaseCard } from '@site/src/components/common';

<BaseCard
  title="Título do Card"
  description="Descrição opcional"
  icon="star-outline"
  href="/link"
  className="custom-class"
>
  Conteúdo adicional
</BaseCard>
```

### TagList

Lista de tags reutilizável com suporte a truncamento.

```tsx
import { TagList } from '@site/src/components/common';

<TagList
  tags={['n8n', 'automação', 'workflow']}
  maxVisible={2}
  size="small"
  variant="primary"
/>
```

### StatItem

Item de estatística reutilizável.

```tsx
import { StatItem } from '@site/src/components/common';

<StatItem
  label="Contribuidores"
  value={150}
  icon="people-outline"
  variant="primary"
  size="medium"
/>
```

## 🔧 Processadores (processors/)

### BaseProcessor

Processador base para todos os processadores de conteúdo.

```tsx
import { BaseProcessor } from '@site/src/components/processors';

<BaseProcessor
  content={rstContent}
  loadingText="Processando RST..."
  errorText="Erro ao processar RST"
>
  {/* Conteúdo processado */}
</BaseProcessor>
```

## 📊 Componentes Específicos

### ArticleCard

Card de artigos que usa BaseCard e TagList.

### CommunityStats

Estatísticas da comunidade que usa StatItem.

### CardGrid

Grid responsivo para organizar cards.

### IntegrationSearch

Busca de integrações com filtros.

## 🎨 Padrões de Design

### Cores

- Use sempre variáveis CSS do Docusaurus
- Nunca hardcode cores
- Suporte a tema claro/escuro

### Responsividade

- Todos os componentes são responsivos
- Breakpoints: 768px, 480px
- Mobile-first approach

### Acessibilidade

- Sempre use `data-testid` para testes
- Suporte a navegação por teclado
- ARIA labels quando necessário

## 🧪 Testes

Todos os componentes principais têm testes unitários:

```bash
npm test                    # Executar todos os testes
npm test -- --watch        # Modo watch
npm test -- --coverage     # Com cobertura
```

## 📝 Convenções

### Nomenclatura

- PascalCase para componentes
- camelCase para props
- kebab-case para classes CSS

### Props

- Sempre use interfaces TypeScript
- Props opcionais com `?`
- Valores padrão quando apropriado

### Estilos

- CSS Modules para isolamento
- Variáveis CSS do Docusaurus
- Responsividade obrigatória

## 🔄 Reutilização

### Como estender BaseCard

```tsx
import { BaseCard } from '@site/src/components/common';

const CustomCard = (props) => (
  <BaseCard
    {...props}
    className="custom-card"
  >
    {/* Conteúdo customizado */}
  </BaseCard>
);
```

### Como usar TagList

```tsx
import { TagList } from '@site/src/components/common';

// Em qualquer componente
<TagList tags={tags} maxVisible={3} />
```

### Como usar StatItem

```tsx
import { StatItem } from '@site/src/components/common';

// Em qualquer componente
<StatItem label="Total" value={100} icon="checkmark" />
```

## Performance

- Lazy loading para processadores pesados
- Memoização com React.memo quando apropriado
- Otimização de re-renders
- Code splitting automático

## 🔧 Manutenção

### Adicionando novo componente

1. Crie a pasta do componente
2. Adicione `index.tsx` e `styles.module.css`
3. Crie testes em `__tests__/`
4. Documente no README
5. Adicione ao índice apropriado

### Refatorando componente

1. Mantenha compatibilidade com versões anteriores
2. Atualize testes
3. Documente mudanças
4. Teste em diferentes dispositivos
