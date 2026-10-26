# 명하 일반 관계 T8 — 기존 연구 Claim Graph 소비

- 날짜: 2026-10-26
- 브랜치: `feat/saju/500-personalized-reading-roadmap`, 중간 PR·병합 없음
- 선행 커밋: `0a8f37e` 직업 세부 십신 연구
- 출처 권한: **Research Preview**, 배우자·궁합·결혼·이별 결과 판정 및 Product/Official/Sell 금지

## 구현

- `src/research/relationship-natal-multifactor-candidate.ts`: 기존 `RELATIONSHIP_NATAL_READING_RULES` 및 필요한 원본 `TEN_GOD_FAMILY_*_PRESENT` 규칙·방법론을 현재 관계 연구 Registry에 추가했다. 같은 관측 채널에서 복수 계열이 성립해야 하는 기존 다중 근거 중심 T8을 변경하지 않았다.
- `src/preview/source-bound-general-relationship-reading.ts`: 기존 EvidenceSelector에서 실제 선택된 일반 대인관계 `relationship_conclusion` T8만 실행 결과와 대조하고, 원본 Rule/Methodology/Source ID·상위 T5·실측 십신 계산 위치를 보존한다. 원본의 구체적 배우자·상대 속성·궁합·결혼·이별·외도 추론·시기·점수 금지 조건을 그대로 요구한다.
- `src/preview/relationship-natal-multifactor-report.ts`: `directGeneralRelationshipT8`에 기존 개별 연구 T8을 추가했다. 기존 `readingGuide`와 다중 근거 해석 완료 조건은 변경하지 않았다.
- `src/preview/natal-structural-integrated-research.ts`: 일반 관계 보충 근거를 중심 해석과 분리된 연구 섹션에 표기한다.
- `scripts/saju-500-whole-chart-structural-final-audit.mjs`: 500명 실제 선택·원본 출처·권한 보존과 기존 중심 T8 부재 명식의 부분 증거 도달을 검사한다.

## 동일 500명 최종 실행

| 항목 | 실제 값 |
| --- | ---: |
| 실행 성공 | **500/500** |
| 일반 대인관계 직접 연구 T8 도달 | **500명 · 3,829건** |
| 기존 관계 다중 근거 중심 T8 미보유 | **16명** |
| 해당 16명 중 별도 일반 관계 T8을 실제 선택 | **16명** |
| 코드/출처/권한 위반·실행 오류 | **0건** |
| 빌드·ESLint·타입·500명 최종 로컬 검사 | **통과** |

고정 시드 `0x5a1a2026`, 조회 시각 `2026-10-25T00:00:00.000Z`. 원본 결과: `saju-source-bound-direct-relationship-500-evidence-2026-10-26.json`.

## 남은 제한

일반 관계 T8의 도달은 대인관계 관점 관측이지 **관계 종합해석 완성이나 실제 사람의 심리·미래·배우자에 대한 판정이 아니다**. 기존 다중 근거 중심 해석 미충족 16명은 그대로 유지한다. 배우자 트랙의 별도 허가·상품 권한을 변경하지 않는다.
