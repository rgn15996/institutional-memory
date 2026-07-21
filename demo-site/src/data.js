// Real results from the fresh end-to-end run on 2026-07-21 (~14:45–14:55 UTC): sessions 1–3 + memory audit.
// All customer data is synthetic — Gloucester Air and every named person are fictional.

export const QUESTION =
  "Tomorrow's call is the final pitch to Gloucester Air. What's our strategy? " +
  "Be specific: who we're pitching to, the sequence, the objections we must handle, and what to avoid.";

// The setup — what the audience needs before anything else makes sense.
export const SCENARIO_CARDS = [
  {
    kicker: "What we're selling",
    title: "DXC OASIS",
    body:
      "DXC's agentic IT-operations platform. It sits above a customer's existing tools as a unifying layer, puts AI agents on routine ops work with humans in command, and makes ROI traceable.",
  },
  {
    kicker: "Who we're selling to",
    title: "Gloucester Air (fictional)",
    body:
      "A UK regional carrier: 62 aircraft, ~11m passengers/year, an IT estate fragmented by acquisitions, and a 24/7 NOC outsourced to an underperforming provider. The prize: a £6–8m, 3-year deal.",
  },
  {
    kicker: "The problem we built for",
    title: "Pursuit intel goes stale",
    body:
      "Stakeholders move, competitors appear, products ship. Deal knowledge lives in decks, inboxes and people's heads — so teams walk into pitches confidently wrong. That's how deals are lost.",
  },
];

export const WHAT_WE_BUILT =
  "So we built the pursuit team an AI teammate with institutional memory. It reads the deal documents, keeps its own deal wiki in a persistent memory store, reconciles contradictions when the intel changes — and answers one question on demand: “What's our strategy?” Every conversation with it is brand new. The only thing that carries over is what it chose to remember.";

// The in-world story: what happened at Gloucester Air (all fictional, all in the docs we fed the agent).
export const DEAL_EVENTS = [
  {
    date: "12 Jun",
    title: "Pursuit strategy set",
    body: "Champion: Priya Nair, Head of IT Ops. Plan: pitch in August, pilot in October. Keep pricing out of the room.",
    turn: false,
  },
  {
    date: "1 Jul",
    title: "Our champion resigns",
    body: "Priya Nair leaves Gloucester Air. The business case she owned is orphaned.",
    turn: true,
  },
  {
    date: "4–6 Jul",
    title: "The meltdown",
    body: "A monitoring blind spot lets a crew-system fault cascade: 312 cancelled flights, ~£11m, front-page news. The board orders a resilience programme — budget released now.",
    turn: true,
  },
  {
    date: "16 Jul",
    title: "Everything changes on one call",
    body: "Marcus Webb, a new board-appointed Group CTO, now owns the decision. The CFO joins every meeting. And a competitor — Meridian AIOps, backed by the incumbent — is in the room.",
    turn: true,
  },
  {
    date: "18 Jul",
    title: "DXC ships an update",
    body: "The OASIS July release lands: a signed audit ledger for agent actions, tiered autonomy, and a CFO-ready ROI dashboard — closing our biggest open objection.",
    turn: false,
  },
  {
    date: "22 Jul",
    title: "The final pitch",
    body: "Tomorrow. Decision expected within days. The question is whether our strategy reflects June's world — or July's.",
    turn: false,
  },
];

// The experiment: three conversations with the agent, mapped onto that story.
export const SESSIONS = [
  {
    n: 1,
    when: "Knows only the June world",
    gave: "The original pursuit pack: account overview, objections log, pitch strategy.",
    did: "Answered the strategy question and seeded its deal wiki — three dated memory files: stakeholders, objections & counters, deal facts & strategy.",
    answer: "A solid June plan: Priya validates claims in the room, open with the unified-view demo, pilot October–December.",
  },
  {
    n: 2,
    when: "The July intel lands",
    gave: "A brand-new conversation, same memory. We handed it the 16 Jul call notes and the 18 Jul product update — which contradict what it remembers.",
    did: "“Several things in memory are dangerously stale.” It rewrote all three memory files in place, then rebuilt the strategy.",
    answer: "“⚠️ What changed since last session — read this first: three things in our prior strategy would have actively hurt you tomorrow.”",
  },
  {
    n: 3,
    when: "The recall test",
    gave: "No documents at all. One question: “What have you learned?”",
    did: "Read its own memory and reconstructed the entire pursuit — original strategy vs revised, open items, risks — from memory alone.",
    answer: "“The July 5th meltdown transformed this from a visibility/automation pitch into an operational resilience emergency.”",
  },
];

export const HERO_STATS = [
  { value: 3, label: "sessions, one agent, one memory", suffix: "" },
  { value: 3, label: "deal-killing errors caught before the pitch", suffix: "" },
  { value: 1, label: "blocker turned into an ally", suffix: "" },
  { value: 6, label: "immutable audit records of what changed", suffix: "" },
];

// The side-by-side: how the same question got a sharper answer.
export const COMPARISON = [
  {
    dimension: "Opening move",
    s1: "Lead with the unified-view demo across ServiceNow, Dynatrace, Nagios and SITA — “don't describe it, show it.”",
    s2: "“⚠️ What changed since last session — read this first: three things in our prior strategy would have actively hurt you tomorrow.”",
    why: "The agent led with the contradiction instead of papering over it.",
  },
  {
    dimension: "Who to pitch",
    s1: "“Priya is your internal anchor — let her validate claims in real time. Fiona writes the cheque.”",
    s2: "Marcus Webb (Group CTO) owns the decision; Selina Okafor (CFO) holds the financial veto. “Priya Nair is gone. Memory said 'route everything through her.' Don't mention her name.”",
    why: "Stale stakeholder intel is the classic way to lose a deal. Memory caught it.",
  },
  {
    dimension: "Pitch sequence",
    s1: "1. Unified-view demo → 2. Ticket automation → 3. Predictive insight → 4. October–December pilot on ground-ops.",
    s2: "1. Walk the exact July 5th failure chain — Nagios → ROSTA → Sabre → SITA → 312 cancellations — then show OASIS catching it at hour zero. Governance second. September start on the failed systems.",
    why: "“Marcus Webb explicitly said 'don't show me a single pane of glass' — that was going to be our opening.”",
  },
  {
    dimension: "Compliance objection",
    s1: "Known gap: Douglas asked for per-action audit evidence. “Do NOT overclaim autonomy with him until the pack is ready.”",
    s2: "“The O2 audit evidence gap is now closed. The Agent Action Ledger resolves it — this is now a competitive strength, not a wound to hide.”",
    why: "New product intel turned a remembered blocker into a selling point.",
  },
  {
    dimension: "Pricing posture",
    s1: "“Don't fight on price per seat — you'll lose.” Hold pricing until the business case with Priya's team lands (end of July).",
    s2: "Counter Meridian head-on: “Meridian prices software only; Calder's managed service sits on top. Total cost of operation lands higher by year 2. Reframe to 3-year TCO.”",
    why: "A competitor in the room flipped the guidance — the agent rewrote it, with reasons.",
  },
  {
    dimension: "Timeline",
    s1: "Pilot October–December; the Calder displacement decision waits for March 2027 “with a quarter of evidence in hand.”",
    s2: "“Marcus said 'within two weeks.' Match that energy.” Phased deployment starting September on the systems that failed.",
    why: "The board's resilience programme collapsed the timeline; the agent re-planned around it.",
  },
];

// What each memory behaviour is worth in the room. This is the deal narrative.
export const DEAL_IMPACT = [
  {
    title: "We don't pitch a ghost",
    risk: "Walking in citing Priya Nair — who resigned three weeks ago — as our champion.",
    outcome:
      "Memory flagged her departure as a contradiction, rewrote the stakeholder map, and redirected the pitch to Marcus Webb. Credibility intact.",
  },
  {
    title: "We open with what the CTO asked for",
    risk: "Leading with the single-pane-of-glass demo Marcus Webb rejected by name.",
    outcome:
      "The pitch now opens by walking the July 5th failure chain and showing OASIS catching it at hour zero — his framing, remembered and acted on.",
  },
  {
    title: "The blocker becomes our witness",
    risk: "Treating Douglas Petty as the compliance blocker he was in June.",
    outcome:
      "Memory tracked his inversion after the meltdown. We close his objection with tiered autonomy and the Action Ledger — echoing his own words: “the last thing I want is a black box restarting ROSTA.”",
  },
  {
    title: "The competitor's trap is defused",
    risk: "Being ambushed by Meridian's “30% cheaper, 6 weeks, full autonomy” claims.",
    outcome:
      "The agent merged competitive intel into the strategy: raise Meridian ourselves and reframe to 3-year TCO — they price the software only; the incumbent's managed service sits on top.",
  },
  {
    title: "The CFO's question has an answer",
    risk: "Vague efficiency claims with Selina Okafor in the room.",
    outcome:
      "Her verbatim ask (“show me exactly what this saves and when”) is mapped to the ROI Ledger and the EuroCargo reference — quarterly, auditable, CFO-signed.",
  },
  {
    title: "Nothing stale, everything auditable",
    risk: "A memory system nobody can inspect — the first thing security teams reject.",
    outcome:
      "Every update is in place, dated, and backed by an immutable version record attributing the change to the session that made it.",
  },
];

// Memory store: bytes per file after each session (real figures from inspect_memory.py, fresh run).
export const MEMORY_FILES = [
  { file: "deal-facts-and-strategy.md", s1: 2410, s2: 4838, note: "Strategy rewritten: resilience lead, September start, timeline collapsed." },
  { file: "objections-and-counters.md", s1: 1928, s2: 3991, note: "O2 closed by the Agent Action Ledger; Meridian counters added." },
  { file: "stakeholders.md", s1: 1614, s2: 2867, note: "Priya marked DEPARTED; Marcus Webb ⭐ decision owner added." },
];

// S8 — real excerpt from memory_diff.py (stakeholders.md, v1 → head, fresh run).
export const DIFF_META = {
  file: "/stakeholders.md",
  from: "v1 · Session 1 · 14:47:00",
  to: "head · Session 2 · 14:48:57",
};

export const DIFF_LINES = [
  { t: "ctx", text: "# Stakeholders — Gloucester Air / DXC OASIS Pursuit" },
  { t: "del", text: "*First recorded: 2026-07-21. Source: pursuit documents dated 2026-06-12.*" },
  { t: "add", text: "*Last updated: 2026-07-21 (reconciled against call-notes-2026-07-16.md).*" },
  { t: "gap", text: "" },
  { t: "del", text: "## Priya Nair — Head of IT Operations" },
  { t: "del", text: "- **Role in deal:** Our champion. Route everything through her." },
  { t: "add", text: "## ⚠️ DEPARTED — Priya Nair (former Head of IT Operations)" },
  { t: "add", text: "- **Status: LEFT the company 2026-07-01. Do NOT contact or route through her.**" },
  { t: "gap", text: "" },
  { t: "add", text: "## Marcus Webb — Group CTO ⭐ DECISION OWNER" },
  { t: "add", text: "- **Appointed:** Post-July-5th meltdown by the board." },
  { t: "add", text: "- **Role in deal:** He now OWNS this decision." },
];

// S8 — real version history from the Memory Stores API (fresh run).
export const VERSION_HISTORY = [
  { file: "stakeholders.md", created: "14:47:00 · Session 1", modified: "14:48:57 · Session 2" },
  { file: "objections-and-counters.md", created: "14:47:13 · Session 1", modified: "14:49:59 · Session 2" },
  { file: "deal-facts-and-strategy.md", created: "14:47:31 · Session 1", modified: "14:49:33 · Session 2" },
];

// S4 — session 3's own "how strategy changed" summary, condensed from outputs/session3.txt.
// Column headings are the agent's own: "Original strategy (now dead)" vs "Revised strategy".
export const SESSION3_TABLE = [
  { dim: "Opening", s1: "Lead with single-pane-of-glass demo", s2: "Forbidden — lead with “July 5th not happening”" },
  { dim: "Routing", s1: "Route everything through Priya Nair", s2: "Priya departed; Marcus Webb owns the decision" },
  { dim: "ROI ownership", s1: "Fiona as key influencer on the business case", s2: "Selina Okafor owns the ROI requirement directly" },
  { dim: "Timeline", s1: "Pilot in October; decision March 2027", s2: "Decision within 2 weeks; deployment September" },
];

export const SESSION3_SYNTHESIS = [
  {
    label: "Synthesis at recall time (session 3)",
    text: "“The July 5th meltdown transformed this from a visibility/automation pitch into an operational resilience emergency.” This one-sentence framing of the whole pursuit appears nowhere in the documents or the memory files — session 3 produced it from what it remembered.",
  },
  {
    label: "A risk it raised itself (session 2 → 3)",
    text: "“Confirm September deployment is achievable — do not overpromise before internal delivery sign-off.” No document raises this. The agent inferred the risk from the collapsed timeline, left itself a note, and session 3 surfaced it as the top open item.",
  },
  {
    label: "Judgment updated, not just facts (session 2 → 3)",
    text: "“Priya's business case — moot. Selina now owns the ROI requirement directly.” The agent didn't just record a resignation; it retired the dependent workstream and reassigned the requirement.",
  },
];

export const CRITERIA = [
  { text: "Leads with what changed: the meltdown, the timeline, the new decision-maker", quote: "Three things in our prior strategy would have actively hurt you tomorrow" },
  { text: "Drops the departed champion — pitches Marcus Webb, answers the CFO", quote: "Priya Nair is gone. Memory said 'route everything through her.' Don't mention her name." },
  { text: "Reverses the pitch sequence: resilience first, single-pane demo retired", quote: "Marcus Webb explicitly said 'don't show me a single pane of glass' — that was going to be our opening" },
  { text: "Counters Meridian's 30%-cheaper claim with 3-year total cost", quote: "Meridian prices software only; Calder's managed service sits on top. Reframe to 3-year TCO." },
  { text: "Closes the compliance objection with the Agent Action Ledger", quote: "This is now a competitive strength, not a wound to hide" },
  { text: "Memory updated in place with effective dates — not appended", quote: "Several things in memory are dangerously stale. Let me update all three files before answering." },
];

export const STRETCH = [
  { tier: "Tier 1", name: "S1 — Explicit memory policy", detail: "The system prompt defines always-remember categories and a never-memorise list." },
  { tier: "Tier 2", name: "S4 — “What have you learned?”", detail: "A document-free session answered entirely from memory — with cross-session change tracking." },
  { tier: "Tier 4", name: "S8 — Memory diff view", detail: "memory_diff.py replays the store's immutable version history as per-file, session-attributed diffs." },
];

export const STACK = [
  { name: "Claude Managed Agents", detail: "Anthropic runs the agent loop + per-session container" },
  { name: "Memory Stores", detail: "Persistent, versioned, inspectable cross-session memory" },
  { name: "claude-sonnet-4-6", detail: "Agent model with full agent toolset" },
  { name: "DXC OASIS", detail: "The agentic operations platform being pitched" },
];
