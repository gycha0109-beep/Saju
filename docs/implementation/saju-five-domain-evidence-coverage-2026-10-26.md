# 명하 사주 — 5개 분야의 실제 해석 근거 수준 통합 소비

- 날짜: 2026-10-26
- 단일 브랜치: `feat/saju/500-personalized-reading-roadmap`
- 기존 로드맵: 전체 명식 T8 종합 → 분야별 해석의 실제 근거 소비·표시
- 권한: **Research Preview 전용**, 결과·인과·상품 권한 변경 없음

## 구현

기존 원국 Reader는 일반, 직업, 재물, 일반 관계, 사업의 다중 근거 중심 T8과 서로 다른 독립 연구 T8을 제공하지만, 출처가 부족한 명식을 분명히 구분하는 공통 소비 계약이 없었다.

`src/preview/natal-structural-integrated-research.ts`에서 `NatalSourceEvidenceCoverage` / `sourceEvidenceCoverage`를 추가했다. 기존에 **실제로 선택된 원국 중심 T8, 독립 연구 T8, 분야별 공유 구조 참조**만 사용한다.

- `source_bound_multifactor_core`: 실제 기존 분야 중심 T8 존재. 직접 연구 T8의 추가 여부와 관계없이 중심 증거가 있음을 보존한다.
- `source_bound_direct_research_only`: 분야 중심 T8이 없지만 실제 선택된 직접 연구 T8은 존재. **상품용 종합 풀이로 승격하지 않는다**.
- `no_source_bound_direct_or_multifactor_core`: 분야 중심 T8 또는 직접 연구 T8 모두 없음. 공통 원국 구조 T8이 있더라도 분야별 결론으로 대체하지 않는다.

각 메뉴별 실제 중심 ClaimType/RuleId/SourceIds, 직접 연구 Claim IDs/Source IDs, 공유 원국 구조 Claim IDs를 기록한다. 일반 메뉴의 중심 판단도 독립적으로 선택된 기존 `generalStructuralGuide.core`만 사용하며 새로운 직접 연구 T8을 만들어 넣지 않는다.

HTML에서 5개 분야의 **근거 선택·결핍 상태**를 먼저 설명하고, 이후 분야별 중심 및 직접 연구 해석 섹션을 보여준다. 핵심 명리적 길흉이나 개인 결과의 완성도를 숫자로 만들어 내지 않는다.

`scripts/saju-500-whole-chart-structural-final-audit.mjs`는 동일 500개 명식에서 각 분야별 중심 여부, 독립 실제 T8 Claim ID의 유일성과 Source IDs, 공유 구조 출처, 비승격 계약을 비교·집계한다.

## 기존 로드맵에 미완료로 유지

- 연구 출처 조건이 아직 부족한 신강/신약·격국·조후·용신·희기신 보편 최종 판정
- 종합 중심 T8 없는 명식에 대한 직접 다중 근거 부족
- R072 대운 실제 효력과 분야별 사건·수입·직업·상대방 미래 결과
- Production/Official/Product/Publish/Sell 전환 권한

정량 결과는 실제 최종 500명 검사가 통과했을 때만 같은 파일과 별도 실행 증거 JSON에 기록한다. 본 연구 구현은 공개용 품질 승인을 의미하지 않는다.

## 동일 500명 최종 실행 결과

| 분야 | 기존 중심 T8 | 직접 연구 T8만 있음 | 직접 근거 없음 |
| --- | ---: | ---: | ---: |
| 전체 사주 | 408 | 0 | 92 |
| 직업 | 268 | 232 | 0 |
| 재물 | 382 | 9 | 109 |
| 일반 관계 | 484 | 16 | 0 |
| 사업 | 487 | 13 | 0 |

기존 중심 T8·실제 선택된 직접 T8·공유 원국 T8의 Claim/Source 정합성 및 권한 비승격 오류 **0건**. 빌드·ESLint·타입·500명 검사 통과. 이 값은 제품 품질·실제 예측 정확도나 개인 사건 결과를 뜻하지 않습니다.
