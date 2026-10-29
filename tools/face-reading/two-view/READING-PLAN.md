# Item-first local face observation work

Issues #2698, #2729. Watchtower-Track: face-observation-engine.

The implementation order is source morphology condition → required observation →
photo evidence → an explanation of what the evidence establishes. A mask or a
new scalar alone does not complete an item. A historical interpretation rule,
observable model geometry and admitted traditional condition are distinct contracts.

| Item                        | Existing source owner                                       | Required observation                                                                                   | Current gap / work order                                                                                         |
| --------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Eye endpoint direction      | FR311 `eye.tail_down`, supported source lineage FR176/FR182 | Paired image-medial/image-lateral endpoint heights in an eye-relative frame, then endpoint-role review | First local slice below; preserve source binding as ungranted                                                    |
| Forehead / Three Divisions  | T4 methodology, T5 span specifications, FRB006              | Exact admitted hairline/brow/nasal-apex/lower-face references in the specified common frame            | Close the actual hairline/reference seam; no oval-top or mask-box substitution, no invented equal-band threshold |
| Nose root/bridge/tip forms  | FR311F                                                      | Distinct root/bridge/tip/wing/nostril observations matching a chosen complete source condition         | Choose and review each geometric definition; profile nose-mask width is not root height or physical protrusion   |
| Lip forms                   | FR311I                                                      | Visible lip components and the dimensions/orientation needed by a chosen complete source clause        | Current closed mouth span and profile lip-box width do not supply all thickness/form roles                       |
| Ear relative position/forms | FR311L, including separately held cross-region contexts     | The specified visible ear feature and corresponding eye/brow reference; visibility and role evidence   | Candidate mask height is not an entire ear, ear root or source-authorized cross-region comparison                |
| Lower face / chin           | Exact source condition must be selected before a classifier | Visible lower-face references and a reviewed profile boundary definition                               | Existing model-oval ratios do not identify a hidden chin point or bone contour                                   |

## First slice: eye direction observation and source morphology explanation

Source: `packages/face-reading/src/traditional-eyebrow-eye-interpretation-fr311.ts`,
term `eye.tail_down`, expression `目尾相垂`, neutral gloss describing downward
eye tails. The source term has `directMetricBindingAuthorized=false`. The server
imports that term directly using the repository's Node24 runtime; it does not
copy a second interpretation catalogue or expose historical outcome claims as
results for the supplied people. `reading-catalogue.mjs` projects source identity,
shape description, references and required observation only.

The new observation is
`engineering.frontal.model-eye-endpoint-direction@0.1.0`:

1. Require one explicit frontal image and eye/class alignment for EACH eye,
   using the existing radius/support rule separately for the two cycles. One
   detected eye cannot supply support for a combined pair. The ear pass's older
   combined eye check remains unchanged to preserve its outputs.
2. Validate the two provider eye cycles and project decoded-pixel points onto
   the same eye-pair-relative image-plane frame used by existing frontal metrics.
3. For each cycle, require a unique minimum-X and maximum-X point. The endpoint
   nearer the pair centre is **image-medial**, the other **image-lateral**.
4. Report `(outerY-innerY)/(maxX-minX)` and
   `atan2(outerY-innerY,maxX-minX)` in degrees. Positive means image-lateral is
   lower on this model frame; no source or calibrated tolerance is invented.
   A machine-roundoff bound of 32 epsilon times projected coordinate magnitude
   snaps numerical cancellation to zero; this is not a model error or source
   classification tolerance.
5. Label sides by image position, never anatomical laterality. Tied endpoints,
   clipping, invalid/collapsed topology, missing/multiple faces or a profile role
   withhold output. Model localization errors/occlusion remain possible.

These extrema need not be the true anatomical canthi. The UI therefore reports
model-boundary direction and the source's shape condition together, but does not
declare that `目尾相垂` is satisfied. `traditionalBindingAuthorized` is always
false. No FR311 geometry permission, FRB006/T5 binding, semantic claim, publication
decision or Product authority is changed by this local observation.

The per-photo card is the primary new result: what source morphology is being
examined, what the photo's model boundaries show, the two continuous angles, and
the endpoint-role gap. Missing evidence gets a specific reason. Existing raw
metrics remain available below it; adding masks is not the completion criterion.

## Persistence and completion

Parser writer revision 0.6 adds only allowlisted eye scalars/status/source-term
identity. Historical 0.1–0.5 schemas remain read-only without invented eye evidence.
Screened 0.5 history retains all region/profile fields. New observations are role
bound on save/restore; raw endpoint coordinates/crops are never stored.

The original eight frontal values and their normalization stay unchanged; the
internal eye-pair frame is shared with the new calculation. All existing masks,
profile ratios and numeric rows must compare unchanged on the 23 local captures.
Synthetic geometry invariants, strict schema/role/authority rejection, actual
source-to-card execution, fresh restore and failure/retry are required. These
prove the observation/explanation path; they do not promote the traditional
condition or produce an admitted traditional reading.

Next substantive seam is endpoint-role review for this item, with exact source
condition support kept intact. Do not select arbitrary thresholds to turn a
model slope into a traditional named form.

## Current multi-region assessment (revision 0.7)

The per-photo assessment now enumerates eight stable UI items: eyes, brows,
lips, nose, ears, forehead/Three Divisions, cheeks, and jaw/lower face. A source
term or region is imported directly when present. Forehead references remain
incomplete; cheek and jaw morphology source conditions remain unselected.
An empty source identity is explicit and never borrowed from another region.

`morphology-geometry.mjs` runs in the existing worker after single-face location,
in decoded-image pixels using the shared eye-pair frame. New observations do
not replace, change, or strengthen any original measurements or masks:

- Brows: require independent class support at both brow paths and both eyes,
  no clipping and positive spans. Divide each brow X span by its corresponding
  model eye X span, sorted by image position. Compare to one as an intra-photo
  arithmetic relation, without a population threshold. A wider span does not
  assert that both brow ends cover both eye ends or satisfy `眉過眼`.
- Lips: require eye support, lip class agreement and both upper/lower classes.
  Validate exactly two closed model cycles. Choose the wider envelope as the
  outer candidate, require nested extents, and intersect each cycle at the
  outer X-span midpoint. Require exactly two intersections and ordered inner
  and outer heights. Upper thickness, lower thickness and opening are separate
  differences divided by outer width. Compare upper/lower thickness only at
  this section; do not classify the whole lip as thick/thin or source-balanced.
- Nose: in a face crop with independent eye support and lip support, project
  nose-class pixel centres into the
  same frame. Report X/Y extents divided by eye-centre spacing. This is partial
  evidence for the region, not bridge elevation, root depth or tip protrusion.
  The pinned provider exports no nose topology; no nose landmark alignment
  is asserted. Detached/incorrect class pixels can still affect this extent.

The three geometry results have independent unavailable reasons. Profile slots
withhold all three and use only existing visible-profile evidence where
available. The assessment reuses source-bound eye direction, validated profile
ratios and capture/view/method-bound original lower-face rows. An ear candidate
is partial evidence; its completeness, roots and lobes are not inferred.

Assessment states are deliberately distinct: `observed` means a defined model
geometry comparison ran; `partial` means a region has bounded measurements but
not its requested morphology; `unavailable` carries exact missing requirements.
They are local presentation states, not source admission or accuracy scores.
The only new classification identifiers describe within-photo model-span or
central-lip comparisons. No named-form alias, arbitrary tolerance, personality
or personal outcome rule is generated. The epsilon guard is arithmetic roundoff
only. Classification/explanation is pure and rebuilt from each capture's
evidence rather than stored as a second source of truth.

Writer 0.7 adds allowlisted `morphology` scalars and missing reasons; 0.6 eye
history remains read-only and retains its fields. Raw points, pixel centres,
ROIs and original pixels stay in worker memory. Profile/authority forgeries
are rejected; previous-result comparison never reuses current geometry.

Completion requires direct geometry invariants and rejection tests, source-to-
card tests, all-23 real local execution, old mask/scalar equality, fresh restore
and failure/retry checks. This revision completes the multi-region assessment
flow, with the listed unavailable morphology measurements still unimplemented.

### Local execution evidence (2026-10-24)

All 23 private captures executed under writer 0.7. Brow spans were available
on 13, central lip measurements on 18, and nose class extents on 18; eye
direction remained available on 18. The UI rendered eight items on all 23
captures at three viewport widths (552 cards, 69 alignment checks). All 161
masks and original scalar/profile/count fields were unchanged from preserved
0.6 history. Nineteen comparisons with the original frontal implementation had
zero mismatches; legacy mask bytes and source metadata were unchanged.

56 direct tests, typecheck, scoped lint and formatting passed. Fresh live
restoration, rejected forged morphology authority/profile evidence, historical
writer rejection, unchanged pointer on invalid saves, previous comparison,
failure/retry/cancel-retry and browser-local upload checks passed. Aggregate
evidence remains in the ignored intake under `morphology-2729-verification.json`
and `morphology-2729-recovery.json`; source paths and pixels are not published.
These are local runtime/preservation results, not human accuracy validation,
source-role admission or completed traditional named-form classification.

### Contour validation correction (2026-10-29)

The lip calculation now checks simple, strictly nested polygons in addition to
the original bounding-box and centre-section checks. A contour that crosses,
touches, or leaves the outer contour cannot establish separated upper/lower
bands and returns `SECTION_UNAVAILABLE`. This includes a concave outer boundary
whose vertices enclose the inner vertices but whose edges cross the inner edges.
The orientation guard addresses floating-point cancellation only; it introduces
no source or model-error threshold. Independently supported brow and nose
observations remain available when the mouth is withheld.

The scalar validator also materializes both required brow ratios before checking
them, so a sparse two-slot array cannot bypass validation. These are corrections
to the existing candidate contract, not new anatomical or traditional authority.
Existing private scalar summaries contain no contours and cannot retroactively
prove this stronger runtime check; rerun the original local captures to obtain
fresh observations. The 2026-10-24 all-23 evidence above predates this correction.

Validation on 2026-10-29: 62 tests across the seven direct two-view/geometry/parser
test files, TypeScript typecheck, build, scoped ESLint and formatting pass.
Regression cases cover protrusion within unchanged bounding boxes, concave
edge escape, self-intersection, touching boundaries, sparse brow pairs and
reflection/topology permutation. Real-photo re-execution remains outstanding.
