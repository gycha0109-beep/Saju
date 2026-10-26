# 명하 직업 분야 — 기존 세부 십신 T8의 정확한 연구용 소비

- 날짜: 2026-10-26
- 작업 브랜치: `feat/saju/500-personalized-reading-roadmap` — 중간 PR·병합·main 변경 없음
- 선행 커밋: `56a2700` — 재물 직접 연구 T8 연결
- 적용: 내부 Research Preview 전용, Official/Production/Publish/Sell 전부 금지

## 기존 연구의 적용 계약

`src/research/career-natal-reading-candidate.ts`의 기존 규칙은 천간에 관측된 **정확한 십신 세부 유형**을 한정된 직접 직업 연구 T8로, 지지의 동일 세부 유형을 **보조 맥락**으로 사용한다. 별도로 등록된 `career-natal-multifactor-candidate.ts`는 두 개 이상의 독립적인 근거 축을 요구하며 **기존 개별 십신 연구 규칙을 중심 다중 근거 팩으로 가져오지 않도록 명시**한다.

이 경계를 유지하기 위해 개별 규칙을 다중 근거 팩에 섞지 않았다.

## 구현

- `src/preview/source-bound-direct-career-reading.ts`: 기존 `createCareerNatalReadingCandidateRegistry`, 기존 `runInterpretation`, 기존 `buildReadingCompositionEvidence`만 재사용한다. 실제 선택된 Claim의 Rule·Matched Evaluation·Source·계산 경로와 원래 `CareerTenGodSemanticSpec`의 십신 세부 유형이 일치해야만 표시한다. 천간 직접 관측과 지지 보조 관측을 서로 분리한다.
- `src/preview/natal-structural-integrated-research.ts`: 기존 명식·직업 다중 근거 풀이를 유지하면서, 위의 **독립 연구 팩**이 같은 Canonical Snapshot에서 선택한 T8을 별도 근거 섹션으로 추가한다. `replacesMultifactorCore=false`, `mayConcludeCareerOutcome=false`를 보존한다.
- `scripts/saju-500-whole-chart-structural-final-audit.mjs`: 최종 500명 실행에서 실측 Claim·세부 십신 유형·채널별 경로·자료 출처·권한 비승격·원국 직업 중심 미보유 분리를 확인한다.

## 실제 500명 결과

| 지표 | 결과 |
| --- | ---: |
| 명식 실행 성공 | **500/500** |
| 세부 십신 천간 직접 연구 T8 도달 | **500명, 1,340건** |
| 지지 세부 십신 보조 연구 T8 | **1,701건** |
| 기존 직업 다중 근거 중심 T8이 없는 명식 | **232명** |
| 기존 중심 T8이 없지만 직접 세부 십신 관측이 도달한 명식 | **232명** |
| 출처·계산 경로·비승격·실행 오류 | **0건** |
| 최종 로컬 빌드·ESLint·타입·500명 검사 | **모두 통과** |

고정 시드: `0x5a1a2026`, 시각: `2026-10-25T00:00:00.000Z`. 실행 증거: `saju-source-bound-direct-career-500-evidence-2026-10-26.json`.

**중요:** 직업 관련 T8 관측이 500명 모두에게 도달한 것은 십신 계산 사실과 개별 규칙이 연결된 결과이지 **개인별 직업 종합 판단이 모두 완성됐다는 뜻이 아니다**. 기존 직업 중심 T8 268명/미충족 232명 판정은 그대로 유지한다.

## 남은 로드맵

- 직업 다중 근거 중심 T8 자체의 미충족 232명은 기존 연구에서 허용하는 독립 핵심 패턴이 추가로 확보돼야 개선할 수 있다.
- 직업 이름·취업·연봉·승진 등 개인 결과, 신강·격국·용신·대운 효과는 이 연구 규칙으로 판정하지 않는다.
- 직업 직접 십신 해석은 `Research Preview` 경계를 지키며 정식 공개·판매 권한으로 승격하지 않는다.
