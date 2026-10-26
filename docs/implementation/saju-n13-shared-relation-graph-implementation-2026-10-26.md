# 명하 — N13/N14/N20/N22 기존 고전 관계를 공유 연구 Claim Graph에 연결

> 날짜: 2026-10-26
> 브랜치: `feat/saju/500-personalized-reading-roadmap` (단일 브랜치)
> 권한: **내부 Research 전용**, Preview/Production/Official/Publish/Sell 승격 금지
> 기준: 기존 `general-natal-conclusion-source-bounded-candidate.ts`, `general-natal-chart-relation-guide.ts`와 전체 명식 공유 구조 구현 로드맵

## 실제 구현

- `src/research/shared-natal-structural-synthesis-candidate.ts`: 기존 **다섯 T5 계열 존재 규칙과 다섯 T8 관계 규칙**을 기존 공유 해석 Registry에 연결. 해당 규칙의 원래 방법론, 원문 출처, 품질 상태, 정확한 `겁재` 일치 조건을 변경하지 않았다.
- 다섯 고전 연구 관계: **식상→재성, 재성→관성, 관성→인성, 겁재→재성, 재성↔인성**. 관계가 명식에 실제 존재할 때만 기존 규칙이 T8을 발행한다. 명식에 없는 관계는 생성하지 않는다.
- `src/research/shared-natal-source-bounded-relation-graph.ts`: **같은 Canonical Saju Snapshot / 같은 InterpretationExecution**으로 기존 N13 개별 관계, N14 연결 관계, N20 서로 다른 관계 공존, N22 종합 연구 기록을 소비한다. 독립된 병렬 명리 권위 엔진을 만들지 않았다.
- 실제 계산 `derivedFacts.tenGods` 경로가 **같은 경우에만** 기존 월령·지장간 연구 T8과 N22 관계의 공통 출처 위치를 연결한다. 해당 연결은 **계산 사실 교집합**일 뿐 관계의 원인·상쇄·신강·격국·용신·개인 재물/직업/관계 결과를 의미하지 않는다.
- N22는 명시적으로 `mayAddProductInterpretation=false`이며 Preview 투영이 허용되지 않는다. **이에 따라 새 소비 모듈을 `src/research/`에만 추가**하고 소비자용 `src/preview/`/상품 보고서·결제 결과는 변경하지 않았다.
- `scripts/saju-500-source-bounded-relation-graph-audit.mjs`: 이전 명식 500명의 동일 시드로 T5→N13 T8→N14/N20/N22→공유 계산 경로의 실제 도달과 권한 격리를 마지막 한 번에 확인하도록 작성했다.

## 완료 기준과 남은 부분

- **이번 구현 목표:** 이미 출처와 적용 조건이 등록된 고전 관계를 실제 공유 **Research Claim Graph**에 연결하고, 기존 연구 소비 계약으로 판정 가능한 범위를 끝까지 전달한다.
- **계속 남는 것:** 강약·격국·용신·대운 효력, 직업·재물의 개인별 실제 결론, 연구용 N13을 상품으로 출판할 별도 semantic authority. 이들은 현재 자료에서 확인되지 않아 규칙 추가나 권한 승격으로 처리하지 않는다.
- 최종 검사 결과는 `docs/implementation/saju-n13-shared-graph-500-evidence-2026-10-26.json`에 저장한다. 검증된 수치만 이 자료를 기준으로 보고한다.
- 중간 PR·중간 병합·main 변경 없음. GitHub CI는 구현 종료 후 최종 검사로 한 번 수행한다.

## 마지막 500명 실제 검사 결과

| 지표 | 실행 결과 |
| --- | ---: |
| 동일 명식 500명 실행 | **500/500 성공** |
| 실제 발행된 N13 고전 관계 T8 | **1,412건** |
| 실제 N14 연결 관계 | **476건** |
| 실제 N20 혼합 관계 | **365건** |
| 기존 월령·지장간 공유 T8과의 정확한 십신 위치 교집합 | **6,955건** |
| 계산/출처/권한 위반 및 실행 예외 | **0건** |
| 빌드, ESLint, 타입 검사 | **통과** |

**주의:** 교집합 6,955건은 기존 연구 근거를 조회할 수 있는 참조 연결의 수이지 6,955개의 명리적 인과 해석이나 출판 허가가 아닙니다. N13/N14/N20의 Research 전용 권한은 변경되지 않았습니다.

최종 GitHub CI 통과 여부는 별도 실행 결과에서 확인합니다.
