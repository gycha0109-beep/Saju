# FR162 — Eye-pair capture-condition operational boundary

## Decision

FR161 closed the browser-local real-capture execution gap for the two FR159-preregistered eye-pair metrics. Subsequent local prospective execution produced repeated captures across multiple intentionally varied capture conditions.

Those observations are sufficient to justify an **operational capture-coaching boundary**, but not a validated capture-quality gate, numeric acceptance threshold, repeatability verdict, or traditional-semantic promotion.

FR162 therefore separates:

```text
capture coaching allowed
!= capture quality validated
!= automatic retake gate authorized
!= metric suppression threshold authorized
!= repeatability established
```

## Public evidence boundary

The local empirical execution is recorded only at the authority/privacy level. Public repository evidence does not store participant face images or participant-derived numeric metric observations.

```text
local capture-condition execution occurred               = true
public participant-derived numeric measurements stored   = false
public raw images stored                                  = false
public raw provider payload stored                        = false
public raw landmarks stored                               = false
identity inference performed                              = false
```

One exploratory condition series whose framing did not faithfully reproduce its intended comparison is not used to establish a condition-specific conclusion. No historical capture is retroactively relabeled to repair that mismatch.

## Operational capture guidance

The product may request a bounded, neutral acquisition setup intended to reduce uncontrolled variation:

- frontal neutral pose;
- camera near eye level;
- avoid intentionally extreme near/far framing;
- avoid intentionally high/low camera angle;
- keep framing reasonably consistent across repeated captures.

This guidance is operational risk reduction only. It is not backed by a validated numeric capture-quality threshold and may not automatically reject a user capture.

## Product boundary

Allowed:

```text
user-facing capture coaching = true
```

Not authorized:

```text
automatic capture-quality gate          = false
automatic retake threshold              = false
automatic metric-suppression threshold  = false
user-facing PASS/FAIL quality label     = false
numeric repeatability threshold         = null
numeric capture-quality threshold       = null
```

## Authority boundary

FR162 does not establish:

- empirical repeatability;
- capture-quality validity;
- a validated capture-quality measurement construct;
- calibration;
- numeric quality or repeatability thresholds;
- identity matching or biometric templates;
- construct validity;
- traditional criterion binding or semantic authority.

## Privacy boundary

No raw image, provider payload, raw landmark set, full-face metric geometry, participant-derived numeric measurement, embedding, or identity template is added to public repository evidence by FR162.

## Next frontier

```text
prospective independent-session recurrence
→ evaluate whether bounded capture coaching reduces uncontrolled variation
→ remain descriptive unless an external evaluation criterion supports a threshold
```

Do not introduce an automatic rejection threshold from the current local observations. Do not infer identity or traditional face-reading meaning from capture-condition sensitivity.
