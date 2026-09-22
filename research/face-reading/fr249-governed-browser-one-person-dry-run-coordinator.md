# FR249 — Governed browser one-person dry-run coordinator

Status: implementation candidate; operator surface still required before actual execution  
Contract: `FR249-GOVERNED-BROWSER-ONE-PERSON-DRY-RUN-COORDINATOR-v1`  
Tracking: #1314  
Watchtower-Track: `face-research`

## Purpose

FR241-FR248 now contain the lower-level mechanics and browser-portable authority runtime required for the first actual one-person browser dry run, but they still require manual hand-wiring.

FR249 composes those boundaries without widening any of them.

## Coordinator lifecycle

The coordinator is stateful and intentionally does not execute all four captures in one automatic function.

1. caller supplies an already-issued MESH6H camera and the exact FR241/FR242/FR243/admission chain;
2. operator begins session 1;
3. operator explicitly triggers capture 1;
4. operator explicitly triggers capture 2;
5. only after both session-1 slots are recorded may session 2 be issued;
6. session 2 again requires two explicit captures;
7. after all four slots exist, FR249 calls the existing FR243 mechanics review.

This preserves the possibility of real temporal separation between session 1 and session 2. FR249 does not independently verify that separation.

## Per-capture composition

Each capture performs:

`FR241 challenge -> FR244 browser frame/JPEG -> FR247 quality binding -> FR242 quality gate -> FR246 metric binding -> FR243 sanitized record`

The quality observation must bind the exact browser `providerRunRef` and trigger timestamp.

FR247 supplies:

- provider-mechanical single-face check using the max-two-face quality runtime;
- provider-mechanical bilateral FR24 eye-landmark coverage;
- four explicit operator-observed quality fields.

FR246 supplies the digestless same-frame primary metric only if FR242 accepts all six quality fields.

## Rejections

A rejected capture still occupies its exact FR243 session/capture slot and remains mechanics-only.

FR249 does not silently retry, replace, reorder, or select a better frame.

A later product/research policy may decide whether a rejected slot should cause a new dry-run admission. FR249 does not invent that policy.

## Persistence

FR249 stores only the sanitized FR243 records already returned by FR244.

It does not add:

- raw JPEG persistence;
- raw frame persistence;
- provider payload persistence;
- landmark persistence;
- image digests;
- embeddings;
- identity templates.

## Authority boundary

Coordinator materialization does not mean that an actual participant was present.

Even after an operator executes four real slots:

- operator attestation is not independent verification;
- temporal separation is not independently verified;
- participant identity is not independently verified;
- capture-quality construct validity remains false;
- empirical repeatability remains false;
- interpretation validity remains false;
- traditional binding remains false;
- Production and Commerce remain false.

The FR243 review remains mechanics-only.

## Next frontier

`wire_fr249_into_localhost_operator_surface_then_execute_with_actual_participant_and_live_camera`

No participant action is requested until that operator surface is available.
