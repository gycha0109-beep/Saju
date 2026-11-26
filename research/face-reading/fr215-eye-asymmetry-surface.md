# FR215 — Role-invariant individual-eye asymmetry surface

Issue: #1061  
Stacked on: FR214 / PR #1059

## Decision

FR210 deliberately leaves one product surface unresolved:

`product_individual_eye_asymmetry_surface`

FR215 closes that gap without resolving anatomical laterality.

## Reused geometry

FR215 reuses:

- issued FR77 canonical-aligned metric geometry;
- the same two pinned FR24 16-point closed eye cycles already used by FR158/FR178.

The two cycles are consumed as an unordered pair. Provider topology symbols are selectors only and are not emitted as semantic eye sides.

## Continuous axes

For each eye cycle FR215 computes:

- X bounding span;
- geometric Y/X bounding-span ratio;
- mean 3D closed-cycle turning angle.

It then emits only symmetric absolute differences:

1. `|xSpanA-xSpanB| / mean(xSpanA,xSpanB)`
2. `|yToX_A-yToX_B|`
3. `|turnA-turnB|`

These axes are invariant to eye-cycle swap. The underlying cycle statistics are invariant to closed-cycle start index and orientation.

## Interpretation boundary

FR215 does not identify:

- left versus right anatomy;
- which eye is larger, rounder, or more angular;
- physiological eye aperture;
- diagnosis, defect, score, rank, or attractiveness;
- any traditional physiognomy state.

It is a neutral visible-geometry asymmetry surface only.

## Fail closed

FR215 rejects:

- unissued/forged FR77 geometry;
- FR24 topology drift away from exactly two 16-point cycles;
- non-finite points;
- degenerate adjacent cycle edges;
- non-positive X span.

No epsilon denominator, clamp, imputation, calibration, threshold, or fallback is introduced.

## Authority

Production and Commerce remain false. No classifier or traditional binding is issued.
