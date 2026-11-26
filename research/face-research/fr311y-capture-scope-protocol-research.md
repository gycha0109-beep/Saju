# FR311Y — 촬영 범위 프로토콜 연구

## 목적

FR311V에서 capture protocol 연구 대상으로 분류된 4개 전통 방법론을 단일 정면 얼굴 사진으로 억지 해석하지 않도록 입력 범위를 분해한다.

대상:

- 四學堂
- 八學堂
- 十觀
- 三柱

## 결과

총 18개 capture requirement로 분해했다.

| 요구 상태 | 건수 |
|---|---:|
| 현재 V1 정적 정면 얼굴에서 직접 관찰 가능 | 4 |
| 별도 RGB 상태 필요 | 3 |
| 별도 view 필요 | 4 |
| 비얼굴 시각 입력 필요 | 5 |
| 오디오 필요 | 1 |
| source region 자체가 미해결 | 1 |
| 합계 | 18 |

네 방법론 중 현재 V1 정적 얼굴 캡처만으로 완결되는 방법론은 **0개**다.

## 四學堂

현재 정면 얼굴로 직접 볼 수 있는 범위:

- 眼
- 額

추가 입력:

- 當門兩齒 → teeth-visible state
- 耳門之前 → ear-visible oblique/profile view

닫힌 입술 사진에서 치아를 추정하지 않는다.

정면 사진에서 가려진 귀 앞 영역을 복원하지 않는다.

## 八學堂

현재 얼굴 subset:

- 額
- 印堂
- 眼

별도 입력:

- 頭 → whole-head framing
- 耳 → ear-visible view
- 齒 → teeth-visible state
- 舌 → tongue-extended state

`班筍部 / 橫紋中節停合雙`은 현재 source-side surface 자체가 충분히 operationalized되지 않았다.

따라서 해당 항목은:

`no_capture_until_source_region_resolved`

로 둔다.

즉 사진에서 비슷해 보이는 주름을 찾아 임의 연결하지 않는다.

## 十觀

十觀은 본질적으로 단일 얼굴 사진 방법론이 아니다.

현재 얼굴 사진이 직접 제공할 수 있는 것은 일부 subset뿐이다.

- 頭/額 중 얼굴 프레임에 실제 보이는 부분
- 五嶽/三停의 보이는 얼굴 부분
- 五官/六府의 보이는 얼굴 부분

그러나 전체 방법에는 다음 입력이 포함된다.

### 전신/동작

- 威儀
- 坐臥起居
- 形局

→ full-body posture/movement scope 필요

### 허리/등

- 腰
- 背

→ 직접 non-face visual input 필요

### 손발

- 手
- 足

→ 직접 입력 필요

### 목소리

- 聲音

→ explicit audio channel 필요

사진에서 음성을 추정하지 않는다.

또 `心田` 문구를 얼굴·음성으로 현대 도덕성 사실로 판정하지 않는다.

## 三柱

- 頭 → whole-head visible framing
- 鼻 → current frontal face에서 직접 보일 수 있음
- 足 → non-face foot-visible input

따라서 단일 얼굴 이미지로 三柱 전체를 완결할 수 없다.

## 입력 누락 처리 원칙

항상:

```text
missing input
→ unavailable / additional capture required
```

이며 다음은 금지한다.

```text
missing input
→ 다른 얼굴 feature로 추정
```

예:

- closed lips → hidden teeth guess 금지
- closed mouth → tongue guess 금지
- frontal hair-occluded ear → hidden ear completion 금지
- face image → hand/foot/body guess 금지
- face image → voice guess 금지

## 권한 경계

FR311Y는 capture **연구 정의**만 완료한다.

여전히:

- capture execution authorization = false
- empirical validation = false
- traditional semantic inference = false
- automatic binding = false
- threshold = 0
- population norm = 0
- product activation = false
- modern psychology/morality fact = false

## FR311V 연구 공백 종료 의미

FR311W:
- neutral observation construct 22건 연구

FR311X:
- region map 17건 연구

FR311Y:
- capture protocol 4건 연구

까지 완료되면 FR311V가 분리한 **연구가 필요한 43건(22 + 17 + 4)**은 모두 후속 연구 결론을 갖게 된다.

나머지:

- manual-only 1
- semantic-only 2

는 FR311V에서 이미 의도적 종료 상태다.

따라서 이후에는 “연구 누락”과 “실증/구현 미완료”를 명확히 분리할 수 있다.
