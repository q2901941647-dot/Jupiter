import { Icon } from './Icons';
import { works } from './data';
import type { Work, WorkFilter } from './data';

const filters: WorkFilter[] = ['All', 'Artistic', 'AI', '3D'];

interface ShowcaseProps {
  filter: WorkFilter;
  onFilter: (filter: WorkFilter) => void;
  onWork: (work: Work) => void;
}

export function Showcase({ filter, onFilter, onWork }: ShowcaseProps) {
  const visible = filter === 'All' ? works : works.filter((work) => work.category === filter);

  return (
    <section className="section section--alt" id="showcase">
      <div className="section-inner">
        <div className="section-head">
          <span className="eyebrow">Showcase</span>
          <h2 className="section-title">
            Selected work from the <em>Bloom studio</em>
          </h2>
          <p className="section-sub">
            A small selection of recent output. Filter by discipline, open any piece to read how it was made.
          </p>
        </div>

        <div className="chips" role="tablist" aria-label="Filter work by discipline">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={filter === item}
              className={`chip${filter === item ? ' is-active' : ''}`}
              onClick={() => onFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="work-grid">
          {visible.map((work) => (
            <article
              key={work.id}
              className="work-card"
              style={{ background: work.gradient }}
              role="button"
              tabIndex={0}
              aria-label={`Open ${work.title}`}
              onClick={() => onWork(work)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onWork(work);
                }
              }}
            >
              <span className="work-art" aria-hidden="true" />
              <div className="work-meta">
                <span className="work-cat">{work.category}</span>
                <h3>{work.title}</h3>
                <p>{work.blurb}</p>
              </div>
              <span className="work-go" aria-hidden="true">
                <Icon name="arrowUpRight" size={18} />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
