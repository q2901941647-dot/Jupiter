import { Icon } from './Icons';
import { plans } from './data';
import type { Plan } from './data';

export type Billing = 'monthly' | 'annual';

interface PricingProps {
  billing: Billing;
  onBilling: (billing: Billing) => void;
  onChoose: (plan: Plan) => void;
}

export function Pricing({ billing, onBilling, onChoose }: PricingProps) {
  return (
    <section className="section" id="pricing">
      <div className="section-inner">
        <div className="section-head">
          <span className="eyebrow">Pricing</span>
          <h2 className="section-title">
            Simple plans, <em>no surprises</em>
          </h2>
          <p className="section-sub">
            Start free and upgrade when the work does. Every plan includes the full render engine and the
            species archive.
          </p>
        </div>

        <div className="billing-toggle" role="group" aria-label="Billing period">
          <button
            type="button"
            className={billing === 'monthly' ? 'is-active' : ''}
            aria-pressed={billing === 'monthly'}
            onClick={() => onBilling('monthly')}
          >
            Monthly
          </button>
          <button
            type="button"
            className={billing === 'annual' ? 'is-active' : ''}
            aria-pressed={billing === 'annual'}
            onClick={() => onBilling('annual')}
          >
            Annual
            <span className="save">-20%</span>
          </button>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => {
            const price = billing === 'annual' ? plan.annual : plan.monthly;
            return (
              <div key={plan.id} className={`plan-card${plan.popular ? ' plan-card--featured' : ''}`}>
                {plan.popular ? <span className="plan-badge">Most popular</span> : null}
                <h3>{plan.name}</h3>
                <p className="plan-blurb">{plan.blurb}</p>

                <div className="plan-price">
                  {price === 0 ? (
                    <span className="price-num">Free</span>
                  ) : (
                    <>
                      <span className="price-cur">$</span>
                      <span className="price-num">{price}</span>
                      <span className="price-per">/mo</span>
                    </>
                  )}
                </div>
                <p className="plan-note">
                  {plan.monthly === 0
                    ? 'Free forever'
                    : billing === 'annual'
                      ? 'Billed yearly · save 20%'
                      : 'Billed monthly · cancel anytime'}
                </p>

                <button
                  type="button"
                  className={`btn btn-block ${plan.popular ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => onChoose(plan)}
                >
                  {plan.cta}
                  <Icon name="arrow" size={16} />
                </button>

                <ul className="plan-features">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <span className="tick">
                        <Icon name="check" size={12} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="pricing-foot">
          All prices in USD. Need invoicing, procurement or a custom agreement?{' '}
          <button type="button" className="text-link" onClick={() => onChoose(plans[2])}>
            Talk to our team
          </button>
          .
        </p>
      </div>
    </section>
  );
}
