import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildRelationshipSpouseT8ProductionEligibilityAssessment,
} from './relationship-spouse-t8-production-eligibility-assessment.js';
import {
  type RelationshipSpouseT8ProductionProvenanceCandidate,
  buildRelationshipSpouseT8ProductionProvenanceAcquisitionPolicy,
  evaluateRelationshipSpouseT8ProductionProvenanceCandidate,
} from './relationship-spouse-t8-production-provenance-acquisition-policy.js';

export const RELATIONSHIP_SPOUSE_T8_PRODUCTION_PROVENANCE_CANDIDATE_SURVEY_VERSION =
  'myeonghwa-relationship-spouse-t8-production-provenance-candidate-survey-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_PRODUCTION_PROVENANCE_CANDIDATES =
  Object.freeze([
    Object.freeze({
      candidateId:
        'WHISPER_2026_EXISTING_ROLE_NEUTRAL_POLARITY_SELECTOR_BASELINE',
      sourceIdentity: Object.freeze({
        title:
          'BaZi and the Spouse Star: What the Chart Says About Relationships',
        publicationYear: 2026,
        sourceClass: 'current_public_editorial_methodology_article',
        publicLocator:
          'https://blog.whisper.day/divination/bazi/bazi-spouse-star-relationships/',
      }),
      proposedTier: 'cross_reference',
      acquisition: Object.freeze({
        directBodyAcquired: true,
        reproducible: true,
        completeBodyReviewed: true,
      }),
      selectorEvidence: Object.freeze({
        yangToIndirectWealthExplicit: true,
        yinToIndirectPowerExplicit: true,
        spouseSemanticExplicit: true,
        completeSelectorInSingleSource: true,
        dayMasterPolarityOnlySelector: true,
        nativeSexRequired: false,
        partnerSexRequired: false,
        relationshipRoleInputRequired: false,
        secondChartRequired: false,
      }),
      independence: Object.freeze({
        independentFromWhisper: false,
        copiedOrDerivativeFromWhisper: false,
      }),
      provenanceNotes:
        'Existing runtime direct_basis baseline only. It publishes the exact bounded selector but remains conservatively classified as cross_reference and cannot count as its own independent second witness.',
    } as const satisfies RelationshipSpouseT8ProductionProvenanceCandidate),

    Object.freeze({
      candidateId: 'YUANHAI_ZIPING_CLASSICAL_SIX_RELATIONS_AUDIT',
      sourceIdentity: Object.freeze({
        title: '淵海子平',
        sourceClass: 'classical_primary_text_public_transcription',
        publicLocator:
          'https://zh.wikisource.org/zh-hant/%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3',
      }),
      proposedTier: 'primary',
      acquisition: Object.freeze({
        directBodyAcquired: true,
        reproducible: true,
        completeBodyReviewed: false,
      }),
      selectorEvidence: Object.freeze({
        yangToIndirectWealthExplicit: false,
        yinToIndirectPowerExplicit: false,
        spouseSemanticExplicit: true,
        completeSelectorInSingleSource: false,
        dayMasterPolarityOnlySelector: false,
        nativeSexRequired: true,
        partnerSexRequired: false,
        relationshipRoleInputRequired: false,
        secondChartRequired: false,
      }),
      independence: Object.freeze({
        independentFromWhisper: true,
        copiedOrDerivativeFromWhisper: false,
      }),
      provenanceNotes:
        'The inspected public transcription preserves the classical split: wife/concubine through Wealth for male charts and Officer/Seven Killings as husband stars for female charts. It does not publish the governed role-neutral Yang->偏財 / Yin->偏官 selector. The Wikisource page also flags source-verification limitations, so it is retained as an adversarial classical witness, not positive Production provenance.',
    } as const satisfies RelationshipSpouseT8ProductionProvenanceCandidate),

    Object.freeze({
      candidateId: 'SANMING_TONGHUI_CLASSICAL_RELATIONS_AUDIT',
      sourceIdentity: Object.freeze({
        title: '三命通會',
        author: '萬民英',
        sourceClass: 'classical_primary_text_public_transcription',
        publicLocator:
          'https://zh.wikisource.org/zh-hant/%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83/%E5%8D%B7%E4%B8%83',
      }),
      proposedTier: 'primary',
      acquisition: Object.freeze({
        directBodyAcquired: true,
        reproducible: true,
        completeBodyReviewed: false,
      }),
      selectorEvidence: Object.freeze({
        yangToIndirectWealthExplicit: false,
        yinToIndirectPowerExplicit: false,
        spouseSemanticExplicit: true,
        completeSelectorInSingleSource: false,
        dayMasterPolarityOnlySelector: false,
        nativeSexRequired: true,
        partnerSexRequired: false,
        relationshipRoleInputRequired: false,
        secondChartRequired: false,
      }),
      independence: Object.freeze({
        independentFromWhisper: true,
        copiedOrDerivativeFromWhisper: false,
      }),
      provenanceNotes:
        'The inspected 女命 material explicitly uses 克我 / 官煞 as husband semantics. Other inspected material names 我克 as 妻財. This is a sex-dependent classical relation framework, not the governed role-neutral polarity selector.',
    } as const satisfies RelationshipSpouseT8ProductionProvenanceCandidate),

    Object.freeze({
      candidateId: 'DITIAN_SUI_CHANWEI_CLASSICAL_COUPLE_AUDIT',
      sourceIdentity: Object.freeze({
        title: '滴天髓闡微',
        sourceClass: 'classical_commentarial_primary_text_public_transcription',
        publicLocator:
          'https://zh.wikisource.org/zh-hant/%E6%BB%B4%E5%A4%A9%E9%AB%93%E9%97%A1%E5%BE%AE',
      }),
      proposedTier: 'primary',
      acquisition: Object.freeze({
        directBodyAcquired: true,
        reproducible: true,
        completeBodyReviewed: false,
      }),
      selectorEvidence: Object.freeze({
        yangToIndirectWealthExplicit: false,
        yinToIndirectPowerExplicit: false,
        spouseSemanticExplicit: true,
        completeSelectorInSingleSource: false,
        dayMasterPolarityOnlySelector: false,
        nativeSexRequired: true,
        partnerSexRequired: false,
        relationshipRoleInputRequired: true,
        secondChartRequired: false,
      }),
      independence: Object.freeze({
        independentFromWhisper: true,
        copiedOrDerivativeFromWhisper: false,
      }),
      provenanceNotes:
        'The inspected 夫妻 and 女命 sections treat Wealth as wife semantics and use separate husband-star logic for female charts, with contextual 用神/喜忌 substitutions. This is materially divergent from a single role-neutral Day-Master-polarity selector.',
    } as const satisfies RelationshipSpouseT8ProductionProvenanceCandidate),

    Object.freeze({
      candidateId: 'ASKLINGXI_SIX_RELATIONS_MODERN_AUDIT',
      sourceIdentity: Object.freeze({
        title: 'Palace Positions and the Six Relations',
        sourceClass: 'modern_public_reference_article',
        publicLocator:
          'https://asklingxi.com/ko/wiki/bazi/gongwei-liuqin',
      }),
      proposedTier: 'cross_reference',
      acquisition: Object.freeze({
        directBodyAcquired: true,
        reproducible: true,
        completeBodyReviewed: true,
      }),
      selectorEvidence: Object.freeze({
        yangToIndirectWealthExplicit: false,
        yinToIndirectPowerExplicit: false,
        spouseSemanticExplicit: true,
        completeSelectorInSingleSource: false,
        dayMasterPolarityOnlySelector: false,
        nativeSexRequired: true,
        partnerSexRequired: false,
        relationshipRoleInputRequired: false,
        secondChartRequired: false,
      }),
      independence: Object.freeze({
        independentFromWhisper: true,
        copiedOrDerivativeFromWhisper: false,
      }),
      provenanceNotes:
        'The source explicitly separates female spouse Officer/Seven-Killings and male spouse Wealth variants by native sex. It is independent but does not publish the governed role-neutral selector.',
    } as const satisfies RelationshipSpouseT8ProductionProvenanceCandidate),

    Object.freeze({
      candidateId: 'SAJUAPP_SPOUSE_ELEMENT_MODERN_AUDIT',
      sourceIdentity: Object.freeze({
        title:
          'Spouse Element in Saju & BaZi: What Your Chart Reveals About Your Partner',
        sourceClass: 'modern_public_reference_article',
        publicLocator:
          'https://sajuapp.app/saju-spouse-element-personality/',
      }),
      proposedTier: 'cross_reference',
      acquisition: Object.freeze({
        directBodyAcquired: true,
        reproducible: true,
        completeBodyReviewed: true,
      }),
      selectorEvidence: Object.freeze({
        yangToIndirectWealthExplicit: false,
        yinToIndirectPowerExplicit: false,
        spouseSemanticExplicit: true,
        completeSelectorInSingleSource: false,
        dayMasterPolarityOnlySelector: false,
        nativeSexRequired: true,
        partnerSexRequired: false,
        relationshipRoleInputRequired: false,
        secondChartRequired: false,
      }),
      independence: Object.freeze({
        independentFromWhisper: true,
        copiedOrDerivativeFromWhisper: false,
      }),
      provenanceNotes:
        'The source keeps the traditional men=Wealth / women=Officer-Power spouse assignment. Its Direct/Indirect polarity explanation does not remove the native-sex selector branch.',
    } as const satisfies RelationshipSpouseT8ProductionProvenanceCandidate),

    Object.freeze({
      candidateId: 'TAO_AND_FORM_INDIRECT_WEALTH_STRUCTURE_AUDIT',
      sourceIdentity: Object.freeze({
        title: 'What Does Indirect Wealth Mean in BaZi?',
        sourceClass: 'modern_public_ten_god_reference_article',
        publicLocator:
          'https://www.taoandform.com/eastern-wisdom/article/what-does-indirect-wealth-mean-in-bazi/',
      }),
      proposedTier: 'cross_reference',
      acquisition: Object.freeze({
        directBodyAcquired: true,
        reproducible: true,
        completeBodyReviewed: true,
      }),
      selectorEvidence: Object.freeze({
        yangToIndirectWealthExplicit: false,
        yinToIndirectPowerExplicit: false,
        spouseSemanticExplicit: false,
        completeSelectorInSingleSource: false,
        dayMasterPolarityOnlySelector: false,
        nativeSexRequired: false,
        partnerSexRequired: false,
        relationshipRoleInputRequired: false,
        secondChartRequired: false,
      }),
      independence: Object.freeze({
        independentFromWhisper: true,
        copiedOrDerivativeFromWhisper: false,
      }),
      provenanceNotes:
        'Useful independent evidence for Ten-God polarity mechanics only. It does not supply the complete spouse-star proposition and therefore cannot close either Production provenance route.',
    } as const satisfies RelationshipSpouseT8ProductionProvenanceCandidate),
  ] as const);

export function buildRelationshipSpouseT8ProductionProvenanceCandidateSurvey() {
  const policy =
    buildRelationshipSpouseT8ProductionProvenanceAcquisitionPolicy();
  const upstream =
    buildRelationshipSpouseT8ProductionEligibilityAssessment();

  const evaluatedCandidates = Object.freeze(
    RELATIONSHIP_SPOUSE_T8_PRODUCTION_PROVENANCE_CANDIDATES.map((candidate) =>
      Object.freeze({
        candidate,
        evaluation:
          evaluateRelationshipSpouseT8ProductionProvenanceCandidate(candidate),
      }),
    ),
  );

  const baseline = evaluatedCandidates.find(
    (entry) =>
      entry.evaluation.disposition === 'EXISTING_DIRECT_BASIS_BASELINE',
  );
  const qualifyingPrimary = evaluatedCandidates.filter(
    (entry) => entry.evaluation.qualifiesPrimaryDirectBasis,
  );
  const qualifyingIndependent = evaluatedCandidates.filter(
    (entry) => entry.evaluation.qualifiesIndependentDirectBasis,
  );
  const negativePrimaryWitnesses = evaluatedCandidates.filter(
    (entry) => entry.evaluation.disposition === 'NEGATIVE_PRIMARY_WITNESS',
  );
  const sexDependentDivergentWitnesses = evaluatedCandidates.filter(
    (entry) =>
      entry.evaluation.disposition === 'SEX_DEPENDENT_DIVERGENT_WITNESS',
  );

  const baselineExactSelectorPreserved =
    baseline !== undefined &&
    baseline.evaluation.exactCompleteSelector &&
    baseline.evaluation.boundedInputContract;

  const primaryDirectBasisEstablished = qualifyingPrimary.length >= 1;
  const independentSecondDirectBasisEstablished =
    qualifyingIndependent.length >=
    policy.admissibleRoutes.multiSourceSupported
      .minimumIndependentAdditionalDirectBasisSources;

  const multiSourceSelectorSupportEstablished =
    baselineExactSelectorPreserved && independentSecondDirectBasisEstablished;

  const noCrossSourceSyntheticRule =
    evaluatedCandidates.every(
      (entry) =>
        entry.candidate.selectorEvidence.completeSelectorInSingleSource ||
        entry.evaluation.qualifiesPrimaryDirectBasis === false &&
          entry.evaluation.qualifiesIndependentDirectBasis === false,
    );

  const classicalDivergencePreserved =
    negativePrimaryWitnesses.length >= 3 &&
    negativePrimaryWitnesses.every(
      (entry) =>
        entry.evaluation.sexDependentDivergenceObserved === true &&
        entry.evaluation.exactCompleteSelector === false,
    );

  const independentModernDivergencePreserved =
    sexDependentDivergentWitnesses.length >= 2 &&
    sexDependentDivergentWitnesses.every(
      (entry) =>
        entry.candidate.independence.independentFromWhisper === true &&
        entry.evaluation.exactCompleteSelector === false,
    );

  const provenanceRoute:
    | 'PRIMARY_SUPPORTED'
    | 'MULTI_SOURCE_SUPPORTED'
    | 'NOT_ESTABLISHED' = primaryDirectBasisEstablished
      ? 'PRIMARY_SUPPORTED'
      : multiSourceSelectorSupportEstablished
        ? 'MULTI_SOURCE_SUPPORTED'
        : 'NOT_ESTABLISHED';

  const blockers = Object.freeze([
    ...(!primaryDirectBasisEstablished
      ? ['PRIMARY_DIRECT_BASIS_NOT_ESTABLISHED']
      : []),
    ...(!independentSecondDirectBasisEstablished
      ? ['INDEPENDENT_SECOND_DIRECT_BASIS_NOT_ESTABLISHED']
      : []),
    ...(!multiSourceSelectorSupportEstablished
      ? ['MULTI_SOURCE_SELECTOR_SUPPORT_NOT_ESTABLISHED']
      : []),
  ]);

  const material = Object.freeze({
    surveyVersion:
      RELATIONSHIP_SPOUSE_T8_PRODUCTION_PROVENANCE_CANDIDATE_SURVEY_VERSION,
    issue: '#1829' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    policyId: policy.policyId,
    upstreamProductionEligibilityAssessmentId: upstream.assessmentId,
    upstreamProductionEligibility:
      upstream.productionEligibility,
    governedSelector: policy.governedSelector,
    evaluatedCandidates,
    observations: Object.freeze({
      baselineExactSelectorPreserved,
      primaryDirectBasisEstablished,
      independentSecondDirectBasisEstablished,
      multiSourceSelectorSupportEstablished,
      classicalDivergencePreserved,
      independentModernDivergencePreserved,
      noCrossSourceSyntheticRule,
      qualifyingPrimaryCandidateIds: Object.freeze(
        qualifyingPrimary.map((entry) => entry.candidate.candidateId),
      ),
      qualifyingIndependentCandidateIds: Object.freeze(
        qualifyingIndependent.map((entry) => entry.candidate.candidateId),
      ),
      negativePrimaryWitnessIds: Object.freeze(
        negativePrimaryWitnesses.map(
          (entry) => entry.candidate.candidateId,
        ),
      ),
    }),
    provenanceRoute,
    productionProvenanceReady:
      provenanceRoute !== 'NOT_ESTABLISHED',
    blockers,
    authorityBoundary: Object.freeze({
      sourceManifestMutationAuthorized: false as const,
      provenanceQualityPromotionAuthorized: false as const,
      reviewerStatusPromotionAuthorized: false as const,
      humanDomainReviewEstablished: false as const,
      reviewerTrustGrantEstablished: false as const,
      lifecycleMutationAuthorized: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      production: 'HOLD' as const,
    }),
    nextDisposition:
      provenanceRoute === 'NOT_ESTABLISHED'
        ? ('CONTINUE_TARGETED_INDEPENDENT_DIRECT_BASIS_DISCOVERY_OR_KEEP_PRODUCTION_HOLD' as const)
        : ('MATERIALIZE_EXACT_PROVENANCE_CANDIDATE_WITHOUT_REVIEW_AUTHORITY_INFLATION' as const),
  });

  return Object.freeze({
    surveyId: deterministicContentHash(material),
    ...material,
  });
}
