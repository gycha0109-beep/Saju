# FR310 — Bounded visible-hairline evidence adjudicator

Status: adjudicator implementation, no real FR308 evidence adjudicated yet

Watchtower-Track: face-observation-engine

## Purpose

FR308 defines a four-case bounded first empirical bundle.

FR310 does not turn that bundle into a model admission. It only decides whether the current Florence-2 candidate should:

1. be rejected;
2. repeat the same FR308 bundle without retuning;
3. proceed to broader FR311 validation.

The four-case bundle is intentionally insufficient for FR305 model admission because it does not establish representative ordinary-RGB coverage across the remaining visibility, contrast, shape and illumination cases.

## Inputs

FR310 consumes only:

- the FR308 bounded bundle receipt;
- exactly four deidentified FR308 case findings;
- the exact Florence-2 model ID and revision;
- a human-review attestation.

The human-review output must contain no source image, overlay, raw polygon coordinates, source-image digest, filename or personal identifier.

## Hard rejection

Reject the current candidate when the bounded evidence shows a material fail-closed violation.

Examples:

- gross mislocalization on the clear case;
- hidden completion on the clear or partial-bangs case;
- hidden completion on the substantially-hidden case;
- diagnostic `visible hairline` hallucination on the substantially-hidden case when human review identifies a credible authoritative-boundary interpretation risk;
- gross mislocalization or out-of-frame completion on the crop case;
- an explicit FR308 case disposition that rejects current candidate behavior.

The next action is to evaluate the FR306 fallback candidate.

## Repeat

Repeat the same FR308 four-case bundle without prompt, threshold or case retuning when evidence quality is not sufficient for a decision.

Repeat conditions include:

- incomplete human review;
- review-output privacy boundary not satisfied;
- clear case inconclusive;
- partial-bangs case inconclusive with no visible-interface assessment;
- hidden or crop case assessment blocked;
- two or more cases inconclusive.

FR310 does not tune thresholds or alter prompts in response to these outcomes.

## Expanded-validation eligibility

FR310 may emit `eligible_for_expanded_validation` only when:

- the exact FR308 bundle is complete;
- the clear case supports further evaluation and has no gross mislocalization;
- partial bangs show no hidden completion;
- the substantially-hidden case shows no hidden completion;
- a diagnostic direct-prompt hallucination is not judged to create authoritative-boundary interpretation risk;
- crop shows no out-of-frame completion;
- human review is complete;
- review output satisfies the deidentified boundary;
- no hard-reject condition and no repeat condition remains.

This state authorizes only design/run of FR311 expanded validation.

It does not issue an FR305 admission receipt.

## FR311 frontier

FR311 should cover the remaining FR306 failure-mode cases:

- M-shape / widow's peak;
- asymmetric recession;
- headwear occlusion;
- dark hair against dark background;
- light hair / low contrast;
- ordinary indoor illumination variation.

FR311 must separately define representative ordinary-RGB coverage and any repeatability/diversity requirements before a later model-admission review can exist.

## Authority

FR310 always keeps false:

- FR305 admission receipt issued;
- validated hairline runtime provider admitted;
- neutral runtime hairline observation authorized;
- traditional 髮際 binding;
- Three-Divisions span execution;
- Product materialization;
- Production;
- Commerce.

Repository state remains:

- #1521 readiness: 6 / 7;
- Product: 18 / 29;
- traditional bindings: 0;
- admitted hairline runtime providers: 0.

Until actual deidentified FR308 findings arrive, the repository gate records the adjudicator as implemented but not executed.
