"""
Session 3 — Stretch goal S4: "What have you learned?"

No new documents. Same agent, same memory store, fresh session. The only
input is a question about what the agent has learned across sessions —
the most direct demo of what's in memory: the memory store talking back.

Usage:
    python run_session_3.py
"""

import os
from pathlib import Path

from anthropic import Anthropic
from dotenv import load_dotenv

load_dotenv()


QUESTION = (
    "No new documents today. Summarise everything you've learned about the "
    "Gloucester Air pursuit across our previous sessions: the customer, the "
    "people, the objections and how to counter them, the competitive "
    "landscape, and how our strategy has changed over time. Where something "
    "changed between sessions, say what changed and when."
)

OUTPUT_DIR = Path("outputs")


def main() -> None:
    if not os.environ.get("ANTHROPIC_API_KEY"):
        raise SystemExit("Set ANTHROPIC_API_KEY before running.")

    for required in (".agent_id", ".environment_id", ".memory_store_id"):
        if not Path(required).exists():
            raise SystemExit(f"Missing {required}. Run create_agent.py first.")

    agent_id = Path(".agent_id").read_text().strip()
    environment_id = Path(".environment_id").read_text().strip()
    memory_store_id = Path(".memory_store_id").read_text().strip()

    client = Anthropic()

    print(f"Starting fresh session with same memory store {memory_store_id}...")
    print("(no documents this time — memory only)\n")
    session = client.beta.sessions.create(
        agent=agent_id,
        environment_id=environment_id,
        title="Session 3 — what have you learned?",
        resources=[
            {
                "type": "memory_store",
                "memory_store_id": memory_store_id,
                "access": "read_write",
                "instructions": (
                    "This is your persistent institutional memory. Answer "
                    "from it — there are no new documents this session."
                ),
            }
        ],
    )

    user_message = (
        "1. Check your memory store at /mnt/memory/ and read everything "
        "you've recorded.\n"
        "2. Then answer the question below from memory alone.\n\n"
        "==================================================\n"
        f"QUESTION: {QUESTION}"
    )

    final_text_parts: list[str] = []
    print("Agent working...\n")
    with client.beta.sessions.events.stream(session.id) as stream:
        client.beta.sessions.events.send(
            session.id,
            events=[
                {
                    "type": "user.message",
                    "content": [{"type": "text", "text": user_message}],
                }
            ],
        )
        for event in stream:
            if event.type == "agent.message":
                for block in event.content:
                    if getattr(block, "type", None) == "text":
                        final_text_parts.append(block.text)
                        print(block.text, end="", flush=True)
            elif event.type == "agent.tool_use":
                name = getattr(event, "name", "?")
                inp = getattr(event, "input", {}) or {}
                target = inp.get("path") or inp.get("file_path") or inp.get("command") or ""
                if "/mnt/memory" in str(target):
                    print(f"\n  [memory: {name}  {target}]", flush=True)
                else:
                    print(f"\n  [{name}]", flush=True)
            elif event.type == "session.status_idle":
                print("\n\n[agent finished]")
                break

    final_text = "".join(final_text_parts)
    OUTPUT_DIR.mkdir(exist_ok=True)
    out = OUTPUT_DIR / "session3.txt"
    out.write_text(
        f"=== SESSION 3 (memory only — no documents) ===\n"
        f"Question: {QUESTION}\n\n--- ANSWER ---\n{final_text}\n"
    )
    print(f"\nSaved to {out}")


if __name__ == "__main__":
    main()
