// Script para criar labels e issues de gest�o de conte�do

async function getOctokit() {
  const { Octokit } = await import("@octokit/rest");
  return Octokit;
}

const owner = "tatyquebralayout";
const repo = "n8n-Doc-pt-BR";

const LABELS = [
  { name: " Cr�tico", color: "FF0000", description: "Problema cr�tico que precisa ser resolvido imediatamente" },
  { name: " Importante", color: "FF8C00", description: "Problema importante que deve ser resolvido em breve" },
  { name: " Melhoria", color: "FFD700", description: "Melhoria que pode ser implementada quando poss�vel" },
  { name: " Polimento", color: "32CD32", description: "Pequenos ajustes e melhorias de qualidade" },
  { name: " Vazio", color: "E6E6FA", description: "P�gina ou se��o completamente vazia" },
  { name: " Em Constru��o", color: "FFA500", description: "Conte�do marcado como em constru��o" },
  { name: " Links Quebrados", color: "DC143C", description: "Links que n�o funcionam ou est�o incorretos" },
  { name: " Portugu�s BR", color: "009639", description: "Relacionado � localiza��o em portugu�s brasileiro" },
  { name: " Clareza", color: "4169E1", description: "Melhorar clareza e compreens�o do conte�do" },
  { name: " Tutorial", color: "20B2AA", description: "Conte�do de tutorial ou guia passo a passo" },
  { name: " Getting Started", color: "FF6347", description: "Se��o de primeiros passos" },
  { name: " Integra��es BR", color: "228B22", description: "Integra��es espec�ficas do Brasil" },
  { name: " Comunidade", color: "FF69B4", description: "Conte�do relacionado � comunidade" },
  { name: " Did�tico", color: "9370DB", description: "Melhorar aspecto educacional e did�tico" },
  { name: " Automa��o", color: "778899", description: "Automa��o de processos" },
  { name: " Auditoria", color: "6495ED", description: "Resultado de auditoria de conte�do" },
  { name: " Feedback", color: "DA70D6", description: "Relacionado a feedback de usu�rios" },
  { name: " Template", color: "B0C4DE", description: "Cria��o ou uso de templates" },
  { name: " Melhoria Cont�nua", color: "32CD32", description: "Processo de melhoria cont�nua" },
  { name: " Exemplos", color: "2E8B57", description: "Adicionar ou melhorar exemplos pr�ticos" },
  { name: " Objetividade", color: "8B4513", description: "Tornar o conte�do mais direto e objetivo" }
];

async function createLabels(octokit) {
  console.log(" Criando labels...");
  
  const createdLabels = [];
  
  for (const label of LABELS) {
    try {
      await octokit.rest.issues.createLabel({
        owner,
        repo,
        name: label.name,
        color: label.color,
        description: label.description
      });
      console.log(` Label criada: ${label.name}`);
      createdLabels.push(label.name);
    } catch (error) {
      if (error.status === 422) {
        console.log(` Label j� existe: ${label.name}`);
      } else {
        console.error(` Erro ao criar label ${label.name}:`, error.message);
      }
    }
  }
  
  return createdLabels;
}

async function main() {
  console.log(" Iniciando cria��o de labels...");
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
    
    const createdLabels = await createLabels(octokit);
    
    console.log("\n Labels criadas com sucesso!");
    console.log(` Labels criadas: ${createdLabels.length}`);
    
    console.log("\n Acesse o reposit�rio para ver as labels:");
    console.log(`https://github.com/${owner}/${repo}/labels`);
    
  } catch (error) {
    console.error(" Erro ao criar labels:", error.message);
    process.exit(1);
  }
}

main();
