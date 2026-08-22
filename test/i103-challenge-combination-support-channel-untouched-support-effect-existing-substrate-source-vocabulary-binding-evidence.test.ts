import { describe, expect, test } from 'vitest';
import {
  buildI103ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingEvidence,
  type ChallengeCombinationSupportChannelEvidenceReport,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyAdapterContractReport,
  type StructuralPillarInput,
} from '../src/index.js';

function pillars(): StructuralPillarInput {
  return {
    year: { stem: { value: '갑' }, branch: { value: '자' } },
    month: { stem: { value: '기' }, branch: { value: '오' } },
    day: { stem: { value: '병' }, branch: { value: '축' } },
    hour: { stem: { value: '신' }, branch: { value: '미' } },
  } as unknown as StructuralPillarInput;
}

function adapter(
  sourceTerm: '合' | '冲' | '生',
): ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyAdapterContractReport['adapters'][number] {
  if (sourceTerm === '合') {
    return {
      sourceTerm,
      inputDomain: 'STRUCTURAL_RELATION_IDENTITY',
      acceptedStructuralRelationKinds: [
        'stem_five_combination',
        'branch_six_combination',
        'branch_three_combination',
      ],
      acceptedSupportChannelKinds: [],
      outputSemantic: 'SOURCE_HE_COMPONENT_SCOPED_RELATION_IDENTITY_BINDING',
      preserveRelationId: true,
      preserveParticipantOrSourcePosition: true,
      preserveComponentScope: true,
      exactInputIdentityRequired: true,
      missingInputBehavior: 'FAIL_CLOSED_NO_BINDING',
      ambiguousInputBehavior: 'FAIL_CLOSED_NO_BINDING',
      outputEvidenceOnly: true,
      mayEmitBindingOutcome: false,
      mayEmitTransformationOutcome: false,
      mayEmitDamageOutcome: false,
      mayEmitRescueOutcome: false,
      mayEmitActivationOutcome: false,
      mayEmitPersistenceOutcome: false,
      mayEmitEffectiveSupportOutcome: false,
      mayEmitRelativeForceOutcome: false,
      mayEmitPrecedenceOutcome: false,
      mayEmitNumericWeight: false,
      notes: [],
    };
  }
  if (sourceTerm === '冲') {
    return {
      sourceTerm,
      inputDomain: 'STRUCTURAL_RELATION_IDENTITY',
      acceptedStructuralRelationKinds: ['branch_clash'],
      acceptedSupportChannelKinds: [],
      outputSemantic: 'SOURCE_CHONG_BRANCH_CLASH_IDENTITY_BINDING',
      preserveRelationId: true,
      preserveParticipantOrSourcePosition: true,
      preserveComponentScope: true,
      exactInputIdentityRequired: true,
      missingInputBehavior: 'FAIL_CLOSED_NO_BINDING',
      ambiguousInputBehavior: 'FAIL_CLOSED_NO_BINDING',
      outputEvidenceOnly: true,
      mayEmitBindingOutcome: false,
      mayEmitTransformationOutcome: false,
      mayEmitDamageOutcome: false,
      mayEmitRescueOutcome: false,
      mayEmitActivationOutcome: false,
      mayEmitPersistenceOutcome: false,
      mayEmitEffectiveSupportOutcome: false,
      mayEmitRelativeForceOutcome: false,
      mayEmitPrecedenceOutcome: false,
      mayEmitNumericWeight: false,
      notes: [],
    };
  }
  return {
    sourceTerm,
    inputDomain: 'SUPPORT_CHANNEL_DIRECTIONAL_EVIDENCE',
    acceptedStructuralRelationKinds: [],
    acceptedSupportChannelKinds: ['RESOURCE_GENERATION_SUPPORT_CHANNEL'],
    outputSemantic: 'SOURCE_SHENG_RESOURCE_GENERATION_DIRECTION_BINDING',
    preserveRelationId: false,
    preserveParticipantOrSourcePosition: true,
    preserveComponentScope: true,
    exactInputIdentityRequired: true,
    missingInputBehavior: 'FAIL_CLOSED_NO_BINDING',
    ambiguousInputBehavior: 'FAIL_CLOSED_NO_BINDING',
    outputEvidenceOnly: true,
    mayEmitBindingOutcome: false,
    mayEmitTransformationOutcome: false,
    mayEmitDamageOutcome: false,
    mayEmitRescueOutcome: false,
    mayEmitActivationOutcome: false,
    mayEmitPersistenceOutcome: false,
    mayEmitEffectiveSupportOutcome: false,
    mayEmitRelativeForceOutcome: false,
    mayEmitPrecedenceOutcome: false,
    mayEmitNumericWeight: false,
    notes: [],
  };
}

function i102(): ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyAdapterContractReport {
  return {
    contractId: 'i102_i103_fixture',
    contractVersion: 'fixture',
    status: 'RESOLVED_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_ADAPTER_CONTRACT',
    decision: 'HE_CHONG_SHENG_EVIDENCE_BINDING_ADAPTER_CONTRACT_FROZEN_IMPLEMENTATION_SEPARATE',
    upstreamI101ReviewId: 'i101_fixture',
    candidateSourceId: 'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515',
    readyTerms: ['合', '冲', '生'],
    blockedTerms: ['克', '刑', '卫'],
    adapters: [adapter('合'), adapter('冲'), adapter('生')],
    adapterCount: 3,
    allReadyTermsContracted: true,
    blockedTermsExplicitlyExcluded: true,
    sourceHeAcceptedStructuralRelationKinds: [
      'stem_five_combination',
      'branch_six_combination',
      'branch_three_combination',
    ],
    sourceHeGenericRelationKindCreated: false,
    sourceHeComponentScopeMustBePreserved: true,
    sourceChongAcceptedStructuralRelationKinds: ['branch_clash'],
    sourceChongIdentityOnly: true,
    sourceChongDamageOutcomeStillUnresolved: true,
    sourceShengAcceptedSupportChannelKinds: ['RESOURCE_GENERATION_SUPPORT_CHANNEL'],
    sourceShengDirectionOnly: true,
    sourceShengPersistenceStillUnresolved: true,
    sourceKeAdapterIncluded: false,
    sourceXingAdapterIncluded: false,
    sourceWeiAdapterIncluded: false,
    adapterMayConsumeOnlyExistingAuthorizedSubstrate: true,
    adapterMaySynthesizeMissingSubstrate: false,
    adapterMayInferUntrackedVocabularyAbsence: false,
    adapterMayChangeNoTrackedRelationTouchMeaning: false,
    noTrackedRelationTouchSemanticsRemainUnchanged: true,
    adapterSemanticCeiling: 'EVIDENCE_BINDING_ONLY',
    adapterImplementationPerformedByThisGate: false,
    adapterImplementationAuthorizedByThisGate: false,
    calculationCoreMutationAuthorizedByThisGate: false,
    structuralRelationKindMutationAuthorizedByThisGate: false,
    methodologyDefinitionCreatedByThisGate: false,
    methodologyRegisteredByThisGate: false,
    ruleDefinitionCreatedByThisGate: false,
    registrySnapshotMutatedByThisGate: false,
    reviewAttestationCreatedByThisGate: false,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    relativeForceVerdictAuthorized: false,
    clashWinnerVerdictAuthorized: false,
    rescueEffectAuthorized: false,
    clashSettlementAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_BINDING_EVIDENCE',
    notes: [],
  };
}

function i52(options: { duplicateResource?: boolean; noResource?: boolean; mismatch?: boolean } = {}): ChallengeCombinationSupportChannelEvidenceReport {
  const channel = {
    channelKind: 'RESOURCE_GENERATION_SUPPORT_CHANNEL',
    sourcePillar: 'hour',
    sourceComponent: 'stem',
    activationState: 'not_determined',
    persistenceState: 'not_determined',
    numericWeight: 'not_assigned',
  } as const;
  const channels = options.noResource ? [] : options.duplicateResource ? [channel, channel] : [channel];

  return {
    reportId: 'i52_i103_fixture',
    evidenceVersion: 'fixture',
    status: 'RESOLVED_SUPPORT_CHANNEL_EVIDENCE',
    upstreamI39ReportId: 'i39_fixture',
    upstreamI51ReviewId: 'i51_fixture',
    items: [
      {
        mechanism: 'VISIBLE_STEM_CHALLENGE',
        relationId: options.mismatch
          ? 'stem_five_combination:year:stem:갑|day:stem:병'
          : 'stem_five_combination:year:stem:갑|month:stem:기',
        relationKind: 'stem_five_combination',
        subjectKind: 'VISIBLE_TARGET_STEM',
        subjectPosition: 'year',
        subjectValue: '갑',
        subjectSupportPresenceState: channels.length > 0 ? 'SUPPORT_CHANNELS_OBSERVED' : 'NO_TRACKED_SUPPORT_CHANNEL',
        subjectSupportChannels: channels,
        participantSupport: [
          {
            participantPillar: 'year',
            participantComponent: 'stem',
            participantValue: '갑',
            participantElement: '목',
            supportPresenceState: channels.length > 0 ? 'SUPPORT_CHANNELS_OBSERVED' : 'NO_TRACKED_SUPPORT_CHANNEL',
            supportChannels: channels,
            supportActivationVerdict: 'not_determined',
            supportPersistenceVerdict: 'not_determined',
            netSupportInterferenceEffect: 'not_resolved',
            numericScore: 'not_assigned',
          },
        ],
        supportTopologyState: 'RESOLVED_DIRECTIONAL_CHANNEL_TOPOLOGY',
        supportChannelAggregation: 'not_performed',
        supportChannelPrecedence: 'not_determined',
        netSupportInterferenceEffect: 'not_resolved',
        transformationConditionVerdict: 'not_determined',
        bindingState: 'not_determined',
        postInteractionBureauState: 'not_determined',
        targetPostRelationRootState: 'not_determined',
        effectiveMechanismForceVerdict: 'not_determined',
        relationSpecificUsefulnessHarmfulness: 'not_determined',
        numericScore: 'not_assigned',
      },
    ],
    supportChannelEvidenceAvailable: true,
    supportChannelAggregationAuthorized: false,
    supportChannelPrecedenceResolved: false,
    supportChannelActivationVerdictAuthorized: false,
    supportChannelPersistenceVerdictAuthorized: false,
    netSupportInterferenceEffectAuthorized: false,
    postInteractionBureauStateEmissionAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [],
  } as unknown as ChallengeCombinationSupportChannelEvidenceReport;
}

describe('I103 untouched support effect existing substrate source vocabulary binding evidence', () => {
  test('materializes current-chart 合 冲 生 evidence from exact existing substrate', () => {
    const report = buildI103ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingEvidence(
      pillars(),
      i102(),
      i52(),
    );
    expect(report.status).toBe('RESOLVED_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_BINDING_EVIDENCE');
    expect(report.sourceHeEvidenceMaterialized).toBe(true);
    expect(report.sourceChongEvidenceMaterialized).toBe(true);
    expect(report.sourceShengEvidenceMaterialized).toBe(true);
    expect(report.structuralBindingCount).toBeGreaterThan(0);
    expect(report.resourceGenerationBindingCount).toBe(1);
    expect(report.relationsIndependentlyRecomputedFromPillars).toBe(true);
    expect(report.i52RelationContextsIndependentlyVerified).toBe(true);
  });

  test('preserves component-scoped relation identity for 合', () => {
    const report = buildI103ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingEvidence(pillars(), i102(), i52());
    const he = report.structuralBindings.filter((item) => item.sourceTerm === '合');
    expect(he.some((item) => item.relationKind === 'stem_five_combination' && item.componentScope === 'stem')).toBe(true);
    expect(he.some((item) => item.relationKind === 'branch_six_combination' && item.componentScope === 'branch')).toBe(true);
    expect(he.every((item) => item.structuralMatchOnly && item.transformationEstablished === false)).toBe(true);
    expect(he.every((item) => item.bindingOutcome === 'not_determined')).toBe(true);
  });

  test('materializes 冲 only as branch_clash identity with outcomes unresolved', () => {
    const report = buildI103ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingEvidence(pillars(), i102(), i52());
    const chong = report.structuralBindings.filter((item) => item.sourceTerm === '冲');
    expect(chong.length).toBeGreaterThan(0);
    expect(chong.every((item) => item.relationKind === 'branch_clash')).toBe(true);
    expect(chong.every((item) => item.damageOutcome === 'not_determined')).toBe(true);
    expect(chong.every((item) => item.rescueOutcome === 'not_resolved')).toBe(true);
    expect(chong.every((item) => item.relativeForceVerdict === 'not_determined')).toBe(true);
  });

  test('materializes 生 direction with exact target/source positions and no effect verdict', () => {
    const report = buildI103ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingEvidence(pillars(), i102(), i52());
    expect(report.resourceGenerationBindings).toEqual([
      expect.objectContaining({
        sourceTerm: '生',
        targetPillar: 'year',
        targetComponent: 'stem',
        targetValue: '갑',
        sourcePillar: 'hour',
        sourceComponent: 'stem',
        supportChannelKind: 'RESOURCE_GENERATION_SUPPORT_CHANNEL',
        activationState: 'not_determined',
        persistenceState: 'not_determined',
        effectiveSupportEffect: 'not_resolved',
        numericWeight: 'not_assigned',
      }),
    ]);
  });

  test('treats zero current-chart 生 bindings as evidence state only, not effect or vocabulary absence', () => {
    const report = buildI103ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingEvidence(pillars(), i102(), i52({ noResource: true }));
    const sheng = report.termSummaries.find((item) => item.sourceTerm === '生');
    expect(report.status).toBe('RESOLVED_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_BINDING_EVIDENCE');
    expect(report.sourceShengEvidenceMaterialized).toBe(false);
    expect(sheng?.state).toBe('NO_CURRENT_CHART_BINDING_OBSERVED');
    expect(sheng?.noBindingMeansEffectAbsent).toBe(false);
    expect(sheng?.noBindingMeansVocabularyAbsentFromChart).toBe(false);
    expect(report.zeroBindingMayBeTreatedAsPositiveSettlementOutcome).toBe(false);
    expect(report.zeroBindingMayBeTreatedAsVocabularyAbsence).toBe(false);
  });

  test('fails closed when I52 relation context does not match independently recomputed pillars', () => {
    const report = buildI103ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingEvidence(pillars(), i102(), i52({ mismatch: true }));
    expect(report.status).toBe('I52_RELATION_CONTEXT_MISMATCH');
    expect(report.structuralBindings).toEqual([]);
    expect(report.resourceGenerationBindings).toEqual([]);
  });

  test('fails closed on duplicate exact directional substrate instead of deduping or scoring it', () => {
    const report = buildI103ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingEvidence(pillars(), i102(), i52({ duplicateResource: true }));
    expect(report.status).toBe('AMBIGUOUS_DUPLICATE_DIRECTIONAL_SUBSTRATE');
    expect(report.duplicateDirectionalEvidenceCollapsedByInference).toBe(false);
    expect(report.resourceGenerationBindings).toEqual([]);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('is deterministic, excludes 克 刑 卫, and preserves every downstream guard', () => {
    const first = buildI103ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingEvidence(pillars(), i102(), i52());
    const second = buildI103ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingEvidence(pillars(), i102(), i52());
    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first.sourceKeEvidenceMaterialized).toBe(false);
    expect(first.sourceXingEvidenceMaterialized).toBe(false);
    expect(first.sourceWeiEvidenceMaterialized).toBe(false);
    expect(first.evidenceBindingMeansRelationOutcomeResolved).toBe(false);
    expect(first.evidenceBindingMeansPersistenceResolved).toBe(false);
    expect(first.evidenceBindingMeansEffectiveSupportResolved).toBe(false);
    expect(first.evidenceBindingMeansMethodologyMaterialized).toBe(false);
    expect(first.noTrackedRelationTouchSemanticsRemainUnchanged).toBe(true);
    expect(first.calculationCoreMutationPerformed).toBe(false);
    expect(first.structuralRelationKindMutationPerformed).toBe(false);
    expect(first.sourceActivationVerdictAuthorized).toBe(false);
    expect(first.sourcePersistenceVerdictAuthorized).toBe(false);
    expect(first.sourceEffectiveSupportVerdictAuthorized).toBe(false);
    expect(first.relativeForceVerdictAuthorized).toBe(false);
    expect(first.clashWinnerVerdictAuthorized).toBe(false);
    expect(first.rescueEffectAuthorized).toBe(false);
    expect(first.clashSettlementAuthorized).toBe(false);
    expect(first.crossRelationPrecedenceAuthorized).toBe(false);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(first.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_BINDING_PROMOTION_READINESS_REVIEW');
  });
});
