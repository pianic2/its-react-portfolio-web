# Future portfolio pass

This is a readiness brief for a later, explicitly scoped portfolio improvement pass. It does not authorize implementation in the configuration task.

## Preserve and improve the identity

Start from the existing Digital Studio / Pop Editorial Engineering character. Keep it unless repository and portfolio evidence supports a clear evolution. State of the art means intentional art direction, excellent typography, a distinctive visual identity, useful project media, specific storytelling, meaningful interaction, polished motion, responsive craft, accessibility and sound engineering.

Do not add random gradients, glass effects, gratuitous 3D, oversized type everywhere, generic SaaS patterns, stock imagery without a story purpose, or animation for its own sake.

## Explain the work with evidence

Audit all visitor-facing words in Italian and English: headings, paragraphs, project summaries, evidence labels, calls to action, navigation, empty and error states, tooltips, accessible names, and metadata. For each project, make clear what it is, why it exists, the problem addressed, the author's own design and implementation, why the technologies matter, what evidence is available, what was learned, and what remains in progress. Prefer specific, verifiable details to general self-praise. Keep technical terms only when they help a recruiter or technical reader understand the work.

Review first impression, scanning, navigation, project discovery and storytelling, progressive disclosure, trust, recruiter and technical-reader needs, mobile use, and consistency between languages.

## Add media and interaction for a reason

Use project screenshots, device/browser frames, diagrams, illustrations, timelines, or technical visuals when they explain an actual project or prove a claim. Art-direct each asset to its surrounding story. Do not fill empty space with decoration.

Consider guided exploration, architecture diagrams, before/after views, evidence explorers, process timelines, or small demos only when they answer a real visitor question. A wizard must solve a concrete visitor problem. Motion should clarify hierarchy or reveal a relationship; provide a reduced-motion path and preserve keyboard and focus behavior.

## Deterministic visual and interaction QA

Prefer one browser automation run for the full viewport matrix, checking 320, 390, 768, 1024, 1200, 1280, 1440 and 1920 CSS pixels. Include 1200 as a transition check. At each size, assert horizontal overflow, primary heading/content visibility, expected navigation mode, and layout completion. Across representative states, check runtime errors, font readiness, light and dark theme, reduced motion, keyboard navigation, focus visibility/restoration, and any stateful interaction or progressive disclosure.

Keep the checks deterministic and summarize assertions as text. Capture screenshots only for representative states or findings that need human comparison; do not retain or commit a full matrix of images by default. Use the same route/data/state across runs, and record browser/runtime context when a finding depends on it.
