# Item-first local face observation work

Issue #2698. Watchtower-Track: face-observation-engine.

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
