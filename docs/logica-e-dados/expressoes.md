:::info
<ion-icon name="shield-checkmark-outline" style={{ fontSize: '18px', color: '#17a2b8' }}></ion-icon> Esta página da documentação foi validada tecnicamente e didaticamente.
:::

---
title: Expressões n8n
description: Guia completo sobre expressões no n8n, incluindo sintaxe, funções, exemplos práticos e boas práticas
sidebar_position: 1
keywords: [n8n, expressões, javascript, sintaxe, funções, dados, dinâmicos]
---

# <ion-icon name="code-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Expressões n8n

As **Expressões n8n** são fórmulas JavaScript que permitem usar dados dinâmicos, fazer cálculos e manipular informações em seus workflows. Elas são fundamentais para criar automações inteligentes e flexíveis.

## O que são Expressões?

Expressões são trechos de código JavaScript que:

- **Acessam dados** de nodes anteriores
- **Fazem cálculos** e transformações
- **Criam condições** dinâmicas
- **Formatam dados** para saída
- **Validam informações** em tempo real

### Sintaxe Básica

As expressões no n8n usam a sintaxe `{{ }}`:

```javascript
{{ expressão_javascript_aqui }}
```

## Acesso a Dados

### Dados do Item Atual

Para acessar dados do item atual:

```javascript
// Acessar campo específico
{{ $json.nome }}

// Acessar campo aninhado
{{ $json.endereco.cidade }}

// Acessar array
{{ $json.itens[0].nome }}

// Acessar propriedade dinâmica
{{ $json['campo-dinamico'] }}
```

### Dados de Nodes Específicos

Para acessar dados de nodes anteriores:

```javascript
// Dados do node "HTTP Request"
{{ $('HTTP Request').json.resposta }}

// Dados do primeiro node
{{ $('Manual Trigger').json.entrada }}

// Dados de múltiplos nodes
{{ $('Node A').json.valor + $('Node B').json.valor }}
```

### Dados de Todos os Items

Para trabalhar com múltiplos items:

```javascript
// Todos os items
{{ $input.all() }}

// Primeiro item
{{ $input.first() }}

// Item específico por índice
{{ $input.item[0] }}

// Último item
{{ $input.last() }}
```

## Funções de Data e Hora

### Data Atual

```javascript
// Data atual em ISO
{{ $now.toISOString() }}

// Data formatada
{{ $now.toFormat('dd/MM/yyyy HH:mm:ss') }}

// Timestamp Unix
{{ $now.toMillis() }}

// Data em português
{{ $now.toFormat('dd \'de\' MMMM \'de\' yyyy') }}
```

### Cálculos com Datas

```javascript
// Adicionar dias
{{ $now.plus({ days: 7 }).toISOString() }}

// Subtrair horas
{{ $now.minus({ hours: 2 }).toISOString() }}

// Diferença entre datas
{{ $now.diff($json.data_anterior, 'days') }}

// Data específica
{{ DateTime.fromISO('2024-01-15').toFormat('dd/MM/yyyy') }}
```

### Formatação de Datas

```javascript
// Formato brasileiro
{{ $now.toFormat('dd/MM/yyyy') }}

// Com dia da semana
{{ $now.toFormat('EEEE, dd \'de\' MMMM \'de\' yyyy') }}

// Hora apenas
{{ $now.toFormat('HH:mm') }}

// Data relativa
{{ $now.toRelative() }}
```

## Manipulação de Texto

### Operações Básicas

```javascript
// Concatenar strings
{{ $json.nome + ' ' + $json.sobrenome }}

// Converter para maiúsculo
{{ $json.texto.toUpperCase() }}

// Converter para minúsculo
{{ $json.texto.toLowerCase() }}

// Capitalizar primeira letra
{{ $json.texto.charAt(0).toUpperCase() + $json.texto.slice(1) }}
```

### Busca e Substituição

```javascript
// Verificar se contém texto
{{ $json.texto.includes('palavra') }}

// Substituir texto
{{ $json.texto.replace('antigo', 'novo') }}

// Substituir múltiplas ocorrências
{{ $json.texto.replace(/antigo/g, 'novo') }}

// Extrair parte do texto
{{ $json.texto.substring(0, 10) }}

// Dividir texto
{{ $json.texto.split(',') }}
```

### Validação de Texto

```javascript
// Verificar se está vazio
{{ $json.texto.length === 0 }}

// Verificar se não está vazio
{{ $json.texto && $json.texto.length > 0 }}

// Validar email
{{ /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($json.email) }}

// Validar CPF (formato básico)
{{ /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test($json.cpf) }}
```

## Cálculos Matemáticos

### Operações Básicas

```javascript
// Soma
{{ $json.valor1 + $json.valor2 }}

// Subtração
{{ $json.valor1 - $json.valor2 }}

// Multiplicação
{{ $json.quantidade * $json.preco }}

// Divisão
{{ $json.total / $json.quantidade }}

// Módulo (resto)
{{ $json.numero % 2 }}
```

### Funções Matemáticas

```javascript
// Arredondar
{{ Math.round($json.valor) }}

// Arredondar para cima
{{ Math.ceil($json.valor) }}

// Arredondar para baixo
{{ Math.floor($json.valor) }}

// Valor absoluto
{{ Math.abs($json.valor) }}

// Potência
{{ Math.pow($json.base, $json.expoente) }}

// Raiz quadrada
{{ Math.sqrt($json.valor) }}
```

### Cálculos Financeiros

```javascript
// Calcular desconto
{{ $json.valor * (1 - $json.desconto / 100) }}

// Calcular juros
{{ $json.principal * (1 + $json.taxa / 100) ** $json.tempo }}

// Calcular média
{{ ($json.valor1 + $json.valor2 + $json.valor3) / 3 }}

// Calcular porcentagem
{{ ($json.parte / $json.total) * 100 }}
```

## Arrays e Objetos

### Manipulação de Arrays

```javascript
// Tamanho do array
{{ $json.itens.length }}

// Primeiro elemento
{{ $json.itens[0] }}

// Último elemento
{{ $json.itens[$json.itens.length - 1] }}

// Filtrar array
{{ $json.itens.filter(item => item.ativo) }}

// Mapear array
{{ $json.itens.map(item => item.nome) }}

// Reduzir array
{{ $json.itens.reduce((sum, item) => sum + item.valor, 0) }}
```

### Manipulação de Objetos

```javascript
// Chaves do objeto
{{ Object.keys($json) }}

// Valores do objeto
{{ Object.values($json) }}

// Entradas do objeto
{{ Object.entries($json) }}

// Verificar se propriedade existe
{{ 'campo' in $json }}

// Mesclar objetos
{{ { ...$json, novoCampo: 'valor' } }}
```

## Condições e Lógica

### Operadores de Comparação

```javascript
// Igualdade
{{ $json.valor === 100 }}

// Desigualdade
{{ $json.valor !== 100 }}

// Maior que
{{ $json.valor > 100 }}

// Menor que
{{ $json.valor < 100 }}

// Maior ou igual
{{ $json.valor >= 100 }}

// Menor ou igual
{{ $json.valor <= 100 }}
```

### Operadores Lógicos

```javascript
// E lógico
{{ $json.ativo && $json.valor > 0 }}

// OU lógico
{{ $json.categoria === 'A' || $json.categoria === 'B' }}

// NÃO lógico
{{ !$json.inativo }}

// Múltiplas condições
{{ $json.idade >= 18 && $json.ativo && $json.saldo > 0 }}
```

### Operador Ternário

```javascript
// Condição simples
{{ $json.valor > 100 ? 'Alto' : 'Baixo' }}

// Condição aninhada
{{ $json.valor > 100 ? 'Alto' : $json.valor > 50 ? 'Médio' : 'Baixo' }}

// Com valores dinâmicos
{{ $json.ativo ? $json.nome : 'Usuário Inativo' }}
```

## Funções Personalizadas

### Funções Simples

```javascript
// Função para formatar CPF
{{ (function(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
})($json.cpf) }}

// Função para validar email
{{ (function(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
})($json.email) }}

// Função para calcular idade
{{ (function(dataNascimento) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  return hoje.getFullYear() - nascimento.getFullYear();
})($json.data_nascimento) }}
```

### Funções com Múltiplos Parâmetros

```javascript
// Função para calcular desconto
{{ (function(valor, desconto) {
  return valor * (1 - desconto / 100);
})($json.valor, $json.desconto) }}

// Função para formatar endereço
{{ (function(logradouro, numero, bairro, cidade, estado) {
  return `${logradouro}, ${numero} - ${bairro}, ${cidade}/${estado}`;
})($json.logradouro, $json.numero, $json.bairro, $json.cidade, $json.estado) }}
```

## Exemplos Práticos

### Exemplo 1: Validação de Dados

```javascript
// Validar dados de cliente
{
  "cliente_valido": {{ $json.nome && $json.email && $json.cpf }},
  "idade": {{ $now.diff($json.data_nascimento, 'years') }},
  "maior_idade": {{ $now.diff($json.data_nascimento, 'years') >= 18 }},
  "email_valido": {{ /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($json.email) }},
  "cpf_valido": {{ /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test($json.cpf) }}
}
```

### Exemplo 2: Cálculos Financeiros

```javascript
// Calcular valores de venda
{
  "subtotal": {{ $json.quantidade * $json.preco_unitario }},
  "desconto_valor": {{ ($json.quantidade * $json.preco_unitario) * ($json.desconto / 100) }},
  "total": {{ ($json.quantidade * $json.preco_unitario) * (1 - $json.desconto / 100) }},
  "parcelas": {{ Math.ceil(($json.quantidade * $json.preco_unitario) / $json.valor_parcela) }},
  "valor_parcela": {{ (($json.quantidade * $json.preco_unitario) * (1 - $json.desconto / 100)) / $json.num_parcelas }}
}
```

### Exemplo 3: Formatação de Dados

```javascript
// Formatar dados para relatório
{
  "nome_completo": {{ $json.nome + ' ' + $json.sobrenome }},
  "endereco_formatado": {{ $json.logradouro + ', ' + $json.numero + ' - ' + $json.bairro + ', ' + $json.cidade + '/' + $json.estado }},
  "telefone_formatado": {{ $json.telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') }},
  "data_formatada": {{ DateTime.fromISO($json.data).toFormat('dd/MM/yyyy HH:mm') }},
  "status_formatado": {{ $json.ativo ? 'Ativo' : 'Inativo' }}
}
```

### Exemplo 4: Lógica Condicional

```javascript
// Classificar cliente por valor
{
  "categoria": {{ 
    $json.valor_total > 10000 ? 'Premium' : 
    $json.valor_total > 5000 ? 'Gold' : 
    $json.valor_total > 1000 ? 'Silver' : 'Bronze' 
  }},
  "desconto_aplicavel": {{ 
    $json.valor_total > 10000 ? 15 : 
    $json.valor_total > 5000 ? 10 : 
    $json.valor_total > 1000 ? 5 : 0 
  }},
  "frete_gratis": {{ $json.valor_total > 100 }},
  "prioridade": {{ $json.categoria === 'Premium' ? 'Alta' : 'Normal' }}
}
```

## Boas Práticas

### 1. Performance

```javascript
// ✅ Bom: Cache de valores calculados
{{ (function() {
  const valor = $json.valor;
  const desconto = $json.desconto;
  return {
    subtotal: valor,
    desconto_valor: valor * (desconto / 100),
    total: valor * (1 - desconto / 100)
  };
})() }}

// ❌ Evitar: Cálculos repetidos
{{ $json.valor * (1 - $json.desconto / 100) }}
{{ $json.valor * ($json.desconto / 100) }}
```

### 2. Legibilidade

```javascript
// ✅ Bom: Expressões claras
{{ $json.ativo && $json.saldo > 0 ? 'Cliente Ativo' : 'Cliente Inativo' }}

// ❌ Evitar: Expressões complexas
{{ $json.ativo===true&&$json.saldo>0?'Cliente Ativo':'Cliente Inativo' }}
```

### 3. Tratamento de Erros

```javascript
// ✅ Bom: Validação de dados
{{ $json.valor && !isNaN($json.valor) ? $json.valor * 1.1 : 0 }}

// ❌ Evitar: Sem validação
{{ $json.valor * 1.1 }}
```

### 4. Reutilização

```javascript
// ✅ Bom: Funções reutilizáveis
{{ (function(valor, desconto) {
  return valor * (1 - desconto / 100);
})($json.valor, $json.desconto) }}

// ❌ Evitar: Código duplicado
{{ $json.valor * (1 - $json.desconto / 100) }}
```

## Troubleshooting

### Problemas Comuns

#### Expressão não funciona
- Verifique a sintaxe JavaScript
- Confirme se os campos existem
- Teste com dados de exemplo
- Use Debug Helper para inspecionar dados

#### Dados não aparecem
- Verifique se o node anterior tem dados
- Confirme o nome dos campos
- Teste com `{{ $json }}` para ver todos os dados
- Verifique se há erros de sintaxe

#### Performance lenta
- Evite cálculos complexos em loops
- Use cache para valores calculados
- Simplifique expressões quando possível
- Monitore tempo de execução

### Debug

1. **Use Debug Helper** para ver dados
2. **Teste expressões** em partes menores
3. **Use console.log** para debug
4. **Verifique logs** de erro
5. **Teste com dados simples**

## Funções Úteis

### Funções de String

```javascript
// Verificar se string está vazia
{{ $json.texto && $json.texto.trim().length > 0 }}

// Extrair domínio de email
{{ $json.email.split('@')[1] }}

// Capitalizar palavras
{{ $json.texto.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }}

// Remover acentos
{{ $json.texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '') }}
```

### Funções de Array

```javascript
// Verificar se array contém valor
{{ $json.itens.includes('item') }}

// Encontrar item em array
{{ $json.itens.find(item => item.id === $json.id) }}

// Contar itens que atendem condição
{{ $json.itens.filter(item => item.ativo).length }}

// Somar valores de array
{{ $json.itens.reduce((sum, item) => sum + item.valor, 0) }}
```

### Funções de Data

```javascript
// Verificar se é fim de semana
{{ [0, 6].includes($now.weekday) }}

// Verificar se é feriado (exemplo)
{{ ['2024-01-01', '2024-12-25'].includes($now.toFormat('yyyy-MM-dd')) }}

// Calcular dias úteis
{{ (function(dataInicio, dataFim) {
  let dias = 0;
  let data = DateTime.fromISO(dataInicio);
  const fim = DateTime.fromISO(dataFim);
  
  while (data <= fim) {
    if (data.weekday < 6) dias++;
    data = data.plus({ days: 1 });
  }
  return dias;
})($json.data_inicio, $json.data_fim) }}
```

## Próximos Passos

- [HTTP Request](../integracoes/builtin-nodes/http-requests/http-request) - Usar expressões em requisições
- [Code Node](../integracoes/builtin-nodes/core-nodes/code) - JavaScript avançado
- [Tratamento de Erros](./flow-logic/error-handling) - Lidar com falhas
- [Data Processing](../integracoes/builtin-nodes/data-processing/index) - Processar dados
- [Templates](../integracoes/templates) - Ver exemplos práticos 