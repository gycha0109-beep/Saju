import { describe, expect, it } from 'vitest';
import {
  assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128,
  assertIssuedFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128,
  type FiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128V1,
} from './five-officers-intake-methodology-review-governance-trust-anchor-admission-fr128.js';
import { CENTRAL_CHIN_EXTERNAL_PROVENANCE_VERIFICATION_AUTHORITY_FR59 } from './central-chin-external-provenance-verification-fr59.js';

describe('FR128 methodology review governance trust-anchor admission hardening', () => {
  it('rejects a forged issued artifact even when visible fields are copied', () => {
    const issued = assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128();
    const forged = structuredClone(issued) as FiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128V1;
    expect(() => assertIssuedFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128(forged)).toThrow(/FR-128/);
  });

  it('forbids actor and evidence-policy self-bootstrap authority', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128();
    expect(value.rootGovernanceRequirements.actorMaySelfAuthorizeOwnProvenance).toBe(false);
    expect(value.rootGovernanceRequirements.evidencePolicyMaySelfAdmitOwnProvenance).toBe(false);
    expect(value.rootGovernanceRequirements.targetActorRegistryMayBeSoleRootOfActorLegitimacy).toBe(false);
    expect(value.rootGovernanceRequirements.targetEvidencePolicyRegistryMayBeSoleRootOfPolicyLegitimacy).toBe(false);
    expect(value.authorityBoundary.actorMayBootstrapOwnReviewAuthority).toBe(false);
    expect(value.authorityBoundary.evidencePolicyMayBootstrapOwnAdmissionAuthority).toBe(false);
    expect(value.authorityBoundary.circularRegistryLegitimacyMeansIndependentGovernance).toBe(false);
  });

  it('does not reinterpret FR59 cryptographic provenance as methodology-review root governance', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128();
    expect(CENTRAL_CHIN_EXTERNAL_PROVENANCE_VERIFICATION_AUTHORITY_FR59.authorityState).toBe(
      'external_provenance_byte_and_signature_verification_contract_defined_no_pinned_external_trust_root',
    );
    expect(CENTRAL_CHIN_EXTERNAL_PROVENANCE_VERIFICATION_AUTHORITY_FR59.protocol.pinnedExternalTrustRootDefinedByThisSlice).toBe(false);
    expect(CENTRAL_CHIN_EXTERNAL_PROVENANCE_VERIFICATION_AUTHORITY_FR59.protocol.externalGovernanceIdentityVerifiedByThisSlice).toBe(false);
    expect(value.currentRootGovernance.fr59PinnedExternalTrustRootDefined).toBe(false);
    expect(value.currentRootGovernance.fr59ExternalGovernanceIdentityVerified).toBe(false);
    expect(value.rootGovernanceRequirements.fr59ExternalProviderProvenanceMaySubstituteForMethodologyReviewTrustAnchor).toBe(false);
    expect(value.authorityBoundary.fr59ExternalProviderProvenanceTrustMeansMethodologyReviewGovernanceRoot).toBe(false);
  });

  it('forbids operational, repository, source-verification, and legacy shortcuts to root governance', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128();
    expect(value.rootGovernanceRequirements.sourceVerificationCheckerMaySubstituteForTrustAnchor).toBe(false);
    expect(value.rootGovernanceRequirements.gitHubIdentityMaySubstituteForTrustAnchor).toBe(false);
    expect(value.rootGovernanceRequirements.pullRequestMergeMaySubstituteForTrustAnchor).toBe(false);
    expect(value.rootGovernanceRequirements.pieOperationalReadinessMaySubstituteForTrustAnchor).toBe(false);
    expect(value.rootGovernanceRequirements.legacyReviewedScalarMaySubstituteForTrustAnchor).toBe(false);
    expect(value.authorityBoundary.sourceVerificationCheckerMeansMethodologyReviewTrustAnchor).toBe(false);
    expect(value.authorityBoundary.repositoryIdentityMeansMethodologyReviewTrustAnchor).toBe(false);
    expect(value.authorityBoundary.pullRequestMergeMeansMethodologyReviewTrustAnchor).toBe(false);
    expect(value.authorityBoundary.pieOperationalReadinessMeansMethodologyReviewTrustAnchor).toBe(false);
    expect(value.authorityBoundary.legacyReviewedScalarMeansMethodologyReviewTrustAnchor).toBe(false);
    expect(value.authorityBoundary.directSourceVerificationEvidenceMeansMethodologyReviewGovernanceRoot).toBe(false);
  });

  it('keeps future trust-anchor acquisition separate from semantic review and execution authority', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128();
    expect(value.authorityBoundary.structuralContractMeansPositiveGovernanceAuthority).toBe(false);
    expect(value.authorityBoundary.futureTrustAnchorMeansReviewDecisionAuthority).toBe(false);
    expect(value.authorityBoundary.futureTrustAnchorMeansMetricBinding).toBe(false);
    expect(value.authorityBoundary.futureTrustAnchorMeansThreshold).toBe(false);
    expect(value.authorityBoundary.futureTrustAnchorMeansCriterionState).toBe(false);
    expect(value.authorityBoundary.futureTrustAnchorMeansClaim).toBe(false);
    expect(value.authorityBoundary.historicalArtifactMutated).toBe(false);
    expect(value.nextFrontier).toBe('independent_methodology_review_governance_trust_anchor_acquisition');
  });
});
