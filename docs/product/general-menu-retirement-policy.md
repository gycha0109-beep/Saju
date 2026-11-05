# General Menu Retirement / Shared Natal Analysis Policy

Status: Product decision approved 2026-10-30; documentation only, runtime/UI migration pending.

## Decision

- Retire the paid standalone `general` / `전체 사주` menu. Do not rename or resell it as `원국풀이`, `명조 분석`, or another paid natal overview.
- The commercial menu roster changes from 12 to 11. This is a product-surface decision, not deletion of the underlying `general` intent, natal calculation, claims, tests, or shared analysis capabilities.
- The canonical natal chart and its analysis remain a common internal foundation for all eligible readings. Do not charge separately for that foundation.
- Each remaining menu must deliver its own question-specific interpretation and distinct purchase value; do not repeat a generic natal overview as paid content.
- Any natal facts necessary to explain a domain conclusion may appear as concise supporting context, not a second paid reading.
- Existing `general` reading records, historical entitlements, references and stored artifacts must remain readable; do not silently delete or remap past purchases.
- Pricing, refunds, UI placement, API compatibility and any future comprehensive bundle are not decided here. No premium comprehensive SKU is authorized by this decision.

## Remaining 11 product menus

`career`, `wealth`, `relationship`, `business`, `family`, `life_stage`, `annual`, `monthly`, `spouse`, `compatibility`, `question`.

## Implementation boundary

1. Update the consumer catalog and menu navigation to hide standalone `general` from new purchases, preserving legacy reading access.
2. Keep `general` and shared natal interpretation internals until all existing callers are identified; do not equate catalog removal with semantic engine deletion.
3. Adjust product-facing roster/acceptance criteria from 12 to 11 while retaining historical 12-menu audit reports as historical evidence.
4. Verify each menu's independent domain-specific interpretation; avoid overlapping paid scopes.
5. Update product descriptions, catalog fixtures and associated regression coverage when implementing the change.

## Related policies

- `16-product-reading-delivery-contract.md`
- `reading-language-lock-policy.md` (immutable locale per generated reading remains unchanged)
- `../ROADMAP.md` (historical 12-menu audit entries remain historical)