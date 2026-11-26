# FR166 — Eye-Pair Post-FR165 Authority Frontier Review

## Purpose

FR165 permits an issued FR164 two-session base plus one or more additional issued FR161 sessions to form a governed multi-session **descriptive-only** recurrence series.

The active empirical workflow has now executed a three-session FR165 series. This review intentionally records **no participant-derived numeric measurements**. Its purpose is to answer the governance question that remains after that execution:

> Does simply asking the participant for more ordinary FR165-boundary captures unlock any new authority?

The answer under the current contracts is **no**.

FR165 explicitly allows more sessions to extend the descriptive series while keeping independent-session evidence, repeatability adjudication, capture-quality validation, inferential statistics, thresholds, identity, construct validity, and traditional-semantic authority unresolved. Therefore collecting Session 4, Session 5, and so on under the same authority boundary may add descriptive observations, but it cannot by itself promote any of those authorities.

## Capture-pause decision

FR166 freezes the following decision:

```yaml
fr165SupportsThreeOrMoreGovernedSessions: true
additionalSameBoundarySessionMayExtendDescription: true
additionalSameBoundarySessionPromotesAuthority: false
additionalSameBoundaryParticipantCaptureRequiredForNextAuthorityFrontier: false
requestAdditionalParticipantCaptureBeforeNewAuthorityPath: false
```

This is not a claim that future capture is useless. Additional capture can still be scientifically useful after a stronger protocol exists. It means only that **more of the same capture procedure is not the next authority-producing action**.

Accordingly, the project must not keep requesting participant captures merely to increase the number of descriptive FR165 sessions while representing that accumulation as progress toward repeatability, quality, independence, or semantic validation.

## Why the current three-session observations cannot create a threshold

FR166 does not accept participant metric values as input and does not persist them. The observed descriptive series cannot be reused to manufacture an acceptance criterion after seeing the outcomes.

The review therefore freezes:

```yaml
deriveThresholdsFromObservedMultiSessionSeries: false
repeatabilityPassFailIssued: false
captureSensitivityPassFailIssued: false
inferentialStatisticIssued: false
calibrationIssued: false
thresholdsIssued: false
```

A future repeatability acceptance rule, if ever admitted, must come from a separately governed and appropriately preregistered authority path. FR166 does not define that rule.

## Actual blockers after FR165

The next authority-producing work is blocked on surfaces that additional same-boundary photos cannot solve:

1. **Eye-pair independent-session provenance/trust path** — FR165 distinct session refs and caller attestations are not independent-session proof.
2. **Governed witness trust root** — no eye-pair witness trust root is established.
3. **Preregistered repeatability acceptance protocol** — no authorized numeric acceptance criterion exists.
4. **Capture-quality construct validation** — no governed measurement construct establishes what capture quality means for this eye-pair metric.
5. **Inferential protocol** — no inferential/statistical authority has been frozen for these observations.
6. **Construct validity** — unresolved.
7. **Traditional binding** — unresolved; no traditional-semantic authority exists.

FR166 keeps each blocker closed rather than converting descriptive recurrence into stronger claims.

## Square-broad-fang trust path is precedent, not inherited authority

The repository already contains a stricter independent-session provenance line for a different criterion:

- FR152 freezes prospective independent-session evidence requirements and states that opaque refs, byte-distinct images, metadata timestamps, upload separation, and operator self-attestation are insufficient on their own.
- FR156 freezes requirements for an externally governed witness trust root and explicitly rejects caller-supplied keys, caller-supplied root refs, digest equality, synthetic credentials, and mathematical signature validity as substitutes for trust.
- FR157 adds only candidate external trust-root material byte intake and still does not establish external authority, trusted witness identity, or independent sessions.

Those artifacts are useful **design precedent** for what a rigorous trust path can require. They are square-broad-fang criterion-specific and are not silently inherited as eye-pair authority.

FR166 therefore freezes:

```yaml
squareBroadFangPathIsCriterionSpecificPrecedentOnly: true
squareBroadFangTrustInheritedAsEyePairAuthority: false
silentCrossCriterionTrustReuseAllowed: false
```

The eye-pair track needs its own governed generalization/review before any such path can support eye-pair session-independence authority.

## No retrospective promotion

Existing FR163/FR164/FR165 sessions remain governed exactly as they were collected. FR166 does not retroactively transform:

- caller same-participant attestation into identity proof;
- distinct session refs into independent-session proof;
- byte-distinct images into independent events;
- separate uploads into independent sessions;
- descriptive recurrence into repeatability validation.

`retroactiveIndependentSessionPromotionAllowed` remains `false`.

## Identity and privacy boundary

FR166 performs no identity matching and issues no biometric template. It accepts no raw participant image and persists no participant-derived numeric measurement.

It also does not persist raw provider responses, landmarks, full metric geometry, source-image digests, exact capture timestamps, geolocation, device identifiers, embeddings, or identity templates.

## Authority state

After FR166:

```yaml
authorityState: post_fr165_authority_frontier_review_capture_pause

eyePairIndependentSessionTrustPathGeneralized: false
eyePairGovernedWitnessTrustRootEstablished: false
preregisteredRepeatabilityAcceptanceProtocolFrozen: false
captureQualityMeasurementConstructValidated: false
inferentialProtocolFrozen: false

independentMultiSessionEvidenceAdmitted: false
multiSessionIndependenceVerified: false
repeatabilityPassFailIssued: false
captureSensitivityPassFailIssued: false
inferentialStatisticIssued: false
calibrationIssued: false
thresholdsIssued: false
identityMatchingPerformed: false
biometricTemplateIssued: false
constructValidity: unresolved
traditionalBinding: unresolved
traditionalSemanticAuthority: false
```

## Next frontier

`generalize_external_session_provenance_trust_path_for_eye_pair_before_requesting_additional_participant_capture_for_authority_promotion`

The next work should review and generalize the external provenance/trust requirements for the eye-pair criterion. **No additional participant capture is required to perform that governance work.**
