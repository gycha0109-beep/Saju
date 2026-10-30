import type { CanonicalSajuSnapshot, HeavenlyStem } from '../contracts/calculation.js';
import type { FamilySourceScopeHandoff } from './family-pair-source-scope-handoff.js';
import type { R070ClassicalParentStemExample } from './r070-classical-parent-stem-example.js';
import {
  R070_CLASSICAL_PARENT_EXAMPLE_SOURCE,
  observeR070ClassicalParentStemExample,
} from './r070-classical-parent-stem-example.js';

export const R070_PARENT_EXAMPLE_BOUNDARY_RULE_VERSION =
  'r070-jia-yi-parent-source-precondition-gate-v1' as const;
export const R070_PARENT_EXAMPLE_BOUNDARY_RULE_ID =
  'RULE-R070-JIA-YI-CLASSICAL-PARENT-SOURCE-BOUNDARY-RESEARCH' as const;
export const R070_PARENT_EXAMPLE_NON_ADMITTED_CLAIM_TYPE =
  'R070_PARENT_ROLE_MEANING_NOT_ADMITTED' as const;

type PositionSlot = 'year' | 'month' | 'day' | 'hour';
const SLOTS: readonly PositionSlot[] = ['year', 'month', 'day', 'hour'];
const HANJA_TO_CANONICAL: Readonly<Record<'戊' | '癸', HeavenlyStem>> = {
  戊: '무', 癸: '계',
};

export interface R070ParentExampleCondition {
  label: '원문 적용 일간' | '표면 천간·십신' | '지장간 원시 목록' |
    '고전 성별·역할 방법' | '강약 판정' | '구성 조건 및 해석 방법';
  state: 'confirmed' | 'not_observed' | 'unresolved' | 'not_authorized';
  factPaths: readonly string[];
  note: string;
}

export interface R070ParentExampleSourceBoundary {
  ruleId: typeof R070_PARENT_EXAMPLE_BOUNDARY_RULE_ID;
  ruleVersion: typeof R070_PARENT_EXAMPLE_BOUNDARY_RULE_VERSION;
  attemptedClaimType: typeof R070_PARENT_EXAMPLE_NON_ADMITTED_CLAIM_TYPE;
  sourceId: typeof R070_CLASSICAL_PARENT_EXAMPLE_SOURCE.sourceId;
  snapshotId: string;
  calculationHash: string;
  scope: 'parents';
  historicalSex: 'male' | 'female' | 'unspecified';
  conditions: readonly R070ParentExampleCondition[];
  hiddenMembership: readonly {
    originalTerm: '戊' | '癸';
    /** Raw membership only; no inferred hidden Ten-God or family role. */
    positions: readonly {
      slot: PositionSlot;
      factPath: string;
      actualStem: HeavenlyStem;
    }[];
    unresolvedPaths: readonly string[];
  }[];
  observedFamilyRelativeClaims: 0;
  originalConditionsFullyEstablished: false;
  sourceRuleAdmitted: false;
  emittedT8Claims: 0;
  familyMeaningAuthorized: false;
  hiddenTenGodClassificationAuthorized: false;
  strengthBasedOutcomeAuthorized: false;
  configurationBasedOutcomeAuthorized: false;
  historicalSexMethodSelected: false;
  missingPrerequisites: readonly string[];
  explanation: string;
  researchOnly: true;
  mayPublish: false;
  mayPersist: false;
  maySell: false;
}

/**
 * Build an explicit Rule/Claim gate from the *existing* R070 source handoff.
 * An exact old-text match is a useful piece of evidence, not permission to
 * classify a real parent. Hidden stems are membership, not Ten-God strength.
 */
export function assessR070ParentExampleRuleClaimBoundary(
  snapshot: CanonicalSajuSnapshot,
  handoff: FamilySourceScopeHandoff,
  example: R070ClassicalParentStemExample,
): R070ParentExampleSourceBoundary {
  if (handoff.scope !== 'parents' || handoff.owner !== 'R070' ||
      handoff.snapshotId !== snapshot.snapshotId ||
      handoff.calculationHash !== snapshot.calculationHash ||
      handoff.familyT8Admitted || handoff.mayGrantOfficialAuthority ||
      handoff.interpretationBlockers.interpretationMethodSelected ||
      handoff.interpretationBlockers.familyT8Admitted ||
      example.snapshotId !== snapshot.snapshotId ||
      example.calculationHash !== snapshot.calculationHash ||
      example.sourceId !== R070_CLASSICAL_PARENT_EXAMPLE_SOURCE.sourceId ||
      example.familyR070MeaningAuthorized || !example.originalExampleIsContextual ||
      example.hiddenStemsUsed || example.mayPublish || example.maySell) {
    throw new TypeError('R070 contextual source evidence must remain on its original, unadmitted parent chart');
  }
  const day = snapshot.derivedFacts.dayMaster;
  if (day.status !== 'resolved' || day.value.hanja !== example.historicalDayStem ||
      (day.value.hanja !== '甲' && day.value.hanja !== '乙')) {
    throw new TypeError('R070 original parent example needs exact calculated Jia/Yi day master');
  }
  const verifiedExample = observeR070ClassicalParentStemExample(snapshot);
  if (verifiedExample === undefined ||
      JSON.stringify(verifiedExample) !== JSON.stringify(example)) {
    throw new TypeError('R070 contextual source example must equal exact Canonical evidence');
  }
  const historicalSex = snapshot.input.sexForTraditionalCalculation ?? 'unspecified';
  if (handoff.historicalSex !== historicalSex) {
    throw new TypeError('R070 historical sex must agree with the canonical birth input');
  }
  const requiredSurfaces = ['父以偏財論', '母以印綬論'] as const;
  const candidates = requiredSurfaces.map(sourceSurface =>
    handoff.methodCandidates.find(item => item.sourceSurface === sourceSurface));
  if (candidates.some(candidate =>
    candidate === undefined || candidate.sourceLayerId !== 'TEN-GOD-FAMILY-RELATIONS' ||
    candidate.disposition !== 'INCONCLUSIVE' ||
    candidate.familyMeaningAuthorized ||
    candidate.relativeStarHiddenStemBoundary === undefined ||
    candidate.relativeStarHiddenStemBoundary.familyT8Admitted ||
    candidate.relativeStarHiddenStemBoundary.hiddenStemTenGodClassificationAuthorized)) {
    throw new TypeError('R070 requires the source-owned, unresolved father/mother star clauses');
  }
  const visible = example.examples.flatMap(entry =>
    entry.observedVisiblePositions.flatMap(position => [...position.factPaths]));
  const allUnresolved = example.examples.flatMap(entry => entry.unresolvedVisibleSlots.map(slot =>
    'pillars.' + slot));
  const rawHidden = snapshot.derivedFacts.hiddenStems;
  const hiddenMembership = example.examples.map(entry => {
    const positions: { slot: PositionSlot; factPath: string; actualStem: HeavenlyStem }[] = [];
    const unresolvedPaths: string[] = [];
    for (const slot of SLOTS) {
      const fact = rawHidden?.[slot];
      const path = 'derivedFacts.hiddenStems.' + slot;
      if (fact?.status !== 'resolved') {
        unresolvedPaths.push(path);
      } else if (fact.value.includes(HANJA_TO_CANONICAL[entry.hanjaStem])) {
        positions.push({
          slot,
          factPath: path,
          actualStem: HANJA_TO_CANONICAL[entry.hanjaStem],
        });
      }
    }
    return {
      originalTerm: entry.hanjaStem,
      positions, unresolvedPaths,
    };
  });
  const rawObserved = hiddenMembership.flatMap(row => row.positions.map(p => p.factPath));
  const hiddenUnresolved = [...new Set(hiddenMembership.flatMap(row => row.unresolvedPaths))];
  const visibleStatus = visible.length
    ? 'confirmed' as const : allUnresolved.length
      ? 'unresolved' as const : 'not_observed' as const;
  const hiddenStatus = rawObserved.length
    ? 'confirmed' as const : hiddenUnresolved.length
      ? 'unresolved' as const : 'not_observed' as const;
  const basePaths = ['derivedFacts.dayMaster.value.hanja'];
  const conditions: R070ParentExampleCondition[] = [
    { label: '원문 적용 일간', state: 'confirmed', factPaths: basePaths,
      note: example.historicalDayStem + '일간에 대한 원문 사례만 해당합니다.' },
    { label: '표면 천간·십신', state: visibleStatus,
      factPaths: [...new Set([...visible, ...allUnresolved])],
      note: visibleStatus === 'confirmed'
        ? '원문에 쓰인 戊·癸 중 실제로 관측된 천간과 십신만 대조했습니다.'
        : '표면 천간에서 관측되지 않은 사실을 부모의 부재로 해석하지 않습니다.' },
    { label: '지장간 원시 목록', state: hiddenStatus,
      factPaths: [...new Set([...rawObserved, ...hiddenUnresolved])],
      note: hiddenStatus === 'confirmed'
        ? '지지에 들어 있는 천간의 원시 목록만 일치합니다. 지장간 십신·통근·강약을 판정한 것이 아닙니다.'
        : '원시 지장간이 미관측 또는 미확정이어도 가족 구성원의 존재·관계를 부정하지 않습니다.' },
    { label: '고전 성별·역할 방법', state: 'not_authorized',
      factPaths: ['input.sexForTraditionalCalculation'],
      note: '기록된 성별(' + historicalSex + ')만 확인했습니다. 고전의 이견을 조정한 부친·모친 대응 방법은 선택되지 않았습니다.' },
    { label: '강약 판정', state: 'not_authorized',
      factPaths: [],
      note: '오행 개수·지장간 저장 순서·천간 출현만으로 원문이 요구하는 왕쇠/강약을 확정하지 않습니다.' },
    { label: '구성 조건 및 해석 방법', state: 'not_authorized',
      factPaths: [...new Set(handoff.unassignedConfigurationInputs.flatMap(item =>
        item.canonicalFactPath === undefined ? [] : [item.canonicalFactPath]))],
      note: '충·형·재인 등의 관측은 부모에 관한 고전 구성 조건 및 결과로 전환되지 않았습니다.' },
  ];
  const missingPrerequisites = [
    'R070_PARENT_ROLE_METHOD_NOT_SELECTED',
    'R070_ORIGINAL_SEX_SCOPE_AND_MODERN_PARENT_ROLE_NOT_RECONCILED',
    'R070_HIDDEN_MEMBERSHIP_NOT_TEN_GOD_CLASSIFICATION',
    'R070_STRENGTH_PRIORITY_NOT_ESTABLISHED',
    'R070_CONFIGURATION_TO_FAMILY_OUTCOME_NOT_SOURCED',
    'R070_FAMILY_RELATIVE_OUTCOME_NOT_AUTHORIZED',
    ...(allUnresolved.length ? ['R070_VISIBLE_STEMS_PARTIALLY_UNRESOLVED'] : []),
    ...(hiddenUnresolved.length ? ['R070_HIDDEN_MEMBERSHIP_PARTIALLY_UNRESOLVED'] : []),
  ];
  return {
    ruleId: R070_PARENT_EXAMPLE_BOUNDARY_RULE_ID,
    ruleVersion: R070_PARENT_EXAMPLE_BOUNDARY_RULE_VERSION,
    attemptedClaimType: R070_PARENT_EXAMPLE_NON_ADMITTED_CLAIM_TYPE,
    sourceId: R070_CLASSICAL_PARENT_EXAMPLE_SOURCE.sourceId,
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    scope: 'parents',
    historicalSex,
    conditions,
    hiddenMembership,
    observedFamilyRelativeClaims: 0,
    originalConditionsFullyEstablished: false,
    sourceRuleAdmitted: false,
    emittedT8Claims: 0,
    familyMeaningAuthorized: false,
    hiddenTenGodClassificationAuthorized: false,
    strengthBasedOutcomeAuthorized: false,
    configurationBasedOutcomeAuthorized: false,
    historicalSexMethodSelected: false,
    missingPrerequisites,
    explanation: '원문 속 글자·십신·일부 지장간 원시값은 이 명식에서 관찰할 수 있지만, ' +
      '고전의 성별·부모 대응 방법, 지장간 십신, 강약과 구성 조건이 연결되지 않았습니다. ' +
      '따라서 부모의 상태·관계 결과에 관한 R070 T8 Claim은 발행하지 않습니다.',
    researchOnly: true,
    mayPublish: false,
    mayPersist: false,
    maySell: false,
  };
}

function escape(value: string): string {
  return value.replace(/[&<>"']/gu, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c]!);
}

export function renderR070ParentExampleRuleClaimBoundaryHtml(
  boundary: R070ParentExampleSourceBoundary,
): string {
  if (boundary.sourceRuleAdmitted || boundary.emittedT8Claims !== 0 ||
      boundary.observedFamilyRelativeClaims !== 0 ||
      boundary.familyMeaningAuthorized || boundary.historicalSexMethodSelected ||
      boundary.originalConditionsFullyEstablished ||
      boundary.hiddenTenGodClassificationAuthorized ||
      boundary.strengthBasedOutcomeAuthorized ||
      boundary.configurationBasedOutcomeAuthorized ||
      boundary.mayPublish || boundary.mayPersist || boundary.maySell ||
      !boundary.researchOnly ||
      boundary.ruleId !== R070_PARENT_EXAMPLE_BOUNDARY_RULE_ID ||
      boundary.sourceId !== R070_CLASSICAL_PARENT_EXAMPLE_SOURCE.sourceId ||
      boundary.conditions.length !== 6) {
    throw new TypeError('R070 contextual observation cannot grant a family meaning Claim');
  }
  const labels: Record<R070ParentExampleCondition['state'], string> = {
    confirmed: '계산 사실 확인', not_observed: '관측되지 않음',
    unresolved: '입력 또는 계산 미확정', not_authorized: '해석 규칙 미승인',
  };
  return '<section id="r070-context-rule-gate"><h3>원문 조건별 적용·보류</h3>' +
    '<p>' + escape(boundary.explanation) + '</p><ul>' +
    boundary.conditions.map(row =>
      '<li><strong>' + escape(row.label) + ' · ' + labels[row.state] + '</strong>' +
      '<p>' + escape(row.note) + '</p>' +
      (row.factPaths.length
        ? '<details><summary>관측·미확정 경로</summary><p>' +
          escape(row.factPaths.join(' · ')) + '</p></details>'
        : '') + '</li>').join('') + '</ul><p>' +
    '검토 규칙: ' + escape(boundary.ruleId) +
    '. 현재 발행된 가족 종합 T8 Claim은 0건입니다.</p></section>';
}
