import SplitText from '../components/SplitText/SplitText';
import GradientText from '../components/GradientText/GradientText';
import SpotlightCard from '../components/SpotlightCard/SpotlightCard';
import ClickSpark from '../components/ClickSpark/ClickSpark';
import { Icon } from './Icons';
import { features } from './data';
import type { Feature } from './data';

const GREEN_SPOT = 'rgba(79,227,168,0.30)';

interface HeroProps {
  onStart: () => void;
  onShowcase: () => void;
  onEnter: () => void;
  onTag: (category: 'Artistic' | 'AI' | '3D') => void;
  onFeature: (feature: Feature) => void;
  added: Record<string, boolean>;
  onToggleAdd: (feature: Feature) => void;
}

export function Hero({ onStart, onShowcase, onEnter, onTag, onFeature, added, onToggleAdd }: HeroProps) {
  const processing = features[0];
  const archive = features[1];
  const sculpting = features[2];

  return (
    <ClickSpark
      className="spark-wrap"
      sparkColor="#4fe3a8"
      sparkSize={11}
      sparkRadius={16}
      sparkCount={11}
      duration={460}
      shape="star"
      glow={1}
      ring
    >
      <div className="stage" id="home">
        <div className="hero">
          <section className="left">
            <span className="biglogo-wrap rise d2">
              <span className="biglogo">
                <i />
                <i />
                <i />
                <i />
              </span>
            </span>

            <h1 className="hero-title">
              <span className="title-line">
                <SplitText
                  text="Innovating the"
                  tag="span"
                  splitType="words"
                  delay={34}
                  duration={0.8}
                  ease="power3.out"
                  effect="rise"
                  staggerFrom="start"
                  trigger="load"
                />
              </span>
              <span className="title-line">
                <SplitText
                  text="spirit of"
                  tag="span"
                  splitType="words"
                  delay={30}
                  duration={0.7}
                  ease="power2.out"
                  effect="rise"
                  trigger="load"
                />{' '}
                <em>
                  <SplitText
                    text="bloom AI"
                    tag="span"
                    splitType="words"
                    delay={30}
                    duration={0.7}
                    ease="power2.out"
                    effect="rise"
                    trigger="load"
                  />
                </em>
              </span>
            </h1>

            <div className="cta-row rise d4">
              <button type="button" className="explore" onClick={onStart}>
                Explore Now
                <Icon name="arrow" size={15} />
              </button>
              <button type="button" className="explore explore--ghost" onClick={onShowcase}>
                View showcase
                <Icon name="play" size={14} />
              </button>
            </div>

            <div className="tags rise d5">
              <button type="button" className="tag" onClick={() => onTag('Artistic')}>
                Artistic Gallery
              </button>
              <button type="button" className="tag" onClick={() => onTag('AI')}>
                AI Generation
              </button>
              <button type="button" className="tag" onClick={() => onTag('3D')}>
                3D Structures
              </button>
            </div>

            <div className="credits rise d6">
              <GradientText
                className="vision"
                colors={['#4fe3a8', '#b6ffe0', '#2bbf86']}
                animationSpeed={6}
                showBorder={false}
              >
                VISIONARY DESIGN
              </GradientText>
              <p className="quote">
                We imagined a <em>realm with no ending.</em>
              </p>
              <div className="sign">— MARCUS AURELIO —</div>
            </div>
          </section>

          <aside className="right">
            <div className="right-top" />

            <SpotlightCard
              className="eco rise d3"
              spotlightColor={GREEN_SPOT}
              shape="circle"
              theme="dark"
              intensity={1.1}
              role="button"
              tabIndex={0}
              aria-label="Enter the Bloom ecosystem"
              onClick={onEnter}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onEnter();
                }
              }}
            >
              <div className="eco-head">
                <h3>Enter our ecosystem</h3>
                <span className="card-go">
                  <Icon name="arrowUpRight" size={16} />
                </span>
              </div>
              <p>Connect with creators and keep active with Bloom's modern AI-powered systems.</p>
            </SpotlightCard>

            <div className="cardrow">
              <SpotlightCard
                className="card rise d5"
                spotlightColor={GREEN_SPOT}
                shape="beam"
                theme="dark"
                borderGlow={1.2}
                role="button"
                tabIndex={0}
                aria-label={`Open ${processing.title} details`}
                onClick={() => onFeature(processing)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onFeature(processing);
                  }
                }}
              >
                <div className="ico">
                  <Icon name="spark" size={18} />
                </div>
                <h4>{processing.title}</h4>
                <p>{processing.short}</p>
                <button
                  type="button"
                  className={`plus${added[processing.id] ? ' is-added' : ''}`}
                  aria-pressed={Boolean(added[processing.id])}
                  aria-label={added[processing.id] ? 'Remove from workspace' : 'Add to workspace'}
                  onClick={(event) => {
                    event.stopPropagation();
                    onToggleAdd(processing);
                  }}
                >
                  <Icon name={added[processing.id] ? 'check' : 'plus'} size={16} />
                </button>
              </SpotlightCard>

              <SpotlightCard
                className="card rise d6"
                spotlightColor={GREEN_SPOT}
                shape="beam"
                theme="dark"
                borderGlow={1.2}
                role="button"
                tabIndex={0}
                aria-label={`Open ${archive.title} details`}
                onClick={() => onFeature(archive)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onFeature(archive);
                  }
                }}
              >
                <div className="ico">
                  <Icon name="layers" size={18} />
                </div>
                <h4>{archive.title}</h4>
                <p>{archive.short}</p>
                <button
                  type="button"
                  className={`plus${added[archive.id] ? ' is-added' : ''}`}
                  aria-pressed={Boolean(added[archive.id])}
                  aria-label={added[archive.id] ? 'Remove from workspace' : 'Add to workspace'}
                  onClick={(event) => {
                    event.stopPropagation();
                    onToggleAdd(archive);
                  }}
                >
                  <Icon name={added[archive.id] ? 'check' : 'plus'} size={16} />
                </button>
              </SpotlightCard>
            </div>

            <SpotlightCard
              className="wide rise d7"
              spotlightColor={GREEN_SPOT}
              shape="beam"
              theme="dark"
              borderGlow={1.2}
              role="button"
              tabIndex={0}
              aria-label={`Open ${sculpting.title} details`}
              onClick={() => onFeature(sculpting)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onFeature(sculpting);
                }
              }}
            >
              <div className="thumb" />
              <div className="txt">
                <h4>{sculpting.title}</h4>
                <p>{sculpting.short}</p>
              </div>
              <button
                type="button"
                className={`plus${added[sculpting.id] ? ' is-added' : ''}`}
                aria-pressed={Boolean(added[sculpting.id])}
                aria-label={added[sculpting.id] ? 'Remove from workspace' : 'Add to workspace'}
                onClick={(event) => {
                  event.stopPropagation();
                  onToggleAdd(sculpting);
                }}
              >
                <Icon name={added[sculpting.id] ? 'check' : 'plus'} size={16} />
              </button>
            </SpotlightCard>
          </aside>
        </div>

        <button type="button" className="scroll-hint" onClick={onStart} aria-label="Scroll to capabilities">
          <Icon name="mouse" size={18} />
          <span>Scroll to explore</span>
        </button>
      </div>
    </ClickSpark>
  );
}
