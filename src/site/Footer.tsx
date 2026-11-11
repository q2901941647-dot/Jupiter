import { useState } from 'react';
import type { FormEvent } from 'react';
import { Icon } from './Icons';

interface FooterProps {
  onNav: (id: string) => void;
  onContact: () => void;
  onInfo: (title: string, body: string[]) => void;
  onSubscribe: (email: string) => void;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Footer({ onNav, onContact, onInfo, onSubscribe }: FooterProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailPattern.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    onSubscribe(email.trim());
    setEmail('');
    setError('');
  };

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="brand">
            <span className="dots">
              <i />
              <i />
              <i />
              <i />
            </span>
            <b>bloom</b>
          </div>
          <p className="footer-tag">
            A studio toolkit for botanical AI. Grow forms that feel alive, then ship them anywhere.
          </p>

          <form className="newsletter" onSubmit={submit} noValidate>
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (error) setError('');
              }}
              placeholder="you@studio.com"
              autoComplete="email"
              aria-invalid={Boolean(error)}
            />
            <button type="submit" className="btn btn-primary btn-sm">
              Subscribe
              <Icon name="arrow" size={15} />
            </button>
          </form>
          {error ? <p className="form-error">{error}</p> : null}
          <p className="footer-fine">Field notes once a month. No noise, unsubscribe anytime.</p>
        </div>

        <div className="footer-col">
          <h4>Product</h4>
          <button type="button" onClick={() => onNav('capabilities')}>
            Capabilities
          </button>
          <button type="button" onClick={() => onNav('showcase')}>
            Showcase
          </button>
          <button type="button" onClick={() => onNav('pricing')}>
            Pricing
          </button>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <button
            type="button"
            onClick={() =>
              onInfo('About Bloom', [
                'Bloom is a small, independent studio building tools for people who care about organic form.',
                'We started in 2023 with a single species archive and a stubborn belief that AI should propose form, not pixels.',
                'Today the toolkit is used by designers, filmmakers and museums in 34 countries.',
              ])
            }
          >
            About
          </button>
          <button
            type="button"
            onClick={() =>
              onInfo('Careers', [
                'We are a remote-first team of nine. We hire slowly and keep the bar high.',
                'Open roles: Senior Shader Engineer, Product Designer (motion), Studio Producer.',
                'No perfect resume required. Send work you are proud of to careers@bloom.ai.',
              ])
            }
          >
            Careers
          </button>
          <button type="button" onClick={onContact}>
            Contact
          </button>
        </div>

        <div className="footer-col">
          <h4>Resources</h4>
          <a href="https://reactbits.dev" target="_blank" rel="noreferrer">
            Docs
          </a>
          <a href="https://github.com/DavidHDev/react-bits" target="_blank" rel="noreferrer">
            Changelog
          </a>
          <button
            type="button"
            onClick={() =>
              onInfo('System status', [
                'All systems operational.',
                'Render cluster: 99.98% uptime over the last 30 days.',
                'API: 142 ms median response. Archive sync: healthy.',
              ])
            }
          >
            Status
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Bloom AI. All rights reserved.</p>
        <div className="footer-legal">
          <button
            type="button"
            onClick={() =>
              onInfo('Privacy', [
                'We collect the minimum needed to run your account: name, email and workspace activity.',
                'We never sell data and we never train public models on your work.',
                'You can export or delete everything from account settings at any time.',
              ])
            }
          >
            Privacy
          </button>
          <button
            type="button"
            onClick={() =>
              onInfo('Terms', [
                'Bloom is provided as a subscription service. You own everything you create.',
                'Fair use applies: do not resell raw compute or use the archive to build a competing dataset.',
                'Cancel anytime; access continues until the end of the billing period.',
              ])
            }
          >
            Terms
          </button>
          <span className="footer-built">
            Built with <a href="https://github.com/DavidHDev/react-bits" target="_blank" rel="noreferrer">react-bits</a>
          </span>
          <span className="footer-credit">
            Textures:{' '}
            <a href="https://www.solarsystemscope.com/textures/" target="_blank" rel="noreferrer">
              Solar System Scope
            </a>{' '}
            · CC BY 4.0
          </span>
          <button type="button" className="to-top" onClick={() => onNav('home')}>
            Back to top
            <Icon name="arrowUpRight" size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
