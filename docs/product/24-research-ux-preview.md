# Myeonghwa Preview E2E Reading

Status: `PREVIEW_E2E_PROVISIONALLY_APPROVED`

This runtime exists so the product owner can inspect the real consumer screen and end-to-end behavior while Saju research continues.

It is **not** a final interpretation decision and it is **not** Production Interpretation Authority.

## Lifecycle split

```text
interpretation evidence lifecycle = research
consumer runtime lifecycle        = preview
production interpretation         = blocked
commerce / paid entitlement       = not authorized by this approval
reading persistence finalization  = not authorized by this approval
general public availability       = not authorized by this approval
research                          = continues before and after launch
```

The provisional approval is recorded by:

```text
src/preview/preview-authority.ts
approvalId = owner-provisional-preview-2026-09-19
purpose    = consumer-screen-e2e-observation
```

Research rules, methodologies, source quality, review metadata, and reviewer-trust state are not relabeled to obtain Preview execution.

## Preview E2E targets

The currently admitted Preview surface is intentionally bounded to the research-backed natal paths that already produce meaningful consumer output:

```text
전체 사주       → general:natal
직업 · 커리어   → career:natal
재물            → wealth:natal
연애 · 관계     → relationship:natal:general
사업            → business:natal
```

The following remain fail-closed until their own evidence path is ready for Preview:

```text
가족
삶의 단계
올해
이번 달
배우자 · 관계
궁합
지금 고민으로 보기
```

No unsupported request is replaced by a General Natal reading.

## Runtime boundary

Cloud/service path:

```text
MyeongHa server
→ authenticated Saju service request
→ POST /api/preview/readings
→ Production Calculation Authority V1
→ current research interpretation registry
→ governed Product Reading preparation / grounding
→ deterministic consumer Preview narrative
→ source-owned ProductReadingResponse admission
→ x-myeonghwa-reading-lifecycle: preview
```

The existing production semantic route remains closed:

```text
POST /api/readings
→ NOT exposed by the Preview-enabled calculation process
```

The Preview endpoint is protected by the same server-owned Saju service Bearer as the calculation endpoint. The browser never receives that credential.

## Consumer disclosure

Preview output includes a visible `프리뷰 안내` section. Its purpose is to make the lifecycle explicit without turning the result into an internal research report.

The Preview copy must not imply:

- Production semantic approval,
- deterministic future events,
- guaranteed career/business/financial outcomes,
- unsupported spouse/compatibility claims,
- authority promotion from browser success.

## Research continuity

The Preview is a product-observation checkpoint, not a research freeze.

New source work, proposition verification, negative/boundary evidence, semantic bridges, reviewer attestations, and production-authority work continue independently. Preview output can be revised as research improves, with the same fail-closed and grounding constraints.

## Production authority remains separate

A future Production Product Reading still requires the existing production authorization contract, including content-addressed review/trust requirements. Preview success does not satisfy or waive that contract.

Therefore:

```text
PREVIEW E2E = provisionally approved
PRODUCTION INTERPRETATION AUTHORITY = blocked
RESEARCH = active / continuing
```
