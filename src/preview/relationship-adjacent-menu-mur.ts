import type { FamilyCanonicalObservationPreview } from './family-parents-children-observation-preview.js';
import type {
  LifeStageDayunResearchReport, LifeStageNatalStructureContext,
} from './life-stage-dayun-research-report.js';
import type { SpousePositionBirthResearchReport } from './spouse-position-birth-research-runtime.js';
import type {
  CompatibilityTwoChartIntakePreview, CompatibilityPersonalRelationshipContext,
} from './compatibility-two-chart-intake-preview.js';

export const RELATIONSHIP_ADJACENT_MENU_MUR_VERSION =
  'myeongha-relationship-adjacent-menu-mur-shadow-v1' as const;

export type RelationshipAdjacentMenuScope =
  | 'family:parents' | 'family:children' | 'life-stage:general'
  | 'relationship:natal:spouse' | 'compatibility:natal';
export type RelationshipAdjacentMenuMurState =
  'complete' | 'partial' | 'insufficient' | 'unsupported';

export interface RelationshipAdjacentMenuMur {
  version: typeof RELATIONSHIP_ADJACENT_MENU_MUR_VERSION;
  lifecycle: 'internal_quality_shadow';
  scope: RelationshipAdjacentMenuScope;
  /**
   * 'partial' is bounded evidence, not a complete family/stage/partner/T10
   * consumer reading. 'unsupported' means the requested semantic scope is
   * explicitly held despite calculated facts or unrelated natal narratives.
   */
  state: RelationshipAdjacentMenuMurState;
  availableEvidence: 'none' | 'calculated_facts' | 'bounded_position'
    | 'calculated_periods_plus_separate_natal';
  snapshotIds: readonly string[];
  calculationHashes: readonly string[];
  observedFactPaths: readonly string[];
  sourceIds: readonly string[];
  missingRequirements: readonly string[];
  mayChangeProductDelivery: false;
  mayAuthorizeNewClaim: false;
  usefulComplete: false;
  mayPublish: false;
  maySell: false;
}

function requireIdentity(snapshotId: string, hash: string): void {
  if (!snapshotId?.trim() || !hash?.trim()) {
    throw new TypeError('Menu MUR needs the exact Canonical snapshot and calculation hash.');
  }
}

function uniqueSorted(values: readonly string[]): string[] {
  return [...new Set(values)].sort();
}
function output(
  scope: RelationshipAdjacentMenuScope,
  state: RelationshipAdjacentMenuMurState,
  availableEvidence: RelationshipAdjacentMenuMur['availableEvidence'],
  snapshotIds: readonly string[],
  hashes: readonly string[],
  factPaths: readonly string[],
  sources: readonly string[],
  missing: readonly string[],
): RelationshipAdjacentMenuMur {
  if (state === 'complete' || missing.length === 0) {
    throw new TypeError('Research-only menu MUR must retain its unresolved semantic requirements.');
  }
  snapshotIds.forEach((id, i) => requireIdentity(id, hashes[i] ?? ''));
  return {
    version: RELATIONSHIP_ADJACENT_MENU_MUR_VERSION,
    lifecycle: 'internal_quality_shadow', scope, state, availableEvidence,
    snapshotIds: [...snapshotIds], calculationHashes: [...hashes],
    observedFactPaths: uniqueSorted(factPaths), sourceIds: uniqueSorted(sources),
    missingRequirements: uniqueSorted(missing),
    mayChangeProductDelivery: false, mayAuthorizeNewClaim: false,
    usefulComplete: false, mayPublish: false, maySell: false,
  };
}

/** R070 family positions can be observed, never promoted into parent/child T8. */
export function assessFamilyMenuMur(
  report: FamilyCanonicalObservationPreview,
): RelationshipAdjacentMenuMur {
  requireIdentity(report.snapshotId, report.calculationHash);
  if ((report.scope !== 'parents' && report.scope !== 'children') ||
      report.interpretationCoverage !== 'insufficient_evidence' ||
      !report.researchOnly || report.usefulComplete ||
      report.mayPublish || report.maySell ||
      report.observations.some(p =>
        !(report.scope === 'parents' ? ['year','month'] : ['hour']).includes(p.pillarSlot))) {
    throw new TypeError('Family MUR cannot reclassify R070 observations as family meaning.');
  }
  const facts = report.observations
    .filter(p => p.state === 'resolved' && !!p.observedPillar);
  return output('family:' + report.scope as RelationshipAdjacentMenuScope,
    facts.length ? 'unsupported' : 'insufficient',
    facts.length ? 'calculated_facts' : 'none',
    [report.snapshotId], [report.calculationHash],
    facts.map(p => p.factPath), [],
    [
      ...report.missing,
      '선택한 부모·자녀 관계의 실제 T8 Claim·적용 방법론·Source/Evidence 승인 미확보',
    ]);
}

/** Timing facts + natal reading are independently valid scopes, not Dayun predictions. */
export function assessLifeStageMenuMur(
  report: LifeStageDayunResearchReport,
  natal: LifeStageNatalStructureContext,
): RelationshipAdjacentMenuMur {
  if (report.snapshotId !== natal.snapshotId ||
      report.calculationHash !== natal.calculationHash) {
    throw new TypeError('Life-stage MUR cannot join two different Canonical calculations.');
  }
  requireIdentity(report.snapshotId, report.calculationHash);
  if (!report.researchOnly || report.usefulComplete ||
      report.mayPublish || report.maySell ||
      report.interpretationStatus !== 'source_authority_not_established' ||
      !(['bounded_natal_t8_research','insufficient_evidence'] as const)
        .includes(natal.availability) ||
      natal.sections.some(x => !x.paragraph.trim() ||
        x.sourceIds.length < 2 || x.factPaths.length < 2) ||
      (natal.sections.length === 0) !==
        (natal.availability === 'insufficient_evidence')) {
    throw new TypeError('Life-stage MUR needs the existing source-qualified natal-only boundary.');
  }
  const current = report.periods.find(p => p.kind === 'current');
  const next = report.periods.find(p => p.kind === 'next');
  if (report.periods.length > 2 ||
      report.periods.some(p => p.kind !== 'current' && p.kind !== 'next') ||
      report.periods.length !== new Set(report.periods.map(p => p.kind)).size ||
      report.periods.some(p => !p.startsAt || !p.endsAtExclusive ||
        !(p.startsAt < p.endsAtExclusive)) ||
      (next !== undefined && (current === undefined ||
        next.startsAt !== current.endsAtExclusive))) {
    throw new TypeError('Life-stage MUR cannot show unbounded or discontinuous Dayun periods.');
  }
  const hasFullFacts = current !== undefined && next !== undefined;
  const hasNatal = natal.sections.length > 0;
  const state = hasFullFacts && hasNatal ? 'partial' :
    current !== undefined || hasNatal ? 'unsupported' : 'insufficient';
  const observedFactPaths = report.periods.length > 0
    ? ['luckCycle'] : [];
  return output('life-stage:general', state,
    hasFullFacts && hasNatal ? 'calculated_periods_plus_separate_natal' :
      report.periods.length ? 'calculated_facts' : 'none',
    [report.snapshotId], [report.calculationHash],
    [...observedFactPaths, ...natal.sections.flatMap(x => x.factPaths)],
    natal.sections.flatMap(x => x.sourceIds),
    [
      ...report.missing,
      ...(!hasNatal
        ? ['동일 명식에서 출처가 있는 원국 구조 T8 연구 풀이 부재'] : []),
      ...(!hasFullFacts
        ? ['현재·다음 대운의 연속된 계산 시작·종료 경계 확보 필요'] : []),
      '현재·다음 대운별 의미·변화·사건에 관한 독립 Source-qualified T9/T8 해석 권한 미확보',
    ]);
}

/** The approved spouse day-branch position is not a partner-personality Claim. */
export function assessSpousePositionMenuMur(
  report: SpousePositionBirthResearchReport,
): RelationshipAdjacentMenuMur {
  requireIdentity(report.snapshotId, report.calculationHash);
  if (report.scope !== 'relationship:natal:spouse' ||
      report.mode !== 'bounded_position_only_preview' ||
      report.mayInferPartnerTraits || report.mayPredictMarriage ||
      !report.researchOnly || report.mayPublish || report.maySell ||
      report.dayPillarFactPath !== 'pillars.day' ||
      !report.provenance.sourceProfileId || !report.provenance.methodologyId ||
      !report.provenance.claimType || report.provenance.sourceRefs.length === 0) {
    throw new TypeError('Spouse MUR cannot extend beyond the approved position-only method.');
  }
  const resolved = report.readingStatus === 'position_only_research_context' &&
    report.meaning === 'traditional_spouse_palace_position_only' &&
    !!report.dayBranchHanja;
  if (!resolved && (report.readingStatus !== 'insufficient_day_branch' ||
      report.meaning !== 'none' || report.dayBranchHanja !== undefined)) {
    throw new TypeError('Spouse MUR cannot invent a resolved day branch.');
  }
  return output('relationship:natal:spouse',
    resolved ? 'partial' : 'insufficient',
    resolved ? 'bounded_position' : 'none',
    [report.snapshotId], [report.calculationHash],
    resolved ? [report.dayPillarFactPath] : [],
    resolved ? [...report.provenance.sourceRefs] : [],
    [
      ...report.missing,
      '배우자궁 위치 이외의 개인별 배우자 T8·MUR 근거 및 정식 의미 적용 권한 미확보',
    ]);
}

/** Two individual T8 natal readings are never interchangeable with T10. */
export function assessCompatibilityMenuMur(
  report: CompatibilityTwoChartIntakePreview,
  natal: CompatibilityPersonalRelationshipContext,
): RelationshipAdjacentMenuMur {
  const a = report.subject, b = report.target;
  for (const [person, reading] of [
    [a, natal.subject], [b, natal.target],
  ] as const) {
    requireIdentity(person.snapshotId, person.calculationHash);
    if (person.personRef !== reading.personRef ||
        person.snapshotId !== reading.snapshotId ||
        person.calculationHash !== reading.calculationHash ||
        reading.sections.some(x => !x.paragraph.trim() ||
          x.sourceIds.length < 2 || x.observedFactPaths.length < 2)) {
      throw new TypeError('Compatibility MUR cannot exchange person-bound T8 evidence.');
    }
  }
  if (a.personRef === b.personRef ||
      !report.researchOnly || report.usefulComplete ||
      report.mayPublish || report.maySell ||
      report.readingStatus !== 'insufficient_interpersonal_meaning_authority' ||
      report.mode !== 'two_person_calculation_only') {
    throw new TypeError('Compatibility MUR must not promote two chart facts into T10.');
  }
  const facts = [a,b].every(person =>
    person.pillars.some(x => x.status === 'resolved'));
  const individualGaps = [natal.subject,natal.target].flatMap((person,i) =>
    person.sections.length === 0
      ? [(i === 0 ? '첫 번째' : '두 번째') +
         ' 사람의 출처 있는 독립 원국 관계 해석이 부족합니다.']
      : []);
  return output('compatibility:natal', facts ? 'unsupported' : 'insufficient',
    facts ? 'calculated_facts' : 'none',
    [a.snapshotId,b.snapshotId], [a.calculationHash,b.calculationHash],
    [
      ...a.pillars.filter(p => p.status === 'resolved').map(p => p.factPath),
      ...b.pillars.filter(p => p.status === 'resolved').map(p => p.factPath),
      ...natal.subject.sections.flatMap(x => x.observedFactPaths),
      ...natal.target.sections.flatMap(x => x.observedFactPaths),
    ],
    [...natal.subject.sections.flatMap(x => x.sourceIds),
      ...natal.target.sections.flatMap(x => x.sourceIds)],
    [
      ...report.missing, ...individualGaps,
      '서로 다른 두 사람 사이의 실제 상호작용 T10 Claim·Methodology·Source 승인 미확보',
    ]);
}
