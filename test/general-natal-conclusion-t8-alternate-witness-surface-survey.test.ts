import { describe, expect, it } from 'vitest';

import { buildGeneralNatalConclusionT8AlternateWitnessSurfaceSurvey } from '../src/research/general-natal-conclusion-t8-alternate-witness-surface-survey.js';

describe('General Natal conclusion T8 alternate witness surface survey', () => {
  it('separates exact text circulation from scan-backed production authority', () => {
    const evidence = buildGeneralNatalConclusionT8AlternateWitnessSurfaceSurvey();

    expect(evidence.issue).toBe('#900');
    expect(evidence.counts).toEqual({
      targetWitnessCount: 4,
      candidateSurfaceCount: 4,
      registeredScanCandidateCount: 2,
      directlyInspectedRegisteredScanCandidateCount: 2,
      contextBoundFourOfFourTextCandidateCount: 2,
      productionAdmissibleFourOfFourCandidateCount: 0,
    });

    expect(evidence.verdict).toEqual({
      frozenWitnessMutationAuthorized: false,
      alternateRegisteredScanFourOfFourEstablished: false,
      exactWitnessHashReproductionAuthorityEstablished: false,
      sourceIntegrityQualificationEstablished: false,
      productionEligibleProvenanceEstablished: false,
      provenanceQualityPromotionAuthorized: false,
      productionAdmissionAuthority: false,
      productionState: 'HOLD',
    });
  });

  it('keeps the four frozen witness strings and upstream hashes pinned', () => {
    const evidence = buildGeneralNatalConclusionT8AlternateWitnessSurfaceSurvey();
    const expected = new Map([
      ['W-YUANHAI-WEALTH-OFFICER', '財旺生官'],
      ['W-YUANHAI-OFFICER-RESOURCE', '煞化為印'],
      ['W-YUANHAI-PEER-WEALTH', '比劫羊刃，財格大忌'],
      ['W-YUANHAI-WEALTH-RESOURCE', '印綬見財'],
    ]);

    expect(evidence.frozenRows).toHaveLength(4);
    for (const row of evidence.frozenRows) {
      expect(row.frozenExactString).toBe(expected.get(row.witnessId));
      expect(row.frozenPassageSha256).toMatch(/^[a-f0-9]{64}$/u);
      expect(row.frozenSection).toBe('四言獨步');
      expect(row.frozenPermanentRevisionUrl).toContain('wikisource.org');
    }
  });

  it('records the bounded direct inspection of the 1926 National Taiwan Library scan', () => {
    const evidence = buildGeneralNatalConclusionT8AlternateWitnessSurfaceSurvey();
    const candidate = evidence.candidateSurfaces.find(
      (row) => row.candidateId === 'CANDIDATE-NTL-1926-QINSHENAN-V2',
    );

    expect(candidate).toBeDefined();
    if (candidate?.candidateId !== 'CANDIDATE-NTL-1926-QINSHENAN-V2') {
      throw new Error('Expected registered 1926 candidate.');
    }

    expect(candidate.registeredScanIdentityEstablished).toBe(true);
    expect(candidate.auditableHoldingInstitutionEstablished).toBe(true);
    expect(candidate.holdingInstitution).toBe('National Taiwan Library');
    expect(candidate.digitization).toBe('NTL-9900014380');
    expect(candidate.pageCount).toBe(164);
    expect('scanLinkedTranscriptionUrl' in candidate).toBe(false);
    expect(candidate.qualificationOutcome).toBe(
      'REGISTERED_SCAN_DIRECTLY_INSPECTED_TEXTUAL_DIVERGENCE',
    );
    expect(candidate.directInspection).toEqual({
      state: 'DIRECTLY_INSPECTED',
      boundedDigitalPages: [29, 30, 31, 32, 33, 34],
      sectionTitlePage: 29,
      sectionTitle: '四言獨步',
      contentPages: [29, 30, 31, 32, 33],
      transitionPage: 34,
      transitionSectionTitle: '身弱論',
      frozenExactWitnessesEstablished: {
        'W-YUANHAI-WEALTH-OFFICER': false,
        'W-YUANHAI-OFFICER-RESOURCE': false,
        'W-YUANHAI-PEER-WEALTH': false,
        'W-YUANHAI-WEALTH-RESOURCE': false,
      },
      result: 'BOUNDED_DIRECT_TEXTUAL_DIVERGENCE_NO_FROZEN_EXACT_WITNESS',
    });

    for (const witnessId of [
      'W-YUANHAI-WEALTH-OFFICER',
      'W-YUANHAI-OFFICER-RESOURCE',
      'W-YUANHAI-PEER-WEALTH',
      'W-YUANHAI-WEALTH-RESOURCE',
    ] as const) {
      expect(candidate.rows[witnessId]).toEqual({
        status: 'DIRECTLY_INSPECTED_NOT_ESTABLISHED_IN_FROZEN_CONTEXT',
      });
    }
  });

  it('binds the Shidian transcription to the NLC 1634 five-fascicle scan set and preserves its context mismatch', () => {
    const evidence = buildGeneralNatalConclusionT8AlternateWitnessSurfaceSurvey();
    const candidate = evidence.candidateSurfaces.find(
      (row) => row.candidateId === 'CANDIDATE-NLC-1634-YUSHI-SHANCHENGTANG',
    );

    expect(candidate).toBeDefined();
    if (candidate?.candidateId !== 'CANDIDATE-NLC-1634-YUSHI-SHANCHENGTANG') {
      throw new Error('Expected NLC 1634 candidate.');
    }

    expect(candidate.registeredScanIdentityEstablished).toBe(true);
    expect(candidate.auditableHoldingInstitutionEstablished).toBe(true);
    expect(candidate.holdingInstitution).toBe('National Library of China');
    expect(candidate.digitization).toBe('NLC892-411999032112 / five-fascicle set');
    expect(candidate.relevantDigitization).toBe(
      'NLC892-411999032112-149659 / 第4冊 / 卷之四',
    );
    expect(candidate.relevantPageCount).toBe(29);
    expect(candidate.scanLinkedTranscriptionUrl).toContain('NGJ892411999032112149610');
    expect(candidate.qualificationOutcome).toBe(
      'REGISTERED_SCAN_DIRECTLY_INSPECTED_CONTEXT_MISMATCH',
    );
    expect(candidate.directInspection).toEqual({
      state: 'DIRECTLY_INSPECTED',
      boundedDigitalPages: [16, 17, 18, 19],
      sectionTitlePage: 16,
      sectionTitle: '四言獨步',
      directlyLegibleOpeningAnchors: [
        '先天何處', '後天何處', '要知來處', '便知去處',
        '四柱排定', '三才次分', '年干為本', '配合元辰',
        '神煞相伴', '輕重較量', '先觀月令', '論格推詳',
        '以日為主', '專論財官', '分其貴賤', '妙法多端',
      ],
      transitionPage: 19,
      transitionSectionTitle: '棄命從殺論',
      frozenExactWitnessesEstablished: {
        'W-YUANHAI-WEALTH-OFFICER': false,
        'W-YUANHAI-OFFICER-RESOURCE': false,
        'W-YUANHAI-PEER-WEALTH': false,
        'W-YUANHAI-WEALTH-RESOURCE': false,
      },
      result: 'BOUNDED_DIRECT_TEXTUAL_DIVERGENCE_NO_FROZEN_EXACT_WITNESS',
    });

    expect(candidate.rows['W-YUANHAI-WEALTH-OFFICER']).toEqual({
      status: 'EXACT_STRING_PRESENT_OUTSIDE_FROZEN_CONTEXT',
      observedText: '財旺生官',
      observedContext: '四言獨步 preceding material',
    });
    expect(candidate.rows['W-YUANHAI-OFFICER-RESOURCE']).toEqual({
      status: 'ORTHOGRAPHIC_TEXTUAL_VARIANT_OUTSIDE_FROZEN_CONTEXT',
      observedText: '殺化爲印',
      frozenText: '煞化為印',
      observedContext: '四言獨步 preceding material',
    });
    expect(candidate.rows['W-YUANHAI-PEER-WEALTH'].status).toBe(
      'NOT_ESTABLISHED_IN_FROZEN_CONTEXT',
    );
    expect(candidate.rows['W-YUANHAI-WEALTH-RESOURCE']).toEqual({
      status: 'EXACT_STRING_PRESENT_OUTSIDE_FROZEN_CONTEXT',
      observedText: '印綬見財',
      observedContext: 'same NLC set / 卷三 / 論格局生死引用',
    });

    expect(candidate.frozenContextSequenceObserved).toEqual([
      '印殺相輕',
      '印綬根深',
      '先財後印',
      '先印後財',
    ]);
  });

  it('does not treat source-unknown Wikisource or secondary exact transcriptions as scan qualification', () => {
    const evidence = buildGeneralNatalConclusionT8AlternateWitnessSurfaceSurvey();

    const wiksource = evidence.candidateSurfaces.find(
      (row) => row.candidateId === 'CANDIDATE-WIKISOURCE-FROZEN-TRANSCRIPTION',
    );
    const secondary = evidence.candidateSurfaces.find(
      (row) => row.candidateId === 'CANDIDATE-SECONDARY-FOUR-YAN-DUBU-TRANSCRIPTIONS',
    );

    expect(wiksource?.registeredScanIdentityEstablished).toBe(false);
    expect(wiksource?.auditableHoldingInstitutionEstablished).toBe(false);
    expect(wiksource?.qualificationOutcome).toBe(
      'TEXT_IDENTITY_ONLY_NOT_SCAN_QUALIFIED',
    );

    expect(secondary?.registeredScanIdentityEstablished).toBe(false);
    expect(secondary?.auditableHoldingInstitutionEstablished).toBe(false);
    expect(secondary?.qualificationOutcome).toBe(
      'TEXTUAL_VARIANT_EXISTS_BUT_SCAN_IDENTITY_UNESTABLISHED',
    );

    for (const witnessId of [
      'W-YUANHAI-WEALTH-OFFICER',
      'W-YUANHAI-OFFICER-RESOURCE',
      'W-YUANHAI-PEER-WEALTH',
      'W-YUANHAI-WEALTH-RESOURCE',
    ] as const) {
      expect(wiksource?.rows[witnessId].status).toBe(
        'CONTEXT_BOUND_EXACT_STRING_PRESENT_SOURCE_UNKNOWN',
      );
      expect(secondary?.rows[witnessId].status).toBe(
        'CONTEXT_BOUND_EXACT_STRING_PRESENT_SECONDARY_ONLY',
      );
    }
  });

  it('requires exact rob-wealth glyph support and forbids orthographic normalization', () => {
    const evidence = buildGeneralNatalConclusionT8AlternateWitnessSurfaceSurvey();

    expect(evidence.requiredNextEvidence).toContain(
      'REQUIRE_EXACT_ROB_WEALTH_GLYPH_FOR_PEER_WEALTH_WITNESS',
    );
    expect(evidence.requiredNextEvidence).toContain(
      'DO_NOT_NORMALIZE_ORTHOGRAPHIC_VARIANTS_INTO_FROZEN_HASH_IDENTITY',
    );
    expect(evidence.requiredNextEvidence).toContain(
      'KEEP_SAME_STRING_DIFFERENT_SECTION_SEPARATE_FROM_FROZEN_CONTEXT_IDENTITY',
    );
  });

  it('is deterministic for identical source evidence', () => {
    expect(buildGeneralNatalConclusionT8AlternateWitnessSurfaceSurvey()).toEqual(
      buildGeneralNatalConclusionT8AlternateWitnessSurfaceSurvey(),
    );
  });
});
