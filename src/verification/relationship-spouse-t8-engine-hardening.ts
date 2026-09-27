import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ReadingIntent, ReadingRequest } from '../contracts/reading.js';
import type { SajuEngineImplementationEvidence } from '../interpretation/saju-engine-authority-intake.js';
import {
  runRelationshipSpouseT8EngineProducer,
} from '../interpretation/relationship-spouse-t8-engine-producer.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  evaluateRelationshipSpouseT8G2AAdmittedHandoff,
} from '../research/relationship-spouse-t8-g2a-admitted-handoff.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY,
} from '../research/relationship-spouse-t8-source-bound-runtime.js';
import {
  buildRelationshipSpouseT8EngineCompositionCompletionEvidence,
  prepareRelationshipSpouseT8EngineComposition,
} from '../reading/relationship-spouse-t8-engine-composition.js';
import { resolveDomainReadingProfile } from '../reading/reading-intent-composition.js';
import { buildReadingCompositionEvidence } from '../reading/reading-profile-authorization.js';

export const RELATIONSHIP_SPOUSE_T8_ENGINE_HARDENING_VERSION =
  'myeonghwa-relationship-spouse-t8-engine-hardening-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_ENGINE_HARDENING_IMPLEMENTATION_EVIDENCE =
  Object.freeze({
    producerRuntimeExists: true,
    compositionIntegrated: true,
    deterministicGuardsComplete: true,
    e2eComplete: true,
  } as const satisfies SajuEngineImplementationEvidence);

export const RELATIONSHIP_SPOUSE_T8_ENGINE_HARDENING_GUARD_IDS = Object.freeze([
  'YANG_EXACTLY_ONE_INDIRECT_WEALTH_SPOUSE_MARKER',
  'YIN_EXACTLY_ONE_INDIRECT_POWER_SPOUSE_MARKER',
  'MISSING_DAY_MASTER_ZERO_CLAIMS',
  'AMBIGUOUS_DAY_MASTER_ZERO_CLAIMS',
  'UNAVAILABLE_DAY_MASTER_ZERO_CLAIMS',
  'PENDING_DAY_MASTER_ZERO_CLAIMS',
  'SAME_SNAPSHOT_RERUN_STABLE_CLAIM_IDENTITY',
  'SAME_SNAPSHOT_RERUN_STABLE_RUN_HASH',
  'UNRELATED_INPUT_MUTATION_PRESERVES_BOUNDED_SEMANTIC_PROJECTION',
  'SPOUSE_NATAL_INTENT_SELECTS_EXACT_SPOUSE_CLAIM',
  'RELATIONSHIP_GENERAL_INTENT_DOES_NOT_REUSE_SPOUSE_CLAIM',
  'RELATIONSHIP_ANNUAL_INTENT_DOES_NOT_AUTO_EXPAND_SPOUSE_AUTHORITY',
  'RELATIONSHIP_MONTHLY_INTENT_DOES_NOT_AUTO_EXPAND_SPOUSE_AUTHORITY',
  'COMPATIBILITY_INTENT_DOES_NOT_REUSE_SPOUSE_CLAIM',
  'SECOND_CHART_ACCESS_FORBIDDEN',
  'CANONICAL_TO_GOVERNED_EVIDENCE_E2E',
] as const);

const SPOUSE_INTENT = Object.freeze({
  domain: 'relationship' as const,
  temporalScope: 'natal' as const,
  relationshipScope: 'spouse' as const,
});

const RELATIONSHIP_GENERAL_INTENT = Object.freeze({
  domain: 'relationship' as const,
  temporalScope: 'natal' as const,
  relationshipScope: 'general' as const,
});

function selectorIsExactRelationshipSubcategory(
  intent: ReadingIntent,
  subcategory: 'general' | 'spouse',
): boolean {
  const resolved = resolveDomainReadingProfile(intent);
  if (resolved === undefined) return false;
  const selector = resolved.profile.requiredClaimSelectors[0]?.anyOf[0];
  return (
    resolved.profile.requiredClaimSelectors.length === 1 &&
    selector?.taxonomy?.tiers?.length === 1 &&
    selector.taxonomy.tiers[0] === 'T8' &&
    selector.taxonomy.categories?.length === 1 &&
    selector.taxonomy.categories[0] === 'relationship' &&
    selector.taxonomy.subcategories?.length === 1 &&
    selector.taxonomy.subcategories[0] === subcategory
  );
}

function ruleInputBoundaryExact(): boolean {
  const rules = RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.rules;
  return (
    rules.length === 2 &&
    rules.every(
      (rule) =>
        rule.inputs.length === 1 &&
        rule.inputs[0]?.source === 'derived_fact' &&
        rule.inputs[0].pathOrClaimType === 'derivedFacts.dayMaster' &&
        rule.inputs[0].required === true &&
        rule.inputs[0].ambiguityBehavior === 'requires_resolved' &&
        rule.inputs[0].acceptedStatuses?.length === 1 &&
        rule.inputs[0].acceptedStatuses[0] === 'resolved',
    )
  );
}

function forbiddenInputBoundaryClean(): boolean {
  const serialized = JSON.stringify(
    RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.rules.map((rule) => ({
      inputs: rule.inputs,
      condition: rule.condition,
      output: rule.output,
    })),
  );
  return [
    'secondChart',
    'compatibility',
    'partnerIdentity',
    'partnerSex',
    'sexualOrientation',
    'genderIdentity',
    'marriageGuarantee',
    'fertility',
  ].every((token) => !serialized.includes(token));
}

export function buildRelationshipSpouseT8EngineHardeningBinding() {
  const p1 = buildRelationshipSpouseT8EngineCompositionCompletionEvidence();
  const spouseProfileExact = selectorIsExactRelationshipSubcategory(
    SPOUSE_INTENT,
    'spouse',
  );
  const relationshipGeneralProfileIsolated =
    selectorIsExactRelationshipSubcategory(
      RELATIONSHIP_GENERAL_INTENT,
      'general',
    );
  const exactRuleInputBoundary = ruleInputBoundaryExact();
  const noForbiddenOrSecondChartInput = forbiddenInputBoundaryClean();

  const hardeningContractReady =
    p1.p1Complete === true &&
    p1.observedNextRouting === 'P2_HARDENING' &&
    spouseProfileExact &&
    relationshipGeneralProfileIsolated &&
    exactRuleInputBoundary &&
    noForbiddenOrSecondChartInput;

  const g2a = evaluateRelationshipSpouseT8G2AAdmittedHandoff(
    RELATIONSHIP_SPOUSE_T8_ENGINE_HARDENING_IMPLEMENTATION_EVIDENCE,
  );

  const readyRoutingValid =
    g2a.g2aEvaluation.authorityContractComplete === true &&
    g2a.g2aEvaluation.routing === 'READY' &&
    g2a.g2aEvaluation.implementationMayProceed === false;

  const p2Complete = hardeningContractReady && readyRoutingValid;

  const material = Object.freeze({
    hardeningVersion: RELATIONSHIP_SPOUSE_T8_ENGINE_HARDENING_VERSION,
    issue: '#1790' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    p1CompletionEvidenceId: p1.evidenceId,
    registrySnapshotId:
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.snapshot
        .registrySnapshotId,
    guardIds: RELATIONSHIP_SPOUSE_T8_ENGINE_HARDENING_GUARD_IDS,
    guardDefinitionCount:
      RELATIONSHIP_SPOUSE_T8_ENGINE_HARDENING_GUARD_IDS.length,
    bindingChecks: Object.freeze({
      p1Ready: p1.p1Complete === true,
      spouseProfileExact,
      relationshipGeneralProfileIsolated,
      exactRuleInputBoundary,
      noForbiddenOrSecondChartInput,
    }),
    hardeningContractReady,
    implementationEvidence:
      RELATIONSHIP_SPOUSE_T8_ENGINE_HARDENING_IMPLEMENTATION_EVIDENCE,
    g2aEvaluationHash: g2a.g2aEvaluation.evaluationHash,
    observedRouting: g2a.g2aEvaluation.routing,
    readyRoutingValid,
    p2Complete,
    authorityBoundary: Object.freeze({
      engineReadyIsProductionAdmission: false as const,
      previewExpansionAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      publicSemanticAuthorityAuthorized: false as const,
      lifecyclePromotionAuthorized: false as const,
      productionAdmissionAuthorized: false as const,
      production: 'HOLD' as const,
    }),
    nextDisposition: p2Complete
      ? ('ENGINE_READY_BOUNDED_SEMANTIC_CAPABILITY' as const)
      : ('REPAIR_ENGINE_P2_SPOUSE_T8_HARDENING' as const),
  });

  return Object.freeze({
    hardeningId: deterministicContentHash(material),
    ...material,
  });
}

function semanticProjection(result: ReturnType<typeof runRelationshipSpouseT8EngineProducer>) {
  return result.claims.map((claim) => ({
    claimType: claim.claimType,
    taxonomy: claim.taxonomy,
    subject: claim.subject,
    predicate: claim.predicate,
    value: claim.value,
    polarity: claim.polarity,
    emphasis: claim.emphasis,
  }));
}

export function verifyRelationshipSpouseT8DeterministicRerun(
  snapshot: CanonicalSajuSnapshot,
  requestId: string,
  now: Date,
) {
  const first = runRelationshipSpouseT8EngineProducer(snapshot, {
    requestId,
    now,
  });
  const second = runRelationshipSpouseT8EngineProducer(snapshot, {
    requestId,
    now,
  });

  const firstClaimHash = deterministicContentHash(first.claims);
  const secondClaimHash = deterministicContentHash(second.claims);

  return Object.freeze({
    sameClaimIds:
      deterministicContentHash(first.claims.map((claim) => claim.claimId)) ===
      deterministicContentHash(second.claims.map((claim) => claim.claimId)),
    sameClaimContentHash: firstClaimHash === secondClaimHash,
    sameRunHash: first.run.runHash === second.run.runHash,
    firstRunHash: first.run.runHash,
    secondRunHash: second.run.runHash,
    firstClaimHash,
    secondClaimHash,
  });
}

export function compareRelationshipSpouseT8SemanticProjection(
  left: CanonicalSajuSnapshot,
  right: CanonicalSajuSnapshot,
  now: Date,
) {
  const leftResult = runRelationshipSpouseT8EngineProducer(left, {
    requestId: 'spouse-t8-unrelated-left',
    now,
  });
  const rightResult = runRelationshipSpouseT8EngineProducer(right, {
    requestId: 'spouse-t8-unrelated-right',
    now,
  });
  const leftProjection = semanticProjection(leftResult);
  const rightProjection = semanticProjection(rightResult);

  return Object.freeze({
    leftProjection,
    rightProjection,
    sameSemanticProjection:
      deterministicContentHash(leftProjection) ===
      deterministicContentHash(rightProjection),
  });
}

function selectionForIntent(
  snapshot: CanonicalSajuSnapshot,
  requestId: string,
  intent: ReadingIntent,
  now: Date,
) {
  const execution = runRelationshipSpouseT8EngineProducer(snapshot, {
    requestId,
    now,
  });
  const request: ReadingRequest = { requestId, intent };
  const composition = buildReadingCompositionEvidence(
    snapshot,
    execution,
    RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY,
    request,
  );

  return Object.freeze({
    coverageState: composition.selection.coverageState,
    selectedClaimIds: composition.selection.selectedClaimIds,
    targetClaimIds: composition.selection.targetClaimIds,
    missingRequirements: composition.selection.missingRequirements,
    evidencePresent: composition.evidence !== undefined,
  });
}

export function verifyRelationshipSpouseT8IntentIsolation(
  snapshot: CanonicalSajuSnapshot,
  now: Date,
) {
  return Object.freeze({
    spouse: selectionForIntent(
      snapshot,
      'spouse-t8-intent-spouse',
      SPOUSE_INTENT,
      now,
    ),
    relationshipGeneral: selectionForIntent(
      snapshot,
      'spouse-t8-intent-general',
      RELATIONSHIP_GENERAL_INTENT,
      now,
    ),
    relationshipAnnual: selectionForIntent(
      snapshot,
      'spouse-t8-intent-annual',
      {
        domain: 'relationship',
        temporalScope: 'annual',
        relationshipScope: 'general',
      },
      now,
    ),
    relationshipMonthly: selectionForIntent(
      snapshot,
      'spouse-t8-intent-monthly',
      {
        domain: 'relationship',
        temporalScope: 'monthly',
        relationshipScope: 'general',
      },
      now,
    ),
    compatibility: selectionForIntent(
      snapshot,
      'spouse-t8-intent-compatibility',
      { domain: 'compatibility', temporalScope: 'natal' },
      now,
    ),
  });
}

export function verifyRelationshipSpouseT8EngineE2E(
  snapshot: CanonicalSajuSnapshot,
  requestId: string,
  now: Date,
) {
  const composed = prepareRelationshipSpouseT8EngineComposition(snapshot, {
    requestId,
    now,
    includeSourceSummaries: true,
  });
  const evidence = composed.preparation.composition?.evidence;
  const selection = composed.preparation.composition?.selection;

  const complete =
    composed.interpretation.integrity.valid === true &&
    composed.interpretation.run.registrySnapshotId ===
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.snapshot
        .registrySnapshotId &&
    composed.interpretation.claims.length === 1 &&
    composed.outcome === 'complete' &&
    selection?.profileAuthorization.state === 'authorized' &&
    selection.coverageState === 'complete' &&
    selection.selectedClaimIds.length === 1 &&
    selection.selectedClaimIds[0] === composed.interpretation.claims[0]?.claimId &&
    evidence !== undefined &&
    evidence.bundle.claims.length === 1 &&
    evidence.bundle.claims[0]?.claimId ===
      composed.interpretation.claims[0]?.claimId;

  const material = Object.freeze({
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    interpretationRunId: composed.interpretation.run.interpretationRunId,
    interpretationRunHash: composed.interpretation.run.runHash,
    registrySnapshotId: composed.interpretation.run.registrySnapshotId,
    claimIds: composed.interpretation.claims.map((claim) => claim.claimId),
    claimRelationIds: composed.interpretation.claimRelations.map(
      (relation) => relation.relationId,
    ),
    profileRef: composed.preparation.composition?.selection.profileRef,
    selectionId: selection?.selectionId,
    evidenceBundleHash: evidence?.evidenceBundleHash,
    complete,
  });

  return Object.freeze({
    e2eId: deterministicContentHash(material),
    ...material,
  });
}
