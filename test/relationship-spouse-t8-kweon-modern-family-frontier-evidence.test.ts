import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_KWEON_MODERN_FAMILY_FRONTIER_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_KWEON_MODERN_FAMILY_FRONTIER_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_KWEON_MODERN_FAMILY_FRONTIER_EVIDENCE_VERSION,
  buildRelationshipSpouseT8KweonModernFamilyFrontierEvidence,
} from '../src/research/relationship-spouse-t8-kweon-modern-family-frontier-evidence.js';
import { buildRelationshipSpouseT8ModernRoleRemappingFrontierEvidence } from '../src/research/relationship-spouse-t8-modern-role-remapping-frontier-evidence.js';

describe('Relationship spouse T8 Kweon modern-family frontier evidence', () => {
  test('records the strongest same-source modern-family spouse-palace signal without relabeling abstract as body', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_KWEON_MODERN_FAMILY_FRONTIER_CANDIDATE;

    expect(candidate.inspectedPublicSurface).toBe('SCHOLARLY_METADATA_ABSTRACT_TOC');
    expect(candidate.directFullTextObjectInspected).toBe(false);
    expect(candidate.pdfScreenshotReviewed).toBe(false);
    expect(candidate.sameSourceModernFamilyScopeExplicit).toBe(true);
    expect(candidate.sameSexCohabitationFamilyExplicit).toBe(true);
    expect(candidate.spousePalaceDayBranchConnectionExplicitOnPublicSurface).toBe(true);
  });

  test('does not convert same-sex family scope plus Day-Branch spouse-palace language into an operational selector', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_KWEON_MODERN_FAMILY_FRONTIER_CANDIDATE;

    expect(candidate.spouseTenGodSelectorExplicitOnPublicSurface).toBe(false);
    expect(candidate.completeOperationalSpouseRuleExplicitOnPublicSurface).toBe(false);
    expect(candidate.explicitRoleNeutralNatalSpouseSelectorEstablished).toBe(false);
    expect(candidate.pureNatalInputContractEstablished).toBe(false);
    expect(candidate.canonicalLosslessFitEstablished).toBe(false);
    expect(candidate.exactAdmissionBoundary).toMatch(/metadata\/abstract\/TOC/i);
    expect(candidate.exactAdmissionBoundary).toMatch(/which Ten-God selects a same-sex partner/i);
  });

  test('locks the actual-body targets that can materially change the authority verdict', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_KWEON_MODERN_FAMILY_FRONTIER_CANDIDATE;

    expect(candidate.targetBodySections).toEqual([
      'IV.1.1 남녀의 존비 관계에서 상대적 관계로의 변화 — p.48',
      'IV.3.2 혼인관의 인식 전환 — p.78',
      'IV.3.3 혼인 형태의 변화 — p.82',
      'V. 결론 — p.85',
    ]);
    expect(candidate.bodyQuestions).toHaveLength(5);
    expect(candidate.nextAction).toMatch(/pp\.48, 78, 82, and 85/i);
  });

  test('keeps all post-primary authority and production gates fail-closed', () => {
    const report = buildRelationshipSpouseT8KweonModernFamilyFrontierEvidence();

    expect(report.directFullTextCandidateCount).toBe(0);
    expect(report.sameSexCohabitationFamilySurfaceFound).toBe(true);
    expect(report.spousePalaceDayBranchSurfaceFound).toBe(true);
    expect(report.operationalRoleNeutralSpouseSelectorEstablished).toBe(false);
    expect(report.independentNormativeProvenanceForCurrentSpouseMethodEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.qualifyingPrimaryWitnessGapRemainsClosed).toBe(true);
    expect(report.authorityGapsClosedCount).toBe(1);
    expect(report.authorityGapsOpenCount).toBe(4);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.sexualOrientationInferenceAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
  });

  test('chains deterministically from the modern role-remapping frontier layer', () => {
    const upstream = buildRelationshipSpouseT8ModernRoleRemappingFrontierEvidence();
    const first = buildRelationshipSpouseT8KweonModernFamilyFrontierEvidence();
    const second = buildRelationshipSpouseT8KweonModernFamilyFrontierEvidence();
    const { evidenceId, ...material } = first;

    expect(first.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_KWEON_MODERN_FAMILY_FRONTIER_EVIDENCE_VERSION,
    );
    expect(first.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_kweon_modern_family_frontier_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_KWEON_MODERN_FAMILY_FRONTIER_CONTROL_IDS,
    );
    expect(first.controlCount).toBe(13);
    expect(first.recommendedNextAction).toBe(
      'ACQUIRE_KWEON_2021_BODY_P48_P78_P82_P85_THEN_TEST_SAME_SOURCE_ROLE_NEUTRAL_SPOUSE_PALACE_AND_SELECTOR_INPUT_CONTRACT',
    );
  });
});
