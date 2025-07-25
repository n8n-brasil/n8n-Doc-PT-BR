:::warning
<ion-icon name="time-outline" style={{ fontSize: '18px', color: '#f59e0b' }}></ion-icon> Esta página ainda está em processo de validação. O conteúdo pode sofrer alterações.
:::

---
sidebar_position: 4
title: Execuções
description: Monitoramento e análise de execuções
keywords: [n8n, execuções, monitoramento, análise, logs]
---

# Execuções de Workflows

As execuções são o coração do n8n, onde workflows ganham vida e processam dados reais. Este guia aborda todos os aspectos das execuções, desde tipos básicos até técnicas avançadas de monitoramento.

## Conceitos Fundamentais

### O que é uma Execução

Uma execução no n8n é uma instância específica de um workflow que:

- **Processa dados** reais através dos nodes
- **Executa ações** em sistemas externos
- **Gera logs** detalhados de cada etapa
- **Retorna resultados** ou continua o processamento

### Tipos de Execução

#### 1. Execução Manual

```json
{
  "type": "manual",
  "trigger": "Manual Trigger",
  "data": {
    "customInput": "dados de teste",
    "timestamp": "2024-01-20T10:00:00Z"
  },
  "mode": "test"
}
```

#### 2. Execução Agendada

```json
{
  "type": "scheduled",
  "trigger": "Schedule Trigger",
  "schedule": {
    "cron": "0 9 * * *",
    "timezone": "America/Sao_Paulo"
  },
  "mode": "production"
}
```

#### 3. Execução por Webhook

```json
{
  "type": "webhook",
  "trigger": "Webhook",
  "data": {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "event": "order.created",
      "orderId": "12345"
    }
  },
  "mode": "production"
}
```

#### 4. Execução por Evento

```json
{
  "type": "event",
  "trigger": "App Trigger",
  "data": {
    "source": "github",
    "event": "push",
    "repository": "user/repo"
  },
  "mode": "production"
}
```

## Componentes da Execução

### 1. Trigger Node

O ponto de entrada da execução:

#### Configurações do Trigger

```json
{
  "trigger": {
    "type": "manual",
    "name": "Manual Trigger",
    "description": "Inicia o workflow manualmente",
    "options": {
      "allowManualExecution": true,
      "showTestData": true
    }
  }
}
```

#### Dados de Entrada

```json
{
  "inputData": {
    "json": {
      "message": "Hello World",
      "timestamp": "2024-01-20T10:00:00Z"
    },
    "binary": {},
    "pairedItem": null
  }
}
```

### 2. Nodes de Processamento

Cada node processa e transforma os dados:

#### Exemplo de Processamento

```json
{
  "node": {
    "id": "node_001",
    "name": "Set Status",
    "type": "n8n-nodes-base.set",
    "parameters": {
      "values": {
        "string": [
          {
            "name": "status",
            "value": "processed"
          }
        ]
      }
    },
    "execution": {
      "startTime": "2024-01-20T10:00:01Z",
      "endTime": "2024-01-20T10:00:02Z",
      "duration": 1000,
      "status": "success"
    }
  }
}
```

### 3. Nodes de Ação

Executam operações em sistemas externos:

#### Exemplo de Ação

```json
{
  "node": {
    "id": "node_002",
    "name": "Send Email",
    "type": "n8n-nodes-base.emailSend",
    "parameters": {
      "toEmail": "user@example.com",
      "subject": "Workflow Executed",
      "text": "Your workflow has been executed successfully"
    },
    "execution": {
      "startTime": "2024-01-20T10:00:02Z",
      "endTime": "2024-01-20T10:00:05Z",
      "duration": 3000,
      "status": "success",
      "response": {
        "messageId": "msg_12345"
      }
    }
  }
}
```

## Monitoramento de Execuções

### 1. Dashboard de Execuções

#### Métricas Principais

```yaml
Execuções Hoje:
  - Total: 150
  - Sucesso: 142
  - Erro: 8
  - Taxa de Sucesso: 94.7%

Execuções da Semana:
  - Total: 1,050
  - Sucesso: 1,023
  - Erro: 27
  - Taxa de Sucesso: 97.4%

Performance:
  - Tempo Médio: 2.3s
  - Tempo Máximo: 15.2s
  - Tempo Mínimo: 0.1s
```

#### Filtros e Busca

```json
{
  "filters": {
    "status": ["success", "error", "running"],
    "workflow": "workflow-id",
    "dateRange": {
      "start": "2024-01-01",
      "end": "2024-01-31"
    },
    "duration": {
      "min": 1000,
      "max": 10000
    }
  }
}
```

### 2. Logs Detalhados

#### Estrutura do Log

```json
{
  "executionId": "exec_12345",
  "workflowId": "workflow_001",
  "startTime": "2024-01-20T10:00:00Z",
  "endTime": "2024-01-20T10:00:10Z",
  "duration": 10000,
  "status": "success",
  "nodes": [
    {
      "id": "node_001",
      "name": "Manual Trigger",
      "status": "success",
      "startTime": "2024-01-20T10:00:00Z",
      "endTime": "2024-01-20T10:00:01Z",
      "duration": 1000,
      "data": {
        "input": {},
        "output": {
          "json": {
            "message": "Hello World"
          }
        }
      }
    }
  ]
}
```

#### Níveis de Log

```yaml
Debug:
  - Dados detalhados de cada node
  - Valores de variáveis
  - Configurações internas

Info:
  - Início e fim de execuções
  - Status de nodes
  - Operações principais

Warning:
  - Timeouts
  - Rate limits
  - Dados incompletos

Error:
  - Falhas de conexão
  - Erros de autenticação
  - Exceções não tratadas
```

### 3. Alertas e Notificações

#### Configuração de Alertas

```json
{
  "alerts": {
    "executionFailed": {
      "enabled": true,
      "channels": ["email", "slack"],
      "threshold": 1,
      "recipients": ["admin@company.com"]
    },
    "executionSlow": {
      "enabled": true,
      "channels": ["slack"],
      "threshold": 30000,
      "recipients": ["dev-team"]
    },
    "highErrorRate": {
      "enabled": true,
      "channels": ["email", "slack", "sms"],
      "threshold": 0.1,
      "recipients": ["oncall@company.com"]
    }
  }
}
```

## Técnicas Avançadas

### 1. Execução em Lote (Batch Processing)

#### Configuração de Batch

```json
{
  "batch": {
    "enabled": true,
    "size": 100,
    "delay": 1000,
    "retry": {
      "attempts": 3,
      "delay": 5000
    }
  }
}
```

#### Processamento Paralelo

```json
{
  "parallel": {
    "enabled": true,
    "maxConcurrent": 5,
    "timeout": 30000
  }
}
```

### 2. Execução Condicional

#### Baseada em Dados

```javascript
// Code Node para decisão condicional
const shouldExecute = items.some(item => {
  return item.json.priority === 'high' && 
         item.json.status === 'pending';
});

if (shouldExecute) {
  return items;
} else {
  return [];
}
```

#### Baseada em Tempo

```javascript
// Verificar horário de execução
const now = new Date();
const hour = now.getHours();

if (hour >= 9 && hour <= 18) {
  return items;
} else {
  return [];
}
```

### 3. Execução com Retry

#### Configuração de Retry

```json
{
  "retry": {
    "attempts": 3,
    "delay": 5000,
    "backoff": "exponential",
    "maxDelay": 30000,
    "conditions": [
      "network_error",
      "rate_limit",
      "temporary_failure"
    ]
  }
}
```

#### Retry Inteligente

```javascript
// Code Node para retry customizado
const maxAttempts = 3;
const currentAttempt = $execution.attempt || 1;

if (currentAttempt < maxAttempts) {
  // Aguardar antes da próxima tentativa
  await new Promise(resolve => 
    setTimeout(resolve, Math.pow(2, currentAttempt) * 1000)
  );
  throw new Error('Retry attempt');
}

return items;
```

## Troubleshooting

### Problemas Comuns

#### 1. Execuções Falhando

**Sintomas:**

- Status "error" nas execuções
- Logs com mensagens de erro
- Workflows não completando

**Diagnóstico:**

```javascript
// Code Node para debug
console.log('Input data:', JSON.stringify(items, null, 2));
console.log('Environment variables:', $env);
console.log('Execution context:', $execution);

return items;
```

**Soluções:**

- Verificar credenciais
- Validar dados de entrada
- Implementar tratamento de erros
- Ajustar timeouts

#### 2. Execuções Lentas

**Sintomas:**

- Tempo de execução alto
- Timeouts frequentes
- Performance degradada

**Otimizações:**

```json
{
  "optimization": {
    "batchSize": 50,
    "parallelProcessing": true,
    "caching": true,
    "timeout": 60000
  }
}
```