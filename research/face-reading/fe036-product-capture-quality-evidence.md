# FE036 — Product Capture-Quality Evidence Boundary

Watchtower-Track: face-reading

## Design correction after source review

The earlier planning language used pass / limited / blocked as a possible product quality gate. The repository authority does not currently permit that promotion.

FR162 explicitly freezes:

- automaticCaptureQualityGateAuthorized = false;
- automaticMetricSuppressionThresholdAuthorized = false;
- automaticRetakeThresholdAuthorized = false;
- userFacingPassFailQualityLabelAllowed = false;
- numericCaptureQualityThreshold = null.

FR147 and FR148 also keep capture-quality construct validity and thresholds unresolved.

Therefore FE036 is an evidence boundary, not an automatic gate.

## What FE036 does

FE036 consumes only a surface already validated by FE035B.

It may preserve descriptive neutral-observation coverage:

- available;
- partial;
- unavailable surface refs already authorized by FE035B.

It does not reinterpret partial coverage as bad-photo quality.

The following quality dimensions remain explicitly unassessed:

- pose;
- face scale;
- framing;
- blur;
- illumination;
- occlusion.

## FR162 coaching evidence

FR162 contains non-numeric repeat-capture guidance such as frontal neutral pose and near-eye-level camera placement.

FE036 pins that research evidence but does not promote the eye-pair research guidance into a new cross-face product coaching authority.

This avoids silently turning a research-scope allowance into a whole-product rule.

## Authority boundary

FE036 issues no:

- capture-quality pass/fail;
- numeric quality threshold;
- automatic retake rule;
- automatic metric suppression rule;
- quality score;
- classifier;
- traditional semantic authority;
- raw-image persistence;
- raw-provider persistence;
- raw geometry or provider trace.

A future validated capture-quality construct may supersede this boundary through a new contract version. FE036 itself cannot be edited into a threshold shortcut.
