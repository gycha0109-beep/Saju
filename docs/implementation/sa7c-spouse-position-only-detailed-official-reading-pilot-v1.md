# SA-7C 배우자 position-only 상세 Official Reading 파일럿 v1

Issue: #2353

Watchtower-Track: saju-bridge

## 목적

`relationship:natal:spouse`의 기존 position-only canonical semantics를 변경하지 않고 detailed presentation을 추가한다.

## 승인 범위

- canonical claim: `relationship.spouse.traditional_spouse_palace_position`
- semantic scope: `position_only`
- detailed roles: `clarification`, `boundary`
- source profile: 1개
- 모델 호출: 0

상세 표현은 “전통 명리에서 일지를 배우자궁 위치로 본다”는 기존 의미를 풀어 설명하는 데만 사용한다.

## 금지 확장

다음은 detailed에서도 새로 허용하지 않는다.

- 배우자 성격·정체·외모·직업
- 특정 인물 식별
- 결혼 시기·성패
- 이혼·재혼·관계 결과
- 궁합 길흉·점수·확률
- 특정 별의 배우자 지표 자동 선택
- 연운·월운 spouse 해석
- LLM semantic authority

## 구현

- `OfficialReadingDetailedDomainKeyV1`에 `relationship:natal:spouse` 추가
- approved detailed registry v4
- spouse 전용 approved source profile 1개 추가
- existing standard text, methodology, qualifier, prohibitedExtensions와 exact-match
- standard/detailed는 동일 canonical semantics와 OfficialReadingPlanV1을 사용
- material이 누락되거나 stale이면 whole-response standard fallback

## 검증 계약

SA-7C는 다음을 확인한다.

- spouse profile은 1개
- required roles는 clarification + boundary 두 개뿐
- detailed coverage = ready
- standard/detailed sourceSemanticHash 동일
- standard/detailed sourcePlanHash 동일
- plan/evidence/disclosures/explainability 동일
- detailed text만 확장
- 모델 호출 0
- 기존 prohibited spouse phrase가 artifact에 나타나지 않음
- stale source presentation은 detailed를 허용하지 않음
- relationship general material이 spouse authority를 대신할 수 없음
- annual/monthly detailed 범위는 계속 미지원

## 비범위

- renderer 전용 spouse 분기
- semantic engine 변경
- public general availability
- persistence
- commerce

## 종료 조건

A. exact spouse scope에서 detailed 요청이 detailed로 해석될 것.

B. standard와 detailed의 canonical meaning/plan/evidence/provenance가 동일하고 모델 호출이 0일 것.

C. position-only 경계를 넘는 의미 확장이 없고 material mismatch 시 standard fallback할 것.
