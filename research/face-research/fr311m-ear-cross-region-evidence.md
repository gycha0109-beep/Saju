# FR311M 귀 × 타부위 직접 관계·조합 원문 감사

## 목적

FR311L의 귀 단독 의미 체계를 기준으로 《神相全編》 1~4에 해당하는 《欽定古今圖書集成》 藝術典 제631~634권을 다시 검색해, 귀(耳/輪/廓/耳門/垂珠/墜珠)와 타부위가 함께 등장하는 문구를 양방향으로 감사한다.

핵심 원칙은 다음과 같다.

> 같은 문장에 두 특징이 등장했다는 사실만으로 관계식이나 조합식을 만들지 않는다.

직접 관계는 두 부위의 상대 위치·접촉·가시성·방향 등 **관계 자체**에 의미가 붙은 경우에만 인정한다.  
직접 조합은 A+B(+C) 조건 묶음 전체에 하나의 결과 의미가 직접 귀속된 경우에만 인정한다.

Issue: #2225  
Track Key: `face-research`

## 승인 코퍼스

- 제631권 / 神相全編一
- 제632권 / 神相全編二
- 제633권 / 神相全編三
- 제634권 / 神相全編四

내부 출전 식별자:

- `witness.gujin473.art631.wikisource`
- `witness.gujin473.art632.wikisource`
- `witness.gujin473.art633.wikisource`
- `witness.gujin473.art634.wikisource`

이번 단계에서는 위 코퍼스 밖의 현대 관상 자료나 임의 해설을 근거에 섞지 않는다.

## 조사 방식

### 정방향

FR311L에서 이미 분리해 둔 귀 단독 절과 명명형을 다시 감사했다.

- 相耳
- 相耳訣
- 許負相耳篇
- 土耳 / 棋子耳 / 虎耳 / 箭羽耳 / 金耳 / 木耳 / 水耳 / 火耳
- 豬耳 / 低反耳 / 垂肩耳 / 貼腦耳 / 開花耳 / 扇風耳 / 鼠耳 / 驢耳

### 역방향

631~634권의 다른 절에서 귀 관련 글자를 다시 검색했다.

감사 축:

- 귀 ↔ 눈
- 귀 ↔ 눈썹
- 귀 ↔ 입
- 귀 ↔ 산근·와잠
- 귀 ↔ 이마·日角·머리
- 귀 ↔ 관골·볼
- 귀 ↔ 어깨
- 귀 ↔ 얼굴 전체/정면 가시성
- 귀가 포함된 다부위 전체 조합
- 다른 명명형 내부의 귀 동반 조건

## 판정 등급

1. `direct_cross_region_relation`
   - 상대 위치·접촉·가시성·방향 관계 자체에 의미가 직접 붙는다.
2. `direct_cross_region_combination`
   - 둘 이상의 조건 묶음 전체에 하나의 결과 의미가 직접 귀속된다.
3. `named_form_context`
   - 특정 명명형 내부의 구성 문맥이며 일반 관계식으로 분리할 수 없다.
4. `descriptive_companion`
   - 여러 부위가 함께 기술되지만 특정 관계/조합 귀속을 분리할 수 없다.
5. `phrase_boundary_uncertain`
   - 현 전사·구두점·생략 때문에 문장 경계나 목적어를 확정하기 어렵다.
6. `excluded_non_relation`
   - 부위 대응표·경계 정의 등으로서 관계/조합 의미가 아니다.

## 감사 결과

총 후보: **48**

- 직접 관계: **15**
- 직접 조합: **11**
- 명명형 내부 문맥: **12**
- 동반 묘사: **4**
- 문장 경계 불확실: **4**
- 관계 아님: **2**

직접 근거 레코드: **26**

- 고유 관계 key: **11**
- 고유 조합 key: **10**
- FR311K 직접 근거 재사용: **4**

같은 relation/combination key 아래 여러 출전 근거가 존재할 수 있다. 근거 수가 많다는 이유로 의미 강도를 올리거나 출전 우선순위를 자동 부여하지 않는다.

## 새로 확인한 주요 직접 관계

### 顴骨 ↔ 耳

제631권 相骨:

`顴骨相連入耳，名王梁骨，主壽考`

제633권 壽相格:

`顴骨重貫耳者壽`

판정:

- 두 출전 모두 관골이 귀까지 이어지는 관계 자체에 壽 의미가 붙는다.
- relationKey: `cheekbone_ear.cheekbone_connects_into_ear`
- 서로 다른 evidence로 보존한다.
- evidence 수를 점수나 강화값으로 바꾸지 않는다.

### 耳 ↔ 眉

제632권 一曰耳為採聽官:

- `降地耳低於眉`
- `高起過眉者，主貴聰明文學，才俊富貴也`
- `耳高眉一寸，永不受貧困`

판정:

- 귀가 눈썹보다 낮음과 높음은 각각 명시적 관계식이다.
- relationKey:
  - `ear_eyebrow.ear_lower_than_brow`
  - `ear_eyebrow.ear_higher_than_brow`

제634권의 `高，如眉一寸`은 귀 주어가 생략되고 구두점 의존성이 있어 그 문구 자체는 계속 불확실로 둔다.  
632권에 명시적 `耳高眉一寸` 근거가 존재한다는 이유로 634권의 불확실 문장을 소급 승격하지 않는다.

### 耳 ↔ 日角

제632권:

`耳齊日角，曰大貴`

판정:

- 귀와 전통 이마 부위 日角의 상대 높이 관계에 직접 의미가 붙는다.
- relationKey: `ear_forehead.ear_level_with_sun_corner`
- 日角을 현대 landmark 좌표로 자동 치환하지 않는다.

### 耳 ↔ 肩

제632권:

`耳大四寸，高聳垂肩者，主大貴壽長`

제634권 相耳訣:

`兩耳垂肩，貴不可言`

판정:

- 귀가 어깨까지 드리운 관계에 직접 의미가 붙는다.
- relationKey: `ear_shoulder.ear_droops_to_shoulder`
- 두 출전은 별도 evidence로 유지한다.

### 耳 ↔ 目

제634권 許負相耳篇:

`耳高於目，合受他祿`

판정:

- 귀가 눈보다 높은 관계 자체에 의미가 붙는다.
- relationKey: `ear_eye.ear_higher_than_eye`

반면 `目能自睹者吉`은 自睹의 목적어가 현 전사에서 명시되지 않아 `phrase_boundary_uncertain`으로 유지한다.

### 耳 ↔ 面

제634권:

- `耳白如面，名滿天下`
- `耳白於面，名滿赤縣`

판정:

- 귀와 얼굴의 상대 색 조건에 명성 의미가 직접 붙는다.
- 두 표현의 비교 조건이 같지 않으므로 각각:
  - `ear_face.ear_white_as_face`
  - `ear_face.ear_whiter_than_face`

정면 가시성:

제633권 相面:

`對面不見耳，問是誰家子。主大貴`

- relationKey: `ear_face.not_visible_from_front`

이 역시 사진 판정 threshold나 landmark rule로 자동 전환하지 않는다.

### 垂珠 ↔ 口

제634권 相耳:

`垂珠朝口者，主財壽`

제634권 許負相耳篇:

`下有垂珠肉色光，更來朝口富榮昌`

판정:

- relationKey는 기존 FR311K의 `ear_mouth.earlobe_toward_mouth`를 그대로 사용한다.
- 두 번째 문구의 기존 evidence `fr311k.relation.earlobe_toward_mouth`를 새 evidence ID로 복제하지 않는다.
- 첫 번째 문구는 같은 relation key의 추가 provenance로만 등록한다.

## 직접 조합

### 採聽官 조건 묶음

제631권 十觀 및 제632권 採聽官에는 귀의 형태·색·輪廓·耳門 조건과 눈썹 대비 높이를 함께 묶어 採聽官成을 귀속하는 문구가 있다.

- combinationKey: `ear_official.complete_above_brow_bundle`
- 두 권의 근거는 별도 evidence로 유지한다.

### 金木星 귀 조건

제632권 五星六曜訣斷詩:

귀의 輪廓·風門·형태 조건과 `高過眉眼`을 함께 제시하고 發祿 의미를 붙인다.

- combinationKey: `ear_star.goldwood_above_brow_eye_bundle`

### 관골·귀·鬢

제633권 相面:

`顴骨有壽紋入耳，若兼入鬢者貴`

- 귀로 들어간 壽紋이 다시 鬢까지 이어지는 결합 조건에 貴 의미가 직접 붙는다.
- combinationKey: `cheekbone_ear_temple.life_line_into_ear_and_temple`

### 전체 얼굴 조합

다음 기존/신규 다부위 조합을 귀 역방향 관점에서 확인했다.

- 제631권 論形有餘
  - 기존 FR311K evidence 재사용
- 제632권 達摩五官總論
  - 기존 FR311K evidence 재사용
- 제633권 富格例
  - 귀를 포함한 전체 조건을 富貴相으로 판정
- 제633권 大富格
  - 귀를 포함한 전체 조건을 大富로 판정
- 제633권 中貴格
  - 기존 FR311K evidence 재사용

부분 조건 몇 개만 관찰됐다고 이 전체 조합 key를 자동 생성하지 않는다.

## 일반화하지 않은 주요 문구

### 火耳 + 山根·臥蠶

`山根臥蠶若相應`

- 火耳 명명형 내부 문맥
- 일반 `ear + shangen + wochan` 공식 아님
- `generalizationAuthorized = false`

### 貼腦耳 + 壓眉壓眼

- 貼腦耳 명명형 내부 형태 조건
- 독립 귀↔눈썹·눈 관계 의미로 승격하지 않는다.

### 水耳 / 鼠耳 + 過目

- 각각의 귀 명명형 내부 문맥
- 제634권의 일반 `耳高於目` 직접 관계와 혼합하지 않는다.

### 垂肩耳

`過眉`, `頭圓額潤`, `珠橐肩`이 한 명명형 시구 안에 존재한다.

- 일반 귀↔눈썹
- 귀↔머리
- 귀↔이마
- 귀↔어깨

의 네 독립 규칙으로 분해하지 않는다.

별도로 일반 절에서 직접 확인된 `耳垂肩` 관계만 직접 근거로 사용한다.

### 伏犀眼 / 鷓鴣眼

제633권 눈 명명형 안에 각각:

- `耳內毫長`
- `小耳`

가 등장한다.

두 문구는 해당 눈 명명형 내부 조건으로만 보존하고 일반 귀×눈 조합식으로 승격하지 않는다.

### 鳴鳳眼의 視耳

`上層波起亦分明，視耳睜睜不露神`

현 전사만으로 `視耳`의 정확한 형태 관계를 안정적으로 확정하기 어려워 불확실 상태로 둔다.

## FR311K 중복 방지

FR311M에서 재사용하는 FR311K evidence:

- `fr311k.combination.shape_surplus_lip_teeth_whole_face`
- `fr311k.combination.five_officials_late_fortune`
- `fr311k.combination.middle_noble`
- `fr311k.relation.earlobe_toward_mouth`

동일 source claim에 새 evidence ID나 새 relation/combination key를 만들지 않는다.

## Resolver 규칙

FR311M resolver는 오직 명시적인 exact key만 소비한다.

- exact relationKey → 직접 관계 evidence 조회
- exact combinationKey → 직접 조합 evidence 조회
- 둘 다 없음 → unsupported
- 둘을 동시에 전달 → unsupported
- topic filter는 이미 승인된 evidence를 좁힐 뿐 새 의미를 만들지 않는다.
- 동일 key 아래 출전 수를 점수·강도·우선순위로 변환하지 않는다.
- 상반 polarity가 동일 topic에서 실제로 공존하는 경우에만 `source_conflict`를 표시한다.

독립 feature / named form / morphology term에서 key를 추론하는 경로는 존재하지 않는다.

## 이번 단계에서 하지 않은 통합

FR311M은 **연구 감사 단계**다.

따라서 FR311J 얼굴 전체 질의/출력에 새 귀 evidence를 자동 연결하지 않았다.  
그 작업은 예정된 **FR311N — 귀 근거의 얼굴 전체 통합**에서 별도로 수행한다.

## 안전 경계

아래 권한은 전부 false로 유지한다.

- 관계 자동 추론
- 조합 자동 추론
- 근거 개수 강화
- 출전 우선순위
- 근거 없는 상쇄
- 전통 명칭 → 현대 geometry 자동 바인딩
- landmark 자동 대응
- metric threshold 임의 생성
- 명명형 사진 자동 분류
- 현대 과학 사실화
- 건강 진단
- 실제 수명 예측
- 실제 생식력·자녀 성별 예측
- 실제 성격·도덕성·범죄성 판단
- 상품 해석 자동 활성화

수명·부귀·관직·행실 등 의미는 역사적 전통 문헌의 주장으로만 구조화한다.

## 종료 조건

A. 제631~634권 정방향 검색 완료  
B. 제631~634권 역방향 검색 완료  
C. 후보 48건 장부 등록  
D. 모든 후보 6등급 판정 완료  
E. 직접 관계 15건 / 고유 relation key 11개  
F. 직접 조합 11건 / 고유 combination key 10개  
G. FR311K 동일 근거 4건 중복 생성 없이 재사용  
H. 명명형 문맥 자동 승격 0건  
I. 불확실 문구 직접 승격 0건  
J. 독립 특징 기반 관계·조합 자동 추론 0건  
K. 현대 landmark / metric binding 0건  
L. 사진 자동 판정 연결 0건  
M. FR311F~L 회귀 유지  
N. 표준 CI 통과  
O. 통합검증 통과  
P. squash merge  
Q. main 반영 및 #2225 종료 확인
