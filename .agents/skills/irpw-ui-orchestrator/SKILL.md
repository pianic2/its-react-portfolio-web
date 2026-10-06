---
name: irpw-ui-orchestrator
description: Use when planning, implementing, auditing or reviewing portfolio UI, visual design, UX copy, interaction, responsive behavior or accessibility in this repository.
---

# IRPW UI Orchestrator

Route each task by phase. Read only the relevant specialist skill; keep one primary authority and add at most one supporting skill for a phase. Follow repository AGENTS.md for architecture, Jira roles, integration boundaries and validation.

## Route by task

- Copy-only change: use uiuxdesigner:ux-writing-microcopy. For a full visible-copy audit, use content-ux-reviewer.
- Visual direction or portfolio redesign: use engineering-suite-taste:design-taste-frontend as the primary art-direction authority; use engineering-suite-taste:high-end-visual-design only as a polish supplement. Use design-lead for one bounded direction or critique, not both multiple designers and parallel art directors. Consult references/future-redesign.md for a full portfolio pass.
- Layout or hierarchy correction: use uiuxdesigner:layout-grid-hierarchy; bring in engineering-suite-taste:design-taste-frontend only when the visual direction itself is unsettled.
- Motion or interaction: use uiuxdesigner:microinteractions-motion; add uiuxdesigner:accessibility-audit when motion, focus, keyboard, or reduced-motion behavior is affected.
- React/MUI implementation: use engineering-suite-taste:frontend-ui-engineering and frontend-engineer. A shared token/component change also warrants uiuxdesigner:design-system-builder; a one-off feature does not.
- Accessibility audit: use uiuxdesigner:accessibility-audit. Final UX review: use uiuxdesigner:ux-audit-critique and quality-reviewer once the candidate is ready.
- Bug or failing check: use superpowers:systematic-debugging before changing code. For a requested feature/bugfix, use superpowers:test-driven-development where it fits repository practice.
- Completion: use superpowers:verification-before-completion before reporting success. Use superpowers:requesting-code-review for major changes; superpowers:receiving-code-review when feedback arrives; superpowers:finishing-a-development-branch when integration is in scope.

## Delegation and context

Use a child agent only when its bounded work is independent and saves coordination time. At most three children may be active; normally use one specialist. Never create overlapping design leads, delegate deterministic shell commands, or let a worker delegate. Codex exposes no configuration key for isolated subagent history in this release. Give each child only its goal, exact relevant paths, constraints and requested evidence. Ask for a concise result, keep working on independent root tasks, and check status at phase boundaries instead of polling. Reuse the existing reviewer for a follow-up review.

## Tools and discovery

Use an available, known tool namespace directly. Discover only a specific missing capability; never enumerate the full tool catalogue to see what exists. Prefer targeted files, symbols and diffs. For Jira/GitHub, request only fields required for the decision (usually issue/PR identifier, summary, description, acceptance criteria, status and changed-file diff); avoid full payloads and rereads of unchanged records.

Reuse the globally configured GitHub and Atlassian plugins, Figma tools, and openaiDeveloperDocs MCP when relevant. Do not add duplicate MCP servers or credentials. Use Figma only for a task with a real Figma source. Use live web search only for current external patterns or authoritative technical references that local evidence cannot answer. For browser QA, use available browser automation directly; do not discover unrelated tools.

## Output discipline

Return a compact task brief or prioritized findings, not a transcript of every tool call. Run a deterministic visual/interaction check once on the final candidate. Retain screenshots only when they communicate useful review evidence; do not save a screenshot for every assertion. Never copy third-party promotional footers into portfolio content.
