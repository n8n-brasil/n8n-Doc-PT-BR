// Script de métricas de performance
/* global PerformanceObserver, CustomEvent */
(function() {
  'use strict';
  
  // Declarações globais para evitar erros de linting
  
  // Função para medir métricas de performance
  function measurePerformance() {
    // First Contentful Paint (FCP)
    if ('PerformanceObserver' in window) {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('FCP:', entry.startTime);
          // Hook custom: dispatchEvent para coleta opcional sem GA
          window.dispatchEvent(new CustomEvent('perf:fcp', { detail: Math.round(entry.startTime) }));
        });
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
    }
    
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
        window.dispatchEvent(new CustomEvent('perf:lcp', { detail: Math.round(lastEntry.startTime) }));
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    }
    
    // First Input Delay (FID)
    if ('PerformanceObserver' in window) {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime);
          window.dispatchEvent(new CustomEvent('perf:fid', { detail: Math.round(entry.processingStart - entry.startTime) }));
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    }
    
    // Cumulative Layout Shift (CLS)
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            console.log('CLS:', clsValue);
            window.dispatchEvent(new CustomEvent('perf:cls', { detail: Math.round(clsValue * 1000) }));
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  }
  
  // Função para monitorar erros
  function monitorErrors() {
    window.addEventListener('error', function(e) {
      console.error('JavaScript Error:', e.error);
      window.dispatchEvent(new CustomEvent('perf:error', { detail: { message: e.error?.message || String(e.error), fatal: false } }));
    });
    
    window.addEventListener('unhandledrejection', function(e) {
      console.error('Unhandled Promise Rejection:', e.reason);
      window.dispatchEvent(new CustomEvent('perf:unhandledrejection', { detail: { reason: e.reason, fatal: false } }));
    });
  }
  
  // Função para monitorar recursos
  function monitorResources() {
    if ('PerformanceObserver' in window) {
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.initiatorType === 'img' || entry.initiatorType === 'script') {
            console.log('Resource Load:', entry.name, entry.duration);
            if (entry.duration > 1000) {
              window.dispatchEvent(new CustomEvent('perf:resource_load', { detail: { name: entry.name, duration: Math.round(entry.duration) } }));
            }
          }
        });
      });
      resourceObserver.observe({ entryTypes: ['resource'] });
    }
  }
  
  // Função para monitorar navegação
  function monitorNavigation() {
    // Monitora mudanças de rota
    if (window.location) {
      let currentPath = window.location.pathname;
      
      setInterval(() => {
        if (window.location.pathname !== currentPath) {
          currentPath = window.location.pathname;
          console.log('Navigation:', currentPath);
          window.dispatchEvent(new CustomEvent('perf:page_view', { detail: { title: document.title, url: window.location.href } }));
        }
      }, 100);
    }
  }
  
  // Inicializa monitoramento quando DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      measurePerformance();
      monitorErrors();
      monitorResources();
      monitorNavigation();
    });
  } else {
    measurePerformance();
    monitorErrors();
    monitorResources();
    monitorNavigation();
  }
})();
