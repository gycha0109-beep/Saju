import { describe, expect, it } from 'vitest';

import {
  R168_AUTHORITY,
  R168_CANDIDATE_BINDINGS,
  R168_DIGITAL_WITNESSES,
  R168_GROUPED_SURFACE_AUDIT,
  R168_PAIRED_BREAK_JIA_AUDIT,
  R168_REJECTED_SHORTCUTS,
  R168_REMAINING_ACQUISITION_GAPS,
  R168_SOURCE_LAYER_WITNESS_BINDING_VERSION,
  R168_SUMMARY,
  R168_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-predicate-candidate-source-layer-witness-binding.js';

describe('R168 predicate-candidate source-layer witness binding', () => {
  it('binds six public digital witness records across three candidates', () => {
    expect(R168_SOURCE_LAYER_WITNESS_BINDING_VERSION).toBe('0.1.0-research');
    expect(R168_DIGITAL_WITNESSES).toHaveLength(6);
    expect(R168_CANDIDATE_BINDINGS.map((item) => item.sourceSurface)).toEqual([
      '命有甲',
      '庚辛',
      '申酉',
    ]);
    expect(R168_SUMMARY).toMatchObject({
      candidateCount: 3,
      digitalWitnessCount: 6,
      originalTextDirectWitnessCandidateCount: 2,
      commentaryDirectWitnessCandidateCount: 1,
      historicalCriticalEditionBoundCount: 0,
      admittedCandidateCount: 0,
      remainingGapCount: 6,
    });
  });

  it('keeps public transcriptions distinct from critical editions and independent historical witnesses', () => {
    for (const witness of R168_DIGITAL_WITNESSES) {
      expect(witness.publicDigitalTranscription).toBe(true);
      expect(witness.historicalCriticalEditionEstablished).toBe(false);
      expect(witness.editionIdentityEstablished).toBe(false);
      expect(witness.pageOrFolioLocatorEstablished).toBe(false);
      expect(witness.editorialIndependenceEstablished).toBe(false);
    }
  });

  it('binds Jia and Geng/Xin to the Shen text layer', () => {
    const jia = R168_CANDIDATE_BINDINGS.find((item) => item.sourceSurface === '命有甲');
    const gengXin = R168_CANDIDATE_BINDINGS.find((item) => item.sourceSurface === '庚辛');

    for (const item of [jia, gengXin]) {
      expect(item?.originalTextLayerDirectWitnessBound).toBe(true);
      expect(item?.commentaryLayerDirectWitnessBound).toBe(false);
      expect(item?.publicTranscriptionCrossCheckObserved).toBe(true);
      expect(item?.predicateContractStudyAdmission).toBe('BLOCKED');
    }
  });

  it('keeps Shen/You on the Xu commentary layer rather than rewriting it into Shen original text', () => {
    const shenYou = R168_CANDIDATE_BINDINGS.find((item) => item.sourceSurface === '申酉');
    expect(shenYou).toMatchObject({
      originalTextLayerDirectWitnessBound: false,
      commentaryLayerDirectWitnessBound: true,
      publicTranscriptionCrossCheckObserved: true,
      predicateContractStudyAdmission: 'BLOCKED',
    });
    expect(R168_GROUPED_SURFACE_AUDIT).toMatchObject({
      gengXinOriginalTextSurfaceObserved: true,
      gengXinGroupedPhraseObserved: true,
      shenYouOriginalTextSurfaceObserved: false,
      shenYouXuCommentarySurfaceObserved: true,
      originalAndCommentaryLayersDistinct: true,
      groupedMemberIndividualSufficiencyEstablished: false,
      groupedAlternativeSufficiencyEstablished: false,
    });
  });

  it('preserves break-case Jia omission as omission rather than absence', () => {
    expect(R168_PAIRED_BREAK_JIA_AUDIT).toMatchObject({
      breakCaseDirectTextObserved: true,
      rescueCaseDirectJiaPresenceObserved: true,
      breakCaseJiaMentionObserved: false,
      breakCaseJiaAbsenceEstablished: false,
      pairedTextualDifferenceEstablished: true,
      rescueMinimalityEstablished: false,
      rescueSufficiencyEstablished: false,
    });
  });

  it('keeps all candidates blocked because provenance and semantic gaps remain', () => {
    for (const item of R168_CANDIDATE_BINDINGS) {
      expect(item.sourceWorkIdentityBound).toBe(true);
      expect(item.sectionLocatorBound).toBe(true);
      expect(item.contextWindowBound).toBe(true);
      expect(item.historicalCriticalEditionBound).toBe(false);
      expect(item.editionIdentityBound).toBe(false);
      expect(item.pageOrFolioLocatorBound).toBe(false);
      expect(item.independentHistoricalWitnessBound).toBe(false);
      expect(item.minimalitySufficiencyEvidenceBound).toBe(false);
      expect(item.predicateContractStudyAdmission).toBe('BLOCKED');
      expect(item.semanticPredicateEstablished).toBe(false);
      expect(item.executableResolverAuthorized).toBe(false);
      expect(item.productionAuthorityPromoted).toBe(false);
    }
  });

  it('records the unresolved acquisition frontier explicitly', () => {
    expect(R168_REMAINING_ACQUISITION_GAPS).toEqual([
      'HISTORICAL_CRITICAL_EDITION_BINDING',
      'EDITION_IDENTITY_BINDING',
      'PAGE_OR_FOLIO_LOCATOR_BINDING',
      'INDEPENDENT_HISTORICAL_WITNESS_BINDING',
      'MINIMALITY_SUFFICIENCY_EVIDENCE_BINDING',
      'SHENYOU_ORIGINAL_TEXT_LAYER_WITNESS_IF_ANY',
    ]);
  });

  it('rejects source-layer collapse and authority promotion shortcuts', () => {
    expect(R168_REJECTED_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'PUBLIC_TRANSCRIPTION_EQUALS_CRITICAL_EDITION',
        'TWO_WEB_TRANSCRIPTIONS_EQUAL_INDEPENDENT_HISTORICAL_WITNESSES',
        'ORIGINAL_TEXT_AND_XU_COMMENTARY_ARE_ONE_SOURCE_LAYER',
        'XU_COMMENTARY_SHENYOU_EQUALS_SHEN_ORIGINAL_SHENYOU',
        'BREAK_JIA_OMISSION_EQUALS_JIA_ABSENCE',
        'DIRECT_JIA_WITNESS_EQUALS_RESCUE_MINIMALITY',
        'DIRECT_GENGXIN_WITNESS_EQUALS_COUNTERFORCE_SUFFICIENCY',
        'WITNESS_BINDING_EQUALS_EXECUTABLE_RULE',
      ]),
    );
  });

  it('keeps R168 research-only and non-authoritative', () => {
    expect(R168_UPSTREAM_BINDINGS.r167).toMatchObject({
      contractCount: 3,
      actualWitnessAcquired: false,
      predicateContractStudyReady: false,
    });
    expect(R168_AUTHORITY).toMatchObject({
      researchOnly: true,
      publicDigitalTranscriptionWitnessesBound: true,
      originalTextLayerJiaWitnessBound: true,
      originalTextLayerGengXinWitnessBound: true,
      commentaryLayerShenYouWitnessBound: true,
      originalTextLayerShenYouWitnessBound: false,
      sourceLayerDistinctionEstablished: true,
      historicalCriticalEditionBound: false,
      predicateContractStudyReady: false,
      semanticPredicateEstablished: false,
      exactMinimalPredicateSetEstablished: false,
      matchingSufficiencyEstablished: false,
      outcomeSufficiencyEstablished: false,
      settlementEstablished: false,
      executableResolverAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
