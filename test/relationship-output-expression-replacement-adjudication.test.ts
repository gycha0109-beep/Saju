import { describe, expect, it } from 'vitest';
import {
  RELATIONSHIP_OUTPUT_EXPRESSION_ADJUDICATION_SOURCES,
  RELATIONSHIP_OUTPUT_EXPRESSION_EXCLUDED_STITCHING_EVIDENCE,
  buildRelationshipOutputExpressionReplacementAdjudication,
} from '../src/research/relationship-output-expression-replacement-adjudication.js';

describe('Relationship Output expression replacement adjudication', () => {
  it('binds exactly to the non-admitted Output expression lead', () => {
    const result =
      buildRelationshipOutputExpressionReplacementAdjudication();

    expect(result.leadId).toBe('OUTPUT_EXPRESSION_AXIS_ONLY');
    expect(result.exactLeadBound).toBe(true);
  });

  it('records bounded expression support without Relationship outcome authority', () => {
    const result =
      buildRelationshipOutputExpressionReplacementAdjudication();

    expect(RELATIONSHIP_OUTPUT_EXPRESSION_ADJUDICATION_SOURCES).toHaveLength(3);
    expect(result.findings.outputExpressionAxisSupported).toBe(true);
    expect(result.findings.modernRelationshipReinterpretationRequired).toBe(
      true,
    );
    expect(result.findings.exactRelationshipMappingEstablished).toBe(false);
    expect(result.findings.relationshipConnectionOutcomeEstablished).toBe(false);
    expect(result.findings.suppressionFrustrationOutcomeEstablished).toBe(false);
  });

  it('forbids filling the missing Myeongli mapping with general psychology evidence', () => {
    const result =
      buildRelationshipOutputExpressionReplacementAdjudication();

    expect(
      RELATIONSHIP_OUTPUT_EXPRESSION_EXCLUDED_STITCHING_EVIDENCE,
    ).toHaveLength(1);
    expect(
      result.excludedStitchingEvidence[0]
        ?.mayBeStitchedToOutputExpressionEvidence,
    ).toBe(false);
    expect(
      result.findings.generalPsychologyOutcomeEvidenceMayFillMyeongliMappingGap,
    ).toBe(false);
    expect(result.findings.crossSourceStitchingWouldBeRequired).toBe(true);
  });

  it('abandons this lead as a Relationship replacement path', () => {
    const result =
      buildRelationshipOutputExpressionReplacementAdjudication();

    expect(result.findings.relationshipReplacementViable).toBe(false);
    expect(result.decision.adjudicationComplete).toBe(true);
    expect(result.decision.disposition).toBe(
      'ABANDON_AS_RELATIONSHIP_REPLACEMENT_LEAD',
    );
    expect(
      result.decision.genericOutputExpressionResearchMayContinueOutsideRelationship,
    ).toBe(true);
    expect(result.decision.nextAuthoritySeekingRevisionShouldCarryThisLead).toBe(
      false,
    );
  });

  it('leaves exactly the conditional Peer+Wealth lead for Relationship replacement research', () => {
    const result =
      buildRelationshipOutputExpressionReplacementAdjudication();

    expect(result.remainingRelationshipReplacementLeadsAfterThisAdjudication).toEqual([
      'CONDITIONAL_PEER_WEALTH_RESOURCE_COMPETITION_WITH_EXPLICIT_CONTEXT',
    ]);
  });

  it('grants no runtime or downstream authority', () => {
    const result =
      buildRelationshipOutputExpressionReplacementAdjudication();

    expect(result.decision.currentRevisionMutationAuthorizedByThisArtifact).toBe(
      false,
    );
    expect(result.decision.runtimeMutationAuthorized).toBe(false);
    expect(result.decision.previewMutationAuthorized).toBe(false);
    expect(result.decision.bridgeAdmissionAuthorized).toBe(false);
    expect(result.decision.g2aAdmissionAuthorized).toBe(false);
    expect(result.authorityBoundary.production).toBe('HOLD');
  });

  it('is deterministic', () => {
    const left =
      buildRelationshipOutputExpressionReplacementAdjudication();
    const right =
      buildRelationshipOutputExpressionReplacementAdjudication();

    expect(left).toEqual(right);
    expect(left.adjudicationId).toBe(right.adjudicationId);
    expect(left.adjudicationId).toMatch(
      /^relationship_output_expression_replacement_adjudication_[a-f0-9]{24}$/,
    );
  });
});
