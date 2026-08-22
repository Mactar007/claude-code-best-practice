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

3. **Write ad copy variations** — Generate exactly 3 short ad copy variations (headline + one-line body + CTA) that match the brand's tone, positioning, and the audience's actual local language (from the brand kit's Language field — not necessarily the site's own copy language). Read then write to `marketing-workflow/campaign-copy.md` using the template from [reference.md](reference.md), including the Local-Language Glossary section whenever a lower-resource local language is used.

3b. **Verify local-language phrases** — If a Local-Language Glossary was written, invoke `Skill(local-language-checker)` with the list of phrases to get a per-phrase verification verdict (✅/⚠️/❓) from Glosbe. Add the verdict to the glossary table as a "Verification" column. This is an automated pre-check, not a substitute for the human review the command still surfaces afterward.

4. **Write the summary** — Read then write `marketing-workflow/output.md` linking all three outputs.

## Rules

- Use the exact brand kit fields provided — do not re-fetch or invent brand facts
- Always keep the "inferred, not extracted" caveat on colors visible in the brand kit output
- Any phrase in a local/lower-resource language must appear in the Local-Language Glossary — never bury it only inside prose where it's hard to find and edit
- Every glossary entry must carry a Verification result from `local-language-checker` — a ❓ "not found" verdict is not a failure, but it must still be shown, not omitted
- The SVG must be self-contained and valid
- All output files go in the `marketing-workflow/` directory

## Additional resources

- For SVG template, output templates, and design specs, see [reference.md](reference.md)
- For a worked example, see [examples.md](examples.md)
