# 🔍 Comandos de Busca Rápida para Problemas

Este arquivo contém todos os comandos para localizar rapidamente problemas na documentação.

## Execução Rápida

```bash
# Verificação completa de todos os problemas
npm run check-all-issues

# Verificações individuais
npm run check-broken-links
npm run check-duplicate-routes
npm run check-broken-anchors
```

## 📊 Problemas Encontrados

### Links Quebrados: 360 em 82 arquivos

### Rotas Duplicadas: 4 rotas

### Âncoras Quebradas: 3.099 em 240 arquivos

---

## 🔗 LINKS QUEBRADOS

### Buscar Links Markdown Quebrados

```bash
# Links que não começam com http
grep -r "\[.*\]([^h][^t][^t][^p].*)" docs/ --include="*.md" --include="*.mdx"

# Links para arquivos .md específicos
grep -r "\.md" docs/ --include="*.md" --include="*.mdx" | grep -v "\.mdx"

# Links relativos que podem estar quebrados
grep -r "\[.*\](\.\./.*)" docs/ --include="*.md" --include="*.mdx"
```

### Verificar Links Específicos

```bash
# Links para arquivo removido hosting-n8n/instalacao
grep -r "hosting-n8n/instalacao" docs/ --include="*.md" --include="*.mdx"

# Links para arquivos index duplicados
grep -r "index\.md" docs/ --include="*.md" --include="*.mdx"

# Links para seções que podem não existir
grep -r "/integracoes-br/" docs/ --include="*.md" --include="*.mdx"
```

### Comandos de Correção Avançados

```bash
# Substituir links para hosting-n8n/instalacao.md
find docs/ -name "*.md" -o -name "*.mdx" -exec sed -i 's/hosting-n8n\/instalacao\.md/hosting-n8n\/instalacao\/index.md/g' {} \;

# Substituir links para arquivos index duplicados
find docs/ -name "*.md" -o -name "*.mdx" -exec sed -i 's/\([^\/]\)index\.md/\1index/g' {} \;
```

---

## 🔄 ROTAS DUPLICADAS

### Encontrar Arquivos Index Duplicados

```bash
# Listar todos os arquivos index
find docs/ -name "index.md" -o -name "index.mdx" | sort

# Verificar duplicatas no mesmo diretório
find docs/ -name "index.*" | sed 's/\/index\.[^\/]*$//' | sort | uniq -d

# Contar duplicatas
find docs/ -name "index.*" | sed 's/\/index\.[^\/]*$//' | sort | uniq -d | wc -l
```

### Buscar Slugs Duplicados

```bash
# Extrair todos os slugs do frontmatter
grep -r "slug:" docs/ --include="*.md" --include="*.mdx" | sed 's/.*slug:\s*//' | sort | uniq -d
```

### Comandos de Correção

```bash
# Remover arquivos .md duplicados (manter .mdx)
rm docs/contribuir/index.md
rm docs/comunidade/videos/index.md
rm docs/comunidade/casos-uso-avancados/index.md
rm docs/comunidade/automacao-iniciantes/index.md
```

---

## 🎯 ÂNCORAS QUEBRADAS

### Buscar Âncoras em Links

```bash
# Links com âncoras
grep -r "\[.*\](.*#.*)" docs/ --include="*.md" --include="*.mdx"

# Âncoras específicas que podem estar quebradas
grep -r "#[a-zA-Z0-9-]*" docs/ --include="*.md" --include="*.mdx" | grep -v "^#"
```

### Verificar Títulos

```bash
# Extrair todos os títulos (H1-H6)
grep -r "^#{1,6}\s" docs/ --include="*.md" --include="*.mdx"

# Títulos com caracteres especiais
grep -r "^#{1,6}\s.*[^a-zA-Z0-9\s-]" docs/ --include="*.md" --include="*.mdx"

# Contar títulos por nível
grep -r "^#" docs/ --include="*.md" --include="*.mdx" | cut -d' ' -f1 | sort | uniq -c
```

### Códigos de Cor (Falsos Positivos)

```bash
# Buscar códigos de cor que estão sendo interpretados como âncoras
grep -r "#[0-9a-fA-F]\{6\}" docs/ --include="*.md" --include="*.mdx"

# Códigos de cor específicos encontrados
grep -r "#ea4b71\|#10b981\|#f59e0b\|#3b82f6" docs/ --include="*.md" --include="*.mdx"
```

### Comandos de Correção de Slugs

```bash
# Gerar slugs válidos para títulos
grep -r "^#{1,6}\s" docs/ --include="*.md" --include="*.mdx" | while read line; do
  title=$(echo "$line" | sed 's/^#{1,6}\s*//')
  slug=$(echo "$title" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9\s-]//g' | sed 's/\s\+/-/g' | sed 's/-\+/-/g')
  echo "Título: $title -> Slug: $slug"
done
```

---

## 📁 ESTRUTURA DE ARQUIVOS

### Verificar Arquivos Órfãos

```bash
# Encontrar arquivos que não são referenciados no sidebar
find docs/ -name "*.md" -o -name "*.mdx" | while read file; do
  if ! grep -q "$(basename "$file" | sed 's/\.[^.]*$//')" sidebars.ts; then
    echo "Possível arquivo órfão: $file"
  fi
done
```

### Verificar Referências no Sidebar

```bash
# Extrair todas as referências do sidebar
grep -r "docs/" sidebars.ts | sed 's/.*docs\///' | sed 's/["'\''].*//' | sort

# Verificar se as referências existem
grep -r "docs/" sidebars.ts | sed 's/.*docs\///' | sed 's/["'\''].*//' | while read file; do
  if [ ! -f "docs/$file.md" ] && [ ! -f "docs/$file.mdx" ]; then
    echo "Referência quebrada no sidebar: $file"
  fi
done
```

---

## 🚨 PROBLEMAS ESPECÍFICOS

### Buscar Problemas Conhecidos

```bash
# Referências a arquivos removidos
grep -r "instalacao\.md" docs/ --include="*.md" --include="*.mdx"

# Links que podem estar quebrados após reorganização
grep -r "\.\./\.\./" docs/ --include="*.md" --include="*.mdx"

# Links absolutos que podem estar incorretos
grep -r "\[.*\]\(/.*\)" docs/ --include="*.md" --include="*.mdx"
```

### Verificar Seções Específicas

```bash
# Seção hosting-n8n
grep -r "hosting-n8n" docs/ --include="*.md" --include="*.mdx" | grep -E "(instalacao|configuracao)"

# Seção embed
grep -r "embed" docs/ --include="*.md" --include="*.mdx" | grep -E "(preparacao|gerenciamento)"

# Seção integracoes-br
grep -r "integracoes-br" docs/ --include="*.md" --include="*.mdx"
```

---

## 📊 COMANDOS DE ESTATÍSTICAS

### Contar Problemas por Tipo

```bash
# Contar links quebrados
grep -r "\[.*\]([^h][^t][^t][^p].*)" docs/ --include="*.md" --include="*.mdx" | wc -l

# Contar arquivos index duplicados
find docs/ -name "index.*" | sed 's/\/index\.[^\/]*$//' | sort | uniq -d | wc -l

# Contar âncoras quebradas
grep -r "\[.*\](.*#.*)" docs/ --include="*.md" --include="*.mdx" | wc -l

# Contar arquivos com problemas
find docs/ -name "*.md" -o -name "*.mdx" | wc -l
```

### Estatísticas por Seção

```bash
# Contar arquivos por seção
find docs/ -name "*.md" -o -name "*.mdx" | sed 's/docs\///' | cut -d'/' -f1 | sort | uniq -c

# Contar problemas por seção
grep -r "\[.*\]([^h][^t][^t][^p].*)" docs/ --include="*.md" --include="*.mdx" | sed 's/docs\///' | cut -d'/' -f1 | sort | uniq -c
```

---

## 🔧 COMANDOS DE CORREÇÃO AUTOMÁTICA

### Substituições em Lote

```bash
# Corrigir links para hosting-n8n/instalacao
find docs/ -name "*.md" -o -name "*.mdx" -exec sed -i 's/hosting-n8n\/instalacao\.md/hosting-n8n\/instalacao\/index.md/g' {} \;

# Corrigir links para arquivos index
find docs/ -name "*.md" -o -name "*.mdx" -exec sed -i 's/\([^\/]\)index\.md/\1index/g' {} \;

# Remover códigos de cor inline (substituir por classes CSS)
find docs/ -name "*.md" -o -name "*.mdx" -exec sed -i 's/style="color: #ea4b71"/class="text-primary"/g' {} \;
```

### Verificação Pós-Correção

```bash
# Verificar se as correções funcionaram
npm run check-all-issues

# Testar build
npm run build
```

---

## 💡 DICAS DE USO

### Ordem de Prioridade

1. **Links quebrados** - Impedem navegação
2. **Rotas duplicadas** - Causam conflitos no build
3. **Âncoras quebradas** - Quebram navegação interna

### Antes de Executar Correções

```bash
# Fazer backup
cp -r docs docs_backup_$(date +%Y%m%d_%H%M%S)

# Verificar se há arquivos não versionados
git status
```

### Após Correções

```bash
# Verificar se o build funciona
npm run build

# Executar verificações novamente
npm run check-all-issues

# Fazer commit das correções
git add .
git commit -m "fix: corrigir links quebrados e rotas duplicadas"
```

---

## 🎯 COMANDOS ESPECÍFICOS POR PROBLEMA

### Para Links Quebrados em integracoes-br

```bash
# Verificar se os arquivos de destino existem
find docs/integracoes-br/ -name "*.md" -o -name "*.mdx" | sort

# Buscar links quebrados específicos
grep -r "/integracoes-br/financeiro/index" docs/ --include="*.md" --include="*.mdx"
grep -r "/integracoes-br/governo/index" docs/ --include="*.md" --include="*.mdx"
grep -r "/integracoes-br/localizacao/index" docs/ --include="*.md" --include="*.mdx"
```

### Para Âncoras Quebradas por Códigos de Cor

```bash
# Listar todos os códigos de cor encontrados
grep -r "#[0-9a-fA-F]\{6\}" docs/ --include="*.md" --include="*.mdx" | sed 's/.*#\([0-9a-fA-F]\{6\}\).*/\1/' | sort | uniq

# Substituir códigos de cor por classes CSS
find docs/ -name "*.md" -o -name "*.mdx" -exec sed -i 's/#ea4b71/class="text-primary"/g' {} \;
find docs/ -name "*.md" -o -name "*.mdx" -exec sed -i 's/#10b981/class="text-success"/g' {} \;
find docs/ -name "*.md" -o -name "*.mdx" -exec sed -i 's/#f59e0b/class="text-warning"/g' {} \;
```

---

## 📞 SUPORTE

Se os comandos não funcionarem:

1. **Verificar sistema operacional:**

   ```bash
   # Windows (PowerShell)
   Get-ChildItem -Recurse -Include "*.md","*.mdx" | Select-String "pattern"
   
   # Linux/Mac
   grep -r "pattern" docs/ --include="*.md" --include="*.mdx"
   ```

2. **Verificar permissões:**

   ```bash
   chmod +x scripts/*.js
   ```

3. **Verificar dependências:**

   ```bash
   npm install
   ```

4. **Executar scripts Node.js diretamente:**

   ```bash
   node scripts/find-broken-links.js
   ```

---

**🎯 Use estes comandos para localizar e corrigir rapidamente todos os problemas na documentação!**
