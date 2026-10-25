import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { InterpretationClaim } from '../contracts/interpretation.js';
import { runInterpretation, type InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  createSharedNatalStructuralSynthesisRegistry,
  SHARED_NATAL_STRUCTURAL_CLAIM_PREFIX,
} from '../research/shared-natal-structural-synthesis-candidate.js';

export const SHARED_NATAL_STRUCTURAL_READING_VERSION = '0.1.0-internal-research' as const;
export type ObservedFamily = 'peer' | 'resource' | 'output' | 'wealth' | 'officer';
export type ObservedChannel = 'visible_stems' | 'branches';

export interface SharedNatalStructuralSection {
  claimId: string;
  ruleId: string;
  methodologyId: string;
  claimType: string;
  family: ObservedFamily;
  channel: ObservedChannel;
  context: 'season' | 'intrinsic_root' | 'hidden_challenge' |
    'hidden_support_peer' | 'hidden_support_resource';
  title: string;
  paragraph: string;
  monthRelation: string;
  monthBranchElement: string;
  upstreamClaimIds: readonly string[];
  sourceIds: readonly string[];
  observedFactPaths: readonly string[];
  /** Intrinsic candidates do not establish effective root strength. */
  intrinsicRootCandidates: readonly { position: string; rootClass: string }[];
  hiddenChallengeMembership: readonly { position: string; relation: string; targetElement: string }[];
  /** I18B membership is never interpreted as actual effect or an adverse event. */
  hiddenChallengeEffect: 'not_determined';
  hiddenSupportMembership: readonly { position: string; kind: string; element: string }[];
  hiddenSupportEffect: 'not_determined';
  interpretedOutcomes: false;
}

export interface SharedNatalStructuralReading {
  version: typeof SHARED_NATAL_STRUCTURAL_READING_VERSION;
  snapshotId: string;
  calculationHash: string;
  sections: readonly SharedNatalStructuralSection[];
  missing: readonly string[];
  researchOnly: true;
  usefulComplete: false;
  mayPublish: false;
  maySell: false;
  mayCallOfficial: false;
}

const FAMILY_LABEL: Record<ObservedFamily, string> = {
  peer: '비겁', resource: '인성', output: '식상', wealth: '재성', officer: '관성',
};
const POSITION: Readonly<Record<string, string>> = {
  year: '연주', month: '월주', day: '일주', hour: '시주',
};
const RELATION: Record<string, string> = {
  peer: '동일 오행 관계', resource: '생조 방향의 오행 관계',
  output: '표현·산출 방향의 오행 관계',
  wealth: '제어 방향의 오행 관계', officer: '외부에서 제어하는 방향의 오행 관계',
};
function assert(condition: unknown, reason: string): asserts condition {
  if (!condition) throw new TypeError('Shared natal structural reading: ' + reason);
}
function valueOf(claim: InterpretationClaim): Record<string, unknown> {
  assert(claim.value !== null && typeof claim.value === 'object' &&
    !Array.isArray(claim.value), 'Claim has no structured value');
  return claim.value as Record<string, unknown>;
}
function isStructuralClaim(claim: InterpretationClaim) {
  return claim.state === 'active' && claim.taxonomy.tier === 'T8' &&
    claim.taxonomy.category === 'general' &&
    claim.claimType.startsWith(SHARED_NATAL_STRUCTURAL_CLAIM_PREFIX);
}
function section(
  claim: InterpretationClaim,
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
  registry: ReturnType<typeof createSharedNatalStructuralSynthesisRegistry>,
): SharedNatalStructuralSection {
  const data = valueOf(claim);
  assert(data.outcomeAuthorized === false && data.futureTimingAuthorized === false &&
    data.numericScoringAuthorized === false &&
    data.strength === 'not_determined' && data.monthRelationMatchesThemeFamily === true &&
    data.hiddenChallengeEffect === 'not_determined' &&
    data.hiddenSupportEffect === 'not_determined' &&
    data.interactionPrecedence === 'not_determined' &&
    data.gyeokguk === 'not_determined' &&
    data.yongshin === 'not_determined', 'structural observation was promoted to outcome');
  const family = data.family as ObservedFamily;
  const channel = data.channel as ObservedChannel;
  const context = data.context as SharedNatalStructuralSection['context'];
  assert(FAMILY_LABEL[family] && ['visible_stems','branches'].includes(channel) &&
    ['season','intrinsic_root','hidden_challenge',
      'hidden_support_peer','hidden_support_resource'].includes(context) &&
    claim.snapshotId === snapshot.snapshotId && claim.scenarioRef === undefined,
  'unsupported family, context or scenario');
  const upstream = claim.upstreamClaimRefs.map(id =>
    execution.claims.find(candidate => candidate.claimId === id));
  assert((context === 'season' ? upstream.length === 3 :
    context === 'intrinsic_root' ? upstream.length >= 4 : upstream.length >= 5) &&
    upstream.every(item => item?.state === 'active' &&
      item.snapshotId === snapshot.snapshotId && item.scenarioRef === undefined),
  'Claim lacks source-bound same-chart upstream T2/T5');
  const month = upstream.find(item => item?.claimType === 'DAY_MASTER_MONTH_BRANCH_EVIDENCE');
  const scope = upstream.find(item => item?.claimType === 'DAY_MASTER_MONTH_BRANCH_SCOPE_GUARD');
  const theme = upstream.find(item => item?.claimType ===
    'TEN_GOD_' + family.toUpperCase() + '_' + channel.toUpperCase() + '_THEME');
  const roots = upstream.filter(item => item?.claimType === 'DAY_MASTER_ROOT_CLASS_EVIDENCE');
  const challenges = upstream.filter(item => item?.claimType === 'DAY_MASTER_STRENGTH_EVIDENCE' &&
    (item.value as {evidenceKind?: string}).evidenceKind === 'hidden_challenge_membership');
  const challengeScope = upstream.find(item => item?.claimType === 'DAY_MASTER_HIDDEN_CHALLENGE_SCOPE_GUARD');
  const supportScope = upstream.find(item => item?.claimType === 'DAY_MASTER_STRENGTH_SCOPE_GUARD');
  const supports = upstream.filter(item => item?.claimType === 'DAY_MASTER_STRENGTH_EVIDENCE' &&
    ['hidden_peer_root','hidden_resource_support'].includes(String(
      (item.value as {evidenceKind?: string}).evidenceKind)));
  assert(month && scope && theme &&
    (context === 'intrinsic_root' ? roots.length > 0 : roots.length === 0) &&
    (context === 'hidden_challenge' ? challenges.length > 0 && challengeScope : challenges.length === 0) &&
    (context.startsWith('hidden_support_') ? supports.length > 0 && supportScope : supports.length === 0) &&
    month.taxonomy.tier === 'T2' && scope.taxonomy.tier === 'T2' &&
    theme.taxonomy.tier === 'T5', 'missing required exact source T2/T5');
  const m = valueOf(month);
  assert(m.overallStrength === 'not_determined' &&
    m.monthContext === 'branch_element_only' && m.relation === family &&
    typeof m.monthBranchElement === 'string' && typeof m.relation === 'string' &&
    valueOf(scope).classificationAuthorized === false, 'month scope guard failed');
  const rootClasses = roots.map(root => {
    const value = valueOf(root!);
    assert(value.relationEffect === 'not_evaluated' &&
      value.overallStrength === 'not_determined' &&
      typeof value.position === 'string' && typeof value.rootClass === 'string',
    'intrinsic root promoted to effective strength');
    return {position: value.position as string, rootClass: value.rootClass as string};
  });
  const hiddenChallengeMembership = challenges.map(challenge => {
    const value = valueOf(challenge!);
    assert(value.evidenceKind === 'hidden_challenge_membership' &&
      value.direction === 'challenging' && value.effect === 'not_determined' &&
      value.overallStrength === 'not_determined' && value.weight === 'not_assigned' &&
      ['output','wealth','officer'].includes(String(value.relation)) &&
      typeof value.position === 'string' && typeof value.targetElement === 'string',
    'hidden-stem membership was promoted to effect or unrelated observation');
    return { position: value.position as string,
      relation: value.relation as string, targetElement: value.targetElement as string };
  });
  if(context === 'hidden_challenge') {
    assert(['peer','resource'].includes(String(m.relation)) &&
      valueOf(challengeScope!).classificationAuthorized === false &&
      valueOf(challengeScope!).hiddenMembershipOnly === true,
    'support-vs-hidden challenge requires exact I18B source and safety guard');
  }
  const hiddenSupportMembership = supports.map(support => {
    const value = valueOf(support!);
    const expectedKind = context === 'hidden_support_peer' ?
      'hidden_peer_root' : 'hidden_resource_support';
    assert(value.evidenceKind === expectedKind && value.direction === 'supporting' &&
      value.weight === 'not_assigned' && value.overallStrength === 'not_determined' &&
      typeof value.position === 'string' &&
      (expectedKind === 'hidden_peer_root' ? value.relation === 'peer' :
        value.relation === 'resource' && typeof value.resourceElement === 'string'),
    'hidden peer/resource membership was promoted or wrongly mixed');
    return {position: value.position as string, kind: expectedKind,
      element: String(expectedKind === 'hidden_resource_support' ?
        value.resourceElement : value.dayMasterElement)};
  });
  if(context.startsWith('hidden_support_')) {
    assert(['output','wealth','officer'].includes(String(m.relation)) &&
      valueOf(supportScope!).status === 'undetermined' &&
      valueOf(supportScope!).balancingUse === 'not_authorized',
    'challenge-vs-hidden support requires the governed I13 guard');
  }
  const ruleRef = claim.ruleRefs[0];
  const rule = registry.rules.find(r => r.ruleId === ruleRef?.ruleId &&
    r.version === ruleRef?.version);
  const evaluation = execution.evaluations.find(x => x.evaluationId === ruleRef?.evaluationId);
  assert(rule && rule.taxonomy.tier === 'T8' &&
    rule.output.claimType === claim.claimType &&
    rule.methodologyRef.id === claim.methodologyRef.id &&
    deterministicContentHash(rule.output.value) === deterministicContentHash(claim.value) &&
    evaluation?.status === 'matched' && evaluation.emittedClaimIds.includes(claim.claimId) &&
    new Set(rule.sourceRefs.map(ref => ref.sourceId)).size === claim.sourceRefs.length &&
    rule.sourceRefs.every(ref => claim.sourceRefs.includes(ref.sourceId)),
  'selected Claim is not from an actual matched source Rule');
  const observed = [...new Set(upstream.flatMap(item => item!.factRefs))];
  const relation = RELATION[m.relation as string];
  assert(relation !== undefined && observed.length > 0, 'no exact month relation or fact paths');
  const monthEvidence = '일간과 월지 오행 ' + m.monthBranchElement + ' 사이에서 ' +
    relation + '가 계산됐습니다.';
  const rootEvidence = context === 'intrinsic_root'
    ? ' 별도로 ' + rootClasses.map(value =>
      (POSITION[value.position] ?? value.position) + '의 뿌리 종류 후보(' +
      value.rootClass + ')가 관측됐습니다. 이는 실제 통근 효력이나 강약을 확정하지 않습니다.'
    ).join(' ') : '';
  const challengeEvidence = context === 'hidden_challenge'
    ? ' 한편 ' + hiddenChallengeMembership.map(value =>
      (POSITION[value.position] ?? value.position) + '의 지장간에서 ' +
      (FAMILY_LABEL[value.relation as ObservedFamily] ?? value.relation) +
      ' 방향(' + value.targetElement + ')의 포함 관계가 확인됩니다.'
    ).join(' ') +
    ' 월령의 지원 방향과 지장간의 도전 방향이 함께 관측된다는 뜻일 뿐, 어느 쪽이 실제로 더 강한지나 충돌의 결과는 정해지지 않았습니다.' : '';
  const supportEvidence = context.startsWith('hidden_support_')
    ? ' 한편 ' + hiddenSupportMembership.map(value =>
      (POSITION[value.position] ?? value.position) + '의 지장간에서 ' +
      (value.kind === 'hidden_peer_root' ? '비겁 뿌리 후보' : '인성의 자원성 후보') +
      '(' + value.element + ')가 관측됐습니다.'
    ).join(' ') +
    ' 월령의 도전 방향과 지장간의 지원 방향이 공존하지만, 실제 뿌리 효력이나 강약의 우열을 결정하지 않습니다.' : '';
  const title = '원국 ' + FAMILY_LABEL[family] + '의 ' +
    (channel === 'visible_stems' ? '천간' : '지지') +
    ' 관측과 ' + (context === 'season' ? '월령 환경' :
      context === 'intrinsic_root' ? '뿌리 후보' :
      context === 'hidden_challenge' ? '지장간 도전 관계' : '지장간 지원 관계') + '의 공통 맥락';
  const paragraph = '같은 명식에서 ' + FAMILY_LABEL[family] +
    ' 십신 계열이 확인됐습니다. ' + monthEvidence + rootEvidence +
    challengeEvidence + supportEvidence +
    ' 두 사실을 함께 볼 수는 있지만, 어느 요소가 강하거나 유리한지, 사람의 행동·재물·직업 또는 미래 사건이 어떻게 된다고 결론 내리지 않습니다.';
  return {
    claimId: claim.claimId, claimType: claim.claimType, ruleId: rule.ruleId,
    methodologyId: claim.methodologyRef.id, family, channel, context, title, paragraph,
    monthRelation: m.relation as string, monthBranchElement: m.monthBranchElement as string,
    upstreamClaimIds: [...claim.upstreamClaimRefs],
    sourceIds: [...claim.sourceRefs], observedFactPaths: observed,
    intrinsicRootCandidates: rootClasses, hiddenChallengeMembership,
    hiddenChallengeEffect: 'not_determined', hiddenSupportMembership,
    hiddenSupportEffect: 'not_determined', interpretedOutcomes: false,
  };
}

/** Shared research output. Does not revise or promote any existing five-domain report. */
export function buildSharedNatalStructuralResearchReading(
  snapshot: CanonicalSajuSnapshot,
  options: { requestId?: string; now?: Date } = {},
): SharedNatalStructuralReading {
  const registry = createSharedNatalStructuralSynthesisRegistry();
  const execution = runInterpretation(snapshot, registry, {
    requestId: options.requestId ?? 'shared-natal-structural-research',
    now: options.now ?? new Date('2026-10-25T00:00:00.000Z'),
  });
  assert(execution.integrity.valid && execution.run.snapshotId === snapshot.snapshotId &&
    execution.run.snapshotHash === snapshot.calculationHash &&
    registry.pack.status === 'research', 'execution identity or research boundary failed');
  const claims = execution.claims.filter(isStructuralClaim);
  const sections = snapshot.completeness.birthTimeKnown
    ? claims.map(claim => section(claim, snapshot, execution, registry))
        .sort((a,b) => a.family.localeCompare(b.family) ||
          a.channel.localeCompare(b.channel) || a.context.localeCompare(b.context))
    : [];
  const missing = [
    ...(snapshot.completeness.birthTimeKnown ? [] : ['생시가 불명확해 명식 전체 구조 해석을 보류했습니다.']),
    ...(!sections.length ? ['등록된 연구 범위에서 월령·십신 결합 구조 Claim이 관측되지 않았습니다.'] : []),
    '신강·신약·격국·용신의 최종 판정, 통근의 실제 효력, 인생 사건·금전·길흉은 허용된 근거가 없어 판정하지 않습니다.',
  ];
  return {
    version: SHARED_NATAL_STRUCTURAL_READING_VERSION,
    snapshotId: snapshot.snapshotId, calculationHash: snapshot.calculationHash,
    sections, missing, researchOnly: true, usefulComplete: false,
    mayPublish: false, maySell: false, mayCallOfficial: false,
  };
}
