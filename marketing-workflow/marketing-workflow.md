# Marketing Workflow

This document describes the **Command → Agent (with skill) → Skill** orchestration workflow applied to marketing: turning a business URL into a brand kit and campaign assets, without any external marketing SaaS or API key (see [Pomelli comparison](#why-no-pomelli-api) below).

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

## System Overview

This workflow mirrors the [weather system](../orchestration-workflow/orchestration-workflow.md) pattern, swapping temperature-fetching for brand analysis:
- **Agent Skill** (preloaded): `brand-fetcher` is injected into the `brand-agent` at startup as domain knowledge
- **Skill** (independent): `campaign-creator` is invoked directly by the command via the Skill tool

## Component Summary

| Component | Role | Example |
|-----------|------|---------|
| **Command** | Entry point, user interaction | [`/marketing-orchestrator`](../.claude/commands/marketing-orchestrator.md) |
| **Agent** | Extracts brand identity with preloaded skill (agent skill) | [`brand-agent`](../.claude/agents/brand-agent.md) with [`brand-fetcher`](../.claude/skills/brand-fetcher/SKILL.md) |
| **Skill** | Creates campaign assets independently (skill) | [`campaign-creator`](../.claude/skills/campaign-creator/SKILL.md) |

## Flow Diagram

```
╔══════════════════════════════════════════════════════════════════╗
║              MARKETING ORCHESTRATION WORKFLOW                    ║
║           Command  →  Agent  →  Skill                            ║
╚══════════════════════════════════════════════════════════════════╝

                         ┌───────────────────┐
                         │  User gives a URL │
                         └─────────┬─────────┘
                                   │
                                   ▼
         ┌─────────────────────────────────────────────────────┐
         │  /marketing-orchestrator — Command (Entry Point)     │
         └─────────────────────────┬───────────────────────────┘
                                   │
                              Step 1
                                   │
                                   ▼
                      ┌────────────────────────┐
                      │  Get target URL        │
                      └────────────┬───────────┘
                                   │
                         Step 2 — Agent tool
                                   │
                                   ▼
         ┌─────────────────────────────────────────────────────┐
         │  brand-agent — Agent ● skill: brand-fetcher          │
         └─────────────────────────┬───────────────────────────┘
                                   │
                        Returns: brand kit
                                   │
                         Step 3 — Skill tool
                                   │
                                   ▼
         ┌─────────────────────────────────────────────────────┐
         │  campaign-creator — Skill ● visual + copy + kit      │
         └─────────────────────────┬───────────────────────────┘
                                   │
                ┌──────────────────┼──────────────────┐
                │                  │                   │
                ▼                  ▼                   ▼
        ┌──────────────┐  ┌──────────────────┐  ┌──────────────┐
        │brand-kit.md  │  │campaign-visual.svg│  │campaign-copy.md│
        └──────────────┘  └──────────────────┘  └──────────────┘
```

## Component Details

### 1. Command

#### `/marketing-orchestrator` (Command)
- **Location**: `.claude/commands/marketing-orchestrator.md`
- **Purpose**: Entry point — orchestrates the workflow and handles user interaction
- **Actions**:
  1. Gets the target URL (argument or asked)
  2. Invokes brand-agent via Agent tool
  3. Invokes campaign-creator via Skill tool
- **Model**: sonnet

### 2. Agent with Preloaded Skill (Agent Skill)

#### `brand-agent` (Agent)
- **Location**: `.claude/agents/brand-agent.md`
- **Purpose**: Extract a structured brand identity using its preloaded skill
- **Skills**: `brand-fetcher` (preloaded as domain knowledge)
- **Tools Available**: Read, Skill
- **Model**: sonnet
- **Color**: purple
- **Memory**: project

### 3. Skill

#### `campaign-creator` (Skill)
- **Location**: `.claude/skills/campaign-creator/SKILL.md`
- **Purpose**: Create a brand kit document, an SVG campaign visual, and ad copy variations
- **Invocation**: Via Skill tool from the command (not preloaded into any agent)
- **Outputs**:
  - `marketing-workflow/brand-kit.md`
  - `marketing-workflow/campaign-visual.svg`
  - `marketing-workflow/campaign-copy.md`
  - `marketing-workflow/output.md`

### 4. Preloaded Skill

#### `brand-fetcher` (Skill)
- **Location**: `.claude/skills/brand-fetcher/SKILL.md`
- **Purpose**: Instructions for extracting a brand identity from a URL via WebFetch
- **Data Source**: The target website's own homepage (text only)
- **Output**: Structured brand kit (name, tagline, sector, geography, audience, tone, positioning, suggested palette)
- **Note**: This is an agent skill — preloaded into `brand-agent`, not invoked directly

## Why No Pomelli API? {#why-no-pomelli-api}

Google's [Pomelli](https://labs.google.com/pomelli/about) does something similar (URL → brand kit → campaign assets) but has no public API — it is a closed Google Labs web experiment. This workflow reproduces the same *pipeline shape* using only tools already available in Claude Code:

| Capability | Pomelli | This workflow |
|---|---|---|
| Brand extraction | Visual + text scraping | Text only, via `WebFetch` |
| Color palette | Extracted from real assets | Inferred from sector/tone, explicitly flagged |
| Visual generation | Photo-realistic (Imagen-class model) | Vector SVG cards, editable and versionable |
| Ad copy | Generated in-app | Generated by Claude, tone-matched to the brand kit |
| Access | No API, web app only | Fully scriptable, versioned in `.claude/` |

## Known Limitation

`WebFetch` converts pages to text via a summarizing model — it cannot see the rendered CSS, logo, or real brand colors. The suggested palette in every brand kit is a sector-convention inference, always labeled as such, never presented as extracted fact. A future iteration could use a headless browser with screenshot analysis for real visual fidelity (attempted for this workflow, but no Chromium binary was available in this environment — see the `agent-browser` skill for a project with that capability configured).
