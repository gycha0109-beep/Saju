# FR311H 코 × 타 부위 직접 관계 및 명명형 문맥 분류

## 목적

FR311F의 코 단독 의미 연구와 FR311G의 얼굴 공통 근거 질의 다음 단계로,
《神相全編》 第634卷 계통에서 코가 다른 얼굴 부위와 함께 등장하는 구절을
다음 세 종류로 분리한다.

1. 직접 부위 간 관계 규칙
2. 특정 코 명명형 내부의 동반 문맥
3. 문장에는 함께 등장하지만 독립 의미 귀속을 확정할 수 없는 동반 기술

핵심 원칙은 다음과 같다.

> 다른 부위가 같은 문장에 등장한다는 이유만으로 독립적인 코×타부위 조합 의미를 만들지 않는다.

## 기준 출전

- witness: `witness.gujin473.art634.wikisource`
- 계통: 《欽定古今圖書集成》 藝術典 第634卷 / 神相全編四
- FR311F에서 직접 전사 검토한 `相山根`, `相鼻`, 코 명명형 24종 자료를 재사용한다.
- 1925 文明書局 NLC 판의 해당 문구를 이번 단계에서 새로 직접 시각 판독 완료했다고 주장하지 않는다.

## 직접 cross-region 관계

새 의미를 복제하지 않는다.
기존 FR311F 직접 rule을 source authority로 재사용하고
FR311H는 그 rule이 코와 다른 전통 부위를 동시에 조건으로 삼는다는 사실만 분류한다.

### 1. 山根 / 鼻梁 ↔ 額

원문:

`山根連額，鼻梁隆隆而起，與額平者，主位至三公`

기존 rule:

`fr311f.shangen.to_forehead`

FR311H relationKey:

`nose_forehead.shangen_bridge_connected_level_with_forehead`

분류:

`direct_cross_region_relation`

주의:

- 단순히 산근이 높다 + 이마가 높다는 두 독립 특징에서 이 관계를 추론하지 않는다.
- 額을 neutral forehead 좌표나 특정 landmark에 자동 바인딩하지 않는다.

### 2. 鼻梁 ↔ 印堂

원문:

`鼻梁圓而貫印堂者，此人主美貌之妻`

기존 rule:

`fr311f.bridge.round_to_yintang`

FR311H relationKey:

`nose_yintang.bridge_round_penetrates_yintang`

분류:

`direct_cross_region_relation`

배우자 관련 직접 의미는 기존 FR311F rule이 소유한다.
FR311H가 새 배우자 의미를 생성하지 않는다.

### 3. 鼻 ↔ 天庭

원문:

`鼻聳天庭，四海馳名`

기존 rule:

`fr311f.nose.reaches_tianting`

FR311H relationKey:

`nose_forehead.nose_rises_to_tianting`

분류:

`direct_cross_region_relation`

FR311G의 career 렌즈가 이미 named claim에서 `reputation`을 소비하므로,
face-wide direct-rule 경로도 `reputation`을 소비하도록 정합성을 맞춘다.

## 명명형 내부 cross-region 문맥

아래 항목은 특정 명명형 설명 안에서 직접 등장하지만
독립적인 일반 조합 공식으로 승격하지 않는다.

### 伏犀鼻

- `插天庭中`
- `山根直上印堂隆`

둘 다 `named_form_context`.

`伏犀鼻`의 `神清`, `位立至三公` claim과
문맥 descriptor를 동일 claim으로 합치지 않는다.

### 鷹嘴鼻

- `又如鷹嘴鎖脣邊`

입술 가장자리와의 위치 관계가 명명형 형태 설명에 들어가지만
일반적인 코-입 조합 의미는 만들지 않는다.

### 孤峰鼻

- `兩顴低小`

FR311F에서 이미 코 외 context로 분리한 항목이다.

금지:

`nose.named.solitary_peak + cheekbone.low -> 별도 wealth rule`

기존 `無財積`은 孤峰鼻 명명형 claim으로 유지한다.

### 獐鼻

- `金甲二櫃肉綳纏`

전통 주변 부위 표현으로 source-local 보존한다.
`金甲`, `二櫃`를 현대 관골·볼 좌표와 자동 동일시하지 않는다.

### 猩鼻

- `眉眼相挨`
- `面闊脣掀身廣厚`

명명형 내부 문맥이다.

`眉眼相挨`를 기존 FR311E의 일반 눈썹-눈 관계로 자동 변환하지 않는다.
`面闊`, `脣掀`, `身廣厚`를 각각 떼어 독립 의미를 만들지 않는다.

### 猿鼻

- `口頗尖`

명명형 내부 입 동반 조건으로만 보존한다.

## descriptive companion

다음은 원문에 함께 나타나지만
현재 문장 경계 또는 독립 의미 귀속을 더 강하게 확정하지 않는다.

### 鯽魚鼻

`骨肉無親睛露白`

`睛露白`이 함께 등장하지만
이번 단계에서는 `骨肉無親`과의 정확한 독립 규칙 경계를 새로 발명하지 않는다.

상태:

`gujin634_phrase_boundary_uncertain`

### 偏凹鼻

`鼻面相生差不多`

코와 얼굴의 관계를 기술하는 구절이지만
정확한 조작적 의미를 새로 정의하지 않는다.

상태:

`gujin634_phrase_boundary_uncertain`

### 猩鼻

`粗髮毛`

모발 동반 묘사로만 보존한다.

### 鹿鼻

`步急`

보행 동반 묘사로만 보존한다.

## 구조화 결과

FR311H registry:

- direct cross-region relation: 3
- named-form context: 8
- descriptive companion: 4
- context/companion 합계: 12

직접 relation은 기존 FR311F ruleId를 참조한다.

새 semantic claim을 복제하지 않는다.

## Face-wide query 연결

FR311G query 입력을 다음과 같이 유지/확장한다.

- `formKeys`
- `morphologyTermKeys`
- `relationKeys`
- `traditionalRuleIds`
- `crossRegionFeatureKeys` 추가

### direct relation

`relationKeys`에 FR311H relationKey가 명시적으로 들어와야 한다.

예:

`nose_yintang.bridge_round_penetrates_yintang`

→ spouse lens
→ `fr311f.bridge.round_to_yintang`
→ `direct_source_relation`

독립적인 코/인당 특징에서 relationKey를 자동 생성하지 않는다.

### named-form context

정확한:

`formKey + crossRegionFeatureKey`

가 함께 있어야 context가 성립한다.

예:

`nose.named.solitary_peak`
+
`source_local.solitary_peak.cheekbones_low_small`

→ context 확인

하지만 context 자체는 wealth 의미가 아니다.

해당 lens에 직접 semantic evidence가 없다면
output은 `no_direct_evidence`를 유지하면서
`contextOnly`에 문맥만 보여준다.

## Authority boundary

FR311H에서 금지:

- 독립 특징 → relationKey 자동 추론
- named-form context → 일반 조합 rule 승격
- descriptive companion → semantic claim 생성
- 額 / 印堂 / 天庭 / 金甲 / 二櫃 등 전통 명칭을 neutral geometry에 자동 바인딩
- provider landmark 바인딩
- metric threshold 생성
- 사진에서 코 명명형 자동 판정
- 긍정/부정 다수결
- 강화/상쇄
- 출전 우선순위 자동 생성
- 현대 심리·의학 사실화
- product prediction 활성화

## 검증 포인트

- direct relation 3개는 기존 FR311F sourceExpression과 exact match
- context 12개는 해당 FR311F named-form sourceText 안에 실제 sourceExpression이 존재
- source-local feature key는 formKey와 함께 있을 때만 context match
- context만으로 관련 없는 lens의 semantic evidence가 생성되지 않음
- `鼻聳天庭`의 reputation direct rule이 career face-wide lens에서 조회 가능
- 기존 FR311G 87 forms / 257 claims / 20 nose rules / 16 lenses 회귀 유지

## 다음 단계

FR311H가 안정되면 코 연구는:

`단독 의미 → 명명형 → 공통 질의 → 타 부위 직접 관계/문맥 분리`

까지 닫힌다.

다음 연구 우선 후보는 입·인중 단일 부위 의미 체계다.
