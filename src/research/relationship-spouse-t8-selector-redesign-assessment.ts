import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CANDIDATE,
} from './relationship-spouse-t8-jung-sua-direct-body-boundary-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CANDIDATE,
} from './relationship-spouse-t8-lee-youngeun-direct-body-boundary-evidence.js';
import {
  buildRelationshipSpouseT8ProductionProvenanceClosure,
} from './relationship-spouse-t8-production-provenance-closure.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_PACK,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION,
} from './relationship-spouse-t8-source-adjudicated-staging-runtime.js';

export const RELATIONSHIP_SPOUSE_T8_SELECTOR_REDESIGN_ASSESSMENT_VERSION =
  'myeonghwa-relationship-spouse-t8-selector-redesign-assessment-v1' as const;

export type RelationshipSpouseT8SelectorRedesignPathId =
  | 'TRADITIONAL_NATIVE_SEX_DEPENDENT_SPOUSE_STAR_FAMILY'
  | 'ROLE_NEUTRAL_DAY_BRANCH_SPOUSE_PALACE_POSITION'
  | 'MODERN_ROLE_BASED_CONTEXTUAL_SPOUSE_REMAP';

export type RelationshipSpouseT8SelectorRedesignDisposition =
  | 'OPTIONAL_TRADITIONAL_MODE_ONLY'
  | 'BRIDGE_REENTRY_RESEARCH_CANDIDATE'
  | 'CONTEXTUAL_INTERACTIVE_RESEARCH_ONLY';

export interface RelationshipSpouseT8SelectorRedesignPath {
  readonly pathId: RelationshipSpouseT8SelectorRedesignPathId;
  readonly semanticTarget: string;
  readonly sourceBasis: readonly {
    readonly sourceId: string;
    readonly title: string;
    readonly sourceClass: string;
    readonly locator: string;
    readonly supportRole: string;
  }[];
  readonly evidence: {
    readonly directSourceSupportEstablished: boolean;
    readonly exactTargetSupportEstablished: boolean;
    readonly sourceDivergencePreserved: boolean;
  };
  readonly inputContract: {
    readonly pureNatal: boolean;
    readonly canonicalFactsAvailable: boolean;
    readonly requiredCanonicalPaths: readonly string[];
    readonly requiresNativeSex: boolean;
    readonly requiresPartnerSex: boolean;
    readonly requiresRelationshipRole: boolean;
    readonly requiresHouseholdEconomicRole: boolean;
    readonly requiresSubjectIntent: boolean;
    readonly requiresYongsinHeesinAuthority: boolean;
    readonly requiresSecondChart: boolean;
  };
  readonly productContract: {
    readonly compatibleWithRoleNeutralDefault: boolean;
    readonly canFailClosedWithoutInference: boolean;
    readonly allowedDefaultOutputScope: string;
    readonly forbiddenOutputScope: readonly string[];
  };
  readonly provenanceOutlook: {
    readonly productionProvenanceEstablishedNow: boolean;
    readonly independentMultiSourceAcquisitionPlausible: boolean;
    readonly primaryFamilyLevelSupportExists: boolean;
    readonly exactSubtypeSupportExists: boolean;
  };
  readonly disposition: RelationshipSpouseT8SelectorRedesignDisposition;
  readonly nextAction: string;
}

export const RELATIONSHIP_SPOUSE_T8_SELECTOR_REDESIGN_PATHS = Object.freeze([
  Object.freeze({
    pathId: 'TRADITIONAL_NATIVE_SEX_DEPENDENT_SPOUSE_STAR_FAMILY',
    semanticTarget:
      'Traditional spouse-star family mapping: explicitly supplied male -> Wealth family; explicitly supplied female -> Officer/Power family.',
    sourceBasis: Object.freeze([
      Object.freeze({
        sourceId: 'SANMING_TONGHUI_VOL5_WIFE_WEALTH_PRIMARY',
        title: '三命通會 卷五',
        sourceClass: 'classical_primary_text_public_transcription',
        locator:
          'https://zh.wikisource.org/zh-hant/%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83/%E5%8D%B7%E4%BA%94',
        supportRole:
          'Primary family-level wife/wealth terminology: 我克者 ... 妻財.',
      }),
      Object.freeze({
        sourceId: 'SANMING_TONGHUI_VOL7_FEMALE_HUSBAND_OFFICER_PRIMARY',
        title: '三命通會 卷七',
        sourceClass: 'classical_primary_text_public_transcription',
        locator:
          'https://zh.wikisource.org/zh-hant/%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83/%E5%8D%B7%E4%B8%83',
        supportRole:
          'Primary female-chart husband mapping: 女命以克我者為夫 with 官/煞 treatment.',
      }),
    ]),
    evidence: Object.freeze({
      directSourceSupportEstablished: true,
      exactTargetSupportEstablished: true,
      sourceDivergencePreserved: true,
    }),
    inputContract: Object.freeze({
      pureNatal: true,
      canonicalFactsAvailable: true,
      requiredCanonicalPaths: Object.freeze([
        'input.sexForTraditionalCalculation',
        'derivedFacts.tenGods',
      ] as const),
      requiresNativeSex: true,
      requiresPartnerSex: false,
      requiresRelationshipRole: false,
      requiresHouseholdEconomicRole: false,
      requiresSubjectIntent: false,
      requiresYongsinHeesinAuthority: false,
      requiresSecondChart: false,
    }),
    productContract: Object.freeze({
      compatibleWithRoleNeutralDefault: false,
      canFailClosedWithoutInference: true,
      allowedDefaultOutputScope:
        'None in the role-neutral default. May be exposed only as an explicitly selected traditional sex-dependent interpretation mode when sexForTraditionalCalculation is male or female.',
      forbiddenOutputScope: Object.freeze([
        'NO_NATIVE_SEX_INFERENCE_FROM_NAME_BODY_FACE_OR_RELATIONSHIP_CONTEXT',
        'NO_PARTNER_SEX_OR_ORIENTATION_INFERENCE',
        'NO_SUBTYPE_COLLAPSE_TO_ONLY_DIRECT_OR_ONLY_INDIRECT_STAR_WITHOUT_SOURCE',
        'NO_MARRIAGE_EXISTENCE_TIMING_QUALITY_OR_OUTCOME_CLAIMS',
      ] as const),
    }),
    provenanceOutlook: Object.freeze({
      productionProvenanceEstablishedNow: false,
      independentMultiSourceAcquisitionPlausible: true,
      primaryFamilyLevelSupportExists: true,
      exactSubtypeSupportExists: false,
    }),
    disposition: 'OPTIONAL_TRADITIONAL_MODE_ONLY',
    nextAction:
      'Do not replace the default spouse capability with this path. If product later requests a traditional mode, open a separate capability/version with explicit sexForTraditionalCalculation input and fail closed for unspecified.',
  } as const satisfies RelationshipSpouseT8SelectorRedesignPath),

  Object.freeze({
    pathId: 'ROLE_NEUTRAL_DAY_BRANCH_SPOUSE_PALACE_POSITION',
    semanticTarget:
      'Narrow positional primitive only: the resolved natal Day Branch is the traditional spouse-palace position. No spouse identity, personality, marriage event, compatibility, or outcome is inferred.',
    sourceBasis: Object.freeze([
      Object.freeze({
        sourceId: RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CANDIDATE.candidateId,
        title: RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CANDIDATE.title,
        sourceClass: 'graduate_thesis_direct_institutional_pdf',
        locator:
          RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CANDIDATE.institutionalOriginalRecord,
        supportRole:
          'Direct scholarly support that both male and female charts use the Day Branch as spouse palace; broader gender-conditioned evaluation is deliberately excluded.',
      }),
      Object.freeze({
        sourceId: 'LEI_DAY_BRANCH_SPOUSE_PALACE_EDUCATIONAL_CORROBORATION',
        title: '명리심리상담사 교안 — 궁(宮)에 의한 심리 구분',
        sourceClass: 'public_educational_material',
        locator:
          'https://www.lei.or.kr/upfiledata/board/%EB%AA%85%EB%A6%AC%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4%EC%82%AC_%EC%A0%84%EC%A0%95%ED%9B%88_%EA%B5%90%EC%95%88%EB%AA%A8%EC%9D%8C.pdf',
        supportRole:
          'Independent public educational corroboration explicitly assigning 일지(日支) to 배우자궁.',
      }),
      Object.freeze({
        sourceId: 'OPENFATE_DAY_BRANCH_SPOUSE_PALACE_CROSS_REFERENCE',
        title: '夫妻宫 — 日支',
        sourceClass: 'modern_public_reference',
        locator:
          'https://wiki.openfate.ai/zh-hans/bazi/relationships-compatibility/spouse-palace-in-bazi',
        supportRole:
          'Independent modern cross-reference that fixes spouse palace to Day Branch and explicitly separates it from spouse-star rules and outcome guarantees.',
      }),
    ]),
    evidence: Object.freeze({
      directSourceSupportEstablished: true,
      exactTargetSupportEstablished: true,
      sourceDivergencePreserved: true,
    }),
    inputContract: Object.freeze({
      pureNatal: true,
      canonicalFactsAvailable: true,
      requiredCanonicalPaths: Object.freeze([
        'pillars.day.branch',
      ] as const),
      requiresNativeSex: false,
      requiresPartnerSex: false,
      requiresRelationshipRole: false,
      requiresHouseholdEconomicRole: false,
      requiresSubjectIntent: false,
      requiresYongsinHeesinAuthority: false,
      requiresSecondChart: false,
    }),
    productContract: Object.freeze({
      compatibleWithRoleNeutralDefault: true,
      canFailClosedWithoutInference: true,
      allowedDefaultOutputScope:
        'Expose only a source-grounded spouse-palace positional observation anchored to the resolved Day Branch and its raw governed facts.',
      forbiddenOutputScope: Object.freeze([
        'NO_SPOUSE_STAR_SELECTOR',
        'NO_PARTNER_IDENTITY_PERSONALITY_SEX_OR_ORIENTATION_INFERENCE',
        'NO_MARRIAGE_EXISTENCE_GUARANTEE_OR_TIMING',
        'NO_RELATIONSHIP_QUALITY_OR_OUTCOME_PREDICTION',
        'NO_FAVORABLE_UNFAVORABLE_SPOUSE_PALACE_JUDGMENT_WITHOUT_SEPARATE_AUTHORITY',
        'NO_YONGSIN_JISIN_OR_GUNGSEONG_SEMANTICS_IMPORT',
        'NO_SECOND_CHART_COMPATIBILITY',
      ] as const),
    }),
    provenanceOutlook: Object.freeze({
      productionProvenanceEstablishedNow: false,
      independentMultiSourceAcquisitionPlausible: true,
      primaryFamilyLevelSupportExists: false,
      exactSubtypeSupportExists: false,
    }),
    disposition: 'BRIDGE_REENTRY_RESEARCH_CANDIDATE',
    nextAction:
      'SA-5B: acquire and adjudicate exact production-grade provenance for the narrow Day-Branch spouse-palace positional proposition only, then define a new versioned claim contract if evidence qualifies.',
  } as const satisfies RelationshipSpouseT8SelectorRedesignPath),

  Object.freeze({
    pathId: 'MODERN_ROLE_BASED_CONTEXTUAL_SPOUSE_REMAP',
    semanticTarget:
      'Modern spouse representation may vary with lived/designed relationship role, household economic role, subject intent, and Yongsin/Heesin context rather than a fixed natal spouse-star selector.',
    sourceBasis: Object.freeze([
      Object.freeze({
        sourceId:
          RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CANDIDATE.candidateId,
        title:
          RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CANDIDATE.title,
        sourceClass: 'kci_listed_scholarly_article_direct_pdf',
        locator:
          RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CANDIDATE.publicPdfAcquisitionUrl,
        supportRole:
          'Direct scholarly source-authored modern spouse-remapping proposal with explicit male-chart extension and contextual role dependence.',
      }),
    ]),
    evidence: Object.freeze({
      directSourceSupportEstablished: true,
      exactTargetSupportEstablished: true,
      sourceDivergencePreserved: true,
    }),
    inputContract: Object.freeze({
      pureNatal: false,
      canonicalFactsAvailable: false,
      requiredCanonicalPaths: Object.freeze([] as const),
      requiresNativeSex: false,
      requiresPartnerSex: false,
      requiresRelationshipRole: true,
      requiresHouseholdEconomicRole: true,
      requiresSubjectIntent: true,
      requiresYongsinHeesinAuthority: true,
      requiresSecondChart: false,
    }),
    productContract: Object.freeze({
      compatibleWithRoleNeutralDefault: true,
      canFailClosedWithoutInference: true,
      allowedDefaultOutputScope:
        'None in the pure natal engine. Could become a separate contextual/interactive reading capability only after explicit user context and Yongsin/Heesin semantic authority exist.',
      forbiddenOutputScope: Object.freeze([
        'NO_RELATIONSHIP_ROLE_INFERENCE_FROM_NATAL_CHART',
        'NO_HOUSEHOLD_ECONOMIC_ROLE_INFERENCE_FROM_NATAL_CHART',
        'NO_SUBJECT_INTENT_INFERENCE',
        'NO_YONGSIN_HEESIN_IMPORT_WITHOUT_SEPARATE_AUTHORITY',
        'NO_RELABELLING_AS_PURE_NATAL_SELECTOR',
      ] as const),
    }),
    provenanceOutlook: Object.freeze({
      productionProvenanceEstablishedNow: false,
      independentMultiSourceAcquisitionPlausible: false,
      primaryFamilyLevelSupportExists: false,
      exactSubtypeSupportExists: false,
    }),
    disposition: 'CONTEXTUAL_INTERACTIVE_RESEARCH_ONLY',
    nextAction:
      'Keep outside relationship:natal:spouse default semantics. Revisit only under a separate contextual relationship capability with explicit non-chart inputs and governed Yongsin/Heesin semantics.',
  } as const satisfies RelationshipSpouseT8SelectorRedesignPath),
] as const);

function findPath(pathId: RelationshipSpouseT8SelectorRedesignPathId) {
  const found = RELATIONSHIP_SPOUSE_T8_SELECTOR_REDESIGN_PATHS.find(
    (candidate) => candidate.pathId === pathId,
  );
  if (found === undefined) {
    throw new Error(`Missing Spouse T8 selector redesign path: ${pathId}`);
  }
  return found;
}

export function buildRelationshipSpouseT8SelectorRedesignAssessment() {
  const closure = buildRelationshipSpouseT8ProductionProvenanceClosure();
  const currentSelectorClosed =
    closure.searchRoundClosed === true &&
    closure.currentSelectorProductionPath ===
      'CLOSED_WITH_PRODUCTION_HOLD' &&
    closure.currentSelectorVersion ===
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION;

  const traditional = findPath(
    'TRADITIONAL_NATIVE_SEX_DEPENDENT_SPOUSE_STAR_FAMILY',
  );
  const spousePalace = findPath(
    'ROLE_NEUTRAL_DAY_BRANCH_SPOUSE_PALACE_POSITION',
  );
  const contextual = findPath(
    'MODERN_ROLE_BASED_CONTEXTUAL_SPOUSE_REMAP',
  );

  const traditionalModeFeasible =
    traditional.evidence.directSourceSupportEstablished &&
    traditional.inputContract.canonicalFactsAvailable &&
    traditional.inputContract.requiresNativeSex &&
    traditional.productContract.canFailClosedWithoutInference &&
    !traditional.productContract.compatibleWithRoleNeutralDefault;

  const spousePalaceBridgeReentryResearchReady =
    spousePalace.evidence.directSourceSupportEstablished &&
    spousePalace.evidence.exactTargetSupportEstablished &&
    spousePalace.inputContract.pureNatal &&
    spousePalace.inputContract.canonicalFactsAvailable &&
    !spousePalace.inputContract.requiresNativeSex &&
    !spousePalace.inputContract.requiresPartnerSex &&
    !spousePalace.inputContract.requiresRelationshipRole &&
    spousePalace.productContract.compatibleWithRoleNeutralDefault &&
    spousePalace.productContract.canFailClosedWithoutInference;

  const contextualPathRequiresNewCapability =
    contextual.evidence.directSourceSupportEstablished &&
    !contextual.inputContract.pureNatal &&
    contextual.inputContract.requiresRelationshipRole &&
    contextual.inputContract.requiresHouseholdEconomicRole &&
    contextual.inputContract.requiresSubjectIntent &&
    contextual.inputContract.requiresYongsinHeesinAuthority;

  const selectedRedesignTarget =
    currentSelectorClosed && spousePalaceBridgeReentryResearchReady
      ? ('ROLE_NEUTRAL_DAY_BRANCH_SPOUSE_PALACE_POSITION' as const)
      : undefined;

  const material = Object.freeze({
    assessmentVersion:
      RELATIONSHIP_SPOUSE_T8_SELECTOR_REDESIGN_ASSESSMENT_VERSION,
    issue: '#1839' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    upstreamClosureId: closure.closureId,
    upstreamCurrentSelectorVersion: closure.currentSelectorVersion,
    upstreamCurrentSelectorProductionPath:
      closure.currentSelectorProductionPath,
    currentSelectorClosed,
    candidatePaths: RELATIONSHIP_SPOUSE_T8_SELECTOR_REDESIGN_PATHS,
    observations: Object.freeze({
      traditionalModeFeasible,
      spousePalaceBridgeReentryResearchReady,
      contextualPathRequiresNewCapability,
      selectedRedesignTarget,
      selectedTargetProductionProvenanceEstablished: false as const,
      selectedTargetRuntimeMaterialized: false as const,
    }),
    decision: Object.freeze({
      assessmentComplete:
        currentSelectorClosed &&
        traditionalModeFeasible &&
        spousePalaceBridgeReentryResearchReady &&
        contextualPathRequiresNewCapability,
      bridgeReentryCandidateIdentified:
        selectedRedesignTarget !== undefined,
      bridgeReentryAuthorized: false as const,
      productionCandidateAuthorized: false as const,
      nextDisposition:
        selectedRedesignTarget ===
        'ROLE_NEUTRAL_DAY_BRANCH_SPOUSE_PALACE_POSITION'
          ? ('RUN_SA_5B_DAY_BRANCH_SPOUSE_PALACE_PROVENANCE_ACQUISITION' as const)
          : ('KEEP_CURRENT_SELECTOR_STAGING_AND_RETURN_TO_RESEARCH' as const),
    }),
    currentRuntimePreservation: Object.freeze({
      version:
        RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION,
      methodologyStatus:
        RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_METHODOLOGY.status,
      ruleStatuses: Object.freeze(
        RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES.map(
          (rule) => rule.status,
        ),
      ),
      provenanceQualities: Object.freeze(
        RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES.map(
          (rule) => rule.quality.provenanceQuality,
        ),
      ),
      reviewerStatuses: Object.freeze(
        RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES.map(
          (rule) => rule.quality.reviewerStatus,
        ),
      ),
      packStatus:
        RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_PACK.status,
    }),
    authorityBoundary: Object.freeze({
      currentSelectorReopened: false as const,
      sourceManifestMutationAuthorized: false as const,
      newRuleMaterializationAuthorized: false as const,
      provenanceQualityPromotionAuthorized: false as const,
      reviewerStatusPromotionAuthorized: false as const,
      humanDomainReviewEstablished: false as const,
      lifecycleMutationAuthorized: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      production: 'HOLD' as const,
    }),
  });

  return Object.freeze({
    assessmentId: deterministicContentHash(material),
    ...material,
  });
}
