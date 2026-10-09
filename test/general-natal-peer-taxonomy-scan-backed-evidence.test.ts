import { describe, expect, it } from 'vitest';
import {
  GENERAL_NATAL_PEER_TAXONOMY_SOURCE,
  GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_RULES,
  createGeneralNatalSourceBoundedRegistry,
} from '../src/research/general-natal-conclusion-source-bounded-candidate.js';
import {
  GENERAL_NATAL_PEER_TAXONOMY_SCAN_EVIDENCE_VERSION,
  buildGeneralNatalPeerTaxonomyScanBackedEvidence,
} from '../src/research/general-natal-peer-taxonomy-scan-backed-evidence.js';

describe('general natal Samyeong v7 peer-taxonomy scan-backed evidence', () => {
  it('binds the exact current peer-family rule content ref to the volume-7 source', () => {
    const registry = createGeneralNatalSourceBoundedRegistry();
    const evidence = buildGeneralNatalPeerTaxonomyScanBackedEvidence();
    const peerRule = GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_RULES.find(
      (rule) => rule.ruleId === 'RULE-GENERAL-NATAL-SOURCE-BOUNDED-FAMILY-PEER-PRESENT',
    );
    expect(peerRule).toBeDefined();
    if (peerRule === undefined) throw new Error('Missing peer-family rule.');

    const registryRef = registry.snapshot.rules.find(
      (ref) => ref.id === peerRule.ruleId && ref.version === peerRule.version,
    );
    expect(evidence.peerRuleRef).toEqual(registryRef);
    expect(evidence.source.sourceId).toBe(GENERAL_NATAL_PEER_TAXONOMY_SOURCE.sourceId);
    expect(peerRule.sourceRefs.map((ref) => ref.sourceId)).toContain(evidence.source.sourceId);
  });

  it('uses Samyeong volume 7, not volume 5, for peer-family taxonomy support', () => {
    const evidence = buildGeneralNatalPeerTaxonomyScanBackedEvidence();
    expect(evidence.evidenceVersion).toBe(GENERAL_NATAL_PEER_TAXONOMY_SCAN_EVIDENCE_VERSION);
    expect(evidence.source.pinnedTranscriptionSection).toBe('兄弟');
    expect(evidence.source.boundedProposition).toBe('兄弟者，即劫財比肩');
    expect(evidence.source.directScanObservedText).toBe('兄弟者即劫財比肩');
    expect(evidence.source.volumeFiveTaxonomySourceUsedForPeer).toBe(false);
    expect(evidence.scanAuthority.digitization).toBe('CADAL06066043');
    expect(evidence.scanAuthority.edition).toBe('欽定四庫全書本');
    expect(evidence.scanAuthority.holdingInstitution).toBe('Zhejiang University Library');
    expect(evidence.scanAuthority.pageCount).toBe(198);
  });

  it('records exact digital scan page 174 and reproducible source/page identifiers', () => {
    const evidence = buildGeneralNatalPeerTaxonomyScanBackedEvidence();
    expect(evidence.scanAuthority.directInspection).toEqual({
      uploadedDjvuSha1: 'eeb9f80eb97fd385a580aa5bfda28c292aa7761c',
      digitalScanPage: 174,
      sectionObserved: '兄弟引例章',
      boundedPropositionObserved: '兄弟者即劫財比肩',
      pageFormDjvuSha256: 'f0d83bf196e4b9752d63ad4340f5d74a1f29a6bebf88315b601488fb8fc62ba9',
      pageSjbzSha256: 'fcdd51135abeeb0b22637b7852c809848c74b482ae71a0092d336a2f75cca57b',
    });
    expect(evidence.source.boundedProposition.replace('，', '')).toBe(
      evidence.source.directScanObservedText,
    );
  });

  it('records direct scan-image comparison while keeping stronger source-integrity gates fail-closed', () => {
    const evidence = buildGeneralNatalPeerTaxonomyScanBackedEvidence();
    expect(evidence.qualification).toEqual({
      sameEditionScanAuthorityLocated: true,
      sameEditionDigitizationFamilyEstablished: true,
      sameEditionScanOcrPropositionCorroborated: true,
      exactDigitalScanPageVerified: true,
      boundedPropositionDirectlyObservedInScan: true,
      exactPhysicalPageOrFolioVerified: false,
      directScanImageComparisonCompleted: true,
      exactWitnessHashReproducedFromScan: false,
      exactTranscriptionIdentityEstablished: false,
      fullSourceIntegrityQualificationEstablished: false,
    });
  });

  it('records exact alternate PDF image location without elevating the governed witness', () => {
    const evidence = buildGeneralNatalPeerTaxonomyScanBackedEvidence();
    const alternate = evidence.alternateScanCorroboration;

    expect(alternate.authorityId).toBe('SCAN-SAMYEONG-SIKU-CADAL06056483');
    expect(alternate.digitization).toBe('CADAL06056483');
    expect(alternate.edition).toBe(evidence.scanAuthority.edition);
    expect(alternate.pageCount).toBe(206);
    expect(alternate.authenticatedDjvuSha1).toBe(
      '87834f5ff930189c57a5031af2dfa1e6a6a43676',
    );
    expect(alternate.authenticatedDjvuSha256).toBe(
      'debf222f9448e447217d21e11f116c285eb3ab57debdcd2c6c5acf8af2b351bd',
    );
    expect(alternate.directPdfImageInspection).toEqual({
      splitPdfPageRange: '151-206',
      splitPdfPage: 32,
      digitalScanPageFromContiguousPdfSplit: 182,
      sectionObserved: '兄弟引例章',
      boundedPropositionObserved: '兄弟者即刼財比肩',
      governedRecordedPropositionForComparison: '兄弟者即劫財比肩',
      matchesGovernedScanRecordedBoundedProposition: false,
      semanticCorrespondenceOnly: true,
      originalPdfPages: 206,
      originalPdfSha256: '87509016d7b897c1a1e92cf79bee6e00e19b3b09a010f9288a5c9d44fafaff21',
      splitPdfSha256: 'cc82851a3b448cdba09bad22e812ff0720b3c257114b318645d2a44abf03b180',
      originalPdfPageAndSplitPageRasterIdentical: true,
      identicalRasterSha256At2xRgb: '6c2db6e0300cd502f8ae65f58e56f98636c84597981ae388d0deffd5e3677075',
      originalDjvuPageImageIndependentlyDecoded: false,
    });
    expect(alternate.directPdfImageInspection.boundedPropositionObserved).not.toBe(
      alternate.directPdfImageInspection.governedRecordedPropositionForComparison,
    );
    expect(alternate.directPdfImageInspection.matchesGovernedScanRecordedBoundedProposition).toBe(false);
    expect(
      alternate.directPdfImageInspection.digitalScanPageFromContiguousPdfSplit -
        evidence.scanAuthority.directInspection.digitalScanPage,
    ).toBe(8);
    expect(alternate.pageCount - evidence.scanAuthority.pageCount).toBe(8);
  });

  it('keeps all stronger source-integrity and production gates closed for alternate scan', () => {
    const evidence = buildGeneralNatalPeerTaxonomyScanBackedEvidence();
    expect(evidence.alternateScanCorroboration.qualification).toEqual({
      exactPhysicalPageOrFolioVerified: false,
      completePassageTranscriptionIdentityEstablished: false,
      scanDerivedWitnessDigestReproduced: false,
      fullSourceIntegrityQualificationEstablished: false,
      productionAdmissionAuthority: false,
    });
    expect(evidence.qualification.exactPhysicalPageOrFolioVerified).toBe(false);
    expect(evidence.qualification.exactWitnessHashReproducedFromScan).toBe(false);
    expect(evidence.qualification.exactTranscriptionIdentityEstablished).toBe(false);
    expect(evidence.authority.production).toBe('HOLD');
  });

  it('keeps provenance, domain review, and Production authority fail-closed', () => {
    const evidence = buildGeneralNatalPeerTaxonomyScanBackedEvidence();
    const peerRule = GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_RULES.find(
      (rule) => rule.ruleId === 'RULE-GENERAL-NATAL-SOURCE-BOUNDED-FAMILY-PEER-PRESENT',
    );
    expect(peerRule?.quality.provenanceQuality).toBe('secondary_only');
    expect(peerRule?.quality.reviewerStatus).toBe('unreviewed');
    expect(peerRule?.status).toBe('research');
    expect(evidence.authority).toEqual({
      sourceIntegrityQualificationEstablished: false,
      provenanceQualityPromotionAuthorized: false,
      domainReviewAuthorityEstablished: false,
      productionAdmissionAuthority: false,
      production: 'HOLD',
    });
  });

  it('builds deterministically with lowercase SHA-256 evidence identity', () => {
    const left = buildGeneralNatalPeerTaxonomyScanBackedEvidence();
    const right = buildGeneralNatalPeerTaxonomyScanBackedEvidence();
    expect(left.evidenceHash).toBe(right.evidenceHash);
    expect(left.evidenceHash).toMatch(/^[a-f0-9]{64}$/);
  });
});
