import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_PEER_TAXONOMY_SOURCE,
  GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_RULES,
  GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION,
  createGeneralNatalSourceBoundedRegistry,
} from './general-natal-conclusion-source-bounded-candidate.js';

export const GENERAL_NATAL_PEER_TAXONOMY_SCAN_EVIDENCE_VERSION =
  'myeonghwa-general-natal-peer-taxonomy-scan-backed-evidence-v1' as const;

const PEER_RULE_ID = 'RULE-GENERAL-NATAL-SOURCE-BOUNDED-FAMILY-PEER-PRESENT' as const;
const SAMYEONG_V5_SOURCE_ID =
  'SRC-SAMYEONG-TONGHOE-V5-FOUR-LIBRARIES-TENGOD-RELATIONS' as const;

const SCAN_AUTHORITY = Object.freeze({
  authorityId: 'SCAN-SAMYEONG-SIKU-CADAL06066043',
  title: '三命通會·卷七',
  edition: '欽定四庫全書本',
  holdingInstitution: 'Zhejiang University Library',
  digitization: 'CADAL06066043',
  scanUrl:
    'https://commons.wikimedia.org/wiki/File:CADAL06066043_%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83%C2%B7%E5%8D%B7%E4%B8%83.djvu',
  pageCount: 198,
  libraryMetadataUrl: 'https://ctext.org/library.pl?if=gb&res=6109',
  corroboratingOcrUrl: 'https://ctext.org/wiki.pl?chapter=548506&if=gb',
} as const);

export function buildGeneralNatalPeerTaxonomyScanBackedEvidence() {
  const registry = createGeneralNatalSourceBoundedRegistry();
  const peerRule = GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_RULES.find(
    (rule) => rule.ruleId === PEER_RULE_ID,
  );
  if (peerRule === undefined) throw new Error(`Missing peer-family rule ${PEER_RULE_ID}`);

  const peerRuleContentRef = registry.snapshot.rules.find(
    (ref) => ref.id === peerRule.ruleId && ref.version === peerRule.version,
  );
  if (peerRuleContentRef === undefined) {
    throw new Error(`Registry snapshot missing peer-family rule ${peerRule.ruleId}`);
  }

  const sourceBinding = peerRule.sourceRefs.find(
    (ref) => ref.sourceId === GENERAL_NATAL_PEER_TAXONOMY_SOURCE.sourceId,
  );
  if (sourceBinding === undefined) {
    throw new Error('Peer-family rule is not bound to the Samyeong volume-7 taxonomy source.');
  }

  const material = Object.freeze({
    evidenceVersion: GENERAL_NATAL_PEER_TAXONOMY_SCAN_EVIDENCE_VERSION,
    issue: '#812' as const,
    candidateVersion: GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION,
    peerRuleRef: Object.freeze({ ...peerRuleContentRef }),
    source: Object.freeze({
      sourceId: GENERAL_NATAL_PEER_TAXONOMY_SOURCE.sourceId,
      pinnedTranscriptionUrl: GENERAL_NATAL_PEER_TAXONOMY_SOURCE.url,
      pinnedTranscriptionSection: GENERAL_NATAL_PEER_TAXONOMY_SOURCE.locator.section,
      boundedProposition: '兄弟者，即劫財比肩',
      sourceBindingSupportType: sourceBinding.supportType,
      volumeFiveTaxonomySourceUsedForPeer: peerRule.sourceRefs.some(
        (ref) => ref.sourceId === SAMYEONG_V5_SOURCE_ID,
      ),
    }),
    scanAuthority: SCAN_AUTHORITY,
    qualification: Object.freeze({
      sameEditionScanAuthorityLocated: true as const,
      sameEditionDigitizationFamilyEstablished: true as const,
      sameEditionScanOcrPropositionCorroborated: true as const,
      exactPhysicalPageOrFolioVerified: false as const,
      directScanImageComparisonCompleted: false as const,
      exactWitnessHashReproducedFromScan: false as const,
      exactTranscriptionIdentityEstablished: false as const,
      fullSourceIntegrityQualificationEstablished: false as const,
    }),
    authority: Object.freeze({
      sourceIntegrityQualificationEstablished: false as const,
      provenanceQualityPromotionAuthorized: false as const,
      domainReviewAuthorityEstablished: false as const,
      productionAdmissionAuthority: false as const,
      production: 'HOLD' as const,
    }),
  });

  return Object.freeze({
    ...material,
    evidenceHash: deterministicContentHash(material),
  });
}
