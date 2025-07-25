---
sidebar_position: 3
title: Data Mapping Avançado
description: Técnicas avançadas de mapeamento e transformação de dados no n8n
keywords: [n8n, data mapping, transformação, expressões, funções, manipulação de dados]
---


# <ion-icon name="analytics-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Data Mapping Avançado

Aprenda técnicas avançadas de mapeamento e transformação de dados para criar workflows mais poderosos e eficientes no n8n.

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 1 | Expressões Avançadas

### Funções Matemáticas

**Operações matemáticas complexas:**

```javascript
// Soma com validação
{{ $json.valor1 + $json.valor2 || 0 }}

// Média de valores
{{ ($json.valor1 + $json.valor2 + $json.valor3) / 3 }}

// Porcentagem
{{ ($json.atual / $json.total) * 100 }}

// Arredondamento
{{ Math.round($json.valor * 100) / 100 }}
```

### Manipulação de Strings

**Transformações de texto avançadas:**

```javascript
// Capitalizar primeira letra
{{ $json.nome.charAt(0).toUpperCase() + $json.nome.slice(1) }}

// Extrair domínio de email
{{ $json.email.split('@')[1] }}

// Remover caracteres especiais
{{ $json.texto.replace(/[^a-zA-Z0-9]/g, '') }}

// Formatar CPF
{{ $json.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') }}
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 2 | Lógica Condicional

### Operadores Ternários

**Condições em uma linha:**

```javascript
// Status baseado em valor
{{ $json.valor > 100 ? 'Alto' : 'Baixo' }}

// Formatação condicional
{{ $json.tipo === 'cliente' ? 'Cliente VIP' : 'Cliente Regular' }}

// Valor padrão
{{ $json.nome || 'Nome não informado' }}

// Múltiplas condições
{{ $json.score > 90 ? 'Excelente' : $json.score > 70 ? 'Bom' : 'Regular' }}
```

### Validações Complexas

**Verificações avançadas:**

```javascript
// Validar email
{{ /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($json.email) ? 'Válido' : 'Inválido' }}

// Validar CPF
{{ $json.cpf.length === 11 && /^\d+$/.test($json.cpf) ? 'Válido' : 'Inválido' }}

// Verificar se é número
{{ typeof $json.valor === 'number' ? $json.valor : 0 }}

// Validar data
{{ new Date($json.data) instanceof Date && !isNaN(new Date($json.data)) ? 'Válida' : 'Inválida' }}
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 3 | Manipulação de Arrays

### Filtros Avançados

**Filtrar dados complexos:**

```javascript
// Filtrar por valor
{{ $json.items.filter(item => item.status === 'ativo') }}

// Filtrar por múltiplas condições
{{ $json.produtos.filter(prod => prod.preco > 50 && prod.categoria === 'eletronicos') }}

// Filtrar valores únicos
{{ [...new Set($json.emails)] }}

// Filtrar por data
{{ $json.pedidos.filter(pedido => new Date(pedido.data) > new Date('2024-01-01')) }}
```

### Transformações de Array

**Modificar arrays:**

```javascript
// Mapear propriedades
{{ $json.usuarios.map(user => ({ nome: user.name, email: user.email })) }}

// Calcular totais
{{ $json.items.map(item => ({ ...item, total: item.quantidade * item.preco })) }}

// Adicionar timestamps
{{ $json.logs.map(log => ({ ...log, timestamp: new Date().toISOString() })) }}

// Formatar dados
{{ $json.clientes.map(cliente => ({ 
  nome: cliente.nome.toUpperCase(),
  telefone: cliente.telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
})) }}
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 4 | Funções Customizadas

### Funções JavaScript

**Criar funções reutilizáveis:**

```javascript
// Função para formatar moeda
{{ (function(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
})($json.valor) }}

// Função para validar CNPJ
{{ (function(cnpj) {
  cnpj = cnpj.replace(/[^\d]/g, '');
  if (cnpj.length !== 14) return false;
  // Lógica de validação do CNPJ
  return true;
})($json.cnpj) }}

// Função para gerar slug
{{ (function(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
})($json.titulo) }}
```

### Bibliotecas Externas

**Usar bibliotecas JavaScript:**

```javascript
// Usar moment.js para datas
{{ moment($json.data).format('DD/MM/YYYY') }}

// Usar lodash para manipulação
{{ _.groupBy($json.items, 'categoria') }}

// Usar validator.js para validações
{{ validator.isEmail($json.email) }}
```

---

## <ion-icon name="location-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 5 | Mapeamento de Objetos Complexos

### Objetos Aninhados

**Acessar dados profundos:**

```javascript
// Acesso seguro a propriedades
{{ $json?.cliente?.endereco?.cidade || 'Não informado' }}

// Desestruturação
{{ (function(data) {
  const { nome, email, telefone } = data.cliente;
  return { nome, email, telefone };
})($json) }}

// Mapeamento de objetos aninhados
{{ $json.pedidos.map(pedido => ({
  id: pedido.id,
  cliente: pedido.cliente.nome,
  endereco: `${pedido.cliente.endereco.rua}, ${pedido.cliente.endereco.numero}`,
  itens: pedido.itens.length
})) }}
```

### Transformações de Estrutura

**Reorganizar dados:**

```javascript
// Converter array para objeto
{{ (function(items) {
  return items.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
})($json.produtos) }}

// Agrupar por categoria
{{ (function(items) {
  return items.reduce((acc, item) => {
    if (!acc[item.categoria]) acc[item.categoria] = [];
    acc[item.categoria].push(item);
    return acc;
  }, {});
})($json.produtos) }}

// Flatten de arrays aninhados
{{ (function(data) {
  return data.reduce((acc, item) => {
    return acc.concat(item.subitems || []);
  }, []);
})($json.categorias) }}
```

---

## <ion-icon name="analytics-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 6 | Manipulação de Datas

### Formatação de Datas

**Formatos brasileiros:**

```javascript
// Data brasileira
{{ new Date($json.data).toLocaleDateString('pt-BR') }}

// Data e hora
{{ new Date($json.data).toLocaleString('pt-BR') }}

// Data relativa
{{ (function(data) {
  const agora = new Date();
  const data = new Date(data);
  const diff = Math.floor((agora - data) / (1000 * 60 * 60 * 24));
  return diff === 0 ? 'Hoje' : diff === 1 ? 'Ontem' : `${diff} dias atrás`;
})($json.data) }}

// Dia da semana
{{ new Date($json.data).toLocaleDateString('pt-BR', { weekday: 'long' }) }}
```

### Cálculos de Tempo

**Operações temporais:**

```javascript
// Diferença em dias
{{ Math.floor((new Date($json.dataFim) - new Date($json.dataInicio)) / (1000 * 60 * 60 * 24)) }}

// Adicionar dias
{{ new Date($json.data).setDate(new Date($json.data).getDate() + 7) }}

// Verificar se é fim de semana
{{ (function(data) {
  const dia = new Date(data).getDay();
  return dia === 0 || dia === 6 ? 'Fim de semana' : 'Dia útil';
})($json.data) }}

// Calcular idade
{{ (function(dataNascimento) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  return hoje.getFullYear() - nascimento.getFullYear();
})($json.dataNascimento) }}
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 7 | Validação e Sanitização

### Validações de Dados

**Verificar integridade:**

```javascript
// Validar campos obrigatórios
{{ (function(data) {
  const campos = ['nome', 'email', 'telefone'];
  return campos.every(campo => data[campo] && data[campo].trim() !== '');
})($json) }}

// Validar formato de telefone
{{ /^\(\d{2}\) \d{5}-\d{4}$/.test($json.telefone) }}

// Validar CPF
{{ (function(cpf) {
  cpf = cpf.replace(/[^\d]/g, '');
  if (cpf.length !== 11) return false;
  // Algoritmo de validação do CPF
  return true;
})($json.cpf) }}

// Validar email corporativo
{{ /@empresa\.com\.br$/.test($json.email) }}
```

### Sanitização de Dados

**Limpar dados:**

```javascript
// Remover espaços extras
{{ $json.texto.trim() }}

// Normalizar telefone
{{ $json.telefone.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') }}

// Capitalizar nome
{{ (function(nome) {
  return nome.split(' ').map(palavra => 
    palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase()
  ).join(' ');
})($json.nome) }}

// Remover caracteres especiais
{{ $json.texto.replace(/[^\w\s]/g, '') }}
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 8 | Próximos passos

1. **[Transformações de Dados](./transformacoes-dados)** - Técnicas de transformação
2. **[Agregações e Estatísticas](./agregacoes-estatisticas)** - Cálculos complexos
3. **[Integração com APIs](./integracao-apis)** - Mapeamento de respostas de API

> *Agora você domina técnicas avançadas de data mapping. Use essas habilidades para criar workflows mais inteligentes e eficientes!*

---

:::tip **Dica Pro**
Crie templates de expressões comuns que você pode reutilizar em diferentes workflows. Isso acelera o desenvolvimento.
:::

:::warning **Importante**
Sempre teste expressões complexas com dados reais antes de usar em produção. Valide os resultados esperados.
:::

:::info **Recurso Adicional**
Use o Node.js Function node para expressões muito complexas que não cabem em um campo de mapeamento.
:::
