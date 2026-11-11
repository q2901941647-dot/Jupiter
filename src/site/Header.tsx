import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icons';
import { navItems } from './data';

export interface SiteUser {
  name: string;
  email: string;
}

interface HeaderProps {
  user: SiteUser | null;
  onMenu: () => void;
  onAuth: () => void;
  onSignOut: () => void;
  onNav: (id: string) => void;
}

export function Header({ user, onMenu, onAuth, onSignOut, onNav }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!accountOpen) return;
    const onDown = (event: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [accountOpen]);

  const handleAccount = () => {
    if (!user) {
      onAuth();
      return;
    }
    setAccountOpen((open) => !open);
  };

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <button type="button" className="brand brand-btn" onClick={() => onNav('home')} aria-label="Bloom home">
        <span className="dots">
          <i />
          <i />
          <i />
          <i />
        </span>
        <b>bloom</b>
      </button>

      <nav className="site-nav" aria-label="Primary">
        {navItems.map((item) => (
          <button key={item.id} type="button" className="nav-link" onClick={() => onNav(item.id)}>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="header-actions">
        <div className="socials header-socials">
          <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="Bloom on X">
            <Icon name="x" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="Bloom on LinkedIn">
            <Icon name="linkedin" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Bloom on Instagram">
            <Icon name="instagram" />
          </a>
        </div>

        <div className="account-wrap" ref={accountRef}>
          <button
            type="button"
            className={`pill account-btn${user ? ' is-user' : ''}`}
            onClick={handleAccount}
            aria-haspopup={user ? 'menu' : 'dialog'}
            aria-expanded={user ? accountOpen : undefined}
            aria-label={user ? 'Account menu' : 'Sign in'}
          >
            {user ? (
              <span className="avatar" aria-hidden="true">
                {user.name.charAt(0).toUpperCase()}
              </span>
            ) : (
              <Icon name="user" size={15} />
            )}
            <span>{user ? user.name.split(' ')[0] : 'Account'}</span>
            <Icon name="chevronDown" size={14} />
          </button>

          {user && accountOpen ? (
            <div className="account-pop" role="menu">
              <p className="account-email">{user.email}</p>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setAccountOpen(false);
                  onNav('pricing');
                }}
              >
                Manage plan
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setAccountOpen(false);
                  onSignOut();
                }}
              >
                Sign out
              </button>
            </div>
          ) : null}
        </div>

        <button type="button" className="pill menu-btn" onClick={onMenu} aria-label="Open full menu">
          <Icon name="menu" />
          <span>Menu</span>
        </button>
      </div>
    </header>
  );
}
