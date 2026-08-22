# Campaign Creator — Reference

## Brand Kit Markdown Template (`marketing-workflow/brand-kit.md`)

```markdown
# Brand Kit — [BRAND_NAME]

## Identity
- **Name**: [BRAND_NAME]
- **Tagline**: [TAGLINE]
- **Sector**: [SECTOR]
- **Geography**: [GEOGRAPHY]

## Audience & Voice
- **Target audience**: [AUDIENCE]
- **Tone**: [TONE]
- **Positioning**: [POSITIONING]

## Suggested Palette
> Inferred from sector/tone conventions — not extracted from the real logo or CSS. Validate against the actual brand guidelines before production use.

| Role | Hex |
|------|-----|
| Primary | [PRIMARY_HEX] |
| Secondary | [SECONDARY_HEX] |
| Accent | [ACCENT_HEX] |
```

---

## Campaign Visual SVG Template (`marketing-workflow/campaign-visual.svg`)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <rect width="400" height="400" fill="[PRIMARY_HEX]"/>
  <rect x="20" y="20" width="360" height="360" rx="16" fill="[SECONDARY_HEX]" opacity="0.12"/>
  <text x="200" y="170" text-anchor="middle" fill="#FFFFFF" font-family="system-ui" font-size="34" font-weight="bold">[BRAND_NAME]</text>
  <text x="200" y="205" text-anchor="middle" fill="#FFFFFF" font-family="system-ui" font-size="18">[TAGLINE]</text>
  <rect x="120" y="245" width="160" height="46" rx="23" fill="[ACCENT_HEX]"/>
  <text x="200" y="274" text-anchor="middle" fill="#1a1a1a" font-family="system-ui" font-size="16" font-weight="bold">[CTA_TEXT]</text>
</svg>
```

### Placeholders

| Placeholder | Replace with |
|-------------|--------------|
| `[BRAND_NAME]` | Brand kit name |
| `[TAGLINE]` | Brand kit tagline, or a short positioning line if none found |
| `[PRIMARY_HEX]` / `[SECONDARY_HEX]` / `[ACCENT_HEX]` | Suggested palette from brand kit |
| `[CTA_TEXT]` | Short call-to-action matching tone (e.g. "Voir les offres") |

### Design Specs

| Property | Value |
|----------|-------|
| Dimensions | 400 x 400 px (square, social-post ratio) |
| Background | Primary color |
| Inner panel | Secondary color at low opacity, rounded |
| Brand name | White, 34px bold, centered |
| Tagline | White, 18px, centered |
| CTA pill | Accent color fill, dark text, rounded (22px radius) |
| Font | `system-ui` |

---

## Ad Copy Markdown Template (`marketing-workflow/campaign-copy.md`)

```markdown
# Campaign Copy — [BRAND_NAME]

## Variation 1
**Headline**: [headline]
**Body**: [one-line body]
**CTA**: [cta]

## Variation 2
**Headline**: [headline]
**Body**: [one-line body]
**CTA**: [cta]

## Variation 3
**Headline**: [headline]
**Body**: [one-line body]
**CTA**: [cta]

## Local-Language Glossary
[Only include this section if the brand kit's Language field specifies a language Claude is not confidently fluent in — e.g. Wolof, or any language with limited training data. Omit entirely for high-resource languages like French/English/Spanish where confidence is high.]

| Phrase used | Literal / intended meaning | Used in |
|---|---|---|
| [phrase] | [gloss] | [where] |

Not verified by a native speaker — generated as a reasonable draft, not a fact. Corrections are welcome and expected. Edit this table directly; it is the single source of truth for local-language phrasing in this campaign.
```

---

## Output Summary Template (`marketing-workflow/output.md`)

```markdown
# Marketing Campaign Result — [BRAND_NAME]

## Brand Kit
See [brand-kit.md](brand-kit.md)

## Campaign Visual
![Campaign Visual](campaign-visual.svg)

## Ad Copy
See [campaign-copy.md](campaign-copy.md)

## Known Limitation
Colors were inferred from text/sector conventions, not extracted from the real logo or CSS — validate against actual brand guidelines before production use.
```

---

## Output Paths

| File | Path |
|------|------|
| Brand kit | `marketing-workflow/brand-kit.md` |
| Campaign visual | `marketing-workflow/campaign-visual.svg` |
| Ad copy | `marketing-workflow/campaign-copy.md` |
| Summary | `marketing-workflow/output.md` |
