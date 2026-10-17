# P0-NATAL N25 — Claim → 실제 소비자 의미 atom 추적 (1차 구현)

- 기준: 2026-10-17 / `docs/ROADMAP.md`의 N25–N30 의미 개선 계획
- 담당: Engine `saju`; Research는 해석 차이 정당성, Bridge는 개별 의미 admission
- 상태: N25 최초 내부 QA 구현 / 19개 전체 원인 분류 및 의미 수정은 **미완료**
- Product/Official/Production/Public/Commerce 권한 변경: **없음**

## 기존 경로 재사용

새 해석 엔진·Registry·의미 복제기를 생성하지 않는다. 기존 `CanonicalReadingSemanticBundleV1`, `OfficialReadingPlanV1`, `OfficialReadingRenderedContentV1`, `ReadingArtifact`, `ProductReadingResponse`를 확인하고, `explainabilityRef`에 실제 바인딩된 primary Claim을 사용자 문장 조각으로 추적한다.

첫 코드: `src/preview/natal-n25-consumer-meaning-atom-trace.ts`.

입력 통합 검사:
1. general:natal intent, bundle semantic hash, plan hash, report hash, artifact provenance의 동일성.
2. 전달된 artifact `readingId`와 응답의 `readingId` 동일성.
3. report의 sections/explainability와 artifact의 동일성.
4. plan이 실제 선택한 primary unit 및 canonical claimId가 report의 `explainabilityRef`와 일치하는지.
5. renderer가 실제 출력한 `insights`, `comparison`, `ambiguity` 내용을 기존 Product compatibility layout 규칙에 맞는 문자열 조각으로 전개하여 동일 section의 실제 consumer 원문과 일치하는지.

이 매핑은 원문 일치가 **유일**할 때만 `exact_unique_consumer_match`; 중복되면 `ambiguous_repeated_consumer_text`, 복수 Claim의 시나리오 공유 문구는 `multi_claim_scenario_not_individually_attributable`, redaction/누락/미확인 매핑은 `consumer_text_not_proven`으로 기록한다. 출력의 Claim ID·source provenance는 **내부 감사 보고서만** 보유한다. Public Product schema에는 절대로 노출하지 않는다.

## 무엇을 해결했고 무엇은 남았는가

- 해결된 첫 결손: 단순히 'Claim이 Plan에 들어 있다'는 관찰보다 한 단계 더 내려가, 출처가 고정된 공식 report의 각 의미 atom이 실제 Product 응답에서 같은 문구로 살아남았는지 검증 가능.
- 여전히 미완: N8 3쌍/고유 5건 및 N10 19개 명식 충돌 쌍의 *실행 audit 자동 연결*, Claims 간 정당한 의미 차이 판정, 소비자용 새로운 합성 의미. N25 도구만으로 `N12 usefulComplete`를 변경하거나 의미 반복을 해결했다고 주장할 수 없다.
- N26 수정은 N25 실제 증거가 있는 결함에 한정. Research-only T8의 `FAMILY_MEANING` 공유 문구를 무근거로 바꿔서는 안 된다.

## 검증 계획

`test/natal-n25-consumer-meaning-atom-trace.test.ts`에서 소비자 호환 투영과 Claim 근거 원문 일치, 중복 복사 모호성, 변조·틀린 reading/snapshot/report/plan 차단을 검증한다. 실제 35 case 및 N8 provenance 연결은 N25 후속 단계의 필수 완료 조건이며, 합격하기 전에는 N25를 완료 체크하지 않는다.

CI Quality, 16-shard, PIE, Production Container, SHA-pinned Integration, 병합 후 main 검증 결과는 PR에 별도 고정한다.

Watchtower-Track: saju
