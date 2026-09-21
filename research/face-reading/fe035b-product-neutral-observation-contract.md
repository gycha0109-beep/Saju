# FE035B — Product Neutral Observation Contract

Watchtower-Track: face-reading

## Purpose

FE035B freezes the current product-safe neutral observation surface before any traditional source operationalization or calibration authority is introduced.

It does not decide what a face metric means in physiognomy. It only fixes which neutral metrics the current engine may expose, which product region each metric belongs to, which unit it uses, and when a conditional metric may be absent.

## Frozen region surface

The canonical region order is:

1. eye_pair
2. cheek_mid_face
3. mouth_lips
4. chin_lower_face

The existing FE003/FE017 product projection remains unchanged. FE035B sits above that surface as a validation contract and does not widen the preview-engine public export.

## Metric registry

The v1 registry contains 13 current neutral metrics:

- 8 required metrics;
- 5 conditional metrics.

Every metric is bound only to:

- metricRef;
- product-neutral regionKey;
- unit;
- required or conditional presence;
- the existing source module that issues the neutral metric;
- for conditional metrics, one exact unavailable-surface reason.

No traditional meaning, threshold, calibration, classifier, score, rank, claim, or narrative is attached to registry membership.

## Conditional absence rule

A conditional metric is present if and only if its exact unavailable surface is not declared for the region.

This prevents two ambiguous states:

- a neutral metric silently disappearing without an availability reason;
- a metric remaining present while the engine simultaneously declares its source surface unavailable.

The lower-face visible contour remains an allowed unavailable surface even though FE003 does not expose a separate contour metric; it can still make the chin/lower-face region partial.

## Fail-closed rules

FE035B rejects:

- unknown metricRef values;
- duplicate metrics;
- non-finite values;
- metricRef / regionKey drift;
- metricRef / unit drift;
- missing required metrics;
- conditional absence without the matching unavailable surface;
- conditional presence while that surface is unavailable;
- unknown or unsorted unavailable surfaces;
- region order drift;
- extra semantic or trace fields.

## Evolution

FE035B v1 is not mutated in place.

If a future governed neutral metric is admitted, a new contract version is required. Adding a metric to a later neutral registry does not itself authorize traditional source binding or semantic interpretation.

## Authority boundary

FE035B issues no:

- traditional binding authority;
- threshold authority;
- calibration authority;
- classification authority;
- score or ranking authority;
- narrative authority;
- raw geometry exposure;
- provider trace exposure.

The square-broad source-operationalization and calibration frontier therefore remains independent and downstream.
