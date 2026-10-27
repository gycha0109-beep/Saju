# 재물 insufficient 17건 — 기존 출처로 복구 가능한지 전수 판정

- 범위: `docs/ROADMAP.md` 2단계의 고정 시드 `0x5a1a2026`, 500명 중 재물 `insufficient` 17건. 기존 브랜치에서 처리하며 새로운 방법론·해석 Claim은 만들지 않는다.
- 검사 경로: 동일 명식의 `CanonicalSajuSnapshot` → 실제 활성 T5 Claim → 등록된 같은 관측 채널의 T8 규칙 → 실제 발행 T8 Claim → `EvidenceSelector` → 재물 연구 출력. `scripts/saju-500-root-cause.mjs`의 기존 진단과 직접 대조.

| 실측 원인 | 건수 | 기존 T8 규칙으로 복구 |
| --- | ---: | ---: |
| 천간/지지 대표 십신 양 채널 모두에 활성 재성 T5 Claim이 없음 | 16 | 0 |
| 재성 T5는 존재하지만 같은 채널의 다른 필요 계열이 없어 T8 입력 결합 불가 | 1 | 0 |
| 합계 | 17 | 0 |

- **실측 근거**: 17건 모두 원본 활성 T8 Claim 0, 선택된 T8 Claim 0, 기존 규칙에 적격한 T8 입력 조합 0, 출력 가능한 T8 적격 대안 0. 불충분 판정과 원본 의미 상태를 변경하면 안 된다.
- **기존 근거 활용한 출력 개선**: `src/preview/wealth-natal-multifactor-report.ts`는 `state=insufficient`이고 시각이 확정된 경우에만 실제 기존 T5 Rule 평가·Claim ID·T5 출처·원국 일간별 십신의 천간/지지 위치·Fact 경로를 대조하여 `insufficientEvidence`를 생성한다. 출처 없는 관측 항목이나 발행된 T8이 존재하면 실패한다.
- 사용자 연구용 출력: `src/preview/natal-five-domain-multifactor-reader.ts` 및 `scripts/natal-personalized-preview.mjs`에서 확인된 십신 위치와 T5 출처, 종합 불가 사유를 별도로 표시한다. 이 내용은 **T8 재물운 풀이가 아닌 T5 관측 설명**이고 소득·자산·실제 선택·미래 길흉을 추론하지 않는다.
- 반례 A (1955-10-31 19:35): 천간 비겁·식상, 지지 대표 십신 재성의 활성 T5 관측이지만 **재성은 단독 채널**이라 등록된 재물 T8을 발행할 수 없다. 채널을 합쳐 임의로 재성×식상이라고 해석하지 않는다.
- 반례 B (1967-08-22 10:28): 천간 비겁·인성, 지지 대표 십신 비겁·인성·식상의 활성 T5만 확인되고 재성 T5가 양 채널에 없다. 재성이 실제 인생에서 전혀 없다거나 돈이 없다는 뜻이 아니다.
- 재현: `npm run build` 후 `$env:SAJU_500_CASE_RESULTS='1'; node scripts/saju-500-eight-menu-audit.mjs .\\saju500-wealth-17-trace.json` 실행. 이어 `node scripts/saju-500-wealth-insufficient-audit.mjs .\\saju500-wealth-17-trace.json .\\saju500-wealth-17-reasons.json`. 전수 감사는 원본 T5↔T8 진단, Claim·Rule·Source 및 실제 위치 경로, 500명 분모, 기존 124/359/17 상태를 함께 검사한다.
- 고정 500×8메뉴 직전 실행본 `saju500-t9-focused.json`과의 비교: 기존 해석 의미 변화 0, 기존 적격 풀이 보존, 분모 및 원본 계산 일치. 무설명 공백 0. 보류 17건을 완료로 재분류하지 않는다.
- **작업 단위 판정: 분류·출처 표시·출력 구현 완료.** 기존 근거로 복구 가능한 T8은 0건이며, 해당 17건의 본격적인 재물 T8 의미 확대는 새로운 출처/방법론이 검증될 때까지 보류한다. 이는 전체 재물 로드맵 완료 또는 공개·판매 권한을 뜻하지 않는다.
