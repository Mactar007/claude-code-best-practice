---
description: Analyze a business URL and generate a brand kit plus a campaign visual (Pomelli-style marketing workflow)
argument-hint: [url]
model: sonnet
allowed-tools:
  - AskUserQuestion
  - Agent
  - Skill
---

# Marketing Orchestrator Command

Analyze a business's website and generate a brand identity kit plus ready-to-use campaign assets (visual + ad copy), without depending on any external marketing SaaS or API key.

## Execution Contract (non-negotiable)

You MUST complete this command by delegating brand extraction to the `brand-agent` subagent. You are forbidden from:

- Fetching or analyzing the target URL yourself via WebFetch, Bash, or any other tool
- Skipping Step 1 (the target URL is required input to the agent)
- Calling `campaign-creator` before the agent returns a brand kit

If you cannot invoke the Agent tool, stop and report the error to the user. Do not improvise.

## Workflow

### Step 1: Get the Target URL

Use `$1` (the `[url]` argument) if provided. Otherwise use AskUserQuestion to ask the user for the website URL to analyze. Capture the URL before proceeding.

### Step 2: Extract Brand Identity via Agent

Use the Agent tool to invoke the brand agent:

- subagent_type: brand-agent
- description: Extract brand identity from a website
- prompt: Analyze the website at [URL from Step 1] and return a structured brand kit. The agent has a preloaded skill (brand-fetcher) that provides the detailed instructions.
- model: sonnet

Wait for the agent to complete and capture the returned brand kit (name, tagline, sector, audience, tone, positioning, suggested color palette).

**Fail-closed guardrail**: If the agent does not return a structured brand kit, DO NOT proceed to Step 3. Report the failure to the user and stop.

### Step 3: Create Campaign Assets

Use the Skill tool to invoke the campaign-creator skill:

- skill: campaign-creator

The skill will use the brand kit from Step 2 (available in the current context) to write the brand kit document, a campaign visual (SVG social card), and ad copy variations.

### Step 4: Surface Local-Language Phrasing for Review

If `marketing-workflow/campaign-copy.md` contains a Local-Language Glossary section (i.e. the campaign uses a lower-resource local language), explicitly show the user every phrase in that glossary and invite corrections before treating the campaign as final. Do not silently ship generated local-language phrasing — Claude is not a certified speaker of every local language, and the user (or a native speaker they consult) may need to swap a term. Edits should be made directly in the glossary table, which is the single source of truth propagated to the SVG and copy variations.

## Output Summary

Provide a clear summary to the user showing:

- URL analyzed
- Brand kit written to `marketing-workflow/brand-kit.md`
- Campaign visual created at `marketing-workflow/campaign-visual.svg`
- Ad copy variations at `marketing-workflow/campaign-copy.md`
- Summary written to `marketing-workflow/output.md`
- A reminder that colors/logo are inferred from text, not extracted from real brand assets — flag this explicitly as a known gap versus a tool that does visual scraping
