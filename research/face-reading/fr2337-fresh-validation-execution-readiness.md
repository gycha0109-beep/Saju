# FR2337 fresh v3.3 execution readiness

Watchtower-Track: face-observation-engine

Baseline: main `f1c33072db3f0914b0a2ba9764ec39e7f6cef03b`, 2026-10-07.
Related: #1521, #2213, #2337; v3.3 #2325; cohort separation #2358.

## Implementation

The prior combined packet required twelve expanded reviews before it could compile
four bounded findings. The staged local executor now freezes the private protocol
before candidate execution, runs FR308 only, emits a bounded-only FR310 result, and
re-adjudicates that exact cohort before running FR312 images. The FR310 receipt must
match the recomputed result. Reject/repeat never invokes the expanded runner.

The private preregistration binds source routing, opaque sessions, independence and
development-use attestations, optional ROI/crop settings, file metadata and runner-code
digest. Source paths, aliases and hardlinks cannot count as separate captures. Derived
or re-encoded captures still require honest human independence attestation; no identity
matching or image hashing is introduced. Existing campaigns and outputs are not overwritten.
Source/overlay inspection remains explicit human input. Routing cannot change after
outputs. No engineering preview or signal can manufacture a human disposition.

Candidate `candidate.hairline.multisignal_visible_interface.fr306` remains exactly
`0.4.0`; extraction, thresholds and exposure guards are unchanged. Source-image digest
generation/persistence was removed from private runner metadata. Windows private-path
checks now normalize separators in the two directly used packet/executor scripts.

Canonical FR305/FR313 admission, FR318 metric reference and FR319 common-frame payload
contracts remain the existing source of authority; this change adds only a local
preregistration and a bounded-only validation summary status. It does not create a
second measurement payload, methodology, interpretation path or provider identity.

## Validation

- 84 direct governed tests: FR305, FR306, FR308, FR310, FR312, FR313, FR318 and FR319 — PASS.
- 14 staged-executor tests with synthetic non-image sources — PASS. Includes source/code
  drift, duplicate paths/hardlinks, no automatic review, frozen routing, blocked FR310
  reject/repeat, fabricated receipt rejection, and FR312 success/rejection boundaries.
- `npm run lint`, `npm run typecheck`, `npm run build`, `npm run face:typecheck`,
  `npm run face:build`, `npm run face:verify:manifest` — PASS.
- Existing multi-signal candidate/review-packet, FR308–FR312, FR313–FR319 and
  FR318–FR319 executor self-checks — PASS.
- Python 3.14.3 / NumPy / Pillow / OpenCV 4.14.0, synthetic uniform non-face image:
  actual image runner, overlay and private worksheet generation — PASS; unavailable
  boundary suppressed and source-image digest absent. This is runtime smoke only.
- Runtime diagnosis: expected Haar `CascadeClassifier`; OpenCV 5.0.0 lacks that API;
  failure stage = image-runtime dependency initialization; classification = incompatible
  local dependency. Reproduction: candidate image command under OpenCV 5. Resolved in a
  private virtual environment with documented OpenCV `>=4,<5`, plus executor preflight.
- Optional repository-wide `format:check` fails on 2,057 CRLF working-tree files in this
  Windows checkout. Unmodified HEAD `package.json` passed the same stdin formatter;
  no bulk reformat was performed. This is not a required CI workflow gate.

## Remaining real evidence gate

Status: local execution tooling VERIFIED; real fresh validation BLOCKED_EXTERNAL.

No fresh real image or real human judgment was used in this implementation. No FR305
admission receipt was issued. Authority stays 6/7; real FR318/FR319 and Three-Divisions
measurement remain unavailable pending real receipts. Existing 13-image development
evidence is excluded from independent validation.

Collect at least sixteen distinct fresh source captures before evaluating outputs:
four bounded conditions, one each; six expanded conditions, two each; at least three
opaque FR312 sessions. The exact condition matrix, blank-attestation template and
commands are in [the execution protocol](../../tools/face-reading/hairline/README-fresh-validation.md).
After real FR312 success, separately review representative ordinary-RGB coverage for
FR313; FR312 alone cannot satisfy that requirement. Do not invent a fixed image count
for representative coverage where the governed contract specifies no numeric quota.
