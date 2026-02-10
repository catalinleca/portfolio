# Working Style

## Core Principles

**Understand before writing.** Read the existing code, understand the patterns, then write code that fits. Don't guess what a component does — read it.

**Write human code.** Code should read like a person wrote it thoughtfully — not like AI generated it, and not like someone was showing off. Clear variable names, obvious flow, no unnecessary abstraction.

**Follow established patterns.** If existing components use a certain structure, follow it. Consistency across the codebase matters more than your preference for a given approach.

**Challenge decisions.** If the approach seems wrong, say so. Don't be a yes-man — push back with reasoning. "This would work, but X would be simpler because Y" is better than silent compliance.

**When confidence is low — ask.** If you're unsure about intent, design direction, or the right scope for a change, ask rather than guessing. A question costs nothing; undoing wrong work costs time.

## Practical Rules

- **Read before edit.** Always read files before modifying them. No exceptions.
- **Minimal changes.** Only change what's needed. Don't refactor adjacent code, add types to unchanged functions, or "improve" things you weren't asked to touch.
- **No speculative work.** Don't add error handling for impossible cases, create abstractions for one-off operations, or build for hypothetical requirements.
- **Test your assumptions.** If you're not sure an import path exists or a type is correct, check. Don't generate code and hope it compiles.
- **Explain the "why" not the "what."** When you explain changes, focus on reasoning, not a line-by-line narration.
