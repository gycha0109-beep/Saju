import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildGeneralNatalConclusionT8AlternateWitnessSurfaceSurvey } from './general-natal-conclusion-t8-alternate-witness-surface-survey.js';

export const GENERAL_NATAL_CONCLUSION_T8_YUANHAI_ACQUISITION_TARGETS_VERSION =
  'myeonghwa-general-natal-conclusion-t8-yuanhai-acquisition-targets-v1' as const;

const UNRESOLVED_WITNESS_IDS = Object.freeze([
  'W-YUANHAI-WEALTH-OFFICER',
  'W-YUANHAI-OFFICER-RESOURCE',
  'W-YUANHAI-PEER-WEALTH',
  'W-YUANHAI-WEALTH-RESOURCE',
] as const);

const ACQUISITION_TARGETS = Object.freeze([
  Object.freeze({
    targetId: 'ACQ-YUANHAI-YULGOK-YG015-01-470',
    priority: 'P1' as const,
    targetClass: 'CONFIRMED_PHYSICAL_HOLDING' as const,
    holdingInstitution: 'Gangwon Yulgok Korean Studies Archive',
    catalogIdentifier: 'YG015-01-470',
    title: '新刊合倂官板音義評註淵海子平 卷1~5',
    attributedAuthor: '徐大升',
    editionOrImprint: '石印本',
    materialExtent: '1 book',
    dimensions: '14.7 × 9.8 cm',
    relevantCoverage: '卷1~5; target 四言獨步 expected within relevant later volume surface',
    catalogUrl: 'https://db.yulgok.or.kr/data/media/EB000008_svc.pdf',
    publicPageImageAvailability: 'NOT_ESTABLISHED' as const,
    directInspectionState: 'NOT_ACQUIRED' as const,
    frozenWitnessContentClaimed: false as const,
    acquisitionAction:
      'OBTAIN_PAGE_IMAGES_OR_DIGITAL_REPRODUCTION_FOR_RELEVANT_VOLUME_AND_INSPECT_FOUR_YAN_DUBU',
  }),
  Object.freeze({
    targetId: 'ACQ-YUANHAI-TOKYO-IASA-BB19249231-4',
    priority: 'P1' as const,
    targetClass: 'CONFIRMED_PHYSICAL_HOLDING' as const,
    holdingInstitution: 'University of Tokyo Institute for Advanced Studies on Asia Library',
    catalogIdentifier: 'CiNii NCID BB19249231 / fascicle [4] call 6402838715',
    title: '増補淵海子平音義評註',
    attributedAuthor: '(宋)徐升編 ; (明)楊淙増校',
    editionOrImprint: '上海錦章圖書局, [19--], 石印本',
    materialExtent: '6 fascicles total; target fascicle [4]',
    dimensions: '16 cm',
    relevantCoverage: 'fascicle [4], expected to carry 卷之4-5 material',
    catalogUrl: 'https://ci.nii.ac.jp/ncid/BB19249231',
    publicPageImageAvailability: 'NOT_ESTABLISHED' as const,
    directInspectionState: 'NOT_ACQUIRED' as const,
    frozenWitnessContentClaimed: false as const,
    acquisitionAction:
      'REQUEST_OR_OBTAIN_REPRODUCTION_OF_FASCICLE_4_AND_INSPECT_FOUR_YAN_DUBU',
  }),
  Object.freeze({
    targetId: 'ACQ-YUANHAI-BUKKYO-BA88839860-V4-5',
    priority: 'P1' as const,
    targetClass: 'CONFIRMED_PHYSICAL_HOLDING' as const,
    holdingInstitution: 'Bukkyo University Library',
    catalogIdentifier: 'CiNii NCID BA88839860 / 卷之4-5 call 000241369',
    title: '新刊合併官板音義評註淵海子平 5卷',
    attributedAuthor: '(宋)徐升編 ; (明)楊淙増校',
    editionOrImprint: '千頃堂書局, [19--], 石印本',
    materialExtent: '6 fascicles total; relevant volume 卷之4-5',
    dimensions: '15 cm',
    relevantCoverage: '卷之4-5',
    catalogUrl: 'https://ci.nii.ac.jp/ncid/BA88839860',
    publicPageImageAvailability: 'NOT_ESTABLISHED' as const,
    directInspectionState: 'NOT_ACQUIRED' as const,
    frozenWitnessContentClaimed: false as const,
    acquisitionAction:
      'REQUEST_OR_OBTAIN_REPRODUCTION_OF_CALL_000241369_AND_INSPECT_FOUR_YAN_DUBU',
  }),
  Object.freeze({
    targetId: 'ACQ-YUANHAI-FUWEN-GUANGXU-BIBLIOGRAPHIC-LEAD',
    priority: 'P2' as const,
    targetClass: 'BIBLIOGRAPHIC_LEAD_HOLDING_UNCONFIRMED' as const,
    holdingInstitution: null,
    catalogIdentifier: '中國古籍總目-derived bibliographic lead',
    title: '淵海子平（新刊合併官板音義評註淵海子平）五卷',
    attributedAuthor: '徐升[撰]',
    editionOrImprint: '清光緒間上海富文書局石印本',
    materialExtent: '五卷',
    dimensions: null,
    relevantCoverage: 'edition family only; exact retrievable copy not yet established',
    catalogUrl: 'https://www.guoxuedashi.com/shumu/gj-1762324oo.html',
    publicPageImageAvailability: 'NOT_ESTABLISHED' as const,
    directInspectionState: 'NOT_ACQUIRED' as const,
    frozenWitnessContentClaimed: false as const,
    acquisitionAction:
      'LOCATE_A_CONFIRMED_HOLDING_OR_DIGITAL_REPRODUCTION_BEFORE_ANY_TEXTUAL_INFERENCE',
  }),
] as const);

function isPublicPageImageVerified(status: string): boolean {
  return status === 'VERIFIED_AVAILABLE';
}

function isDirectlyInspected(state: string): boolean {
  return state === 'DIRECTLY_INSPECTED';
}

export function buildGeneralNatalConclusionT8YuanhaiAcquisitionTargets() {
  const upstream = buildGeneralNatalConclusionT8AlternateWitnessSurfaceSurvey();

  if (upstream.counts.productionAdmissibleFourOfFourCandidateCount !== 0) {
    throw new Error(
      'Acquisition-target registry is only valid while no production-admissible 4/4 alternate surface exists.',
    );
  }

  const confirmedPhysicalTargets = ACQUISITION_TARGETS.filter(
    (target) => target.targetClass === 'CONFIRMED_PHYSICAL_HOLDING',
  );
  const bibliographicLeads = ACQUISITION_TARGETS.filter(
    (target) => target.targetClass === 'BIBLIOGRAPHIC_LEAD_HOLDING_UNCONFIRMED',
  );
  const publicDigitalTargets = ACQUISITION_TARGETS.filter((target) =>
    isPublicPageImageVerified(target.publicPageImageAvailability),
  );
  const directlyInspectedTargets = ACQUISITION_TARGETS.filter((target) =>
    isDirectlyInspected(target.directInspectionState),
  );

  const material = {
    evidenceVersion: GENERAL_NATAL_CONCLUSION_T8_YUANHAI_ACQUISITION_TARGETS_VERSION,
    issue: '#879' as const,
    auditBaseSha: '4dd9ca8e987455ef939c7339024ba88ace24ced8' as const,
    status: 'ACQUISITION_TARGETS_REGISTERED_NO_NEW_WITNESS_EVIDENCE' as const,
    upstreamAlternateSurfaceSurveyId: upstream.evidenceId,
    unresolvedWitnessIds: UNRESOLVED_WITNESS_IDS,
    acquisitionTargets: ACQUISITION_TARGETS,
    counts: {
      unresolvedWitnessCount: UNRESOLVED_WITNESS_IDS.length,
      acquisitionTargetCount: ACQUISITION_TARGETS.length,
      confirmedPhysicalHoldingCount: confirmedPhysicalTargets.length,
      bibliographicLeadCount: bibliographicLeads.length,
      publicDigitalPageImageVerifiedCount: publicDigitalTargets.length,
      directlyInspectedAcquisitionTargetCount: directlyInspectedTargets.length,
      newDirectWitnessEvidenceCount: 0 as const,
      productionAdmissionEvidenceCount: 0 as const,
    },
    verdict: {
      catalogRecordIsPhraseLevelEvidence: false as const,
      anyTargetFrozenWitnessContentEstablished: false as const,
      anyTargetReadyForWitnessPromotion: false as const,
      witnessReregistrationAuthorized: false as const,
      exactWitnessHashReproductionAuthorityEstablished: false as const,
      sourceIntegrityQualificationEstablished: false as const,
      productionEligibleProvenanceEstablished: false as const,
      provenanceQualityPromotionAuthorized: false as const,
      productionAdmissionAuthority: false as const,
      productionState: 'HOLD' as const,
    },
    acquisitionProtocol: Object.freeze([
      'OBTAIN_EXACT_ITEM_OR_REPRODUCTION_WITH_CATALOG_IDENTITY',
      'VERIFY_RELEVANT_VOLUME_AND_FOUR_YAN_DUBU_SECTION',
      'PIN_EXACT_IMAGE_PAGE_OR_FOLIO_LOCATOR_WITHOUT_INVENTION',
      'READ_BOUNDED_GLYPHS_DIRECTLY_FROM_ACQUIRED_SURFACE',
      'REQUIRE_EXACT_ROB_WEALTH_GLYPH_FOR_PEER_WEALTH_WITNESS',
      'DO_NOT_NORMALIZE_ORTHOGRAPHIC_VARIANTS_INTO_FROZEN_HASH_IDENTITY',
      'REPRODUCE_FROZEN_DIGEST_AS_A_SEPARATE_STEP_AFTER_DIRECT_TEXT_VERIFICATION',
      'USE_SEPARATE_REVIEWED_REREGISTRATION_IF_SOURCE_DEFINITION_CHANGES',
    ] as const),
  };

  return Object.freeze({
    evidenceId: deterministicContentHash(material),
    ...material,
  });
}
