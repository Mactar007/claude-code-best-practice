# Réflexion — Un "Pomelli sénégalais" vendu au public ?

Note de réflexion, pas un plan engagé. Point de départ : pourrait-on transformer le workflow `/marketing-orchestrator` de ce repo en produit public payant ?

<table width="100%">
<tr>
<td><a href="marketing-workflow.md">← Retour au marketing-workflow</a></td>
</tr>
</table>

## Ce qui existe aujourd'hui vs. ce qu'il faudrait

Ce qu'on a construit ici est un **outil pour développeur, à l'intérieur d'une session Claude Code** : des fichiers `.claude/` (command, agent, skills) qui n'ont de sens que si l'utilisateur a lui-même Claude Code. Ce n'est l'équivalent d'un produit public que dans la logique du pipeline (URL → brand kit → visuel → copie), pas dans l'architecture.

| | Ce workflow (aujourd'hui) | Un produit public payant |
|---|---|---|
| Interface | Session Claude Code (CLI/terminal) | Application web, formulaire, dashboard |
| Exécution | `Skill`/`Agent` internes à Claude Code | Backend indépendant appelant l'**API Claude** (pas Claude Code) |
| Utilisateurs | Toi, en tant que développeur | N'importe qui, sans connaître Claude Code |
| Authentification | Aucune (c'est toi) | Comptes, sessions, éventuellement OAuth |
| Paiement | Aucun | Stripe (ou équivalent) + gestion des abonnements/crédits |
| Coût de calcul | Ta propre session | Facturé par toi, à chaque appel API, pour chaque client |
| Contrôle qualité | Toi qui relis chaque sortie (comme on vient de le faire pour le wolof) | Doit tenir à l'échelle, sans relecture manuelle systématique |

Le repo actuel resterait utile comme **prototype de référence** pour la logique métier (le pipeline en lui-même), mais le produit serait un projet séparé.

## Le vrai obstacle : le contrôle qualité à l'échelle

L'épisode du glossaire wolof est instructif. On a corrigé "Bul yàgg" en "Loy xaar", découvert que Glosbe ne connaît pas "yaakaar" alors que c'est un mot courant, et mis en place une relecture humaine à chaque génération. Ce niveau de soin est possible parce qu'on ne traite qu'**une marque à la fois, avec toi qui relis**.

Un produit public qui génère des centaines de campagnes par jour ne peut pas dépendre d'une relecture humaine systématique sans:
- soit employer/payer des relecteurs (rentabilité à revoir),
- soit accepter un taux d'erreur résiduel et le communiquer clairement au client,
- soit limiter le produit aux langues où le modèle a une couverture d'entraînement solide (le français et l'anglais posent beaucoup moins ce problème que le wolof).

C'est un vrai axe de différenciation potentiel : peu d'outils marketing IA prennent au sérieux le code-switching français/wolof (ou plus largement les langues ouest-africaines à faibles ressources). Mais c'est aussi précisément le point le plus difficile à industrialiser.

## Ce qu'il faudrait vérifier avant d'aller plus loin

1. **Conditions commerciales d'Anthropic** — revendre un accès (même indirect, via un produit qui appelle l'API en coulisses) est possible mais encadré par les *usage policies* d'Anthropic. À vérifier directement auprès d'Anthropic pour ton cas précis avant tout engagement — je ne peux pas te garantir moi-même ce qui est autorisé.
2. **Modèle de coût** — chaque génération (brand kit + visuel + copie) coûte des tokens d'API à chaque appel. Il faut un prix par session/crédit qui couvre ce coût + marge, avec un garde-fou contre l'abus (comptes créés en masse, requêtes répétées).
3. **Différenciation réelle face à Pomelli** — Pomelli est gratuit et fait déjà ce pipeline (avec en plus la génération d'images photo-réalistes qu'on n'a pas ici). Vendre "la même chose en moins bien" n'a pas de marché. Les angles de différenciation qui ressortent de cette conversation :
   - Spécialisation marchés francophones ouest-africains (français/wolof, français/autres langues locales)
   - Sorties versionnées et éditables (SVG/Markdown en Git) plutôt qu'un export figé
   - Glossaire de langue locale éditable et vérifié comme fonctionnalité affichée, pas cachée
4. **Portée légale du nom "Pomelli"** — ne jamais présenter le produit comme lié à Google/Pomelli ; construire sous un nom et une identité propres.

## Prochaines étapes si l'idée mûrit

- Rédiger un vrai brief produit (audience cible précise, prix, MVP minimal) séparément de ce repo
- Prototyper le backend avec l'API Claude directement (pas Claude Code) dans un nouveau repo dédié
- Commencer petit : peut-être un outil interne/beta pour quelques commerçants dakarois plutôt qu'un lancement public, pour valider la qualité perçue avant de scaler

## Statut

Idée en réflexion, non engagée. Ce fichier documente la discussion pour y revenir plus tard — aucune action de mise en œuvre n'a été prise sur cette piste.
