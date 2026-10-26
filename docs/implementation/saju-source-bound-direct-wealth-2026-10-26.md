# 명하 사주 — 출처 보유 재물 직접 T8 연구 해석 연결

- 작성: 2026-10-26
- 브랜치: `feat/saju/500-personalized-reading-roadmap` — 중간 PR·병합·main 변경 없음
- 이전 구현: `aa5cc05` — 연·월운 T9와 독립 분야 중심 T8 연결
- 권한: 내부 Research Preview만 허용. 상품·공식 풀이·직접 재정 조언·수입 예측에 사용하지 않음.

## 문제와 구현

이전 다중 근거 재물 T8은 **같은 관측 채널에 재성과 다른 십신 계열**이 함께 있어야 중심 T8을 만들었다. 동일 500명에서 **재물 중심 다중 근거 T8 미충족 118명**이 남아 있었다.

그러나 저장소의 기존 `wealth-natal-reading-candidate.ts`에는 `GENERAL_NATAL_CONCLUSION_FAMILY_RULES`와 `WEALTH_NATAL_READING_RULES`로 이미 등록된 **원국 전체에서 출처 기반 십신 계열을 관측하는 별도 재물 T8**이 있다. 이 규칙은 같은 채널 다중 근거 해석이 아니고 연구용이며, 기존 재물 중심 T8을 대신하지 않는다.

1. `src/research/wealth-natal-multifactor-candidate.ts`: 이미 있는 고전 기반 재물 직접 T8 중 실제 `wealth` 계열을 포함하는 규칙과 필요한 원본 T5·방법론을 현재 재물 연구 Registry에 **그대로 편입**. 별도 사주 계산기·병렬 권위 레지스트리는 만들지 않았다.
2. `src/preview/wealth-natal-multifactor-report.ts`: 동일 Snapshot/실행에서 EvidenceSelector가 **실제로 선택한** 재물 직접 T8만 원본 Rule/Methodology/Source, 상위 T5, 실측 십신 위치까지 역추적하는 `sourceOwnedDirectWealthT8` 구현. 원본이 허용하지 않은 금전 결과·투자 조언·시기 추정은 금지한다.
3. `src/preview/natal-structural-integrated-research.ts`: 해당 근거를 독립 연구 해석으로만 표시한다. 기존 `domainStructuralGuides.wealth.core`나 `readingGuide`, `usefulComplete`의 근거 부족 상태를 대체·승격하지 않는다.
4. `scripts/saju-500-whole-chart-structural-final-audit.mjs`: 재물 직접 T8의 실제 선택 건수, 원래 중심 T8 미보유 명식에서의 도달, 기존 Source/Claim/Fact 연결과 비승격 여부를 마지막 실행에서 확인한다.

## 동일 500명 실제 실행 결과

| 측정 항목 | 결과 |
| --- | ---: |
| 전체 명식 실행 | **500/500 성공** |
| 직접 재물 연구 T8의 실제 선택 | **391명, 2,067건** |
| 기존 다중 근거 중심 재물 T8 보유 | **382명** |
| 기존 중심 T8이 없지만 직접 연구 T8은 확인된 명식 | **9명** |
| 여전히 중심 T8이 없는 명식 | **118명** |
| 중심 T8도 직접 연구 T8도 없는 명식 | **109명** |
| 직접 T8 출처·적용·권한 위반 | **0건** |
| 빌드 / ESLint / 타입 검사 / 최종 500명 로컬 검사 | **모두 통과** |

- 동일 시드: `0x5a1a2026`, 참조 시각: `2026-10-25T00:00:00.000Z`.
- **9명은 제한된 직접 구조 T8 관측이 새로 도달한 것이지, 재물 종합해석이 완성된 것이 아니다.**
- 109명을 포함해 기존 연구에 없는 재물 계열을 만들어 넣거나, 출처 없는 다중 축을 결론으로 승격하지 않는다.
- 결과 원본: `docs/implementation/saju-source-bound-direct-wealth-500-evidence-2026-10-26.json`.

## 남은 구현

- P1: 재물 중심 다중 T8 공백 118명의 실제 근거 부족 해결은 **미완료**. 원본 자료가 허용하는 새로운 독립 다중 근거 규칙이 확인돼야 한다.
- P0: 신강·격국·조후·희용기신의 최종 결론 권한은 미확정.
- P2: 대운-원국 효력 판단 권한 미확정.
- 제품·공식 Reader·판매 해석으로의 권한 승격은 이 작업에서 하지 않는다.
