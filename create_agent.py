"""
Provision the three things this track needs:
  1. A Managed Agent with the full agent toolset
  2. A cloud Environment (the container the agent runs in)
  3. A Memory Store that survives across sessions

The memory store mounts at /mnt/memory/ inside the session container. The agent
reads and writes it with normal file tools. It persists across sessions —
that's the whole point of this track.

IDs are saved to .agent_id, .environment_id, .memory_store_id so the
run_session_* scripts can pick them up.

Usage:
    export ANTHROPIC_API_KEY="sk-ant-..."
    python create_agent.py
"""

import os
from pathlib import Path

from anthropic import Anthropic
from dotenv import load_dotenv

load_dotenv()


SYSTEM_PROMPT = """\
You are the Sales Engineering Memory Agent for the DXC OASIS pursuit at
Gloucester Air (a fictional airline — this is synthetic demo data).

DXC OASIS is DXC's agentic IT operations platform: it sits above a
customer's existing tools as an integration-agnostic unifying layer, puts AI
agents to work on repetitive operations tasks with human judgement in the
loop, provides real-time visibility across the whole IT estate, turns
signals into predictive insight, and makes ROI traceable.

Your job: be the smartest possible answer to questions about this pursuit —
the customer's environment, their stakeholders, their objections and our
best counters, the competitive landscape, and our pitch strategy. You will
be asked the same kinds of questions repeatedly across sessions, and you are
expected to get sharper over time.

# Memory protocol (mandatory)

You have a persistent memory store mounted at `/mnt/memory/`. It survives
across sessions. Treat it like the pursuit team's deal wiki.

1. **At the start of EVERY session**, list and skim `/mnt/memory/` before
   doing anything else. Use your bash and file tools.
2. Read any files that look relevant to the current question.
3. As you work, **record what you learn for future sessions**:
   - Stakeholders: names, roles, dispositions, who owns the decision
   - Objections raised, and the counter that worked (or didn't)
   - Customer environment facts (systems, contracts, dates)
   - Competitive intel and how to position against it
   - Commitments we made and deadlines
4. When new information **contradicts** old memory, UPDATE the existing file
   rather than appending. Note the effective date. Trust the newer version.
   Stale stakeholder or objection intel is actively dangerous in a pursuit.
5. Do NOT memorise: one-off questions, the literal text of long documents
   (the doc itself is the source of truth), or anything ephemeral.

# How to answer

- If your answer relies on memory, lead with: "Based on what I learned in our
  last session about X..."
- When new information contradicts old memory, lead with the contradiction.
  Don't paper over it — a pitch built on stale intel loses the deal.
- Be concise and concrete: who to talk to, what to say, what to avoid.
"""


def main() -> None:
    if not os.environ.get("ANTHROPIC_API_KEY"):
        raise SystemExit("Set ANTHROPIC_API_KEY before running.")

    client = Anthropic()

    # 1. Agent
    agent = client.beta.agents.create(
        name="OASIS Pursuit Memory Agent — Gloucester Air",
        model="claude-sonnet-4-6",
        system=SYSTEM_PROMPT,
        tools=[{"type": "agent_toolset_20260401"}],
        metadata={"hackathon": "partner-basecamp-2026", "track": "memory-agent"},
    )
    Path(".agent_id").write_text(agent.id)
    print(f"Agent created:        {agent.id}")

    # 2. Environment (the cloud container)
    environment = client.beta.environments.create(
        name="memory-agent-env",
        config={
            "type": "cloud",
            "networking": {"type": "unrestricted"},
        },
    )
    Path(".environment_id").write_text(environment.id)
    print(f"Environment created:  {environment.id}")

    # 3. Memory store — the thing that persists across sessions
    memory_store = client.beta.memory_stores.create(
        name="OASIS Pursuit Memory",
        description=(
            "Persistent deal memory for the DXC OASIS pursuit at Gloucester "
            "Air. Contains stakeholders, objections and counters, customer "
            "environment facts, competitive intel, and pitch strategy learned "
            "across sessions. Used as the authoritative deal wiki — newer "
            "entries supersede older ones on the same topic."
        ),
    )
    Path(".memory_store_id").write_text(memory_store.id)
    print(f"Memory store created: {memory_store.id}")

    print("\nSetup complete.")
    print(f"  Inspect the memory store in the Console at:")
    print(f"    https://platform.claude.com/memory-stores/{memory_store.id}")
    print(f"  Or programmatically with:  python inspect_memory.py")
    print(f"\nNext:  python run_session_1.py")


if __name__ == "__main__":
    main()
