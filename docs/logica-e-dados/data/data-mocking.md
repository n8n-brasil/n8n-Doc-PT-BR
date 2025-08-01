# Criação de Dados de Teste

A criação de dados de teste (mocking) é essencial para desenvolver e testar workflows sem depender de dados reais ou APIs externas. Esta seção aborda como gerar dados sintéticos realistas para diferentes cenários de teste.

## Visão Geral

Dados de teste permitem desenvolver workflows de forma segura e eficiente, simulando cenários reais sem comprometer dados de produção ou sistemas externos. O n8n oferece ferramentas integradas e suporte para bibliotecas externas de geração de dados.

## Tipos de Dados de Teste

### Dados Pessoais

Gere dados pessoais realistas para testes:

```javascript
// Gerar dados de usuário brasileiro
const gerarUsuarioBR = () => {
  const nomes = ['João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa'];
  const emails = ['joao.silva@email.com', 'maria.santos@email.com'];
  const cpf = gerarCPF();
  const telefone = gerarTelefoneBR();
  
  return {
    nome: nomes[Math.floor(Math.random() * nomes.length)],
    email: emails[Math.floor(Math.random() * emails.length)],
    cpf: cpf,
    telefone: telefone,
    dataNascimento: gerarDataNascimento(),
    endereco: gerarEnderecoBR()
  };
};

// Gerar CPF válido
const gerarCPF = () => {
  const numeros = Array.from({length: 9}, () => Math.floor(Math.random() * 10));
  
  // Calcular primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += numeros[i] * (10 - i);
  }
  const digito1 = ((soma * 10) % 11) % 10;
  numeros.push(digito1);
  
  // Calcular segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += numeros[i] * (11 - i);
  }
  const digito2 = ((soma * 10) % 11) % 10;
  numeros.push(digito2);
  
  return numeros.join('');
};
```

### Dados Comerciais

Crie dados de negócios para testes:

```javascript
// Gerar dados de empresa brasileira
const gerarEmpresaBR = () => {
  const razoesSociais = [
    'Tech Solutions Ltda',
    'Inovação Digital S.A.',
    'Sistemas Avançados Eireli',
    'Consultoria Empresarial Ltda'
  ];
  
  return {
    razaoSocial: razoesSociais[Math.floor(Math.random() * razoesSociais.length)],
    cnpj: gerarCNPJ(),
    inscricaoEstadual: gerarInscricaoEstadual(),
    endereco: gerarEnderecoComercial(),
    telefone: gerarTelefoneComercial(),
    email: gerarEmailComercial(),
    setor: ['Tecnologia', 'Consultoria', 'Varejo', 'Indústria'][Math.floor(Math.random() * 4)]
  };
};

// Gerar CNPJ válido
const gerarCNPJ = () => {
  const numeros = Array.from({length: 12}, () => Math.floor(Math.random() * 10));
  
  // Calcular primeiro dígito verificador
  const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let soma = 0;
  for (let i = 0; i < 12; i++) {
    soma += numeros[i] * pesos1[i];
  }
  const digito1 = ((soma * 10) % 11) % 10;
  numeros.push(digito1);
  
  // Calcular segundo dígito verificador
  const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  soma = 0;
  for (let i = 0; i < 13; i++) {
    soma += numeros[i] * pesos2[i];
  }
  const digito2 = ((soma * 10) % 11) % 10;
  numeros.push(digito2);
  
  return numeros.join('');
};
```

### Dados Financeiros

Simule dados financeiros para testes:

```javascript
// Gerar dados de transação financeira
const gerarTransacaoFinanceira = () => {
  const tipos = ['PIX', 'Cartão de Crédito', 'Boleto', 'Transferência'];
  const status = ['Aprovada', 'Pendente', 'Rejeitada', 'Processando'];
  
  return {
    id: gerarUUID(),
    valor: (Math.random() * 10000).toFixed(2),
    tipo: tipos[Math.floor(Math.random() * tipos.length)],
    status: status[Math.floor(Math.random() * status.length)],
    dataTransacao: new Date().toISOString(),
    estabelecimento: gerarEstabelecimento(),
    cliente: gerarUsuarioBR()
  };
};

// Gerar dados de fatura
const gerarFatura = () => {
  const itens = Array.from({length: Math.floor(Math.random() * 5) + 1}, () => ({
    descricao: ['Produto A', 'Serviço B', 'Item C'][Math.floor(Math.random() * 3)],
    quantidade: Math.floor(Math.random() * 10) + 1,
    precoUnitario: (Math.random() * 100).toFixed(2)
  }));
  
  const subtotal = itens.reduce((acc, item) => 
    acc + (item.quantidade * parseFloat(item.precoUnitario)), 0);
  
  return {
    numero: gerarNumeroFatura(),
    dataEmissao: new Date().toISOString(),
    vencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    cliente: gerarUsuarioBR(),
    itens: itens,
    subtotal: subtotal.toFixed(2),
    impostos: (subtotal * 0.18).toFixed(2),
    total: (subtotal * 1.18).toFixed(2)
  };
};
```

## Bibliotecas de Mocking

### Faker.js

Use a biblioteca Faker.js para dados realistas:

```javascript
// Configurar Faker.js para português brasileiro
const { faker } = require('@faker-js/faker/locale/pt_BR');

// Gerar dados de pessoa
const pessoa = {
  nome: faker.person.fullName(),
  email: faker.internet.email(),
  telefone: faker.phone.number('(##) #####-####'),
  cpf: faker.helpers.replaceSymbolWithNumber('###.###.###-##'),
  endereco: {
    rua: faker.location.street(),
    numero: faker.location.buildingNumber(),
    bairro: faker.location.county(),
    cidade: faker.location.city(),
    estado: faker.location.state(),
    cep: faker.location.zipCode('#####-###')
  }
};

// Gerar dados de empresa
const empresa = {
  razaoSocial: faker.company.name(),
  cnpj: faker.helpers.replaceSymbolWithNumber('##.###.###/####-##'),
  email: faker.internet.email(),
  website: faker.internet.url(),
  setor: faker.company.buzzNoun()
};
```

### Chance.js

Use Chance.js para dados mais específicos:

```javascript
const Chance = require('chance');
const chance = new Chance();

// Gerar dados específicos
const dadosEspecificos = {
  // Dados brasileiros
  cpf: chance.cpf(),
  cnpj: chance.cnpj(),
  telefone: chance.phone({ country: 'br' }),
  cep: chance.zip(),
  
  // Dados de negócio
  empresa: chance.company(),
  profissao: chance.profession(),
  salario: chance.integer({ min: 1000, max: 50000 }),
  
  // Dados de localização
  cidade: chance.city(),
  estado: chance.state({ full: true }),
  pais: 'Brasil'
};
```

## Cenários de Teste Comuns

### E-commerce

```javascript
// Gerar dados de e-commerce
const gerarDadosEcommerce = () => {
  return {
    cliente: gerarUsuarioBR(),
    pedido: {
      id: gerarUUID(),
      data: new Date().toISOString(),
      status: ['Pendente', 'Aprovado', 'Em Separação', 'Enviado', 'Entregue'][Math.floor(Math.random() * 5)],
      itens: Array.from({length: Math.floor(Math.random() * 5) + 1}, () => ({
        produto: gerarProduto(),
        quantidade: Math.floor(Math.random() * 5) + 1,
        preco: (Math.random() * 500).toFixed(2)
      })),
      enderecoEntrega: gerarEnderecoBR(),
      formaPagamento: ['Cartão', 'PIX', 'Boleto'][Math.floor(Math.random() * 3)]
    }
  };
};

const gerarProduto = () => {
  const produtos = [
    'Smartphone Galaxy S23',
    'Notebook Dell Inspiron',
    'Fone de Ouvido Bluetooth',
    'Smart TV 55" 4K',
    'Tablet iPad Pro'
  ];
  
  return {
    nome: produtos[Math.floor(Math.random() * produtos.length)],
    sku: gerarSKU(),
    categoria: ['Eletrônicos', 'Informática', 'Acessórios'][Math.floor(Math.random() * 3)],
    preco: (Math.random() * 5000).toFixed(2),
    estoque: Math.floor(Math.random() * 100)
  };
};
```

### CRM

```javascript
// Gerar dados de CRM
const gerarDadosCRM = () => {
  return {
    lead: {
      id: gerarUUID(),
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      telefone: faker.phone.number(),
      empresa: faker.company.name(),
      cargo: faker.person.jobTitle(),
      origem: ['Website', 'LinkedIn', 'Indicação', 'Evento'][Math.floor(Math.random() * 4)],
      status: ['Novo', 'Contatado', 'Qualificado', 'Proposta', 'Fechado'][Math.floor(Math.random() * 5)],
      valor: (Math.random() * 100000).toFixed(2),
      dataCriacao: faker.date.past().toISOString()
    },
    oportunidades: Array.from({length: Math.floor(Math.random() * 3) + 1}, () => ({
      id: gerarUUID(),
      titulo: faker.company.catchPhrase(),
      valor: (Math.random() * 50000).toFixed(2),
      probabilidade: Math.floor(Math.random() * 100),
      etapa: ['Prospecção', 'Qualificação', 'Proposta', 'Negociação', 'Fechamento'][Math.floor(Math.random() * 5)]
    }))
  };
};
```

### ERP

```javascript
// Gerar dados de ERP
const gerarDadosERP = () => {
  return {
    produto: {
      codigo: gerarCodigoProduto(),
      nome: faker.commerce.productName(),
      categoria: faker.commerce.department(),
      preco: parseFloat(faker.commerce.price()),
      custo: parseFloat(faker.commerce.price({ min: 10, max: 100 })),
      estoque: Math.floor(Math.random() * 1000),
      fornecedor: faker.company.name()
    },
    fornecedor: {
      codigo: gerarCodigoFornecedor(),
      razaoSocial: faker.company.name(),
      cnpj: faker.helpers.replaceSymbolWithNumber('##.###.###/####-##'),
      contato: faker.person.fullName(),
      email: faker.internet.email(),
      telefone: faker.phone.number()
    },
    cliente: {
      codigo: gerarCodigoCliente(),
      nome: faker.person.fullName(),
      tipo: ['PF', 'PJ'][Math.floor(Math.random() * 2)],
      documento: Math.random() > 0.5 ? faker.helpers.replaceSymbolWithNumber('###.###.###-##') : faker.helpers.replaceSymbolWithNumber('##.###.###/####-##'),
      email: faker.internet.email(),
      telefone: faker.phone.number()
    }
  };
};
```

## Workflows de Teste

### Workflow: Geração de Dados de Teste

```mermaid
graph TD
    A[Manual Trigger] --> B[Code: Gerar Dados]
    B --> C[Split In Batches]
    C --> D[HTTP Request: API Externa]
    D --> E[Validate Data]
    E --> F[Save to Database]
    F --> G[Send Notification]
    G --> H[Next Batch]
    H --> D
```

### Workflow: Teste de Performance

```mermaid
graph TD
    A[Schedule Trigger] --> B[Code: Gerar Carga]
    B --> C[HTTP Request: Load Test]
    C --> D[Monitor Performance]
    D --> E[Log Results]
    E --> F[Generate Report]
    F --> G[Send Alert if Issues]
```

## Configuração de Ambiente de Teste

### Variáveis de Ambiente

```bash
# Configurar ambiente de teste
export N8N_ENVIRONMENT=test
export N8N_DATABASE_URL=postgresql://test:test@localhost:5432/n8n_test
export N8N_MOCK_DATA_ENABLED=true
export N8N_TEST_API_URL=https://api-test.exemplo.com
```

### Configuração de Dados de Teste

```javascript
// Configurar dados de teste
const configurarDadosTeste = () => {
  return {
    // Habilitar dados de teste
    habilitado: process.env.N8N_MOCK_DATA_ENABLED === 'true',
    
    // Configurações de geração
    quantidade: {
      usuarios: 100,
      empresas: 50,
      transacoes: 1000,
      produtos: 200
    },
    
    // Configurações de dados
    dados: {
      incluirDadosSensiveis: false,
      mascararDados: true,
      usarDadosRealistas: true
    },
    
    // Configurações de API
    api: {
      url: process.env.N8N_TEST_API_URL,
      timeout: 5000,
      retryAttempts: 3
    }
  };
};
```

## Validação de Dados de Teste

### Validação de Formato

```javascript
// Validar formato de dados brasileiros
const validarDadosBR = (dados) => {
  const erros = [];
  
  // Validar CPF
  if (dados.cpf && !validarCPF(dados.cpf)) {
    erros.push('CPF inválido');
  }
  
  // Validar CNPJ
  if (dados.cnpj && !validarCNPJ(dados.cnpj)) {
    erros.push('CNPJ inválido');
  }
  
  // Validar email
  if (dados.email && !validarEmail(dados.email)) {
    erros.push('Email inválido');
  }
  
  // Validar telefone
  if (dados.telefone && !validarTelefone(dados.telefone)) {
    erros.push('Telefone inválido');
  }
  
  return {
    valido: erros.length === 0,
    erros: erros
  };
};

// Validar CPF
const validarCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]/g, '');
  
  if (cpf.length !== 11) return false;
  
  // Verificar dígitos repetidos
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  
  // Calcular dígitos verificadores
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf[i]) * (10 - i);
  }
  const digito1 = ((soma * 10) % 11) % 10;
  
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf[i]) * (11 - i);
  }
  const digito2 = ((soma * 10) % 11) % 10;
  
  return parseInt(cpf[9]) === digito1 && parseInt(cpf[10]) === digito2;
};
```

### Validação de Consistência

```javascript
// Validar consistência de dados
const validarConsistencia = (dados) => {
  const inconsistencias = [];
  
  // Verificar se cliente tem dados obrigatórios
  if (dados.cliente && (!dados.cliente.nome || !dados.cliente.email)) {
    inconsistencias.push('Cliente sem dados obrigatórios');
  }
  
  // Verificar se pedido tem itens
  if (dados.pedido && (!dados.pedido.itens || dados.pedido.itens.length === 0)) {
    inconsistencias.push('Pedido sem itens');
  }
  
  // Verificar se valores são positivos
  if (dados.valor && parseFloat(dados.valor) <= 0) {
    inconsistencias.push('Valor deve ser positivo');
  }
  
  return {
    consistente: inconsistencias.length === 0,
    inconsistencias: inconsistencias
  };
};
```

## Boas Práticas

### Segurança

- **Nunca use dados reais** em ambiente de teste
- **Mascare dados sensíveis** sempre que possível
- **Use dados sintéticos** realistas mas não identificáveis
- **Limpe dados de teste** regularmente
- **Isole ambiente de teste** da produção

### Qualidade

- **Valide dados gerados** antes do uso
- **Mantenha consistência** entre diferentes tipos de dados
- **Use padrões realistas** para o contexto brasileiro
- **Documente formatos** de dados esperados
- **Teste com diferentes volumes** de dados

### Performance

- **Gere dados em lotes** para grandes volumes
- **Use cache** para dados frequentemente acessados
- **Otimize geração** de dados complexos
- **Monitore uso de memória** durante geração
- **Limpe dados antigos** regularmente

## Recursos Adicionais

### Bibliotecas Úteis

- **Faker.js**: Geração de dados realistas
- **Chance.js**: Dados mais específicos e controlados
- **JSON Schema Faker**: Baseado em schemas JSON
- **TestData-Generator**: Dados estruturados

### Ferramentas de Teste

- **Postman**: Testes de API com dados mock
- **Insomnia**: Alternativa ao Postman
- **JMeter**: Testes de carga
- **Artillery**: Testes de performance

---

**Próximo**: [Visualização de Schema](./schema-preview) - Entenda a estrutura dos dados 