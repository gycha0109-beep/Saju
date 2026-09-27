import type {
  BirthInput,
  CalculationPolicySnapshot,
} from '../contracts/calculation.js';
import {
  calculateCanonicalSajuSnapshot,
  type CalculationEngineOptions,
} from '../calculation/calculation-engine.js';
import type { SajuEngineImplementationEvidence } from '../interpretation/saju-engine-authority-intake.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE,
} from '../research/relationship-spouse-t8-runtime-admission.js';
import {
  createRelationshipSpouseT8G2AAdmittedContract,
  evaluateRelationshipSpouseT8G2AAdmittedHandoff,
} from '../research/relationship-spouse-t8-g2a-admitted-handoff.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY,
} from '../research/relationship-spouse-t8-source-bound-runtime.js';
import {
  buildRelationshipSpouseT8EngineCompositionBinding,
  buildRelationshipSpouseT8EngineCompositionCompletionEvidence,
  prepareRelationshipSpouseT8EngineComposition,
} from './relationship-spouse-t8-engine-composition.js';
import { resolveDomainReadingProfile } from './reading-intent-composition.js';
import { resolveReadingProfileSelectionAuthorization } from './reading-profile-authorization.js';

export const RELATIONSHIP_SPOUSE_T8_ENGINE_HARDENING_VERSION =
  'myeonghwa-relationship-spouse-t8-engine-hardening-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_ENGINE_READY_IMPLEMENTATION_EVIDENCE =
  Object.freeze({
    producerRuntimeExists: true,
    compositionIntegrated: true,
    deterministicGuardsComplete: true,
    e2eComplete: true,
  } as const satisfies SajuEngineImplementationEvidence);

export interface RelationshipSpouseT8EngineE2EInput {
  readonly birthInput: BirthInput;
  readonly calculationPolicy: CalculationPolicySnapshot;
  readonly requestId: string;
  readonly calculationOptions?: CalculationEngineOptions;
  readonly interpretationNow?: Date;
  readonly includeSourceSummaries?: boolean;
}

const AUTHORITY_BOUNDARY = Object.freeze({
  engineImplementationReady: true as const,
  previewExpansionAuthorized: false as const,
  officialReadingAuthorityAuthorized: false as const,
  publicSemanticAuthorityAuthorized: false as const,
  lifecyclePromotionAuthorized: false as const,
  productionAdmissionAuthorized: false as const,
  production: 'HOLD' as const,
});

function selectorMatches(
  selector:
    | {
        readonly taxonomy?: {
          readonly tiers?: readonly string[];
          readonly categories?: readonly string[];
          readonly subcategories?: readonly string[];
        };
      }
    | undefined,
  expected: {
    readonly tier: string;
    readonly category: string;
    readonly subcategory: string;
  },
): boolean {
  return (
    selector?.taxonomy?.tiers?.length === 1 &&
    selector.taxonomy.tiers[0] === expected.tier &&
    selector.taxonomy.categories?.length === 1 &&
    selector.taxonomy.categories[0] === expected.category &&
    selector.taxonomy.subcategories?.length === 1 &&
    selector.taxonomy.subcategories[0] === expected.subcategory
  );
}

export function buildRelationshipSpouseT8EngineHardeningBinding() {
  const compositionBinding = buildRelationshipSpouseT8EngineCompositionBinding();
  const compositionCompletion =
    buildRelationshipSpouseT8EngineCompositionCompletionEvidence();
  const g2aContract = createRelationshipSpouseT8G2AAdmittedContract();

  const spouseProfile = resolveDomainReadingProfile({
    domain: 'relationship',
    temporalScope: 'natal',
    relationshipScope: 'spouse',
  });
  const generalProfile = resolveDomainReadingProfile({
    domain: 'relationship',
    temporalScope: 'natal',
    relationshipScope: 'general',
  });
  const annualSpouseProfile = resolveDomainReadingProfile({
    domain: 'relationship',
    temporalScope: 'annual',
    relationshipScope: 'spouse',
  });
  const monthlySpouseProfile = resolveDomainReadingProfile({
    domain: 'relationship',
    temporalScope: 'monthly',
    relationshipScope: 'spouse',
  });
  const compatibilityProfile = resolveDomainReadingProfile({
    domain: 'compatibility',
    temporalScope: 'natal',
  });

  const spouseAuthorization =
    spouseProfile === undefined
      ? undefined
      : resolveReadingProfileSelectionAuthorization(spouseProfile.profileRef);
  const generalAuthorization =
    generalProfile === undefined
      ? undefined
      : resolveReadingProfileSelectionAuthorization(generalProfile.profileRef);

  const claimTypeDefinition =
    RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.claimTypeDefinitions.find(
      (definition) =>
        definition.claimType ===
        RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE,
    );

  const p1Ready =
    compositionBinding.compositionBindingReady === true &&
    compositionCompletion.p1Complete === true &&
    compositionCompletion.observedNextRouting === 'P2_HARDENING';

  const exactSpouseProfileAuthorized =
    spouseProfile?.profile.profileId ===
      'myeonghwa-reading-profile-relationship-spouse-natal-v1' &&
    spouseAuthorization?.state === 'authorized' &&
    spouseAuthorization.authorization?.scope ===
      'reading_evidence_selection_only';

  const generalRelationshipExcludesSpouse =
    generalProfile?.profile.profileId ===
      'myeonghwa-reading-profile-relationship-general-natal-v1' &&
    generalAuthorization?.state === 'authorized' &&
    generalProfile.profile.excludedClaimSelectors.length === 1 &&
    selectorMatches(generalProfile.profile.excludedClaimSelectors[0], {
      tier: 'T8',
      category: 'relationship',
      subcategory: 'spouse',
    });

  const temporalScopeIsolationPreserved =
    annualSpouseProfile === undefined && monthlySpouseProfile === undefined;

  const compatibilityIsolationPreserved =
    compatibilityProfile?.profile.requiredClaimSelectors.length === 1 &&
    selectorMatches(
      compatibilityProfile.profile.requiredClaimSelectors[0]?.anyOf[0],
      {
        tier: 'T10',
        category: '',
        subcategory: '',
      },
    ) === false &&
    compatibilityProfile.profile.requiredClaimSelectors[0]?.anyOf[0]?.taxonomy
      ?.tiers?.length === 1 &&
    compatibilityProfile.profile.requiredClaimSelectors[0]?.anyOf[0]?.taxonomy
      ?.tiers?.[0] === 'T10';

  const claimNarrativeBoundaryPreserved =
    claimTypeDefinition !== undefined &&
    claimTypeDefinition.materialForNarrative === false;

  const singleChartInputBoundaryPreserved =
    g2aContract.requiredInputs.length === 1 &&
    g2aContract.requiredInputs[0] === 'derivedFacts.dayMaster' &&
    g2aContract.forbiddenClaims.includes('SECOND_CHART_INFERENCE') &&
    g2aContract.negativeCases.includes(
      'NO_SECOND_CHART_COMPATIBILITY_FALLBACK',
    );

  const forbiddenExpansionBoundaryPreserved =
    g2aContract.forbiddenClaims.includes(
      'ANNUAL_OR_MONTHLY_SPOUSE_AUTHORITY_EXPANSION',
    ) &&
    g2aContract.forbiddenClaims.includes(
      'GENERAL_RELATIONSHIP_AUTHORITY_RELABELLED_AS_SPOUSE_T8_AUTHORITY',
    ) &&
    g2aContract.forbiddenClaims.includes('COMPATIBILITY_SCORING');

  const hardeningBindingReady =
    p1Ready &&
    exactSpouseProfileAuthorized &&
    generalRelationshipExcludesSpouse &&
    temporalScopeIsolationPreserved &&
    compatibilityIsolationPreserved &&
    claimNarrativeBoundaryPreserved &&
    singleChartInputBoundaryPreserved &&
    forbiddenExpansionBoundaryPreserved;

  const material = Object.freeze({
    hardeningVersion: RELATIONSHIP_SPOUSE_T8_ENGINE_HARDENING_VERSION,
    issue: '#1790' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    compositionBindingId: compositionBinding.bindingId,
    compositionCompletionEvidenceId: compositionCompletion.evidenceId,
    registrySnapshotId:
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.snapshot
        .registrySnapshotId,
    spouseProfileRef: spouseProfile?.profileRef,
    generalRelationshipProfileRef: generalProfile?.profileRef,
    guardChecks: Object.freeze({
      p1Ready,
      exactSpouseProfileAuthorized,
      generalRelationshipExcludesSpouse,
      temporalScopeIsolationPreserved,
      compatibilityIsolationPreserved,
      claimNarrativeBoundaryPreserved,
      singleChartInputBoundaryPreserved,
      forbiddenExpansionBoundaryPreserved,
    }),
    e2eBoundary: Object.freeze({
      startsFromCanonicalBirthInput: true as const,
      canonicalCalculationEngineUsed: true as const,
      engineProducerUsed: true as const,
      governedCompositionUsed: true as const,
      governedEvidenceRequiredForResolvedCase: true as const,
      productDeliveryRequiredForP2: false as const,
      narrativeExecutionRequiredForP2: false as const,
      secondChartInputAccepted: false as const,
    }),
    authorityBoundary: AUTHORITY_BOUNDARY,
    hardeningBindingReady,
  });

  return Object.freeze({
    bindingId: deterministicContentHash(material),
    ...material,
  });
}

export function runRelationshipSpouseT8EngineE2E(
  input: RelationshipSpouseT8EngineE2EInput,
) {
  const hardening = buildRelationshipSpouseT8EngineHardeningBinding();
  if (!hardening.hardeningBindingReady) {
    throw new Error(
      'Relationship Spouse T8 P2 E2E requires the complete deterministic hardening binding.',
    );
  }

  const snapshot = calculateCanonicalSajuSnapshot(
    input.birthInput,
    input.calculationPolicy,
    input.calculationOptions,
  );

  const composition = prepareRelationshipSpouseT8EngineComposition(snapshot, {
    requestId: input.requestId,
    ...(input.interpretationNow === undefined
      ? {}
      : { now: input.interpretationNow }),
    ...(input.includeSourceSummaries === true
      ? { includeSourceSummaries: true }
      : {}),
  });

  if (
    composition.interpretation.run.snapshotId !== snapshot.snapshotId ||
    composition.interpretation.run.registrySnapshotId !==
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.snapshot
        .registrySnapshotId
  ) {
    throw new Error(
      'Relationship Spouse T8 P2 E2E interpretation identity drifted from the canonical snapshot or admitted registry.',
    );
  }

  if (composition.outcome === 'complete') {
    if (
      composition.interpretation.claims.length !== 1 ||
      composition.preparation.composition?.selection.coverageState !==
        'complete' ||
      composition.preparation.composition.evidence === undefined
    ) {
      throw new Error(
        'Relationship Spouse T8 P2 E2E resolved path requires one governed claim and governed evidence.',
      );
    }
  }

  const material = Object.freeze({
    hardeningBindingId: hardening.bindingId,
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    interpretationRunId:
      composition.interpretation.run.interpretationRunId,
    interpretationRunHash: composition.interpretation.run.runHash,
    compositionId: composition.compositionId,
    preparationId: composition.preparation.preparationId,
    outcome: composition.outcome,
    claimIds: composition.interpretation.claims
      .map((claim) => claim.claimId)
      .sort(),
    claimRelationIds: composition.interpretation.claimRelations
      .map((relation) => relation.relationId)
      .sort(),
    governedEvidenceHash: composition.governedEvidenceHash,
    authorityBoundary: AUTHORITY_BOUNDARY,
  });

  return Object.freeze({
    e2eId: deterministicContentHash(material),
    ...material,
    snapshot,
    composition,
  });
}

export function buildRelationshipSpouseT8EngineHardeningCompletionEvidence() {
  const binding = buildRelationshipSpouseT8EngineHardeningBinding();
  const g2a = evaluateRelationshipSpouseT8G2AAdmittedHandoff(
    RELATIONSHIP_SPOUSE_T8_ENGINE_READY_IMPLEMENTATION_EVIDENCE,
  );

  const p2Complete =
    binding.hardeningBindingReady === true &&
    g2a.g2aEvaluation.authorityContractComplete === true &&
    g2a.g2aEvaluation.routing === 'READY' &&
    g2a.g2aEvaluation.implementationMayProceed === false;

  const material = Object.freeze({
    evidenceVersion:
      'myeonghwa-relationship-spouse-t8-p2-engine-hardening-evidence-v1' as const,
    issue: '#1790' as const,
    hardeningBindingId: binding.bindingId,
    implementationEvidence:
      RELATIONSHIP_SPOUSE_T8_ENGINE_READY_IMPLEMENTATION_EVIDENCE,
    g2aEvaluationHash: g2a.g2aEvaluation.evaluationHash,
    expectedRouting: 'READY' as const,
    observedRouting: g2a.g2aEvaluation.routing,
    p2Complete,
    nextDisposition: p2Complete
      ? ('ENGINE_IMPLEMENTATION_READY_AUTHORITY_STILL_HELD' as const)
      : ('REPAIR_ENGINE_P2_SPOUSE_T8_HARDENING' as const),
    authorityBoundary: AUTHORITY_BOUNDARY,
  });

  return Object.freeze({
    evidenceId: deterministicContentHash(material),
    ...material,
  });
}
