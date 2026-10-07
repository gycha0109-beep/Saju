# Fresh independent v3.3 validation — #2337

Watchtower-Track: face-observation-engine

The staged local executor pins `candidate.hairline.multisignal_visible_interface.fr306`
at `0.4.0`. It consumes no real image during preregistration and issues no authority.
Existing 13-image validation/development evidence must not enter this campaign.

## Preregister before seeing outputs

Copy [the private plan template](fresh-validation-plan.example.json) to
`.cache/face-reading/fr2337-private-plan.json`. Replace source paths with fresh local
captures and assign opaque `capture-NN` and `session-NN` labels. For each record,
a human must attest fresh independent capture, `usedForDevelopment=false` and
`derivedFromAnotherCapture=false`. Set `frozenBeforeCandidateExecution=true` only
before any evaluation output has been seen. These attestations cannot be inferred
from pixels, file names, timestamps or model signals.

Required cohorts:

| Stage | Conditions | Minimum |
| --- | --- | --- |
| FR308 | clear central interface; partial bangs; heavy bangs; cropped upper forehead | 1 per condition, 4 total |
| FR312 | M/widow's peak; asymmetric/receding visible contour; upper visibility loss; dark hair/dark background; light hair/low local contrast; ordinary indoor illumination variation | 2 independent captures per condition, 12 total |

FR312 requires at least three opaque sessions. Use different source captures across
cohorts: at least 16 distinct captures. The executor rejects repeated paths, aliases
and hardlinks. Human attestation must also exclude derived crops/contact sheets and
re-encoded duplicates, which filesystem checks cannot establish. No demographic
attributes or identity matching are used.

Optional `faceRoi` and `frameTopTruncated` are private input settings: freeze them in
the plan before execution. Source paths, file metadata, ROI, overlays and all detailed
candidate material remain local in ignored `.cache/face-reading/`. No source-image
digest is computed or stored. The frozen code digest hashes runner program bytes only.

```powershell
npm run face:run:hairline-fresh-validation -- --preregister --manifest .cache/face-reading/fr2337-private-plan.json --campaign .cache/face-reading/fr2337-fresh-v33
```

Preregistration creates a new campaign exclusively. Subsequent stages verify exact
candidate registration, runner code and source file metadata against the frozen plan.
Existing campaigns/outputs/receipts are never overwritten. Metadata checks detect
accidental file replacement; they do not authenticate capture independence or a human
review. Preserve the preregistration unchanged throughout the campaign.

## Bounded execution, human review, FR310

Install the existing image runtime dependencies from the candidate README locally.
On Windows the executor defaults to `python`; elsewhere it defaults to `python3`.
Set `FACE_READING_PYTHON` to the Python executable in a private virtual environment
when needed. No image execution runs in GitHub Actions.

```powershell
npm run face:run:hairline-fresh-validation -- --run-bounded --campaign .cache/face-reading/fr2337-fresh-v33
```

Only the four FR308 images are evaluated. Open each original (referenced in its private
`candidate.json`) and `fr308/capture-NN/overlay.jpg`. Fill `fr308-worksheet.json` review
fields and FR310 privacy/review attestations, including `sourceAndOverlayInspected=true`
only after actual human inspection. Review fields start blank; routing is frozen.

Check visible skin/hair interface, lower fringe/hair-mass edge errors, gross
mislocalization, hidden completion, out-of-frame completion and suppression of candidate
boundaries/red QA lines in fail-closed states. Preview state and numeric signals cannot
produce a disposition or replace human review.

```powershell
npm run face:run:hairline-fresh-validation -- --adjudicate-bounded --campaign .cache/face-reading/fr2337-fresh-v33
```

`fr310-receipt.json` contains the governed result and exact failure reasons. Reject or
repeat stops here. It must not unlock FR312, FR313 or FR305. Even a fabricated eligible
receipt cannot bypass re-adjudication of the frozen, human-reviewed bounded cohort.

## Expanded execution, human review, FR312

Only after `fr310_eligible_for_expanded_validation`:

```powershell
npm run face:run:hairline-fresh-validation -- --run-expanded --campaign .cache/face-reading/fr2337-fresh-v33
```

Review the twelve new originals and overlays; fill `fr312-worksheet.json`, including
explicit source/overlay inspection and FR312 attestations. Routing, session labels and
independence attestations must match the preregistered plan.

```powershell
npm run face:run:hairline-fresh-validation -- --adjudicate-expanded --campaign .cache/face-reading/fr2337-fresh-v33
```

`fr312-receipt.json` retains rejection/repeat reasons. On success only,
`fr312-expanded-validation-receipt.json` can be supplied to the existing
`face:run:fr313-fr319-local -- --input <private-input> --fr312-receipt <receipt>` path.
FR312 success still has `representativeOrdinaryRgbReady=false`: FR313 needs separate
human-reviewed representative ordinary-RGB coverage and exact candidate behavior.
Multiple subjects, sessions and camera contexts are required for that assessment;
no demographic collection or quota is introduced. FR305 admission, real FR314,
same-capture M3 FR316, metric FR318 and seven-reference FR319 remain governed by
their own receipts. Repository capability remains 6/7 until real admission evidence.

On rejection, preserve the campaign as failed evidence. Any engineering revision needs
a new, untouched fresh cohort; the failed samples become development/regression only.

## Verification

```powershell
npx vitest run test/fresh-hairline-validation.test.mjs
```

Tests use synthetic non-image files and injected candidate contracts only. They prove
stage ordering, blocked FR310 paths, no automatic review, private output boundaries,
duplicate exclusion and governed FR312 success/failure handling. They do not constitute
real independent validation, representative coverage, FR305 admission or 7/7 authority.
