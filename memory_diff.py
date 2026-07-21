"""
Stretch goal S8 — the "memory diff" view.

Every mutation to a memory store produces an immutable version record
(created / modified / deleted) — a built-in audit trail. This script walks
that history and prints, per memory file:

  - who/what wrote each version (session actor), and when
  - a unified diff from the FIRST version (session 1 seed) to the CURRENT
    head — i.e. exactly what the agent changed when new intel contradicted
    old memory

This is the enterprise answer to "what does my agent remember, and can I
audit how that changed?"

Usage:
    python memory_diff.py            # summary + per-file diffs
    python memory_diff.py --stat     # summary only (no diff bodies)
"""

import difflib
import os
import sys
from collections import defaultdict
from pathlib import Path

from anthropic import Anthropic
from dotenv import load_dotenv

load_dotenv()

GREEN = "\033[32m"
RED = "\033[31m"
CYAN = "\033[36m"
DIM = "\033[2m"
BOLD = "\033[1m"
RESET = "\033[0m"


def color(s: str, c: str) -> str:
    return f"{c}{s}{RESET}" if sys.stdout.isatty() else s


def main() -> None:
    if not os.environ.get("ANTHROPIC_API_KEY"):
        raise SystemExit("Set ANTHROPIC_API_KEY before running.")

    store_id_path = Path(".memory_store_id")
    if not store_id_path.exists():
        raise SystemExit("Missing .memory_store_id. Run create_agent.py first.")
    store_id = store_id_path.read_text().strip()

    stat_only = "--stat" in sys.argv

    client = Anthropic()

    # Collect the full version history (newest-first from the API).
    versions = list(client.beta.memory_stores.memory_versions.list(store_id))
    by_memory: dict[str, list] = defaultdict(list)
    for v in versions:
        by_memory[v.memory_id].append(v)
    for vs in by_memory.values():
        vs.sort(key=lambda v: v.created_at)  # oldest → newest

    print(f"{color('Memory store', BOLD)}: {store_id}")
    print(f"{len(versions)} versions across {len(by_memory)} memories\n" + "=" * 64)

    for memory_id, vs in sorted(by_memory.items(), key=lambda kv: kv[1][0].path or ""):
        first, last = vs[0], vs[-1]
        path = last.path or first.path or memory_id

        print(f"\n{color(path, BOLD)}")
        for v in vs:
            actor = getattr(v.created_by, "type", "?")
            sess = getattr(v.created_by, "session_id", None)
            who = f"{actor}" + (f" ({sess})" if sess else "")
            print(
                f"  {color(v.operation.upper().ljust(8), CYAN)} "
                f"{v.created_at}  {color(who, DIM)}"
            )

        if len(vs) < 2 or stat_only:
            if len(vs) < 2:
                print(color("  (single version — created and not yet revised)", DIM))
            continue

        old = client.beta.memory_stores.memory_versions.retrieve(
            first.id, memory_store_id=store_id
        ).content or ""
        new = client.beta.memory_stores.memory_versions.retrieve(
            last.id, memory_store_id=store_id
        ).content or ""

        added = removed = 0
        diff_lines = list(
            difflib.unified_diff(
                old.splitlines(),
                new.splitlines(),
                fromfile=f"{path} @ {first.created_at} (v1)",
                tofile=f"{path} @ {last.created_at} (head)",
                lineterm="",
            )
        )
        print()
        for line in diff_lines:
            if line.startswith("+") and not line.startswith("+++"):
                added += 1
                print(color(f"  {line}", GREEN))
            elif line.startswith("-") and not line.startswith("---"):
                removed += 1
                print(color(f"  {line}", RED))
            elif line.startswith("@@"):
                print(color(f"  {line}", CYAN))
            else:
                print(f"  {line}")
        print(color(f"\n  {added} lines added, {removed} lines removed", DIM))

    print("\n" + "=" * 64)
    print("Every change above is an immutable, attributable version record —")
    print("the audit trail privacy and security teams ask for.")


if __name__ == "__main__":
    main()
