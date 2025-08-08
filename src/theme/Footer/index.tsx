import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useColorMode } from '@docusaurus/theme-common';
import clsx from 'clsx';
import styles from './styles.module.css';
import { useThemeConfig } from '@docusaurus/theme-common';
import IonicIcon from '../../components/IonicIcon';

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  blog?: string;
}

function FooterLink({ to, href, label, prependBaseUrlToHref, ...props }: {
  to?: string;
  href?: string;
  label: string;
  prependBaseUrlToHref?: boolean;
  [key: string]: any;
}) {
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });
  return (
    <Link
      className="footer__link-item"
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}
    >
      {label}
    </Link>
  );
}

function Footer(): React.JSX.Element | null {
  const { footer } = useThemeConfig();
  const { colorMode } = useColorMode();
  const [developers, setDevelopers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const cacheKey = 'n8nbr:footer:devs:v1';
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          setDevelopers(parsed.data || []);
          setLoading(false);
        }

        const usernames = ['tatyquebralayout', 'CJBiohacker'];
        const userPromises = usernames.map(async (username) => {
          const response = await fetch(`https://api.github.com/users/${username}`);
          if (!response.ok) {
            throw new Error(`Erro ao buscar usuário ${username}`);
          }
          return response.json();
        });

        const userData = await Promise.all(userPromises);
        setDevelopers(userData);

        // Cache com TTL de 6 horas
        const payload = { ts: Date.now(), ttl: 6 * 60 * 60 * 1000, data: userData };
        localStorage.setItem(cacheKey, JSON.stringify(payload));
      } catch (err) {
        console.error('Erro ao buscar desenvolvedores:', err);
      } finally {
        setLoading(false);
      }
    };

    // Evitar uso de cache expirado
    try {
      const cacheKey = 'n8nbr:footer:devs:v1';
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.ts && parsed.ttl && Date.now() - parsed.ts < parsed.ttl) {
          setDevelopers(parsed.data || []);
          setLoading(false);
          // Atualiza em background
          fetchDevelopers();
          return;
        }
      }
    } catch (error) {
      // Evita falha silenciosa e satisfaz regra no-empty
      console.debug('Cache inválido ou inacessível no footer:', error);
    }

    fetchDevelopers();
  }, []);

  if (!footer) {
    return null;
  }

  const { copyright, links = [] } = footer;

  return (
    <footer
      className={clsx('footer', {
        'footer--dark': colorMode === 'dark',
      })}
    >
      <div className="container margin-vert--lg">
        <div className="row">
          {links.map((item, i) => (
            <div key={i} className="col footer__col">
              {item.title != null && typeof item.title === 'string' && (
                <div className="footer__title">{item.title}</div>
              )}
              {item.title === 'Projeto concebido por' ? (
                <div className="footer__items">
                  {loading ? (
                    <div className={styles.developerSkeleton}>
                      <div className={styles.avatarSkeleton}></div>
                      <div className={styles.nameSkeleton}></div>
                    </div>
                  ) : (
                    developers.map((dev) => (
                      <div key={dev.login} className={styles.developer}>
                        <a
                          href={dev.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.developerLink}
                        >
                          <img
                            src={dev.avatar_url}
                            alt={`Avatar de ${dev.name || dev.login}`}
                            className={styles.developerAvatar}
                          />
                          <div className={styles.developerInfo}>
                            <span className={styles.developerName}>
                              {dev.name || dev.login}
                            </span>
                            <span className={styles.developerUsername}>
                              @{dev.login}
                            </span>
                          </div>
                        </a>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <ul className="footer__items clean-list">
                  {Array.isArray(item.items) && item.items.map((child: any, j: number) => {
                    if (typeof child === 'object' && child !== null) {
                      return (
                        <li key={j}>
                          <FooterLink {...child} />
                        </li>
                      );
                    }
                    return <span key={j}>{child}</span>;
                  })}
                </ul>
              )}
            </div>
          ))}
          
          {/* Nova seção para pedido de estrela no GitHub */}
          <div className="col footer__col">
            <div className="footer__title">
              <IonicIcon name="star-outline" size={16} color="currentColor" /> Apoie o Projeto
            </div>
            <div className={styles.starSection}>
              <p className={styles.starText}>
                Ajude-nos a crescer! Dê uma estrela no GitHub e ajude outras pessoas desenvolvedoras brasileiras a descobrir esta documentação.
              </p>
              <a
                href="https://github.com/n8n-brasil/n8n-Doc-PT-BR"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.starButton}
              >
                <svg className={styles.starIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Dar Estrela no GitHub
              </a>
              <p className={styles.starSubtext}>
                <IonicIcon name="rocket-outline" size={16} color="currentColor" /> Sua estrela nos motiva a continuar melhorando!
              </p>
            </div>
          </div>
        </div>
                 {copyright && (
           <div className="footer__bottom text--center">
             <div
               className="footer__copyright"
               dangerouslySetInnerHTML={{
                 __html: copyright,
               }}
             />
           </div>
         )}
      </div>
    </footer>
  );
}

export default Footer; 