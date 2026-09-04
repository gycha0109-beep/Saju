import { describe, expect, it } from 'vitest';
import type { SquareBroadFangSourceLineageConstructRefinementFR141V1 } from './five-officers-square-broad-fang-source-lineage-construct-refinement-fr141.js';
import {
  assertIssuedSquareBroadFangSourceLineageConstructRefinementFR141,
  assessSquareBroadFangSourceLineageConstructRefinementFR141,
} from './five-officers-square-broad-fang-source-lineage-construct-refinement-fr141.js';
import { getSquareBroadNeutralShapeMetricDefinitionsFR134 } from './five-officers-square-broad-neutral-shape-metric-runtime-fr134.js';
import { FaceAuthorityValidationError } from './validation.js';

describe('FR141 square-broad 方 source-lineage construct refinement hardening', () => {
  it('rejects a forged issued artifact', () => {
    const issued = assessSquareBroadFangSourceLineageConstructRefinementFR141();
    const forged = {
      ...issued,
      target: { ...issued.target },
    } as SquareBroadFangSourceLineageConstructRefinementFR141V1;

    expect(() => assertIssuedSquareBroadFangSourceLineageConstructRefinementFR141(forged)).toThrow(
      FaceAuthorityValidationError,
    );
  });

  it('does not let later commentary collapse a lineage conflict into an equivalence', () => {
    const result = assessSquareBroadFangSourceLineageConstructRefinementFR141();

    expect(result.sourceLineageFindings.taxonomyConflictPresent).toBe(true);
    expect(result.sourceLineageFindings.fangEqualsSiziKouEstablished).toBe(false);
    expect(result.sourceLineageFindings.fourCornerFangLengIsPrimaryTargetDefinition).toBe(false);
    expect(result.evidenceBoundary.laterCommentaryMayOverridePrimaryTargetPassage).toBe(false);
  });

  it('does not promote web or illustration research into governed source authority', () => {
    const result = assessSquareBroadFangSourceLineageConstructRefinementFR141();

    expect(result.evidenceBoundary.externalResearchSourcesAreAuthorityRegistryEntries).toBe(false);
    expect(result.evidenceBoundary.externalResearchSourcesAutomaticallyAmendReviewedMethodology).toBe(false);
    expect(result.evidenceBoundary.modernInternetIllustrationsAreGroundTruthLabels).toBe(false);
  });

  it('preserves FR134 metric definitions as neutral and unbound', () => {
    const before = getSquareBroadNeutralShapeMetricDefinitionsFR134();
    assessSquareBroadFangSourceLineageConstructRefinementFR141();
    const after = getSquareBroadNeutralShapeMetricDefinitionsFR134();

    expect(after).toEqual(before);
    expect(after).toHaveLength(2);
    for (const metric of after) {
      expect(metric.traditionalCriterionBindingRef).toBeNull();
      expect(metric.calibrationRef).toBeNull();
    }
  });

  it('does not confuse reclassification with implementation or binding', () => {
    const result = assessSquareBroadFangSourceLineageConstructRefinementFR141();

    expect(result.implementationGap.upperLowerContourCorrespondenceMetricImplemented).toBe(false);
    expect(result.implementationGap.localizedCornerDistinctnessMetricImplemented).toBe(false);
    expect(result.implementationGap.rectilinearSegmentPersistenceMetricImplemented).toBe(false);
    expect(result.implementationGap.sourceGroundedCandidateMetricFamilyImplemented).toBe(false);
    expect(result.execution.newNeutralMetricDefinitionsIssued).toBe(0);
    expect(result.execution.traditionalMetricBindingsIssued).toBe(0);
    expect(result.execution.thresholdsIssued).toBe(0);
  });

  it('does not reopen human collection or invent reviewer mechanics', () => {
    const result = assessSquareBroadFangSourceLineageConstructRefinementFR141();

    expect(result.humanReviewTrack.reviewerActorAssignmentDeferred).toBe(true);
    expect(result.humanReviewTrack.collectionAuthorizationPresent).toBe(false);
    expect(result.humanReviewTrack.humanSemanticCollectionAuthorized).toBe(false);
    expect(result.humanReviewTrack.empiricalSemanticEvidenceAcquisitionAuthorized).toBe(false);
    expect(result.execution.criterionStatesIssued).toBe(0);
    expect(result.execution.structuredClaimsIssued).toBe(0);
    expect(result.execution.boundedNarrativesIssued).toBe(0);
    expect(result.execution.traditionalSemanticAuthority).toBe(false);
  });
});
