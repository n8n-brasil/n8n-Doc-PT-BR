---
title: Workflow Trigger
sidebar_position: 6
description: Como usar o Workflow Trigger para executar workflows a partir de outros workflows
keywords: [n8n, workflow trigger, subworkflow, execução, automação, trigger]
---

# <ion-icon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Workflow Trigger

O **Workflow Trigger** é um nó especial que permite executar um workflow a partir de outro workflow, criando uma hierarquia de automações. Este recurso é fundamental para organizar workflows complexos em módulos menores e reutilizáveis.

## <ion-icon name="information-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Conceito

O Workflow Trigger funciona como um **disparador interno** que permite que um workflow seja executado por outro workflow, similar a uma função em programação. Isso possibilita:

- **Modularização** de workflows complexos
- **Reutilização** de lógicas comuns
- **Organização** de automações em componentes menores
- **Manutenção** simplificada de workflows grandes

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração

### Parâmetros Básicos

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| **Workflow ID** | String | ID único do workflow que será executado |
| **Wait for Workflow** | Boolean | Aguarda a conclusão do workflow antes de continuar |
| **Options** | Object | Configurações adicionais de execução |

### Configuração Avançada

```json
{
  "workflowId": "workflow_123456",
  "waitForWorkflow": true,
  "options": {
    "pinData": {
      "inputData": "{{ $json }}"
    },
    "startNodes": ["node_1", "node_2"]
  }
}
```

## <ion-icon name="code-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Exemplos Práticos

### Exemplo 1: Workflow Modular de Notificações

**Workflow Principal** (Processamento de Pedidos):
```mermaid
graph LR
    A[Webhook] --> B[Processar Pedido]
    B --> C[Workflow Trigger - Notificações]
    C --> D[Salvar no Banco]
```

**Workflow de Notificações** (Executado pelo trigger):
```mermaid
graph LR
    A[Workflow Trigger] --> B[Enviar Email]
    B --> C[Enviar Slack]
    C --> D[SMS Cliente]
```

### Exemplo 2: Validação Modular

```javascript
// Workflow principal
{
  "workflowId": "validacao_cliente",
  "waitForWorkflow": true,
  "options": {
    "pinData": {
      "cliente": "{{ $json.cliente }}",
      "pedido": "{{ $json.pedido }}"
    }
  }
}
```

## <ion-icon name="construct-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Casos de Uso

### 1. Processamento de Pedidos E-commerce

**Cenário**: Sistema de e-commerce que processa pedidos com múltiplas validações.

```mermaid
graph TD
    A[Novo Pedido] --> B[Validar Cliente]
    B --> C[Validar Estoque]
    C --> D[Calcular Frete]
    D --> E[Processar Pagamento]
    E --> F[Gerar Nota Fiscal]
    F --> G[Enviar Confirmação]
```

**Implementação com Workflow Trigger**:
- Workflow principal: Orquestração geral
- Workflow de validação: Verificações de cliente e estoque
- Workflow de pagamento: Processamento financeiro
- Workflow de notificação: Comunicação com cliente

### 2. Sistema de Aprovações

**Cenário**: Sistema de aprovação de despesas com múltiplos níveis.

```mermaid
graph TD
    A[Solicitação] --> B[Workflow Trigger - Validação]
    B --> C[Workflow Trigger - Aprovação 1]
    C --> D[Workflow Trigger - Aprovação 2]
    D --> E[Workflow Trigger - Pagamento]
```

### 3. Integração de Sistemas

**Cenário**: Sincronização entre CRM, ERP e sistema financeiro.

```mermaid
graph LR
    A[CRM Update] --> B[Workflow Trigger - ERP Sync]
    B --> C[Workflow Trigger - Finance Sync]
    C --> D[Workflow Trigger - Reports]
```

## <ion-icon name="flash-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Expressões e Data Mapping

### Passando Dados Entre Workflows

```javascript
// Dados de entrada para o workflow filho
{
  "cliente": "{{ $json.cliente }}",
  "pedido": {
    "id": "{{ $json.pedido.id }}",
    "valor": "{{ $json.pedido.valor }}",
    "itens": "{{ $json.pedido.itens }}"
  },
  "contexto": {
    "origem": "{{ $workflow.name }}",
    "timestamp": "{{ $now }}"
  }
}
```

### Recebendo Dados do Workflow Filho

```javascript
// Acessando dados retornados pelo workflow filho
{
  "resultado_validacao": "{{ $json.resultado }}",
  "status": "{{ $json.status }}",
  "mensagem": "{{ $json.mensagem }}"
}
```

## <ion-icon name="warning-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Tratamento de Erros

### Configuração de Error Handling

```javascript
// Workflow principal com tratamento de erro
{
  "workflowId": "validacao_critica",
  "waitForWorkflow": true,
  "options": {
    "pinData": {
      "dados": "{{ $json }}"
    }
  }
}
```

### Workflow de Validação com Error Handling

```mermaid
graph TD
    A[Workflow Trigger] --> B[Validar Dados]
    B --> C{Erro?}
    C -->|Sim| D[Log Error]
    C -->|Não| E[Processar]
    D --> F[Retornar Status Error]
    E --> G[Retornar Status Success]
```

## <ion-icon name="speedometer-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Performance e Otimização

### Boas Práticas

1. **Evite Loops Infinitos**
   - Não crie workflows que se chamam mutuamente
   - Use contadores para limitar execuções recursivas

2. **Otimize o Tamanho dos Dados**
   - Passe apenas dados essenciais entre workflows
   - Use compressão para dados grandes

3. **Monitore Execuções**
   - Configure alertas para workflows que falham
   - Use logs para rastrear execuções

### Exemplo de Monitoramento

```javascript
// Workflow de monitoramento
{
  "workflowId": "monitor_execucoes",
  "waitForWorkflow": false,
  "options": {
    "pinData": {
      "workflow_pai": "{{ $workflow.name }}",
      "timestamp": "{{ $now }}",
      "status": "iniciado"
    }
  }
}
```

## <ion-icon name="help-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Troubleshooting

### Problemas Comuns

**Erro: "Workflow not found"**
- Verifique se o Workflow ID está correto
- Confirme se o workflow existe e está ativo
- Verifique permissões de acesso

**Erro: "Timeout"**
- Aumente o timeout do workflow filho
- Otimize a performance do workflow filho
- Considere usar `waitForWorkflow: false`

**Erro: "Circular dependency"**
- Verifique se não há chamadas circulares
- Use contadores para limitar recursão
- Reestruture a lógica se necessário

### Debugging

```javascript
// Adicione logs para debugging
{
  "workflowId": "workflow_teste",
  "waitForWorkflow": true,
  "options": {
    "pinData": {
      "debug": true,
      "dados_entrada": "{{ $json }}",
      "workflow_origem": "{{ $workflow.name }}"
    }
  }
}
```

## <ion-icon name="link-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Integração com Outros Nós

### Fluxo Típico

```mermaid
graph TD
    A[HTTP Request] --> B[Transformar Dados]
    B --> C[Workflow Trigger]
    C --> D[Code Node]
    D --> E[Email]
```

### Exemplo Completo

```javascript
// 1. HTTP Request - Buscar dados
{
  "url": "https://api.exemplo.com/pedidos",
  "method": "GET"
}

// 2. Transformar Dados
{
  "pedidos_processados": "{{ $json.pedidos.filter(item => item.status === 'pendente') }}"
}

// 3. Workflow Trigger - Processar cada pedido
{
  "workflowId": "processar_pedido",
  "waitForWorkflow": true,
  "options": {
    "pinData": {
      "pedido": "{{ $json }}"
    }
  }
}

// 4. Code Node - Consolidar resultados
const resultados = $input.all();
const sucessos = resultados.filter(r => r.json.status === 'success').length;
const falhas = resultados.filter(r => r.json.status === 'error').length;

return {
  "resumo": {
    "total_processados": resultados.length,
    "sucessos": sucessos,
    "falhas": falhas
  }
};
```

## <ion-icon name="document-text-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Referências

- **[Subworkflows](../../logica-e-dados/flow-logic/subworkflows)** - Conceitos avançados de subworkflows
- **[Error Handling](../../logica-e-dados/flow-logic/error-handling)** - Tratamento de erros em workflows
- **[Execution Order](../../logica-e-dados/flow-logic/execution-order)** - Ordem de execução de nós
- **[Data Mapping](../../logica-e-dados/data/data-mapping-avancado)** - Mapeamento avançado de dados

---

> <ion-icon name="bulb-outline" style={{ fontSize: '18px', color: '#ea4b71' }}></ion-icon> **Dica**: Use Workflow Triggers para criar bibliotecas de workflows reutilizáveis. Isso facilita a manutenção e permite que equipes diferentes trabalhem em módulos específicos sem interferir no workflow principal.

---

:::warning **Nota de Atenção**
Esta documentação está em processo de validação. Os exemplos práticos e configurações de nós apresentados precisam ser testados e validados em ambientes reais. A intenção é sempre fornecer práticas e exemplos que funcionem corretamente em produção. Se encontrar inconsistências ou problemas, por favor, reporte para que possamos melhorar a qualidade da documentação.
:::
