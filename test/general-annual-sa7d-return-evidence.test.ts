import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildGeneralAnnualResearchReturnHandoff } from '../src/research/general-annual-research-return-handoff.js';
import { buildGeneralAnnualAtomicSourceAcquisition } from '../src/research/general-annual-atomic-semantic-source-acquisition.js';
import { buildGeneralAnnualBranchClashAdjudication } from '../src/research/general-annual-branch-clash-adjudication.js';
import {
  GENERAL_ANNUAL_SA7D_RETURN_EVIDENCE_VERSION,
  buildGeneralAnnualSA7DResearchReturnEvidence,
} from '../src/research/general-annual-sa7d-return-evidence.js';

describe('SA-7D Research-only General Annual evidence return', () => {
  const evidence = buildGeneralAnnualSA7DResearchReturnEvidence();

  test('references the same governed candidate, acquisition, and four-clash adjudication', () => {
    const upstream = buildGeneralAnnualResearchReturnHandoff();
    const atomic = buildGeneralAnnualAtomicSourceAcquisition();
    const clash = buildGeneralAnnualBranchClashAdjudication();

    expect(evidence.version).toBe(GENERAL_ANNUAL_SA7D_RETURN_EVIDENCE_VERSION);
    expect(evidence.provenance.upstreamHandoffHash).toBe(upstream.handoffHash);
    expect(evidence.provenance.candidateSurfaceHash)
      .toBe(upstream.candidateBinding.candidateSurfaceHash);
    expect(evidence.provenance.atomicAcquisitionId).toBe(atomic.acquisitionId);
    expect(evidence.provenance.branchClashAdjudicationId).toBe(clash.adjudicationId);
    expect(evidence.provenance.themeAdjudicationPr).toBe('#2417');
    expect(evidence.provenance.branchClashAdjudicationPr).toBe('#2420');
    expect(evidence.provenance.primaryWitnessPdfPageOneBased).toBe(25);
    expect(evidence.provenance.candidateVersion).toBe('0.1.0-research');
  });

  test('preserves all fourteen independently adjudicated decisions and unresolved evidence', () => {
    expect(evidence.evidence.currentThemeDecisionCount).toBe(10);
    expect(evidence.evidence.currentBranchClashDecisionCount).toBe(4);
    expect(evidence.evidence.currentThemeDecisions).toHaveLength(10);
    expect(evidence.evidence.annualBranchClashDecisions).toHaveLength(4);
    expect(new Set(evidence.evidence.unresolvedModernAnnualThemeKeys).size).toBe(10);
    expect(new Set(evidence.evidence.unresolvedAnnualClashMeaningKeys).size).toBe(4);

    for (const decision of [
      ...evidence.evidence.currentThemeDecisions,
      ...evidence.evidence.annualBranchClashDecisions,
    ]) {
      expect(decision.sourceRefs.length).toBeGreaterThan(0);
      expect(decision.unresolvedEvidence.length).toBeGreaterThan(0);
      expect(decision.sourceSupportGrade).toBe('INSUFFICIENT');
      expect(decision.productionAuthorization).toBe(false);
    }
    expect(evidence.evidence.directlyWitnessedTenGodIdentities).toEqual(['편재', '편관']);
    expect(evidence.evidence.currentThemeDecisions.filter(
      (decision) => decision.semanticDisposition === 'REPLACE',
    )).toHaveLength(2);
    expect(evidence.evidence.currentThemeDecisions.filter(
      (decision) => decision.semanticDisposition === 'REQUIRES_SEPARATE_DIRECT_SUPPORT',
    )).toHaveLength(8);
    expect(evidence.evidence.annualBranchClashDecisions.every(
      (decision) => decision.semanticDisposition === 'REQUIRES_SEPARATE_DIRECT_SUPPORT',
    )).toBe(true);
  });

  test('returns evidence, never authority, bridge admission, or monthly inheritance', () => {
    expect(evidence.decision).toMatchObject({
      disposition: 'RETURN_RESEARCH_EVIDENCE_WITH_UNRESOLVED_SEMANTIC_GAPS',
      researchAdjudicationRecorded: true,
      candidateCodeMutated: false,
      candidateSemanticsAdmitted: false,
      governedFullTenGodTaxonomyEstablishedByTwoExamples: false,
      bridgeReentryReady: false,
      highestPermittedFutureState: 'READY_FOR_BRIDGE_REREVIEW',
      authorityPromotionsGranted: false,
      annualToMonthlyAuthorityGranted: false,
      engineAuthorized: false,
      previewAuthorized: false,
      officialReadingAuthorized: false,
      productionAuthorized: false,
      production: 'HOLD',
    });
    expect(evidence.evidence.classicalExampleSupportIsExhaustiveTaxonomy).toBe(false);
    expect(evidence.evidence.currentlyQualifiedAnnualClashTension).toBe(false);
    expect(evidence.evidence.currentlyQualifiedPillarSpecificEmphasis).toBe(false);
    expect(evidence.prohibitedExtensions).toContain(
      'NO_BRIDGE_ENGINE_PREVIEW_OFFICIAL_READING_OR_PRODUCTION_PROMOTION',
    );
  });

  test('is deterministic and content addressed without creating a new authority registry', () => {
    const again = buildGeneralAnnualSA7DResearchReturnEvidence();
    const { evidenceId, ...material } = evidence;

    expect(evidenceId).toBe(deterministicContentHash(material));
    expect(evidenceId).toBe(again.evidenceId);
    expect(evidenceId).toMatch(/^[a-f0-9]{64}$/);
  });
});
