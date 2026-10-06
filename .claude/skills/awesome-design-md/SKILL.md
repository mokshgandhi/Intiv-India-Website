---
name: awesome-design-md
description: Library of 74 DESIGN.md files describing popular brand design systems (Apple, Linear, Stripe, Vercel, Notion, Claude, Tesla, SpaceX, etc.) — colors, typography, spacing, components. Use when the user wants UI "like <brand>", asks for design-system inspiration, or wants to pick a visual direction for a page.
---

# awesome-design-md

Brand design-system references from [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) (MIT). Each file in `design-md/` is `<brand>.md` and is a plain-text design system an agent can build against.

## How to use

1. List available brands: `ls .claude/skills/awesome-design-md/design-md/`.
2. If the user named a brand, read that file. If they described a vibe instead (e.g. "clean dev-tool", "luxury automotive", "playful consumer"), skim the frontmatter `description` of a few candidates and suggest 2–3 matches before committing.
3. Read the chosen file fully and apply its tokens (palette, type scale, spacing, radii, component rules) to the UI being built. Adapt to this project's stack (Next.js + Tailwind) — map tokens to CSS variables / Tailwind theme rather than hard-coding values.
4. These are *inspired interpretations*, not official brand assets. Don't copy logos or trademarked names into the product; use the system as a design direction.

Pairs well with the `taste-skill` (overall design judgment) and `web-design-guidelines` (audit the result).
