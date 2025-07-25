---
sidebar_position: 1
title: Pré-requisitos para Embed
description: Requisitos técnicos e preparação para incorporar n8n em aplicações
keywords: [n8n, embed, pré-requisitos, integração, aplicação, iframe, CORS, segurança]
---


# <ion-icon name="grid-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Pré-requisitos para Embed

Este guia detalha os **pré-requisitos técnicos** para incorporar o n8n em aplicações externas, garantindo integração segura, estável e escalável.

---

## <ion-icon name="folder-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Infraestrutura Recomendada

- **Instância dedicada do n8n** (cloud, VPS ou on-premises)
- **Banco de dados**: PostgreSQL (recomendado) ou MySQL
- **HTTPS obrigatório** para produção
- **Recursos mínimos**:
  - CPU: 2 vCPUs
  - RAM: 4GB+
  - Armazenamento: SSD, 20GB+
- **Firewall** e regras de acesso restritas

---

## <ion-icon name="color-palette-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Domínios Permitidos e CORS

- Defina domínios confiáveis para o embed:

  ```bash
  N8N_CORS_ALLOW_ORIGIN=https://app.suaempresa.com
  ```

- Configure o header `Content-Security-Policy`:

  ```nginx
  add_header Content-Security-Policy "frame-ancestors 'self' https://app.suaempresa.com" always;
  ```

- Use `X-Frame-Options: ALLOW-FROM` para restringir iframes:

  ```nginx
  add_header X-Frame-Options "ALLOW-FROM https://app.suaempresa.com" always;
  ```

---

## <ion-icon name="shield-checkmark-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Segurança e Planejamento

- **Chave de criptografia** obrigatória:

  ```bash
  N8N_ENCRYPTION_KEY=chave-criptografia-forte
  ```

- **Autenticação**: Ative SSO, OAuth2, SAML ou API Key
- **Permissões**: Use RBAC para limitar acesso por usuário/grupo
- **Logs e auditoria**: Ative logs de acesso e mantenha retenção mínima de 90 dias
- **Backup**: Implemente backup automatizado do banco e das configurações

---

## <ion-icon name="school-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Planejamento de Recursos

- **Escalabilidade**: Planeje para múltiplos usuários simultâneos
- **Monitoramento**: Implemente métricas de uso, alertas e dashboards
- **Ambientes separados**: Use ambientes distintos para dev, staging e produção

---

## <ion-icon name="grid-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Checklist de Pré-requisitos

- [ ] Instância do n8n dedicada e atualizada
- [ ] Banco de dados configurado e seguro
- [ ] HTTPS ativo e certificado válido
- [ ] Domínios permitidos definidos (CORS e CSP)
- [ ] Chave de criptografia forte configurada
- [ ] Autenticação e RBAC ativados
- [ ] Logs e auditoria habilitados
- [ ] Backup automatizado implementado
- [ ] Monitoramento e alertas ativos

---

:::tip **Dica Pro**
Sempre teste o embed em ambiente de homologação antes de liberar para produção. Restrinja domínios e revise permissões para máxima segurança.
:::

:::warning **Importante**
Nunca exponha o n8n embed sem HTTPS e sem restrição de domínios. Certifique-se de que todos os pré-requisitos de segurança estão atendidos.
:::
