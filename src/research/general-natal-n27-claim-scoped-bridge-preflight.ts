import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { createPreviewSemanticAdmissionRegistryV1 } from '../preview/preview-semantic-admission.js';
import {
  createGeneralNatalSourceBoundedRegistry,
  GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES,
  GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION,
} from './general-natal-conclusion-source-bounded-candidate.js';
import {
  createGeneralNatalUsefulReadingCandidateRegistry,
  GENERAL_NATAL_USEFUL_T8_RULES,
} from './general-natal-useful-reading-candidate.js';
import { buildGeneralNatalSourceBoundedAuthorityBridgeReview } from './general-natal-source-bounded-authority-bridge-review.js';
import { buildGeneralNatalBridgeReentryReadiness } from './general-natal-source-bounded-bridge-reentry-readiness.js';

export const GENERAL_NATAL_N27_BRIDGE_PREFLIGHT_VERSION =
  'saju-natal-n27-claim-scoped-bridge-evidence-preflight-v1' as const;

const CLAIMS = [
  'GENERAL_NATAL_SOURCE_BOUNDED_PEER_TO_WEALTH_ADVERSE',
  'GENERAL_NATAL_OFFICER_VISIBLE_STEMS_THEME',
  'GENERAL_NATAL_OFFICER_BRANCHES_THEME',
] as const;

/**
 * Evidence-only assessment of current governed gates, NOT a Bridge review,
 * ReviewAttestation, source promotion, or permission to insert semantic prose.
 */
export function buildGeneralNatalN27ClaimScopedBridgePreflight() {
  const sourceRegistry = createGeneralNatalSourceBoundedRegistry();
  const usefulRegistry = createGeneralNatalUsefulReadingCandidateRegistry();
  const bridge = buildGeneralNatalSourceBoundedAuthorityBridgeReview();
  const reentry = buildGeneralNatalBridgeReentryReadiness();
  const preview = createPreviewSemanticAdmissionRegistryV1();
  const sourceRules = GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES;
  const usefulRules = GENERAL_NATAL_USEFUL_T8_RULES;
  const allRules = [...sourceRules, ...usefulRules];
  const claims = CLAIMS.map(claimType => {
    const matches = allRules.filter(rule => rule.output.claimType === claimType);
    if (matches.length !== 1) {
      throw new TypeError('N27 Bridge preflight requires one exact existing Claim rule: ' + claimType);
    }
    const rule = matches[0]!;
    const owner = claimType.startsWith('GENERAL_NATAL_SOURCE_BOUNDED_')
      ? 'source_bounded_structural_relation' as const
      : 'useful_reading_t8_theme' as const;
    const selectedRegistry = owner === 'source_bounded_structural_relation'
      ? sourceRegistry : usefulRegistry;
    const subject = selectedRegistry.snapshot.rules.find(ref =>
      ref.id === rule.ruleId && ref.version === rule.version);
    if (!subject?.contentHash || !rule.sourceRefs.length ||
        rule.status !== 'research' ||
        rule.quality.provenanceQuality !== 'secondary_only' ||
        rule.quality.reviewerStatus !== 'unreviewed' ||
        !selectedRegistry.snapshot.methodologies.some(ref =>
          ref.id === rule.methodologyRef.id &&
          ref.version === rule.methodologyRef.version)) {
      throw new TypeError('N27 source authority unexpectedly changed; require fresh governed re-review: ' + claimType);
    }
    const matchingAdmissions = preview.entries.filter(entry =>
      entry.targetSections.includes('general:natal') &&
      entry.researchRef.modulePath === (owner === 'source_bounded_structural_relation'
        ? 'src/research/general-natal-conclusion-source-bounded-candidate.ts'
        : 'src/research/general-natal-useful-reading-candidate.ts'));
    const consumerPermission = matchingAdmissions.some(entry =>
      entry.disposition !== 'hold' &&
      (entry.effects.mayCreatePreviewClaim || entry.effects.mayQualifyPreviewClaim ||
        entry.effects.mayExposePreviewObservation));
    return Object.freeze({
      claimType,
      owner,
      ruleRef: Object.freeze({ ...subject }),
      methodologyRef: Object.freeze({ ...rule.methodologyRef }),
      sourceIds: Object.freeze([...new Set(rule.sourceRefs.map(s => s.sourceId))].sort()),
      researchLifecycle: rule.status,
      provenanceQuality: rule.quality.provenanceQuality,
      reviewerStatus: rule.quality.reviewerStatus,
      existingPreviewAdmissionCountForOwningModule: matchingAdmissions.length,
      existingConsumerPermission: consumerPermission,
      claimScopedGovernedBridgeDecisionRecorded: false as const,
      currentDisposition: 'HOLD' as const,
      mayMaterializeNewOfficialMeaning: false as const,
      mayPromoteProduction: false as const,
      blockers: owner === 'source_bounded_structural_relation'
        ? Object.freeze([
          ...reentry.remainingResearchBlockers,
          ...reentry.laterGovernanceBlockers,
          'EXACT_CLAIM_SCOPED_INDEPENDENT_BRIDGE_DECISION_REQUIRED',
          'CLASSICAL_GYEOPJAE_PAEJAE_BIJEON_SCOPE_CONFLICT_UNRESOLVED',
        ])
        : Object.freeze([
          'OFFICER_CHANNEL_AND_JEONG_PYEON_SUBTYPE_CONFOUNDED',
          'CLAIM_SCOPED_SOURCE_QUALITY_AND_MEANING_REVIEW_REQUIRED',
          'NO_UNIVERSAL_STEM_EXTERNAL_BRANCH_INTERNAL_BEHAVIOUR_MEANING',
        ]),
    });
  });
  if (GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION !== '0.2.0-research' ||
      bridge.decision.disposition !== 'RETURN_TO_RESEARCH' ||
      !reentry.candidateBindingFresh || reentry.bridgeReentryReady ||
      reentry.nextDisposition !== 'RETURN_TO_RESEARCH' ||
      bridge.authorityState.sourceIntegrityQualificationEstablished ||
      preview.constraints.researchMergeDoesNotImplyAdmission !== true ||
      claims.some(c => c.existingConsumerPermission ||
        c.existingPreviewAdmissionCountForOwningModule !== 0)) {
    throw new TypeError('N27 evidence changed; stop and request an independent fresh Bridge review.');
  }
  const evidence = Object.freeze({
    version: GENERAL_NATAL_N27_BRIDGE_PREFLIGHT_VERSION,
    lifecycle: 'internal_bridge_preflight_not_a_governance_decision' as const,
    trackedBridgeIssue: 2557,
    existingBridgeReviewId: bridge.reviewId,
    currentCandidateSurfaceHash: reentry.observedCandidateSurfaceHash,
    reviewSubjectManifestHash: bridge.evidence.reviewSubjectManifestHash,
    previewAdmissionRegistryHash: preview.registryHash,
    currentBridgeReentryDisposition: reentry.nextDisposition,
    sourceIntegrityReady: reentry.sourceIntegrity.ready,
    domainReviewerAttestationsRecorded: bridge.authorityState.bundledReviewAttestationCount,
    trustedDomainAttestationEstablished: bridge.authorityState.trustedDomainAttestationEstablished,
    claims,
    newConsumerMeaningAdmitted: false as const,
    actualIndependentBridgeReviewOfIssue2557Completed: false as const,
    allThreeClaimsHeld: true as const,
    mayPublish: false as const,
    maySell: false as const,
    mayCreateInterpretation: false as const,
    limitations: Object.freeze([
      'The current evidence preflight is NOT an independent Bridge decision.',
      'Passing CI or a research rule firing never constitutes Claim-scoped admission.',
      'Source-bounded relation candidate and useful-reading Officer theme are different research surfaces.',
      'Only a later signed, source/method/version/claim-scoped governed disposition can change consumer semantic eligibility.',
    ]),
  });
  return Object.freeze({
    ...evidence,
    evidenceHash: deterministicContentHash(evidence),
  });
}
