import { describe, expect, it } from 'vitest';
import {
  GENERAL_NATAL_CONCLUSION_T8_WITNESS_DIGEST_CONTRACT,
  buildGeneralNatalConclusionT8WitnessDigestReproductionContract,
} from '../src/research/general-natal-conclusion-t8-witness-digest-reproduction-contract.js';

describe('General Natal conclusion T8 witness digest reproduction contract', () => {
  it('covers every existing witness exactly once with one explicit digest contract', () => {
    const evidence = buildGeneralNatalConclusionT8WitnessDigestReproductionContract();

    expect(evidence.issue).toBe('#795');
    expect(evidence.counts.witnessCount).toBe(16);
    expect(evidence.counts.uniqueWitnessIdCount).toBe(16);
    expect(evidence.verdict.exactWitnessCoverageEstablished).toBe(true);
    expect(evidence.verdict.oneDigestContractAppliedToEveryWitness).toBe(true);
    expect(GENERAL_NATAL_CONCLUSION_T8_WITNESS_DIGEST_CONTRACT).toEqual({
      contractVersion:
        'myeonghwa-general-natal-conclusion-t8-witness-digest-reproduction-contract-v1',
      inputSelection: 'EXACT_BOUNDED_SOURCE_SUBSTRING',
      inputEncoding: 'UTF-8',
      normalizationTransform: 'NONE',
      hashAlgorithm: 'SHA-256',
      rawPassageStoredInRepository: false,
    });
    expect(
      evidence.witnessRows.every(
        (row) =>
          row.inputSelection === 'EXACT_BOUNDED_SOURCE_SUBSTRING' &&
          row.inputEncoding === 'UTF-8' &&
          row.normalizationTransform === 'NONE' &&
          row.hashAlgorithm === 'SHA-256',
      ),
    ).toBe(true);
    expect(evidence.witnessRows.every((row) => !('passageText' in row))).toBe(true);
  });

  it('records 16-of-16 fixed-transcription reproduction while preserving downstream fail-closed gates', () => {
    const evidence = buildGeneralNatalConclusionT8WitnessDigestReproductionContract();

    expect(evidence.counts.fixedTranscriptionDigestReproductionObservedCount).toBe(16);
    expect(evidence.counts.expectedDigestMatchedDuringIndependentRecheckCount).toBe(16);
    expect(evidence.verdict.fixedTranscriptionDigestReproductionEstablished).toBe(true);
    expect(evidence.counts.runtimeIndependentExternalRefetchReproductionCount).toBe(0);
    expect(evidence.counts.exactScanTranscriptionIdentityEstablishedCount).toBe(0);
    expect(evidence.counts.scanDerivedDigestReproductionEstablishedCount).toBe(0);
    expect(evidence.verdict.runtimeIndependentExternalRefetchReproductionEstablished).toBe(false);
    expect(evidence.verdict.exactScanTranscriptionIdentityEstablished).toBe(false);
    expect(evidence.verdict.scanDerivedDigestReproductionEstablished).toBe(false);
    expect(evidence.verdict.sourceIntegrityQualificationEstablished).toBe(false);
    expect(evidence.verdict.modernConsumerSemanticBridgeEstablished).toBe(false);
    expect(evidence.verdict.productionEligibleProvenanceEstablished).toBe(false);
    expect(evidence.verdict.provenanceQualityPromotionAuthorized).toBe(false);
    expect(evidence.verdict.productionAdmissionAuthority).toBe(false);
    expect(evidence.verdict.productionState).toBe('HOLD');
    expect(evidence.witnessRows.every((row) => !row.productionProvenancePromotionAuthorized)).toBe(
      true,
    );
  });
});
