import { describe, expect, it } from 'vitest';

import { buildGeneralNatalConclusionT8AlternateWitnessSurfaceSurvey } from '../src/research/general-natal-conclusion-t8-alternate-witness-surface-survey.js';

describe('General Natal conclusion T8 alternate witness surface survey', () => {
  it('separates exact text circulation from scan-backed production authority', () => {
    const evidence = buildGeneralNatalConclusionT8AlternateWitnessSurfaceSurvey();

    expect(evidence.issue).toBe('#877');
    expect(evidence.counts).toEqual({
      targetWitnessCount: 4,
      candidateSurfaceCount: 3,
      registeredScanCandidateCount: 1,
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

  it('records the 1926 National Taiwan Library scan as registered but context-mismatched', () => {
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
    expect(candidate.qualificationOutcome).toBe(
      'REGISTERED_SCAN_CANDIDATE_CONTEXT_MISMATCH',
    );

    expect(candidate.rows['W-YUANHAI-WEALTH-OFFICER']).toEqual({
      status: 'EXACT_STRING_PRESENT_OUTSIDE_FROZEN_CONTEXT',
      observedText: '財旺生官',
      observedContext: '挈要捷馳玄妙訣 / 四言獨步 preceding material',
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
      observedContext: '卷五 / 格局生死引用',
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
