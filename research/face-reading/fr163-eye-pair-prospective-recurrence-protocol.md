# FR163 — Eye-pair prospective recurrence protocol

## Decision

FR162 froze an operational capture-coaching boundary after the first local real-capture condition series. FR163 now freezes the next empirical step **before any future-session capture is collected**.

The purpose is narrow:

```text
future coached FR161 series
→ compare descriptive eye-pair metric recurrence across study-local session refs
→ do not call those refs independently verified sessions
→ do not issue repeatability, quality, threshold, identity, or traditional-semantic authority
```

FR163 does not commit user images, provider payloads, landmarks, full metric geometry, or participant-derived metric values.

## Why A–G are not prospective recurrence evidence

A through G were collected before FR163 existed. They remain useful local descriptive execution history, but FR163 forbids retroactive admission of those captures as evidence under a protocol that did not yet exist.

```text
historical A-G
!= post-FR163 prospective recurrence evidence
```

The next recurrence series must be captured after this protocol is frozen.

## Prospective session design

A future recurrence description requires at least two study-local session refs. Each session is expected to contain a governed FR161 repeated-capture series with at least two byte-distinct source captures and the FR162 capture-coaching conditions:

- frontal neutral pose;
- camera near eye level;
- no intentionally extreme near/far framing;
- no intentionally high/low camera angle;
- consistent framing and capture setup as far as the caller can attest.

The protocol does not require or persist exact timestamps, geolocation, or device identifiers.

## Independent-session authority boundary

A study-local `sessionRef` is organizational metadata only. The following are explicitly insufficient to prove session independence:

```text
operator-declared distinct session refs
caller says "different day"
user-supplied timestamp
byte-distinct source captures
same-participant attestation
```

The repository already contains a stricter external-witness / trust-root research spine in FR152–FR157 for another face-reading criterion. That precedent shows why opaque refs and self-attestation must not silently become independent-session proof. FR163 does **not** couple the eye-pair metric to those criterion-specific artifacts and does not claim their currently unresolved trust root is available here.

Therefore:

```text
independentSessionAdmissionImplementedForEyePair = false
externalWitnessTrustRootAvailableToThisProtocol = false
independentSessionClaimAllowed = false
```

A future capture collected at a meaningfully separate time may still be compared descriptively under caller attestation, but it must be described as a **prospective recurrence session**, not an independently verified session.

## Descriptive comparison boundary

FR163 permits only descriptive comparison such as:

```text
count / min / max / mean / range
range / mean (descriptive convenience)
absolute mean difference
relative mean shift (descriptive convenience)
```

It does not authorize:

- repeatability PASS/FAIL;
- capture-sensitivity PASS/FAIL;
- a numeric acceptance threshold;
- an automatic capture-quality gate;
- automatic retake or metric suppression;
- correlation/redundancy conclusions from the current small sample;
- identity matching;
- traditional face-reading meaning.

## Product boundary

The only product-facing authority added by the preceding FR162 remains capture coaching. FR163 does not add an automatic quality classifier.

```text
user-facing capture coaching = allowed
automatic quality gate       = not authorized
automatic retake threshold   = not authorized
metric suppression threshold = not authorized
repeatability label          = not authorized
```

## Privacy boundary

Public repository evidence continues to exclude:

```text
raw images
raw provider responses
raw landmarks
full-face metric geometry
participant-derived numeric metric values
exact capture timestamps
geolocation
device identifiers
face embeddings
identity templates
```

## Next frontier

After FR163 is merged, collect a **new post-protocol coached recurrence series at a later session**, execute it through FR161, and compare it descriptively with another post-FR163 recurrence session when available.

Until independent-session authority exists, report only attested session separation and descriptive recurrence. Do not promote the result into repeatability, quality, threshold, identity, or traditional-semantic authority.
