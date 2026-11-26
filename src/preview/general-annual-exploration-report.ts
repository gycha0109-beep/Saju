import type { TemporalStemInteraction } from './temporal-stem-interaction-reading.js';
import type { TemporalBranchLayerReading } from './temporal-branch-layer-reading.js';
import type { CanonicalSajuSnapshot, PillarSlot, TenGod } from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import type { InterpretationClaim } from '../contracts/interpretation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import type { ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import type { AnnualInterpretationFacts } from '../reading/annual-interpretation-facts.js';
import { GENERAL_ANNUAL_CLAIM_NARRATIVE_PROFILES } from '../research/general-annual-narrative-profiles.js';
import {
  GENERAL_ANNUAL_ACTIVATION_RULES,
  GENERAL_ANNUAL_TENSION_RULES,
  GENERAL_ANNUAL_TENSION_CLAIM_TYPE,
  GENERAL_ANNUAL_THEME_CLAIM_TYPE,
  GENERAL_ANNUAL_POLICY_SOURCE,
  GENERAL_ANNUAL_READING_METHODOLOGY,
  GENERAL_ANNUAL_READING_PACK,
} from '../research/general-annual-reading-candidate.js';

export const GENERAL_ANNUAL_EXPLORATION_VERSION = 'myeongha-annual-exploration-v1' as const;

const THEME_KEYS: Readonly<Record<TenGod, string>> = {
  비견: 'ANNUAL_PEER_SELF_DIRECTION',
  겁재: 'ANNUAL_PEER_COMPETITION_COORDINATION',
  식신: 'ANNUAL_OUTPUT_STEADY_PRODUCTION',
  상관: 'ANNUAL_OUTPUT_EXPRESSION_CHANGE',
  편재: 'ANNUAL_WEALTH_EXTERNAL_RESOURCES',
  정재: 'ANNUAL_WEALTH_STRUCTURED_RESOURCES',
  편관: 'ANNUAL_OFFICER_PRESSURE_RESPONSE',
  정관: 'ANNUAL_OFFICER_ROLE_RESPONSIBILITY',
  편인: 'ANNUAL_RESOURCE_ALTERNATIVE_LEARNING',
  정인: 'ANNUAL_RESOURCE_SUPPORT_LEARNING',
};

const SLOT_LABELS: Readonly<Record<PillarSlot, string>> = {
  year: '태어난 해',
  month: '태어난 달',
  day: '태어난 날',
  hour: '태어난 시각',
};

const SLOTS = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];

export interface GeneralAnnualExplorationSection {
  kind: 'core' | 'tension';
  id: string;
  title: string;
  text: string;
  interpretationStatus: 'internal_research';
  evidenceStatus:
    | 'research_profile_projection_not_an_executed_official_claim'
    | 'executed_research_t9_claim_not_official';
  claimId?: string;
  ruleIds?: readonly string[];
  sourceIds?: readonly string[];
  factPaths?: readonly string[];
  researchProfileId: string;
  candidateClaimType: string;
  candidateRuleId: string;
  calculationFactPaths: readonly string[];
  policySourceId: typeof GENERAL_ANNUAL_POLICY_SOURCE.sourceId;
  methodologyId: typeof GENERAL_ANNUAL_READING_METHODOLOGY.methodologyId;
  relatedPillar?: PillarSlot;
}

export interface GeneralAnnualExplorationReport {
  version: typeof GENERAL_ANNUAL_EXPLORATION_VERSION;
  mode: 'internal_exploration';
  status: 'not_official_reading';
  targetYear: number;
  timeZone: 'Asia/Seoul';
  referenceDateTime: string;
  calendarPolicy: 'civil_year_only';
  annualPillarLabel: string;
  annualStemTenGod: TenGod;
  stemInteractions: readonly TemporalStemInteraction[];
  branchLayers: readonly TemporalBranchLayerReading[];
  headline: string;
  sections: readonly GeneralAnnualExplorationSection[];
  missing: readonly string[];
  unavailablePillars: readonly PillarSlot[];
  caveats: readonly string[];
  permissions: {
    mayClaimOfficialAuthority: false;
    mayPublish: false;
    maySell: false;
    mayAutoPromoteResearch: false;
    modelCalls: 0;
  };
}

function profileCopy(claimType: string, key: string) {
  const rule = [...GENERAL_ANNUAL_ACTIVATION_RULES, ...GENERAL_ANNUAL_TENSION_RULES].find(
    (candidate) => candidate.output.claimType === claimType &&
      (candidate.output.value as { semanticKey: string }).semanticKey === key,
  );
  const profiles = GENERAL_ANNUAL_CLAIM_NARRATIVE_PROFILES.filter(
    (profile) => profile.claimType === claimType && profile.semanticKeys?.includes(key) === true,
  );
  if (profiles.length !== 1) {
    throw new Error(`Expected exactly one annual narrative profile for ${key}.`);
  }
  const templates = profiles[0]!.templates;
  const headline = templates?.find((template) => template.templateKey === 'headline' && template.language === 'ko')?.text;
  const summary = templates?.find((template) => template.templateKey === 'summary' && template.language === 'ko')?.text;
  if (!headline || !summary || !rule) {
    throw new Error(`Annual narrative profile ${key} is missing consumer copy.`);
  }
  return { headline, summary, profileId: profiles[0]!.profileId, ruleId: rule.ruleId };
}

/**
 * Standalone internal profile projection for copy inspection. The joined
 * annual/monthly runtime must use buildExecutedGeneralAnnualExplorationReport.
 */
export function buildGeneralAnnualExplorationReport(
  facts: AnnualInterpretationFacts,
): GeneralAnnualExplorationReport {
  if (facts.scope !== 'annual' || !Number.isInteger(facts.targetYear) || facts.targetYear < 1) {
    throw new RangeError('An annual exploration requires a valid annual fact scope and target year.');
  }
  const semanticKey = THEME_KEYS[facts.annualStemTenGod];
  if (semanticKey === undefined) {
    throw new RangeError('An annual exploration requires a known annual Ten-God.');
  }
  const core = profileCopy(GENERAL_ANNUAL_THEME_CLAIM_TYPE.claimType, semanticKey);
  const sections: GeneralAnnualExplorationSection[] = [
    {
      kind: 'core',
      id: semanticKey,
      title: core.headline,
      text: `서울 달력 ${facts.targetYear}년의 간지 ${facts.annualPillar.stem}${facts.annualPillar.branch}에서 연간의 십신은 ${facts.annualStemTenGod}입니다. ${core.summary}`,
      interpretationStatus: 'internal_research',
      evidenceStatus: 'research_profile_projection_not_an_executed_official_claim',
      researchProfileId: core.profileId,
      candidateClaimType: GENERAL_ANNUAL_THEME_CLAIM_TYPE.claimType,
      candidateRuleId: core.ruleId,
      calculationFactPaths: [
        'temporal.targetYear', 'temporal.annualPillar', 'temporal.annualStemTenGod',
      ],
      policySourceId: GENERAL_ANNUAL_POLICY_SOURCE.sourceId,
      methodologyId: GENERAL_ANNUAL_READING_METHODOLOGY.methodologyId,
    },
  ];
  const unavailablePillars: PillarSlot[] = [];

  for (const slot of SLOTS) {
    const state = facts.annualBranchRelations[slot];
    if (state.status !== 'resolved') {
      unavailablePillars.push(slot);
      continue;
    }
    if (state.value.pillar !== slot || state.value.annualBranch !== facts.annualPillar.branch) {
      throw new Error(`Contradictory annual branch relation for ${slot}.`);
    }
    if (state.value.relation !== 'clash') continue;
    const key = `ANNUAL_BRANCH_CLASH_${slot.toUpperCase()}`;
    const copy = profileCopy(GENERAL_ANNUAL_TENSION_CLAIM_TYPE.claimType, key);
    sections.push({
      kind: 'tension',
      id: key,
      title: copy.headline,
      text: `올해 간지의 지지 ${state.value.annualBranch}와 ${SLOT_LABELS[slot]}의 지지 ${state.value.natalBranch} 사이에서 충이 확인됩니다. ${copy.summary}`,
      interpretationStatus: 'internal_research',
      evidenceStatus: 'research_profile_projection_not_an_executed_official_claim',
      researchProfileId: copy.profileId,
      candidateClaimType: GENERAL_ANNUAL_TENSION_CLAIM_TYPE.claimType,
      candidateRuleId: copy.ruleId,
      calculationFactPaths: [
        'temporal.targetYear', 'temporal.annualPillar',
        'temporal.annualBranchRelations.' + slot,
      ],
      policySourceId: GENERAL_ANNUAL_POLICY_SOURCE.sourceId,
      methodologyId: GENERAL_ANNUAL_READING_METHODOLOGY.methodologyId,
      relatedPillar: slot,
    });
  }

  return {
    version: GENERAL_ANNUAL_EXPLORATION_VERSION,
    mode: 'internal_exploration',
    status: 'not_official_reading',
    targetYear: facts.targetYear,
    timeZone: facts.timeZone,
    referenceDateTime: facts.referenceDateTime,
    calendarPolicy: 'civil_year_only',
    annualPillarLabel: `${facts.annualPillar.stem}${facts.annualPillar.branch}`,
    annualStemTenGod: facts.annualStemTenGod,
    stemInteractions: [],
    branchLayers: [],
    headline: `${facts.targetYear}년 연운 미리보기`,
    sections,
    missing: [],
    unavailablePillars,
    caveats: [
      '내부 기획용 연운 시제품이며 Official Reading이나 판매용 해석 결과가 아닙니다.',
      '표시 연도는 서울 달력 연도 기준이며 입춘 시각 전후의 효력 간지를 뜻하지 않습니다.',
      '십신 테마와 충 관계 문구는 검토 중인 해석 가설로, 실제 사건이나 결과의 확정 예측이 아닙니다.',
      ...(unavailablePillars.length === 0
        ? []
        : [`확인되지 않은 기둥(${unavailablePillars.map((slot) => SLOT_LABELS[slot]).join(', ')})의 충 관계는 추정하지 않았습니다.`]),
    ],
    permissions: {
      mayClaimOfficialAuthority: false,
      mayPublish: false,
      maySell: false,
      mayAutoPromoteResearch: false,
      modelCalls: 0,
    },
  };
}


function requireAnnualEvidence(value: unknown, detail: string): asserts value {
  if (!value) throw new TypeError('General annual exploration: ' + detail);
}

type AnnualClaimValue = {
  semanticKey: string;
  tenGod?: TenGod;
  natalPillar?: PillarSlot;
  relation?: string;
  activationKind?: string;
};

function annualClaimValue(claim: InterpretationClaim): AnnualClaimValue {
  const value = claim.value as Record<string, unknown>;
  requireAnnualEvidence(
    value !== null && typeof value === 'object' && typeof value.semanticKey === 'string',
    'selected annual Claim must have a registered semantic key',
  );
  return value as AnnualClaimValue;
}

function validateAnnualClaimProvenance(
  claim: InterpretationClaim,
  expectedRuleId: string,
  registry: ResolvedRuleRegistrySnapshot,
): readonly string[] {
  requireAnnualEvidence(
    claim.sourceRefs.includes(GENERAL_ANNUAL_POLICY_SOURCE.sourceId),
    'selected annual Claim must cite the existing internal policy source',
  );
  requireAnnualEvidence(
    claim.methodologyRef.id === GENERAL_ANNUAL_READING_METHODOLOGY.methodologyId &&
      claim.methodologyRef.version === GENERAL_ANNUAL_READING_METHODOLOGY.version,
    'selected annual Claim must use the existing annual methodology version',
  );
  requireAnnualEvidence(
    registry.methodologies.some(
      (method) =>
        method.methodologyId === claim.methodologyRef.id &&
        method.version === claim.methodologyRef.version &&
        method.status === 'research',
    ) &&
      registry.pack.methodologyRefs.some(
        (method) =>
          method.id === claim.methodologyRef.id &&
          method.version === claim.methodologyRef.version,
      ),
    'annual methodology must remain registered as research in the pack',
  );
  requireAnnualEvidence(
    registry.sources.some((source) => source.sourceId === GENERAL_ANNUAL_POLICY_SOURCE.sourceId),
    'annual policy source must remain registered',
  );
  requireAnnualEvidence(claim.ruleRefs.length > 0, 'selected annual Claim must retain rule references');
  const ruleIds = claim.ruleRefs.map((reference) => {
    const rule = registry.rules.find(
      (candidate) =>
        candidate.ruleId === reference.ruleId && candidate.version === reference.version,
    );
    if (
      rule === undefined ||
      rule.status !== 'research' ||
      rule.methodologyRef.id !== claim.methodologyRef.id ||
      rule.methodologyRef.version !== claim.methodologyRef.version ||
      !rule.sourceRefs.some(
        (source) =>
          source.sourceId === GENERAL_ANNUAL_POLICY_SOURCE.sourceId &&
          source.supportType === 'implementation_reference',
      )
    ) {
      throw new TypeError(
        'General annual exploration: annual Claim rule must remain research-only and linked to the same method/source',
      );
    }
    return rule.ruleId;
  });
  requireAnnualEvidence(
    ruleIds.includes(expectedRuleId),
    'selected annual Claim must reference the rule for its semantic key',
  );
  return ruleIds;
}

/**
 * Builds joined annual sections only from active Claims selected by the exact
 * annual Reading Composition. The profile-only builder is never a fallback.
 */
export function buildExecutedGeneralAnnualExplorationReport(
  snapshot: CanonicalSajuSnapshot,
  facts: AnnualInterpretationFacts,
  execution: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
  request: ReadingRequest,
  selectedClaimIds: readonly string[],
): GeneralAnnualExplorationReport {
  const period = request.targetPeriod;
  requireAnnualEvidence(
    facts.scope === 'annual' &&
      request.intent.domain === 'general' &&
      request.intent.temporalScope === 'annual' &&
      period?.scope === 'annual' &&
      period.year === facts.targetYear &&
      period.timeZone === facts.timeZone &&
      period.referenceDateTime === facts.referenceDateTime,
    'request and annual facts must describe the same exact period',
  );
  const allowedPackVersions = [
    GENERAL_ANNUAL_READING_PACK.version,
    GENERAL_ANNUAL_READING_PACK.version + '.branch-layers',
    GENERAL_ANNUAL_READING_PACK.version + '.stem-interaction',
    GENERAL_ANNUAL_READING_PACK.version + '.branch-layers.stem-interaction',
  ];
  requireAnnualEvidence(
    registry.pack.status === 'research' &&
      registry.pack.packId === GENERAL_ANNUAL_READING_PACK.packId &&
      allowedPackVersions.includes(registry.pack.version),
    'annual registry must use the existing research pack and permitted extensions',
  );
  requireAnnualEvidence(
    execution.run.snapshotId === snapshot.snapshotId &&
      execution.run.snapshotHash === snapshot.calculationHash &&
      execution.run.registrySnapshotId === registry.snapshot.registrySnapshotId &&
      execution.run.packRef.id === registry.pack.packId &&
      execution.run.packRef.version === registry.pack.version &&
      execution.run.requestId === request.requestId &&
      execution.integrity.valid &&
      execution.run.status !== 'failed',
    'annual execution must belong to the same snapshot, request, and registry',
  );

  const selectedIds = new Set(selectedClaimIds);
  const selectedClaims = execution.claims.filter(
    (claim) =>
      claim.state === 'active' &&
      claim.snapshotId === snapshot.snapshotId &&
      selectedIds.has(claim.claimId) &&
      claim.taxonomy.tier === 'T9' &&
      claim.taxonomy.category === 'general' &&
      claim.taxonomy.subcategory === 'annual' &&
      (claim.claimType === GENERAL_ANNUAL_THEME_CLAIM_TYPE.claimType ||
        claim.claimType === GENERAL_ANNUAL_TENSION_CLAIM_TYPE.claimType),
  );
  const themes = selectedClaims.filter(
    (claim) => claim.claimType === GENERAL_ANNUAL_THEME_CLAIM_TYPE.claimType,
  );
  requireAnnualEvidence(themes.length <= 1, 'annual activation Claim must be unique');
  const tensionByPillar = new Map<PillarSlot, InterpretationClaim>();
  for (const claim of selectedClaims.filter(
    (item) => item.claimType === GENERAL_ANNUAL_TENSION_CLAIM_TYPE.claimType,
  )) {
    const value = annualClaimValue(claim);
    const slot = value.natalPillar;
    if (slot === undefined || !SLOTS.includes(slot)) {
      throw new TypeError('General annual exploration: annual tension Claim must identify one natal pillar');
    }
    requireAnnualEvidence(!tensionByPillar.has(slot), 'annual tension Claim must be unique per pillar');
    const relation = facts.annualBranchRelations[slot];
    requireAnnualEvidence(
      value.semanticKey === 'ANNUAL_BRANCH_CLASH_' + slot.toUpperCase() &&
        value.relation === 'clash' &&
        relation.status === 'resolved' &&
        relation.value.pillar === slot &&
        relation.value.annualBranch === facts.annualPillar.branch &&
        relation.value.relation === 'clash',
      'annual tension Claim must match the resolved natal branch relation',
    );
    tensionByPillar.set(slot, claim);
  }

  const profileProjection = buildGeneralAnnualExplorationReport(facts);
  const missing: string[] = [];
  const sections = profileProjection.sections.flatMap((section) => {
    const claim =
      section.kind === 'core'
        ? themes[0]
        : section.relatedPillar === undefined
          ? undefined
          : tensionByPillar.get(section.relatedPillar);
    if (claim === undefined) return [];

    const value = annualClaimValue(claim);
    requireAnnualEvidence(value.semanticKey === section.id, 'Claim semantic key must match its profile');
    const requiredFactPaths =
      section.kind === 'core'
        ? ['temporal.targetYear', 'temporal.annualPillar', 'temporal.annualStemTenGod']
        : [
            'temporal.targetYear',
            'temporal.annualPillar',
            'temporal.annualBranchRelations.' + section.relatedPillar,
          ];
    requireAnnualEvidence(
      requiredFactPaths.every((path) => claim.factRefs.includes(path)),
      'selected annual Claim must reference its exact calculation facts',
    );

    if (section.kind === 'core') {
      requireAnnualEvidence(
        value.tenGod === facts.annualStemTenGod &&
          value.activationKind === 'annual_stem_ten_god' &&
          section.id === THEME_KEYS[facts.annualStemTenGod],
        'annual activation Claim must match the calculated annual Ten-God',
      );
    }

    const ruleIds = validateAnnualClaimProvenance(claim, section.candidateRuleId, registry);
    return [
      {
        ...section,
        evidenceStatus: 'executed_research_t9_claim_not_official' as const,
        claimId: claim.claimId,
        ruleIds,
        sourceIds: [...claim.sourceRefs],
        factPaths: [...claim.factRefs],
      },
    ];
  });

  if (themes.length === 0) {
    missing.push('연간 중심 T9 연구 Claim이 선택되지 않아 중심 해석을 표시하지 않습니다.');
  }
  for (const slot of SLOTS) {
    const relation = facts.annualBranchRelations[slot];
    if (
      relation.status === 'resolved' &&
      relation.value.relation === 'clash' &&
      !tensionByPillar.has(slot)
    ) {
      missing.push(
        '원국 ' + SLOT_LABELS[slot] + '의 연운 충 관계 Claim이 선택되지 않아 해당 보조 해석을 보류합니다.',
      );
    }
  }

  return {
    ...profileProjection,
    headline:
      themes.length > 0
        ? profileProjection.headline
        : '연간 중심 T9 연구 Claim이 선택되지 않아 해석을 표시하지 않습니다.',
    sections,
    missing,
  };
}
