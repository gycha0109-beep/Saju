import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildGeneralNatalConclusionT8PassageWitnessEvidence } from './general-natal-conclusion-t8-passage-witness-evidence.js';

export const GENERAL_NATAL_CONCLUSION_T8_ALTERNATE_WITNESS_SURFACE_SURVEY_VERSION =
  'myeonghwa-general-natal-conclusion-t8-alternate-witness-surface-survey-v4' as const;

const TARGET_WITNESS_IDS = Object.freeze([
  'W-YUANHAI-WEALTH-OFFICER',
  'W-YUANHAI-OFFICER-RESOURCE',
  'W-YUANHAI-PEER-WEALTH',
  'W-YUANHAI-WEALTH-RESOURCE',
] as const);

type TargetWitnessId = (typeof TARGET_WITNESS_IDS)[number];

const FROZEN_EXACT_STRINGS = Object.freeze({
  'W-YUANHAI-WEALTH-OFFICER': '財旺生官',
  'W-YUANHAI-OFFICER-RESOURCE': '煞化為印',
  'W-YUANHAI-PEER-WEALTH': '比劫羊刃，財格大忌',
  'W-YUANHAI-WEALTH-RESOURCE': '印綬見財',
} satisfies Readonly<Record<TargetWitnessId, string>>);

const CANDIDATE_SURFACES = Object.freeze([
  Object.freeze({
    candidateId: 'CANDIDATE-WIKISOURCE-FROZEN-TRANSCRIPTION',
    authorityClass: 'SOURCE_UNKNOWN_FROZEN_TRANSCRIPTION',
    title: '淵海子平',
    edition: 'Wikisource transcription; source edition not established',
    surfaceUrl:
      'https://zh.wikisource.org/zh-hant/%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3',
    registeredScanIdentityEstablished: false,
    auditableHoldingInstitutionEstablished: false,
    context: '四言獨步',
    rows: Object.freeze({
      'W-YUANHAI-WEALTH-OFFICER': Object.freeze({
        status: 'CONTEXT_BOUND_EXACT_STRING_PRESENT_SOURCE_UNKNOWN',
        observedText: '財旺生官',
      }),
      'W-YUANHAI-OFFICER-RESOURCE': Object.freeze({
        status: 'CONTEXT_BOUND_EXACT_STRING_PRESENT_SOURCE_UNKNOWN',
        observedText: '煞化為印',
      }),
      'W-YUANHAI-PEER-WEALTH': Object.freeze({
        status: 'CONTEXT_BOUND_EXACT_STRING_PRESENT_SOURCE_UNKNOWN',
        observedText: '比劫羊刃，財格大忌',
      }),
      'W-YUANHAI-WEALTH-RESOURCE': Object.freeze({
        status: 'CONTEXT_BOUND_EXACT_STRING_PRESENT_SOURCE_UNKNOWN',
        observedText: '印綬見財',
      }),
    }),
    qualificationOutcome: 'TEXT_IDENTITY_ONLY_NOT_SCAN_QUALIFIED',
  }),
  Object.freeze({
    candidateId: 'CANDIDATE-NTL-1926-QINSHENAN-V2',
    authorityClass: 'REGISTERED_SCAN_DIRECTLY_INSPECTED',
    title: '淵海子平子平真詮 v.2',
    edition: '秦慎安校勘 / 文明 / 1926',
    holdingInstitution: 'National Taiwan Library',
    digitization: 'NTL-9900014380',
    pageCount: 164,
    scanUrl:
      'https://commons.wikimedia.org/wiki/File:NTL-9900014380_%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3%E5%AD%90%E5%B9%B3%E7%9C%9F%E8%A9%AE_v.2.pdf',
    registeredScanIdentityEstablished: true,
    auditableHoldingInstitutionEstablished: true,
    context: 'registered 1926 scan / directly inspected 四言獨步 bounded surface',
    directInspection: Object.freeze({
      state: 'DIRECTLY_INSPECTED' as const,
      boundedDigitalPages: Object.freeze([29, 30, 31, 32, 33, 34] as const),
      sectionTitlePage: 29 as const,
      sectionTitle: '四言獨步' as const,
      contentPages: Object.freeze([29, 30, 31, 32, 33] as const),
      transitionPage: 34 as const,
      transitionSectionTitle: '身弱論' as const,
      frozenExactWitnessesEstablished: Object.freeze({
        'W-YUANHAI-WEALTH-OFFICER': false,
        'W-YUANHAI-OFFICER-RESOURCE': false,
        'W-YUANHAI-PEER-WEALTH': false,
        'W-YUANHAI-WEALTH-RESOURCE': false,
      }),
      result: 'BOUNDED_DIRECT_TEXTUAL_DIVERGENCE_NO_FROZEN_EXACT_WITNESS' as const,
    }),
    rows: Object.freeze({
      'W-YUANHAI-WEALTH-OFFICER': Object.freeze({
        status: 'DIRECTLY_INSPECTED_NOT_ESTABLISHED_IN_FROZEN_CONTEXT',
      }),
      'W-YUANHAI-OFFICER-RESOURCE': Object.freeze({
        status: 'DIRECTLY_INSPECTED_NOT_ESTABLISHED_IN_FROZEN_CONTEXT',
      }),
      'W-YUANHAI-PEER-WEALTH': Object.freeze({
        status: 'DIRECTLY_INSPECTED_NOT_ESTABLISHED_IN_FROZEN_CONTEXT',
      }),
      'W-YUANHAI-WEALTH-RESOURCE': Object.freeze({
        status: 'DIRECTLY_INSPECTED_NOT_ESTABLISHED_IN_FROZEN_CONTEXT',
      }),
    }),
    qualificationOutcome: 'REGISTERED_SCAN_DIRECTLY_INSPECTED_TEXTUAL_DIVERGENCE',
  }),
  Object.freeze({
    candidateId: 'CANDIDATE-NLC-1634-YUSHI-SHANCHENGTANG',
    authorityClass: 'REGISTERED_SCAN_DIRECTLY_INSPECTED_WITH_SCAN_LINKED_TRANSCRIPTION',
    title: '新刊合併官板音義評注淵海子平',
    edition: '余氏善成堂 / 明崇禎7年 [1634]',
    holdingInstitution: 'National Library of China',
    digitization: 'NLC892-411999032112 / five-fascicle set',
    relevantDigitization: 'NLC892-411999032112-149659 / 第4冊 / 卷之四',
    relevantPageCount: 29,
    scanUrl:
      'https://commons.wikimedia.org/wiki/File:NLC892-411999032112-149659_%E6%96%B0%E5%88%8A%E5%90%88%E4%BD%B5%E5%AE%98%E6%9D%BF%E9%9F%B3%E7%BE%A9%E8%A9%95%E6%B3%A8%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3_%E7%AC%AC4%E5%86%8A.pdf',
    scanLinkedTranscriptionUrl:
      'https://www.shidianguji.com/zh/book/NGJ892411999032112149610/chapter/1lqbsmkg60o4b',
    registeredScanIdentityEstablished: true,
    auditableHoldingInstitutionEstablished: true,
    context: '卷四 / 四言獨步 and adjacent sections',
    directInspection: Object.freeze({
      state: 'DIRECTLY_INSPECTED' as const,
      boundedDigitalPages: Object.freeze([16, 17, 18, 19] as const),
      sectionTitlePage: 16 as const,
      sectionTitle: '四言獨步' as const,
      directlyLegibleOpeningAnchors: Object.freeze([
        '先天何處', '後天何處', '要知來處', '便知去處',
        '四柱排定', '三才次分', '年干為本', '配合元辰',
        '神煞相伴', '輕重較量', '先觀月令', '論格推詳',
        '以日為主', '專論財官', '分其貴賤', '妙法多端',
      ] as const),
      transitionPage: 19 as const,
      transitionSectionTitle: '棄命從殺論' as const,
      frozenExactWitnessesEstablished: Object.freeze({
        'W-YUANHAI-WEALTH-OFFICER': false,
        'W-YUANHAI-OFFICER-RESOURCE': false,
        'W-YUANHAI-PEER-WEALTH': false,
        'W-YUANHAI-WEALTH-RESOURCE': false,
      }),
      result: 'BOUNDED_DIRECT_TEXTUAL_DIVERGENCE_NO_FROZEN_EXACT_WITNESS' as const,
    }),
    rows: Object.freeze({
      'W-YUANHAI-WEALTH-OFFICER': Object.freeze({
        status: 'EXACT_STRING_PRESENT_OUTSIDE_FROZEN_CONTEXT',
        observedText: '財旺生官',
        observedContext: '四言獨步 preceding material',
      }),
      'W-YUANHAI-OFFICER-RESOURCE': Object.freeze({
        status: 'ORTHOGRAPHIC_TEXTUAL_VARIANT_OUTSIDE_FROZEN_CONTEXT',
        observedText: '殺化爲印',
        frozenText: '煞化為印',
        observedContext: '四言獨步 preceding material',
      }),
      'W-YUANHAI-PEER-WEALTH': Object.freeze({
        status: 'NOT_ESTABLISHED_IN_FROZEN_CONTEXT',
        observedText:
          'scan-linked transcription carries a divergent 四言獨步 sequence and does not establish the frozen rob-wealth string',
      }),
      'W-YUANHAI-WEALTH-RESOURCE': Object.freeze({
        status: 'EXACT_STRING_PRESENT_OUTSIDE_FROZEN_CONTEXT',
        observedText: '印綬見財',
        observedContext: 'same NLC set / 卷三 / 論格局生死引用',
      }),
    }),
    frozenContextSequenceObserved: Object.freeze([
      '印殺相輕',
      '印綬根深',
      '先財後印',
      '先印後財',
    ]),
    qualificationOutcome: 'REGISTERED_SCAN_DIRECTLY_INSPECTED_CONTEXT_MISMATCH',
  }),
  Object.freeze({
    candidateId: 'CANDIDATE-SECONDARY-FOUR-YAN-DUBU-TRANSCRIPTIONS',
    authorityClass: 'SECONDARY_TRANSCRIPTION_NO_REGISTERED_SCAN_IDENTITY',
    title: 'secondary 四言獨步 transcription family',
    exampleUrl: 'https://nangwol.com/post/2694',
    registeredScanIdentityEstablished: false,
    auditableHoldingInstitutionEstablished: false,
    context: '四言獨步',
    rows: Object.freeze({
      'W-YUANHAI-WEALTH-OFFICER': Object.freeze({
        status: 'CONTEXT_BOUND_EXACT_STRING_PRESENT_SECONDARY_ONLY',
        observedText: '財旺生官',
      }),
      'W-YUANHAI-OFFICER-RESOURCE': Object.freeze({
        status: 'CONTEXT_BOUND_EXACT_STRING_PRESENT_SECONDARY_ONLY',
        observedText: '煞化為印',
      }),
      'W-YUANHAI-PEER-WEALTH': Object.freeze({
        status: 'CONTEXT_BOUND_EXACT_STRING_PRESENT_SECONDARY_ONLY',
        observedText: '比劫羊刃，財格大忌',
      }),
      'W-YUANHAI-WEALTH-RESOURCE': Object.freeze({
        status: 'CONTEXT_BOUND_EXACT_STRING_PRESENT_SECONDARY_ONLY',
        observedText: '印綬見財',
      }),
    }),
    qualificationOutcome: 'TEXTUAL_VARIANT_EXISTS_BUT_SCAN_IDENTITY_UNESTABLISHED',
  }),
] as const);

function isContextBoundExactStatus(status: string): boolean {
  return (
    status === 'CONTEXT_BOUND_EXACT_STRING_PRESENT_SOURCE_UNKNOWN' ||
    status === 'CONTEXT_BOUND_EXACT_STRING_PRESENT_SECONDARY_ONLY'
  );
}

function isProductionAdmissibleStatus(status: string): boolean {
  return status === 'CONTEXT_BOUND_EXACT_STRING_DIRECTLY_VERIFIED';
}

export function buildGeneralNatalConclusionT8AlternateWitnessSurfaceSurvey() {
  const upstream = buildGeneralNatalConclusionT8PassageWitnessEvidence();
  const frozenRows = Object.freeze(
    TARGET_WITNESS_IDS.map((witnessId) => {
      const upstreamWitness = upstream.witnesses.find((row) => row.witnessId === witnessId);
      if (upstreamWitness === undefined) {
        throw new Error(`Missing frozen witness: ${witnessId}`);
      }
      return Object.freeze({
        witnessId,
        frozenExactString: FROZEN_EXACT_STRINGS[witnessId],
        frozenPassageSha256: upstreamWitness.passageSha256,
        frozenSection: upstreamWitness.section,
        frozenPermanentRevisionUrl: upstreamWitness.permanentRevisionUrl,
      });
    }),
  );

  const registeredScanCandidates = CANDIDATE_SURFACES.filter(
    (candidate) => candidate.registeredScanIdentityEstablished,
  );
  const directlyInspectedRegisteredScanCandidates = CANDIDATE_SURFACES.filter(
    (candidate) =>
      candidate.registeredScanIdentityEstablished &&
      'directInspection' in candidate &&
      candidate.directInspection.state === 'DIRECTLY_INSPECTED',
  );
  const contextBoundFourOfFourCandidates = CANDIDATE_SURFACES.filter((candidate) =>
    TARGET_WITNESS_IDS.every((witnessId) =>
      isContextBoundExactStatus(candidate.rows[witnessId].status),
    ),
  );
  const productionAdmissibleCandidates = CANDIDATE_SURFACES.filter(
    (candidate) =>
      candidate.registeredScanIdentityEstablished &&
      candidate.auditableHoldingInstitutionEstablished &&
      TARGET_WITNESS_IDS.every((witnessId) =>
        isProductionAdmissibleStatus(candidate.rows[witnessId].status),
      ),
  );

  const material = {
    evidenceVersion: GENERAL_NATAL_CONCLUSION_T8_ALTERNATE_WITNESS_SURFACE_SURVEY_VERSION,
    issue: '#900' as const,
    auditBaseSha: '56a4a97aeb8c48ba2e0236a6f679fc8ce4ac97f4' as const,
    status: 'NTL_1926_AND_NLC_1634_DIRECTLY_INSPECTED_TEXTUAL_DIVERGENCE_NO_PRODUCTION_ADMISSIBLE_FOUR_OF_FOUR_CANDIDATE' as const,
    upstreamPassageEvidenceId: upstream.evidenceId,
    frozenRows,
    candidateSurfaces: CANDIDATE_SURFACES,
    counts: {
      targetWitnessCount: TARGET_WITNESS_IDS.length,
      candidateSurfaceCount: CANDIDATE_SURFACES.length,
      registeredScanCandidateCount: registeredScanCandidates.length,
      directlyInspectedRegisteredScanCandidateCount: directlyInspectedRegisteredScanCandidates.length,
      contextBoundFourOfFourTextCandidateCount: contextBoundFourOfFourCandidates.length,
      productionAdmissibleFourOfFourCandidateCount: productionAdmissibleCandidates.length,
    },
    verdict: {
      frozenWitnessMutationAuthorized: false as const,
      alternateRegisteredScanFourOfFourEstablished: false as const,
      exactWitnessHashReproductionAuthorityEstablished: false as const,
      sourceIntegrityQualificationEstablished: false as const,
      productionEligibleProvenanceEstablished: false as const,
      provenanceQualityPromotionAuthorized: false as const,
      productionAdmissionAuthority: false as const,
      productionState: 'HOLD' as const,
    },
    requiredNextEvidence: Object.freeze([
      'LOCATE_REGISTERED_OR_EQUIVALENTLY_AUDITABLE_SCAN_WITH_CONTEXT_BOUND_FROZEN_EXACT_STRINGS',
      'ALLOW_PER_WITNESS_ADVANCE_ONLY_AFTER_DIRECT_IMAGE_OR_REVIEWED_REGISTERED_TRANSCRIPTION_SUPPORT',
      'REQUIRE_EXACT_ROB_WEALTH_GLYPH_FOR_PEER_WEALTH_WITNESS',
      'DO_NOT_NORMALIZE_ORTHOGRAPHIC_VARIANTS_INTO_FROZEN_HASH_IDENTITY',
      'KEEP_SAME_STRING_DIFFERENT_SECTION_SEPARATE_FROM_FROZEN_CONTEXT_IDENTITY',
      'REPRODUCE_FROZEN_DIGEST_ONLY_AFTER_SCAN_VERIFIED_TRANSCRIPTION_IS_PINNED',
      'USE_SEPARATE_REVIEWED_WITNESS_REREGISTRATION_PROCESS_IF_SOURCE_DEFINITION_CHANGES',
    ] as const),
  };

  return Object.freeze({
    evidenceId: deterministicContentHash(material),
    ...material,
  });
}
