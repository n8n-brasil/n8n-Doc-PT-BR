import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import IonicIcon from '../components/IonicIcon';

import styles from './index.module.css';

function HomepageHeader() {
  // const {siteConfig} = useDocusaurusContext();
  

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)} itemScope itemType="https://schema.org/TechArticle">
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroImageContainer}>
            <img 
              src="img/banner_n8n_ptbr.png" 
              alt="Banner da documentação n8n Brasil: automação de workflows, integrações no-code e recursos em português para a comunidade brasileira" 
              className={styles.heroImage}
              itemProp="image"
            />
          </div>
          <div className={styles.heroTextContent}>
            <Heading as="h1" className={styles.heroTitle} itemProp="headline">
              <IonicIcon name="compass-outline" size={20} color="#ea4b71" />
              n8n Brasil: Documentação em Português para Automação de Workflows e Integrações
            </Heading>
            <p className={styles.heroSubtitle} itemProp="description">
              <IonicIcon name="globe-outline" size={20} color="var(--ifm-color-primary)" />
              Guia completo de automação, integrações no-code e recursos avançados do n8n para a comunidade brasileira.
            </p>
            <div className={styles.buttons}>
              <Link
                className={styles.getStartedButton}
                to="/intro"
                aria-label="Comece a explorar a documentação do n8n Brasil em português - Guia de introdução e primeiros passos"
                title="Comece a explorar a documentação do n8n Brasil em português - Guia de introdução e primeiros passos"
              >
                <IonicIcon name="play-circle-outline" size={20} color="var(--ifm-color-primary)" />
                Comece a Explorar: Guia de Introdução ao n8n Brasil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function DocumentationProgress() { return null; }

export default function Home(): React.ReactElement {
  const blogUrl = useBaseUrl('blog');
  return (
    <Layout
      title={`Página Inicial`}
      description="Documentação completa do n8n em português brasileiro - Hub de conhecimento para a comunidade brasileira de automação.">
      <HomepageHeader />
      <DocumentationProgress />
      <main>
        
        <section className={styles.mainFeatures}>
          <div className="container">
            <div className={styles.mainFeaturesGrid}>

              {/* Primeiros Passos */}
              <div className={styles.mainFeature}>
                <div className={styles.mainFeatureIcon}>
                  <IonicIcon name="school-outline" size={20} color="var(--ifm-color-primary)" />
                </div>
                <div className={styles.mainFeatureContent}>
                  <h4>Primeiros Passos</h4>
                  <p>Aprenda os conceitos fundamentais do n8n passo a passo.</p>
                  <ul>
                    <li><Link to="/primeiros-passos/guia-instalacao">Instalação</Link></li>
                    <li><Link to="/primeiros-passos/conceitos-fundamentais">Conceitos Básicos</Link></li>
                    <li><Link to="/primeiros-passos/primeiro-workflow">Primeiro Workflow</Link></li>
                  </ul>
                </div>
              </div>

              {/* Guias Avançados */}
              <div className={styles.mainFeature}>
                <div className={styles.mainFeatureIcon}>
                  <IonicIcon name="bulb-outline" size={20} color="var(--ifm-color-primary)" />
                </div>
                <div className={styles.mainFeatureContent}>
                  <h4>Guias Avançados</h4>
                  <p>Explore recursos avançados e casos de uso complexos.</p>
                  <ul>
                    <li><Link to="/usando-n8n">Usando n8n</Link></li>
                    <li><Link to="/logica-e-dados">Lógica e Dados</Link></li>
                    <li><Link to="/advanced-ai">IA Avançada</Link></li>
                    <li><Link to="/embed">Embed</Link></li>
                  </ul>
                </div>
              </div>

              {/* Referência da API */}
              <div className={styles.mainFeature}>
                <div className={styles.mainFeatureIcon}>
                  <IonicIcon name="code-slash-outline" size={20} color="var(--ifm-color-primary)" />
                </div>
                <div className={styles.mainFeatureContent}>
                  <h4>Referência da API</h4>
                  <p>Documentação completa da API REST do n8n.</p>
                  <ul>
                    <li><Link to="/api">API</Link></li>
                    <li><Link to="/api/conceitos">Conceitos</Link></li>
                    <li><Link to="/api/ferramentas">Ferramentas</Link></li>
                    <li><Link to="/api/referencia">Referência</Link></li>
                  </ul>
                </div>
              </div>

              {/* Deployment */}
              <div className={styles.mainFeature}>
                <div className={styles.mainFeatureIcon}>
                  <IonicIcon name="cloud-upload-outline" size={20} color="var(--ifm-color-primary)" />
                </div>
                <div className={styles.mainFeatureContent}>
                  <h4>Deployment</h4>
                  <p>Guias para implantação em diferentes ambientes.</p>
                  <ul>
                    <li><Link to="/hosting-n8n/instalacao">Instalação</Link></li>
                    <li><Link to="/hosting-n8n/configuracao">Configuração</Link></li>
                    <li><Link to="/hosting-n8n/seguranca">Segurança</Link></li>
                    <li><Link to="/hosting-n8n/escalonamento">Escalonamento</Link></li>
                  </ul>
                </div>
              </div>

              {/* Nós (Nodes) */}
              <div className={styles.mainFeature}>
                <div className={styles.mainFeatureIcon}>
                  <IonicIcon name="extension-puzzle-outline" size={20} color="var(--ifm-color-primary)" />
                </div>
                <div className={styles.mainFeatureContent}>
                  <h4>Nós (Nodes)</h4>
                  <p>Documentação detalhada de todos os nós disponíveis.</p>
                  <ul>
                    <li><Link to="/integracoes">Integrações</Link></li>
                    <li><Link to="/integracoes-br">Integrações Brasileiras</Link></li>
                  </ul>
                </div>
              </div>

              {/* Exemplos */}
              <div className={styles.mainFeature}>
                <div className={styles.mainFeatureIcon}>
                  <IonicIcon name="flask-outline" size={20} color="var(--ifm-color-primary)" />
                </div>
                <div className={styles.mainFeatureContent}>
                  <h4>Exemplos</h4>
                  <p>Workflows práticos e casos de uso reais.</p>
                  <ul>
                    <li><Link to="/comunidade">Comunidade</Link></li>
                    <li><Link to="/referencia">Referência</Link></li>
                  </ul>
                </div>
              </div>

              {/* Recursos Técnicos */}
              <div className={styles.mainFeature}>
                <div className={styles.mainFeatureIcon}>
                  <IonicIcon name="library-outline" size={20} color="var(--ifm-color-primary)" />
                </div>
                <div className={styles.mainFeatureContent}>
                  <h4>Recursos Técnicos</h4>
                  <p>Guias de performance, troubleshooting e referências técnicas.</p>
                  <ul>
                    <li><Link to="/referencia/guias/performance-guide">Guia de Performance</Link></li>
                    <li><Link to="/referencia/guias/troubleshooting">Troubleshooting</Link></li>
                    <li><Link to="/referencia/recursos/glossario">Glossário</Link></li>
                    <li><Link to="/referencia/recursos/apis-brasileiras">APIs Brasileiras</Link></li>
                  </ul>
                </div>
              </div>

              

              {/* Links Úteis */}
              <div className={styles.mainFeature}>
                <div className={styles.mainFeatureIcon}>
                  <IonicIcon name="link-outline" size={20} color="var(--ifm-color-primary)" />
                </div>
                <div className={styles.mainFeatureContent}>
                  <h4>Links Úteis</h4>
                  <p>Recursos essenciais para acompanhar atualizações e encontrar soluções.</p>
                  <ul>
                    <li><Link to="/referencia/historico/changelog">Changelog</Link></li>
                    <li><Link to="/catalogo">Catálogo de Workflows</Link></li>
                    <li><Link to="/comunidade">Central da Comunidade</Link></li>
                    <li><Link to="/comunidade/como-participar">Como Participar</Link></li>
                  </ul>
                </div>
              </div>

              {/* Cursos e Aprendizado */}
              <div className={styles.mainFeature}>
                <div className={styles.mainFeatureIcon}>
                  <IonicIcon name="school-outline" size={20} color="var(--ifm-color-primary)" />
                </div>
                <div className={styles.mainFeatureContent}>
                  <h4>Cursos e Aprendizado</h4>
                  <p>Aprenda n8n com cursos estruturados em vídeo e texto.</p>
                  <ul>
                    <li><Link to="/cursos/cursos-em-video/curso-iniciante">Curso Iniciante</Link></li>
                    <li><Link to="/cursos/cursos-em-video/curso-avancado">Curso Avançado</Link></li>
                    <li><Link to="/cursos/cursos-em-texto">Cursos em Texto</Link></li>
                    <li><Link to="/cursos">Todos os Cursos</Link></li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section className={styles.communitySection}>
        <div className="container">
          <div className={styles.communityContent}>
            <h2 className={styles.communityTitle}>
              <IonicIcon name="globe-outline" size={32} color="var(--ifm-color-primary)" />
              Ecossistema n8n Brasil
            </h2>
            <p className={styles.communitySubtitle}>A comunidade é o coração do nosso projeto. Participe!</p>
            
              {/* Posts Recentes do Blog */}
              <div className={styles.communityCard}>
                <div className={styles.communityCardHeader}>
                  <IonicIcon name="newspaper-outline" size={24} color="var(--ifm-color-primary)" />
                  <h3>Posts Recentes</h3>
                </div>
                <p>Confira as últimas publicações do nosso blog.</p>
                <Link to={blogUrl} className={styles.communityLink}>
                  <IonicIcon name="open-outline" size={16} color="var(--ifm-color-primary)" />
                  Ver o Blog
                </Link>
              </div>

            <div className={styles.communityGrid}>
              <div className={styles.communityCard}>
                <div className={styles.communityCardHeader}>
                  <IonicIcon name="logo-github" size={24} color="var(--ifm-color-primary)" />
                  <h3>Repositório GitHub</h3>
                </div>
                <p>Este é um projeto de código aberto. Colabore com código, documentação ou sugestões.</p>
                <a 
                  href="https://github.com/n8n-brasil/n8n-Doc-PT-BR" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.communityLink}
                >
                  <IonicIcon name="star-outline" size={16} color="var(--ifm-color-primary)" />
                  Dar uma estrela
                </a>
              </div>
              
              <div className={styles.communityCard}>
                <div className={styles.communityCardHeader}>
                  <IonicIcon name="chatbubbles-outline" size={24} color="var(--ifm-color-primary)" />
                  <h3>Discord</h3>
                </div>
                <p>Participe gratuitamente das discussões e tire dúvidas com a comunidade brasileira no Discord.</p>
                <div className={styles.communityLinkDisabled}>
                  <IonicIcon name="time-outline" size={16} color="var(--ifm-color-primary)" />
                  Em breve
                </div>
              </div>

              <div className={styles.communityCard}>
                <div className={styles.communityCardHeader}>
                  <IonicIcon name="logo-youtube" size={24} color="var(--ifm-color-primary)" />
                  <h3>YouTube</h3>
                </div>
                <p>Canal dedicado a esta documentação em português, com conteúdo didático, entrevistas com profissionais da área de automação e estudos de casos reais.</p>
                <div className={styles.communityLinkDisabled}>
                  <IonicIcon name="time-outline" size={16} color="var(--ifm-color-primary)" />
                  Em breve
                </div>
              </div>

              <div className={styles.communityCard}>
                <div className={styles.communityCardHeader}>
                  <IonicIcon name="newspaper-outline" size={24} color="var(--ifm-color-primary)" />
                  <h3>Newsletter</h3>
                </div>
                <p>Receba atualizações sobre n8n, automação e novidades da documentação brasileira através da nossa newsletter na Substack.</p>
                <div className={styles.communityLinkDisabled}>
                  <IonicIcon name="time-outline" size={16} color="var(--ifm-color-primary)" />
                  Em breve
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaGrid}>
            <div className={styles.ctaCard}>
              <div className={styles.ctaIcon}>
                <IonicIcon name="extension-puzzle-outline" size={24} color="var(--ifm-color-primary)" />
              </div>
              <div className={styles.ctaText}>
                <h4>Quer Criar Seus Próprios Nodes?</h4>
                <p>Tenha mentoria, torne-se expert e desenvolva integrações customizadas para o n8n. Aprenda com a comunidade e construa soluções únicas.</p>
              </div>
              <Link to="/integracoes/criar-nodes" className="button button--outline button--primary">
                <IonicIcon name="arrow-forward-outline" size={16} color="var(--ifm-color-primary)" />
                Saiba mais
              </Link>
            </div>
            <div className={styles.ctaCard}>
              <div className={styles.ctaIcon}>
                <IonicIcon name="chatbubble-ellipses-outline" size={24} color="var(--ifm-color-primary)" />
              </div>
              <div className={styles.ctaText}>
                <h4>Tem uma Dúvida?</h4>
                <p>Abra uma discussão no GitHub para obter ajuda da comunidade.</p>
              </div>
              <a 
                href="https://github.com/n8n-brasil/n8n-Doc-PT-BR/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="button button--outline button--primary"
              >
                <IonicIcon name="arrow-forward-outline" size={16} color="var(--ifm-color-primary)" />
                Abrir discussão
              </a>
            </div>
          </div>
        </div>
      </section>
      </main>
    </Layout>
  );
} 