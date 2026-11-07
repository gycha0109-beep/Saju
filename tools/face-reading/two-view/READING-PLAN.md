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

## 2026-11-05 현재 단계: 29개 정규 특징별 로컬 증거 점검

기존 8개 형태 카드와 29개 정규 특징은 서로 다른 분류입니다. 새 읽기 전용 점검기는 FR293의 실제 29개 키를 기준으로, 기존 사진 분석에서 저장된 **후보 수치가 어느 항목과 관련 있는지** 집계합니다. 눈/눈썹/입/코/귀/하관의 모델 기반 근거를 정규 실측이나 전통 형태 자동 판정으로 승격하지 않습니다.

- 코드: `tools/face-reading/two-view/feature-coverage.mjs`; 실행 명령: `npm run face:coverage -- --schema-only` 또는 `--intake <private-dir>`.
- 정규 계산 기능 18개와 입력 사진으로 자동 관측 가능한 기능은 별개로 표시합니다. 데이터가 없는 경우 0장이라는 사실을 분명히 드러냅니다.
- 개인별 원본, 촬영 ID, 눈썹/귀 마스크, 생체 재구성 가능한 좌표는 집계 출력에 없습니다.
- 집 PC 비공개 23장 자료에 접근할 수 없는 경우 해당 사진의 최신 실행·정확도·사람 판정은 **미완료**로 유지하고 코드·합성 테스트만 완료 처리합니다.

## 2026-11-05 사진별 눈 형태 후보 연결

기존 `frontal-metrics.mjs`가 이미 계산하는 눈 경계의 종횡비, 얼굴 윤곽 대비 눈 폭,
눈 중심 간격, 양쪽 눈 폭 차이 및 종횡비 차이를 **동일 사진의 눈 항목 카드**에 표시합니다.
계산기나 원본 관측·저장 계약을 중복 구현하지 않습니다. 반드시 같은 캡처·정면 시점·
모델 버전에서 나온 후보만 재사용하고, 실제 0인 좌우 차이는 정상적인 값으로 유지합니다.

눈꼬리 관측이 실패해도 다른 눈 비율이 있으면 그 부분만 `partial`로 표시하고,
과거 분할 화면에 현재 측정값을 섞지 않습니다. 이 수치는 사진 평면 모델 경계의
연구 후보일 뿐 실제 쌍꺼풀 유형, 사람 정답, FR293 정규 입력, 전통 관상형 판단이나
제품 해석 권한을 발행하지 않습니다. 실제 23장 재실행은 별도 검증 과제입니다.

## 구현 워크로그 (2026-11-05부터)

[얼굴 전체 관측 구현 워크로그](../../../research/face-reading/whole-face-implementation-worklog.md)에
각 실제 작업의 변경·검증/CI 근거·남은 작업·다음 작업·블로커를 기록합니다.
2026-11-05까지의 이전 커밋은 **사후 정리 기록**이며, 이후 개발 커밋은 워크로그를
함께 갱신합니다. 실사진 원본·파일명·생체 좌표는 기록하지 않습니다.

## 2026-11-07 눈썹 사람 표시와 분할 후보의 기술 비교

기존 로컬 두 시점 화면에 저장된 눈썹 중심선 사람 표시가 있을 때에만, 동일 정면 사진의 최신 ResNet18 눈썹 분할 마스크와 비교합니다. 원본 이미지 좌표계로 변환한 분할 마스크의 가로열별 중심점에서 사람 표시 선분까지의 평균 거리(px), 최대 거리 및 비교 가능한 열 수를 각각 보여줍니다. 사람이 일부만 표시한 경우 표시 범위 밖으로 선을 연장하거나 전체 눈썹에 대입하지 않고, 좌우 눈썹은 서로 독립적으로 보류할 수 있습니다.

결과는 브라우저 메모리에서만 계산하며 원시 좌표·마스크·사진을 정규 저장소, 공개 저장소 및 전통 판독 엔진으로 전달하지 않습니다. 사람 표시 0건이면 비교는 HUMAN_REVIEW_UNAVAILABLE로 보류합니다. 한 명의 수동 표시선은 독립적인 사람 정답이 아니므로 이 차이값을 정확도, IoU, 전통 관상형 판정, F0 관측 승인 또는 제품 해석 완료의 증거로 해석하지 않습니다.

## 2026-11-07 코 세부 형태 사람 검토 경로

기존 로컬 두 시점 검토 화면을 재사용해 정면 원본 사진에서 코끝의 한 점과
화면 기준 좌우 콧볼/콧구멍의 경계선을 사람이 독립적으로 표시할 수 있습니다.
사람이 직접 확인한 결과는 보임·일부만 보임·가림·화면 밖·경계 안 보임·판단 보류로 분리하고,
원본 사진 SHA-256·검토 개정·시각에 묶어 비공개 intake JSON에만 저장합니다.
화면 기준 좌우를 해부학적 좌우로 승격하지 않습니다. 기존 눈썹과 코 표시 도구는
모드를 명시적으로 전환하여 같은 사진 위에 중복 그리기가 발생하지 않게 합니다.

Pinned ResNet18의 코 영역 마스크는 코끝·콧볼·콧구멍의 실제 해부학적 경계 정답이 아닙니다.
실제 사람 검토 없이 자동 분류·정규 F0 판정·전통 관상형 연결·제품 해석·학습 권한을 발행하지 않습니다.
손상된 검토 저장소와 원본 사진 바뀜은 재사용·덮어쓰기를 차단합니다.

## 2026-11-07 귀 외곽·귓불·부착부의 검토와 2D 마스크 후보

기존 로컬 정면·측면 검토 화면에 귀 전체 모델 마스크의 가시 영역 후보(상대 가로폭,
세로높이, 면적, 이미지 평면의 중심 위치)를 연구용으로 표시합니다. 분할 마스크는
기존 ResNet18 귀 클래스 7/8을 재사용하며, 모델 경계의 겹침·분할 파편 및 사진
경계에 걸린 부분을 부위별로 보류합니다. 이 출력은 가시 영역의 **연구 후보**일 뿐
귓바퀴, 귓불, 부착부, 좌우 해부학적 귀, 두께, 펼쳐짐을 자동 식별한 결과가 아닙니다.

같은 기존 사진 화면에서 정면/측면 사진의 귀를 화면 기준 좌·우로 구분하고,
귓바퀴 외곽선·귓불 윤곽·얼굴과 귀가 만나는 위치를 사람이 직접 표시할 수 있습니다.
가림/사진 밖/판단 불가를 부위별로 독립 처리합니다. 입력은 원본 사진 SHA-256과
촬영 방향 및 수정 시각에 묶어 별도의 비공개 intake 파일에만 보존합니다.
기존 사람 검토 파일이 손상되거나 원본이 바뀌면 덮어쓰거나 해당 기록을 사용하지 않습니다.
이 화면은 검증되지 않은 사람 표시를 독립 정답으로 승격하지 않습니다.

기존 29개 정규 항목·18개 계산기·11개 하드갭은 변경하지 않으며, 새로운 관상형
임계값·전통 해석·F0 정규 관측·제품 권한을 발급하지 않습니다. 정면 사진에서
귀의 실제 펼쳐짐/두께를 판정하지 않습니다. 실제 사람 검토는 아직 0건입니다.

## 2026-11-07 머리–피부 접경 후보의 실사진 표시와 기존 헤어라인 비교 경로

기존 로컬 두 시점 화면과 pinned ResNet18 얼굴 분할에서 이미 생성되는 머리카락–피부
접경(interface) 오버레이를 재사용해 정면 사진의 접경 가시 가로열, 분리된 접경
구간 및 사진 내 상대 좌표를 **연구 후보**로 표시합니다. 분리된 접경, 한 열의
복수 접경, 사진 가장자리 절단 및 지나친 파편을 명시적으로 일부 관측/관측 불가로
처리합니다. 이는 전체 머리카락과 피부가 만나는 픽셀이며 이마의 실제 해부학적
모근선, 이마 높이, M자 모양 또는 전통 관상형의 확정이 아닙니다.

끊어지지 않은 단일 접경 후보만 기존 비공개 hairline-boundary-reference.mjs
비교 도구의 model candidate 입력 형식으로 변환할 수 있습니다.
비교 도구가 요구하는 원본의 SHA-256과 독립 사람 표시선 검증을 생략하지 않으며,
끊김·가림·경계 절단 사례는 변환에서 보류합니다.
기존 도구의 거리 결과도 기술적 탐색값이고 사람 정답 정확도나 상업적 모델
사용권 승인으로 승격하지 않습니다.

브라우저 계산값·후보 경계 좌표와 개인 원본 이미지는 공개 저장소, 전통 판독,
정규 F0/제품 저장 계약으로 보내지 않습니다. 기존 29개 항목·18개 계산기·11개
하드갭과 전체 7단계 로드맵은 그대로 유지합니다.

## 2026-11-07 입술·인중의 사람 경계 검토 경로

기존 두 시점 로컬 검토 화면의 정면 원본 사진에서 윗입술·아랫입술
보이는 경계, 화면 기준 좌·우 인중 경계와 입꼬리 위치를 사람이
각각 표시할 수 있습니다. 표시·일부 표시·가림·화면 밖·보이지 않음·판단
보류를 독립적으로 기록하고, 표시선·점 좌표는 원본 이미지 정규화 좌표계로
비공개 intake JSON에만 저장합니다. 원본 SHA-256과 검토 개정 번호를
확인하며 이전 저장 파일이 손상되면 덮어쓰지 않습니다.

기존 pinned ResNet18의 윗입술/아랫입술 클래스 면적·폭 후보는 실제
해부학적 붉은입술 경계·인중 주름·입꼬리 정답과 다릅니다.
사람 검토가 실제 입력되지 않은 경우 독립 정확도를 주장하지 않으며,
모든 검토선은 연구 후보일 뿐 정규 F0, 전통 관상 판정, 모델 학습,
제품 사용 권한을 발급하지 않습니다. 기존 29개 항목, 18개 계산기,
11개 하드갭을 수정하지 않고 PR #2453의 동일 로컬 검토 화면을 재사용합니다.

## 2026-11-07 눈꺼풀 주름·윗경계·덮임 경계의 독립 사람 표시

기존 로컬 두 시점 검토 화면의 정면 원본에서 화면 기준 양쪽 눈꺼풀의
윗경계, 주름선, 덮임 경계를 세부적으로 구분해 사람이 선을 표시할 수 있습니다.
기존 eye-fold 상태 라벨(쌍꺼풀 선 보임/덮임/보이지 않음)은 변경하지 않고
새 세부 경계 계약을 별도 연구 자료로 저장합니다. 선 보임, 일부 관측,
가림, 화면 밖, 보이지 않음, 판단 보류를 각 경계별로 독립 처리합니다.

사람이 직접 표시한 원본 이미지 정규 좌표만 사진 SHA-256과 개정 정보에
연결하여 비공개 intake에 원자 저장합니다. 기존 파일 복원에 실패하거나
원본 사진이 변경된 경우 임의 덮어쓰기와 기록 재사용을 차단합니다.
모든 선은 독립 사람 정답/반복성 검증 전 연구 후보이며 실제 3D 돌출,
주름 깊이, 전통 관상형, 정규 F0, 모델 학습 및 제품 권한에 승격되지 않습니다.

기존 29개 정규 항목/18개 계산기/11개 하드갭과 pinned 모델, 눈꺼풀
라벨·수치 및 사진 결과는 변경하지 않습니다. 사람이 검토한 경계는 아직
0건이므로 정량 정확도 또는 동아시아 얼굴 일반화 성능을 주장하지 않습니다.

## 2026-11-07 기존 검증 저장 결과의 사진별 29개 관측 상태 분해

기존 FR293/FR282 29개 정규 항목, FR293의 18개 계산기·11개 하드갭과
`feature-coverage.mjs`의 10개 협소한 엔지니어링 대리 근거 매핑을 재사용한다.
새 얼굴 계산기·모델·관상 판단을 만들지 않고, 저장된 개별 정면/측면 사진마다
`not_evaluated`, `calculation_only`, `candidate_only`, `partial`, `unavailable`
상태를 구분한다. `observed`는 독립 사람 정답/정규 사진 관측 권한을
확보하기 전까지 0개다. 사진 1장 기준 29개 상태의 합계를 교차검증한다.

`private-photo-readiness-run.mjs <private-intake-folder>`는 기존의 비공개
intake와 원본 사진, 저장 완료된 계산 결과/분할 기록 및 이전 29개 집계를
교차 검증한다. 18장 원본을 다시 SHA-256으로 읽고 고유한지 확인하지만
해시나 원본 경로를 출력·Git에 기록하지 않는다. 기존 집계의 항목별
모델 후보 사진 수와 새로운 사진별 결과 합계가 다르면 실패한다.
파일은 기존 비공개 intake에만 새 버전으로 저장하며 결과가 다르면
동일 파일을 덮어쓰지 않는다.

단위는 `사진 × 정규 항목`이고 정확도 점수나 전통 관상형이 아니다.
사진별 세부 상태와 캡처 참조는 비공개 JSON에서만 확인하고,
공개 WORKLOG에는 항목 개수·상태별 건수·실행/검증 근거만 남긴다.
새 관상형 매핑, F0 승인, 상업 권한, 3D 기준은 변경하지 않는다.
