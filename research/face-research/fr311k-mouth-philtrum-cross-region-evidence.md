# FR311K 인중·입·입술 × 타부위 직접 관계·조합 감사

## 목적

FR311I/J에서 구조화한 人中 / 口 / 脣 근거를 기준으로, 《神相全編》 1~4에 해당하는 《欽定古今圖書集成》 藝術典 제631~634권에서 타부위와의 직접 관계·직접 조합을 양방향으로 감사한다.

이번 단계는 "같이 나온다"와 "관계·조합 자체에 의미가 붙는다"를 분리하는 연구다.

## 승인 코퍼스

- 제631권 / 神相全編一
- 제632권 / 神相全編二
- 제633권 / 神相全編三
- 제634권 / 神相全編四

내부 출전 식별자:

- witness.gujin473.art631.wikisource
- witness.gujin473.art632.wikisource
- witness.gujin473.art633.wikisource
- witness.gujin473.art634.wikisource

이번 단계는 위 4권 밖의 판본·후대 해설·현대 관상 자료를 섞지 않는다.

## 조사 방식

### 정방향

人中 / 相人中 / 相口 / 許負相口 / 입 명명형 / 論脣 / 許負相脣에서 다음 타부위가 함께 등장하는 문구를 수집했다.

- 치아
- 혀
- 수염
- 귀
- 코
- 눈
- 눈썹
- 이마·천정
- 관골·하정
- 얼굴 전체 및 기타 동반 부위

### 역방향

제631~634권의 다른 단원에서 人中 / 口 / 脣이 역으로 등장하는 문구를 다시 수집했다.

대표 역방향 후보:

- 壽相格의 人中↔齒
- 面上十大空亡의 鬚↔脣
- 許負相耳篇의 垂珠↔口
- 許負相齒篇의 脣↔齒
- 論舌 / 許負相舌篇의 舌↔口·脣
- 鷹嘴鼻 / 猩鼻 / 猿鼻의 鼻 명명형 내부 口·脣 문맥

## 판정 등급

1. direct_cross_region_relation
   - 두 부위의 상대 위치·접촉·노출·범위 등 관계 자체에 의미가 직접 붙는다.
2. direct_cross_region_combination
   - 둘 이상의 조건을 함께 만족하는 경우 하나의 의미를 직접 귀속한다.
3. named_form_context
   - 특정 명명형의 원문 내부 구성 조건일 뿐 일반 관계식으로 분리되지 않는다.
4. descriptive_companion
   - 여러 부위가 함께 기술되지만 독립적인 결합 의미를 분리할 수 없다.
5. phrase_boundary_uncertain
   - 전사·구두점·문장 경계가 불확실해 직접 규칙 승격이 불가능하다.
6. excluded_non_relation
   - 같은 절에 있어도 독립 규칙의 병렬 나열일 뿐 관계/조합이 아니다.

## 감사 결과

총 후보: 35

- 직접 관계: 7
- 직접 조합: 14
- 명명형 내부 문맥: 9
- 동반 묘사: 3
- 문장 경계 불확실: 1
- 관계 아님: 1

직접 근거 레코드: 21

- 고유 관계 key: 6
- 고유 조합 key: 13

같은 정확한 관계/조합이 서로 다른 단원에서 반복될 수 있으므로 레코드 수와 고유 key 수는 동일하지 않다.

## 직접 관계

### 人中 ↔ 齒

출전: 제633권 壽相格

원문: 人中著齒而齊者，福壽

판정:
- 인중과 치아의 맞닿음·정렬 관계 자체에 의미가 붙는다.
- relationKey: philtrum_teeth.aligned_reaching
- 독립 특징에서 자동 추론 금지.

### 鬚 ↔ 脣

출전: 제633권 面上十大空亡

원문: 鬚不過脣為一空

판정:
- 수염이 입술을 넘지 않는 상대 범위 관계가 직접 규칙이다.
- relationKey: beard_lip.beard_not_past_lip

같은 절의 "脣無，鬚為一空"은 현 전사·구두점만으로 문장 경계를 확정하지 않아 phrase_boundary_uncertain으로 남긴다.

### 垂珠 ↔ 口

출전: 제634권 許負相耳篇

원문: 下有垂珠肉色光，更來朝口富榮昌

판정:
- 귓불이 입을 향하는 朝口 관계 자체에 의미가 붙는다.
- relationKey: ear_mouth.earlobe_toward_mouth

### 口 ↔ 齒

출전:
- 제634권 相口
- 제634권 許負相口篇

원문:
- 口開齒露者無機
- 口開齒出，當失算數。必不久長，少即身故

판정:
- 두 문구 모두 "입을 열었을 때 치아가 드러남"이라는 동일 관계 축이다.
- relationKey: mouth_teeth.open_exposed
- 출전별 의미는 합치지 않고 별도 evidence로 유지한다.

### 舌 ↔ 脣

출전: 제634권 論舌

원문: 未言而舌餂脣者，多淫逸

판정:
- 말하기 전 혀가 입술에 닿는 동적 관계에 직접 의미가 붙는다.
- relationKey: tongue_lip.licks_before_speech

### 舌 ↔ 口

출전: 제634권 論舌

원문: 舌艷而吐滿口者，至富

판정:
- 혀가 입 안을 가득 채우는 관계에 직접 의미가 붙는다.
- relationKey: tongue_mouth.fills_mouth

## 직접 조합

### 다부위 전체 조합

제631권 相容貴賤:
- 眼如點漆 + 口如四字 + 脣似硃紅
- 부귀·총명 귀속

제631권 論形有餘:
- 脣紅齒白을 포함한 이마·귀·코·눈·눈썹 등 다부위 묶음
- 形有餘 및 장수·부귀 귀속

제632권 達摩五官總論:
- 眉緊 + 鼻端平 + 耳聳明 + 海口仰弓
- 晚運通亨 귀속

제633권 中貴格 / 小貴格:
- 입·입술·치아를 포함한 다부위 조건 전체를 각각 中貴 / 小貴로 직접 규정

제633권 富相口訣:
- 左右顴起 + 口方 + 地閣方圓
- 富相 귀속

이들은 전체 조합 key가 명시 입력된 경우에만 조회한다.
부분 조건 몇 개가 들어왔다고 조합을 자동 완성하지 않는다.

### 水星 조합

제632권 五星六曜訣斷詩:

유리:
- 脣紅
- 人中深
- 口齒端正
- 문장·관록·식록 귀속

불리:
- 脣齒麤
- 口角垂黃色
- 빈천 귀속

두 조합은 별도 combinationKey로 유지한다.

### 口 ↔ 舌

제634권:

- 舌大口小，貧薄折夭
- 舌大口小，言不了了
- 舌小口大，言語捷快
- 口寬舌薄，必好歌樂

같은 "舌大口小" 조합은 출전마다 의미가 다르므로 하나의 의미로 합치지 않는다.
동일 combinationKey 아래 별도 evidence를 보존한다.

### 脣 ↔ 齒

제634권:

- 長脣短齒，長命不死
- 脣紅齒白文章士

각각 별도 조합이다.

## 일반화하지 않은 주요 후보

### 猴口 + 人中破竹

원문:
- 猴口兩脣喜又長，人中破竹更為良

판정:
- 猴口 명명형 내부 보조 조건
- 일반 口×人中 조합식 아님
- generalizationAuthorized = false

### 方口 / 仰月口 / 櫻桃口 + 齒

치아 조건이 함께 나오지만 각 입 명명형의 구성 기술이다.
독립적인 口×齒 공식으로 승격하지 않는다.

### 羊口 + 無鬚

羊口 내부 구성 조건이다.
제633권의 "鬚不過脣" 직접 관계와 혼합하지 않는다.

### 鷹嘴鼻 / 猩鼻 / 猿鼻 + 口·脣

이미 FR311H에서 확인된 코 명명형 내부 문맥과 일치한다.
FR311K에서도 일반 코×입 공식으로 승격하지 않는다.

### 燕眼 + 口小脣紅

燕眼 명명형 내부 동반 조건이며 일반 눈×입 조합으로 분리하지 않는다.

### 溺水格

人中交紋 / 眉間黑子 / 口角黑靨이 같은 절에 있으나 각각 독립된 수액 규칙의 병렬 나열이다.
세 부위의 조합식이 아니다.

## 질의 통합

FR311J 질의에 additive 방식으로 다음을 추가한다.

- combinationKeys
- crossRegionEvidenceIds

기존 relationKeys는 그대로 재사용한다.

FR311K resolver 규칙:

1. 정확한 relationKey가 있어야 직접 관계를 반환한다.
2. 정확한 combinationKey가 있어야 직접 조합을 반환한다.
3. relationKey와 combinationKey가 동시에 있으면 둘의 evidence를 모두 보존한다.
4. 상태 표시는 direct_source_combination을 우선할 수 있지만 관계 evidence를 버리지 않는다.
5. 확정 직접 근거의 polarity가 충돌하면 source_conflict를 반환한다.
6. formKey / morphologyTermKey 등 독립 특징으로 relationKey·combinationKey를 생성하지 않는다.

## 출력 통합

FR311J 출력 계약에 교차부위 직접 근거를 additive 방식으로 노출한다.

- directCrossRegionEvidenceIds
- relationKeys
- combinationKeys

관계/조합 근거도 favorable / challenging / mixedOrConditional 섹션에 동일 원칙으로 배치한다.

하지만 다음 권한은 계속 false다.

- relationInferenceAuthorized
- combinationInferenceAuthorized
- contextSemanticPromotionAuthorized
- reinforcementAuthorized
- cancellationAuthorized
- scoreAuthorized
- sourcePriorityInferenceAuthorized
- neutralGeometryBindingAuthorized
- providerLandmarkBindingAuthorized
- metricThresholdAuthorized
- namedFormClassifierAuthorized
- modernScientificFactAuthorized
- healthDiagnosisAuthorized
- lifespanPredictionAuthorized
- fertilityPredictionAuthorized
- childSexPredictionAuthorized
- personalityFactAuthorized
- criminalityInferenceAuthorized
- productInterpretationAuthorized

## 해석 안전 경계

수명·질병·생식·자녀 성별·부모/배우자 생사·성정·도덕성·범죄성·빈부·관록 등은 역사적 전통 문헌의 주장으로만 저장한다.

현대 의학·심리·생물학·통계적 사실 또는 실제 미래 예측으로 변환하지 않는다.

## 종료 조건

A. 제631~634권 정방향/역방향 감사 완료
B. 후보 35건 감사 장부 등록
C. 전 후보 판정 등급 부여
D. 직접 관계 7 evidence / 고유 relation key 6개
E. 직접 조합 14 evidence / 고유 combination key 13개
F. 명명형 문맥 자동 승격 0건
G. 불확실 문구 직접 규칙 승격 0건
H. relation / combination 자동 추론 0건
I. 동시 관계·조합 evidence 보존 및 충돌 검출
J. 현대 좌표·사진 판정 연결 0건
K. FR311F~J 회귀 없음
L. 표준 CI 통과
M. 통합검증 통과 후 squash merge
