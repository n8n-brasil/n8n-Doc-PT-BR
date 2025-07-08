// Script para criar issues de gest�o de conte�do

async function getOctokit() {
  const { Octokit } = await import("@octokit/rest");
  return Octokit;
}

const owner = "tatyquebralayout";
const repo = "n8n-Doc-pt-BR";

const ISSUES = [
  {
    title: "?? Completar p�ginas Em Constru��o da se��o Contribuir",
    body: `## Problema
A se��o Contribuir tem v�rias p�ginas marcadas como Em Constru��o que precisam ser completadas.

## P�ginas Afetadas
- docs/contribuir/esta-documentacao/
- docs/contribuir/n8n-oficial/

## Tarefas
- [ ] Revisar e completar conte�do das p�ginas em constru��o
- [ ] Adicionar exemplos pr�ticos
- [ ] Criar guias passo a passo
- [ ] Adicionar screenshots quando necess�rio
- [ ] Revisar e corrigir links

## Prioridade
?? Cr�tico - Essencial para engajamento da comunidade`,
    labels: ["?? Cr�tico", "?? Em Constru��o", "?? Comunidade", "?? Tutorial", "???? Portugu�s BR"]
  },
  
  {
    title: "?? Criar conte�do Getting Started completo",
    body: `## Problema
A se��o Getting Started � fundamental para novos usu�rios mas est� incompleta.

## Tarefas
- [ ] Criar guia de instala��o simplificado
- [ ] Desenvolver tutorial do primeiro workflow
- [ ] Explicar conceitos fundamentais
- [ ] Adicionar exemplos pr�ticos brasileiros
- [ ] Criar fluxo de aprendizado progressivo

## Prioridade
 Cr�tico - Primeira impress�o dos usu�rios`,
    labels: [" Cr�tico", " Getting Started", " Did�tico", " Portugu�s BR", " Tutorial"]
  },
  
  {
    title: " Auditoria e corre��o de links quebrados",
    body: `## Problema
V�rios links internos e externos est�o quebrados ou incorretos.

## Tarefas
- [ ] Executar auditoria autom�tica de links
- [ ] Corrigir links quebrados identificados
- [ ] Padronizar formato de links
- [ ] Verificar links externos periodicamente
- [ ] Criar processo de valida��o cont�nua

## Prioridade
 Importante - Afeta experi�ncia do usu�rio`,
    labels: [" Importante", " Links Quebrados", " Automa��o", " Auditoria"]
  },
  
  {
    title: " Expandir integra��es brasileiras",
    body: `## Problema
Faltam integra��es espec�ficas para o mercado brasileiro.

## Integra��es Priorit�rias
- PIX e bancos brasileiros
- Receita Federal (CNPJ/CPF)
- ViaCEP e Correios
- E-commerce nacional

## Tarefas
- [ ] Pesquisar APIs dispon�veis
- [ ] Criar documenta��o das integra��es
- [ ] Desenvolver exemplos pr�ticos
- [ ] Testar integra��es
- [ ] Criar tutoriais espec�ficos

## Prioridade
 Importante - Diferencial competitivo`,
    labels: [" Importante", " Integra��es BR", " Portugu�s BR", " Tutorial", " Exemplos"]
  },
  
  {
    title: " Criar sistema de templates para conte�do",
    body: `## Problema
Falta padroniza��o na cria��o de novo conte�do.

## Tarefas
- [ ] Criar templates base
- [ ] Definir estrutura padr�o
- [ ] Estabelecer guias de estilo
- [ ] Criar checklist de qualidade
- [ ] Documentar processo de cria��o

## Prioridade
 Melhoria - Padroniza��o e qualidade`,
    labels: [" Melhoria", " Template", " Melhoria Cont�nua"]
  }
];

async function createIssues(octokit) {
  console.log(" Criando issues...");
  
  const createdIssues = [];
  
  for (const issue of ISSUES) {
    try {
      const response = await octokit.rest.issues.create({
        owner,
        repo,
        title: issue.title,
        body: issue.body,
        labels: issue.labels
      });
      
      console.log(` Issue criada: ${issue.title} (#${response.data.number})`);
      createdIssues.push({
        number: response.data.number,
        title: issue.title,
        url: response.data.html_url
      });
    } catch (error) {
      console.error(` Erro ao criar issue ${issue.title}:`, error.message);
    }
  }
  
  return createdIssues;
}

async function main() {
  console.log(" Iniciando cria��o de issues...");
  console.log(` Reposit�rio: ${owner}/${repo}`);
  
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error(" Token do GitHub n�o encontrado. Defina GITHUB_TOKEN nas vari�veis de ambiente.");
    process.exit(1);
  }
  
  try {
    const OctokitClass = await getOctokit();
    const octokit = new OctokitClass({
      auth: token,
    });
    
    const createdIssues = await createIssues(octokit);
    
    console.log("\n Issues criadas com sucesso!");
    console.log(` Issues criadas: ${createdIssues.length}`);
    
    if (createdIssues.length > 0) {
      console.log("\n Issues criadas:");
      createdIssues.forEach(issue => {
        console.log(`- #${issue.number}: ${issue.title}`);
        console.log(`  ${issue.url}`);
      });
    }
    
    console.log("\n Acesse o reposit�rio para ver as issues:");
    console.log(`https://github.com/${owner}/${repo}/issues`);
    
  } catch (error) {
    console.error(" Erro ao criar issues:", error.message);
    process.exit(1);
  }
}

main();
