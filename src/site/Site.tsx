import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Header } from './Header';
import type { SiteUser } from './Header';
import { Hero } from './Hero';
import { Capabilities } from './Capabilities';
import { Showcase } from './Showcase';
import { Pricing } from './Pricing';
import type { Billing } from './Pricing';
import { Footer } from './Footer';
import { Modal } from './Modal';
import { useToast } from './Toast';
import { Icon } from './Icons';
import { navItems, plans } from './data';
import type { Feature, Plan, Work, WorkFilter } from './data';
import Starfield from '../components/Starfield';
import JupiterScene from '../components/JupiterScene';
import '../bloom.css';
import './site.css';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const aboutBody = [
  'Bloom is a small, independent studio building tools for people who care about organic form.',
  'We started in 2023 with a single species archive and a stubborn belief that AI should propose form, not pixels.',
  'Today the toolkit is used by designers, filmmakers and museums in 34 countries.',
];

function readUser(): SiteUser | null {
  try {
    const raw = localStorage.getItem('bloom-user');
    return raw ? (JSON.parse(raw) as SiteUser) : null;
  } catch {
    return null;
  }
}

function readAdded(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem('bloom-added');
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

export function Site() {
  const push = useToast();
  const [user, setUser] = useState<SiteUser | null>(readUser);
  const [added, setAdded] = useState<Record<string, boolean>>(readAdded);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [startPlan, setStartPlan] = useState<string | null>(null);
  const [detail, setDetail] = useState<Feature | null>(null);
  const [work, setWork] = useState<Work | null>(null);
  const [info, setInfo] = useState<{ title: string; body: string[] } | null>(null);
  const [billing, setBilling] = useState<Billing>('monthly');
  const [filter, setFilter] = useState<WorkFilter>('All');
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const element = document.getElementById('home');
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.08 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('drawer-open', menuOpen);
    return () => {
      document.body.classList.remove('drawer-open');
    };
  }, [menuOpen]);

  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const closeAll = () => {
    setAuthOpen(false);
    setStartPlan(null);
    setDetail(null);
    setWork(null);
    setInfo(null);
  };

  const onNav = (id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  const openFeature = (feature: Feature) => {
    closeAll();
    setDetail(feature);
  };

  const openWork = (next: Work) => {
    closeAll();
    setWork(next);
  };

  const openInfo = (title: string, body: string[]) => {
    closeAll();
    setInfo({ title, body });
  };

  const openStart = (plan = 'Bloom') => {
    closeAll();
    setStartPlan(plan);
  };

  const openAuth = () => {
    closeAll();
    setAuthOpen(true);
  };

  const handleSignIn = (next: SiteUser) => {
    setUser(next);
    try {
      localStorage.setItem('bloom-user', JSON.stringify(next));
    } catch {
      /* storage may be unavailable */
    }
    setAuthOpen(false);
    push(`Welcome, ${next.name}. Your workspace is ready.`);
  };

  const handleSignOut = () => {
    setUser(null);
    try {
      localStorage.removeItem('bloom-user');
    } catch {
      /* storage may be unavailable */
    }
    push('Signed out. See you next time.');
  };

  const handleLead = (lead: { name: string; email: string; plan: string }) => {
    try {
      const raw = localStorage.getItem('bloom-leads');
      const list = raw ? (JSON.parse(raw) as unknown[]) : [];
      list.push({ ...lead, at: new Date().toISOString() });
      localStorage.setItem('bloom-leads', JSON.stringify(list));
    } catch {
      /* storage may be unavailable */
    }
    push(`Request received for ${lead.plan}. We will email ${lead.email}.`);
  };

  const handleSubscribe = (email: string) => {
    try {
      localStorage.setItem('bloom-newsletter', email);
    } catch {
      /* storage may be unavailable */
    }
    push(`Subscribed ${email}. Welcome to field notes.`);
  };

  const toggleAdd = (feature: Feature) => {
    const isAdded = Boolean(added[feature.id]);
    setAdded((prev) => {
      const next = { ...prev, [feature.id]: !prev[feature.id] };
      try {
        localStorage.setItem('bloom-added', JSON.stringify(next));
      } catch {
        /* storage may be unavailable */
      }
      return next;
    });
    push(isAdded ? `${feature.title} removed from workspace.` : `${feature.title} added to your workspace.`);
  };

  const handleTag = (category: 'Artistic' | 'AI' | '3D') => {
    setFilter(category);
    scrollToId('showcase');
  };

  return (
    <div className="site">
      <Starfield />
      <div className="bg-glow" />
      <div className="left-scrim" />
      <div className="vignette" />
      <JupiterScene active={heroVisible} />

      <Header
        user={user}
        onMenu={() => setMenuOpen(true)}
        onAuth={openAuth}
        onSignOut={handleSignOut}
        onNav={onNav}
      />

      <main>
        <Hero
          onStart={() => onNav('capabilities')}
          onShowcase={() => onNav('showcase')}
          onEnter={() => openStart('Bloom')}
          onTag={handleTag}
          onFeature={openFeature}
          added={added}
          onToggleAdd={toggleAdd}
        />
        <Capabilities onFeature={openFeature} onStart={() => openStart('Bloom')} />
        <Showcase filter={filter} onFilter={setFilter} onWork={openWork} />
        <Pricing billing={billing} onBilling={setBilling} onChoose={(plan: Plan) => openStart(plan.name)} />
      </main>

      <Footer
        onNav={onNav}
        onContact={() => openStart('Studio')}
        onInfo={openInfo}
        onSubscribe={handleSubscribe}
      />

      {menuOpen ? (
        <div
          className="drawer-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setMenuOpen(false);
          }}
        >
          <aside className="drawer" role="dialog" aria-modal="true" aria-label="Full menu">
            <div className="drawer-head">
              <span className="eyebrow">Menu</span>
              <button type="button" className="icon-btn" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <Icon name="close" />
              </button>
            </div>

            <nav className="drawer-nav">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    scrollToId(item.id);
                  }}
                >
                  {item.label}
                  <Icon name="arrowUpRight" size={16} />
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openInfo('About Bloom', aboutBody);
                }}
              >
                About
                <Icon name="arrowUpRight" size={16} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openStart('Studio');
                }}
              >
                Contact
                <Icon name="arrowUpRight" size={16} />
              </button>
            </nav>

            <div className="drawer-foot">
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={() => {
                  setMenuOpen(false);
                  openStart('Bloom');
                }}
              >
                Start a project
                <Icon name="arrow" size={16} />
              </button>
              <div className="drawer-socials">
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
            </div>
          </aside>
        </div>
      ) : null}

      {authOpen ? (
        <Modal
          title="Your Bloom account"
          subtitle="Sign in to sync projects, materials and render history."
          onClose={() => setAuthOpen(false)}
        >
          <AuthForm onDone={handleSignIn} />
        </Modal>
      ) : null}

      {startPlan ? (
        <Modal
          title={startPlan === 'Studio' ? 'Talk to our team' : 'Start with Bloom'}
          subtitle={
            startPlan === 'Studio'
              ? 'Tell us about your team and we will set up a call.'
              : `You are requesting the ${startPlan} plan. No card required.`
          }
          onClose={() => setStartPlan(null)}
        >
          <StartForm plan={startPlan} onDone={handleLead} />
        </Modal>
      ) : null}

      {detail ? (
        <Modal title={detail.title} subtitle="Capability" onClose={() => setDetail(null)}>
          <p className="modal-text">{detail.description}</p>
          <ul className="detail-list">
            {detail.bullets.map((bullet) => (
              <li key={bullet}>
                <span className="tick">
                  <Icon name="check" size={12} />
                </span>
                {bullet}
              </li>
            ))}
          </ul>
          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setDetail(null);
                openStart('Bloom');
              }}
            >
              Start a project
              <Icon name="arrow" size={16} />
            </button>
            <button
              type="button"
              className={`btn btn-ghost${added[detail.id] ? ' is-on' : ''}`}
              onClick={() => toggleAdd(detail)}
            >
              {added[detail.id] ? 'Remove from workspace' : 'Add to workspace'}
            </button>
          </div>
        </Modal>
      ) : null}

      {work ? (
        <Modal
          wide
          title={work.title}
          subtitle={`${work.category} · Bloom studio`}
          onClose={() => setWork(null)}
        >
          <div className="work-hero" style={{ background: work.gradient }}>
            <span className="work-art" aria-hidden="true" />
          </div>
          <p className="modal-text">{work.description}</p>
          <div className="tag-row">
            {work.tags.map((tag) => (
              <span className="tag tag--static" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setWork(null);
                openStart('Bloom');
              }}
            >
              Start a similar project
              <Icon name="arrow" size={16} />
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => setWork(null)}>
              Close
            </button>
          </div>
        </Modal>
      ) : null}

      {info ? (
        <Modal title={info.title} onClose={() => setInfo(null)}>
          {info.body.map((paragraph) => (
            <p className="modal-text" key={paragraph}>
              {paragraph}
            </p>
          ))}
          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={() => setInfo(null)}>
              Close
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

function AuthForm({ onDone }: { onDone: (user: SiteUser) => void }) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanEmail = email.trim();
    if (mode === 'signup' && !name.trim()) {
      setError('Tell us your name.');
      return;
    }
    if (!emailPattern.test(cleanEmail)) {
      setError('Enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password needs at least 6 characters.');
      return;
    }
    let display = name.trim();
    if (!display) {
      try {
        const raw = localStorage.getItem('bloom-account');
        if (raw) {
          const account = JSON.parse(raw) as SiteUser;
          if (account.email === cleanEmail) display = account.name;
        }
      } catch {
        /* storage may be unavailable */
      }
    }
    if (!display) display = cleanEmail.split('@')[0];
    const next = { name: display, email: cleanEmail };
    try {
      localStorage.setItem('bloom-account', JSON.stringify(next));
    } catch {
      /* storage may be unavailable */
    }
    onDone(next);
  };

  return (
    <div>
      <div className="auth-tabs" role="tablist" aria-label="Account mode">
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'signin'}
          className={mode === 'signin' ? 'is-active' : ''}
          onClick={() => {
            setMode('signin');
            setError('');
          }}
        >
          Sign in
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'signup'}
          className={mode === 'signup' ? 'is-active' : ''}
          onClick={() => {
            setMode('signup');
            setError('');
          }}
        >
          Create account
        </button>
      </div>

      <form className="form" onSubmit={submit} noValidate>
        {mode === 'signup' ? (
          <label className="field">
            <span>Name</span>
            <input
              className="input"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ada Lovelace"
              autoComplete="name"
            />
          </label>
        ) : null}
        <label className="field">
          <span>Email</span>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@studio.com"
            autoComplete="email"
          />
        </label>
        <label className="field">
          <span>Password</span>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="At least 6 characters"
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
          />
        </label>
        {error ? <p className="form-error">{error}</p> : null}
        <button type="submit" className="btn btn-primary btn-block">
          {mode === 'signin' ? 'Sign in' : 'Create account'}
          <Icon name="arrow" size={16} />
        </button>
        <p className="form-fine">Demo authentication. Credentials stay in your browser.</p>
      </form>
    </div>
  );
}

function StartForm({
  plan,
  onDone,
}: {
  plan: string;
  onDone: (lead: { name: string; email: string; plan: string }) => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selected, setSelected] = useState(plan);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) {
      setError('Tell us your name.');
      return;
    }
    if (!emailPattern.test(email.trim())) {
      setError('Enter a valid email address.');
      return;
    }
    onDone({ name: name.trim(), email: email.trim(), plan: selected });
    setSent(true);
  };

  if (sent) {
    return (
      <div className="success">
        <span className="success-icon">
          <Icon name="check" size={22} />
        </span>
        <h4>You are on the list.</h4>
        <p>
          We will reach out to <strong>{email.trim()}</strong> about the {selected} plan within one business
          day.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="field-row">
        <label className="field">
          <span>Name</span>
          <input
            className="input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ada Lovelace"
            autoComplete="name"
          />
        </label>
        <label className="field">
          <span>Email</span>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@studio.com"
            autoComplete="email"
          />
        </label>
      </div>
      <label className="field">
        <span>Plan</span>
        <select className="input" value={selected} onChange={(event) => setSelected(event.target.value)}>
          {plans.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      </label>
      {error ? <p className="form-error">{error}</p> : null}
      <button type="submit" className="btn btn-primary btn-block">
        Request access
        <Icon name="arrow" size={16} />
      </button>
      <p className="form-fine">No card required. We reply within one business day.</p>
    </form>
  );
}
