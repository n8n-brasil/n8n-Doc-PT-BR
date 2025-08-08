---
title: Compatibilidade de Node.js
description: Versões suportadas e incompatibilidades conhecidas
---

# Compatibilidade de Node.js

## Visão Geral

Este projeto usa **Node.js 20.x** como versão principal para desenvolvimento e CI/CD. O Node.js 18.x foi removido da matriz de CI devido a incompatibilidades conhecidas com Docusaurus 3.8.1.

## Versões Suportadas

### ✅ Node.js 20.x (Recomendado)
- **Versão mínima:** 20.0.0
- **Versão LTS:** 20.x.x
- **Status:** Totalmente suportado
- **CI/CD:** ✅ Incluído na matriz

### ❌ Node.js 18.x (Incompatível)
- **Problema:** Incompatibilidade com Docusaurus 3.8.1
- **Erro típico:** Falha no build durante compilação
- **Status:** Removido da matriz de CI
- **CI/CD:** ❌ Excluído da matriz

## Dependências Críticas

### Docusaurus 3.8.1
- **Compatibilidade:** Node.js 20.x+
- **Problema conhecido:** Build falha no Node.js 18.x
- **Solução:** Usar Node.js 20.x

### React 18.2.0
- **Compatibilidade:** Node.js 16.x+
- **Status:** ✅ Compatível com Node.js 20.x

### TypeScript 5.8.3
- **Compatibilidade:** Node.js 16.x+
- **Status:** ✅ Compatível com Node.js 20.x

## Configuração do CI/CD

### Matriz Atual
```yaml
strategy:
  fail-fast: false
  matrix:
    node-version: [20.x]
```

### Matriz Anterior (Problemática)
```yaml
strategy:
  fail-fast: false
  matrix:
    node-version: [18.x, 20.x]  # Node 18.x causava falhas
```

## Decisão Técnica

### Por que remover Node 18.x?

1. **Incompatibilidade com Docusaurus 3.8.1**
   - Build falha consistentemente no Node 18.x
   - Erro durante compilação do webpack

2. **Node 20.x é LTS**
   - Versão estável e suportada
   - Melhor performance e segurança

3. **Redução de Complexidade**
   - Menos jobs para manter
   - CI mais rápido e confiável

### Alternativas Consideradas

1. **Downgrade do Docusaurus**
   - ❌ Perderia funcionalidades recentes
   - ❌ Problemas de segurança

2. **Manter ambas as versões**
   - ❌ Node 18.x sempre falha
   - ❌ CI instável

3. **Upgrade para Node 21.x**
   - ⚠️ Muito recente
   - ⚠️ Pode ter problemas de estabilidade

## Recomendações

### Para Desenvolvedores
- Use Node.js 20.x localmente
- Configure `.nvmrc` se necessário
- Teste sempre com Node 20.x

### Para CI/CD
- Mantenha apenas Node 20.x na matriz
- Monitore atualizações do Docusaurus
- Considere Node 21.x quando estável

### Para Deploy
- Use Node 20.x em produção
- Configure variáveis de ambiente adequadamente
- Monitore logs de build

## Monitoramento

### Métricas Importantes
- Tempo de build
- Taxa de sucesso do CI
- Compatibilidade com dependências

### Alertas
- Falhas de build no Node 20.x
- Problemas de compatibilidade
- Atualizações críticas do Docusaurus

## Referências

- [Docusaurus 3.8.1 Release Notes](https://docusaurus.io/changelog)
- [Node.js 20.x LTS](https://nodejs.org/)
- [React 18.2.0 Compatibility](https://react.dev/)
- [TypeScript 5.8.3 Release Notes](https://devblogs.microsoft.com/typescript/)
