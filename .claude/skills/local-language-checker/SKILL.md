---
name: local-language-checker
description: Verifies local-language phrases (e.g. Wolof) against the Glosbe online dictionary via WebFetch, adding a confidence note to each glossary entry. Supplements but never replaces native-speaker review.
user-invocable: false
allowed-tools:
  - "WebFetch(*)"
---

# Local Language Checker Skill

Cross-checks generated local-language phrases against a free online dictionary before they reach a human reviewer, so obviously-wrong entries get caught early and correct entries get corroborated — without ever claiming certainty a machine translation can't back up.

## Task

Given a list of local-language phrases (each with its intended French/English gloss), check the key word(s) of each phrase against Glosbe and report a verification result.

## Instructions

1. **Identify the key word per phrase** — skip words already known/common (French connectors, brand names); focus on the local-language word(s) that carry the meaning (e.g. in "Loy xaar ?", the key word is "xaar").

2. **Query Glosbe** — Use WebFetch on `https://glosbe.com/wo/fr/<word>` (lowercase, keep diacritics like ë, à) with a prompt asking: does an entry exist for this Wolof word, and what French translation is shown?

3. **Classify the result**:
   - ✅ **Confirmed** — Glosbe shows a translation matching the intended gloss
   - ⚠️ **Different meaning** — Glosbe has an entry, but it doesn't match what was intended
   - ❓ **Not found** — no entry in Glosbe. This does **not** mean the word is wrong — Glosbe's Wolof coverage is incomplete (confirmed: common words like "yaakaar" return no entry). It means the phrase still needs a human or Freelang check.

4. **Return a table**: phrase | key word checked | Glosbe result | verdict (✅/⚠️/❓)

## Rules

- Never claim a phrase is wrong just because Glosbe has no entry for it — only report what was actually found
- Never invent a dictionary result if WebFetch fails or the page is ambiguous — report "inconclusive" instead
- This check is a supplement, not a replacement, for native-speaker review — the calling skill must keep that review language in its final output regardless of how many phrases come back ✅
- Only Glosbe (`glosbe.com/wo/fr/<word>`) is reliably queryable by URL for this. Freelang's dictionary page is presentation-only when fetched via a plain URL — link it as a manual fallback resource for the human reviewer, don't try to auto-query it.

## Example

Input: `["xaar (attendre / to wait)", "yaakaar (confiance / trust)", "jërëjëf (merci / thank you)"]`

Output:

| Phrase / key word | Glosbe result | Verdict |
|---|---|---|
| xaar | "attendre" — matches intended gloss | ✅ Confirmed |
| yaakaar | No entry in Glosbe | ❓ Not found — check Freelang or a native speaker |
| jërëjëf | "merci" — matches intended gloss | ✅ Confirmed |
