# 명하 전면 관상 관측 기술·모델·데이터 선정 보강 명세 v0.1

> 작성 2026-11-05 · Watchtower-Track: face-observation-engine  
> 소스: 사용자 제공 `deep-research-report.md`(동일 날짜의 심층 조사 보고서)와 저장소 FR282/FR284~FR294, 로컬 [PR #2453](https://github.com/gycha0109-beep/Saju/pull/2453), [기존 기술 명세](whole-face-observation-technical-spec-20261105.md).  
> **성격:** 조사 결과에 근거한 기술 선택·검증 순서. 모델/가중치 실제 사용, 학습, 권리 취득, 사진 검증, 전통 형태 분류 또는 Product/Production 권한 **미승인**.  
> **29개 항목의 개별 배정:** [관측 항목 대응표 부록 B](whole-face-feature-mapping-20261105.md).

## 1. 사용·비교·학습·보류를 혼동하지 않는 기술 결정

| 우선 | 기술 | 결정 | 기존 자산과 연결 | 채택 전 확인 |
|---|---|---|---|---|
| 1 | **기존 MediaPipe Face Landmarker** | **재사용** | FR77/FR208~FR293 및 #2453에 고정된 `@mediapipe/tasks-vision 0.10.35`; 얼굴 좌표·눈/코/입·품질 | 모델 artifact/version, 좌표 변환, 눈꼬리의 실제 해부학적 역할, 촬영 조건별 정확도 |
| 2 | **기존 BiSeNet/ResNet18 ONNX + ONNX Runtime Web** | **로컬 기준선 재사용** | #2453의 19-class 후보 mask, pinned `onnxruntime-web 1.23.2`, worker·23장 로컬 UI | #2453은 **main 미병합**; 실사진 재실행 및 마스크/특징별 정확도, CelebAMask-HQ 학습 가중치 상업 권리 |
| 3 | **사람 검토가 가능한 기존 로컬 사진 화면** | **재사용/확장** | #2453의 부위별 8개 항목 카드, 정면/측면, 실패·가림·기존 기록 | 2026-10-29 입술 윤곽 수정 후 23장 재실행/복원 확인; 새 저장 형식 추가 시 이전 데이터 보존 |
| 4 | **FaceXFormer** | **비교만** | 기존 BiSeNet 대비 parsing·landmarks·visibility·pose 성능 비교 가능 | 논문·저장소의 범용 출력이 눈썹 *털 밀도*, 귀 *귓불*, 헤어라인 *모근 경계*까지 제공한다는 증거 없음; 가중치·학습 데이터 권리/추론 환경 점검 |
| 5 | **3DDFA-V2** | **독립 3D 참조 전까지 연구 후보** | FR295/FR299/FR300-R1Z의 상대적 코·광대·볼·턱/이마 연구 | 300W-LP 학습 provenance, 모델/가중치 권리, Windows 실행, 후보와 독립된 3D 정답. 정면 단안 Z ≠ 실측 깊이 |
| 6 | **PyTorch 또는 Keras 3(+torch backend)** | **정답 정의 후 새 관측기 학습** | 눈썹 털·눈꺼풀 주름·비공 세부·귀 외곽/귓불 등 기존 모델에 없는 라벨/ROI | 라벨 동의·분할 세밀도·인물별 분리, weight/license, 정확도·회귀·ONNX 변환 검증 |
| 7 | **ONNX Runtime Web 우선, 필요 시 Windows WinML/LiteRT** | **배포 후보기술** | 현재 브라우저 worker를 먼저 재사용; Python localhost는 *기존 브라우저로 어렵다는 증거*가 있을 때만 분리 | 모델 ONNX op 지원, CPU/WASM와 WebGPU 값 일치, 기기별 지연·메모리·프라이버시 |
| 8 | **Apple ARKit TrueDepth 등** | **독립 연구용 보조** | 특수 센서가 있는 기기에서 상대 3D 비교 참고 | 일반 RGB 전면카메라 25~30cm 필수 제품 경계를 바꾸지 않음; ARKit도 계측 정답이라고 단정 불가 |
| 9 | **DECA, 연구용 CelebAMask-HQ/300W/FFHQ 등** | **허용된 범위에서 연구 참고만** | shape·parsing·랜드마크 연구 벤치마크 | 비상업/연구용 조건은 상용 모델 학습·출력 도입의 증거가 아님 |
| 10 | **얼굴 속성/나이/인종/성별/신원 판별 API** | **목표 밖** | 명하의 중립 형상 관측과 무관 | 해당 분류가 가능하다는 이유로 전통 관상·개인 특성 판단 정당화 금지 |

**채택 기준:** 기술 이름/논문 FPS가 아니라 **특정 정규 관측 ID의 사람 검토 정답 대비 오차·가림 시 보류·반복성**이 좋아졌는지. 서비스 제공사의 홍보성 `face analysis` 설명은 각 세부 형태의 정확한 출력을 입증하지 못한다.

## 2. 데이터셋·가중치 출처 분리 판정

| 데이터/자산 | 실재 라벨·용도 | 개발 판단 | 금지할 오해 |
|---|---|---|---|
| **기존 23장 로컬 자료 (#2453)** | 해당 화면·분할 후보의 개발/회귀 입력 | 현재 경로 재실행 및 변경 전후 비교 | 인물/세션 독립 평가나 전체 얼굴 정답 아님 |
| **기존 168장 헤어라인 라벨** | 가시 모근·가림의 수동 검토 | 해당 경계의 실패 분류/검토 설계에만 사용 | 눈썹 밀도/귀/볼 3D GT로 전용 불가 |
| **CelebAMask-HQ** | 19-class 눈썹·피부·머리·귀 등 부위 mask | 비상업 연구 범위의 parsing 비교 | 털의 개별 굵기, 쌍꺼풀 주름, 귓불 세부, 사람별 상업용 GT를 제공하지 않음 |
| **CelebA / FFHQ** | 속성·이미지 | 약관 범위의 연구용 특성/촬영 분포 참고 | 속성 라벨로 전통 관상·객관적 얼굴형 기준 생성 금지 |
| **300W / AFLW / 300W-LP** | 얼굴 랜드마크/포즈 및 파생 훈련 | 비상업·연구 조건·원천 provenance 확인 후에만 비교 | pretrained 3DDFA 가중치의 상업권 자동 확보 불가 |
| **DECA/Florence/MICC 3D** | 3D 연구 복원/스캔 | 라이선스 범위의 방법론 비교 | 제품에서 독립적으로 확보된 3D 참조를 대체한다고 단정 불가 |
| **사용권 명확한 독립 본인 동의 이미지·라벨** | 마스크, 가시/가림, 실제 세부 형상, 반복 촬영 | 향후 학습/정량평가의 기준 후보 | 데이터 동의만으로 모델 정확도·전통 분류 권한 발생 불가 |

**권리 체크리스트(자산마다 별도 기록):** 코드 license / 모델 weight license / 원본 학습 데이터 / 파생 데이터 이용 허용 / 상업적 학습·R&D / 제품 추론 사용 / 재배포 / 인물 촬영·개인정보 동의 / 삭제 요구 처리. **코드 MIT와 가중치·데이터 상용 허용은 다르다.**

**심층 보고서의 공백:** 귀의 귓바퀴·귓불 세부 정답을 갖춘 데이터셋, 미간 깊이/볼 함몰의 독립 RGB↔3D 페어, 상용 분석 API의 **실제 해당 관측 필드**, 공개 데이터셋의 상업용 파생 가중치 권리를 명시적으로 입증하지 못했다. 따라서 **없다고 단정하는 대신 `not_verified`**, 제품 도입·발행은 차단.

## 3. 모델 자체 정확도와 최종 얼굴 형태 정확도를 분리

```text
실제 사진 → 포즈/가림/초점/표정 검사
    ├─ pinned MediaPipe → 실제 좌표 + 검증된 기존 중립 계산
    ├─ pinned local BiSeNet → 부위 pixel 후보 / 노이즈·가림 검사
    ├─ FaceXFormer → 동일 캡처에서 경쟁 후보, 필요 태스크만
    ├─ 3DDFA-V2 → 상대적 3D 연구 후보 (FR295/299 참조 증거 필요)
    └─ 눈썹/눈꺼풀/코/귀 ROI → GT 확보 시 소형 관측기 후보
             ↓
  공통 좌표/실제 원본 프레임/부위 가시성 결속
             ↓
  기존 FR293 정규 측정 또는 별도 local candidate
             ↓
  독립 인간/계측 정답 대비 '형태 측정' 오류 및 보류 검증
             ↓
  검증된 관측만 기존 전통 F1/해석 권한 게이트로 제출
```

**실패를 국소화한다:** 귀가 가려졌어도 눈/입/코 결과 유지. 광대 2D 너비가 있어도 볼 함몰/3D 돌출 발급 금지. 코 mask 크기가 있어도 코끝 실제 상대 돌출 발급 금지. 헤어라인 모델이 실패해도 삼정만 보류하고 다른 정규 관측은 중단시키지 않음. 일괄 `model_confidence`는 특징별 독립 정답 측정 신뢰도와 다르며, 모델 내부 확률을 출처/관상/제품 권한으로 변환하지 않음.

### 정확한 모델 선택 기준

| 목적 | 모델 출력 검증 | **최종 특징** 검증 |
|---|---|---|
| 눈썹 굵기·모근선·귀 외곽 | 부위별 IoU/Dice, 경계 F1/Chamfer | 눈썹 가시 폭/모근 경계/귀 윤곽의 실제 **선·폭 오차**, 가림 시 허위 완성 |
| 쌍꺼풀·귓불 유형 | crop 분류 macro-F1/balanced accuracy | 정의된 형태 인간 판정자 간 합의/재검토, `not_observable` 보류 |
| 눈·코·입술 윤곽 | NME/PCK, 경계 거리/각도 오차 | 기존 FR293 **정규 출력 스칼라** 오차·반복 촬영 변화 |
| 광대·볼·코·턱 상대 3D | 모형 재투영 정도는 설명용 | 독립 3D 참조와의 오류·편향·동일인 반복성·시점별 불안정 |
| 판독 결합 | 정규 데이터/출처 스키마 일치 | 관측 가능 상태가 바뀔 때 F1/FaceClaim이 적절히 보류되고, 별도 출처 없는 전통 의미가 생성되지 않음 |

사전 고정된 사람 정답·평가 프로토콜·라이선스가 없으면 `not_evaluated`. 원래 논문 벤치마크 수치가 높다는 사실만으로 `validated` 승격 금지.

## 4. 실제 순서로 실행할 4개 비교 실험 (기존 7단계 로드맵의 작업 세분화)

**P1. 현재 실제 사진→계산 경로/품질 재현 (로드맵 단계 1~2)**

- 기존 #2453 브랜치·사전 모델/ONNX·로컬 23장 자료부터 재사용. 2026-10-29 수정 후 새 23장 실행 및 복원/가림 이유 확인.
- 동일 사진에서 29개 정규 키 각각 `calculation_available`, `photo_observation_available`, `candidate_only`, `unavailable` 표시. 사람 정답이 없다면 accuracy는 `not_evaluated`.
- **종료물:** 중립 특징별 **어디서 멈추는지** 재현 가능한 목록. PR 분기/원본 불변/비공개 자료 경계를 보존.

**P2. 눈썹 털 폭·눈꺼풀·비공·귀 외곽의 2D 비교 (로드맵 단계 3)**

- 현재 BiSeNet ResNet18 vs 조건부 ResNet34/FaceXFormer vs 필요시 전용 crop 모델. 동일 사진·동일 좌표·기존 crop 제약.
- 사람에게 mask/윤곽·가림과 형태 라벨을 수정하도록 하고 **모델의 임시 점수**와 사람 라벨을 분리. 검토 전 수치는 제품 미발행.
- **종료물:** 각 세부 특징의 정답 대비 오류·보류·반복성. 제일 좋은 분할 IoU 모델이 반드시 제일 좋은 *눈썹 굵기* 모델은 아닐 수 있음.

**P3. 상대 3D 비교 (로드맵 단계 4)**

- FR295/FR299/FR300-R1Z **코끝↔콧대 상대 projection**부터 검증하고 광대·볼·턱/이마로 확장; 모든 항목은 정의된 중립 기준축이 필요.
- 3DDFA-V2 출력은 후보, ARKit TrueDepth/별도 스캔은 자체적으로 측정/등록 품질이 검증된 경우에만 독립 참조. 동일 모델 결과를 ground truth로 사용하지 않는다.
- **종료물:** 독립 참조 페어 확보 여부와 오류 표, 실패 시 해당 정규 수치를 계속 `unavailable`로 유지.

**P4. 소형 형태 모델 학습 → 배포 호환성 → 전통 원문 연결 (로드맵 단계 3~5)**

- P2에서 실제 공백이 드러난 **부위 단위**로 모델 정의(예: 눈썹 마스크의 두께 프로파일, 눈꺼풀 주름 visible/hidden/unknown, 비공 경계, 귓불 구조).
- 충분히 정당한 *사람 검수 라벨*과 학습권리 확보 뒤 PyTorch 또는 Keras3/torch backend로 간단한 MobileNet 계열 baseline부터 검증. ONNX 변환 후 브라우저 worker 동작·latency/메모리·예측 일치 테스트.
- 전통명 대응은 **FR311 소스와 F1 자격**이 실제로 있는 경우만 후보. 체계적으로 막힌 claim은 F2/F7에 전달하지 않음.
- **종료물:** 모델/데이터 provenance, 사람 정답 대비 관측 오차, ONNX 동일성, 불가 사유, F1 권한 상태를 함께 제시.

위 P1~P4는 **기존 7단계 내부의 실제 비교 순서**이며 새 8·9단계 로드맵이 아니다. P3가 외부 정답 부족으로 막혀도 P2/P4의 별도 항목 검증을 멈추지 않는다.

## 5. 데이터·학습·브라우저 배포 세부 계약

- **학습 데이터 필수 라벨:** (1) `opaqueSubjectRef`와 `captureSessionRef` (로컬만), (2) `viewRole`/촬영 조건, (3) 각 부위 `visible/partial/occluded/out_of_frame/unknown`, (4) 사람 교정한 해당 **마스크/곡선/키포인트 또는 형태 label**, (5) `modelPrefillRef` / `humanReviewed` / `reviewConflict`, (6) 사용/삭제 권리. 생체 원본·마스크 공개 금지.
- **분리 방식:** 사람 단위 train/validation/test 분리. 같은 사람의 사진 여러 장/같은 원본의 crop·회전·synthetic augmented 이미지를 다른 집합에 배치하지 않는다.
- **전처리:** 이미지/부위의 원본 픽셀 기준 crop과 모델 입력 크기, 색 순서, 정규화, inverse transform을 각각 고정. 좌우 미러링으로 가짜 해부학적 좌우 확정 금지.
- **사람 검수:** 연구 자료의 `auto` vs `human_corrected` vs `ambiguous` vs `unobservable`을 분리. **AI로 예비 라벨을 만들었다는 것만으로 독립 정답이 아니다.** 사람 판정자 수/합의 방식·불확실성을 기록.
- **학습 모델:** 소형 분할/분류기부터. Keras3는 `KERAS_BACKEND=torch`로 모델 실험을 진행할 수 있지만 Keras 설치 자체는 학습 라벨/사전학습 가중치/상업 권리를 제공하지 않음. TensorFlow 전용 분리는 **실제 실행 환경의 공식 wheel 호환성** 확인 후 별도 venv에서만.
- **런타임:** 기존 browser worker ONNX/WASM 기준선 우선, WebGPU는 기기·지원 op/성능·결과 동등성이 입증되면 선택. Python subprocess/localhost 서버는 기존 worker로 해결할 수 없는 증거가 나온 뒤에만.
- **버전 기록:** pinned 모델 exact revision/digest, 런타임 버전, training source manifest, preprocessing, coordinate convention, validation cohort, bundle export provenance를 기록하되 원본 얼굴 해시·경로 등 비공개 값은 공개 문서·PR·CI에 넣지 않음.
- **회귀:** 사람이 검토한 정답/방법론을 모델 개선용 튜닝 데이터에 섞어 독립 성능 측정에 쓰지 않는다. 정규 output/제공 status의 변동이 있으면 해당 항목의 전통 Claim 승격은 별도 검토.

## 6. 소스별 검증 사실 및 미확정

| 출처(2026-11-05 확인) | 확인 가능한 내용 | **확인되지 않는 내용** |
|---|---|---|
| [Google Face Landmarker](https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker) | 얼굴 landmarks·blendshape·transform | 눈썹 털 밀도/완전 귀 세부/실측 피부 표면 mm |
| [yakhyo face parsing](https://github.com/yakhyo/face-parsing) | 코드 MIT·PyTorch/ONNX·CelebAMask-HQ 훈련 계보 | 릴리스 가중치의 상업적 이용권/귓불·쌍꺼풀 세부 GT |
| [FaceXFormer ICCV 2025](https://openaccess.thecvf.com/content/ICCV2025/html/Narayan_FaceXFormer_A_Unified_Transformer_for_Facial_Analysis_ICCV_2025_paper.html), [원 저장소](https://github.com/Kartik-3004/facexformer) | 공통 parsing/landmark/visibility/pose 모델 후보 | 관상 부위 세부 측정 오차, 현재 실기기 CPU 속도, 가중치/원천 데이터 사용권 |
| [3DDFA-V2](https://github.com/cleardusk/3DDFA_V2) | 상대 3DMM/ONNX 및 300W-LP 학습 사실 | 독립 실측 3D 정답 또는 자동 상업 사용 허용 |
| [Keras 3](https://keras.io/keras_3/), [모델 export](https://keras.io/api/models/model_saving_apis/export/) | torch backend와 ONNX 등 inference export 옵션 | 모델 학습용 얼굴 세부 정답/가중치 자동 공급 |
| [ONNX Runtime Web](https://onnxruntime.ai/docs/tutorials/web/) | WASM/WebGPU 등 실행 후보 | 모델별 모든 op/모바일 기기 성능 보장 |
| [CelebAMask-HQ](https://mmlab.ie.cuhk.edu.hk/projects/CelebA/CelebAMask_HQ.html), [300W](https://ibug.doc.ic.ac.uk/resources/300-W/), [FFHQ](https://github.com/NVlabs/ffhq-dataset) | 부위 파싱/랜드마크/얼굴 이미지의 연구 자료 | 상용 학습 기본 권한 및 관상형 라벨 |
| [PyTorch 설치](https://pytorch.org/get-started/locally/), [TensorFlow 설치](https://www.tensorflow.org/install/pip) | 설치 가능한 플랫폼별 공식 설명 | 보고서가 주장한 특정 Python 환경에서의 실제 설치 성공; **공식 문서 표현이 변할 수 있으므로 실행 시 pip/휠 검증** |

**중요한 문서 불일치:** FaceXFormer 논문은 10개 태스크로, 공개 README는 9개 태스크로 기술한다. 실제 실행에서 **사용 가능한 태스크와 출력 스키마**를 확인하기 전에는 모델 기능 목록을 확정하지 않는다. PyTorch Windows Python 지원 범위 또한 공식 문서 페이지 간 표기가 달라질 수 있어, 보고서의 3.14 지원 문구만으로 현지 설치 호환성 완료를 선언하지 않는다.

## 7. 로드맵/권한에 대한 불변조건

- [원래 7단계 로드맵](whole-face-observation-reading-roadmap-20261105.md), 29개 정규 관측 + 18개 추가 관측 요구, FR294의 18/29 계산 상태와 11개 hard-gap 보존.
- #2453의 원본/저장·모델/프라이버시 제약과 연구용 미병합 상태 유지. 자동 병합·기존 브랜치 수정·새 백엔드 배포를 이 문서 하나로 허가하지 않는다.
- 독립 기준/권리/형태 조건이 없는 부분은 `unavailable` 또는 `not_evaluated`. **전통 관상 해석이나 개인의 성격·재산·건강·운명에 관한 증명된 예측을 출력할 권한이 생기지 않는다.**
- 새 모델/GT/클래스/임계값의 상용 승격은 증거 확보 및 기존 owner 권한 경계에서 별도 검토. 현재 데이터 사용권 확보를 위해 외부 업체·기관 연락은 하지 않는다.

Watchtower-Track: face-observation-engine
