# I87 — Untouched Support Effect Authority Candidate Registration Contract

## Status

```text
STRICT CLOSED
```

## Decision

```text
CANDIDATE_REGISTRATION_CONTRACT_FROZEN_NO_SOURCE_REGISTERED_OR_APPROVED
```

I87 freezes only the research registration contract required before a discovered authority candidate may be evaluated against I84. It performs no external discovery, creates no real candidate, and grants no methodology/rule or executable authority.

## Contract boundary

The existing `SourceReference` contract remains the only source registry boundary. No parallel authority registry is introduced.

Required core source fields:

```text
sourceId
sourceType
title
provenanceTier
```

Where applicable, the existing provenance detail fields are preserved:

```text
author
editor
publisher
edition
publicationYear
language
locator
url
accessedAt
rights
notes
```

A future candidate registration must additionally preserve:

```text
evidence representation
exact locator statement
source language / translation status
scope
applicability
exceptions
provenance statement
discovery trace
all six I84 requirement slots
```

All I84 requirement slots begin as:

```text
NOT_EVALUATED
```

Registration is provenance normalization, not requirement satisfaction.

## Fail-closed rules

```text
search ranking != authority identity
source type != requirement satisfaction
primary provenance tier != requirement satisfaction
support terminology != effective-support authority
no-contest language != persistence authority
missing bibliography != permission to fabricate
missing locator != permission to guess
source title != scope evidence
translation != replacement for original-source locator
search snippet != authority evidence
source registration != methodology approval
source registration != rule approval
source registration != executable authority
```

Candidate registration identifiers must be content-addressed to normalized registration material in the future evidence adapter.

## Preserved guards

```text
sourceActivationVerdict = not authorized
sourcePersistenceVerdict = not authorized
sourceEffectiveSupportVerdict = not authorized
relativeForceVerdict = not authorized
crossRelationPrecedence = not authorized
classificationAuthorized = false
numericScoringAuthorized = false
```

No untouched-support effect rule is implemented by I87.

## Verification

Code/test/export exact HEAD:

```text
9875416fdb83d0018ba95474249cae55c7de1b51
```

GitHub Actions:

```text
CI #777 SUCCESS
145 test files passed
806 tests passed
I87 8/8 passed
lint PASS
typecheck PASS
test PASS
build PASS
```

## Next gate

```text
I88 — Untouched Support Effect Authority Candidate Discovery and Registration Evidence
```

I88 may discover and normalize a real candidate only when the original source and exact locator can be verified. Discovery snippets, secondary summaries, or model synthesis may not be registered as authority evidence. If no candidate satisfies the I87 registration contract, I88 must close fail-closed with no registered candidate rather than fabricating missing evidence.
