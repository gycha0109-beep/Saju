import {
  deriveStructuralRelationCandidates,
  type PillarSlot,
  type StructuralPillarInput,
  type StructuralRelationKind,
  type StructuralRelationParticipant,
} from '../calculation/structural-relations.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeCombinationSupportChannelEvidenceReport } from './i52-challenge-combination-support-channel-evidence.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyAdapterContractReport } from './i102-challenge-combination-support-channel-untouched-support-effect-existing-substrate-source-vocabulary-adapter-contract.js';

export const I103_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_BINDING_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-existing-substrate-source-vocabulary-binding-evidence-v1';

export type I103ReadyVocabularyTerm = '合' | '冲' | '生';
export type I103TermEvidenceState =
  | 'CURRENT_CHART_BINDINGS_MATERIALIZED'
  | 'NO_CURRENT_CHART_BINDING_OBSERVED';

export interface I103StructuralVocabularyBindingEvidence {
  sourceTerm: '合' | '冲';
  bindingKind:
    | 'SOURCE_HE_COMPONENT_SCOPED_RELATION_IDENTITY_BINDING'
    | 'SOURCE_CHONG_BRANCH_CLASH_IDENTITY_BINDING';
  relationId: string;
  relationKind: StructuralRelationKind;
  participants: readonly StructuralRelationParticipant[];
  componentScope: 'stem' | 'branch';
  structuralMatchOnly: true;
  transformationEstablished: false;
  bindingOutcome: 'not_determined';
  damageOutcome: 'not_determined';
  rescueOutcome: 'not_resolved';
  persistenceOutcome: 'not_determined';
  relativeForceVerdict: 'not_determined';
  precedence: 'not_determined';
  numericWeight: 'not_assigned';
}

export interface I103ResourceGenerationVocabularyBindingEvidence {
  sourceTerm: '生';
  bindingKind: 'SOURCE_SHENG_RESOURCE_GENERATION_DIRECTION_BINDING';
  contextRelationId: string;
  contextRelationKind: StructuralRelationKind;
  targetPillar: PillarSlot;
  targetComponent: 'stem' | 'branch';
  targetValue: string;
  sourcePillar: PillarSlot;
  sourceComponent: 'stem' | 'branch';
  supportChannelKind: 'RESOURCE_GENERATION_SUPPORT_CHANNEL';
  activationState: 'not_determined';
  persistenceState: 'not_determined';
  effectiveSupportEffect: 'not_resolved';
  relativeForceVerdict: 'not_determined';
  precedence: 'not_determined';
  numericWeight: 'not_assigned';
}

export interface I103VocabularyTermEvidenceSummary {
  sourceTerm: I103ReadyVocabularyTerm;
  state: I103TermEvidenceState;
  bindingCount: number;
  noBindingMeansEffectAbsent: false;
  noBindingMeansVocabularyAbsentFromChart: false;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingEvidenceReport {
  evidenceId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_BINDING_EVIDENCE'
    | 'PILLARS_UNRESOLVED'
    | 'I102_UNRESOLVED_OR_INVALID'
    | 'I52_UNRESOLVED_OR_INVALID'
    | 'I52_RELATION_CONTEXT_MISMATCH'
    | 'I52_SUPPORT_SOURCE_POSITION_MISMATCH'
    | 'AMBIGUOUS_DUPLICATE_DIRECTIONAL_SUBSTRATE';
  upstreamI102ContractId: string;
  upstreamI52ReportId: string;
  structuralBindings: readonly I103StructuralVocabularyBindingEvidence[];
  resourceGenerationBindings: readonly I103ResourceGenerationVocabularyBindingEvidence[];
  termSummaries: readonly I103VocabularyTermEvidenceSummary[];
  structuralBindingCount: number;
  resourceGenerationBindingCount: number;
  evidenceBindingAvailable: boolean;
  sourceHeEvidenceMaterialized: boolean;
  sourceChongEvidenceMaterialized: boolean;
  sourceShengEvidenceMaterialized: boolean;
  sourceKeEvidenceMaterialized: false;
  sourceXingEvidenceMaterialized: false;
  sourceWeiEvidenceMaterialized: false;
  relationsIndependentlyRecomputedFromPillars: boolean;
  i52RelationContextsIndependentlyVerified: boolean;
  duplicateDirectionalEvidenceCollapsedByInference: false;
  zeroBindingMayBeTreatedAsPositiveSettlementOutcome: false;
  zeroBindingMayBeTreatedAsVocabularyAbsence: false;
  evidenceBindingMeansRelationOutcomeResolved: false;
  evidenceBindingMeansPersistenceResolved: false;
  evidenceBindingMeansEffectiveSupportResolved: false;
  evidenceBindingMeansMethodologyMaterialized: false;
  noTrackedRelationTouchSemanticsRemainUnchanged: true;
  calculationCoreMutationPerformed: false;
  structuralRelationKindMutationPerformed: false;
  methodologyDefinitionCreatedByThisGate: false;
  methodologyRegisteredByThisGate: false;
  ruleDefinitionCreatedByThisGate: false;
  registrySnapshotMutatedByThisGate: false;
  reviewAttestationCreatedByThisGate: false;
  sourceActivationVerdictAuthorized: false;
  sourcePersistenceVerdictAuthorized: false;
  sourceEffectiveSupportVerdictAuthorized: false;
  relativeForceVerdictAuthorized: false;
  clashWinnerVerdictAuthorized: false;
  rescueEffectAuthorized: false;
  clashSettlementAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_BINDING_PROMOTION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_ADAPTER_CONTRACT';
  notes: readonly string[];
}

const PILLAR_ORDER = Object.freeze(['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[]);
const HE_KINDS = Object.freeze([
  'stem_five_combination',
  'branch_six_combination',
  'branch_three_combination',
] as const satisfies readonly StructuralRelationKind[]);

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingEvidenceReport, 'evidenceId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingEvidenceReport {
  return {
    evidenceId: `challenge_combination_support_channel_untouched_support_vocabulary_binding_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function commonMaterial(
  contract: ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyAdapterContractReport,
  supportEvidence: ChallengeCombinationSupportChannelEvidenceReport,
) {
  return {
    evidenceVersion:
      I103_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_BINDING_EVIDENCE_VERSION,
    upstreamI102ContractId: contract.contractId,
    upstreamI52ReportId: supportEvidence.reportId,
    sourceKeEvidenceMaterialized: false as const,
    sourceXingEvidenceMaterialized: false as const,
    sourceWeiEvidenceMaterialized: false as const,
    duplicateDirectionalEvidenceCollapsedByInference: false as const,
    zeroBindingMayBeTreatedAsPositiveSettlementOutcome: false as const,
    zeroBindingMayBeTreatedAsVocabularyAbsence: false as const,
    evidenceBindingMeansRelationOutcomeResolved: false as const,
    evidenceBindingMeansPersistenceResolved: false as const,
    evidenceBindingMeansEffectiveSupportResolved: false as const,
    evidenceBindingMeansMethodologyMaterialized: false as const,
    noTrackedRelationTouchSemanticsRemainUnchanged: true as const,
    calculationCoreMutationPerformed: false as const,
    structuralRelationKindMutationPerformed: false as const,
    methodologyDefinitionCreatedByThisGate: false as const,
    methodologyRegisteredByThisGate: false as const,
    ruleDefinitionCreatedByThisGate: false as const,
    registrySnapshotMutatedByThisGate: false as const,
    reviewAttestationCreatedByThisGate: false as const,
    sourceActivationVerdictAuthorized: false as const,
    sourcePersistenceVerdictAuthorized: false as const,
    sourceEffectiveSupportVerdictAuthorized: false as const,
    relativeForceVerdictAuthorized: false as const,
    clashWinnerVerdictAuthorized: false as const,
    rescueEffectAuthorized: false as const,
    clashSettlementAuthorized: false as const,
    crossRelationPrecedenceAuthorized: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
  };
}

function unresolved(
  status: Exclude<
    ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingEvidenceReport['status'],
    'RESOLVED_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_BINDING_EVIDENCE'
  >,
  contract: ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyAdapterContractReport,
  supportEvidence: ChallengeCombinationSupportChannelEvidenceReport,
  notes: readonly string[],
): ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingEvidenceReport {
  return finalized({
    ...commonMaterial(contract, supportEvidence),
    status,
    structuralBindings: [],
    resourceGenerationBindings: [],
    termSummaries: [],
    structuralBindingCount: 0,
    resourceGenerationBindingCount: 0,
    evidenceBindingAvailable: false,
    sourceHeEvidenceMaterialized: false,
    sourceChongEvidenceMaterialized: false,
    sourceShengEvidenceMaterialized: false,
    relationsIndependentlyRecomputedFromPillars: false,
    i52RelationContextsIndependentlyVerified: false,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_ADAPTER_CONTRACT',
    notes,
  });
}

function pillarsResolved(pillars: StructuralPillarInput): boolean {
  return PILLAR_ORDER.every((slot) => pillars[slot] !== undefined);
}

function exactI102Accepted(
  contract: ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyAdapterContractReport,
): boolean {
  if (
    contract.status !== 'RESOLVED_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_ADAPTER_CONTRACT' ||
    contract.decision !== 'HE_CHONG_SHENG_EVIDENCE_BINDING_ADAPTER_CONTRACT_FROZEN_IMPLEMENTATION_SEPARATE' ||
    contract.readyTerms.join('|') !== '合|冲|生' ||
    contract.blockedTerms.join('|') !== '克|刑|卫' ||
    contract.adapterCount !== 3 ||
    !contract.allReadyTermsContracted ||
    !contract.blockedTermsExplicitlyExcluded ||
    contract.sourceHeAcceptedStructuralRelationKinds.join('|') !== HE_KINDS.join('|') ||
    contract.sourceHeGenericRelationKindCreated !== false ||
    !contract.sourceHeComponentScopeMustBePreserved ||
    contract.sourceChongAcceptedStructuralRelationKinds.join('|') !== 'branch_clash' ||
    !contract.sourceChongIdentityOnly ||
    !contract.sourceChongDamageOutcomeStillUnresolved ||
    contract.sourceShengAcceptedSupportChannelKinds.join('|') !== 'RESOURCE_GENERATION_SUPPORT_CHANNEL' ||
    !contract.sourceShengDirectionOnly ||
    !contract.sourceShengPersistenceStillUnresolved ||
    contract.sourceKeAdapterIncluded !== false ||
    contract.sourceXingAdapterIncluded !== false ||
    contract.sourceWeiAdapterIncluded !== false ||
    !contract.adapterMayConsumeOnlyExistingAuthorizedSubstrate ||
    contract.adapterMaySynthesizeMissingSubstrate !== false ||
    contract.adapterMayInferUntrackedVocabularyAbsence !== false ||
    contract.adapterMayChangeNoTrackedRelationTouchMeaning !== false ||
    !contract.noTrackedRelationTouchSemanticsRemainUnchanged ||
    contract.adapterSemanticCeiling !== 'EVIDENCE_BINDING_ONLY' ||
    contract.adapterImplementationPerformedByThisGate !== false ||
    contract.adapterImplementationAuthorizedByThisGate !== false ||
    contract.calculationCoreMutationAuthorizedByThisGate !== false ||
    contract.structuralRelationKindMutationAuthorizedByThisGate !== false ||
    contract.sourceActivationVerdictAuthorized !== false ||
    contract.sourcePersistenceVerdictAuthorized !== false ||
    contract.sourceEffectiveSupportVerdictAuthorized !== false ||
    contract.relativeForceVerdictAuthorized !== false ||
    contract.crossRelationPrecedenceAuthorized !== false ||
    contract.classificationAuthorized !== false ||
    contract.numericScoringAuthorized !== false ||
    contract.recommendedNextGate !==
      'UNTOUCHED_SUPPORT_EFFECT_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_BINDING_EVIDENCE'
  ) {
    return false;
  }

  const he = contract.adapters.find((adapter) => adapter.sourceTerm === '合');
  const chong = contract.adapters.find((adapter) => adapter.sourceTerm === '冲');
  const sheng = contract.adapters.find((adapter) => adapter.sourceTerm === '生');
  return (
    he?.inputDomain === 'STRUCTURAL_RELATION_IDENTITY' &&
    he.acceptedStructuralRelationKinds.join('|') === HE_KINDS.join('|') &&
    he.outputSemantic === 'SOURCE_HE_COMPONENT_SCOPED_RELATION_IDENTITY_BINDING' &&
    he.exactInputIdentityRequired &&
    he.missingInputBehavior === 'FAIL_CLOSED_NO_BINDING' &&
    he.ambiguousInputBehavior === 'FAIL_CLOSED_NO_BINDING' &&
    he.outputEvidenceOnly &&
    he.mayEmitBindingOutcome === false &&
    he.mayEmitTransformationOutcome === false &&
    chong?.inputDomain === 'STRUCTURAL_RELATION_IDENTITY' &&
    chong.acceptedStructuralRelationKinds.join('|') === 'branch_clash' &&
    chong.outputSemantic === 'SOURCE_CHONG_BRANCH_CLASH_IDENTITY_BINDING' &&
    chong.mayEmitDamageOutcome === false &&
    chong.mayEmitRescueOutcome === false &&
    sheng?.inputDomain === 'SUPPORT_CHANNEL_DIRECTIONAL_EVIDENCE' &&
    sheng.acceptedSupportChannelKinds.join('|') === 'RESOURCE_GENERATION_SUPPORT_CHANNEL' &&
    sheng.outputSemantic === 'SOURCE_SHENG_RESOURCE_GENERATION_DIRECTION_BINDING' &&
    sheng.mayEmitActivationOutcome === false &&
    sheng.mayEmitPersistenceOutcome === false &&
    sheng.mayEmitEffectiveSupportOutcome === false
  );
}

function exactI52Accepted(evidence: ChallengeCombinationSupportChannelEvidenceReport): boolean {
  return (
    evidence.status === 'RESOLVED_SUPPORT_CHANNEL_EVIDENCE' &&
    evidence.supportChannelEvidenceAvailable &&
    evidence.supportChannelAggregationAuthorized === false &&
    evidence.supportChannelPrecedenceResolved === false &&
    evidence.supportChannelActivationVerdictAuthorized === false &&
    evidence.supportChannelPersistenceVerdictAuthorized === false &&
    evidence.netSupportInterferenceEffectAuthorized === false &&
    evidence.postInteractionBureauStateEmissionAuthorized === false &&
    evidence.targetPostRelationRootState === 'not_determined' &&
    evidence.effectiveMechanismForceVerdict === 'not_determined' &&
    evidence.relationSpecificUsefulnessHarmfulness === 'not_determined' &&
    evidence.classificationAuthorized === false &&
    evidence.numericScoringAuthorized === false &&
    evidence.items.every(
      (item) =>
        item.supportTopologyState === 'RESOLVED_DIRECTIONAL_CHANNEL_TOPOLOGY' &&
        item.supportChannelAggregation === 'not_performed' &&
        item.supportChannelPrecedence === 'not_determined' &&
        item.netSupportInterferenceEffect === 'not_resolved' &&
        item.bindingState === 'not_determined' &&
        item.postInteractionBureauState === 'not_determined' &&
        item.targetPostRelationRootState === 'not_determined' &&
        item.effectiveMechanismForceVerdict === 'not_determined' &&
        item.relationSpecificUsefulnessHarmfulness === 'not_determined' &&
        item.numericScore === 'not_assigned' &&
        item.participantSupport.every(
          (participant) =>
            participant.supportActivationVerdict === 'not_determined' &&
            participant.supportPersistenceVerdict === 'not_determined' &&
            participant.netSupportInterferenceEffect === 'not_resolved' &&
            participant.numericScore === 'not_assigned' &&
            participant.supportChannels.every(
              (channel) =>
                channel.activationState === 'not_determined' &&
                channel.persistenceState === 'not_determined' &&
                channel.numericWeight === 'not_assigned',
            ),
        ),
    )
  );
}

function componentScope(participants: readonly StructuralRelationParticipant[]): 'stem' | 'branch' {
  return participants.every((participant) => participant.component === 'stem') ? 'stem' : 'branch';
}

function relationContextAligned(
  relations: ReturnType<typeof deriveStructuralRelationCandidates>,
  item: ChallengeCombinationSupportChannelEvidenceReport['items'][number],
): boolean {
  const relation = relations.find(
    (candidate) => candidate.relationId === item.relationId && candidate.kind === item.relationKind,
  );
  if (relation === undefined) return false;
  const subjectComponent = item.subjectKind === 'VISIBLE_TARGET_STEM' ? 'stem' : 'branch';
  return relation.participants.some(
    (participant) =>
      participant.pillar === item.subjectPosition &&
      participant.component === subjectComponent &&
      String(participant.value) === item.subjectValue,
  );
}

function sourcePositionExists(
  pillars: StructuralPillarInput,
  pillar: PillarSlot,
  component: 'stem' | 'branch',
): boolean {
  const source = pillars[pillar];
  if (source === undefined) return false;
  return component === 'stem' ? source.stem !== undefined : source.branch !== undefined;
}

function structuralBinding(
  sourceTerm: '合' | '冲',
  relation: ReturnType<typeof deriveStructuralRelationCandidates>[number],
): I103StructuralVocabularyBindingEvidence {
  return {
    sourceTerm,
    bindingKind:
      sourceTerm === '合'
        ? 'SOURCE_HE_COMPONENT_SCOPED_RELATION_IDENTITY_BINDING'
        : 'SOURCE_CHONG_BRANCH_CLASH_IDENTITY_BINDING',
    relationId: relation.relationId,
    relationKind: relation.kind,
    participants: relation.participants,
    componentScope: componentScope(relation.participants),
    structuralMatchOnly: true,
    transformationEstablished: false,
    bindingOutcome: 'not_determined',
    damageOutcome: 'not_determined',
    rescueOutcome: 'not_resolved',
    persistenceOutcome: 'not_determined',
    relativeForceVerdict: 'not_determined',
    precedence: 'not_determined',
    numericWeight: 'not_assigned',
  };
}

function termSummary(
  sourceTerm: I103ReadyVocabularyTerm,
  bindingCount: number,
): I103VocabularyTermEvidenceSummary {
  return {
    sourceTerm,
    state:
      bindingCount > 0
        ? 'CURRENT_CHART_BINDINGS_MATERIALIZED'
        : 'NO_CURRENT_CHART_BINDING_OBSERVED',
    bindingCount,
    noBindingMeansEffectAbsent: false,
    noBindingMeansVocabularyAbsentFromChart: false,
  };
}

export function buildI103ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingEvidence(
  pillars: StructuralPillarInput,
  contract: ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyAdapterContractReport,
  supportEvidence: ChallengeCombinationSupportChannelEvidenceReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingEvidenceReport {
  if (!pillarsResolved(pillars)) {
    return unresolved('PILLARS_UNRESOLVED', contract, supportEvidence, [
      'All four resolved pillars are required before I103 can independently recompute structural relation identities.',
    ]);
  }
  if (!exactI102Accepted(contract)) {
    return unresolved('I102_UNRESOLVED_OR_INVALID', contract, supportEvidence, [
      'The exact fail-closed I102 adapter contract is required before source-vocabulary evidence may be materialized.',
    ]);
  }
  if (!exactI52Accepted(supportEvidence)) {
    return unresolved('I52_UNRESOLVED_OR_INVALID', contract, supportEvidence, [
      'Resolved fail-closed I52 directional support evidence is required for the 生 adapter substrate.',
    ]);
  }

  const relations = deriveStructuralRelationCandidates(pillars);
  if (supportEvidence.items.some((item) => !relationContextAligned(relations, item))) {
    return unresolved('I52_RELATION_CONTEXT_MISMATCH', contract, supportEvidence, [
      'An I52 relation id/kind or subject identity does not match independent structural recomputation from the resolved pillars.',
    ]);
  }

  const structuralBindings = relations
    .flatMap((relation) => {
      if ((HE_KINDS as readonly StructuralRelationKind[]).includes(relation.kind)) {
        return [structuralBinding('合', relation)];
      }
      if (relation.kind === 'branch_clash') {
        return [structuralBinding('冲', relation)];
      }
      return [];
    })
    .sort((left, right) =>
      `${left.sourceTerm}|${left.relationId}`.localeCompare(`${right.sourceTerm}|${right.relationId}`),
    );

  const resourceGenerationBindings: I103ResourceGenerationVocabularyBindingEvidence[] = [];
  const directionalKeys = new Set<string>();
  for (const item of supportEvidence.items) {
    for (const participant of item.participantSupport) {
      for (const channel of participant.supportChannels) {
        if (channel.channelKind !== 'RESOURCE_GENERATION_SUPPORT_CHANNEL') continue;
        if (!sourcePositionExists(pillars, channel.sourcePillar, channel.sourceComponent)) {
          return unresolved('I52_SUPPORT_SOURCE_POSITION_MISMATCH', contract, supportEvidence, [
            'An I52 resource-generation support source position does not exist in the resolved pillar material.',
          ]);
        }
        const key = [
          item.relationId,
          item.relationKind,
          participant.participantPillar,
          participant.participantComponent,
          participant.participantValue,
          channel.sourcePillar,
          channel.sourceComponent,
          channel.channelKind,
        ].join('|');
        if (directionalKeys.has(key)) {
          return unresolved('AMBIGUOUS_DUPLICATE_DIRECTIONAL_SUBSTRATE', contract, supportEvidence, [
            'Duplicate exact 生 directional substrate is ambiguous under the I102 contract and is not collapsed by inference.',
          ]);
        }
        directionalKeys.add(key);
        resourceGenerationBindings.push({
          sourceTerm: '生',
          bindingKind: 'SOURCE_SHENG_RESOURCE_GENERATION_DIRECTION_BINDING',
          contextRelationId: item.relationId,
          contextRelationKind: item.relationKind,
          targetPillar: participant.participantPillar,
          targetComponent: participant.participantComponent,
          targetValue: participant.participantValue,
          sourcePillar: channel.sourcePillar,
          sourceComponent: channel.sourceComponent,
          supportChannelKind: 'RESOURCE_GENERATION_SUPPORT_CHANNEL',
          activationState: 'not_determined',
          persistenceState: 'not_determined',
          effectiveSupportEffect: 'not_resolved',
          relativeForceVerdict: 'not_determined',
          precedence: 'not_determined',
          numericWeight: 'not_assigned',
        });
      }
    }
  }
  resourceGenerationBindings.sort((left, right) =>
    [
      left.contextRelationId,
      left.targetPillar,
      left.targetComponent,
      left.targetValue,
      left.sourcePillar,
      left.sourceComponent,
    ]
      .join('|')
      .localeCompare(
        [
          right.contextRelationId,
          right.targetPillar,
          right.targetComponent,
          right.targetValue,
          right.sourcePillar,
          right.sourceComponent,
        ].join('|'),
      ),
  );

  const heCount = structuralBindings.filter((item) => item.sourceTerm === '合').length;
  const chongCount = structuralBindings.filter((item) => item.sourceTerm === '冲').length;
  const shengCount = resourceGenerationBindings.length;
  const termSummaries = [
    termSummary('合', heCount),
    termSummary('冲', chongCount),
    termSummary('生', shengCount),
  ] as const;

  return finalized({
    ...commonMaterial(contract, supportEvidence),
    status: 'RESOLVED_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_BINDING_EVIDENCE',
    structuralBindings,
    resourceGenerationBindings,
    termSummaries,
    structuralBindingCount: structuralBindings.length,
    resourceGenerationBindingCount: resourceGenerationBindings.length,
    evidenceBindingAvailable: structuralBindings.length + resourceGenerationBindings.length > 0,
    sourceHeEvidenceMaterialized: heCount > 0,
    sourceChongEvidenceMaterialized: chongCount > 0,
    sourceShengEvidenceMaterialized: shengCount > 0,
    relationsIndependentlyRecomputedFromPillars: true,
    i52RelationContextsIndependentlyVerified: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_BINDING_PROMOTION_READINESS_REVIEW',
    notes: [
      'I103 materializes only source-vocabulary evidence bindings for exact existing 合, 冲, and 生 substrate. It does not implement 克, 刑, or 卫.',
      'Structural relation identities are independently recomputed from the resolved pillars rather than copied from upstream metadata.',
      'I52 relation contexts and resource-generation source positions are validated against the same resolved pillars before 生 evidence is emitted.',
      'A current-chart zero-binding state is only absence of a matching adapter substrate in this evidence pass; it is not proof of no effect or universal vocabulary absence.',
      'Duplicate exact directional substrate fails closed instead of being silently deduplicated or interpreted as magnitude.',
      'Binding evidence does not resolve activation, persistence, effective support, damage, rescue, relative force, settlement, precedence, methodology materialization, scoring, or classification.',
    ],
  });
}
