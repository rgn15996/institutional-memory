import React, { useEffect, useRef, useState } from "react";
import {
  QUESTION,
  SCENARIO_CARDS,
  WHAT_WE_BUILT,
  DEAL_EVENTS,
  SESSIONS,
  HERO_STATS,
  COMPARISON,
  DEAL_IMPACT,
  MEMORY_FILES,
  DIFF_META,
  DIFF_LINES,
  VERSION_HISTORY,
  SESSION3_TABLE,
  SESSION3_SYNTHESIS,
  CRITERIA,
  STRETCH,
  STACK,
} from "./data.js";

/* ---------- hooks ---------- */

function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useCountUp(target, run, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return value;
}

/* ---------- building blocks ---------- */

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function StatTile({ value, label, suffix, run, delay }) {
  const n = useCountUp(value, run);
  return (
    <div className="stat-tile" style={{ animationDelay: `${delay}ms` }}>
      <div className="stat-value">
        {n}
        <span className="stat-suffix">{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

/* ---------- sections ---------- */

function Hero() {
  const [ref, inView] = useInView(0.3);
  return (
    <header className="hero" ref={ref}>
      <div className="hero-badge">DXC Hackathon · Partner Basecamp 2026 · Memory &amp; Context Engineering</div>
      <h1>
        The agent that <em>remembers the deal</em>
      </h1>
      <p className="hero-sub">
        We built an AI teammate for a sales pursuit: an agent with <strong>persistent memory</strong> that
        keeps the deal intel current between conversations. We tested it on a fictional £6–8m pursuit —
        pitching <strong>DXC OASIS</strong> to Gloucester Air<span className="fn">*</span> — and let the
        world move underneath it: a meltdown, a departed champion, a competitor in the room. It caught
        every change and rebuilt the strategy, so the team walks in current, not confident-but-wrong.
      </p>
      <div className="stat-row">
        {HERO_STATS.map((s, i) => (
          <StatTile key={s.label} {...s} run={inView} delay={i * 120} />
        ))}
      </div>
      <div className="question-card">
        <span className="q-label">The question, asked in every session</span>
        <p>“{QUESTION}”</p>
      </div>
      <p className="fineprint">* Synthetic demo data — Gloucester Air and every named person are fictional.</p>
    </header>
  );
}

function Scenario() {
  return (
    <section>
      <Reveal>
        <h2>The scenario</h2>
        <p className="section-sub">
          Three things to hold in mind — the product, the prospect, and the problem this agent
          exists to solve.
        </p>
      </Reveal>
      <div className="scenario-grid">
        {SCENARIO_CARDS.map((c, i) => (
          <Reveal key={c.title} delay={i * 100}>
            <article className="scenario-card">
              <span className="scenario-kicker">{c.kicker}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div className="built-banner">
          <span className="built-label">What we built</span>
          <p>{WHAT_WE_BUILT}</p>
          <div className="flow-strip" aria-label="Architecture: deal documents flow into the agent, which reads and writes a persistent memory store">
            <div className="flow-node">
              Deal documents
              <span>briefings · call notes · product updates</span>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-node agent">
              The agent
              <span>Claude · Managed Agents</span>
            </div>
            <div className="flow-arrow">⇄</div>
            <div className="flow-node memory">
              Memory store
              <span>persists across every session</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function DealStory() {
  return (
    <section>
      <Reveal>
        <h2>Six weeks that broke the strategy</h2>
        <p className="section-sub">
          The fictional events at Gloucester Air — everything the pursuit team knew arrived as
          documents, in two batches, weeks apart. Highlighted events are the ones that invalidated
          the original plan.
        </p>
      </Reveal>
      <div className="timeline">
        {DEAL_EVENTS.map((e, i) => (
          <Reveal key={e.date} delay={i * 90} className={`timeline-item ${e.turn ? "turn" : ""}`}>
            <div className="timeline-step event-date">{e.date}</div>
            <div className="timeline-body">
              <h3>
                {e.title}
                {e.turn && <span className="pill turn-pill">changed everything</span>}
              </h3>
              <p>{e.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Experiment() {
  return (
    <section>
      <Reveal>
        <h2>The experiment: three conversations with the agent</h2>
        <p className="section-sub">
          We asked the agent the same strategy question in three separate sessions. Each session is
          a completely fresh conversation — the agent starts with a blank context every time. The
          only continuity is the memory store it writes for itself.
        </p>
      </Reveal>
      <div className="session-grid">
        {SESSIONS.map((s, i) => (
          <Reveal key={s.n} delay={i * 110}>
            <article className={`session-card border-s${s.n}`}>
              <header>
                <span className={`session-num s${s.n}`}>Session {s.n}</span>
                <h3>{s.when}</h3>
              </header>
              <dl>
                <dt>What we gave it</dt>
                <dd>{s.gave}</dd>
                <dt>What it did</dt>
                <dd>{s.did}</dd>
                <dt>What came back</dt>
                <dd className="session-answer">{s.answer}</dd>
              </dl>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Comparison() {
  const [active, setActive] = useState(0);
  const row = COMPARISON[active];
  return (
    <section>
      <Reveal>
        <h2>Same question. Sharper answer.</h2>
        <p className="section-sub">
          Six dimensions where the strategy moved between sessions. Each one is a mistake we now
          won't make in the room.
        </p>
      </Reveal>
      <Reveal>
        <div className="dim-tabs" role="tablist" aria-label="Comparison dimensions">
          {COMPARISON.map((c, i) => (
            <button
              key={c.dimension}
              role="tab"
              aria-selected={i === active}
              className={`dim-tab ${i === active ? "active" : ""}`}
              onClick={() => setActive(i)}
            >
              {c.dimension}
            </button>
          ))}
        </div>
        <div className="compare-grid" key={active}>
          <article className="compare-card s1">
            <header>
              <span className="dot s1" /> Session 1 · knew only the June pack
            </header>
            <p>{row.s1}</p>
          </article>
          <div className="compare-arrow" aria-hidden="true">
            →
          </div>
          <article className="compare-card s2">
            <header>
              <span className="dot s2" /> Session 2 · memory + the July intel
            </header>
            <p>{row.s2}</p>
          </article>
        </div>
        <p className="compare-why">{row.why}</p>
      </Reveal>
    </section>
  );
}

function DealImpact() {
  return (
    <section>
      <Reveal>
        <h2>What that's worth in the room</h2>
        <p className="section-sub">
          Each memory behaviour maps to a concrete way we could have lost this deal — and now won't.
        </p>
      </Reveal>
      <div className="impact-grid">
        {DEAL_IMPACT.map((d, i) => (
          <Reveal key={d.title} delay={i * 80}>
            <article className="impact-card">
              <h3>{d.title}</h3>
              <p className="impact-risk">
                <span className="impact-tag risk">Without memory</span> {d.risk}
              </p>
              <p className="impact-outcome">
                <span className="impact-tag win">With memory</span> {d.outcome}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* Grouped bar chart, hand-built SVG.
   Two series (Session 1 / Session 2), validated palette, 2px surface gaps,
   rounded data-ends, hover tooltips, legend + selective direct labels. */
function MemoryChart() {
  const [tip, setTip] = useState(null);
  const [ref, inView] = useInView(0.3);

  const W = 720;
  const H = 320;
  const M = { top: 16, right: 24, bottom: 44, left: 56 };
  const plotW = W - M.left - M.right;
  const plotH = H - M.top - M.bottom;
  const max = 4000;
  const groups = MEMORY_FILES.length;
  const groupW = plotW / groups;
  const barW = Math.min(42, groupW / 3);
  const y = (v) => plotH - (v / max) * plotH;
  const ticks = [0, 1000, 2000, 3000, 4000];

  return (
    <section>
      <Reveal>
        <h2>The memory store grew — by updating, not appending</h2>
        <p className="section-sub">
          Four files seeded in session 1. Session 2 rewrote every one of them in place, with
          effective dates — exactly the hygiene an enterprise memory needs.
        </p>
      </Reveal>
      <Reveal>
        <div className="chart-card" ref={ref}>
          <div className="chart-legend">
            <span>
              <span className="dot s1" /> Session 1
            </span>
            <span>
              <span className="dot s2" /> Session 2
            </span>
            <span className="legend-unit">characters per memory file</span>
          </div>
          <div className="chart-wrap">
            <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Memory file sizes after session 1 and session 2">
              <g transform={`translate(${M.left},${M.top})`}>
                {ticks.map((t) => (
                  <g key={t}>
                    <line x1={0} x2={plotW} y1={y(t)} y2={y(t)} className="gridline" />
                    <text x={-10} y={y(t)} className="tick-label" textAnchor="end" dominantBaseline="middle">
                      {t === 0 ? "0" : `${t / 1000}k`}
                    </text>
                  </g>
                ))}
                {MEMORY_FILES.map((f, i) => {
                  const cx = i * groupW + groupW / 2;
                  const bars = [
                    { key: "s1", v: f.s1, x: cx - barW - 1 },
                    { key: "s2", v: f.s2, x: cx + 1 },
                  ];
                  return (
                    <g key={f.file}>
                      {bars.map((b) => (
                        <g key={b.key}>
                          <rect
                            className={`bar ${b.key} ${inView ? "grow" : ""}`}
                            x={b.x}
                            width={barW}
                            y={y(b.v)}
                            height={Math.max(plotH - y(b.v), 0)}
                            rx={4}
                            style={{ transformOrigin: `${b.x + barW / 2}px ${plotH}px` }}
                          />
                          <rect
                            className={`bar ${b.key} ${inView ? "grow" : ""}`}
                            x={b.x}
                            width={barW}
                            y={plotH - 4}
                            height={4}
                            style={{ transformOrigin: `${b.x + barW / 2}px ${plotH}px` }}
                          />
                          <rect
                            className="bar-hit"
                            x={b.x - 4}
                            width={barW + 8}
                            y={0}
                            height={plotH}
                            onMouseEnter={() =>
                              setTip({
                                x: b.x + barW / 2 + M.left,
                                y: y(b.v) + M.top,
                                file: f.file,
                                session: b.key === "s1" ? "Session 1" : "Session 2",
                                v: b.v,
                                note: b.key === "s2" ? f.note : null,
                              })
                            }
                            onMouseLeave={() => setTip(null)}
                          />
                        </g>
                      ))}
                      <text x={cx + 1 + barW / 2} y={y(f.s2) - 8} className="bar-label" textAnchor="middle">
                        {f.s2.toLocaleString()}
                      </text>
                      <text x={cx} y={plotH + 20} className="axis-label" textAnchor="middle">
                        {f.file.replace(".md", "")}
                      </text>
                    </g>
                  );
                })}
                <line x1={0} x2={plotW} y1={plotH} y2={plotH} className="baseline" />
              </g>
            </svg>
            {tip && (
              <div
                className="tooltip"
                style={{ left: `${(tip.x / W) * 100}%`, top: `${(tip.y / H) * 100}%` }}
              >
                <strong>{tip.file}</strong>
                <span>
                  {tip.session}: {tip.v.toLocaleString()} chars
                </span>
                {tip.note && <em>{tip.note}</em>}
              </div>
            )}
          </div>
          <details className="table-view">
            <summary>View as table</summary>
            <table>
              <thead>
                <tr>
                  <th>Memory file</th>
                  <th>Session 1 (chars)</th>
                  <th>Session 2 (chars)</th>
                  <th>Session 2 header note</th>
                </tr>
              </thead>
              <tbody>
                {MEMORY_FILES.map((f) => (
                  <tr key={f.file}>
                    <td>{f.file}</td>
                    <td>{f.s1.toLocaleString()}</td>
                    <td>{f.s2.toLocaleString()}</td>
                    <td>{f.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </div>
      </Reveal>
    </section>
  );
}

/* Stretch S8 — the audit trail: version history + a real diff. */
function AuditTrail() {
  return (
    <section>
      <Reveal>
        <div className="stretch-badge">Stretch goal S8 · Tier 4</div>
        <h2>Every change is auditable</h2>
        <p className="section-sub">
          “What does my agent remember — and who changed it?” is the first question every security
          team asks. The memory store keeps an immutable version record per mutation.{" "}
          <code>memory_diff.py</code> replays it as a diff.
        </p>
      </Reveal>
      <Reveal>
        <div className="audit-grid">
          <div className="version-card">
            <h3>Version history — from the API, not a snapshot</h3>
            <ul className="version-list">
              {VERSION_HISTORY.map((v) => (
                <li key={v.file}>
                  <strong>{v.file}</strong>
                  <span>
                    <span className="op created">CREATED</span> {v.created}
                  </span>
                  <span>
                    <span className="op modified">MODIFIED</span> {v.modified}
                  </span>
                </li>
              ))}
            </ul>
            <p className="version-note">
              Each record is immutable and attributed to the session that wrote it. Redaction and
              rollback are API calls, not archaeology.
            </p>
          </div>
          <div className="diff-card">
            <div className="diff-header">
              <span className="diff-file">{DIFF_META.file}</span>
              <span className="diff-range">
                {DIFF_META.from} → {DIFF_META.to}
              </span>
            </div>
            <pre className="diff-body">
              {DIFF_LINES.map((l, i) =>
                l.t === "gap" ? (
                  <span key={i} className="diff-line ctx">
                    {"\n"}
                  </span>
                ) : (
                  <span key={i} className={`diff-line ${l.t}`}>
                    {l.t === "add" ? "+ " : l.t === "del" ? "- " : "  "}
                    {l.text}
                    {"\n"}
                  </span>
                )
              )}
            </pre>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* Stretch S4 — session 3: the memory talks back. */
function MemoryTalksBack() {
  return (
    <section>
      <Reveal>
        <div className="stretch-badge">Stretch goal S4 · Tier 2</div>
        <h2>Session 3: the memory talks back</h2>
        <p className="section-sub">
          No documents this time. One question — “what have you learned?” — answered entirely from
          memory. The agent reconstructed the whole pursuit, including how it changed over time.
        </p>
      </Reveal>
      <Reveal>
        <div className="s3-card">
          <h3>“How strategy changed between sessions” — produced by the agent, from memory alone</h3>
          <div className="s3-table-wrap">
            <table className="s3-table">
              <thead>
                <tr>
                  <th>Dimension</th>
                  <th>
                    <span className="dot s1" /> Session 1
                  </th>
                  <th>
                    <span className="dot s2" /> Session 2
                  </th>
                </tr>
              </thead>
              <tbody>
                {SESSION3_TABLE.map((r) => (
                  <tr key={r.dim}>
                    <td>{r.dim}</td>
                    <td>{r.s1}</td>
                    <td>{r.s2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
      <div className="synthesis-grid">
        {SESSION3_SYNTHESIS.map((s, i) => (
          <Reveal key={i} delay={i * 90}>
            <article className="synthesis-card">
              <div className="spark" aria-hidden="true">
                ✦
              </div>
              <p>{s}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="synthesis-note">
          This is synthesis, not recall — conclusions no single document contains. That's the
          difference between a document store and institutional memory.
        </p>
      </Reveal>
    </section>
  );
}

function Criteria() {
  return (
    <section>
      <Reveal>
        <h2>Every success criterion, hit</h2>
        <p className="section-sub">
          The scenario card defined what a “sharper answer” must contain. Six for six — each with a
          receipt from the actual session-2 output.
        </p>
      </Reveal>
      <div className="criteria-grid">
        {CRITERIA.map((c, i) => (
          <Reveal key={c.text} delay={i * 80}>
            <article className="criterion">
              <div className="check" aria-hidden="true">
                ✓
              </div>
              <div>
                <p>{c.text}</p>
                <blockquote>“{c.quote}”</blockquote>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div className="stretch-row">
          {STRETCH.map((s) => (
            <div key={s.name} className="stretch-card">
              <span className="stretch-tier">{s.tier}</span>
              <strong>{s.name}</strong>
              <span>{s.detail}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <Reveal>
        <h2>Built in an afternoon. No infrastructure.</h2>
        <div className="stack-row">
          {STACK.map((s) => (
            <div key={s.name} className="stack-card">
              <strong>{s.name}</strong>
              <span>{s.detail}</span>
            </div>
          ))}
        </div>
        <p className="footer-note">
          Reproduce it: <code>create_agent.py</code> → <code>run_session_1.py</code> →{" "}
          <code>run_session_2.py</code> → <code>run_session_3.py</code> →{" "}
          <code>memory_diff.py</code> → <code>inspect_memory.py</code>
        </p>
      </Reveal>
    </footer>
  );
}

export default function App() {
  return (
    <main>
      <Hero />
      <Scenario />
      <DealStory />
      <Experiment />
      <Comparison />
      <DealImpact />
      <MemoryChart />
      <AuditTrail />
      <MemoryTalksBack />
      <Criteria />
      <Footer />
    </main>
  );
}
