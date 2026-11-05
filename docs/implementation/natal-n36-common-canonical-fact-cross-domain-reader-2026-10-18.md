# P0-NATAL N36 — 같은 원국 사실을 여러 분야에서 실제로 참조하는 지점

2026-10-18 · Watchtower-Track: saju · 내부 독해 개선 / source-owned Research 유지

## 제품 문제
N30b의 General 개요와 N31–N33의 직업·재물·사업·관계 별도 한국어 연구 원문은 한 사람의 원국을 공유한다. 그러나 현재 내부 HTML에서는 **어느 확정된 계산 사실이 둘 이상의 분야에서 독립적으로 참조되는지** 사용자가 파악하기 어렵다. 기존 Claim을 모아 하나의 새로운 길흉·인과관계 주장을 만들어서는 안 된다.

## 구현
- 기존 `buildNatalN32ExpandedDomainResearchReading`의 **원문 지문과 네 영역별 검증 Claim**을 그대로 사용한다.
- `src/preview/natal-n36-common-evidence-index.ts`에서 동일 `snapshotId`·`calculationHash`에 속한 정확한 `derivedFacts.tenGods.value.<pillar>.<component>.value` 경로를 묶는다.
- **적어도 서로 다른 두 분야가 같은 계산 경로·표시 값을 독립적으로 참조**할 때만 공유 사실로 표시한다. Claim ID, Rule/version, Source IDs는 해당 분야 단위로 유지한다.
- `scripts/natal-personalized-preview.mjs` 내부 데모의 General 개요와 개별 네 분야 원문 사이에 별도의 근거 연결 섹션을 삽입한다. 원래 5분야 Official/Preview 원문은 변경하지 않는다.
- 출생시간 미상, 공통 근거 없음, 출처/원문 지문 불일치는 사실 표시 제한·차단으로 처리한다.

## 명확한 제한
공통 계산 사실은 공통 **해석 의미**, 인과관계, 행운/불운, 결과 예측 또는 독립 출처 승인이 아니다. 기존 논쟁 중인 연구 문구와 출처 상태는 그대로 유지한다. `researchOnly=true`, `usefulComplete=false`, `mayPublish=false`, `maySell=false`; 새 DB·API·비밀키·Production Guest 호출·클라우드 비용 없음.

## 검증
실제 Canonical 계산 명식, 서로 다른 분야의 정확한 Claim/Rule/Source 및 출생시간 미상 음성 사례를 한 개 focused test 파일로 검사한다. 일반/통합 CI 및 병합 후 결과는 GitHub PR/Actions가 authority이다.
