---
name: brand-fetcher
description: Instructions for extracting a structured brand identity (name, tagline, sector, audience, tone, suggested colors) from a business website URL
user-invocable: false
allowed-tools:
  - "WebFetch(*)"
---

# Brand Fetcher Skill

This skill provides instructions for extracting a brand identity from a website, without any external marketing API or key.

## Task

Given a target URL, extract a structured brand kit: name, tagline, sector, geography, target audience, tone/voice, positioning, and a suggested color palette.

## Instructions

1. **Fetch the homepage**: Use the WebFetch tool on the target URL with a prompt asking for a marketing-brand audit: company name, sector, products/services, target audience, tone/style of the copy, taglines, and any distinctive brand elements.

2. **Fetch a second pass if the first is thin**: Many sites render content via JavaScript, so WebFetch's text conversion can be fragmentary or truncated. If the first fetch returns little detail, re-fetch the same URL with a prompt asking specifically for the page `<title>` and any literal tagline text — this alone is often enough to anchor name + positioning.

3. **Extract into these fields**:
   - **Name**: the brand/company name
   - **Tagline**: literal slogan text if present
   - **Sector**: industry / category of business
   - **Geography**: city/country the business serves, if apparent
   - **Audience**: who the site is speaking to
   - **Tone**: language register (formal/casual, bilingual, urgency-driven, etc.)
   - **Positioning**: one-sentence summary of how the brand presents itself

4. **Suggest a color palette** — do NOT claim this is extracted from the real logo/CSS (WebFetch only sees text, not rendered styles). Infer 3–4 hex colors from sector conventions and tone (e.g. discount/urgency → red/orange; premium → dark + gold; eco → green). Label this clearly as **"palette suggérée, à valider avec la charte réelle"**.

## Expected Output

Return the brand kit in this structure:

```
## Brand Kit
- Name: [name]
- Tagline: [tagline or "none found"]
- Sector: [sector]
- Geography: [geography]
- Audience: [audience]
- Tone: [tone]
- Positioning: [one-sentence positioning]
- Suggested palette (inferred, not extracted): [hex1] primary, [hex2] secondary, [hex3] accent
```

## Notes

- Only fetch and extract — do not write any files or create visuals (that is `campaign-creator`'s job)
- Always flag inferred data (especially colors) as inferred, never as extracted fact
- If the site is unreachable or has no usable content, report the failure clearly instead of inventing brand data
