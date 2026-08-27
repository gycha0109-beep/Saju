# P4.3B47 — Branch Trigger-Gated Post-P0 Remediation Review

## Status

- Stage: P4.3B47
- Domain: Career
- Scope: natal / research
- Base main: `22d6c9065936ab1bfbcfe89bc5e94a6f28664153`
- Upstream: exact content-addressed B46 Branch cross-methodology reconciliation
- Production impact: `NONE`

## Purpose

B46 froze three remediation triggers after classifying the Branch bottleneck as dual:

1. source binding / dependency separability or an independent complete path;
2. method-specific input contract plus upstream authority;
3. active-rule-set required-input completeness validation.

The post-B46 P0 work changed only the third surface. B47 records that state transition without rewriting historical B46 and without converting infrastructure readiness into Saju semantic authority.

## Exact trigger state

```text
BRANCH_SOURCE_SPECIFIC_DEPENDENCY_SEPARABILITY_OR_COMPLETE_PATH_TRIGGER   OPEN
BRANCH_METHOD_SPECIFIC_INPUT_CONTRACT_AND_UPSTREAM_AUTHORITY_TRIGGER      OPEN
METHODOLOGY_REQUIRED_INPUT_COVERAGE_VALIDATION_TRIGGER                    CLOSED

satisfied remediation triggers                                            1 / 3
immediately executable authority-admission lanes                          0
immediately executable semantic-rule lanes                                0
```

## P0 infrastructure closure

Current main now enforces explicit `MethodologyDefinition.inputContract.*.mode === 'required'` coverage over the active selected rule set.

The validation:

- runs after enabled rule-set selection and `disabledRuleIds` filtering;
- requires coverage under the exact methodology id/version;
- supports fact paths, claim types, and governed research-evidence identities;
- fails registry construction with `METHODOLOGY_REQUIRED_INPUT_NOT_COVERED` when a required dimension is absent.

B47 does not trust this as documentation only. Its builder executes a synthetic uncovered required-input probe and accepts the current repository capability only when registry construction fails closed with that exact error code.

This closes an architecture completeness gap. It does **not** create or admit a Branch methodology.

## B41 source contracts remain unsatisfied

### Existing 2015 path

The B41 `BRANCH_2015_EXACT_EDITION_COMPATIBILITY_TRIGGER` still requires all of the following on the same 2015 source path:

- direct inspection of the exact printed target passage;
- enough local exact-edition method context to determine whether distance / strength / 旺衰 is mandatory;
- source-supported dependency separability, or an explicit `CURRENT_METHOD_INCOMPATIBLE` disposition;
- unchanged bounded semantic correspondence to `TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY / formal_responsibility`.

The bounded recheck did not acquire the exact 2015 printed target body.

Current public bibliographic surface:

- `https://www.xinyi.hk/goods-7109.html?from=rss`

This confirms publication metadata for 李修梵整理《十神闡微》, 香港星易圖書有限公司, 2015, ISBN 9789881412041, but metadata is explicitly not a substitute for the target body.

### Independent complete path

The B41 `BRANCH_INDEPENDENT_COMPLETE_PATH_TRIGGER` still requires one genuinely independent published source path to supply, without borrowing from another source:

- exact 正官 → governed current-T5 `formal_responsibility` bridge;
- natal branch-clash condition;
- qualitative modifier;
- explicit limits/context;
- current-method compatibility without unsupported mandatory strength / 旺衰 dimensions.

No such single complete path was acquired.

## 2023 same-source clash framework recheck

Public surfaces for 陳澤眞《八字命理900問》 continue to expose the clash-method question structure, including:

- Q408 主沖 / 被沖;
- Q409 沖帶剋 / 沖不剋;
- Q415 whether 合 is simply good and 沖 simply bad;
- Q420 whether clash necessarily injures both sides;
- Q421 沖去忌神 / 沖去用神;
- Q422 what determines auspicious vs adverse clash.

Relevant public surfaces:

- `https://www.ncc.com.tw/books/goods.php?id=17318`
- `https://www.xinyibooks.net/goods-9249.html`
- `https://ebook.taaze.tw/do/preview/viewer2.aspx?oid=11101014197`

These surfaces still do not expose the target normative answer bodies needed to establish the bounded semantic effect or dependency separability. The same book also explicitly organizes strength and 用神 questions before the clash chapter, so the TOC cannot be treated as proof of a dependency-free unary clash rule.

## Why the method-specific contract trigger remains open

The repository can now safely host method-specific required input contracts, but a schema and validator are not source authority.

B46 already established that:

- traditional source paths expose strength / 喜忌 or 用神 / structural / relation dimensions not currently consumed by the Career method;
- the alternative Duan profile introduces a different structured interaction vocabulary and is only a negative control;
- T0 relation, position, distance and visibility observations do not themselves establish T6 semantic effects;
- current Career T1-T4 qualifiers and T6 effective-interaction / damage / Career-effect lanes remain blocked.

Therefore B47 does not author a `MethodologyDefinition` merely because the runtime can now enforce one correctly.

## Preserved prohibitions

B47 authorizes no:

- source-mandatory dependency dropping;
- cross-source semantic / limit / compatibility stitching;
- flat `clash -> reduce semantic` rule;
- numeric weighting or winner/precedence logic;
- universal interaction evaluator;
- new Branch MethodologyDefinition;
- T5, T6, or T8 semantic rule;
- ClaimType;
- personalized T8 pack;
- consumer narrative;
- Preview default switch;
- production promotion.

All six historical Career T8 synthesis authority gaps remain formally open.

## Decision

```text
P0 required-input completeness trigger      CLOSED
source separability / complete-path trigger OPEN
method-specific contract + authority trigger OPEN
Branch authority admission-ready            NO
Branch semantic-rule lane                    NO
historical gap closed                        NO
production impact                            NONE
```

## Next gate

`BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE`

A new gate should execute only when a frozen source or method-authority condition materially changes. Repeating searches over unchanged catalog, TOC, or same-work transcription surfaces is not an activation event.
