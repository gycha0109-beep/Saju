# ADR-0004 — Initial Implementation Toolchain Baseline

- Status: Accepted
- Date: 2026-08-19

## Context

명화는 설계 S1~S12를 완료하고 실제 구현 I0/I1로 진입한다.

2026-08-19 기준:

- Node.js 24는 LTS line이다.
- TypeScript 7은 stable이지만 native compiler 전환으로 programmatic API/tooling compatibility가 기존 JS compiler line과 다르다.
- typescript-eslint가 공식 지원하는 TypeScript 범위는 현재 `>=4.8.4 <6.1.0`이다.
- typescript-eslint는 ESLint 10을 지원한다.
- Vitest 4.1.x가 stable line이고 Vitest 5는 beta line이다.

명화의 초기 목표는 가장 새 버전 자체가 아니라 **현재 공식 지원 조합에서 strict type checking, lint, tests, CI를 안정적으로 확보하는 것**이다.

## Decision

초기 I0 baseline:

```text
Node.js          24 LTS
TypeScript       6.0.2
ESLint           10.8.0
typescript-eslint 8.66.0
@eslint/js       10.0.1
Prettier         3.9.6
Vitest           4.1.10
@types/node      24.13.3
```

Package versions are pinned exactly in `package.json` during the bootstrap phase.

## TypeScript 7 Decision

TypeScript 7을 영구 배제하지 않는다.

현재는 다음 이유로 I0 baseline에서 보류한다.

1. typescript-eslint 공식 TypeScript support range가 `<6.1.0`이다.
2. TypeScript 7의 native compiler/tooling API transition이 진행 중이다.
3. 명화는 lint/typecheck/test/build gate를 모두 공식 지원 조합 위에서 먼저 확보하는 것이 우선이다.

향후 typescript-eslint와 관련 도구가 TS7을 공식 지원하면 별도 upgrade gate를 통해 재평가한다.

## Runtime Policy

- production/runtime baseline은 Node 24 LTS major line으로 고정한다.
- CI는 Node 24를 사용한다.
- Node Current line을 단순히 최신이라는 이유로 production baseline으로 채택하지 않는다.

## Lint Policy

초기에는 typescript-eslint의 non-type-aware recommended configuration을 사용하고 TypeScript compiler의 strict typecheck를 별도 gate로 수행한다.

이유:

- lint와 compiler responsibility를 분리한다.
- bootstrap complexity를 줄인다.
- typed linting은 I0 안정화 이후 필요성이 확인되면 강화할 수 있다.

## Package Manager Policy

초기에는 npm을 사용한다.

환경상 bootstrap commit 시점에 lockfile을 생성할 수 없는 경우 exact version pins를 사용하고, reproducible install 환경이 확보되는 즉시 `package-lock.json`을 생성하여 `npm ci`로 전환한다.

lockfile 부재 상태를 장기 production 기준으로 취급하지 않는다.

## Upgrade Gate

핵심 toolchain 또는 runtime upgrade는 다음을 통과해야 한다.

```text
clean install
format check
lint
typecheck
test
build
fixture regression
```

Calculation dependency upgrade가 포함될 경우 S5 Golden Fixture gate도 추가 적용한다.

## Consequences

### Positive

- 현재 공식 지원되는 TS/lint 조합을 사용한다.
- TS7 migration을 별도 명시적 작업으로 관리할 수 있다.
- 최신 major를 무조건 쫓다가 bootstrap이 불안정해지는 것을 방지한다.

### Cost

- TypeScript의 최신 stable major를 즉시 사용하지 않는다.
- 향후 TS7 migration 작업이 별도로 필요하다.

이 비용은 초기 correctness foundation을 위해 수용한다.
