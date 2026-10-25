# 명하 사주 공유 구조 해석 — I13 천간 대비 관계 소비 구현

- **날짜:** 2026-10-26
- **브랜치:** `feat/saju/500-personalized-reading-roadmap` (단일 브랜치)
- **선행:** `18cf2e3` — I13/I18B 지장간 지원·도전 연결
- **범위:** 기존 I13 천간 연구 Claim을 현재 공유 T8/5개 주제/연월운 **Research Preview 소비 경로**에 연결
- **권한:** Research 전용; 신강·격국·용신·인생 결과·상품 권한 미확정

## 실제 구현

### 1. 원본 I13의 천간 관측 Claim만 선별

`src/research/i13-strength-evidence-pack.ts`에는 연간·월간·시간 십신 관계를 기록하는 출처 기반 T2 `visible_stem_relation`이 이미 구현돼 있다. 지원 계열은 `peer/resource`, 도전 계열은 `output/wealth/officer`로 구분하되 **가중치, 효력, 최종 강약**을 판정하지 않는 규칙이다.

기존 `src/research/shared-natal-structural-synthesis-candidate.ts`에 추가한 새 T8 규칙은 다음 두 유형이다.

- **`visible_challenge` (4개 규칙):** 월령이 `peer/resource` 관계이고 해당 십신 T5가 같은 계열일 때, 독립적으로 관측된 연간·월간·시간의 `output/wealth/officer` T2 중 실제 `visible_stem_relation`만 결합한다.
- **`visible_support` (6개 규칙):** 월령이 `output/wealth/officer` 관계이고 해당 T5가 같은 계열일 때, 별도로 관측된 `peer/resource` 천간 T2를 결합한다.

양쪽 모두 **I13 `DAY_MASTER_STRENGTH_SCOPE_GUARD`가 필수**다. T2의 `value.evidenceKind`와 `value.direction`을 `claimSelector.valueEquals`로 동시에 제한한다. 이미 있는 I13 지장간 T2, I18B 지장간 도전 T2 또는 다른 십신 T5를 천간의 관측으로 바꿔 사용할 수 없다.

### 2. 공유 Reader와 분야별 해석 연결

`src/preview/shared-natal-structural-reading.ts`에서 실제 선택된 상위 Claim의 천간 위치(연간·월간·시간)와 십신 계열, 관계 방향, Rule/Methodology/Source/Fact path를 보존한다. 같은 명식의 월령 오행 관계와 서로 다른 방향의 천간이 **공존한다는 사실**만 설명하고 어떤 요소가 더 강하거나 긍정·부정적인 결과를 만든다고 판단하지 않는다.

기존 `natal-structural-integrated-research.ts`와 `whole-chart-structural-research-runtime.ts`의 **공통 원국 구조 T8 소비 경로**를 그대로 재사용한다. 기존 5개 원국 메뉴, 올해·이번 달 연구 참고 연결에서 별도 권한 엔진이나 새 계산기는 만들지 않았다.

### 3. 마지막 통합 검사만 실행

`scripts/saju-500-whole-chart-structural-final-audit.mjs`에 새 두 유형의 실제 T8·명식별 발생 건수와 상위 Claim 종류·위치·관계 방향·권한 유지 판정을 추가했다.

동일 입력 500명, 고정 시드 `0x5a1a2026`, 시각 `2026-10-25T00:00:00.000Z`.

| 구분 | 결과 |
| --- | ---: |
| 500명 실제 실행 | **500/500 성공** |
| 새 천간 대비 구조 관측 | **604건 / 422명** |
| 지원 월령 + 도전 천간 | **283건** |
| 도전 월령 + 지원 천간 | **321건** |
| 전체 공유 구조 T8 | **3,038건** (이전 2,434건) |
| 계산 해시 혼용·출처 누락·권한 위반·실행 오류 | **0건** |
| 기존 대운 효과 미판정 유지 | **500명** |
| 빌드 / 린트 / 타입 검사 | **통과** |

실제 실행 원본: [500명 고정 실행 증거](saju-i13-visible-stem-contrast-500-evidence-2026-10-26.json).

## 완료와 미완료 구분

**완료:** 기존 I13의 천간 관계 관측 T2가 공유 원국 구조 T8과 분야별 연구 결과에 **실제 연결되는 코드 경로**를 추가했다. 서로 다른 구조의 관계와 출처를 같은 명식에서 조회할 수 있다.

**미완료:** 관측들 사이의 강도·시기·성패·길흉·우선순위를 결정할 방법론의 권한은 여전히 없다. 특히 **신강·신약, 격국, 용신·희기신, 실제 통근 효력, 대운 상호작용의 결과, 재물 118명의 직접 해석 중심 근거 부족**은 이 추가 구조 T8만으로 해결되지 않는다.

다음 작업은 동일 브랜치의 기존 로드맵 P0/P1에 따라 **허용된 명식 구조 Claim의 의미 있는 종합과 분야별 실제 해석 적용**을 확대하는 것이다. 출처가 없는 결론이나 가짜 판매용 해석은 만들지 않는다. 중간 PR·병합은 수행하지 않는다.
