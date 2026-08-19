# I0 / I1 Foundation Status

- Date: 2026-08-19
- Branch: `agent/architecture-foundation`
- Status: **IMPLEMENTED / EXTERNAL CI VERIFICATION PENDING**

## Scope

### I0 — Repository / Tooling Bootstrap

Implemented:

- Node 24 LTS runtime policy
- TypeScript 6.0.2 exact pin
- ESLint 10 + typescript-eslint baseline
- Prettier configuration
- Vitest configuration
- strict `tsconfig`
- build `tsconfig`
- npm exact-save / engine-strict policy
- GitHub Actions CI workflow
- package public entrypoint / declaration output configuration

Not yet closed:

- `package-lock.json` has not been generated in the current tool environment.
- CI workflow result has not been surfaced through the available GitHub connector path.
- formatting is configured but is not yet part of the `npm run check` blocking gate.

These are explicit bootstrap gaps, not silently treated as success.

---

## I1 — Domain Contracts

Implemented TypeScript contracts:

```text
src/contracts/common.ts
src/contracts/calculation.ts
src/contracts/interpretation.ts
src/contracts/narrative.ts
src/contracts/reading.ts
src/contracts/runtime-validation.ts
```

Public export surface:

```text
src/contracts/index.ts
src/index.ts
```

### Implemented invariants

- canonical fact state is explicit:
  - `resolved`
  - `ambiguous`
  - `unavailable`
- ambiguous facts require at least two candidates.
- ambiguous facts require an explicit reason.
- unavailable facts require an explicit reason.
- unknown birth time cannot include `hour` or `minute`.
- leap-month state cannot be enabled for solar input.
- time and coordinate ranges are validated at the external boundary.
- Calculation Policy identifiers and policy enums are validated.
- version references have a minimal runtime assertion.

---

## Local Pre-verification

The active execution environment does not have the target Node 24 / TypeScript 6 / ESLint / Vitest dependency set installed and cannot fetch npm dependencies directly.

A separate local reconstruction of the current source contracts was therefore checked with the available TypeScript compiler as a **non-authoritative precheck**.

### Static check

Available compiler:

```text
TypeScript 5.8.3
```

Applied strict options equivalent to the repository baseline where supported.

Result:

```text
SOURCE CONTRACT STRICT TYPECHECK = PASS
```

This is not a substitute for the pinned TypeScript 6.0.2 CI gate.

### Manual runtime invariant check

Compiled contract source was executed against representative invariants.

Verified:

```text
resolved fact construction                     PASS
ambiguous fact minimum-candidate rejection     PASS
unavailable empty-reason rejection             PASS
unknown-time valid input                       PASS
unknown-time fabricated clock rejection        PASS
explicit CalculationPolicy validation          PASS
```

Result:

```text
MANUAL RUNTIME CONTRACT CHECK = PASS
```

---

## I0 / I1 Close Gate

I0 / I1 is not considered STRICT CLOSED until all of the following are satisfied with the pinned repository toolchain:

```text
[ ] dependency installation succeeds
[ ] package-lock.json generated and committed
[ ] lint passes
[ ] TypeScript 6.0.2 typecheck passes
[ ] Vitest passes
[ ] build passes
[ ] CI result is observable and green
```

Formatting should then be normalized and `format:check` promoted into the blocking gate.

---

## Next Phase Rule

Do not start I2 `manseryeok` Adapter as a production implementation until the I0/I1 close gate is green.

Once green, I2 begins with:

```text
BirthInput
  -> CalculationPolicy
  -> Manseryeok Adapter input mapping
  -> upstream invocation
  -> CanonicalSajuSnapshot mapping
  -> explicit error translation
  -> dependency/version provenance
```

No upstream `FourPillarsDetail` type may escape the adapter boundary.
