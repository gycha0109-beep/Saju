# FR312C — 직접 규칙 68건 관찰 동치성 연구

## 1. 목적

FR312B는 직접 규칙 230건 중 현재 중립 관찰 구조와 같은 단일 영역에서 실증 연구를 설계해 볼 수 있는 morphology 후보 68건만 남겼다.

FR312C의 목적은 이 68건을 곧바로 자동 관상 규칙으로 바꾸는 것이 아니다.

이번 단계는 다음 질문을 전수 판정한다.

> 전통 원문의 관찰 조건과 현재 FR293의 중립 관찰값이 실제로 같은 관찰 구성을 측정하는가?

그리고 결과를 다음 실증 단계로 넘길 수 있는 더 작은 후보군으로 축소한다.

---

## 2. 연구 경계

FR312C에서도 다음 권한은 계속 0이다.

- 자동 전통 관상 연결
- 임계값 숫자 승인
- population norm / percentile 승인
- provider landmark 직접 연결
- 여러 중립 feature의 자동 합성
- 전통 명명형 자동 classifier
- score / rank
- 제품 해석
- 현대 과학·의학·심리 사실화

특히:

`threshold가 필요하다`

와

`threshold 값이 승인되었다`

는 완전히 다른 상태다.

FR312C는 전자만 판정할 수 있고 후자는 계속 금지한다.

---

## 3. 입력 기준선

FR312B shortlist:

- 직접 규칙 전체: 230
- FR312B 단일부위 morphology 연구 후보: 68
- 자동 전통 연결 승인: 0

FR293 중립 관찰 기준선:

- canonical feature: 29
- materialized extractor: 18
- extractor/authority gap: 11

FR311 기준선:

- canonical evidence: 621
- lens gap evidence: 28
- 제품 얼굴 조회 영구 미지원: 18

이 기준선은 FR312C에서 변경하지 않는다.

---

## 4. 판정 방법

각 68건에 대해 다음을 기록한다.

1. 원문 관찰 표현
2. 전통 영역
3. 비교 가능한 현재 중립 feature
4. 현재 비교 feature가 없으면 명시적 `current_none`
5. 제안 가능한 측정 구성
6. 구성 동치성 판정
7. threshold 필요 상태
8. 다중 feature 필요 여부
9. 추가 extractor 필요 여부
10. 정면 단일 사진에서의 관찰 가능성
11. 촬영 상태 / 깊이 / 조명 의존성
12. 다음 연구 준비 상태

같은 입·인중 영역을 본다는 사실만으로 동치를 인정하지 않는다.

---

## 5. 최종 분류

| 판정 | 수량 | 의미 |
|---|---:|---|
| 측정 의미 비교 후보 | 0 | 별도 기준 정의 없이 바로 동치 연구가 가능한 항목은 없음 |
| 임계값 정의 선행 | 10 | 현재 중립 연속축은 비교 가능하지만 전통 상대 표현의 경계가 없음 |
| 다중 관찰 구성 필요 | 18 | 하나의 전통 조건이 여러 형태 요소를 동시에 요구 |
| 구성 불일치 | 4 | 같은 영역의 현재 feature가 원문과 다른 개념을 측정 |
| 원문 관찰 정의 불충분 | 12 | 비유·형상명이 강해 안정적인 현대 측정 정의를 고정하기 어려움 |
| 추가 extractor 필요 | 21 | 원문 관찰 구성은 비교적 명확하지만 현재 FR293에 필요한 관찰축이 없음 |
| 재검토 후 수동 전용 | 3 | 전통 명명·상징 자체가 핵심이라 자동 관찰 연결보다 수동 key가 적절 |
| 합계 | **68** | FR312B shortlist 전수 |

---

## 6. threshold 판정

68건 전체의 threshold 상태를 세 가지로 나눴다.

| 상태 | 수량 |
|---|---:|
| threshold 정의 필요 | 28 |
| 관찰 구성 정의가 먼저 | 37 |
| 수동 전용이라 threshold 비적용 | 3 |
| 합계 | **68** |

여기서 28건은 threshold 값이 있다는 뜻이 아니다.

- threshold value 승인: **0**
- threshold tuning 승인: **0**
- population norm 승인: **0**

18건의 다중 관찰 구성 후보도 각 구성 요소를 합성할 권한은 없다.

---

## 7. 현재 가장 명확한 다음 실증 후보 10건

다음 10건만 FR312D의 실증 프로토콜 후보로 넘긴다.

### 인중

- `fr311i.philtrum.thin_narrow`
  - 원문: `細而狹者`
  - 비교축: `mouth.philtrum_length_width`
  - 현재 상태: 폭 관련 연속축은 존재하나 “가늘고 좁음”의 전통 경계값이 없음

### 입 전체

- `fr311i.mouth.small_short`
  - 원문: `口小而短`
  - 비교축: `mouth.width_and_relative_size`
  - 현재 상태: 상대 크기 축은 존재하나 “작고 짧음”의 경계가 없음

### 입꼬리

- `fr311i.mouth.corners_droop_bad_speech`
  - 원문: `兩角低垂`
  - 비교축: `mouth.corner_orientation`
  - 현재 상태: 입꼬리 방향 연속축은 존재하나 전통의 “낮게 처짐” 경계가 없음

### 입술 두께 계열

- `fr311i.lip.upper_thin`
- `fr311i.lip.lower_thin`
- `fr311i.lip.both_thick`
- `fr311i.lip.both_thin`
- `fr311i.lip.upper_thick_short_life`
- `fr311i.lip.lower_thin_gluttony`
- `fr311i.lip.thick_quiet_thin_litigious`

비교축:

`mouth.visible_lip_fullness`

FR293은 위·아래 visible lip band의 세로 span 및 결합 면적 비율을 연속값으로 낼 수 있다.

그러나 이 값은 전통의 `厚 / 薄` 자체가 아니며, FR312C는 어떤 수치도 두껍다/얇다로 분류하지 않는다.

---

## 8. 다중 관찰 구성 18건

대표 예:

`橫闊而厚`

는 최소:

- 입의 상대 가로 크기
- visible lip fullness

두 요소를 함께 본다.

현재 두 중립 축이 모두 존재하더라도:

`mouth.width_and_relative_size + mouth.visible_lip_fullness → 橫闊而厚`

라는 자동 합성 권한은 없다.

또 다른 예인:

`直深長`

은:

- 인중 중심선 직선성
- 깊이/relief
- 길이

를 함께 요구한다.

현재 FR293은 길이/폭 관련 축은 있으나 직선성과 깊이 축은 없다.

따라서 다중 구성 필요 여부만 기록하고 실제 합성은 하지 않는다.

---

## 9. 추가 extractor 필요 21건

대표적인 부족 관찰축:

- 인중 상·중·하 분할 폭 profile
- 인중 중심선 편차 / 굴곡
- 인중의 relief / 깊이 / 평평함
- 윗입술·아랫입술 각각의 별도 길이
- 위아래 입술 overlap 관계
- 입술 body의 위치 편차
- 입술 함몰 / 결손 / 돌출 정도
- 입 오므림 / 수축 geometry
- 입 벌림 상태와 visible teeth exposure

FR312C는 이 필요성을 기록만 한다.

기존 FR293 extractor를 수정하거나 새 extractor 권한을 발급하지 않는다.

---

## 10. 구성 불일치 4건

다음 원문은 같은 영역의 기존 neutral feature가 있어도 실제 측정 개념이 다르다고 판정했다.

- `形如角弓`
  - 일반적인 mouth outline angularity와 활 모양 자체는 동일 개념이 아님
- `口能容拳`
  - 상대 입 너비와 실제 입을 벌려 수용할 수 있는 크기는 동일 개념이 아님
- `口角如弓`
  - 입꼬리 평균 방향값과 “활 같은 입꼬리 형상”은 동일 개념이 아님
- `口方四字`
  - 일반적인 outline angularity와 전통의 사자형 입 분류는 동일 개념이 아님

따라서 같은 부위를 측정한다는 이유로 기존 feature를 재사용해 자동 연결하지 않는다.

---

## 11. 원문 관찰 정의 불충분 12건

다음 계열은 비유나 형상 표현만으로 현대 측정 정의를 고정하기 어렵다.

예:

- `明如破竹`
- `細如懸針`
- `鼠口`
- `口如縮囊`
- `口如吹火`
- `口如馬口`
- `口如縮螺`

이 경우 FR311의 전통 의미를 보고 현대 morphology를 역설계하지 않는다.

먼저 source-side observation definition이 추가로 확보되어야 한다.

---

## 12. 수동 전용 3건

- `龍脣`
- `羊脣`
- `水星得地口脣方`

이 세 항목은 현재 direct rule 문구만으로 neutral observation classifier를 만드는 것이 부적절하다.

전통 명명 또는 상징 key를 사람이 확정한 뒤 의미 계층을 조회하는 방식이 현재 권한상 안전하다.

---

## 13. 단일 사진 관찰성

FR312C는 관찰 가능성도 별도로 기록한다.

- 단순 폭·길이·입꼬리 방향·visible lip band:
  - 중립 표정의 정면 촬영에서 비교 연구 가능
- 깊다/얕다/평평하다/함몰:
  - 조명과 3D relief에 민감
- 입을 벌림, 치아 노출, 오므림, 수축:
  - 촬영 시점의 표정·입 상태에 민감
- 비유형/명명형:
  - source definition 선행 없이는 사진 조건 자체를 고정하지 않음

즉 “사진 한 장에서 보인다”와 “안정적으로 반복 측정할 수 있다”를 동일시하지 않는다.

---

## 14. FR312C 종료 판정

- FR312B shortlist 68/68 전수 판정: 완료
- 중복 ruleId: 0
- 누락: 0
- specific neutral comparator 또는 current-none: 전수 기록
- threshold 상태: 68/68 전수 판정
- threshold 값 승인: 0
- population norm 승인: 0
- provider landmark 직접 binding: 0
- multi-feature 자동 synthesis: 0
- automatic traditional binding: 0
- product interpretation: 0
- FR293 기존 extractor 계약 변경: 0
- 다음 실증 프로토콜 후보: **10**

---

## 15. 다음 단계 — FR312D

FR312D는 위 10건에 대해서만 실증 프로토콜을 설계한다.

최소 검토 항목:

- 정면 중립 사진 조건
- pose 허용 범위
- 반복 촬영 재현성
- 같은 사람 반복 측정 안정성
- 좌우 / 표정 / 촬영거리 영향
- extractor 버전 고정
- 사람이 source expression을 판독한 reference label 작성 방법
- neutral continuous metric과 reference label의 비교 방법
- threshold 탐색과 threshold 승인 권한의 분리

FR312D에서도 실증 결과가 나왔다는 이유만으로 제품 자동 관상 권한을 발급하지 않는다.

`연구상 비교 가능`

과

`제품 자동 해석 허용`

은 계속 별도 권한이다.
