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

## 2026-11-07 저장된 사진별 29개 관측 상태의 기존 화면 연결

기존 비공개 intake의 사진별 `whole-face-per-photo-readiness-v1-*.json`을
기존 두 시점 로컬 화면에 연결한다. 새로운 얼굴 뷰어나 정규 F0 측정기가
아니며, 정규 29개 기능의 `모델 후보·계산기만 연결·현재 관측 불가`
등을 사진별로 접어서 볼 수 있게 한다.

서버는 현재 활성 계산기/분할 실행의 ID, 18개 원본 SHA-256, 이전 집계의
29/18/11 계약, 보고서 내부 provenance 및 행별 권한 플래그를 검증한다.
불일치나 비공개 보고서 부재 시 이전 관측을 최신으로 표시하지 않는다.
원본 경로·SHA·랜드마크·마스크·개인별 측정값은 화면 응답에 노출하지 않고
사진 식별자는 기존 로컬 검토 화면의 불투명 캡처 ID만 재사용한다.
새 분석을 실행한 화면에서도 이전 저장 실행 상태를 즉시 숨긴다.

로컬 UI의 항목 상태는 엔지니어링 증거 수준이지 정확도·전통 형태·
사주 명식·캐릭터/제품 해석 권한이 아니다. 기존 29개 항목,
18개 정규 계산기, 11개 하드갭, 기존 원본/출처/브라우저 저장 계약 유지.

## 2026-11-08 FR294 공식 하드갭 4개 연구 경로와 실제 사진 18장 상태 연결

기존 로컬 두 시점 검토 화면의 사진별 정규 29항목 상태에
`packages/face-reading/src/rgb-selfie-hard-gap-frontier-fr294.ts`의 11개
미지원 항목과 네 연구 경로를 연결한다. 새 FR294 키 레지스트리를 만들지 않고,
TypeScript 구문 트리에서 공식 원본 `FR294_HARD_GAP_FRONTIER`만 읽는다.
원본의 11개 키, 5개 새 이미지 모델, 4개 상대 3D 비교, 1개 귀 가시성,
1개 현 RGB 판정 불가 구성이 변경되면 연구 화면은 fail-closed 한다.

비공개 저장 결과가 최신 실행 ID·원본 SHA·29/18/11 계약을 통과한 경우에만
각 사진의 보류 경로와 공식 `nextEvidenceRequirement`를 표시한다.
기존 18장 522 상태 중 FR294 11항목 × 18장 = 198개의 경로 대조:
새 이미지 모델 90개 unavailable, 상대 3D 72개 unavailable,
귀 가시성 5개 unavailable/13개 candidate_only,
현행 RGB 불가 18개 unavailable. 총 `unavailable=185`이며
FR294 이외 항목의 unavailable은 0개로 검증됐다.
**후보 13개는 관상 항목 승인/독립 사람 정답/정확도 평가가 아니다.**

화면으로 전달하는 정보는 기존 불투명 사진 참조, 항목 키, 공식 연구 경로,
다음 필요한 증거 문구뿐이다. 원본 사진 경로·원본 SHA·좌표·마스크·
원시 생체측정값은 노출하지 않는다. FR282/FR293/FR294 정규 권한,
FR311 문헌/전통 판정, Production/제품/모델 학습 권한은 변경하지 않는다.

## 2026-11-08 FR294 이미지·귀 가시성 6개 항목의 실제 사람 검토 증거 연결

기존 공식 FR294 하드갭 11개 중 `new_image_model` 5항목과
`ear_visibility_then_image_model` 1항목에 대하여 **이미 저장 가능한**
눈꺼풀 주름 분류(`eye-fold-reviews`), 눈꺼풀 주름·덮임 윤곽
(`eyelid-contour-reviews`), 귀 외곽(`ear-detail-reviews`)의
유효한 동일 원본 검토 여부만 연결한다.

기존 비공개 서버의 SHA-256 원본 일치 검사에 통과한 기록만 사용한다.
해당 검토 저장소 복원 실패 또는 무효·불일치 레코드가 발견되면
FR294 사람 증거는 `withheld`로 전환한다. 화면에는 6개 하드갭별
"사람 검토 미기록", "단일 검토 저장", "독립 사람 정답·반복 관측 미검증",
"직접 사람 기준 검토 경로 없음"을 명시한다.
눈썹 중심선 검토는 눈썹 *모발 밀도* 정답으로, 이마의 얼굴 윤곽
후보는 *헤어라인* 사람 정답으로, 귀 외곽은 귀 *두께·내부 구조*
검증으로 환원하지 않는다. 다른 5개 3D/현행 불가 하드갭은 변하지 않는다.

사람이 눈꺼풀/귀/주름 검토를 새로 저장할 때 기존 FR294 검토 증거
요약은 즉시 무효화하고, 최신 검토 요약은 화면을 다시 로드한 뒤
서버가 전체 사진 SHA 및 저장 상태를 다시 확인해야만 표시한다.
새 독립 검토자 ID, 동일 인물 반복 촬영 증거, 검토자 간 일치도,
실제 정확도·정규 F0 승격은 **생성하거나 주장하지 않는다.**

현재 비공개 실사진 18장 기준 실제 저장된 eye-fold/eyelid-contour/ear
사람 검토는 **0/0/0건**, 각 항목별 독립 정답 0건.
사진별 마스크·좌표·SHA·원본 경로는 새 FR294 요약에 담지 않는다.

## 2026-11-08 — FR294 독립 검토자 코드 쌍의 비공개 비교 계약

기존 FR294 하드갭 중 실제 사람 주석 경로가 있는 **눈꺼풀 주름 분류**
(`eye.eyelid_crease_or_hooded_category`)와 **귀 외곽 가시성**
(`ear.visible_boundary_height_shape`)만 2명의 **서로 다른 검토자 코드**에
대한 동일 원본의 기술적 대조 대상으로 허용한다. 이마·눈썹 밀도·입술 색상은
직접 대응하는 사람 기준 주석 경로가 없는 상태이므로 추가하지 않는다.

선택적 로컬 보호 파일 `<intake>/fr294-independent-pairs-private.json`의
`schemaVersion=myeongha-fr294-independent-screen-review-pairs-v1` 및
`pairs` 배열에서 각 증거는 `captureRef`, `sourceSha256`,
`featureKey`, `viewRole`, 서로 다른 검토자 코드·세션 코드 2개,
원본 보기·상호 비열람 선언, 비공개 연구 동의 선언,
`usedForModelTraining=false`를 요구한다.
검토 각각에 UTC `reviewedAt`, 원본 영상의 `imageLeft/imageRight`
범주 판정이 필요하다. 코드·세션은 **가명 참조**이며 실명·연락처가 아니다.
현재 원본 바이트 SHA와 사진 역할이 일치하지 않으면 결과 전체를 보류한다.
파일 파손/스키마 불일치/중복 쌍/검토자 코드 중복도 모두 보류한다.

서버는 **파일을 생성하지 않고, 자동·외부 수집 또는 POST를 제공하지 않는다.**
파일이 없으면 `not_collected`, 유효한 쌍이 있으면
`descriptive_pairs_only`, 오류면 `withheld`이다.
실제 검토자 코드·세션 코드·원본 SHA·개별 판정값은 UI/상태 API에
내보내지 않고, 항목별 비교 가능한 좌우 일치·불일치·비교 불가 **개수만** 반환한다.
`unknown/occluded/out_of_frame` 등은 비비교로 처리한다.
검토자 코드가 다르거나 비열람 선언이 있어도 실제 인물 독립성·자발적 동의·
동일 원본 열람 여부를 자동으로 증명하지 못한다.

기존 비공개 실사진 18장은 개발용이므로 FR159의 새 촬영 전향적 반복 검증으로
승격할 수 없다. 쌍이 2개라도 **ground truth/정확도/반복 촬영 결과/F0/전통·제품
권한은 전부 false**로 유지한다. 실제 새 사진의 전향적 반복 촬영 연구는
기존 FR159/FR160/FR163의 별도 프로토콜에 따르며 본 계약에서 합성하지 않는다.

현재 실사진 18장 기준 실제 독립 검토자 쌍은 **0건**이며 사람 검토 원본
0/0/0건과 일치한다. 독립 기준 데이터가 생기기 전에는 일치도 추정치를
만들지 않고 빈 상태만 표시한다.

## 2026-11-08 — 독립 검토 증거 파일의 최신성·무결성 보류 규칙

기존 `fr294-independent-pairs-private.json`은 서버 시작 시 한 번만 읽으면
검토 파일이 서버 가동 중 삭제·교체·파손되어도 이전 긍정적 쌍 개수가
화면에 남는 위험이 있다. 이제 `/two-view/state` 요청마다
**현재 파일을 다시 열고 검사**한다. 유효한 기존 파일에서 빈 파일/삭제로
변경된 경우 즉시 `not_collected`로 돌아가며, 손상된 JSON·디렉터리·
심볼릭 링크·내용 변경 경합·256 KiB 초과 파일은 `withheld`로 보류한다.
파일이 없다는 사유 자체는 오류가 아니며 기존처럼 쌍 0건이다.

파일 핸들로 확인한 파일 크기·동일 파일 속성과 읽은 바이트 수가
다르면 폐기하고, 현재 비공개 사진 바이트 SHA의 기존 검사도 유지한다.
저장소가 유효하더라도 별도 FR294 사람 검토 기록의 상태가 유효하지
않으면 짝 대조 결과 역시 보류한다. 검토자 코드·세션·실제 판정·원본
SHA는 HTTP 응답에 포함되지 않는다. 여기서 증거 파일을 자동 생성하거나
실제 사람의 독립성·동의·전향적 반복 촬영을 입증하지 않는다.

## 2026-11-08 FR294 이미지·귀 6개 하드갭의 기존 파싱 품질 근거 연결

전체 얼굴 FR294 11개 미지원 항목 가운데 별도 이미지 모델 5개와 귀
가시성 선행 1개만 기존 ResNet18 파싱 0.7.0의 *이미 저장된*
`counts`, `interfacePixels`, `regionScreening.regions`과
사진별로 대조한다. 정규 29개 키/18개 계산기/11개 미지원의 권한은
변경하지 않으며, 상대 3D 4개와 현행 RGB 불가 1개는 그대로 보류한다.

`fr294-image-region-quality.mjs`는 기존 `validateParsingSummary`가
검증한 18개 사진 기록과, FR294 공식 원본에서 만든 11개 하드갭 경로를
동시에 요구한다. 이미지 영역 후보의 위치 검사가 됐다면
`screened_region_proxy`, 검사 근거가 부족하면
`unscreened_region_proxy` 또는 `no_region_proxy`로 구분한다.
눈과 이마의 피부·접촉 픽셀은 모발 밀도/이마 폭/헤어라인/눈꺼풀
주름을 직접 나타내지 않으므로 `unspecific_region_proxy`로만
표시한다. 정면 가시성에 측면 사진을 대체 적용하지 않는다.

기존 비공개 실사진 18장 실구동 결과: 눈썹 모델 영역은
위치 검사됨 16장/검사 미완료 1장/영역 단서 없음 1장,
입술은 17장/1장, 귀는 12장/위치 검사 미완료 1장/영역 단서 없음 5장.
이마 피부 후보는 18장, 헤어·피부 접촉 후보는 17장,
눈 영역 후보는 18장이지만 모두 해당 **해부학적 특징 직접 확인
근거는 아님**. 기존 귀 후보 13장 가운데 1장의 귀 영역 품질 검사가
완료되지 않았음을 구분할 뿐, 귀 관측 승인으로 승격하지 않는다.

상태 API와 기존 검토 화면에는 모델 영역의 기술적 품질 분류만
공개하며 원시 픽셀 수, 좌표, 마스크, 사진 SHA·경로와 실제 색상값을
포함하지 않는다. `anatomicalFeatureVisibilityVerified=false`,
`colorCalibrationValidated=false`, `independentAccuracyValidated=false`,
`canonicalF0Admitted=false` 및 전통·제품 권한 false를 고정한다.
기존 사람 검토·독립 참조 0건 역시 변경되지 않는다.

## 2026-11-08 — FR294 눈썹·입술·귀 영역 품질 보류의 기술적 근거 구분

기존 FR294 6개 이미지·귀 하드갭 품질 후보 `fr294ImageQuality`에서
`modelRegionScreening`만으로는 모델 클래스 자체가 없었는지,
클래스는 있지만 `regionScreening`이 `unchecked`인지,
`suppressed`인지 구분할 수 없었다. 이제 기존 저장된
`engineering.face-parsing.yakhyo-resnet18@0.7.0`의 클래스 개수와
위치 검사 상태에서만 `modelRegionEvidence`를 생성한다.

- `region_class_not_returned`: 관련 모델 클래스 후보가 저장 결과에 없음
- `region_screening_unchecked`: 모델 클래스는 있으나 해당 위치 검사 완료 근거 없음
- `region_screening_suppressed`: 모델 클래스는 있으나 해당 위치 검사의 후보 제외 상태
- `region_screened_candidate_only`: 모델 클래스가 있고 위치 검사 결과 `screened`
- 이마 피부·헤어/피부 접촉·눈 영역: 비특정 클래스 후보일 뿐, 직접 이마 폭/실제 헤어라인/눈꺼풀 주름 아님
- 측면/파싱 미완료: `frontal_view_not_available` / `parsing_not_completed`

**실제 기존 개발 사진 18장, 기존 비공개 파싱 요약만 이용한 기술적 집계:**
눈썹 클래스 없음 1, 위치 검사 근거 없음 1, 위치 검사된 후보 16;
입술 클래스 없음 0, 위치 검사 근거 없음 1, 위치 검사된 후보 17;
귀 클래스 없음 5, 위치 검사 근거 없음 1, 위치 검사된 후보 12.
이 3개 `unchecked` 사례의 *영상상 실제 원인*은 파싱 메타데이터만으로
판정할 수 없다. 가림·반사·조명·구도 등의 원인을 추정·기록하지 않는다.
그룹별 `evidenceCounts`는 숫자 집계만 공개하고, 원본 클래스 수·비율·마스크,
좌표·사진 SHA·경로와 검토자 정보는 공개하지 않는다.

이번 작업은 `local-fr294-parsing-region-quality@0.2.0`의 내부 연구용
정보 표시 개선이다. `anatomicalFeatureVisibilityVerified=false`,
`independentAccuracyValidated=false`, `canonicalF0Admitted=false`,
전통·제품 해석 권한 false 유지. 다른 5개 FR294 상대3D/현 RGB 불가 항목의
권한이나 기존 18장 × 29개 평가 결과·사람 정답 0건은 변경하지 않는다.

## 2026-11-08 FR294 모델 영역 품질 × 사람 검토 존재 여부 대조

기존 FR294 이미지·귀 6개 하드갭의 **모델 영역 후보 근거**와
기존 SHA-원본 일치 사람이 검토한 **기록의 존재 여부**를 사진별로
병렬 대조한다. 새로운 검토자·정답·임의 관측 데이터를 만들지 않는다.

`fr294-quality-human-crosscheck.mjs`는 현재 사진별 품질
`local-fr294-parsing-region-quality@0.2.0`와
`local-fr294-human-evidence-readiness@0.1.0`의 사진 참조 6개 키·
기술적 품질 사유·관측/검증 미승격 플래그를 교차검증한다. 서로 어긋나거나
사람 검토 저장소가 손상·오래되면 `withheld`로 처리하며,
새 눈꺼풀·귀 검토를 저장한 직후에도 기존 대조 요약은 무효로 한다.

직접 사람 검토 경로가 이미 있는 두 항목은
`eye.eyelid_crease_or_hooded_category`의 주름 분류·눈꺼풀 윤곽과
`ear.visible_boundary_height_shape`의 귀 외곽뿐이다.
이마 폭·헤어라인·눈썹 털 밀도·입술 색상 4항목은 직접 대응하는
사람 정답 경로가 **아직 없으며**, 기존 피부·눈썹 중심선·입술 테두리
검토를 임의로 정답으로 사용하지 않는다.

현재 기존 비공개 사진 **18장 × 6항목 = 108개**를 대조했다.
직접 사람 검토 경로 없는 4항목은 72개,
눈꺼풀 주름은 모델 눈 클래스만 있는 18장 모두 사람 검토 대기,
귀는 모델 영역 위치 검사된 12장과 그 외 6장 모두 사람 검토 대기다.
기존 세 종류의 사람 검토 기록은 여전히 0/0/0건,
독립 검토자 코드 쌍도 0건이며 독립 사람 정답은 없다.

대조 화면에는 **모델·사람 기록의 존재를 병렬 표시**할 뿐
모델-사람 판정 일치/불일치나 모델 정확도를 계산하지 않는다.
개별 판정/좌표/마스크/원본 사진 SHA·경로/검토자 코드를 추가 노출하지 않으며
`modelHumanAgreementValidated=false`,
`independentHumanReferenceValidated=false`,
`anatomicalFeatureVisibilityVerified=false`,
`canonicalF0Admitted=false`와 전통·제품 권한 false를 유지한다.
FR159/FR160 전향적 반복 촬영과 이 18장 개발용 자료를 혼용하지 않는다.

## 2026-11-08 — 로드맵 1단계 코드·출처 통합 검증

기존 `feature-coverage.mjs`의 29개 정규 추적과 18개 추가 요구 추적을
재사용합니다. `whole-face-source-mapping-audit.mjs`는
FR282/FR293 29개 키·18개 계산기, FR294 11개(5/4/1/1),
FR311 지역별 카탈로그와 `whole-face-feature-mapping-20261105.md`를
검사하고 단일 대응표
`research/face-reading/whole-face-source-implementation-audit-20261108.md`를 만듭니다.

현재 18개의 추가 요구는 전부 비승인으로 유지합니다. 이전부터 존재했던
`apparentInterBrowGapToMeanMaskXSpan`만 미간 눈썹 간격의
**모델 마스크 연구 후보**로 연결하며 새 정규 키나 실제 눈썹 뿌리 거리로
승격하지 않습니다. 지역별 FR311 source catalogue는 해당 부위 문헌
내용의 존재 근거이지 사진 기반 외형 조건 predicate 검증이 아닙니다.
누락 소스 파일 참조, 변경된 키·출력 유형·매핑·FR294 분류, 출처 권한 승격은
테스트에서 실패합니다. 원본 사진/경로/SHA·생체 좌표를 읽지 않습니다.

이 작업은 코드 대조와 결손 추적의 개선이지 로드맵 1단계의 모든
문헌 출처·촬영별 사람 정답 승인 완료가 아닙니다.

## 2026-11-08 — 미간 눈썹 사이 2D 표시선·분할 마스크의 보수적 비교

기존 `visible-brow-mask-envelope.mjs`에서 모델 마스크 눈썹 사이 간격
비율을 이미 구하므로 계산기나 새 정규 키를 중복 발행하지 않는다.
기존 사람 눈썹 중심선 리뷰와 비교 모듈
`brow-centerline-comparison.mjs`에 연구용 `apparentBrowGapComparison`
출력을 추가한다. 사람 양쪽 `marked` 단일 연속·가로 단조 중심선의
가로 범위를 모델 분할 눈썹 마스크의 가로 범위와 같은 이미지 축에서
나란히 계산하여 **비율 차이만** 표시한다.

사람 중심선 일부/여러 선/교차·역주행/마스크 조각·가림은
`unavailable`로 보류한다. 화면 좌우는 해부학적 좌우가 아니며,
사람 중심선 끝은 실제 눈썹 안쪽 모근 경계 검증이 아니다.
`candidateOnly=true`, `singleReviewerUnverified=true`,
`anatomicalInnerBrowEndsValidated=false`,
`independentAccuracyValidated=false`, `canonicalF0Admitted=false`,
전통·제품 해석 권한 false를 고정한다. 저장·원시 좌표 공개 없음.
원본 사진 비공개 저장소와 29/18/11 정규 집계/FR294 레인은 변경 없음.

현재 검토 기록이 없는 실제 사진은 사람 대조 결과를 추가 생성하지
않는다. 다음 실증은 원본·동의·두 독립 리뷰와 실제 눈썹 내측 경계 기준을
확인할 수 있을 때에만 검토하며, 그 전까지 실제 정확도는 미평가.

## 2026-11-08 — 위·아래 입술 모델 영역과 사람 경계선 가로폭 비교

관상 엔진 로드맵 2~3단계의 정면 2D 관측 범위를 기존
`visible-lip-class-profile.mjs`의 위·아래 입술 **모델 분할 클래스**
(12/13)와 `lip-border-human-review.mjs`의 **동일 원본 사람 표시선**
기록 사이로 확장했다. `lip-model-human-width-comparison.mjs`가
각각 위/아래 가로폭 비율을 구해 기술적 차이만 표시한다.

사람 상·하 경계선이 모두 `marked`인 단일 연속, 이미지 x축 단조
표시선이고 두 입꼬리 지점이 `marked`이며 두 선이 입꼬리 좌우
범위를 벗어나지 않은 때에만 비교한다. 부분 표시·선 분할·역주행·
입꼬리 미표시·원시 마스크 유효성/현재 분할 품질 미확보이면
`unavailable`/화면 보류로 표시한다. 기존 모델 분할 상태가
`screened`인 최신 `PARSING_VERSION`만 화면 비교에 사용한다.
새 화면 모듈은 로컬 서버의 정적 모듈 허용 목록에 등록한다.
저장된 사람 표시가 갱신되면 같은 검토 화면에서 결과를 다시 계산한다.

이 값은 **사람이 그린 상·하 경계선의 x 범위 비율**과
**모델의 위·아래 분할 영역 x 범위 비율**의 차이다.
각각 실제 입술 해부학 경계 전체를 대표한다는 검증 근거는 없으며
실제 입술 두께/폭·색상·입술산·전통 명칭이나 F0/제품 판독 지표와
혼용하지 않는다. `candidateOnly`, `singleReviewerUnverified`,
`anatomicalLipBordersValidated=false`,
`fullAnatomicalBorderCoverageCertified=false`,
`modelHumanAgreementValidated=false`,
`independentAccuracyValidated=false`, `canonicalF0Admitted=false` 및
전통/제품 해석 권한 false 유지. 개인 원본 경로/해시/표시점 비노출.

실제 비공개 실사진 18장의 입술 사람 표시 기록은 **0건**으로
비교 가능한 실제 사람 정답도 0건. 합성 테스트에서만 값과 거부
경계를 검증했다. FR294 `mouth.visible_lip_color` 하드갭의
새 이미지 모델/색상 기준은 이 작업으로 해결되지 않는다.

## 2026-11-08 — 화면 좌우 귀 모델 마스크와 사람 외곽 표시선의 2D 범위 대조

관상 엔진 로드맵 2~3단계에 맞춰 기존
`visible-ear-mask-silhouette.mjs`의 ResNet18 귀 전체 마스크 후보와
`ear-detail-review.mjs`의 원본 사진 사람 귀 외곽선 표시를 연결했다.
`ear-model-human-rim-span.mjs`는 모델 영역 가로·세로 크기/전체 이미지 크기와
한 사람의 외곽선 표시 꼭짓점 가로·세로 범위/전체 이미지 크기를
화면 왼쪽·오른쪽 각각 계산하고 부호 있는 차이만 비교한다.

비교는 **동일 원본의 정면 사진**에서 **현재 파싱 버전**과 귀 영역
`screened` 상태가 있고, 귀 마스크에 가로 가운데를 사이에 둔
좌/우 두 개의 분리된 미절단 영역이 존재하며, 사람 외곽 표시는
각 화면 쪽 `marked` 단일 선(3점 이상, 이미지 범위 내부)이
있는 경우에만 허용한다. 한쪽 귀 모델만 보이거나 중앙 판정이
애매하거나, 일부만 표시했거나, 여러 조각/프레임 절단/다른 위치
표시이면 `unavailable`로 보류한다. 화면 좌·우가 생물학적 좌·우를
뜻하는 것은 아니다. 표시선의 전체 외곽 완전성도 증명하지 않는다.

이는 **모델의 귀 전체 영역 바운딩 박스**와 **사람이 표시한
귀 외곽선의 점들로 만든 바운딩 박스**의 차이이며, 외이륜,
귓불, 부착부, 정면 대비 돌출도, 두께의 해부학적 정답이나
문헌 관상형 검증이 아니다. 비교 결과에는 원본 SHA·경로·
선 좌표·모델 마스크를 포함하지 않는다. `candidateOnly=true`,
`anatomicalOuterRimValidated=false`,
`modelHumanAgreementValidated=false`,
`anatomicalLateralityAssigned=false`,
`earProjectionMeasured=false`, `earThicknessMeasured=false`,
`independentAccuracyValidated=false`, `canonicalF0Admitted=false`,
전통·제품 권한 false를 유지한다.

현재 실사진 18장의 귀 사람 외곽 검토 원본은 **0건**이며,
실제 사람-모델 범위 정확도 비교도 0건이다. 합성 2D 입력과
실제 화면 동작만 검증했다. 기존 관상 FR294의 귀 가시성
모델 신규 근거 미확보 상태나 4개의 상대 3D 미해결 항목은
이번 작업으로 변경되지 않는다.

## 2026-11-08 — 코 전체 모델 마스크와 사람 콧볼 외곽선의 화면상 2D 범위 대조

기존 `visible-nose-mask-profile.mjs`의 **코 전체 클래스 마스크**와
`nose-detail-review.mjs`의 같은 원본 사진 사람 표시 중
화면 왼쪽/오른쪽 **콧볼 윤곽선**만 기술적으로 연결했다.
`nose-model-human-alar-span.mjs`는 모델 코 전체 마스크 가로폭/사진 가로폭과
사람 양측 콧볼 표시선의 바깥쪽 x 범위/사진 가로폭을 대조하고
부호 있는 차이를 연구용으로 표시한다.

사람 양측 표시가 모두 `marked`, 단일 윤곽선, 화면 범위 내부,
왼쪽·오른쪽 윤곽 x 범위의 분리 조건을 충족하고, 같은 사진의
현재 `PARSING_VERSION` 코 영역 `screened`와 실제 코 마스크
연결성·프레임·단면 검사가 유효한 경우에만 비교한다.
부분 표시/여러 선/경계 잘림/화면상 좌우 중첩/이전 분석/변조된
모델·사람 권한 상태는 `unavailable`로 보류한다.
사람 검토 저장 직후에는 이전 모델 후보 캐시를 무효화해 재계산한다.

**모델 코 전체 클래스는 해부학적 콧볼 전용 모델이 아니다.**
사람 표시선의 끝이 실제 콧볼 최외곽이라는 사실도 독립 검증되지
않았다. 사람 코끝 점과 양쪽 콧구멍 윤곽의 검토 기록 존재 여부는
별도 boolean으로만 남기며 그 위치를 모델 코끝/콧구멍의 정답으로
다루지 않는다. 원본 좌표·마스크·사진 경로/SHA는 비교 결과에 넣지
않는다. `candidateOnly=true`, `singleReviewerUnverified=true`,
`anatomicalAlarBoundaryValidated=false`,
`anatomicalNoseSubregionsObserved=false`,
`modelHumanAgreementValidated=false`,
`independentAccuracyValidated=false`, `canonicalF0Admitted=false`,
전통·제품 권한 false를 유지한다.

현재 비공개 사진 **18장**에서 코 사람 검토 기록 **0건**을 확인했다.
실사진 사람-모델 정확도 검증은 0건이고, 합성 경계 테스트와
Chrome 로컬 화면 실행만 완료했다. 29개 정규/18개 확장/FR294 11개
권한을 바꾸지 않으며 상대 3D·코끝/비공/콧볼 실제 형태와 전통
관상 판독은 미완료로 둔다.

## 2026-11-08 — 코 사람 검토 저장과 비동기 사진 분석의 최신성 충돌 차단

관상 엔진 로드맵 2~3단계의 기존 `nose-model-human-alar-span.mjs`는
검토 화면에서 **사진 마스크 로딩 후** 사람 콧볼 검토 기록과 비율을
대조한다. 사람 검토 저장과 이미지 비동기 해제가 교차하면
저장 전의 사람 기록으로 계산된 결과가 저장 후 화면에 들어올
가능성이 있어, 같은 사진의 분석 요청마다 비영속 최신 세대를
부여하는 `nose-preview-epoch.mjs`를 추가한다.

기존 `nose-detail-review-ui.mjs`의 성공 저장 이벤트는
`review.mjs`에서 해당 사진의 이전 모델·사람 대조 결과를
무효화한다. 이미 시작한 이미지 작업은 완주해도 이전 세대이면
결과나 실패 상태를 등록할 수 없다. 분석 중 일시적으로 만들어지는
원시 코 마스크는 로컬 임시 변수로만 사용하고,
`inspectVisibleNoseMask`에서 **모델 후보와 당시의 사람 검토 스냅샷을
묶어 반환**한 뒤 최신 세대인지 확인한 경우에만 화면 캐시에 넣는다.
사진 객체가 교체된 경우에는 기존 사진 객체 일치 검사도 그대로 적용한다.

이 수정은 **동일 페이지 내부의 저장/분석 순서 경합만 해결**한다.
기존 서버 `currentNoseReviewState`의 원본 사진 SHA-256 확인 및
저장 경로의 최초 파일 상태 검증은 그대로 유지하며, 페이지를
연 상태에서 외부 프로그램이 원본 사진을 교체한 상황에 대한
별도 실시간 인증이나 사람 정답의 독립 정확도를 보장하지 않는다.

새 정규 관측/전통 조건/제품 권한은 추가하지 않는다.
기존 사진 18장에 코 사람 검토 0건, 독립 정확도 0건 유지.
`candidateOnly=true`, `canonicalF0Admitted=false`,
전통·제품 해석 권한 false를 계속 적용한다.

## 2026-11-08 — 원본 사진 교체 후 오래된 상태·분할·사진 제공 차단

로드맵 2~3단계에 따라, 기존 `server.mjs`가 사람 검토 복원 때는
원본 SHA-256을 다시 계산하면서도 `GET /two-view/state`,
`GET /image/:captureRef`, `GET /parsing-artifact/:captureRef/...`,
`GET /review-artifact/:captureRef/...` 경로에는 일관된 현재성
게이트가 없던 부분을 보완했다.

`source-snapshot-guard.mjs`는 서버 시작 시 기억한 파일 크기·수정 시각·
Windows 파일 식별번호 및 **원본 SHA-256**을 요청 시점의 실제
읽은 바이트와 대조하고, 검증 전후 파일 상태까지 재확인한다.
Windows에서 일부 파일 식별번호가 JavaScript의 정확한 정수 상한을
넘더라도 유한한 파일 식별번호로 비교하고, **최종 SHA-256 바이트
일치**를 필수로 유지한다. 원본 사진 경로·SHA·실제 사진 바이트는
API의 검사 실패 응답에 포함하지 않는다.

원본 하나라도 서버 시작 당시와 다르면 `GET /two-view/state`는
저장된 사진/검토/파싱 결과를 반환하지 않고 HTTP 409
`SOURCE_CHANGED_RESTART_REQUIRED`를 반환한다.
사진 GET은 확인된 **동일 바이트 버퍼**를 사용해 두 번째 파일
읽기로 바뀐 내용이 전달되는 것을 피한다. 분할·기존 결과 이미지
GET도 해당 원본을 먼저 검증한다. 일반 결과·분할 결과 저장에서도
기존 파일 상태 점검과 더불어 전체 원본의 현재 SHA를 확인한다.
브라우저 상태 화면에는 원본이 변경돼 결과 표시가 중단됐으며
확인 후 로컬 서버를 재시작하라는 안내를 제공한다.

이 게이트는 **요청 시점의 현재성 검증**이다. 브라우저에서 이미
받아 화면에 떠 있는 사진을 파일 변경 순간 자동으로 삭제하거나,
검사 직후 타 프로세스가 파일을 바꾸는 모든 동시성 경쟁까지
원자적으로 차단하는 기능은 아니다. 기존 연구용 검토·분할·
정규 관측·전통/제품 판정 권한은 변경하지 않는다.

검증 근거: 합성 임시 파일의 동일 바이트/동일 크기·mtime 복원
변조/삭제/잘못된 SHA/메타데이터 차단 **4개 테스트 PASS**.
실제 기존 비공개 사진 **18장 모두 현재성 검사 통과**
(Windows 대형 파일 식별번호 12장도 정상 처리),
Chrome 페이지 준비·두 번째 사진·관상 상태·원본 SHA/경로 비노출 확인.
원본 실사진을 변조하거나 업로드하지 않았다. 독립 사람 정답 0건 유지.

### 2026-11-08 — 열려 있는 브라우저의 원본 현재성 확인·구 결과 폐기

- 기존 `GET /two-view/state`의 원본 파일 SHA 검증을 재사용하여 페이지가 열린 채로 다른 프로그램이 사진을 바꾼 경우를 확인한다. 새 원본 파일·생체 데이터 저장이나 외부 전송 경로를 만들지 않는다.
- 브라우저 활성 복귀와 30초 간격으로 로컬 서버에 현재성을 확인하며, `SOURCE_CHANGED_RESTART_REQUIRED` 또는 검증 연결 실패 시 진행 중 분석·마스크 URL·저장된 결과·사람/모델 비교 화면을 제거한다. 이전 자료는 같은 페이지에서 재활성화하지 않으며 원본 확인과 서버 재시작을 안내한다.
- 합성 테스트는 정상 응답·원본 변경·검증 실패·검사 동시 실행과 늦은 완료에 대한 보류 동작을 다룬다. 실사진 정답·반복 촬영·외부 변경 순간의 완전 원자성/즉시 통지는 미검증이다. 원본 상태를 확인한 시점과 이후 파일 변경 사이의 레이스는 남는다.
- 정규 관측·전통 F1·제품 판독 권한은 유지보류하며 실제 이미지 정확도는 `not_evaluated`다.

### 2026-11-08 — 비공개 18장 기반 실제 브라우저 현재성 복구 확인

- 기존 정적 모듈 목록에서 `source-currentness-gate.mjs`가 누락되어 페이지 시작이 차단되는 실구동 결함을 발견·수정했다. 브라우저 엔트리에서 직접 import하는 모든 로컬 모듈의 정적 제공 여부를 사진 없는 테스트에서 검사한다.
- 집 PC 비공개 기본 사진 18장을 읽는 기존 서버를 재사용하되, 임시 원본 사본 한 장만 바이트 수정하고 수정 시각을 복원한다. 원본 그대로일 때 상태 API 200, 사본 변경 뒤 상태/이미지 API 409를 확인하고, 열린 Edge 화면에서 포커스 복귀 시 구 사진·분할·검토 결과가 화면과 메모리에서 사라짐을 확인했다.
- 재실행: `node tools/face-reading/two-view/source-currentness-live-smoke.mjs --intake <private-intake> --browser` (Windows Edge 필요). `--browser` 없이 서버 경계만 검증. 원래 inventory의 추가 임시 사진 파일 6개는 테스트 시작 시 누락되어 기본 18장만 독립 검증했다. 원본/사람 기록 불변, 검증 복사본 일회용 폐기.
- 기술적 현재성 차단은 모델 정확도·전통 해석·정규 F0 승인 증거가 아니며 실사용 페이지가 열릴 때마다 변경 순간이 아니라 재확인 시점에 반영된다.

### 2026-11-08 — 눈꺼풀 표시선 대 눈 클래스 상단 엔지니어링 근거

- 기존 로컬 사람 눈꺼풀 검토에서 `upperLidMargin`의 양쪽 `marked` 단일선이 있을 때, 기존 이미지 분할에서 계산한 모델 눈 클래스 4/5의 원본 사진 대비 상단 위치와 같은 화면 X가 겹치는 범위의 사람 선 상단 Y를 **사진 높이 정규화 단위**로 비교한다. 불완전 선·가림·서로 다른 화면 절반·모델 후보 부재는 각 눈별로 보류한다.
- 새 정규 관측기, 쌍꺼풀 분류기, 주름선/덮임 자동 검출기는 아니다. 주름·덮임·해부학·전통 관상 형태를 모델 눈 클래스만으로 판정하지 않으며 원시 좌표·사진·마스크는 저장하지 않는다. 사람 표시 0건 상태에서는 실제 정확도 증거 0건.

### 2026-11-09 — 2D 눈/입술 클래스 최외곽과 사람 표시의 비교 허용 범위

- 기존 눈 모델 전체 영역 상단 대비 사람 윗경계의 비교는 **눈 모델 전체 X 구간이 사람 표시선으로 덮인 때만** 허용한다. 일부만 표시한 눈꺼풀 선으로 모델 영역의 전역 최상단을 대표하지 않는다.
- 기존 모델 입술 분할 클래스 12/13 및 비공개 사람 입술/입꼬리 표시를 재사용한다. 같은 원본 정면 사진에서 사람의 위·아래 전체 가로 표시선이 각 모델 클래스의 X 범위를 덮고 해당 클래스와 표시가 입꼬리 안에 있을 때 **상단/하단 Y 위치의 사진 높이 대비 차이**만 나타낸다. 일부/가림/불일치/상하 역전이면 부위별 보류.
- 실제 입술 두께·입꼬리 형태·인중/전통 관상형 자동 판정이 아니며, 원시 마스크/사람 좌표를 새 결과 파일에 영구 저장하지 않는다. 독립 사람 정답과 반복 촬영 없이는 정규 F0/상품 판독 승격 금지.

### 2026-11-11 — 기존 사람 인중 기둥선 두 개의 보이는 겹침 구간만 2D 비교

- 기존 입술 사람 검토의 `philtrumImageLeft/Right`에 완전 표시된 세로 단조 단일 획 2개와 양쪽 표시 입꼬리만 사용. 두 획의 **공통 세로 구간** 25/50/75%에서 화면상 가로 간격을 사람이 표시한 입 폭으로 나눈 연구 후보를 계산한다. 한쪽 선 부재·가림·세로 겹침 없음·교차·표시 범위 불일치는 보류한다.
- 기존 사진·원본 SHA·사람의 원시 선 좌표를 재저장하거나 모델 학습/전통 판독에 사용하지 않는다. **실제 인중 너비·길이, 코 아래 기준점, 반복 정확도, 정규 F0 권한은 확보되지 않았다.** 실제 사람 선 표시 데이터가 없는 상태에선 실사진 결과 없음.
