import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8NamKim2018DirectBodyBoundaryEvidence } from '../src/research/relationship-spouse-t8-nam-kim-2018-direct-body-boundary-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_GO_JAEMIN_2016_GENDER_CONDITIONED_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_GO_JAEMIN_2016_GENDER_CONDITIONED_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_GO_JAEMIN_2016_GENDER_CONDITIONED_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8GoJaemin2016GenderConditionedBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-go-jaemin-2016-gender-conditioned-boundary-evidence.js';

describe('Relationship spouse T8 Go Jaemin 2016 gender-conditioned boundary evidence', () => {
  test('pins exact scholarly and RISS/dCollection identity', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_GO_JAEMIN_2016_GENDER_CONDITIONED_BOUNDARY_CANDIDATE;
    expect(candidate.author).toBe('고재민');
    expect(candidate.publicationYear).toBe(2016);
    expect(candidate.title).toBe('四柱命理의 宮星과 格局用神論 硏究');
    expect(candidate.institution).toBe('대구한의대학교 대학원');
    expect(candidate.department).toBe('동양철학과');
    expect(candidate.degree).toBe('박사');
    expect(candidate.rissId).toBe('T14040293');
    expect(candidate.rissControl).toBe('01535e75dd09ae73ffe0bdc3ef48d419');
    expect(candidate.rissDocControlNo).toBe('14040293');
    expect(candidate.rissDocType).toBe('T');
    expect(candidate.nationalLibraryLocalBibno).toBe('KDM201705404');
    expect(candidate.dcollectionItemId).toBe('000002241914');
    expect(candidate.directBodyAcquisitionPr).toBe(417);
  });

  test('pins the exact acquisition artifact and complete PDF content address', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_GO_JAEMIN_2016_GENDER_CONDITIONED_BOUNDARY_CANDIDATE;
    expect(candidate.acquisitionExactHead).toBe('2f4f8d32184b327e0942c0efa00e2577976d42b4');
    expect(candidate.acquisitionRunId).toBe(34466543969);
    expect(candidate.acquisitionArtifactId).toBe(10147829019);
    expect(candidate.acquisitionArtifactDigest).toBe(
      'sha256:4cbe93aba79f794f45e68a9b5dba2cd43164e62d70d6d250bf143ed34a3acdc7',
    );
    expect(candidate.rissReturnedPublicDownloadUri).toBe(
      'http://dhu.dcollection.net/jsp/common/SvcOrgDownLoad.jsp?item_id=000002241914',
    );
    expect(candidate.pdfSha256).toBe('cec0ba5dabd64087ce3ca7b0cc1f86fcac5bb0354b63f9ce3f4c45c8cb8155f7');
    expect(candidate.pdfBytes).toBe(2_225_865);
    expect(candidate.pdfPageCount).toBe(196);
    expect(candidate.pdfEncrypted).toBe(false);
    expect(candidate.allPdfPagesRenderedBeforeSemanticJudgment).toBe(true);
    expect(candidate.materialPagesVisuallyReviewed).toBe(true);
  });

  test('keeps the acquisition route bounded and records the transport-only TLS workaround precisely', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_GO_JAEMIN_2016_GENDER_CONDITIONED_BOUNDARY_CANDIDATE;
    expect(candidate.rissCandidatePageAuthoredPostContractsFollowed).toBe(true);
    expect(candidate.rissReturnedDcollectionUriFollowedWithoutIdentifierGuessing).toBe(true);
    expect(candidate.transportTlsVerificationDisabledOnlyForExactPublicUri).toBe(true);
    expect(candidate.loginBypass).toBe(false);
    expect(candidate.institutionAuthBypass).toBe(false);
    expect(candidate.paywallBypass).toBe(false);
    expect(candidate.drmRequestExecuted).toBe(false);
    expect(candidate.decryptionActionExecuted).toBe(false);
    expect(candidate.accessControlBypass).toBe(false);
  });

  test('pins decisive physical PDF page locators', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_GO_JAEMIN_2016_GENDER_CONDITIONED_BOUNDARY_CANDIDATE;
    expect(candidate.physicalPdfPageMap).toContainEqual({
      physicalPdfPage: 56,
      topic:
        'Day Branch is explicitly treated as spouse palace in a traditional family-role allocation table',
    });
    expect(candidate.physicalPdfPageMap).toContainEqual({
      physicalPdfPage: 89,
      topic:
        'the body explicitly states 財星은 乾命에 있어서는 아내를 의미하게 된다, mapping Wealth to wife in a male Qian native',
    });
    expect(candidate.physicalPdfPageMap).toContainEqual({
      physicalPdfPage: 120,
      topic:
        'the female Kun-native counterpart explicitly uses Officer star as husband rather than publishing one sex-independent spouse selector',
    });
  });

  test('preserves the sex-common location layer but rejects a role-neutral selector promotion', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_GO_JAEMIN_2016_GENDER_CONDITIONED_BOUNDARY_CANDIDATE;
    expect(candidate.dayBranchSpousePalaceExplicit).toBe(true);
    expect(candidate.wifePalaceAtDayPositionExplicit).toBe(true);
    expect(candidate.sexCommonLocationLayerExists).toBe(true);
    expect(candidate.sexCommonLocationLayerReplacesSexConditionedStarSelector).toBe(false);
    expect(candidate.maleQianNativeWealthAsWifeExplicit).toBe(true);
    expect(candidate.femaleKunNativeOfficerAsHusbandExplicit).toBe(true);
    expect(candidate.woKeZheWeiQiQieWifeConcubineRuleExplicit).toBe(true);
    expect(candidate.nativeSexConditionedSpouseMappingExplicit).toBe(true);
    expect(candidate.nativeSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.partnerSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.pureNatalRoleNeutralSpouseSelectorFound).toBe(false);
    expect(candidate.completeRoleNeutralNatalInputContractFound).toBe(false);
    expect(candidate.exactNegativeBoundary).toMatch(/sex-conditioned spouse selection/i);
  });

  test('chains from Nam/Kim 2018 without changing the accepted two-of-five ledger', () => {
    const upstream = buildRelationshipSpouseT8NamKim2018DirectBodyBoundaryEvidence();
    const report = buildRelationshipSpouseT8GoJaemin2016GenderConditionedBoundaryEvidence();
    expect(upstream.status).toBe(
      'DIRECT_FULLTEXT_CONFIRMS_SPOUSE_PALACE_PRIORITY_WITH_SEX_CONDITIONED_SPOUSE_STARS_AND_DYADIC_INPUT',
    );
    expect(report.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.directFulltextPdfInspected).toBe(true);
    expect(report.spousePalaceLocationLayerConfirmed).toBe(true);
    expect(report.nativeSexConditionedSpouseMappingConfirmed).toBe(true);
    expect(report.explicitRoleNeutralNatalMappingEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.qualifyingPrimaryWitnessRemainsClosed).toBe(true);
    expect(report.independentNormativeProvenanceRemainsClosed).toBe(true);
    expect(report.authorityGapsClosedCount).toBe(2);
    expect(report.authorityGapsOpenCount).toBe(3);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.productionState).toBe('HOLD');
  }, 20_000);

  test('keeps no-stitching and all producer/production gates fail-closed', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_GO_JAEMIN_2016_GENDER_CONDITIONED_BOUNDARY_CANDIDATE;
    const report = buildRelationshipSpouseT8GoJaemin2016GenderConditionedBoundaryEvidence();
    expect(candidate.noStitchingBoundary).toMatch(/not combined with Nam\/Kim 2018/i);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_GO_JAEMIN_2016_GENDER_CONDITIONED_BOUNDARY_CONTROL_IDS,
    );
    expect(report.controlCount).toBe(
      RELATIONSHIP_SPOUSE_T8_GO_JAEMIN_2016_GENDER_CONDITIONED_BOUNDARY_CONTROL_IDS.length,
    );
  });

  test('is deterministically content-addressed', () => {
    const first = buildRelationshipSpouseT8GoJaemin2016GenderConditionedBoundaryEvidence();
    const second = buildRelationshipSpouseT8GoJaemin2016GenderConditionedBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(first.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_GO_JAEMIN_2016_GENDER_CONDITIONED_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(first.status).toBe(
      'DIRECT_FULLTEXT_CONFIRMS_GENDER_CONDITIONED_SPOUSE_MAPPING_WITHOUT_ROLE_NEUTRAL_NATAL_SELECTOR',
    );
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_go_jaemin_2016_gender_conditioned_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_DISCOVERY_WITH_NATIVE_AND_PARTNER_SEX_INDEPENDENCE_REQUIRED',
    );
  }, 20_000);
});
