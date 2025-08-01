---
sidebar_position: 6
title: Debugging
keywords: [n8n, debugging, troubleshooting, logs, execução, erros]
---

# <ion-icon name="bug-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Debugging de Workflows

O debugging é uma habilidade essencial para desenvolver workflows robustos e confiáveis no n8n. Esta seção aborda técnicas e ferramentas para identificar e resolver problemas em suas automações.

## <ion-icon name="information-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que é Debugging?

Debugging é o processo de identificar, analisar e corrigir problemas em workflows. No n8n, isso envolve:

- **Identificar** onde ocorrem falhas
- **Analisar** logs de execução
- **Testar** nodes individualmente
- **Corrigir** problemas encontrados
- **Validar** que a correção funciona

### Por que Debugging é Importante?

- **Confiabilidade**: Workflows funcionam corretamente
- **Performance**: Identifica gargalos e otimizações
- **Manutenção**: Facilita atualizações futuras
- **Produtividade**: Reduz tempo gasto com problemas

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Ferramentas de Debugging

### Execution Log

O **Execution Log** é sua principal ferramenta de debugging:

#### Como Acessar

1. Execute o workflow
2. Clique em **"View Execution"**
3. Navegue pelas abas de cada node
4. Analise os dados de entrada e saída

#### Informações Disponíveis

- **Input Data**: Dados recebidos pelo node
- **Output Data**: Dados enviados pelo node
- **Error Details**: Detalhes de erros (se houver)
- **Performance**: Tempo de execução
- **Status**: Estado da execução

### Data Viewer

O **Data Viewer** permite visualizar dados em tempo real:

#### Recursos

- **Estrutura de Dados**: Visualização hierárquica
- **Tipos de Dados**: Identificação automática
- **Valores**: Dados reais em cada campo
- **Filtros**: Busca e filtragem de dados

#### Como Usar

1. Clique em um node após execução
2. Abra a aba **"Output"**
3. Use o **Data Viewer** para explorar dados
4. Identifique problemas de estrutura

### Step-by-Step Execution

Execute workflows node por node:

#### Processo

1. **Desative** nodes que não precisa testar
2. **Execute** um node por vez
3. **Verifique** dados de entrada e saída
4. **Corrija** problemas encontrados
5. **Ative** próximo node e repita

#### Benefícios

- **Isola problemas** em nodes específicos
- **Valida dados** em cada etapa
- **Testa lógica** incrementalmente
- **Reduz complexidade** do debugging

## <ion-icon name="code-slash-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Técnicas de Debugging

### 1. Logging com Expressões

Use expressões JavaScript para logging:

```javascript
// Log simples
console.log('Dados recebidos:', $json);

// Log com contexto
console.log('Processando usuário:', $json.name, 'ID:', $json.id);

// Log condicional
if ($json.status === 'error') {
  console.log('Erro detectado:', $json.message);
}
```

### 2. Validação de Dados

Valide dados em cada etapa:

```javascript
// Verificar se campo existe
if (!$json.email) {
  throw new Error('Campo email não encontrado');
}

// Validar formato
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($json.email)) {
  throw new Error('Email inválido');
}

// Verificar tipo de dados
if (typeof $json.age !== 'number') {
  throw new Error('Idade deve ser um número');
}
```

### 3. Teste de Credenciais

Teste conectividade separadamente:

1. **Vá para Credentials**
2. **Selecione a credencial**
3. **Clique em "Test"**
4. **Verifique** se a conexão funciona

### 4. Simulação de Dados

Use **Data Pinning** para testes:

1. **Execute** node com dados reais
2. **Pine** os dados de saída
3. **Desenvolva** lógica com dados fixos
4. **Teste** sem pinning antes de publicar

## <ion-icon name="warning-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Problemas Comuns

### Erros de Conectividade

#### Sintomas

- Timeout errors
- Connection refused
- SSL certificate errors
- Rate limiting

#### Soluções

1. **Verifique credenciais** estão corretas
2. **Teste conectividade** de rede
3. **Verifique rate limits** da API
4. **Ajuste timeouts** se necessário

### Erros de Dados

#### Sintomas

- Missing fields
- Wrong data types
- Invalid formats
- Null values

#### Soluções

1. **Valide estrutura** dos dados
2. **Use transformações** para corrigir
3. **Adicione validações** nos nodes
4. **Trate valores nulos** adequadamente

### Erros de Lógica

#### Sintomas

- Workflow não executa como esperado
- Condições não funcionam
- Loops infinitos
- Dados incorretos

#### Soluções

1. **Revise expressões** JavaScript
2. **Teste condições** individualmente
3. **Verifique ordem** de execução
4. **Use step-by-step** execution

## <ion-icon name="analytics-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Debugging Avançado

### Performance Debugging

#### Identificar Gargalos

1. **Analise tempos** de execução
2. **Identifique nodes** lentos
3. **Verifique volume** de dados
4. **Otimize queries** e requisições

#### Técnicas de Otimização

- **Processamento em lotes**
- **Cache de dados**
- **Filtros antecipados**
- **Paralelização** quando possível

### Debugging de Workflows Complexos

#### Estratégias

1. **Quebre** em subworkflows
2. **Teste** cada parte separadamente
3. **Use logs** estruturados
4. **Documente** dependências

#### Ferramentas

- **Subworkflows** para modularização
- **Error triggers** para tratamento
- **Data pinning** para desenvolvimento
- **Version control** para mudanças

## <ion-icon name="help-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Dicas Pro

### Workflow de Debugging

1. **Reproduza** o problema consistentemente
2. **Isole** a causa raiz
3. **Teste** soluções incrementais
4. **Valide** que a correção funciona
5. **Documente** a solução

### Prevenção de Problemas

- **Use validações** em nodes críticos
- **Implemente error handling** robusto
- **Teste** com dados variados
- **Monitore** execuções em produção
- **Mantenha logs** estruturados

### Ferramentas Externas

- **Browser DevTools** para expressões JavaScript
- **API testing tools** (Postman, Insomnia)
- **Log aggregation** para produção
- **Monitoring tools** para alertas

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

1. **[Error Handling](../../logica-e-dados/flow-logic/error-handling)** - Tratamento robusto de erros
2. **[Data Pinning](../../logica-e-dados/data/data-pinning)** - Desenvolvimento com dados fixos
3. **[Performance Optimization](../../logica-e-dados/data/otimizacao-performance)** - Otimizar workflows

## <ion-icon name="help-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Recursos Úteis

### Documentação Relacionada

- **[Error Handling](../../logica-e-dados/flow-logic/error-handling)** - Tratamento de erros
- **[Execution Order](../../logica-e-dados/flow-logic/execution-order)** - Ordem de execução
- **[Data Transformation](../../logica-e-dados/data/transformacoes-dados)** - Manipulação de dados

### Links Externos

- **[n8n Community](https://community.n8n.io/)** - Fórum para dúvidas
- **[GitHub Issues](https://github.com/n8n-io/n8n/issues)** - Reportar bugs
- **[Debugging Guide](https://docs.n8n.io/workflows/debugging/)** - Guia oficial

---

**<ion-icon name="bug-outline" style={{ fontSize: '16px', color: '#ea4b71' }}></ion-icon> Debugging eficiente leva a workflows robustos!**
