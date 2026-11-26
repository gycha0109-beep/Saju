# FR311J 인중·입·입술 얼굴 전체 근거 통합

## 목적

FR311I에서 구조화한 人中 / 口 / 脣 전통 의미를 기존 FR311G 얼굴 전체 근거 체계에 편입한다.

이번 단계의 목표는 제품 판정이나 사진 자동 분류가 아니라 **근거 조회 계약의 확장**이다.

FR311G는 완료된 연구 단계이므로 직접 수정하지 않고 FR311J 통합 계층을 새로 둔다.

구조:

- FR311G: 눈썹 / 눈 / 코 얼굴 근거
- FR311I: 인중 / 입 / 입술 source-local 의미
- FR311J: 두 계층을 보존형으로 결합한 인덱스 / 질의 / 출력

## 통합 규모

FR311J 인덱스 기준:

- 기존 명명형: 87
- 입 명명형: 16
- 총 명명형: 103
- 기존 명명형 claim: 257
- 입 명명형 claim: 45
- 총 명명형 claim: 302
- FR311I 직접 규칙: 127

기존 FR311G 데이터는 복사 후 의미를 변경하지 않는다.

## 부위 확장

FR311J의 근거 부위는 다음까지 확장한다.

- eyebrow
- eye
- nose
- philtrum
- mouth
- mouth_corner
- upper_lip
- lower_lip
- lips
- eyebrow_eye
- context

\`lip_color\`는 별도 해부 부위로 승격하지 않고 \`lips\` 부위의 observation kind로 보존한다.

## 렌즈

기존 FR311G 16개 렌즈를 유지한다.

추가 렌즈:

1. learning_talent — 학습·재능
2. speech_conduct — 언행
3. parents — 부모
4. life_course — 생애 흐름
5. traditional_auspice — 전통 길흉

총 21개다.

### livelihood 명시 대응

기존 얼굴 질의 계층의 생계 관련 키에는 \`labor_livelihood\`가 사용된 반면 FR311I는 \`livelihood\`를 사용한다.

FR311J는 두 키를 문자열 추론으로 자동 변환하지 않고 \`livelihood\` 렌즈의 명시 대응 목록에 함께 등록한다.

### wealth_status 비분해

FR311I의 \`wealth_status\`는 하나의 source-local 복합 주제다.

FR311J는 이를 자동으로:

- wealth
- career

두 렌즈로 분해하지 않는다.

별도 source topic으로 유지하며 명시적 후속 근거가 없는 한 기존 렌즈에서 노출하지 않는다.

## 타부위 문맥

명명형 descriptor 중 다음은 독립 의미가 아니다.

예:

- 猴口의 \`人中破竹更為良\`
- 櫻桃口의 \`齒似榴牙密且宜\`
- 櫻桃口의 \`笑如含蓮\`
- 羊口의 수염 관련 조건
- 기타 \`context\` / \`cross_region_context\`

FR311J에서는 이들을 별도 context registry로 만든다.

질의 시:

- 정확한 formKey
- 정확한 descriptorId

가 함께 입력된 경우에만 \`contextOnly\`로 반환한다.

문맥 단독으로는 semantic evidence가 되지 않는다.

따라서:

- 猴口 + 人中破竹
- children lens
- 해당 명명형에 children direct claim 없음

이면 output은 \`no_direct_evidence\`다.

context가 존재한다는 이유로 children 의미를 새로 만들지 않는다.

## 불확실 근거

FR311I의 \`phrase_uncertain\`은 직접 근거 인덱스에는 보존한다.

다만:

- favorable 확정 근거
- challenging 확정 근거

충돌 계산에는 참여시키지 않는다.

예:

- \`深而長者長壽\` — direct_clear / favorable
- 불확실한 challenging 수명 문구 — phrase_uncertain

만 함께 있으면 \`source_conflict\`로 올리지 않는다.

불확실 근거는 출력의 uncertain 섹션으로 분리한다.

## 직접 규칙 조회

FR311I 일반 direct rule은 기존 코 direct rule과 같은 원칙으로 명시 ID 질의를 사용한다.

즉 \`traditionalRuleIds\`가 제공된 규칙만 질의 후보가 된다.

전통 형태·색·주름·행동을 보고 rule ID를 자동 추론하지 않는다.

## 출력 권한

FR311J 출력은 FR311I에서 도입한 민감 권한 차단을 최종 사용자 출력 계약까지 전달한다.

항상 false:

- scoreAuthorized
- aggregateGoodBadJudgementAuthorized
- unsupportedSynthesisAuthorized
- sourcePriorityInferenceAuthorized
- traditionalRuleInferenceAuthorized
- topicRemappingInferenceAuthorized
- contextSemanticPromotionAuthorized
- healthDiagnosisAuthorized
- lifespanPredictionAuthorized
- fertilityPredictionAuthorized
- childSexPredictionAuthorized
- personalityFactAuthorized
- criminalityInferenceAuthorized
- namedFormClassifierAuthorized
- traditionalRegionToNeutralGeometryBindingAuthorized
- providerLandmarkBindingAuthorized
- metricThresholdAuthorized
- productPredictionAuthorized

## 안전 해석

다음 문구는 역사적 전통 주장으로만 보존한다.

- 장수 / 요절
- 질병
- 생식
- 자녀 수
- 자녀 성별
- 부모·배우자의 생사
- 성격
- 도덕성
- 범죄성
- 빈부 / 관직 / 길흉

현대 과학·심리·의학 사실 또는 실제 예측으로 변환하지 않는다.

## 비범위

FR311J는 다음을 하지 않는다.

- 사진에서 입 명명형 자동 분류
- 人中 길이/폭 자동 threshold
- 입술색 의료 판정
- MediaPipe/provider landmark 자동 연결
- traditional region ↔ neutral geometry 자동 바인딩
- 코×입 / 눈×입 / 눈썹×입 신규 조합 의미 생성
- context의 독립 semantic rule 승격
- 점수 / 다수결 / 강화 / 상쇄
- 최종 제품 해석 자동 활성화

## 종료 조건

A. FR311I 직접 규칙 127건 통합
B. 입 명명형 16종 / claim 45건 통합
C. 총 명명형 103종 / 총 claim 302건
D. 기존 16개 + 신규 5개 렌즈
E. livelihood 명시 대응
F. wealth_status 자동 분해 0건
G. context 의미 승격 0건
H. phrase_uncertain 충돌 판정 참여 0건
I. 민감 권한 전부 false
J. FR311G/H/I 회귀 없음
K. 표준 CI 통과
L. 통합검증 통과 후 squash merge

## 다음 단계

FR311J 종료 뒤에는 FR311K에서 人中 / 口 / 脣과 다른 부위 사이의 **실제 원문 직접 관계·조합**을 별도로 조사한다.

FR311J는 그런 조합을 미리 만들지 않는다.
