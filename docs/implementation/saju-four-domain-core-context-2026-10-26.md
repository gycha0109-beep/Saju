# 명하 — 4개 원국 분야의 중심 T8·독립 보조 T8·공유 구조 연결 구현

- 작성: 2026-10-26
- 작업 브랜치: `feat/saju/500-personalized-reading-roadmap` (PR/병합 없음)
- 선행 커밋: `5eb484e` — N13/N14/N20/N22 내부 연구 그래프 통합
- 구현 범위: 기존 5개 원국 중 **전체 사주를 제외한 직업·재물·관계·사업**의 중심 해석 가이드에서 동일 계산 명식의 실제 공유 구조 T8을 소비한다.
- 권한: 기존 분야별 `researchOnly=true`, `mayPublish=false`, `maySell=false`, `usefulComplete=false`. 새 도메인 결론 생성 금지.

## 변경된 실제 코드

1. `src/preview/natal-structural-integrated-research.ts`:
   - `DomainSourceBoundedStructuralGuide`와 `domainStructuralGuides`를 추가했다.
   - 각 분야의 **기존 report.readingGuide.coreClaimType**과 실제 선택된 `report.sections` T8 Claim을 매칭하여 중심 해석을 확인한다.
   - 독립적으로 선택된 `readingGuide.supporting`에 포함된 T8만 보조 축으로 보존한다. 선택된 적 없는 T5나 구조 관측을 새로운 보조 T8로 계산하지 않는다.
   - 중심 T8의 정확한 `claimType`·`ruleId`·같은 명식 `domainT8ClaimId`와 연결된 공유 T8만 원국 맥락으로 전달한다. 원본 Claim·Source ID, 가족/관측 채널, 구조 맥락을 함께 보존한다.
   - 직업·재물·관계·사업별 HTML에 **기존 중심 해석 → 독립 보조 → 실제 공유 구조 → 출처/한계**를 출력한다.
   - 재물 분야의 **단일 T5만 존재하는 상태**는 `isolated_wealth_t5_not_synthesis`로 보류한다. 주제 관련 구조 T8이나 긴장만 존재하는 경우에도 임의로 중심을 생성하지 않는다.
   - 분야별 상태는 `core_with_structural_context` / `core_without_structural_context` / `isolated_wealth_t5_not_synthesis` / `no_source_bound_core` 중 실제 증거에 따라 선택한다.
2. `scripts/saju-500-whole-chart-structural-final-audit.mjs`:
   - 마지막 500명 검증에서 각 분야의 실제 선택된 중심 T8·독립 보조 T8·공유 구조가 동일 명식의 원본 Claim/Rule/Source와 일치하는지 검사한다.
   - 중심 해석이 없는 상태에서 `core`, `contextualClaims` 또는 `supporting`이 임의 생성되면 실패한다.
   - 기존 해석의 무근거 완성 승격을 차단하고 실제 미충족 인원을 집계한다.

## 고정 500명 통합 검사 결과

- 동일 시드 `0x5a1a2026`, 기준 시각 `2026-10-25T00:00:00.000Z`.
- 빌드, ESLint, 타입 검사 및 500건 구조 통합 실행 **통과**.
- 실행 예외: **0건**, 중심/보조/공유 구조 출처 정합 오류: **0건**.

| 분야 | 독립 중심 T8 보유 명식 | 그 중심에 공유 구조가 실제 연결된 명식 | 중심 T8 없는 명식 |
| --- | ---: | ---: | ---: |
| 직업 | 268 | 100 | 232 |
| 재물 | 382 | 200 | **118** |
| 연애·관계 | 484 | 305 | 16 |
| 사업 | 487 | 287 | 13 |

- 재물 118명에 직접 중심 T8이 없는 기존 **빈 영역은 해결되지 않았으며**, 이 가운데 1명은 `singleWealthT5Observation`만 가진 독립 관측 상태다.
- 이 표의 '중심 T8'은 분야별 연구 보고서가 실제로 선택한 **기존 Rule/Source 소유 T8**이다. 취업·소득·결혼·사업 성공 예측의 승인이나 개인 결과 확정을 뜻하지 않는다.
- 공유 구조의 수는 기존과 동일한 3,038건이며, 이번 구현은 **근거 소비 순서와 중심 Claim의 실제 연결**을 추가한 것이므로 T8 개수를 인위적으로 늘리지 않았다.
- 기계 판독 가능한 실제 근거: `docs/implementation/saju-four-domain-core-context-500-evidence-2026-10-26.json`.

## 남은 로드맵

- P0 전체 명식: 신강·격국·조후·용신/희기신의 출처별 허용 조건이 부족하다. 이들을 편의적 점수로 합산해 새로운 단일 결론으로 만들지 않는다.
- P1 분야별: 직업·재물·관계·사업의 **독립 중심 T8 자체가 없는 명식**은 정직하게 보류하고, 근거가 있는 새로운 직접 분야별 T8이 확보되는 경우에만 확장한다. 공유 구조 참조만으로 미충족 인원을 줄이지 않는다.
- P2 시기별: 연·월운의 현재 기간 제한은 구현됐으나 대운 R072 효과 판정은 `executable=false` 계약을 유지한다.
- 상품: Research/Preview 결과는 Production/Official/Commerce/Reader 판매 품질 승인과 다르다.
