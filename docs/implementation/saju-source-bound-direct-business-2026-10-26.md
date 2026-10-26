# 명하 사업 분야 — 기존 동일 채널 직접 T8 연구 해석 연결

- 날짜: 2026-10-26
- 브랜치: `feat/saju/500-personalized-reading-roadmap`
- 권한: 내부 Research Preview, Product/Official/Publish/Sell/개인 성공·매출 판정 미승인
- 선행: `ec96fa0` 일반 관계 T8 해석 연결

## 실제 구현

1. `src/research/business-natal-reading-candidate.ts`: 기존 `CHANNEL_SENSITIVE_SPECIALIST_RULES`에서 사업 분야에 해당하는 출처 보유 T8만 외부 연구 레지스트리가 재사용할 수 있게 공개했다. 원본 동일 채널 조건과 방법론은 변경하지 않았다.
2. `src/research/business-natal-multifactor-candidate.ts`: 위 출처 보유 직접 사업 T8, 필수 `TEN_GOD_FAMILY` T5, 원본 소스·방법론을 기존 다중 근거 사업 Research Registry에 병행 등록했다. 별도 사주 계산기·제품 권위 엔진은 추가하지 않았다.
3. `src/preview/source-bound-direct-business-reading.ts`: 실제 선택된 T8의 Rule·matched evaluation·source·상위 T5를 확인한다. 여러 십신 계열을 다루는 경우 동일 천간 채널 또는 동일 지지 채널의 실제 관측 위치가 모두 존재해야 한다. 개인 창업 적성·매출·사업 성패·자금·투자 결과는 금지한다.
4. `src/preview/business-natal-multifactor-report.ts`, `src/preview/natal-structural-integrated-research.ts`: `sourceBoundedDirectBusinessT8`를 독립 연구 근거로 제공하며 기존 다중 근거 사업 중심 T8을 대체하지 않는다.
5. `scripts/saju-500-whole-chart-structural-final-audit.mjs`: 500명 전체에서 동일 채널 규칙의 실제 선택·출처·비승격·기존 중심 미충족을 검증한다.

## 동일 500명 최종 결과

| 지표 | 실제 값 |
| --- | ---: |
| 전체 실행 | **500/500 성공** |
| 직접 사업 연구 T8 | **500명 · 3,140건** |
| 다중 근거 사업 중심 T8 보유 | **487명** |
| 중심 T8이 없지만 별도 직접 연구 T8 도달 | **13명** |
| 여전히 중심 종합 T8이 없는 명식 | **13명** |
| 실행 예외·출처·권한·같은 채널 조건 오류 | **0건** |
| 로컬 빌드·린트·타입·500명 검사 | **통과** |

고정 시드 `0x5a1a2026`, 기준 `2026-10-25T00:00:00.000Z`. 실제 증거 파일: `saju-source-bound-direct-business-500-evidence-2026-10-26.json`.

## 미완료

직접 사업 관점이 500명에 도달해도 독립 다중 근거 중심 T8의 공백 13명은 미완료입니다. 실제 사업 결과·신강·격국·용신·대운 효력·공식 상품 사용 권한은 확보되지 않았습니다.
