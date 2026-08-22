# Campaign Creator — Examples

## Example: Dakar Discount (dakardiscount.com)

### Input Brand Kit

```
## Brand Kit
- Name: Dakar Discount
- Tagline: Best Deals
- Sector: E-commerce généraliste (marketplace de bonnes affaires)
- Geography: Dakar, Sénégal
- Audience: Consommateurs dakarois sensibles au prix, acheteurs en ligne recherchant la commodité
- Tone: Bilingue français/anglais, moderne, accessible, orienté "bonne affaire" et urgence économique
- Positioning: L'agora des bonnes affaires en ligne à Dakar
- Suggested palette (inferred, not extracted): #E63946 primary, #1D3557 secondary, #F4A300 accent
```

### Brand Kit Output (`marketing-workflow/brand-kit.md`)

```markdown
# Brand Kit — Dakar Discount

## Identity
- **Name**: Dakar Discount
- **Tagline**: Best Deals
- **Sector**: E-commerce généraliste (marketplace de bonnes affaires)
- **Geography**: Dakar, Sénégal

## Audience & Voice
- **Target audience**: Consommateurs dakarois sensibles au prix, acheteurs en ligne recherchant la commodité
- **Tone**: Bilingue français/anglais, moderne, accessible, orienté "bonne affaire" et urgence économique
- **Positioning**: L'agora des bonnes affaires en ligne à Dakar

## Suggested Palette
> Inferred from sector/tone conventions — not extracted from the real logo or CSS. Validate against the actual brand guidelines before production use.

| Role | Hex |
|------|-----|
| Primary | #E63946 |
| Secondary | #1D3557 |
| Accent | #F4A300 |
```

### Campaign Visual Output (`marketing-workflow/campaign-visual.svg`)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <rect width="400" height="400" fill="#E63946"/>
  <rect x="20" y="20" width="360" height="360" rx="16" fill="#1D3557" opacity="0.12"/>
  <text x="200" y="170" text-anchor="middle" fill="#FFFFFF" font-family="system-ui" font-size="34" font-weight="bold">Dakar Discount</text>
  <text x="200" y="205" text-anchor="middle" fill="#FFFFFF" font-family="system-ui" font-size="18">Best Deals</text>
  <rect x="120" y="245" width="160" height="46" rx="23" fill="#F4A300"/>
  <text x="200" y="274" text-anchor="middle" fill="#1a1a1a" font-family="system-ui" font-size="16" font-weight="bold">Voir les bons plans</text>
</svg>
```

### Ad Copy Output (`marketing-workflow/campaign-copy.md`)

```markdown
# Campaign Copy — Dakar Discount

## Variation 1
**Headline**: Dakar Discount, les meilleurs prix à portée de clic
**Body**: Des milliers de bonnes affaires livrées partout à Dakar.
**CTA**: Je découvre les offres

## Variation 2
**Headline**: Best Deals, Dakar Style
**Body**: Pourquoi payer plus ? Comparez, économisez, recevez chez vous.
**CTA**: Je magasine maintenant

## Variation 3
**Headline**: L'agora des bonnes affaires est ouverte
**Body**: Nouvelles réductions chaque semaine, sans bouger de chez vous.
**CTA**: Je profite des promos
```

### Summary Output (`marketing-workflow/output.md`)

```markdown
# Marketing Campaign Result — Dakar Discount

## Brand Kit
See [brand-kit.md](brand-kit.md)

## Campaign Visual
![Campaign Visual](campaign-visual.svg)

## Ad Copy
See [campaign-copy.md](campaign-copy.md)

## Known Limitation
Colors were inferred from text/sector conventions, not extracted from the real logo or CSS — validate against actual brand guidelines before production use.
```
