# I86 — Challenge Combination Support Channel Untouched Support Effect Additional Authority Acquisition Readiness Review

## Status

**STRICT CLOSED**

## Decision

`ADDITIONAL_AUTHORITY_ACQUISITION_RESEARCH_REGISTRATION_ALLOWED_DIRECT_RULE_PROMOTION_BLOCKED`

## Scope

I86 governs how additional authority candidates may enter the research pipeline after I85 confirmed that the current canonical I51/I53 inventory contains no candidate satisfying all frozen I84 requirements.

I86 does not acquire a new source, approve a candidate, create a methodology/rule, or implement an untouched-support effect rule.

## Existing repository authority intake path

The existing repository already separates:

```text
SourceReference
-> content-addressed RuleRegistrySnapshot
-> explicit MethodologyDefinition / RuleDefinition sourceId linkage
-> methodology/rule review and reviewer trust
-> separate runtime / production authorization
```

`SourceReference` core registration identity is:

```text
sourceId
sourceType
title
provenanceTier
```

and provenance detail is carried where applicable through author/editor/publisher/edition/publicationYear/language/locator/url/accessedAt/rights/notes.

Registered source content is content-addressed in the registry snapshot. Methodology or rule references to missing sourceIds fail closed.

## Authorized acquisition stages

```text
DISCOVERY_ONLY
-> PROVENANCE_NORMALIZATION
-> SOURCE_REGISTRATION
-> I84_REQUIREMENT_EVALUATION
-> METHODOLOGY_OR_RULE_PROMOTION_REVIEW
```

The first four are research stages. The final promotion-review stage remains separately governed and is not opened by I86.

No stage creates executable authority directly.

## Discovery boundary

```text
web search result != authority
retrieved snippet != authority
secondary summary != authority
model-generated synthesis != authority
relevance match != authority
unregistered quotation != authority
```

Discovery cannot bypass SourceReference registration or the six-requirement I84 evaluation.

## Registration boundary

```text
source registration != methodology approval
source registration != rule approval
source registration != executable authority
primary text identity != automatic candidate approval
mentions support != requirement satisfaction
mentions stability/no contest != requirement satisfaction
```

Review attestations bind methodology/rule content rather than SourceReference directly, so methodology/rule review remains separate after source registration and candidate evaluation.

## Preserved guards

```text
candidateSetCompositionPolicyResolved = false
crossCandidateSynthesisAuthorized = false
newNormativeUntouchedSupportPolicyAuthorized = false
untouchedSupportEffectRuleImplementationAuthorized = false
universalDefaultActiveRuleAuthorized = false
universalDefaultPersistedRuleAuthorized = false
universalDefaultEffectiveSupportRuleAuthorized = false
sourceActivationVerdictAuthorized = false
sourcePersistenceVerdictAuthorized = false
sourceEffectiveSupportVerdictAuthorized = false
relativeForceVerdictAuthorized = false
crossRelationPrecedenceAuthorized = false
targetPostRelationRootState = not_determined
effectiveMechanismForceVerdict = not_determined
classificationAuthorized = false
numericScoringAuthorized = false
```

## Next gate

`I87 — Untouched Support Effect Authority Candidate Registration Contract`

I87 may freeze the research intake object required to normalize a discovered candidate into a stable SourceReference plus requirement-evaluation provenance. It must not perform external discovery, fabricate bibliographic metadata, register an actual source without evidence, or approve the candidate for methodology/rule use.
