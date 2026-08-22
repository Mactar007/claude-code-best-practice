---
name: campaign-creator
description: Creates a brand kit document, an SVG campaign visual, and ad copy variations from a brand kit. Writes to marketing-workflow/brand-kit.md, campaign-visual.svg, campaign-copy.md, and output.md.
---

# Campaign Creator Skill

Turns a structured brand kit into ready-to-use campaign assets: a brand kit document, a social-post-style SVG visual, and ad copy variations.

## Task

You will receive a brand kit (name, tagline, sector, geography, audience, tone, positioning, suggested palette) from the calling context. Create the campaign assets and write the output files.

## Instructions

1. **Write the brand kit** — Read then write `marketing-workflow/brand-kit.md` using the markdown template from [reference.md](reference.md), filled in with the brand kit fields.

2. **Create the campaign visual** — Use the SVG template from [reference.md](reference.md), replacing placeholders with the brand name, tagline, and suggested palette. Read then write to `marketing-workflow/campaign-visual.svg`.

3. **Write ad copy variations** — Generate exactly 3 short ad copy variations (headline + one-line body + CTA) that match the brand's tone and positioning. Read then write to `marketing-workflow/campaign-copy.md` using the template from [reference.md](reference.md).

4. **Write the summary** — Read then write `marketing-workflow/output.md` linking all three outputs.

## Rules

- Use the exact brand kit fields provided — do not re-fetch or invent brand facts
- Always keep the "inferred, not extracted" caveat on colors visible in the brand kit output
- The SVG must be self-contained and valid
- All output files go in the `marketing-workflow/` directory

## Additional resources

- For SVG template, output templates, and design specs, see [reference.md](reference.md)
- For a worked example, see [examples.md](examples.md)
