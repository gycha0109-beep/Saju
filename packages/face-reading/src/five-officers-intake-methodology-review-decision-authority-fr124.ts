import type { FaceAuthorityRegistry, PassageVerificationStatus } from './contracts.js';
import {
  assessFiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123,
  assertIssuedFiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123,
} from './five-officers-intake-criterion-methodology-reviewed-successor-fr123.js';
import { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } from './five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js';
import { FaceAuthorityValidationError } from './validation.js';

const TARGET_METHOD_REF = 'method.shenxiang.five_officers.intake_criteria@0.2.0' as const;
const PROPOSED_REVIEWED_REF = 'method.shenxiang.five_officers.intake_criteria@0.3.0' as const;
const WITNESS_QUALIFIED_PASSAGE_REF = 'passage.shenxiang.five_officers.intake.nlc_1925' as const;

export type MethodologyReviewDecisionOutcomeFR124V1 = 'approved_for_reviewed_promotion' | 'rejected';

export interface MethodologyReviewDecisionRecordFR124V1 {
  readonly decisionId: string;
  readonly version: string;
  readonly decisionScope: 'methodology_review_promotion';
  readonly targetMethodologyRef: string;
  readonly proposedSuccessorRef: string;
  readonly sourceRefsSnapshot: readonly string[];
  readonly evidenceRefs: readonly string[];
  readonly authorityActorRef: string;
  readonly outcome: MethodologyReviewDecisionOutcomeFR124V1;
}

export interface MethodologyReviewDecisionRegistryFR124V1 {
  readonly registryId: string;
  readonly version: string;
  readonly decisions: readonly MethodologyReviewDecisionRecordFR124V1[];
}

export interface FiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124V1 {
  readonly schemaVersion: 'fr124-five-officers-intake-methodology-review-decision-authority-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'review_decision_contract_established_intake_promotion_still_blocked_no_governed_decision_record';
  readonly predecessor: {
    readonly fr123AuthorityState: 'witness_qualified_intake_methodology_review_promotion_blocked_no_governed_review_decision';
    readonly researchMethodologyRef: typeof TARGET_METHOD_REF;
    readonly researchMethodologyReviewStatus: 'research';
    readonly witnessQualifiedSourceRef: typeof WITNESS_QUALIFIED_PASSAGE_REF;
    readonly witnessQualifiedSourceVerificationStatus: 'scan_checked';
  };
  readonly contract: {
    readonly registryId: 'registry.face.methodology_review_decisions.fr124';
    readonly registryVersion: '0.1.0';
    readonly decisionScope: 'methodology_review_promotion';
    readonly targetMethodologyRef: typeof TARGET_METHOD_REF;
    readonly proposedSuccessorRef: typeof PROPOSED_REVIEWED_REF;
    readonly exactSourceSnapshotRequired: true;
    readonly approvedDecisionRequiresScanCheckedSources: true;
    readonly evidenceRefsRequired: true;
    readonly authorityActorRefRequired: true;
    readonly configuredQuorum: null;
    readonly configuredReviewerCount: null;
    readonly configuredConsensusThreshold: null;
  };
  readonly currentRegistry: {
    readonly decisionCount: 0;
    readonly approvedDecisionCount: 0;
    readonly rejectedDecisionCount: 0;
    readonly targetDecisionRef: null;
    readonly targetDecisionConsumed: false;
  };
  readonly admission: {
    readonly sourcePrerequisiteSatisfied: true;
    readonly governedDecisionRecordPresent: false;
    readonly governedApprovalPresent: false;
    readonly reviewedPromotionAuthorized: false;
    readonly reviewedSuccessorDefinitionIssued: false;
    readonly reviewedSuccessorPersisted: false;
  };
  readonly execution: {
    readonly methodologyReviewDecisionRecordsIssued: 0;
    readonly methodologyReviewAuthorizationsIssued: 0;
    readonly methodologyReviewPromotionsIssued: 0;
    readonly reviewedMethodologyDefinitionsIssued: 0;
    readonly metricBindingsIssued: 0;
    readonly calibrationProtocolsIssued: 0;
    readonly thresholdsIssued: 0;
    readonly criterionStatesIssued: 0;
    readonly structuredClaimsIssued: 0;
    readonly boundedNarrativesIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly blockers: readonly [
    'no_governed_intake_methodology_review_decision_record',
    'no_intake_methodology_review_promotion_authorization',
    'square_broad_metric_to_source_concept_mapping_not_authorized',
    'square_broad_calibration_evidence_absent',
    'square_broad_threshold_not_calibrated',
  ];
  readonly authorityBoundary: {
    readonly legacyReviewedScalarMeansReusableDecisionProvenance: false;
    readonly scanCheckedSourceMeansReviewApproval: false;
    readonly structurallyValidDecisionRecordMeansIssuedDecision: false;
    readonly sourceVerificationCheckerMeansMethodologyReviewAuthorityActor: false;
    readonly reviewDecisionMeansMetricBinding: false;
    readonly reviewDecisionMeansThreshold: false;
    readonly reviewDecisionMeansCriterionState: false;
    readonly reviewDecisionMeansClaim: false;
    readonly historicalArtifactMutated: false;
  };
  readonly nextFrontier: 'governed_intake_methodology_review_decision_materialization';
}

export const FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY = Object.freeze({
  registryId: 'registry.face.methodology_review_decisions.fr124',
  version: '0.1.0',
  decisions: Object.freeze([]),
} as const satisfies MethodologyReviewDecisionRegistryFR124V1);

const STABLE_KEY = /^[a-z0-9][a-z0-9._:-]{0,191}$/u;
const ISSUED = new WeakSet<object>();
let CACHED: FiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124V1 | null = null;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-124 ${message}`);
}

function nonEmpty(value: string, path: string): void {
  if (value.trim().length === 0) fail(`${path} must be non-empty.`);
}

function stableKey(value: string, path: string): void {
  if (!STABLE_KEY.test(value)) fail(`${path} must be a stable authority key.`);
}

function uniqueNonEmpty(values: readonly string[], path: string): void {
  if (values.length === 0) fail(`${path} must be non-empty.`);
  const seen = new Set<string>();
  for (const value of values) {
    nonEmpty(value, path);
    if (seen.has(value)) fail(`${path} contains duplicate ref: ${value}`);
    seen.add(value);
  }
}

function sameSequence(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function sourceVerificationRank(status: PassageVerificationStatus): number {
  switch (status) {
    case 'unverified_ocr': return 0;
    case 'scan_checked': return 1;
    case 'double_checked': return 2;
  }
}

function methodologyRef(methodology: FaceAuthorityRegistry['methodologies'][number]): string {
  return `${methodology.methodologyId}@${methodology.version}`;
}

export function validateMethodologyReviewDecisionRegistryFR124(
  registry: MethodologyReviewDecisionRegistryFR124V1,
  authorityRegistry: FaceAuthorityRegistry,
): void {
  stableKey(registry.registryId, 'methodologyReviewDecisionRegistry.registryId');
  nonEmpty(registry.version, `${registry.registryId}.version`);

  const methodologies = new Map(
    authorityRegistry.methodologies.map((methodology) => [methodologyRef(methodology), methodology] as const),
  );
  const passages = new Map(authorityRegistry.passages.map((passage) => [passage.passageId, passage] as const));
  const decisionRefs = new Set<string>();
  const targetSuccessorPairs = new Set<string>();

  for (const decision of registry.decisions) {
    stableKey(decision.decisionId, 'methodologyReviewDecision.decisionId');
    nonEmpty(decision.version, `${decision.decisionId}.version`);
    const decisionRef = `${decision.decisionId}@${decision.version}`;
    if (decisionRefs.has(decisionRef)) fail(`duplicate methodology review decision: ${decisionRef}.`);
    decisionRefs.add(decisionRef);

    if (decision.decisionScope !== 'methodology_review_promotion') {
      fail(`${decisionRef} has unsupported decision scope.`);
    }
    nonEmpty(decision.targetMethodologyRef, `${decisionRef}.targetMethodologyRef`);
    nonEmpty(decision.proposedSuccessorRef, `${decisionRef}.proposedSuccessorRef`);
    if (decision.targetMethodologyRef === decision.proposedSuccessorRef) {
      fail(`${decisionRef} target and proposed successor refs must differ.`);
    }
    const pair = `${decision.targetMethodologyRef}->${decision.proposedSuccessorRef}`;
    if (targetSuccessorPairs.has(pair)) fail(`multiple decisions target the same methodology promotion pair: ${pair}.`);
    targetSuccessorPairs.add(pair);

    const methodology = methodologies.get(decision.targetMethodologyRef);
    if (methodology === undefined) fail(`${decisionRef} references unknown methodology ${decision.targetMethodologyRef}.`);
    if (methodology.reviewStatus !== 'research') {
      fail(`${decisionRef} review-promotion target must currently be research; got ${methodology.reviewStatus}.`);
    }
    uniqueNonEmpty(decision.sourceRefsSnapshot, `${decisionRef}.sourceRefsSnapshot`);
    if (!sameSequence(decision.sourceRefsSnapshot, methodology.sourceRefs)) {
      fail(`${decisionRef} sourceRefsSnapshot must exactly match the target methodology sourceRefs.`);
    }
    uniqueNonEmpty(decision.evidenceRefs, `${decisionRef}.evidenceRefs`);
    nonEmpty(decision.authorityActorRef, `${decisionRef}.authorityActorRef`);

    for (const sourceRef of decision.sourceRefsSnapshot) {
      const passage = passages.get(sourceRef);
      if (passage === undefined) fail(`${decisionRef} references unknown source passage ${sourceRef}.`);
      if (
        decision.outcome === 'approved_for_reviewed_promotion' &&
        sourceVerificationRank(passage.verificationStatus) < sourceVerificationRank('scan_checked')
      ) {
        fail(`${decisionRef} approved promotion requires scan_checked source ${sourceRef}.`);
      }
    }
  }
}

function validateCurrentAuthorityState(): void {
  const registry = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY;
  validateMethodologyReviewDecisionRegistryFR124(FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY, registry);

  const method = registry.methodologies.find((candidate) => methodologyRef(candidate) === TARGET_METHOD_REF);
  const source = registry.passages.find((candidate) => candidate.passageId === WITNESS_QUALIFIED_PASSAGE_REF);
  const proposed = registry.methodologies.find((candidate) => methodologyRef(candidate) === PROPOSED_REVIEWED_REF);
  if (
    method === undefined ||
    method.reviewStatus !== 'research' ||
    !sameSequence(method.sourceRefs, [WITNESS_QUALIFIED_PASSAGE_REF]) ||
    source === undefined ||
    source.verificationStatus !== 'scan_checked' ||
    proposed !== undefined
  ) fail('persisted intake methodology authority drift.');
  if (FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY.decisions.length !== 0) {
    fail('FR-124 current decision registry must remain empty until a governed decision is materialized.');
  }
}

export function assessFiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124(): FiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124V1 {
  if (CACHED !== null) return CACHED;

  const fr123 = assessFiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123();
  assertIssuedFiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123(fr123);
  if (
    fr123.authorityState !== 'witness_qualified_intake_methodology_review_promotion_blocked_no_governed_review_decision' ||
    fr123.predecessor.researchMethodologyRef !== TARGET_METHOD_REF ||
    fr123.predecessor.researchMethodologyReviewStatus !== 'research' ||
    fr123.predecessor.witnessQualifiedSourceRef !== WITNESS_QUALIFIED_PASSAGE_REF ||
    fr123.predecessor.witnessQualifiedSourceVerificationStatus !== 'scan_checked' ||
    fr123.promotionAssessment.governedReviewDecision.decisionArtifactConsumed !== false ||
    fr123.promotionAssessment.governedReviewDecision.reviewedPromotionAuthorized !== false
  ) fail('FR-123 predecessor authority drift.');

  validateCurrentAuthorityState();

  const result: FiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124V1 = Object.freeze({
    schemaVersion: 'fr124-five-officers-intake-methodology-review-decision-authority-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'review_decision_contract_established_intake_promotion_still_blocked_no_governed_decision_record' as const,
    predecessor: Object.freeze({
      fr123AuthorityState: fr123.authorityState,
      researchMethodologyRef: TARGET_METHOD_REF,
      researchMethodologyReviewStatus: 'research' as const,
      witnessQualifiedSourceRef: WITNESS_QUALIFIED_PASSAGE_REF,
      witnessQualifiedSourceVerificationStatus: 'scan_checked' as const,
    }),
    contract: Object.freeze({
      registryId: FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY.registryId,
      registryVersion: FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY.version,
      decisionScope: 'methodology_review_promotion' as const,
      targetMethodologyRef: TARGET_METHOD_REF,
      proposedSuccessorRef: PROPOSED_REVIEWED_REF,
      exactSourceSnapshotRequired: true as const,
      approvedDecisionRequiresScanCheckedSources: true as const,
      evidenceRefsRequired: true as const,
      authorityActorRefRequired: true as const,
      configuredQuorum: null,
      configuredReviewerCount: null,
      configuredConsensusThreshold: null,
    }),
    currentRegistry: Object.freeze({
      decisionCount: 0 as const,
      approvedDecisionCount: 0 as const,
      rejectedDecisionCount: 0 as const,
      targetDecisionRef: null,
      targetDecisionConsumed: false as const,
    }),
    admission: Object.freeze({
      sourcePrerequisiteSatisfied: true as const,
      governedDecisionRecordPresent: false as const,
      governedApprovalPresent: false as const,
      reviewedPromotionAuthorized: false as const,
      reviewedSuccessorDefinitionIssued: false as const,
      reviewedSuccessorPersisted: false as const,
    }),
    execution: Object.freeze({
      methodologyReviewDecisionRecordsIssued: 0 as const,
      methodologyReviewAuthorizationsIssued: 0 as const,
      methodologyReviewPromotionsIssued: 0 as const,
      reviewedMethodologyDefinitionsIssued: 0 as const,
      metricBindingsIssued: 0 as const,
      calibrationProtocolsIssued: 0 as const,
      thresholdsIssued: 0 as const,
      criterionStatesIssued: 0 as const,
      structuredClaimsIssued: 0 as const,
      boundedNarrativesIssued: 0 as const,
      traditionalSemanticAuthority: false as const,
    }),
    blockers: Object.freeze([
      'no_governed_intake_methodology_review_decision_record',
      'no_intake_methodology_review_promotion_authorization',
      'square_broad_metric_to_source_concept_mapping_not_authorized',
      'square_broad_calibration_evidence_absent',
      'square_broad_threshold_not_calibrated',
    ] as const),
    authorityBoundary: Object.freeze({
      legacyReviewedScalarMeansReusableDecisionProvenance: false as const,
      scanCheckedSourceMeansReviewApproval: false as const,
      structurallyValidDecisionRecordMeansIssuedDecision: false as const,
      sourceVerificationCheckerMeansMethodologyReviewAuthorityActor: false as const,
      reviewDecisionMeansMetricBinding: false as const,
      reviewDecisionMeansThreshold: false as const,
      reviewDecisionMeansCriterionState: false as const,
      reviewDecisionMeansClaim: false as const,
      historicalArtifactMutated: false as const,
    }),
    nextFrontier: 'governed_intake_methodology_review_decision_materialization' as const,
  });

  CACHED = result;
  ISSUED.add(result);
  return result;
}

export function assertIssuedFiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124(
  value: FiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124V1,
): void {
  if (!ISSUED.has(value)) fail('methodology review decision authority artifact was not issued by FR-124.');
  if (
    value.authorityState !== 'review_decision_contract_established_intake_promotion_still_blocked_no_governed_decision_record' ||
    value.currentRegistry.decisionCount !== 0 ||
    value.admission.governedDecisionRecordPresent !== false ||
    value.admission.reviewedPromotionAuthorized !== false ||
    value.execution.methodologyReviewAuthorizationsIssued !== 0 ||
    value.execution.methodologyReviewPromotionsIssued !== 0 ||
    value.execution.reviewedMethodologyDefinitionsIssued !== 0 ||
    value.execution.thresholdsIssued !== 0 ||
    value.execution.criterionStatesIssued !== 0 ||
    value.execution.structuredClaimsIssued !== 0 ||
    value.execution.boundedNarrativesIssued !== 0 ||
    value.execution.traditionalSemanticAuthority !== false ||
    value.nextFrontier !== 'governed_intake_methodology_review_decision_materialization'
  ) fail('issued methodology review decision authority artifact drift.');
}
