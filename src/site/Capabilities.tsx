import SpotlightCard from '../components/SpotlightCard/SpotlightCard';
import CountUp from '../components/CountUp/CountUp';
import { Icon } from './Icons';
import { features } from './data';
import type { Feature } from './data';

const stats = [
  { to: 12.4, decimals: 1, suffix: 'k', label: 'Creators' },
  { to: 48, decimals: 0, suffix: 'k', label: 'Renders this month' },
  { to: 99.9, decimals: 1, suffix: '%', label: 'Uptime' },
  { to: 4.9, decimals: 1, suffix: '/5', label: 'Average rating' },
];

interface CapabilitiesProps {
  onFeature: (feature: Feature) => void;
  onStart: () => void;
}

export function Capabilities({ onFeature, onStart }: CapabilitiesProps) {
  return (
    <section className="section" id="capabilities">
      <div className="section-inner">
        <div className="section-head">
          <span className="eyebrow">Capabilities</span>
          <h2 className="section-title">
            A studio-grade toolkit for <em>botanical AI</em>
          </h2>
          <p className="section-sub">
            From first sketch to final frame, Bloom keeps the craft in your hands. Every tool is built for
            organic form, real light and work you can actually ship.
          </p>
        </div>

        <div className="stat-row">
          {stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <div className="stat-value">
                <CountUp to={stat.to} decimals={stat.decimals} suffix={stat.suffix} duration={1.8} />
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <SpotlightCard
              key={feature.id}
              className="feature-card"
              spotlightColor={feature.accent}
              shape="circle"
              theme="dark"
              borderGlow={1.1}
              role="button"
              tabIndex={0}
              aria-label={`Open ${feature.title} details`}
              onClick={() => onFeature(feature)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onFeature(feature);
                }
              }}
            >
              <div className="feature-icon">
                <Icon name={feature.icon} size={22} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.short}</p>
              <span className="card-link">
                Learn more
                <Icon name="arrow" size={15} />
              </span>
            </SpotlightCard>
          ))}
        </div>

        <div className="section-cta">
          <div>
            <h3>Ready to grow something?</h3>
            <p>Start with a free seed project. No card, no lock-in, just the toolkit.</p>
          </div>
          <button type="button" className="btn btn-primary" onClick={onStart}>
            Start a project
            <Icon name="arrow" size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
