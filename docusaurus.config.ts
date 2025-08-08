import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "n8n Brasil",
  tagline:
    "Uma iniciativa da comunidade brasileira para democratizar a automação, uma linha de código e um workflow de cada vez.",
  favicon: "img/favicon-br.svg",

  // Set the production url of your site here
  url: "https://n8n-brasil.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: "/n8n-Doc-PT-BR/",

  organizationName: "n8n-brasil",
  projectName: "n8n-Doc-PT-BR",

  // Configuração crítica para CI - quebra de links deve falhar no CI
  onBrokenLinks: process.env.CI ? "throw" : "warn",
  onBrokenMarkdownLinks: process.env.CI ? "throw" : "warn",

  // Trailing slash para hard refresh no GitHub Pages
  trailingSlash: false,

  i18n: {
    defaultLocale: "pt-BR",
    locales: ["pt-BR"],
    localeConfigs: {
      "pt-BR": {
        label: "Português",
        direction: "ltr",
      },
    },
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/n8n-brasil/n8n-Doc-PT-BR/tree/main/",
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
          routeBasePath: "/",
          sidebarCollapsed: false,
          breadcrumbs: true,
          exclude: [
            '**/contribuir/**',
            '**/_*.{js,jsx,ts,tsx,md,mdx}',
            '**/_*/**',
            '**/*.test.{js,jsx,ts,tsx}',
            '**/__tests__/**',
          ],
          remarkPlugins: [
            require('@docusaurus/remark-plugin-npm2yarn'),
            require('remark-docusaurus-tabs'),
          ],
        },
        blog: {
          routeBasePath: "/blog",
          blogTitle: "Blog n8n Brasil",
          blogDescription: "Artigos, notícias e tutoriais da comunidade n8n Brasil",
          showReadingTime: true,
          postsPerPage: 10,
          feedOptions: {
            type: 'all',
            title: 'n8n Brasil - Blog RSS',
            description: 'Feed RSS do Blog da comunidade n8n Brasil',
            language: 'pt-BR',
          },
        },
        pages: {
          remarkPlugins: [
            require('@docusaurus/remark-plugin-npm2yarn'),
            require('remark-docusaurus-tabs'),
          ],
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          // Sitemap mais estratégico - aumentar prioridade para páginas críticas
          createSitemapItems: async (params) => {
            const items = await params.defaultCreateSitemapItems(params);
            return items.map(i =>
              i.url.includes("/primeiros-passos/")
              || i.url.includes("/usando-n8n/")
              || i.url.includes("/integracoes")
              || i.url.includes("/hosting-n8n/instalacao")
                ? { ...i, priority: 0.8 }
                : i
            );
          },
        },
      } satisfies Preset.Options,
    ],
  ],

      plugins: [
      // Plugin de busca local
      ["@easyops-cn/docusaurus-search-local", {
        indexDocs: true,
        docsRouteBasePath: "/",
        hashed: true,
        language: ["pt"],
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
        explicitSearchResultPath: true
      }],
    
    // Plugin de redirects para SEO
    ["@docusaurus/plugin-client-redirects", {
      redirects: [
        { from: "/instalacao", to: "/primeiros-passos/guia-instalacao" },
        { from: "/videos", to: "/comunidade/videos" },
        { from: "/docs", to: "/" },
        { from: "/documentacao", to: "/" },
        { from: "/tutorial", to: "/primeiros-passos" },
        { from: "/guia", to: "/primeiros-passos" },
        { from: "/nodes", to: "/integracoes" },
        { from: "/integrations", to: "/integracoes" },
        { from: "/deploy", to: "/hosting-n8n/instalacao" },
        { from: "/deployment", to: "/hosting-n8n/instalacao" },
        { from: "/hosting", to: "/hosting-n8n/instalacao" },
        { from: "/api-docs", to: "/api" },
        { from: "/reference", to: "/referencia" },
        { from: "/community", to: "/comunidade" },
        { from: "/catalog", to: "/catalogo" },
        { from: "/courses", to: "/comunidade" },
        { from: "/contribuir", to: "/comunidade/como-participar" },
      ],
    }],

    // Plugin PWA para suporte offline (usando Workbox)
    ["@docusaurus/plugin-pwa", {
      debug: false,
      offlineModeActivationStrategies: ["appInstalled", "standalone", "queryString"],
      pwaHead: [
        { tagName: "link", rel: "icon", href: "/n8n-Doc-PT-BR/img/favicon-br.svg" },
        { tagName: "link", rel: "manifest", href: "/n8n-Doc-PT-BR/manifest.json" },
        { tagName: "meta", name: "theme-color", content: "#ff6a00" },
        { tagName: "meta", name: "apple-mobile-web-app-capable", content: "yes" },
        { tagName: "meta", name: "apple-mobile-web-app-status-bar-style", content: "default" },
        { tagName: "meta", name: "apple-mobile-web-app-title", content: "n8n Brasil" },
        { tagName: "link", rel: "apple-touch-icon", href: "/n8n-Doc-PT-BR/img/favicon-br.svg" },
        { tagName: "meta", name: "msapplication-TileColor", content: "#ff6a00" },
        { tagName: "meta", name: "msapplication-config", content: "/n8n-Doc-PT-BR/browserconfig.xml" },
      ],
      // Usar Workbox (padrão) em vez de service worker customizado
      // swCustom: require.resolve('./src/sw.js'),
      // swRegister: '/sw.js',
    }],

    // Plugin para imagens otimizadas (Ideal Image)
    ["@docusaurus/plugin-ideal-image", {
      quality: 70,
      max: 1600,
      disableInDev: false,
      size: 16,
      min: 640,
      steps: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      disable: false,
      // Configurações adicionais para melhor performance
      name: 'static/img/ideal-img/[name].[hash:hex:7].[width].[ext]',
      include: ['**/*.{png,jpg,jpeg,gif,webp}'],
      exclude: ['**/node_modules/**'],
    }],










  ],

  themes: [
    "@docusaurus/theme-mermaid",
    "@docusaurus/theme-live-codeblock",
    "docusaurus-theme-github-codeblock"
  ],

  markdown: {
    mermaid: true,
  },

  scripts: [
    {
      src: "https://cdn.jsdelivr.net/npm/ionicons@latest/dist/ionicons/ionicons.esm.js",
      type: "module",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/ionicons@latest/dist/ionicons/ionicons.js",
      nomodule: true,
    },
    // GoatCounter Analytics (privacy-friendly) — sem Google Analytics
    {
      src: "https://gc.zgo.at/count.js",
      async: true,
      "data-goatcounter": "https://n8n-brasil.goatcounter.com/count",
    },
    // Métricas locais de performance (sem GA)
    { src: "/js/performance-metrics.js", async: true },
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/banner_n8n_ptbr.png",
    navbar: {
      title: "",
      // Logo corrigido - removido href para respeitar baseUrl
      logo: {
        alt: "n8n Logo",
        src: "img/n8n-color.webp",
        srcDark: "img/n8n-color_dark.webp",
      },
      // Ocultar navbar ao rolar
      hideOnScroll: true,
      items: [
        // Botão "Home" - Link para página inicial
        {
          to: "/",
          position: "left",
          className: "navbar-home-link",
        },

        // Dropdown "Documentação" - Agrupa conteúdo principal
        {
          type: "dropdown",
          label: "Documentação",
          position: "left",
          className: "navbar-documentation-dropdown",
          items: [
            {
              label: "Primeiros Passos",
              to: "/primeiros-passos/guia-instalacao",
            },
            { label: "Guias Avançados", to: "/usando-n8n" },
            { label: "Lógica e Dados", to: "/logica-e-dados" },
            { label: "IA Avançada", to: "/advanced-ai" },
            { label: "API", to: "/api" },
            { label: "Deployment", to: "/hosting-n8n/instalacao" },
            { label: "Embed", to: "/embed" },
          ],
        },

        // Dropdown "Integrações" - Destaque para nodes
        {
          type: "dropdown",
          label: "Integrações",
          position: "left",
          className: "navbar-integrations-dropdown",
          items: [
            { label: "Todos os Nodes", to: "/integracoes" },
            { label: "Integrações BR", to: "/integracoes-br" },
            { label: "Criar Nodes", to: "/integracoes/criar-nodes" },
          ],
        },

        // Dropdown "Comunidade" - Recursos da comunidade
        {
          type: "dropdown",
          label: "Comunidade",
          position: "left",
          className: "navbar-community-dropdown",
          items: [
            { label: "Artigos", to: "/comunidade/automacao-iniciantes" },
            { label: "Vídeos da Comunidade", to: "/comunidade/videos" },
            { label: "Repositórios da Comunidade", to: "/comunidade/github" },
            { label: "Como Participar", to: "/comunidade/como-participar" },
            { label: "Visão Geral", to: "/comunidade" },
            { label: "Casos de Uso Avançados", to: "/comunidade/casos-uso-avancados" },
          ],
        },

        {
          label: "Catálogo",
          to: "/catalogo",
          position: "left",
          className: "navbar-catalog-link",
        },

        // Link do Blog
        {
          label: "Blog",
          to: "/blog",
          position: "left",
          className: "navbar-blog-link",
        },

        // GitHub link com ícone nativo
        {
          href: "https://github.com/n8n-brasil/n8n-Doc-PT-BR",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub do n8n Brasil",
        },
      ],
    },

    // Configuração da sidebar - tornar hideable e auto-collapsible
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },

    // Tabela de conteúdos mais objetiva
    tableOfContents: { 
      minHeadingLevel: 2, 
      maxHeadingLevel: 4 
    },

    // Mermaid personalizado com tema claro/escuro
    mermaid: {
      theme: { light: "neutral", dark: "dark" },
      options: { 
        securityLevel: "strict",
        fontFamily: "Arial, sans-serif",
        fontSize: 14,
        themeVariables: {
          primaryColor: "#ff6a00",
          primaryTextColor: "#333",
          primaryBorderColor: "#ff6a00",
          lineColor: "#666",
          secondaryColor: "#f0f0f0",
          tertiaryColor: "#fff",
        },
      },
    },

    footer: {
      style: "dark",
      links: [
        {
          title: "Documentação",
          items: [
            {
              label: "Primeiros Passos",
              to: "/primeiros-passos/guia-instalacao",
            },
            {
              label: "Guias Avançados",
              to: "/usando-n8n",
            },
            {
              label: "Integrações",
              to: "/integracoes",
            },
            {
              label: "API",
              to: "/api",
            },
          ],
        },
        {
          title: "Comunidade",
          items: [
            {
              label: "Como Participar",
              to: "/comunidade/como-participar",
            },
            {
              label: "Artigos",
              to: "/comunidade/automacao-iniciantes",
            },
            {
              label: "Vídeos",
              to: "/comunidade/videos",
            },
            {
              label: "GitHub",
              to: "/comunidade/github",
            },
          ],
        },
        {
          title: "Recursos",
          items: [
            {
              label: "Comunidade",
              to: "/comunidade",
            },
            {
              label: "Referência",
              to: "/referencia",
            },
            {
              label: "FAQ",
              to: "/primeiros-passos/faq",
            },
          ],
        },
        {
          title: "Links Externos",
          items: [
            {
              label: "n8n Oficial",
              href: "https://n8n.io",
            },
            {
              label: "Documentação Oficial",
              href: "https://docs.n8n.io",
            },
            {
              label: "GitHub n8n",
              href: "https://github.com/n8n-io/n8n",
            },
            {
              label: "Comunidade n8n",
              href: "https://community.n8n.io",
            },
          ],
        },
        {
          title: "Legal",
          items: [
            {
              label: "Privacy Policy",
              href: "https://n8n.io/privacy",
            },
            {
              label: "Terms of Service",
              href: "https://n8n.io/terms",
            },
            {
              label: "Cookie Policy",
              href: "https://n8n.io/cookies",
            },
          ],
        },
        {
          title: "Projeto concebido por",
          items: [
            {
              label: "@tatyquebralayout",
              href: "https://github.com/tatyquebralayout",
            },
            {
              label: "@CJBiohacker",
              href: "https://github.com/CJBiohacker",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} n8n Brasil. Built with Docusaurus.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        "bash", "json", "yaml", "toml",
        "typescript", "tsx", "docker", "nginx", "ini", "diff", "powershell", "markdown"
      ],
    },

    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    announcementBar: {
      id: "support_us",
        content:
        '<ion-icon name="sparkles-outline" aria-hidden="true"></ion-icon> <strong>n8n Brasil</strong> — Documentação em português! ' +
        '<a target="_blank" rel="noopener noreferrer" aria-label="Contribua no GitHub do n8n Brasil" ' +
        'href="https://github.com/n8n-brasil/n8n-Doc-PT-BR">Contribua no GitHub</a>',
      backgroundColor: "#fafbfc",
      textColor: "#091E42",
      isCloseable: false,
    },

    metadata: [
      { name: "author", content: "Tatiana Barros, Carlos de Lima Junior" },
      {
        name: "description",
        content:
          "Documentação não oficial do n8n em português brasileiro (pt-BR), criada por Tatiana Barros e Carlos de Lima Junior, com o objetivo de democratizar a automação de processos através da filosofia Open Source.",
      },
      {
        name: "keywords",
        content:
          "n8n, n8n Brasil, documentação n8n, n8n em português, n8n pt-br, automação de processos, automação de workflow, integração de sistemas, plataforma de integração, código aberto, open source, low-code, no-code, tutorial n8n, guia n8n, exemplos n8n, nodes n8n, webhooks, API, criar nodes, automação de marketing, automação financeira, IA, inteligência artificial, machine learning, LangChain, embedding, automação com IA, análise de dados, processamento de dados, pipelines de dados, ETL, governança de dados, segurança de dados, hospedagem n8n, deploy n8n, comunidade n8n, developer relations, automação para desenvolvedores, automação para negócios",
      },
      { name: "robots", content: "index, follow" },
      // Open Graph
      {
        property: "og:title",
        content:
          "n8n Brasil - Documentação não oficial em Português Brasileiro",
      },
      {
        property: "og:description",
        content:
          "A maior documentação de n8n em pt-BR. Aprenda a automatizar processos, integrar sistemas e criar workflows com tutoriais, guias e exemplos práticos.",
      },
      {
        property: "og:image",
        content:
          "https://n8n-brasil.github.io/n8n-Doc-PT-BR/img/banner_n8n_ptbr.png",
      },
      {
        property: "og:url",
        content: "https://n8n-brasil.github.io/n8n-Doc-PT-BR/",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt-BR" },
      { property: "og:site_name", content: "n8n Docs Brasil" },
      { property: "og:image:alt", content: "Banner do n8n Docs Brasil" },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content:
          "n8n Brasil - Documentação não oficial em Português Brasileiro",
      },
    ],
  },
} satisfies Config;

export default config;
