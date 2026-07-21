// Real results from the end-to-end run on 2026-07-21 (sessions 1–3 + memory audit).
// All customer data is synthetic — Gloucester Air and every named person are fictional.

export const QUESTION =
  "Tomorrow's call is the final pitch to Gloucester Air. What's our strategy? " +
  "Be specific: who we're pitching to, the sequence, the objections we must handle, and what to avoid.";

export const HERO_STATS = [
  { value: 3, label: "sessions, one agent, one memory", suffix: "" },
  { value: 3, label: "deal-killing errors caught before the pitch", suffix: "" },
  { value: 1, label: "blocker turned into an ally", suffix: "" },
  { value: 8, label: "immutable audit records of what changed", suffix: "" },
];

// The side-by-side: how the same question got a sharper answer.
export const COMPARISON = [
  {
    dimension: "Opening move",
    s1: "Straight into the battle plan — single-pane-of-glass demo first.",
    s2: "“⚠️ What Changed Since Our Last Session — Read This First” — names three things in the old strategy that would have killed the deal.",
    why: "The agent led with the contradiction instead of papering over it.",
  },
  {
    dimension: "Who to pitch",
    s1: "Route everything through champion Priya Nair; Fiona Aldridge (CIO) signs the cheque.",
    s2: "Marcus Webb (new Group CTO) owns the decision; CFO Selina Okafor in every meeting. “Any mention of Priya Nair — she's gone and you will look out of touch.”",
    why: "Stale stakeholder intel is the classic way to lose a deal. Memory caught it.",
  },
  {
    dimension: "Pitch sequence",
    s1: "1. Single-pane demo → 2. Ticket automation → 3. Predictive insight → 4. Heritage → 5. October pilot.",
    s2: "1. July 5th meltdown reconstruction (“show me that weekend not happening”) → 2. Governance first → 3. Phased plan on the failed systems, September start.",
    why: "“'Single pane of glass' — Marcus called this out by name. Do not use it.”",
  },
  {
    dimension: "Compliance objection",
    s1: "Known gap: “do not re-raise autonomy with Douglas until the evidence pack exists.”",
    s2: "Closed with the July release: Agent Action Ledger as CAA evidence pack, ROSTA pinned propose-only. Douglas reframed as an ally — his own words used back at him.",
    why: "New product intel resolved a blocker the agent had remembered as open.",
  },
  {
    dimension: "Pricing posture",
    s1: "“Keep pricing out of the room until the business case is done.”",
    s2: "Raise Meridian preemptively. Reframe to 3-year TCO. “A vote for Meridian is a vote to keep the vendor that just cost them £11m.”",
    why: "A competitor in the room flipped the guidance — the agent reversed it, with reasons.",
  },
  {
    dimension: "Timeline",
    s1: "Final pitch mid-August, pilot October–December, decision by end of September.",
    s2: "Decision wanted by ~July 30. Phase 1 on ROSTA + Nagios starting September. The old timeline is explicitly declared dead.",
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
      "The pitch now opens with a reconstruction of July 5th not happening — his exact words, remembered and acted on.",
  },
  {
    title: "The blocker becomes our witness",
    risk: "Treating Douglas Petty as the compliance blocker he was in June.",
    outcome:
      "Memory tracked his inversion after the meltdown. We now close his objection with his own line: “a black box restarting ROSTA is exactly what we're designed to prevent.”",
  },
  {
    title: "The competitor's trap is defused",
    risk: "Being ambushed by Meridian's “30% cheaper, 6 weeks, full autonomy” claims.",
    outcome:
      "The agent merged competitive intel into the strategy: raise Meridian ourselves, reframe to 3-year TCO, and name it what it is — Calder's self-defence play.",
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

// Memory store: bytes per file after each session (real figures from inspect_memory.py).
export const MEMORY_FILES = [
  { file: "pitch-strategy.md", s1: 1577, s2: 3548, note: "MAJOR REVISION. Old strategy is DEAD." },
  { file: "objections-and-counters.md", s1: 1579, s2: 3284, note: "O1 re-rated HIGH → MEDIUM; Meridian counters added." },
  { file: "stakeholders.md", s1: 1169, s2: 2324, note: "Priya marked departed; Marcus Webb + Selina Okafor added." },
  { file: "customer-environment.md", s1: 1131, s2: 1802, note: "July 5th incident details added." },
];

// S8 — real excerpt from memory_diff.py (stakeholders.md, v1 → head).
export const DIFF_META = {
  file: "/stakeholders.md",
  from: "v1 · Session 1 · 13:36:03",
  to: "head · Session 2 · 13:38:56",
};

export const DIFF_LINES = [
  { t: "ctx", text: "# Stakeholders — Gloucester Air / DXC OASIS" },
  { t: "del", text: "*(Last updated: Session 1 — seeded from pursuit docs dated 2026-06-12)*" },
  { t: "add", text: "*(Last updated: Session 2 — call notes 2026-07-16. MAJOR CHANGES — supersedes Session 1)*" },
  { t: "gap", text: "" },
  { t: "del", text: "## Priya Nair — Head of IT Operations" },
  { t: "del", text: "- **Our champion.** Route everything through her." },
  { t: "add", text: "## ⚠️ PRIYA NAIR — GONE. DO NOT ROUTE THROUGH HER." },
  { t: "add", text: "- Resigned 2026-07-01. Now at a logistics firm." },
  { t: "gap", text: "" },
  { t: "add", text: "## Marcus Webb — Group CTO (NEW — Decision Owner as of 2026-07-16)" },
  { t: "add", text: "- **He owns this decision.** Fiona Aldridge now reports to him." },
  { t: "add", text: "- His framing: “Show me the weekend of July 5th not happening.”" },
  { t: "add", text: "- Do NOT lead with single-pane-of-glass. He has explicitly rejected that framing." },
  { t: "gap", text: "" },
  { t: "add", text: "## Selina Okafor — CFO (NEW — in every vendor meeting)" },
  { t: "add", text: "- Verbatim ask: “Show me exactly what this saves and when. I want it traceable.”" },
];

// S8 — real version history from the Memory Stores API.
export const VERSION_HISTORY = [
  { file: "stakeholders.md", created: "13:36:03 · Session 1", modified: "13:38:56 · Session 2" },
  { file: "objections-and-counters.md", created: "13:36:12 · Session 1", modified: "13:39:21 · Session 2" },
  { file: "customer-environment.md", created: "13:36:22 · Session 1", modified: "13:40:05 · Session 2" },
  { file: "pitch-strategy.md", created: "13:36:33 · Session 1", modified: "13:39:47 · Session 2" },
];

// S4 — session 3: memory only, no documents. Real excerpts from outputs/session3.txt.
export const SESSION3_TABLE = [
  { dim: "Lead hook", s1: "Ticket automation, single-pane-of-glass", s2: "Resilience — “July 5th not happening”" },
  { dim: "Decision owner", s1: "Fiona Aldridge + champion Priya Nair", s2: "Marcus Webb (new CTO, board-appointed)" },
  { dim: "Champion", s1: "Priya Nair", s2: "None — must be rebuilt" },
  { dim: "Douglas Petty", s1: "Biggest blocker (autonomy/compliance)", s2: "Ally — use his language" },
  { dim: "Competition", s1: "Not flagged", s2: "Meridian AIOps, Calder-backed" },
];

export const SESSION3_SYNTHESIS = [
  "“No internal champion — must be rebuilt.” Neither document says this; the agent derived it.",
  "“Priya's business case work is orphaned. Must be rebuilt and presented fresh to Marcus and Selina.”",
  "An outstanding-actions list: rebuild the ROI model, clear the EuroCargo reference, prep the Meridian 3-year TCO comparison.",
];

export const TIMELINE = [
  {
    step: "01",
    title: "Provision",
    body: "One Managed Agent, one cloud environment, one persistent memory store mounted at /mnt/memory/. No infrastructure.",
    session: null,
  },
  {
    step: "02",
    title: "Session 1 — baseline",
    body: "Agent reads the pursuit docs, answers the pitch question, and seeds four memory files: stakeholders, objections, environment, strategy — each dated.",
    session: 1,
  },
  {
    step: "03",
    title: "New intel lands",
    body: "A fresh session gets round-2 docs: an £11m IT meltdown, a departed champion, a new CTO, a competitor in the room, and a DXC product release.",
    session: 2,
  },
  {
    step: "04",
    title: "Reconcile, don't append",
    body: "“The new documents contradict several critical items in memory.” The agent updates all four files in place, with effective dates, before answering.",
    session: 2,
  },
  {
    step: "05",
    title: "A visibly sharper answer",
    body: "Same question. The answer now leads with what changed, pitches the right people, reverses the sequence, and counters the competitor head-on.",
    session: 2,
  },
  {
    step: "06",
    title: "The memory talks back",
    body: "A third session with no documents at all. From memory alone, the agent reconstructs the whole pursuit — including what changed, when, and what's still to do.",
    session: 3,
  },
];

export const CRITERIA = [
  { text: "Leads with what changed: the meltdown, the timeline, the new decision-maker", quote: "Three things in our previous strategy would have killed this deal" },
  { text: "Drops the departed champion — pitches Marcus Webb, answers the CFO", quote: "Any mention of Priya Nair — she's gone and you will look out of touch" },
  { text: "Reverses the pitch sequence: resilience first, single-pane demo retired", quote: "Show me the weekend of July 5th not happening" },
  { text: "Counters Meridian's 30%-cheaper claim with 3-year total cost", quote: "Meridian is Calder's self-defence play" },
  { text: "Closes the compliance objection with the Agent Action Ledger", quote: "A black box restarting ROSTA is exactly what we're designed to prevent" },
  { text: "Memory updated in place with effective dates — not appended", quote: "MAJOR REVISION. Old strategy is DEAD." },
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
