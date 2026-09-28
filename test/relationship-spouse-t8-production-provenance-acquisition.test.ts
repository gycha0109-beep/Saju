import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  buildRelationshipSpouseT8ProductionProvenanceAcquisitionPolicy,
  evaluateRelationshipSpouseT8ProductionProvenanceCandidate,
} from '../src/research/relationship-spouse-t8-production-provenance-acquisition-policy.js';
import {
  RELATIONSHIP_SPOUSE_T8_PRODUCTION_PROVENANCE_CANDIDATES,
  buildRelationshipSpouseT8ProductionProvenanceCandidateSurvey,
} from '../src/research/relationship-spouse-t8-production-provenance-candidate-survey.js';

const policy =
  buildRelationshipSpouseT8ProductionProvenanceAcquisitionPolicy();
const survey =
  buildRelationshipSpouseT8ProductionProvenanceCandidateSurvey();

describe('Relationship / Spouse T8 production provenance acquisition', () => {
  test('freezes the exact bounded selector and two admissible provenance routes', () => {
    expect(policy.governedSelector).toEqual({
      input: 'derivedFacts.dayMaster.yinYang',
      yang: {
        output: 'INDIRECT_WEALTH',
        nativeLabel: '편재',
        hanjaLabel: '偏財',
      },
      yin: {
        output: 'INDIRECT_POWER',
        nativeLabel: '편관',
        hanjaLabel: '偏官',
      },
      semanticRole: 'role-neutral spouse-star marker',
    });

    expect(policy.admissibleRoutes.primarySupported).toEqual({
      minimumQualifyingPrimarySources: 1,
      completeSelectorMustExistInsideEachQualifyingSource: true,
      crossSourceStitchingAllowed: false,
    });
    expect(policy.admissibleRoutes.multiSourceSupported).toEqual({
      existingBaselineSource: 'Whisper 2026',
      minimumIndependentAdditionalDirectBasisSources: 1,
      eachAdditionalSourceMustPublishCompleteSelector: true,
      crossSourceStitchingAllowed: false,
    });
  });

  test('preserves Whisper only as the existing exact direct-basis baseline', () => {
    const baseline = survey.evaluatedCandidates.find(
      (entry) =>
        entry.candidate.candidateId ===
        'WHISPER_2026_EXISTING_ROLE_NEUTRAL_POLARITY_SELECTOR_BASELINE',
    );

    expect(baseline).toBeDefined();
    expect(baseline?.evaluation.disposition).toBe(
      'EXISTING_DIRECT_BASIS_BASELINE',
    );
    expect(baseline?.evaluation.exactCompleteSelector).toBe(true);
    expect(baseline?.evaluation.boundedInputContract).toBe(true);
    expect(baseline?.evaluation.qualifiesIndependentDirectBasis).toBe(false);
    expect(survey.observations.baselineExactSelectorPreserved).toBe(true);
  });

  test('records three classical witnesses as negative rather than inflating them into primary support', () => {
    expect(survey.observations.negativePrimaryWitnessIds).toEqual([
      'YUANHAI_ZIPING_CLASSICAL_SIX_RELATIONS_AUDIT',
      'SANMING_TONGHUI_CLASSICAL_RELATIONS_AUDIT',
      'DITIAN_SUI_CHANWEI_CLASSICAL_COUPLE_AUDIT',
    ]);
    expect(survey.observations.classicalDivergencePreserved).toBe(true);

    for (const id of survey.observations.negativePrimaryWitnessIds) {
      const entry = survey.evaluatedCandidates.find(
        (candidate) => candidate.candidate.candidateId === id,
      );
      expect(entry?.evaluation.disposition).toBe('NEGATIVE_PRIMARY_WITNESS');
      expect(entry?.evaluation.qualifiesPrimaryDirectBasis).toBe(false);
      expect(entry?.evaluation.exactCompleteSelector).toBe(false);
      expect(entry?.evaluation.sexDependentDivergenceObserved).toBe(true);
    }
  });

  test('keeps independent modern sex-dependent sources out of the role-neutral selector route', () => {
    const ids = [
      'ASKLINGXI_SIX_RELATIONS_MODERN_AUDIT',
      'SAJUAPP_SPOUSE_ELEMENT_MODERN_AUDIT',
    ];

    for (const id of ids) {
      const entry = survey.evaluatedCandidates.find(
        (candidate) => candidate.candidate.candidateId === id,
      );
      expect(entry?.evaluation.disposition).toBe(
        'SEX_DEPENDENT_DIVERGENT_WITNESS',
      );
      expect(entry?.evaluation.independent).toBe(true);
      expect(entry?.evaluation.qualifiesIndependentDirectBasis).toBe(false);
    }

    expect(survey.observations.independentModernDivergencePreserved).toBe(true);
  });

  test('does not convert Ten-God polarity structure without spouse semantics into direct selector support', () => {
    const entry = survey.evaluatedCandidates.find(
      (candidate) =>
        candidate.candidate.candidateId ===
        'TAO_AND_FORM_INDIRECT_WEALTH_STRUCTURE_AUDIT',
    );

    expect(entry?.evaluation.disposition).toBe('NON_QUALIFYING');
    expect(entry?.evaluation.exactCompleteSelector).toBe(false);
    expect(entry?.evaluation.qualifiesIndependentDirectBasis).toBe(false);
  });

  test('requires each qualifying source to contain the complete selector rather than stitching fragments', () => {
    const partialYang = {
      candidateId: 'SYNTHETIC_PARTIAL_YANG',
      sourceIdentity: {
        title: 'Synthetic partial Yang candidate',
        sourceClass: 'test_fixture',
        publicLocator: 'fixture://partial-yang',
      },
      proposedTier: 'cross_reference' as const,
      acquisition: {
        directBodyAcquired: true,
        reproducible: true,
        completeBodyReviewed: true,
      },
      selectorEvidence: {
        yangToIndirectWealthExplicit: true,
        yinToIndirectPowerExplicit: false,
        spouseSemanticExplicit: true,
        completeSelectorInSingleSource: false,
        dayMasterPolarityOnlySelector: true,
        nativeSexRequired: false,
        partnerSexRequired: false,
        relationshipRoleInputRequired: false,
        secondChartRequired: false,
      },
      independence: {
        independentFromWhisper: true,
        copiedOrDerivativeFromWhisper: false,
      },
      provenanceNotes: 'test fixture',
    };

    const result =
      evaluateRelationshipSpouseT8ProductionProvenanceCandidate(partialYang);

    expect(result.exactCompleteSelector).toBe(false);
    expect(result.qualifiesIndependentDirectBasis).toBe(false);
    expect(result.disposition).toBe('PARTIAL_SELECTOR_ONLY');
    expect(survey.observations.noCrossSourceSyntheticRule).toBe(true);
  });

  test('shows the survey does not establish either Production provenance route', () => {
    expect(survey.observations.primaryDirectBasisEstablished).toBe(false);
    expect(
      survey.observations.independentSecondDirectBasisEstablished,
    ).toBe(false);
    expect(
      survey.observations.multiSourceSelectorSupportEstablished,
    ).toBe(false);

    expect(survey.observations.qualifyingPrimaryCandidateIds).toEqual([]);
    expect(survey.observations.qualifyingIndependentCandidateIds).toEqual([]);

    expect(survey.provenanceRoute).toBe('NOT_ESTABLISHED');
    expect(survey.productionProvenanceReady).toBe(false);
    expect(survey.blockers).toEqual([
      'PRIMARY_DIRECT_BASIS_NOT_ESTABLISHED',
      'INDEPENDENT_SECOND_DIRECT_BASIS_NOT_ESTABLISHED',
      'MULTI_SOURCE_SELECTOR_SUPPORT_NOT_ESTABLISHED',
    ]);
  });

  test('keeps Production, reviewer authority, and lifecycle mutation closed', () => {
    expect(survey.upstreamProductionEligibility).toBe('BLOCKED');
    expect(survey.authorityBoundary).toEqual({
      sourceManifestMutationAuthorized: false,
      provenanceQualityPromotionAuthorized: false,
      reviewerStatusPromotionAuthorized: false,
      humanDomainReviewEstablished: false,
      reviewerTrustGrantEstablished: false,
      lifecycleMutationAuthorized: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      production: 'HOLD',
    });
    expect(survey.nextDisposition).toBe(
      'CONTINUE_TARGETED_INDEPENDENT_DIRECT_BASIS_DISCOVERY_OR_KEEP_PRODUCTION_HOLD',
    );
  });

  test('content-addresses policy and survey material deterministically', () => {
    const { policyId, ...policyMaterial } = policy;
    const { surveyId, ...surveyMaterial } = survey;

    expect(policyId).toBe(deterministicContentHash(policyMaterial));
    expect(surveyId).toBe(deterministicContentHash(surveyMaterial));
  });

  test('survey candidate set remains explicit and bounded', () => {
    expect(RELATIONSHIP_SPOUSE_T8_PRODUCTION_PROVENANCE_CANDIDATES).toHaveLength(
      7,
    );
  });
});
