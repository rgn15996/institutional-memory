# DXC OASIS × Gloucester Air — Institutional Memory Agent demo page

A local React page presenting our hackathon results: an agent with persistent
memory supporting a (fictional) DXC OASIS sales pursuit. All figures and
quotes are real output from the end-to-end run on 2026-07-21.

## Quickest way to view (no install)

A prebuilt copy is included in `dist/`. Serve it with anything static —
opening `index.html` directly from the file system won't work (browsers
block module scripts on `file://`):

```bash
cd dist
python3 -m http.server 8000
# then open http://localhost:8000
```

or, if you have Node:

```bash
npx serve dist
```

## Run from source (for editing)

Requires Node 18+:

```bash
npm install
npm run dev        # dev server with hot reload
npm run build      # rebuild dist/
```

## Where the numbers come from

Everything on the page traces to the repo one level up:

- `outputs/session1.txt`, `session2.txt`, `session3.txt` — the agent's answers
- `python inspect_memory.py` — memory file sizes
- `python memory_diff.py` — the version history and the stakeholders diff
- Page data lives in `src/data.js` if you need to re-source it after a new run

All customer data is synthetic — Gloucester Air and every named person are fictional.
