# 명하 관상 전체 관측 엔진 — 구현 기술 명세 v0.1

> **작성:** 2026-11-05 · **상태:** 구현용 기술 계약 초안(신규 계산/판독 권한 없음)  
> **상위 로드맵:** [2026-11-05 얼굴 전체 관측·판독 로드맵](whole-face-observation-reading-roadmap-20261105.md)  
> **29개 항목+18개 확장 요구 대응표:** [전체 관측 항목 대응표](whole-face-feature-mapping-20261105.md)  
> **실행 트랙:** face-observation-engine(사진·측정), face-research(전통 형태·방법론). 별개 사주 엔진 로드맵 불변.  
> **입증 기준:** `main`의 FR207/FR282/FR293/FR294/FR295/FR299/FR311/FR312E 및 미병합 [#2453](https://github.com/gycha0109-beep/Saju/pull/2453) 읽기. 사용자 제공 Face Reading Architecture v0.3의 F0~F8/Shared Observation Core/출처 권한을 보존.

## 0. 결정사항과 비결정사항

**확정하는 구현 방향**

1. 관상은 **얼굴의 실제 보이는 세부 형태**를 먼저 얻고, **특정 전통 문헌의 형태 조건을 검증해서** 판독한다.
2. 기본 입력은 FR282의 일반 스마트폰 전면 RGB, 약 25~30cm. 특수 깊이 카메라 필수화 금지.
3. 부위별 독립 품질·가시성 판단: 한 부위가 가려졌다고 다른 부위 계산을 정지시키지 않는다.
4. **한 모델로 전부 처리하지 않는다.** 이미 존재하는 랜드마크/분할/기하를 우선 쓰고, 실제 부족한 특징에만 새 모델 또는 학습.
5. 이미 구현된 FR293 **18/29 정규 계산기**와 PR #2453의 눈·눈썹·입술·코·귀·이마·광대·하관의 *로컬 연구용* 항목별 화면을 **중복 구현하지 않는다**.
6. 촬영 시점·원본/변환·모델·자료 버전이 불일치하면 관측을 결합하지 않는다. 실패는 명시적으로 `unavailable`.
7. 원본 이미지는 로컬 일시적 이용이 기본이며 공개 저장소/CI·서비스 로그/DB에 원본 마스크·랜드마크·신원 재구성 가능한 픽셀 데이터 보존 금지.

**아직 결정하지 않는 것**

- Keras·PyTorch·ONNX 특정 모델/사전학습 가중치의 최종 선택 및 상용 사용 승인.
- 임의 얼굴 비율·코 높이·관상형의 숫자 임계값 또는 합격률, 가상의 정확도 목표.
- 다각도 촬영의 소비자 필수화, 특수 깊이 장치 필수화, 정면 촬영에서 볼/광대의 실제 mm 깊이 출력.
- FR311 역사적 형태를 사진 측정에 바로 자동 연결하는 분류·해석 승인.
- F5 동적 기색/피부색 판독, 100세 흐름, 원국 사주 명식 역산, 실제 성격/재산/건강 예측.

## 1. 시스템 경계와 실제 재사용 대상

```text
[입력: 로컬 일반 RGB 이미지, viewRole, 동일 촬영 집합]
           |
     Capture/Quality/Visibility (프레임 전체 + 각 부위)
           |
   기존 MediaPipe provider + 선택적 얼굴분할/이미지 모델 + 상대3D 연구 lane
           |
   worker 임시 기하 (좌표/마스크는 외부 전송·DB 저장 불가)
           |
  FR207/FR282 feature registry + FR284~FR293 정규 중립 계산기
           |
   [관측 상태 + 중립 수치/윤곽 특징 + provenance + 부족 사유]
           |
   **F1 전통 형태 연결 게이트** (원문/방법론/사람 정답 검증/허용 조건)
           |
  기존 F2/F3/F4/F6 및 F7/F8 관상 판독
           |
   근거 추적 가능한 한국어 결과 (관측 불가 부위는 설명)
```

**권한 분리**

- **Shared Face Observation Core**: 사진 수집/품질/포즈/가림/랜드마크/윤곽/중립 측정. 관상 용어·운세 점수·얼굴 스타일 별칭 발급 불가.
- **Face Reading Engine**: 원문(SourceWork/Witness/Passage), 방법론 pack, region map, operationalization, source-qualified structured FaceClaim. 연구 코드를 제품 승인으로 추정 불가.
- **Narrative/Character**: 이미 허용된 Claim만 표현. LLM의 영상/사진 추론이 독립 의미 권한을 획득하지 못함.
- **제품/UI**: 부위별 `측정 가능/일부/불가`를 보여 주되 연구용 원시 얼굴 기록을 제품 소비자 상태로 승격하지 않음.

**재사용 코드 위치**

| 역할 | 재사용/검증할 실제 경로 |
|---|---|
| 정규 전체 29개 | `packages/face-reading/src/rgb-selfie-feature-authority-matrix-fr282.ts` |
| 18개 정규 계산 상태 | `packages/face-reading/src/rgb-selfie-product-column-map-fr293.ts` |
| 기능별 필요 단서 | `packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts` |
| 기존 눈·눈썹·코·입·중안면·하관 계산 | `packages/face-reading/src/canonical-rgb-selfie-morphology-fr293.ts` 및 FR208~FR293 각 파일 |
| 기존 로컬 사진 화면·후보 | `tools/face-reading/two-view/` (**PR #2453 미병합 브랜치**, 합치기 전 `main`에 없는 경로) |
| 전통 명명형·원문 형태 조건 | `packages/face-reading/src/traditional-*-fr311*.ts`, 관련 FR312E |
| 기존 전통 연구 단계 | `research/face-reading/fr258-face-research-master-frontier.md`, FRB/T5 관련 경계 |
| 상대 3D 근거·고립 평가 | `research/face-reading/fr295-rgb-relative-3d-benchmark-protocol.md`, FR299, FR300-R1Z |
| 헤어라인 증거 | #2213/#2337 및 비공개 168장 자료. **다른 관상 부위의 정답으로 전용 금지** |

## 2. 스키마와 관측 상태 — 기존 권한을 보존하는 후보 계약

아래는 **로컬 프리뷰/후보 메타데이터용 구현 명세**다. 정규 FR282/FR293 API나 SharedFaceObservationBundleV3를 새로 정의/대체하는 것이 아니다. 최종 적용은 기존 계약의 adapter 및 버전 검증을 통해 이루어진다.

```ts
// Proposed private research DTO only. Not an issued canonical/production contract.
type ObservationAvailability = 'observed' | 'partial' | 'unavailable';
type EvidenceLevel =
  | 'geometry_calculation_only'
  | 'model_candidate'
  | 'human_checked_local'
  | 'independently_benchmarked';
type ViewRole = 'frontal' | 'left_oblique' | 'right_oblique' | 'profile';

interface PrivateWholeFaceFeatureReceiptV01 {
  schemaVersion: 'private-whole-face-feature/v0.1';
  lifecycle: 'local_research_only';
  captureRef: string;                 // opaque private identifier, not file path or image hash
  sameCaptureGroupRef?: string;       // only asserted by actual acquisition evidence
  itemKey: string;                    // existing 29 FR282 featureKey OR reviewed extension candidate
  regionKey: string;
  viewRole: ViewRole;
  availability: ObservationAvailability;
  evidenceLevel: EvidenceLevel;
  value?: {
    kind: 'ratio' | 'degree' | 'normalized_distance' | 'continuous_axes';
    axes: ReadonlyArray<{ key: string; value: number; unit: 'ratio' | 'degree' | 'normalized_distance' }>;
  };                                  // only approved scalar/axes summary in private persistence
  coordinateFrameRef: string;         // exact current FR77/candidate image-plane reference
  sourceMetricRefs: readonly string[];
  providerRunRef: string;
  providerVersionRef: string;         // exact package/model/checksum pin stored in private registry
  captureQualityRef: string;          // validated per-photo quality evidence
  visibilityState: 'visible' | 'partial' | 'occluded' | 'out_of_frame' | 'unknown';
  unavailableReasons: readonly string[];
  traditionalBindingApplied: false;
  productionMeasurementAuthorized: false;
  productInterpretationAuthorized: false;
}
```

**필수 불변조건**

- `availability='unavailable'`이면 `value` 없음. `partial`은 전체 부위를 본 것처럼 보고하지 않으며 정확한 부족 조건을 남긴다.
- `evidenceLevel='geometry_calculation_only'`는 `observed`로 상승 불가. 실제 사진을 처리했어도 인간 정확도/반복성 미검증이면 `model_candidate`.
- `observed`는 **정의된 모델 기반 화면 관측이 계산되었음**만 의미할 수 있고, 제품 정규 관측 승격이나 전통 형태 만족을 뜻하지 않는다. 기존 #2453의 상태 용어를 유지한다.
- 서로 다른 `coordinateFrameRef`, 좌우 mirror/사이즈 변환, providerRun 또는 실제 캡처를 **아무 근거 없이 하나의 측정으로 합치지 않는다**. 입력 사진의 실제 좌/우와 화면 좌/우 구별.
- `confidence`를 재물/운명 점수로 변환하지 않는다. 기술적으로 검증되지 않은 confidence는 `evidenceLevel`과 섞지 않는다.
- DTO는 저장용 **스칼라·이유·안전한 비식별 참조**만. 경계/윤곽/이미지·원시 좌표는 worker 메모리와 로컬 이미지 겹침 화면으로 제한, 공개 PR/CI 불가.
- 실제 정규 소비 시에는 기존 provider adapter, FR282/FR293 권한 검사·반복 측정 기준을 충족한 결과만 기존 방식으로 전달. 이 DTO만으로 새 공식 관측기가 생기지 않는다.
- FR282의 `specialDepthHardwareRequired=false`, `metric3DRequired=false`, `traditionalBindingIssued=false`를 변경하지 않는다.

## 3. 획득·가시성·좌표계 계약

### 3.1 촬영 세션

- **필수 기본:** 일반 RGB 전면 카메라, 정면/준정면, 중립 표정, 약 25~30cm. 부위별 해상도·초점·가림·머리카락·안경·필터·그림자를 점검한다.
- **선택 연구:** 좌우 사선/측면. 기존 두 시점 로컬 UI에 존재하는 `frontal/profile` 역할은 보존하고, 새 사선 역할을 임의로 이전 `profile`에 변환하지 않는다. 별도 role 추가는 해당 단계에서 버전 계약과 테스트 필요.
- 포즈·노출·표정 등의 불충분 때문에 특정 부위가 안 보이면 부위만 `partial/unavailable`. 얼굴 자체가 식별되지 않거나 여러 명의 단일 측정이 혼합될 위험이 있으면 해당 측정 실행 거절.
- 입술·눈꺼풀·볼의 형태는 표정 영향을 받으므로 중립 표정과 재촬영 판단을 분리. `FR312E`의 `not_observable` 사유와 정합.
- 동일 피사체·다각도 사진의 결합은 **명시적 획득 세션 결속**이 있는 경우에만. 다른 사람 사진/얼굴 인식 추정으로 결속 금지.

### 3.2 기하/좌표 규칙

- 기존 **FR77/FR208 계열의 canonical metric XY**와 #2453 **이미지 평면의 eye-relative 후보 값**은 동일하지 않다. 단위·원점·방향·이미지 변환을 기록한다.
- 원본 회전/미러링/리사이즈/크롭 후 좌표계는 정확한 역변환을 적용한다. 이미지/마스크/윤곽 합성 시 원본 픽셀 정합성을 확인한다.
- 관측기별 인덱스(예: MediaPipe landmark id)나 가짜 해부학적 좌우 표시는 정규 중립 계약 밖으로 유출하지 않는다.
- 3D 모형 Z나 렌더링의 보기 좋은 곡면은 독립 실제 깊이 정답이 아니다. 물리 mm 대신 **정의·검증된 무차원 상대 형상 지표**를 사용한다.
- **단일 정면 사진으로 직접 볼 수 없는 구조는 추정·보정으로 채우지 않는다.**

## 4. 부위별 계산 계약 — 필요한 수치와 금지 대체값

아래 세부 항목은 [29+확장 요구 대응표](whole-face-feature-mapping-20261105.md)의 정규 키에 연결한다. 기존 계산식·지표 레지스트리가 있으면 **그 정의를 우선 사용**, 신규 정의가 필요한 경우 기존 값과 섞지 않고 후보 스키마로만 실험한다.

### 눈썹·미간

- **기존 계산 활용:** FR292 눈썹 길이/아치 높이/꼬리 기울기. 단, 실제 눈썹 경계·안쪽/바깥쪽 역할이 입력으로 입증된 경우에만.
- **실제 굵기:** 눈썹 털 마스크의 실제 바깥 경계에서 중심 곡선의 법선 방향 가시 폭을 여러 지점에서 구한 *분포*를 얼굴/눈 너비로 정규화하는 **연구 후보**. 단순 X-span, 모델 털 픽셀 개수, 색이 어두움 ≠ 눈썹 굵기/밀도.
- **밀도:** 조명·화장·문신·모발 가림을 먼저 판정한 고해상도 외형 모델의 독립 관측이 필요. 픽셀 밝기를 밀도로 정식 분류 금지.
- **미간:** 양쪽 눈썹의 실제 **안쪽 털 경계 간 거리**를 중립 좌표계에서 측정. 눈 사이 거리/랜드마크 중심 간 거리로 대체 금지. 깊이/볼록함은 별도 입체 항목.

### 눈·눈꺼풀

- **기존 계산 활용:** FR210/FR215/FR284의 눈 폭/높이, 눈 사이 비율, 눈꼬리 기울기, 비대칭.
- **실제 눈꼬리 역할:** 이미지 최외곽 극점은 실제 해부학적 눈꼬리와 같다고 단정 불가(#2698). 양안 각각의 가시 경계·역할·가림 검증 필요.
- **쌍꺼풀/덮임:** 고해상도 눈꺼풀 주름·외형 분할 및 보이지 않음 구분. 눈 가로세로 비율, 52개 blendshape 계수 ≠ 주름 존재.
- **안구 돌출/함몰:** 눈 비율이 아닌 독립 참조 가능한 상대 3D 관측 또는 `unavailable`. 촬영 각도에 따른 검증 필수.

### 코·광대·볼·턱

- **코:** 기존 코 중심선/코끝 윤곽, FR290 콧볼 폭·비공 윤곽을 최대 재사용. 피부·비공의 실제 가시 경계·역할을 분리. 단순 nose class bounding box ≠ 코 높이/코끝 전후 돌출.
- **광대/볼:** FR211/FR217의 보이는 중안면 너비·윤곽 단서와 `cheek_midface.relative_3d_prominence`는 **서로 다른 물리 항목**. 볼 함몰/살집은 광대의 정면 폭만으로 판정 금지.
- **턱:** FR213/FR216/FR289의 보이는 턱 너비/윤곽/턱끝 중심값과 3D 턱끝 전후 위치 분리. 얼굴 타원 경계 ≠ 뼈 윤곽.
- **상대 3D:** FR295·FR298·FR299에서 정의한 독립 참조/등록·반복성/사용 권리 요건을 통과한 항목만 실제 제품 지표 검토. 외부 모델마다 동일 사진으로 각 지표를 비교하고 항목별로 선택.

### 귀·이마·헤어라인·입술/인중

- **귀:** 정면에 귀 픽셀이 있다고 귀 전체 높이·귓불·부착부까지 보인다고 판정하지 않는다. 좌우 귀 가시성 게이트 → 외부 귓바퀴 전용 분할/세부 랜드마크 → 사선/측면에서의 상대 펼쳐짐 검토 순서. 두께·귓구멍 경계는 현행 `unavailable` 유지.
- **이마:** 실제 가시 피부 영역/모근 시작 위치와 MediaPipe face oval을 분리. 헤어라인에 가림이 있으면 **부분 가시 구간만** 쓰고 머리 끝/앞머리 아래 테두리를 모근선으로 확정하지 않는다.
- **입술:** FR285/FR291/FR293 기존 중립 입/인중/입술 두께 계산기를 재사용. 실제 위아래 입술의 중첩·교차·가림 검증(#2453의 엄격 중첩 수정) 없이 피부색 클래스 폭을 입술 두께로 대체 금지.
- **입술 색/기색:** FR294의 미구현 외형 후보로 기록하되 Face Architecture v0.3의 **정적 관상 v1에서는 F5 dynamic colorAppearance 소비 금지** 유지.

## 5. 모델 후보 기술 비교 계약

**비교 단위는 모델이 아니라 `부위 × 관측 featureKey × 촬영조건`이다.**

| 후보 역할 | 우선순위 및 채택 조건 | 제외/차단 사항 |
|---|---|---|
| 기본 랜드마크/기하 | 현재 pinned MediaPipe `@mediapipe/tasks-vision 0.10.35` 및 FR77/FR284 산출값을 **baseline**으로 유지 | face mesh의 외부 귀/모근선/실측 3D로 승격 금지 |
| 세부 얼굴 부위 분할 | #2453에 이미 연결된 pinned ResNet18 ONNX / ONNX Runtime Web `1.23.2` 후보를 먼저 재현. 각 부위 pixel IoU·경계 거리·가림 실패 비교 | MIT 코드만으로 가중치/데이터 상업권리 주장 금지 |
| 추가 정밀 외형 모델 | 눈썹 털 두께·눈꺼풀 주름·비공·귀처럼 **기존 19-class mask로 부족한 곳만** 독립 모델 비교 | 모델 전체 성능으로 개별 부위 정확도 합격 판정 금지 |
| 상대 RGB 3D | FR295/FR299의 **같은 입력·독립 참조** 벤치마크. 3DDFA_V2 등은 후보, 우승 모델 미선정 | 참조와 후보에 동일한 모델 포인트 사용 금지, mm 정답 오인 금지 |
| Keras/PyTorch 학습 | **검증된 학습권리 데이터와 독립 정답이 확보된 부족 항목**에만 전용 모델 훈련 검토 | 프레임워크 채택 자체를 정확도 진전으로 주장 금지 |

원칙적으로 기존 앱과 의존성 버전을 **조용히 바꾸지 않는다**. 새 provider를 시험할 때 모델/추론 런타임/가중치 exact revision·해시·전처리·라벨맵·좌표 역변환·업무 권리·실행 장치/속도를 기록한다. 브라우저 worker를 재사용하고 UI 스레드 블로킹/모델 실패는 다른 항목 계산까지 전염시키지 않는다.

**기술 확인 근거(2026-11-05):** Google MediaPipe Web의 동기 `detect()` 호출은 UI 스레드를 막을 수 있어 worker 사용 권장; ONNX Runtime Web은 WASM/WebGPU 등 제공; Keras 3는 다중 백엔드 학습 프레임워크. 각각의 현행 공식 문서: https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker/web_js · https://onnxruntime.ai/docs/tutorials/web/ · https://keras.io/keras_3/ . 새 기술이 실제 정확도를 보증한다는 뜻은 아님.

## 6. F0 → F1 → F2~F8 대입 계약

### 6.1 관측에서 형태 조건으로의 자동 대입 조건

각 전통 형태의 자동 판정은 *모두* 충족해야 한다.

1. **출처:** 원문 SourceWork/Witness/Passage 및 해당 lineage·전통의 morphology fragment가 지정되어 있음.
2. **중립 지표:** 동일 캡처/좌표계의 `requiredFeatureKeys`가 정의되어 있음. 주변 부위를 대신 측정한 proxy는 거부.
3. **사람 정답:** 현대 이미지에서 해당 *형태 자체*를 반복 판정할 수 있게 조건·보이지 않음 상태가 정의되어 있음. 사람 라벨러에게 전통 운세 의미를 노출하지 않음(FR312E).
4. **실증/재현:** 관측 모델과 사람 형태 판정의 오류·경계·재현성 평가. 평가 기준은 결과를 본 후 맞추지 않으며, 새 임계값은 별도 사전등록/권한 단계에서만 검토.
5. **방법론:** 하나의 reading 안에서 서로 다른 전통의 region map/스팬/허용 의미를 임의 섞지 않음.
6. **입력 품질:** 해당 부위 가시성·표정·촬영 조건 통과, 부분만 보일 때 완전형 확정 금지.
7. **허용:** 기존 F1/T5/FR311의 해당 조건 정식 binding·Claim/Production 허용이 실제로 있어야 다음 단계로 전달.

다음은 **별개 출력**이다.

```text
F0: eyebrow.shape.arch_ratio = x (실제 검증된 중립 관측)
F1: eyebrow.named_traditional_form = UNISSUED (검증된 전통 매핑 부재)
F2: eyebrow.traditional_claim = BLOCKED (F1 부재)
F7: 종합 결과 = 다른 승인된 부위만 소비 / 눈썹은 보류 사유 표시
```

**예시 x는 임의 값이며 실제 관측값/분류 임계값/관상 의미가 아니다.**

### 6.2 claim 소비·조합·표시

- 부위별 `observationState`(usable/section_limited/recapture_required)와 `diagnosisResolution`(resolved/resolved_mixed/unsupported_method)은 별도 유지(Face Architecture v0.3).
- 삼정은 FRB005의 별도 **7개 세로 기준점/같은 좌표계/관측 가능성** 충족 전까지 실제 구간/판독 금지. 눈썹 길이 ≠ 삼정 눈썹 세로 기준점.
- 십이궁/오관/부위 조합은 methodology-specific region map과 상호 조건이 함께 허용된 경우에만. 판독 강도·궁위 순위·TOP3는 기존 comparison policy/Claim Type Registry 권한 없으면 출력 금지.
- F7/F8 종합은 사용된 근거/부분 지원 이유를 보존. 하나의 부위가 불가여도 다른 승인된 부위는 계속.
- LLM과 템플릿은 **이미 구조화된 허용 Claim의 문장 표현**만. 관측값을 직접 넣고 `부자상/성공/질병` 등을 새로 추론하지 않음.
- 사주 명식은 얼굴에서 계산하지 않는다. 서로 다른 관상/사주 claim 조합은 독립적인 향후 통합 권한 없이 실행하지 않는다.

## 7. 평가 데이터·지표·독립성

**서로 다른 자료는 서로 다른 용도**

| 코호트 | 허용 목적 | 금지 |
|---|---|---|
| #2453의 기존 23장 개발 로컬 캡처 | 현재 모델/기하의 실제 실행·회귀·복원 | 독립 정확도 일반화, 자동 Product 승격 |
| 집 PC의 168장 헤어라인 정답 | 보이는 모근 경계와 헤어라인 가림의 탐색 평가 | 광대·귀·볼·눈꺼풀의 정답으로 대체 |
| 새로운 정밀 세부 형태 사람 검토 | 부위별 분할·경계·형태 측정 검증 | 자동 AI 라벨을 사람 정답으로 간주 |
| 동의·권리가 확보된 독립 다각도/3D 참조 | 상대 돌출/깊이의 독립 측정·등록 검증 | 같은 생성 모델 Z를 기준 정답으로 사용 |

검증 대상은 `이미지/사람/촬영 세션`을 분리해 중복·파생 프레임이 독립 표본으로 집계되지 않도록 한다. 전처리·참조·독립 검증 집합을 분리하고, 실제 제품 촬영 범위(25/30cm, 조명, 포즈, 장치)를 구분해 기록한다.

**지표**

- **분할:** 사람 정답 대비 부위별 IoU/Dice/경계 거리, 실제 부위 누락, 배경 오검출, 가림 때의 허위 완성.
- **2D 관측:** 정답선/실제 사람이 잰 거리·각도에 대한 편차, 정규화 후 절대·상대 오차, 좌우 정합, 동일인 반복 촬영 분산.
- **상대 3D:** FR295/FR299에 부합하는 독립 등록 참조와의 오류·편향·순위 안정성·촬영 조건별 차이. 별도 기준 없으면 descriptive only.
- **형태 분류:** 사람이 명시적으로 판정 가능한 형태/불가능을 구분하고 사람 간 합의·재검토, 정확/혼동/보류 및 신뢰성 기록. 실제 표본이 없으면 `not_evaluated`.
- **종합:** 필요한 관측 입력이 사라지거나 바뀌었을 때 claim이 허위로 남지 않는지, 출처·방법론·상태·한국어 문장이 일치하는지.
- **성능/보안:** 사진당 추론 지연·메모리, 실패 복구, 로컬 원본 무결성, 브라우저 저장/업로드 없음. **속도만으로 정확도 통과 아님**.

수치 합격선·테스트 샘플 수는 새로운 근거 없이 발명하지 않는다. 먼저 인간 정답/사용권리/비교군/사전 고정 평가 정의를 확보하고 실증 결과로 임계값 후보를 분리한다.

## 8. 단계별 실제 구현 작업·파일 범위·완료 판정

### 단계 1 — 요구→정규 키→실제 모델/출처 대응

- **즉시 작업:** [전체 관측 항목 대응표](whole-face-feature-mapping-20261105.md)의 각 행에 `sourceMetricRefs`, 실제 코드 경로, PR #2453의 해당 UI/worker 관측 여부, 필요한 사람 정답의 부위·시점, 전통 형태 출처를 연결한다.
- **보존:** FR282 29개, FR293 18개 계산 상태, FR294 11개 동결, 기존 사주 로드맵.
- **검증:** 29개의 정규 키가 정확히 한번씩 존재; 기존 18/11 상태 drift 없음; 미간·볼 깊이·귀 펼쳐짐 등 추가 요구 중 어디에도 대응할 수 없는 것은 `extension_candidate`로 나타남.
- **완료 증거:** 항목별 `source_key / observation_definition / implementation_path / executable_capture / model_gap / traditional_predicate / missing_evidence`가 채워지고 원본 소스와 대조됨.

### 단계 2 — 미병합 로컬 검토 UI의 실제 사진-관측 경로 확인

- **선행 확인:** PR #2453이 아직 열려 있고 `tools/face-reading/two-view`는 `main`과 다를 수 있음. 기존 작업 브랜치/23장 로컬 결과 및 2026-10-29 윤곽 수정 이후 재실행 상태를 먼저 확인.
- **코드 재사용:** 해당 브랜치의 `morphology-assessment.mjs`, `morphology-geometry.mjs`, `parsing-worker.mjs`, `reading-catalogue.mjs`, `review.mjs`, `parsing-storage.mjs`, `READING-PLAN.md`.
- **구현:** 화면 항목에서 실제로 어떤 후보 scalar가 입력·산출되는지/정규 계산기에 도달하는지 조사. 누락·부분·불가 사유를 부위별 보여 주고 후보와 canonical authority를 혼동하지 않음.
- **검증:** 기존 23장과 수정 이후 실제 로컬 재실행·복원, 모델 실패/재시도/취소, 원본·마스크·기존 8개 정면 측정 불변, 신뢰할 수 없는 저장 입력 거절. 실사진에 접근 못 하면 구현 연결만 검증하고 `empirical_unverified`.
- **완료 증거:** 부위별 사진 입력→관측→설명 연결 및 실패 이유가 실제 동작. 인간 정확도 합격은 별도.

### 단계 3 — 눈썹·눈꺼풀·콧볼·입술·이마·귀 경계의 2D 증거 보강

- **행동:** 현재 ResNet18 19개 클래스 mask와 MediaPipe를 같은 사진·동일 이미지 좌표에서 대조; 부족한 특징에만 독립 후보 모델 시험. 가시/부분/가림/화장/그림자/가짜 마스크 경계를 분리.
- **컴포넌트:** 새 모델 후보마다 기존 worker 뒤의 *연구용 어댑터*로 넣고 현재 model-pin/labelmap/worker 실패 격리를 유지.
- **검증:** 실제 정답과 개별 feature 단위 거리·형태·가시성 및 반복성. 원시 모델 mask·픽셀 합성은 저장/공개 금지.
- **완료 증거:** 기존 모델 대비 항목별 개선/회귀/불가·사용 권리 판정.

### 단계 4 — 3D·귀 펼쳐짐

- **행동:** FR295/FR299 reference lane에서 코/광대/볼/턱/이마의 중립 상대 입체지표 검토. 정면만으로 볼 수 없는 귀 부착/펼쳐짐은 선택적 사선·측면에서 동일 촬영 결속 검토.
- **검증:** 같은 사진 비교, 독립 참조·등록·권리·오차·재현성. 참조 없이 제품값 발급 금지.
- **완료 증거:** 항목별 독립적 연구 증거. 확보 안 되면 `unavailable`.

### 단계 5 — F1 전통 형태 조건

- **행동:** FR311/FR312E 원문 형태 fragment와 검증된 neutral features를 연결하는 **방법론별 후보 대응표**. 사람에게 정답을 묻는 단계에서는 재물·성격·운세 의미 숨김.
- **검증:** 양성/음성/판정불가/관측불가, 판정자 간 일치, 조건·임계값 사전 고정, lineage 혼합 방지.
- **완료 증거:** 자동 분류 승격 여부가 **항목별 근거**로 평가됨. 미승인 항목은 F2 차단.

### 단계 6 — 삼정/오관/십이궁/종합 판독

- **행동:** 이미 허용된 F1/FaceClaim만 기존 F2/F3/F4/F6/F7/F8 판독 경로로 연결, 없는 입력만 보류. FRB005의 세로 기준·동일 좌표계 요건 충족 전 구간 스팬 실행 금지.
- **검증:** 동일 snapshot + 같은 methodology pack/version → 같은 structured verdict; 서로 다른 출처 혼용/무근거 랭킹/LLM 단독 주장 차단.
- **완료 증거:** 실제 한국어 결과가 사용 관측/전통 규칙/미지원 부위와 추적 가능.

### 단계 7 — 독립 검증·완료 평가

- **행동:** 발행 후보별 독립 자료·반복성·가림·다중시점·라이선스·개인정보 경계 검증.
- **완료 증거:** 29개 정규 항목+확장 요구의 실제 지원/미지원 상태, 정확도/실패 집계, 전통 형태 연결·한국어 결과의 근거가 재실행 가능하고 미해결은 정확하게 보고. **전체 F0/F1/Production 완료를 CI 통과만으로 선언하지 않음.**

## 9. 테스트 규격 (실제 구현 코드에 결속)

### 9.1 정적 계약 검사

1. FR282 29개 키 고유성/부위 범위 및 FR293 18개 materialized 키 세트/FR294 11개 갭 세트가 정확히 대응.
2. 모든 `extension_candidate`가 정규 제품 키와 충돌하거나 자동 생성된 정규 키처럼 노출되지 않음.
3. 각 `itemKey`는 관측 정의/필요 모델/촬영 시점/출처/미지원 처리/자격 상태를 갖거나 명시적으로 `unbound`.
4. FR282 `traditionalBindingIssued`, `productionActivated` 기본 `false`; 미증명 부위를 true로 바꿔 테스트 통과 금지.

### 9.2 합성 단위 테스트

- 동일 얼굴을 미러링/회전/리사이즈해도 역변환 후 동일한 정의된 scalar가 나오거나 **분명한 이유로 보류**.
- 눈썹 인접 픽셀 노이즈/앞머리/눈꺼풀 가림이 있는 경우 **눈썹 털 굵기와 가로 span을 혼동하지 않음**.
- 코 mask의 사각형 폭만으로 코 돌출이 나오지 않음; 광대 정면 너비만으로 볼 함몰이 나오지 않음; 귀 bounding box만으로 펼쳐짐이 나오지 않음.
- 한쪽 귀가 가려졌어도 반대편 눈/코/입의 관측은 유지. 미확정 좌표계 또는 서로 다른 사람의 관측은 결합 거절.
- `unavailable`인 항목은 수치·확정 전통 형태·근거 없는 소비자 문장을 갖지 않음.
- 기존 #2453 0.6/0.7 저장 이력의 스키마/권한 위조 거절, old 8 frontal scalars와 기존 masks 회귀 없음.

### 9.3 실사진·판독 회귀 검사

- 기존 비공개 23장 재실행/재복원 후 관측 품질·오차·미지원 상태 확인. 수정 전 증거를 최신 결과로 오인하지 않음.
- 168장 헤어라인 정답은 **헤어라인 항목에만 사용**; 수동 정답선과 자동 후보 경계 구별.
- 눈썹/눈꺼풀/콧볼/귀/볼 깊이 등 각 특징의 독립 사람 정답 필요. 없으면 `not_evaluated`.
- 전통 source morphology 입력이 없거나 F1 binding 미승인 시 F2/F7에 그 claim이 전달되지 않음. 허용된 다른 부위 해석은 영향받지 않음.
- 사진 원본, 생체 재구성 자료, raw polygon/landmark, 비공개 경로/이름이 공개 저장소/로그/CI 산출물에 없음.

**검증 명령은 실제 수정된 패키지/브랜치의 package.json 테스트 스크립트 및 기존 직접 테스트에 맞춰 선택한다.** 사주 전용 전체 테스트를 형식적으로 반복하는 것보다 관상 로컬 실실행/검토가 우선이다. CI 통과와 실제 정확도 검증을 따로 기록한다.

## 10. 구현 단위·추가 승인 없이 수행할 순서

1. **단계 1:** 대응표의 29개 각 항목에 실제 `sourcePrimitives`/정규 계산 경로, 실제 사진 추출 여부, 전통 원문 연결 위치/부족 항목을 채워 소스와 일치하는 실행 인벤토리 완성.
2. **단계 2:** #2453 현행 브랜치의 실제 사진 경로/23장 재실행 상황 확인. 현재 라이브 UI와 겹치지 않게 기존 경로에서 관측 상태·증거만 보완.
3. **단계 3:** 미해결 11개 중 **단일 이미지에서 보이는 실제 형태**를 먼저 검증, 귀/이마/눈꺼풀/눈썹을 헤어라인 한 과제 뒤로 몰지 않음.
4. **단계 4:** 상대 3D·귀 후면/펼쳐짐은 독립 참조가 확보되기 전까지 별도 `unavailable` 유지.
5. **단계 5~7:** source/형태 대응 실증이 채워진 항목만 기존 전통 의미/제품 계층에서 차례로 검토.

### 완료 보고 형식

- **한 것:** 실제 구현·검증한 기능과 근거
- **남은 것:** 확인된 미완성 항목
- **다음에 할 것:** 현재 단계의 구체적 다음 구현
- **블로커 및 승인사항:** 근거·데이터 권리·실제 승인 결정이 필요할 때만

로드맵 **7단계**와 현재 실행 단계의 상태를 표시한다. 진행률 %를 추정하지 않는다. 이 명세 자체의 작성이 실사용 관상 판독 완료나 `ROADMAP_COMPLETE`를 뜻하지 않는다.

Watchtower-Track: face-observation-engine
