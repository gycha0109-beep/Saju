# Myeonghwa Research UX Preview

Status: `LOCAL_RESEARCH_PREVIEW_ONLY`

This preview exists only to let the product owner inspect the current consumer UX before production interpretation authority is available.

## Run

Requirements:

- Node.js 24
- npm 11

From the repository root:

```bash
npm ci
npm run preview:research
```

Then open:

```text
http://127.0.0.1:4173
```

Stop with `Ctrl+C`.

## Current meaningful target

The currently evidence-backed research candidate only makes the following reading target meaningful:

```text
전체 사주
→ reading text: 사주
→ general / natal
```

Other reading intents remain fail-closed when their required T8/T9 evidence is missing.

## Runtime composition

```text
consumer browser
→ existing Product Host HTTP/UI
→ Production Calculation Authority V1 policy
→ I18A research month-branch relation + scope guard
→ general natal T8 structural-summary research candidate
→ existing governed reading service
→ deterministic grounded fallback narrative
→ consumer response
```

The preview deliberately uses the deterministic grounded fallback instead of an external LLM provider so that UX review does not depend on credentials or model variability.

## Authority boundary

This is not production interpretation authorization.

```text
research candidate != production registry
local preview != public deployment
preview dependency injection != provenance proof
browser success != production authority
```

The research registry remains `research`, its rules remain `research/unreviewed`, and the production composition root remains blocked until content-addressed domain review attestations and trust pins exist.

## Smoke verification

`npm run check` includes:

```text
build
→ start preview on an ephemeral localhost port
→ GET /healthz
→ POST a general/natal reading
→ require delivered or delivered_with_fallback
→ shutdown
```

This proves the command is executable without converting the preview into production authority.
