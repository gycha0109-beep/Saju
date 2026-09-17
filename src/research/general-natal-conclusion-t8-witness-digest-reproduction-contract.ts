import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildGeneralNatalConclusionT8PassageWitnessEvidence } from './general-natal-conclusion-t8-passage-witness-evidence.js';

export const GENERAL_NATAL_CONCLUSION_T8_WITNESS_DIGEST_REPRODUCTION_CONTRACT_VERSION =
  'myeonghwa-general-natal-conclusion-t8-witness-digest-reproduction-contract-v1' as const;

export const GENERAL_NATAL_CONCLUSION_T8_WITNESS_DIGEST_CONTRACT = Object.freeze({
  contractVersion: GENERAL_NATAL_CONCLUSION_T8_WITNESS_DIGEST_REPRODUCTION_CONTRACT_VERSION,
  inputSelection: 'EXACT_BOUNDED_SOURCE_SUBSTRING' as const,
  inputEncoding: 'UTF-8' as const,
  normalizationTransform: 'NONE' as const,
  hashAlgorithm: 'SHA-256' as const,
  rawPassageStoredInRepository: false as const,
});

export function buildGeneralNatalConclusionT8WitnessDigestReproductionContract() {
  const passageEvidence = buildGeneralNatalConclusionT8PassageWitnessEvidence();

  const witnessRows = Object.freeze(
    passageEvidence.witnesses.map((witness) =>
      Object.freeze({
        witnessId: witness.witnessId,
        sourceId: witness.sourceId,
        permanentRevisionUrl: witness.permanentRevisionUrl,
        section: witness.section,
        expectedPassageSha256: witness.passageSha256,
        digestContractVersion:
          GENERAL_NATAL_CONCLUSION_T8_WITNESS_DIGEST_REPRODUCTION_CONTRACT_VERSION,
        inputSelection: GENERAL_NATAL_CONCLUSION_T8_WITNESS_DIGEST_CONTRACT.inputSelection,
        inputEncoding: GENERAL_NATAL_CONCLUSION_T8_WITNESS_DIGEST_CONTRACT.inputEncoding,
        normalizationTransform:
          GENERAL_NATAL_CONCLUSION_T8_WITNESS_DIGEST_CONTRACT.normalizationTransform,
        hashAlgorithm: GENERAL_NATAL_CONCLUSION_T8_WITNESS_DIGEST_CONTRACT.hashAlgorithm,
        externalFixedTranscriptionDigestReproductionObserved: true as const,
        expectedDigestMatchedDuringIndependentRecheck: true as const,
        runtimeIndependentExternalRefetchReproduction: false as const,
        exactScanTranscriptionIdentityEstablished: false as const,
        scanDerivedDigestReproductionEstablished: false as const,
        sourceIntegrityQualificationEstablished: false as const,
        productionProvenancePromotionAuthorized: false as const,
      }),
    ),
  );

  const witnessIds = witnessRows.map((row) => row.witnessId);
  const uniqueWitnessIds = new Set(witnessIds);
  const uniqueExpectedDigests = new Set(witnessRows.map((row) => row.expectedPassageSha256));

  const material = {
    evidenceVersion: GENERAL_NATAL_CONCLUSION_T8_WITNESS_DIGEST_REPRODUCTION_CONTRACT_VERSION,
    issue: '#795' as const,
    auditBaseSha: 'ab413abd1edd0ce8e7032ee3f3742ec89e0c7e4d' as const,
    status: 'FIXED_TRANSCRIPTION_DIGEST_CONTRACT_REPRODUCED_SCAN_REPRODUCTION_PENDING' as const,
    upstreamPassageEvidenceId: passageEvidence.evidenceId,
    digestContract: GENERAL_NATAL_CONCLUSION_T8_WITNESS_DIGEST_CONTRACT,
    witnessRows,
    counts: {
      witnessCount: witnessRows.length,
      uniqueWitnessIdCount: uniqueWitnessIds.size,
      uniqueExpectedDigestCount: uniqueExpectedDigests.size,
      fixedTranscriptionDigestReproductionObservedCount: witnessRows.filter(
        (row) => row.externalFixedTranscriptionDigestReproductionObserved,
      ).length,
      expectedDigestMatchedDuringIndependentRecheckCount: witnessRows.filter(
        (row) => row.expectedDigestMatchedDuringIndependentRecheck,
      ).length,
      runtimeIndependentExternalRefetchReproductionCount: witnessRows.filter(
        (row) => row.runtimeIndependentExternalRefetchReproduction,
      ).length,
      exactScanTranscriptionIdentityEstablishedCount: witnessRows.filter(
        (row) => row.exactScanTranscriptionIdentityEstablished,
      ).length,
      scanDerivedDigestReproductionEstablishedCount: witnessRows.filter(
        (row) => row.scanDerivedDigestReproductionEstablished,
      ).length,
    },
    verdict: {
      exactWitnessCoverageEstablished:
        witnessRows.length === passageEvidence.witnesses.length &&
        uniqueWitnessIds.size === passageEvidence.witnesses.length,
      oneDigestContractAppliedToEveryWitness: witnessRows.every(
        (row) =>
          row.digestContractVersion ===
          GENERAL_NATAL_CONCLUSION_T8_WITNESS_DIGEST_REPRODUCTION_CONTRACT_VERSION,
      ),
      fixedTranscriptionDigestReproductionEstablished: witnessRows.every(
        (row) =>
          row.externalFixedTranscriptionDigestReproductionObserved &&
          row.expectedDigestMatchedDuringIndependentRecheck,
      ),
      rawPassagePersistenceRequired: false as const,
      runtimeIndependentExternalRefetchReproductionEstablished: false as const,
      exactScanTranscriptionIdentityEstablished: false as const,
      scanDerivedDigestReproductionEstablished: false as const,
      sourceIntegrityQualificationEstablished: false as const,
      modernConsumerSemanticBridgeEstablished: false as const,
      productionEligibleProvenanceEstablished: false as const,
      provenanceQualityPromotionAuthorized: false as const,
      productionAdmissionAuthority: false as const,
      productionState: 'HOLD' as const,
    },
    requiredNextEvidence: Object.freeze([
      'VERIFY_EXACT_SCAN_PAGE_OR_FOLIO',
      'DIRECTLY_COMPARE_SCAN_IMAGE_TO_TRANSCRIPTION',
      'REPRODUCE_DIGEST_FROM_SCAN_VERIFIED_TRANSCRIPTION_SURFACE',
      'ESTABLISH_EXACT_CONSUMER_SEMANTIC_BRIDGE_SEPARATELY',
      'DO_NOT_PROMOTE_PROVENANCE_QUALITY_FROM_TRANSCRIPTION_DIGEST_REPRODUCTION_ALONE',
    ] as const),
  };

  return Object.freeze({ evidenceId: deterministicContentHash(material), ...material });
}
