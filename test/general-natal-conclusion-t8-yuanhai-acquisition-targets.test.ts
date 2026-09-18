import { describe, expect, it } from 'vitest';

import { buildGeneralNatalConclusionT8YuanhaiAcquisitionTargets } from '../src/research/general-natal-conclusion-t8-yuanhai-acquisition-targets.js';

describe('General Natal conclusion T8 Yuanhai acquisition targets', () => {
  it('registers acquisition targets without converting catalog records into witness evidence', () => {
    const evidence = buildGeneralNatalConclusionT8YuanhaiAcquisitionTargets();

    expect(evidence.issue).toBe('#879');
    expect(evidence.counts).toEqual({
      unresolvedWitnessCount: 4,
      acquisitionTargetCount: 4,
      confirmedPhysicalHoldingCount: 3,
      bibliographicLeadCount: 1,
      publicDigitalPageImageVerifiedCount: 0,
      directlyInspectedAcquisitionTargetCount: 0,
      newDirectWitnessEvidenceCount: 0,
      productionAdmissionEvidenceCount: 0,
    });

    expect(evidence.verdict.catalogRecordIsPhraseLevelEvidence).toBe(false);
    expect(evidence.verdict.anyTargetFrozenWitnessContentEstablished).toBe(false);
    expect(evidence.verdict.anyTargetReadyForWitnessPromotion).toBe(false);
    expect(evidence.verdict.productionAdmissionAuthority).toBe(false);
    expect(evidence.verdict.productionState).toBe('HOLD');
  });

  it('pins the three confirmed physical holdings and their relevant item identifiers', () => {
    const evidence = buildGeneralNatalConclusionT8YuanhaiAcquisitionTargets();

    const yulgok = evidence.acquisitionTargets.find(
      (target) => target.targetId === 'ACQ-YUANHAI-YULGOK-YG015-01-470',
    );
    expect(yulgok).toMatchObject({
      priority: 'P1',
      targetClass: 'CONFIRMED_PHYSICAL_HOLDING',
      catalogIdentifier: 'YG015-01-470',
      title: '新刊合倂官板音義評註淵海子平 卷1~5',
      publicPageImageAvailability: 'NOT_ESTABLISHED',
      directInspectionState: 'NOT_ACQUIRED',
      frozenWitnessContentClaimed: false,
    });

    const tokyo = evidence.acquisitionTargets.find(
      (target) => target.targetId === 'ACQ-YUANHAI-TOKYO-IASA-BB19249231-4',
    );
    expect(tokyo).toMatchObject({
      priority: 'P1',
      targetClass: 'CONFIRMED_PHYSICAL_HOLDING',
      catalogIdentifier: 'CiNii NCID BB19249231 / fascicle [4] call 6402838715',
      editionOrImprint: '上海錦章圖書局, [19--], 石印本',
      publicPageImageAvailability: 'NOT_ESTABLISHED',
      directInspectionState: 'NOT_ACQUIRED',
      frozenWitnessContentClaimed: false,
    });

    const bukkyo = evidence.acquisitionTargets.find(
      (target) => target.targetId === 'ACQ-YUANHAI-BUKKYO-BA88839860-V4-5',
    );
    expect(bukkyo).toMatchObject({
      priority: 'P1',
      targetClass: 'CONFIRMED_PHYSICAL_HOLDING',
      catalogIdentifier: 'CiNii NCID BA88839860 / 卷之4-5 call 000241369',
      editionOrImprint: '千頃堂書局, [19--], 石印本',
      publicPageImageAvailability: 'NOT_ESTABLISHED',
      directInspectionState: 'NOT_ACQUIRED',
      frozenWitnessContentClaimed: false,
    });
  });

  it('keeps the Fuwen Shuju record as a lead rather than inventing a holding', () => {
    const evidence = buildGeneralNatalConclusionT8YuanhaiAcquisitionTargets();
    const lead = evidence.acquisitionTargets.find(
      (target) =>
        target.targetId === 'ACQ-YUANHAI-FUWEN-GUANGXU-BIBLIOGRAPHIC-LEAD',
    );

    expect(lead).toMatchObject({
      priority: 'P2',
      targetClass: 'BIBLIOGRAPHIC_LEAD_HOLDING_UNCONFIRMED',
      holdingInstitution: null,
      editionOrImprint: '清光緒間上海富文書局石印本',
      publicPageImageAvailability: 'NOT_ESTABLISHED',
      directInspectionState: 'NOT_ACQUIRED',
      frozenWitnessContentClaimed: false,
    });
  });

  it('keeps all four unresolved witness identities explicit', () => {
    const evidence = buildGeneralNatalConclusionT8YuanhaiAcquisitionTargets();

    expect(evidence.unresolvedWitnessIds).toEqual([
      'W-YUANHAI-WEALTH-OFFICER',
      'W-YUANHAI-OFFICER-RESOURCE',
      'W-YUANHAI-PEER-WEALTH',
      'W-YUANHAI-WEALTH-RESOURCE',
    ]);
  });

  it('requires direct acquisition and exact glyph verification before any promotion', () => {
    const evidence = buildGeneralNatalConclusionT8YuanhaiAcquisitionTargets();

    expect(evidence.acquisitionProtocol).toContain(
      'OBTAIN_EXACT_ITEM_OR_REPRODUCTION_WITH_CATALOG_IDENTITY',
    );
    expect(evidence.acquisitionProtocol).toContain(
      'READ_BOUNDED_GLYPHS_DIRECTLY_FROM_ACQUIRED_SURFACE',
    );
    expect(evidence.acquisitionProtocol).toContain(
      'REQUIRE_EXACT_ROB_WEALTH_GLYPH_FOR_PEER_WEALTH_WITNESS',
    );
    expect(evidence.acquisitionProtocol).toContain(
      'DO_NOT_NORMALIZE_ORTHOGRAPHIC_VARIANTS_INTO_FROZEN_HASH_IDENTITY',
    );

    expect(evidence.verdict.witnessReregistrationAuthorized).toBe(false);
    expect(evidence.verdict.exactWitnessHashReproductionAuthorityEstablished).toBe(
      false,
    );
    expect(evidence.verdict.sourceIntegrityQualificationEstablished).toBe(false);
    expect(evidence.verdict.productionEligibleProvenanceEstablished).toBe(false);
  });

  it('is deterministic', () => {
    expect(buildGeneralNatalConclusionT8YuanhaiAcquisitionTargets()).toEqual(
      buildGeneralNatalConclusionT8YuanhaiAcquisitionTargets(),
    );
  });
});
