# 🔒 Política de Segurança e Ferramentas

## Sobre o Projeto

Esta é a documentação **não oficial** do n8n em português brasileiro, criada pela comunidade brasileira. Este repositório contém apenas documentação e não inclui código executável do n8n.

## Versões Suportadas

Este projeto de documentação é mantido de forma contínua. Reportamos vulnerabilidades relacionadas à:

| Componente | Versão | Suportado |
| ---------- | ------ | --------- |
| Documentação | Latest | :white_check_mark: |
| Site (Docusaurus) | 3.8.x | :white_check_mark: |
| Dependências | Latest | :white_check_mark: |

## 🛠️ Ferramentas de Segurança Implementadas

### 1. Gitleaks
**Objetivo**: Detectar secrets, tokens e credenciais expostas no código e documentação.

**Configuração**: `.gitleaks.toml`
- Regras customizadas para CPF/CNPJ brasileiros
- Detecção de senhas e tokens em português
- Whitelist para placeholders seguros
- Configuração específica para documentação

**Uso**:
```bash
# Escanear todo o repositório
npm run security:scan

# Escanear apenas arquivos modificados
gitleaks protect --config .gitleaks.toml --verbose

# Escanear commit específico
gitleaks detect --config .gitleaks.toml --source . --log-opts="--since=2024-01-01"
```

### 2. Pre-commit Hooks
**Objetivo**: Verificações automáticas antes de cada commit.

**Configuração**: `.pre-commit-config.yaml`
- Gitleaks para detecção de secrets
- Script personalizado para conteúdo sensível
- MarkdownLint para qualidade da documentação
- ESLint e TypeScript checking

**Instalação**:
```bash
# Instalar pre-commit
pip install pre-commit

# Instalar hooks no repositório
pre-commit install

# Executar em todos os arquivos
pre-commit run --all-files
```

### 3. Script Personalizado
**Objetivo**: Detectar e corrigir informações sensíveis específicas do projeto.

**Localização**: `scripts/fix-sensitive-content.js`

**Funcionalidades**:
- Detecta senhas fracas comuns
- Identifica tokens e API keys expostos
- Substitui por placeholders seguros
- Modo de verificação (`--check`)

**Uso**:
```bash
# Corrigir automaticamente
npm run fix-sensitive-content

# Apenas verificar (não corrigir)
npm run security:check

# Verificação completa
npm run security:full
```

### 4. CI/CD Pipeline
**Objetivo**: Verificações automáticas em pull requests e pushes.

**Localização**: `.github/workflows/code-quality.yml`

**Verificações incluídas**:
- Trivy para vulnerabilidades de dependências
- Gitleaks para detecção de secrets
- Script personalizado de conteúdo sensível
- Auditoria de dependências (`npm audit`)

## 🚨 Reportando Vulnerabilidades de Segurança

### Onde Reportar

Se você encontrar vulnerabilidades de segurança neste projeto de documentação, por favor:

1. **Abra uma issue** no repositório: [GitHub Issues](https://github.com/n8n-brasil/n8n-Doc-PT-BR/issues)
2. **Use o prefixo** `[SECURITY]` no título
3. **Descreva** o problema detalhadamente
4. **Inclua passos** para reproduzir se aplicável

### Tipos de Vulnerabilidades Relevantes

Para este projeto de documentação, consideramos relevantes:

- **Informações Sensíveis Expostas**: Senhas, tokens ou credenciais reais na documentação
- **Vulnerabilidades de Dependências**: Problemas de segurança nas dependências do Docusaurus
- **Cross-Site Scripting (XSS)**: Potencial execução de scripts maliciosos
- **Configurações Inseguras**: Exemplos de configuração que possam comprometer segurança

### Processo de Resposta

1. **Confirmação**: Resposta inicial em até **48 horas**
2. **Análise**: Investigação completa em até **7 dias**
3. **Correção**: Implementação de fix em até **14 dias**
4. **Publicação**: Release da correção em até **21 dias**

## 🚨 Alertas e Notificações

### Tipos de Detecção

1. **Senhas Comuns**:
   - `senha123`, `admin123`, `password`
   - Senhas específicas do contexto brasileiro

2. **Tokens e API Keys**:
   - Tokens JWT reais
   - API keys do Google, AWS, etc.
   - Client secrets OAuth

3. **Dados Pessoais**:
   - CPF e CNPJ brasileiros
   - Informações de identificação pessoal

4. **Configurações Inseguras**:
   - URLs de produção em exemplos
   - Credenciais hardcoded

### Processo de Resposta

1. **Detecção Automática**: As ferramentas identificam potenciais problemas
2. **Bloqueio**: Pre-commit hooks impedem commits inseguros
3. **Correção**: Script automatizado substitui por placeholders
4. **Verificação**: CI/CD valida que correções foram aplicadas

## 📋 Comandos Úteis

### Verificação Rápida
```bash
# Verificar apenas conteúdo sensível
npm run security:check

# Scan completo com Gitleaks
npm run security:scan

# Verificação completa
npm run security:full
```

### Correção Automática
```bash
# Corrigir informações sensíveis
npm run fix-sensitive-content

# Aplicar correções do linter
npm run lint:fix
```

### Debug e Análise
```bash
# Executar Gitleaks com mais detalhes
gitleaks detect --config .gitleaks.toml --verbose --log-level debug

# Verificar configuração do pre-commit
pre-commit run --all-files --verbose

# Testar hook específico
pre-commit run gitleaks --all-files
```

## 🔧 Customização

### Adicionar Novos Padrões
Edite `scripts/fix-sensitive-content.js`:
```javascript
const replacements = {
  'novo-padrao-sensivel': 'PLACEHOLDER_SEGURO',
  // ... outros padrões
};
```

### Configurar Gitleaks
Edite `.gitleaks.toml`:
```toml
[[rules]]
id = "custom-rule"
description = "Minha regra personalizada"
regex = '''pattern-regex'''
tags = ["custom", "sensitive"]
```

### Ajustar Pre-commit
Edite `.pre-commit-config.yaml`:
```yaml
- repo: local
  hooks:
    - id: minha-verificacao
      name: Minha Verificação Personalizada
      entry: meu-script.sh
      language: script
```

## Instalação Completa

```bash
# 1. Instalar dependências
npm install

# 2. Instalar pre-commit (Python)
pip install pre-commit

# 3. Instalar Gitleaks
# Linux/macOS:
brew install gitleaks
# Windows: baixar do GitHub releases

# 4. Configurar hooks
pre-commit install

# 5. Executar verificação inicial
npm run security:full
```

## 📊 Monitoramento

### Métricas Coletadas
- Número de secrets detectados por scan
- Tipos mais comuns de violações
- Arquivos mais problemáticos
- Tempo de execução das verificações

### Relatórios
- **Gitleaks**: `gitleaks-report.json`
- **CI/CD**: Artifacts do GitHub Actions
- **Pre-commit**: Logs locais

## 🤝 Contribuindo

### Para Desenvolvedores
1. Sempre execute `npm run security:check` antes de commit
2. Use placeholders seguros em exemplos
3. Não desabilite verificações de segurança
4. Reporte falsos positivos

### Para Revisores
1. Verifique se CI passou em todas as verificações
2. Confirme que placeholders são adequados
3. Teste exemplos de configuração
4. Valide que secrets não foram expostos

## Segurança da Documentação

### Práticas Implementadas

- ✅ **Placeholders Seguros**: Uso de `SUA_SENHA_AQUI` em vez de senhas reais
- ✅ **Verificação Automática**: Pipeline CI/CD com verificação de conteúdo sensível
- ✅ **Auditoria de Dependências**: `npm audit` automatizado
- ✅ **Escaneamento de Vulnerabilidades**: Trivy integrado ao CI/CD

### Diretrizes para Contribuidores

- **Nunca inclua** credenciais reais nos exemplos
- **Use placeholders** descritivos e seguros
- **Revise** exemplos antes de submeter PR
- **Execute** `npm run fix-sensitive-content` antes do commit

## Contato

Para questões de segurança urgentes ou sensíveis:

- **GitHub Issues**: [Reportar Issue](https://github.com/n8n-brasil/n8n-Doc-PT-BR/issues/new)
- **Discussões**: [GitHub Discussions](https://github.com/n8n-brasil/n8n-Doc-PT-BR/discussions)

---

**⚠️ Importante**: Estas ferramentas são configuradas para documentação. Para código de produção, considere ferramentas adicionais como SonarQube, Snyk, ou OWASP Dependency-Check.

**Nota**: Para vulnerabilidades do n8n (software principal), reporte diretamente ao [repositório oficial do n8n](https://github.com/n8n-io/n8n/security).
