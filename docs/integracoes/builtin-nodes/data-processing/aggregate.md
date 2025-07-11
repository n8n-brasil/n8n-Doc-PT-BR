---
title: Aggregate Node
description: Guia completo sobre o Aggregate Node no n8n, incluindo agrupamento, agregações, exemplos práticos e boas práticas
sidebar_position: 3
keywords: [n8n, aggregate node, agregação, agrupamento, dados, estatísticas, sum, count, average]
---

# <ion-icon name="analytics-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Aggregate Node

O **Aggregate Node** é uma ferramenta poderosa do n8n para agrupar e agregar dados. Ele permite calcular estatísticas, somar valores, contar itens e criar resumos baseados em critérios específicos.

## O que é o Aggregate Node?

O **Aggregate Node** permite:

- **Agrupar** dados por campos específicos
- **Calcular** estatísticas (soma, média, contagem)
- **Criar** resumos de dados
- **Consolidar** informações de múltiplos itens
- **Gerar** relatórios agregados
- **Reduzir** volume de dados

### Quando Usar o Aggregate Node

- **Relatórios** de vendas por período
- **Estatísticas** de usuários por categoria
- **Consolidação** de dados de múltiplas fontes
- **Análise** de performance por região
- **Resumos** de transações financeiras
- **Agregação** de métricas de negócio

## Configuração Básica

### Estrutura do Aggregate Node

```javascript
// Aggregate Node - Estrutura básica
{
  "groupBy": ["categoria", "regiao"], // Campos para agrupar
  "aggregations": [
    {
      "field": "valor",
      "operation": "sum",
      "name": "total_valor"
    },
    {
      "field": "id",
      "operation": "count",
      "name": "quantidade_itens"
    }
  ]
}
```

### Campos de Agrupamento

#### 1. Agrupamento Simples

```javascript
// Agrupar por um campo
{
  "groupBy": ["categoria"]
}

// Agrupar por múltiplos campos
{
  "groupBy": ["categoria", "regiao", "mes"]
}
```

#### 2. Agrupamento com Expressões

```javascript
// Agrupar por data formatada
{
  "groupBy": ["{{ $json.data.substring(0, 7) }}"] // YYYY-MM
}

// Agrupar por faixa de valor
{
  "groupBy": ["{{ $json.valor > 1000 ? 'Alto' : 'Baixo' }}"]
}

// Agrupar por categoria condicional
{
  "groupBy": ["{{ $json.categoria || 'Sem Categoria' }}"]
}
```

### Operações de Agregação

#### 1. Soma (Sum)

```javascript
// Somar valores numéricos
{
  "field": "valor",
  "operation": "sum",
  "name": "total_vendas"
}

// Somar com condição
{
  "field": "{{ $json.status === 'aprovado' ? $json.valor : 0 }}",
  "operation": "sum",
  "name": "total_aprovado"
}
```

#### 2. Contagem (Count)

```javascript
// Contar todos os itens
{
  "field": "id",
  "operation": "count",
  "name": "total_registros"
}

// Contar com condição
{
  "field": "{{ $json.ativo ? 1 : 0 }}",
  "operation": "sum",
  "name": "registros_ativos"
}
```

#### 3. Média (Average)

```javascript
// Calcular média
{
  "field": "valor",
  "operation": "average",
  "name": "valor_medio"
}

// Média com filtro
{
  "field": "{{ $json.valor > 0 ? $json.valor : null }}",
  "operation": "average",
  "name": "media_valores_positivos"
}
```

#### 4. Mínimo e Máximo

```javascript
// Valor mínimo
{
  "field": "valor",
  "operation": "min",
  "name": "valor_minimo"
}

// Valor máximo
{
  "field": "valor",
  "operation": "max",
  "name": "valor_maximo"
}
```

#### 5. Primeiro e Último

```javascript
// Primeiro valor
{
  "field": "nome",
  "operation": "first",
  "name": "primeiro_nome"
}

// Último valor
{
  "field": "data",
  "operation": "last",
  "name": "ultima_data"
}
```

## Exemplos Práticos

### 1. Relatório de Vendas por Categoria

```javascript
// Aggregate Node - Vendas por categoria
{
  "groupBy": ["categoria"],
  "aggregations": [
    {
      "field": "valor",
      "operation": "sum",
      "name": "total_vendas"
    },
    {
      "field": "id",
      "operation": "count",
      "name": "quantidade_vendas"
    },
    {
      "field": "valor",
      "operation": "average",
      "name": "ticket_medio"
    },
    {
      "field": "valor",
      "operation": "min",
      "name": "menor_venda"
    },
    {
      "field": "valor",
      "operation": "max",
      "name": "maior_venda"
    }
  ]
}
```

**Resultado:**
```json
[
  {
    "categoria": "Eletrônicos",
    "total_vendas": 15000,
    "quantidade_vendas": 25,
    "ticket_medio": 600,
    "menor_venda": 100,
    "maior_venda": 2000
  },
  {
    "categoria": "Roupas",
    "total_vendas": 8000,
    "quantidade_vendas": 40,
    "ticket_medio": 200,
    "menor_venda": 50,
    "maior_venda": 500
  }
]
```

### 2. Estatísticas de Usuários por Região

```javascript
// Aggregate Node - Usuários por região
{
  "groupBy": ["regiao", "status"],
  "aggregations": [
    {
      "field": "id",
      "operation": "count",
      "name": "total_usuarios"
    },
    {
      "field": "{{ $json.ativo ? 1 : 0 }}",
      "operation": "sum",
      "name": "usuarios_ativos"
    },
    {
      "field": "data_cadastro",
      "operation": "first",
      "name": "primeiro_cadastro"
    },
    {
      "field": "data_cadastro",
      "operation": "last",
      "name": "ultimo_cadastro"
    }
  ]
}
```

### 3. Análise de Performance por Período

```javascript
// Aggregate Node - Performance por mês
{
  "groupBy": ["{{ $json.data.substring(0, 7) }}"],
  "aggregations": [
    {
      "field": "vendas",
      "operation": "sum",
      "name": "total_vendas_mes"
    },
    {
      "field": "clientes",
      "operation": "count",
      "name": "novos_clientes"
    },
    {
      "field": "receita",
      "operation": "sum",
      "name": "receita_total"
    },
    {
      "field": "custo",
      "operation": "sum",
      "name": "custo_total"
    },
    {
      "field": "{{ $json.receita - $json.custo }}",
      "operation": "sum",
      "name": "lucro_mes"
    }
  ]
}
```

### 4. Consolidação de Dados de Múltiplas Fontes

```javascript
// Aggregate Node - Consolidação de dados
{
  "groupBy": ["produto_id", "fornecedor"],
  "aggregations": [
    {
      "field": "quantidade",
      "operation": "sum",
      "name": "estoque_total"
    },
    {
      "field": "valor_unitario",
      "operation": "average",
      "name": "preco_medio"
    },
    {
      "field": "data_entrada",
      "operation": "last",
      "name": "ultima_entrada"
    },
    {
      "field": "id",
      "operation": "count",
      "name": "numero_entradas"
    }
  ]
}
```

### 5. Análise de Transações Financeiras

```javascript
// Aggregate Node - Análise financeira
{
  "groupBy": ["tipo_transacao", "{{ $json.data.substring(0, 10) }}"],
  "aggregations": [
    {
      "field": "{{ $json.tipo === 'credito' ? $json.valor : 0 }}",
      "operation": "sum",
      "name": "total_creditos"
    },
    {
      "field": "{{ $json.tipo === 'debito' ? $json.valor : 0 }}",
      "operation": "sum",
      "name": "total_debitos"
    },
    {
      "field": "id",
      "operation": "count",
      "name": "numero_transacoes"
    },
    {
      "field": "{{ $json.tipo === 'credito' ? $json.valor : -$json.valor }}",
      "operation": "sum",
      "name": "saldo_dia"
    }
  ]
}
```

## Casos de Uso Avançados

### 1. Agregação com Condições Complexas

```javascript
// Aggregate Node - Condições complexas
{
  "groupBy": ["categoria", "{{ $json.valor > 1000 ? 'Premium' : 'Standard' }}"],
  "aggregations": [
    {
      "field": "{{ $json.status === 'aprovado' ? $json.valor : 0 }}",
      "operation": "sum",
      "name": "vendas_aprovadas"
    },
    {
      "field": "{{ $json.status === 'pendente' ? $json.valor : 0 }}",
      "operation": "sum",
      "name": "vendas_pendentes"
    },
    {
      "field": "{{ $json.status === 'cancelado' ? $json.valor : 0 }}",
      "operation": "sum",
      "name": "vendas_canceladas"
    },
    {
      "field": "{{ $json.status === 'aprovado' ? 1 : 0 }}",
      "operation": "sum",
      "name": "quantidade_aprovadas"
    }
  ]
}
```

### 2. Agregação Temporal

```javascript
// Aggregate Node - Agregação temporal
{
  "groupBy": [
    "{{ $json.data.substring(0, 4) }}", // Ano
    "{{ $json.data.substring(5, 7) }}", // Mês
    "{{ $json.data.substring(8, 10) }}" // Dia
  ],
  "aggregations": [
    {
      "field": "vendas",
      "operation": "sum",
      "name": "vendas_dia"
    },
    {
      "field": "clientes",
      "operation": "count",
      "name": "clientes_dia"
    },
    {
      "field": "{{ $json.vendas / $json.clientes }}",
      "operation": "average",
      "name": "ticket_medio_dia"
    }
  ]
}
```

### 3. Agregação Hierárquica

```javascript
// Aggregate Node - Agregação hierárquica
{
  "groupBy": [
    "pais",
    "estado",
    "cidade",
    "bairro"
  ],
  "aggregations": [
    {
      "field": "vendas",
      "operation": "sum",
      "name": "vendas_local"
    },
    {
      "field": "clientes",
      "operation": "count",
      "name": "clientes_local"
    },
    {
      "field": "vendedor",
      "operation": "first",
      "name": "vendedor_responsavel"
    }
  ]
}
```

### 4. Agregação com Cálculos Personalizados

```javascript
// Aggregate Node - Cálculos personalizados
{
  "groupBy": ["categoria"],
  "aggregations": [
    {
      "field": "valor",
      "operation": "sum",
      "name": "total_vendas"
    },
    {
      "field": "custo",
      "operation": "sum",
      "name": "total_custo"
    },
    {
      "field": "{{ $json.valor - $json.custo }}",
      "operation": "sum",
      "name": "lucro_bruto"
    },
    {
      "field": "{{ ($json.valor - $json.custo) / $json.valor * 100 }}",
      "operation": "average",
      "name": "margem_percentual"
    },
    {
      "field": "id",
      "operation": "count",
      "name": "quantidade_produtos"
    }
  ]
}
```

## Boas Práticas

### 1. Escolha de Campos de Agrupamento

```javascript
// ✅ Bom: Campos com valores limitados
{
  "groupBy": ["categoria", "status", "regiao"]
}

// ❌ Evitar: Campos com muitos valores únicos
{
  "groupBy": ["id", "email", "timestamp"]
}
```

### 2. Nomenclatura de Agregações

```javascript
// ✅ Bom: Nomes descritivos
{
  "field": "valor",
  "operation": "sum",
  "name": "total_vendas_categoria"
}

// ❌ Evitar: Nomes genéricos
{
  "field": "valor",
  "operation": "sum",
  "name": "total"
}
```

### 3. Performance

```javascript
// ✅ Bom: Agregações simples
{
  "field": "valor",
  "operation": "sum",
  "name": "total"
}

// ❌ Evitar: Cálculos complexos
{
  "field": "{{ $json.valor * Math.pow(1 + $json.taxa, $json.periodo) }}",
  "operation": "sum",
  "name": "valor_futuro"
}
```

### 4. Validação de Dados

```javascript
// ✅ Bom: Validar dados antes de agregar
{
  "field": "{{ $json.valor && !isNaN($json.valor) ? $json.valor : 0 }}",
  "operation": "sum",
  "name": "total_valido"
}

// ❌ Evitar: Usar dados sem validação
{
  "field": "valor",
  "operation": "sum",
  "name": "total"
}
```

## Troubleshooting

### Problemas Comuns

#### Agregação retorna valores incorretos
- Verifique se os campos existem
- Confirme se os tipos de dados estão corretos
- Teste com dados de exemplo
- Use Debug Helper para ver dados

#### Performance lenta
- Reduza o número de campos de agrupamento
- Simplifique as expressões
- Use agregações básicas
- Considere filtrar dados antes

#### Campos de agrupamento não funcionam
- Verifique se os campos têm valores
- Confirme se as expressões estão corretas
- Teste com agrupamento simples
- Verifique se há valores nulos

### Debug

```javascript
// Code Node - Debug de Aggregate Node
const debugAggregate = (dados) => {
  console.log('=== DEBUG AGGREGATE ===');
  console.log('Dados de entrada:', dados);
  console.log('Campos disponíveis:', Object.keys(dados[0] || {}));
  console.log('Número de registros:', dados.length);
  console.log('Exemplo de registro:', dados[0]);
  console.log('========================');
  
  return dados;
};

// Usar antes do Aggregate Node
return { json: debugAggregate($json) };
```

## Integração com Outros Nodes

### 1. Aggregate Node + Set Node

```javascript
// Aggregate Node - Calcular estatísticas
{
  "groupBy": ["categoria"],
  "aggregations": [
    {
      "field": "valor",
      "operation": "sum",
      "name": "total"
    },
    {
      "field": "id",
      "operation": "count",
      "name": "quantidade"
    }
  ]
}

// Set Node - Adicionar cálculos adicionais
{
  "mode": "keepAllSet",
  "values": {
    "number": [
      {
        "name": "ticket_medio",
        "value": "{{ $json.total / $json.quantidade }}"
      },
      {
        "name": "percentual_total",
        "value": "{{ ($json.total / $('Aggregate Node').json.total_geral) * 100 }}"
      }
    ]
  }
}
```

### 2. Aggregate Node + If Node

```javascript
// Aggregate Node - Agrupar por status
{
  "groupBy": ["status"],
  "aggregations": [
    {
      "field": "valor",
      "operation": "sum",
      "name": "total_por_status"
    }
  ]
}

// If Node - Processar por status
{
  "condition": "{{ $json.status === 'aprovado' }}",
  "true": "Processar Aprovados",
  "false": "Processar Outros"
}
```

## Próximos Passos

- [Set Node](/integracoes/builtin-nodes/data-processing/set) - Manipulação de dados
- [Code Node](/integracoes/builtin-nodes/core-nodes/code) - Lógica customizada
- [If Node](/integracoes/builtin-nodes/logic-control/if) - Controle de fluxo
- [Expressões n8n](/logica-e-dados/expressoes) - Usar expressões avançadas
- [Data Processing](/integracoes/builtin-nodes/data-processing/index) - Outros nodes de processamento
