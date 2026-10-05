import { describe, expect, it } from 'vitest';

import {
  R187_AUTHORITY,
  R187_AUTHORITY_BOUNDARY,
  R187_PROVENANCE_CLASSIFICATION,
  R187_READ01_SIZHU_BOGUAN_PROVENANCE_VERSION,
  R187_READ01_SURFACE,
  R187_REJECTED_SHORTCUTS,
  R187_REQUIRED_FOLLOW_UP,
  R187_SECTION_STRUCTURE_MATCH,
  R187_SIZHU_BOGUAN_WORK_CANDIDATE,
  R187_SOURCE_FAMILY_REASSESSMENT,
} from '../src/research/general-natal-predicate-candidate-jia-ji-read01-sizhu-boguan-provenance.js';

describe('R187 Read01 Jia-Ji direct-case SizhU Boguan provenance', () => {
  it('preserves the Read01 exact non-day-master case and displayed source label', () => {
    expect(R187_READ01_SIZHU_BOGUAN_PROVENANCE_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R187_READ01_SURFACE).toMatchObject({
      articleTitle: '命理基础——合、刑、冲、克的相互制约',
      displayedPublicationDate: '2015-08-26',
      displayedSourceLabel: '星座123',
      exactNonDayMasterJiaJiCaseObserved: true,
      dayStem: '庚',
      pair: ['甲', '己'],
      bothPairParticipantsNonDayMaster: true,
      combinationLanguageObserved: true,
      controllerControlledLanguageObserved: true,
      differentiatedFunctionalLossLanguageObserved: true,
      originalAuthorEstablished: false,
      firstPublicationEstablished: false,
    });
  });

  it('binds the 2004 first-edition named-work metadata candidate', () => {
    expect(R187_SIZHU_BOGUAN_WORK_CANDIDATE).toEqual({
      candidateId: 'R187-W01-SIZHU-BOGUAN-2004-FIRST-EDITION',
      workTitle: '四柱博观',
      displayedResponsibility: '张志春主编　凌志轩编',
      displayedPageCount: 530,
      displayedSsNumber: '11570065',
      displayedEditionDate: '2004-06',
      displayedEditionLabel: '第1版',
      metadataSurfaceUrl:
        'https://pdfcoffee.com/tu-tru-bac-quan-lang-chi-hien-chiennguyen--pdf-free.html',
      formalLibraryCatalogRecordBound: false,
      physicalCopyrightPageBound: false,
      publisherImprintBound: false,
      classicalOrCanonicalWork: false,
    });
  });

  it('captures the exact section hierarchy match without claiming body identity', () => {
    expect(R187_SECTION_STRUCTURE_MATCH).toEqual({
      bookChapter: '第五章　重点操作原理',
      bookSection: '第一节　关于合、冲、刑、生、克、破、害',
      bookSubsection: '五、合、刑、冲、生、克的相互制约',
      bookNestedSections: [
        '（一）合力与分力',
        '（二）合、刑、冲、生、克的相互作用',
      ],
      read01TitleMatchesBookSubsectionTopic: true,
      read01BodyUsesHeLiFenLiSubdivision: true,
      read01BodyUsesInteractionSubdivision: true,
      sectionHierarchyMatchEstablished: true,
      exactCaseTextCollatedAgainstBookBody: false,
      fullBodyTextualIdentityEstablished: false,
      directCopyChainEstablished: false,
    });
  });

  it('advances the direct-case provenance from anonymous web-only to a named-work source-family candidate', () => {
    expect(R187_SOURCE_FAMILY_REASSESSMENT).toEqual({
      upstreamDirectCaseProvenancePreviouslyOpen: true,
      upstreamR186DirectCaseProvenanceStillOpen: true,
      namedWorkSourceFamilyCandidateNowAvailable: true,
      namedWorkYearCandidate: 2004,
      read01DisplayedYear: 2015,
      chronologyOrderEstablishedAtYearGranularity: true,
      sourceFamilyCandidateEarlierThanRead01: true,
      exactCaseBodyPhysicalCollationComplete: false,
      exactCaseBookPageBound: false,
      exactCaseAuthorialOriginEstablished: false,
      directCaseProvenanceFullyResolved: false,
    });
  });

  it('classifies structural provenance progress separately from authority', () => {
    expect(R187_PROVENANCE_CLASSIFICATION).toEqual({
      read01SurfaceClassification:
        'LATER_WEB_TRANSMISSION_WITH_DISPLAYED_SOURCE_LABEL',
      sizhuBoguanClassification:
        'EARLIER_NAMED_WORK_SOURCE_FAMILY_CANDIDATE',
      relationshipClassification:
        'STRUCTURAL_SECTION_MATCH_WITHOUT_BODY_COLLATION',
      provenanceConfidenceAdvance: true,
      normativeAuthorityAdvance: false,
    });
  });

  it('regression-locks provenance shortcuts', () => {
    expect(R187_AUTHORITY_BOUNDARY).toEqual({
      sectionTitleMatchDoesNotEqualExactCaseIdentity: true,
      sectionHierarchyMatchDoesNotEqualDirectCopyChain: true,
      bookMetadataSurfaceDoesNotEqualPhysicalCopyrightPage: true,
      namedWorkCandidateDoesNotEqualPrimaryCaseWitness: true,
      displayedSourceLabelDoesNotEstablishOriginalAuthor: true,
      chronologyDoesNotEstablishDerivation: true,
      modernNamedWorkDoesNotEqualClassicalCanonicalAuthority: true,
      provenanceCandidateDoesNotEqualSemanticOutcomeAuthority: true,
    });
    expect(R187_REJECTED_SHORTCUTS).toContain(
      'MATCHING_SECTION_TITLE_EQUALS_EXACT_CASE_SOURCE',
    );
    expect(R187_REQUIRED_FOLLOW_UP).toContain(
      'COLLATE_READ01_EXACT_JIA_JI_CASE_AGAINST_SIZHU_BOGUAN_BODY',
    );
  });

  it('keeps exact direct-case and production authority closed', () => {
    expect(R187_AUTHORITY).toMatchObject({
      researchOnly: true,
      read01ExactNonDayMasterDirectCasePreserved: true,
      read01DisplayedSourceLabelPreserved: true,
      earlierNamedWorkSourceFamilyCandidateEstablished: true,
      sectionHierarchyMatchEstablished: true,
      exactCaseBodyCollationComplete: false,
      exactCasePhysicalPageBound: false,
      exactCaseBookPageBound: false,
      directCopyChainEstablished: false,
      exactCaseAuthorialOriginEstablished: false,
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
