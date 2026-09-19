import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildGeneralNatalConclusionT8AlternateWitnessSurfaceSurvey } from './general-natal-conclusion-t8-alternate-witness-surface-survey.js';
import { buildGeneralNatalConclusionT8YuanhaiAcquisitionTargets } from './general-natal-conclusion-t8-yuanhai-acquisition-targets.js';

export const GENERAL_NATAL_CONCLUSION_T8_YUANHAI_LINE_SEQUENCE_COLLATION_VERSION =
  'myeonghwa-general-natal-conclusion-t8-yuanhai-line-sequence-collation-v1' as const;

const SHARED_OPENING_ANCHORS = Object.freeze([
  '先天何處',
  '後天何處',
  '要知來處',
  '便知去處',
  '四柱排定',
  '三才次分',
  '年干為本',
  '配合元辰',
  '神煞相伴',
  '輕重較量',
  '先觀月令',
  '論格推詳',
  '以日為主',
  '專論財官',
  '分其貴賤',
  '妙法多端',
] as const);

const KNOWN_SHARED_VARIANT_ANCHORS = Object.freeze([
  '印綬根深',
  '先財後印',
  '先印後財',
] as const);

export function buildGeneralNatalConclusionT8YuanhaiLineSequenceCollation() {
  const alternate = buildGeneralNatalConclusionT8AlternateWitnessSurfaceSurvey();
  const acquisition = buildGeneralNatalConclusionT8YuanhaiAcquisitionTargets();

  const nlc1634 = alternate.candidateSurfaces.find(
    (candidate) => candidate.candidateId === 'CANDIDATE-NLC-1634-YUSHI-SHANCHENGTANG',
  );
  const tianyi = acquisition.acquisitionTargets.find(
    (target) => target.targetId === 'ACQ-YUANHAI-TIANYIGE-330000-1705-0005007-DIGITAL',
  );

  if (
    nlc1634?.candidateId !== 'CANDIDATE-NLC-1634-YUSHI-SHANCHENGTANG' ||
    !('directInspection' in nlc1634) ||
    nlc1634.directInspection.state !== 'DIRECTLY_INSPECTED'
  ) {
    throw new Error('NLC 1634 direct-inspection evidence is required for R004.');
  }
  if (
    tianyi?.targetId !== 'ACQ-YUANHAI-TIANYIGE-330000-1705-0005007-DIGITAL' ||
    !('directInspection' in tianyi) ||
    tianyi.directInspectionState !== 'DIRECTLY_INSPECTED'
  ) {
    throw new Error('Tianyi direct-inspection evidence is required for R004.');
  }

  const material = {
    evidenceVersion: GENERAL_NATAL_CONCLUSION_T8_YUANHAI_LINE_SEQUENCE_COLLATION_VERSION,
    issue: '#918' as const,
    auditBaseSha: '5afe39a109c12afe2642301b7427c8ce8b6a2e45' as const,
    status: 'BOUNDED_TIANYI_NLC1634_FOUR_YAN_DUBU_SEQUENCE_CORRESPONDENCE_ESTABLISHED' as const,
    sources: Object.freeze({
      tianyi: Object.freeze({
        targetId: tianyi.targetId,
        holdingInstitution: tianyi.holdingInstitution,
        sectionTitleDigitalScanPage: tianyi.directInspection.sectionTitleDigitalScanPage,
        inspectedDigitalScanPageRange: tianyi.directInspection.inspectedDigitalScanPageRange,
        exactFrozenWitnessCountEstablished:
          tianyi.directInspection.exactFrozenWitnessCountEstablished,
      }),
      nlc1634: Object.freeze({
        candidateId: nlc1634.candidateId,
        holdingInstitution: nlc1634.holdingInstitution,
        sectionTitleDigitalScanPage: nlc1634.directInspection.sectionTitlePage,
        boundedDigitalPages: nlc1634.directInspection.boundedDigitalPages,
        exactFrozenWitnessCountEstablished: 0 as const,
      }),
    }),
    collation: Object.freeze({
      sharedOpeningAnchors: SHARED_OPENING_ANCHORS,
      sharedOpeningAnchorCount: SHARED_OPENING_ANCHORS.length,
      knownSharedVariantAnchors: KNOWN_SHARED_VARIANT_ANCHORS,
      knownSharedVariantAnchorCount: KNOWN_SHARED_VARIANT_ANCHORS.length,
      openingSequenceOrderMatches: true as const,
      bothBoundedSurfacesEstablishFrozenExactWitnessCount: 0 as const,
      tianyiSameStringOutsideFrozenContext: Object.freeze({
        exactString: tianyi.directInspection.sameStringOutsideFrozenContext.exactString,
        digitalScanPage: tianyi.directInspection.sameStringOutsideFrozenContext.digitalScanPage,
        acceptedAsFrozenWitness: false as const,
      }),
      nlc1634SameStringOutsideFrozenContext: Object.freeze({
        exactString: '財旺生官' as const,
        acceptedAsFrozenWitness: false as const,
      }),
      correspondenceBoundary:
        'OPENING_16_ANCHORS_PLUS_RECORDED_SHARED_VARIANT_ANCHORS_ONLY' as const,
    }),
    verdict: Object.freeze({
      boundedSequenceCorrespondenceEstablished: true as const,
      fullEditionIdentityEstablished: false as const,
      frozenWitnessMutationAuthorized: false as const,
      orthographicNormalizationAuthorized: false as const,
      productionAuthorityPromotionAuthorized: false as const,
    }),
  };

  return Object.freeze({
    evidenceId: deterministicContentHash(material),
    ...material,
  });
}
