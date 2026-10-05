import { describe, expect, it } from 'vitest';

import {
  R185_AUTHORITY,
  R185_AUTHORITY_BOUNDARY,
  R185_DUPLICATE_SURFACE_AUDIT,
  R185_EARLIEST_ATTRIBUTABLE_PUBLIC_SURFACE,
  R185_JIA_JI_SECONDARY_PROVENANCE_TRACE_VERSION,
  R185_LATER_REPUBLICATION_CONTEXT,
  R185_PROVENANCE_PROGRESS,
  R185_R184_CASE_PROVENANCE_GAP,
  R185_REJECTED_SHORTCUTS,
  R185_REQUIRED_FOLLOW_UP,
} from '../src/research/general-natal-predicate-candidate-jia-ji-secondary-provenance-trace.js';

describe('R185 Jia-Ji secondary provenance trace', () => {
  it('binds a 2011-10-06 attributable public surface without claiming first publication', () => {
    expect(R185_JIA_JI_SECONDARY_PROVENANCE_TRACE_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R185_EARLIEST_ATTRIBUTABLE_PUBLIC_SURFACE).toMatchObject({
      candidateId: 'R185-P01-SONG-KUN-2011-10-06',
      title: '天干地支的刑冲合害等作用关系的整理与复习',
      attributedName: '宋坤',
      displayedTimestamp: '2011-10-06 11:35',
      exactJiaJiDirectRuleFamilyObserved: true,
      authorIdentityVerifiedBeyondDisplayedName: false,
      firstPublicationEstablished: false,
      originalHostEstablished: false,
      printedWitnessEstablished: false,
      independentLineageEstablished: false,
      normativeAuthorityAcquired: false,
    });
    expect(
      R185_EARLIEST_ATTRIBUTABLE_PUBLIC_SURFACE.observedRuleFamily,
    ).toContain('甲木克己土');
  });

  it('records the later lecture-manuscript label as context only', () => {
    expect(R185_LATER_REPUBLICATION_CONTEXT).toEqual({
      candidateId: 'R185-P02-AQIOO-2021-REPUBLICATION',
      sourceLabel: '阿启网 repost surface',
      sourceUrl: 'https://www.aqioo.com/bazisuanming/tiangandizhi/166283.html',
      displayedPublicationTimestamp: '2021-08-26 09:02:33',
      displayedPosterName: '灵睿居士',
      articleTitle: '天干地支的刑冲合害等作用关系',
      internalHeading: '天干地支的刑冲合害等作用关系的整理与复习',
      lectureManuscriptLabelObserved: true,
      lectureManuscriptLabel: '松原易学年会 讲座稿',
      exactJiaJiDirectRuleFamilyObserved: true,
      establishes2011SurfaceDerivedFromLectureManuscript: false,
      establishesSongKunAsOriginalAuthor: false,
      establishesLectureDate: false,
      establishesPrintedOrOfficialManuscript: false,
      normativeAuthorityAcquired: false,
    });
  });

  it('treats duplicate web surfaces as lineage clues rather than corroborating witnesses', () => {
    expect(R185_DUPLICATE_SURFACE_AUDIT).toHaveLength(2);
    for (const duplicate of R185_DUPLICATE_SURFACE_AUDIT) {
      expect(duplicate.sameJiaJiRuleFamilyObserved).toBe(true);
      expect(duplicate.independentAuthorshipEstablished).toBe(false);
      expect(duplicate.independentLineageEstablished).toBe(false);
      expect(duplicate.mayIncreaseNormativeWitnessCount).toBe(false);
    }
  });

  it('records provenance progress but keeps original authorship and publication unresolved', () => {
    expect(R185_PROVENANCE_PROGRESS).toEqual({
      r184OriginalSourceLineagePreviouslyResolved: false,
      r184FirstPublicationPreviouslyEstablished: false,
      earliestAttributablePublicSurfaceCandidateEstablished: true,
      earliestObservedDisplayedDate: '2011-10-06',
      displayedAttributionNameAvailable: true,
      laterLectureManuscriptLabelAvailable: true,
      originalAuthorEstablished: false,
      firstPublicationEstablished: false,
      originalLectureManuscriptAcquired: false,
      printedWitnessEstablished: false,
      directNonDayMasterCaseLineageConnectedToRuleFamily: false,
      canonicalTraditionalLineageEstablished: false,
    });
  });

  it('keeps the exact non-day-master direct case on a separate unresolved provenance path', () => {
    expect(R185_R184_CASE_PROVENANCE_GAP).toEqual({
      r184ExactNonDayMasterSecondaryDirectCaseObserved: true,
      exactNonDayMasterCaseSourceUrl: 'https://read01.com/zh-sg/Rmo3Ea.html',
      exactNonDayMasterCaseEarliestAttributableAuthorEstablished: false,
      exactNonDayMasterCaseEarliestPublicationEstablished: false,
      exactNonDayMasterCaseBookOrPrintedSourceEstablished: false,
      exactNonDayMasterCaseSharesSongKun2011LineageEstablished: false,
      directCaseProvenanceStillOpen: true,
    });
  });

  it('regression-locks provenance shortcuts', () => {
    expect(R185_AUTHORITY_BOUNDARY).toEqual({
      earliestAttributableSurfaceDoesNotEqualFirstPublication: true,
      displayedNameDoesNotEqualVerifiedOriginalAuthor: true,
      repostLectureLabelDoesNotEqualOriginalLectureManuscript: true,
      duplicateTextDoesNotEqualIndependentCorroboration: true,
      2011ModernSurfaceDoesNotEqualClassicalCanonicalAuthority: true,
      ruleFamilyLineageDoesNotTransferToDirectCaseWithoutEvidence: true,
      provenanceProgressDoesNotEqualSemanticAdmission: true,
    });
    expect(R185_REJECTED_SHORTCUTS).toContain(
      'EARLIEST_FOUND_WEB_SURFACE_EQUALS_FIRST_PUBLICATION',
    );
    expect(R185_REQUIRED_FOLLOW_UP).toContain(
      'TRACE_READ01_DIRECT_NON_DAY_MASTER_CASE_TO_EARLIEST_SOURCE',
    );
  });

  it('keeps semantic and production authority closed', () => {
    expect(R185_AUTHORITY).toMatchObject({
      researchOnly: true,
      earliestAttributablePublicSurfaceCandidateEstablished: true,
      displayedAttributionNameAvailable: true,
      displayedDateAvailable: true,
      laterLectureManuscriptLabelAvailable: true,
      originalAuthorEstablished: false,
      firstPublicationEstablished: false,
      originalHostEstablished: false,
      originalLectureManuscriptAcquired: false,
      printedWitnessEstablished: false,
      independentLineageEstablished: false,
      directNonDayMasterCaseProvenanceResolved: false,
      primaryOrCanonicalDirectMatchAuthorityObserved: false,
      pairLocalNormativeAuthorityAcquired: false,
      pairLocalInteractionOutcomeEstablished: false,
      coexistenceSettlementEstablished: false,
      exactContextSettlementEstablished: false,
      crossRelationPrecedenceAuthorized: false,
      executableResolverAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
