import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { InterpretationClaim } from '../contracts/interpretation.js';
import type {
  DomainReadingProfile,
  ReadingClaimSelector,
  ReadingCoverageState,
  ReadingRequest,
  ReadingScenarioCoverage,
} from '../contracts/reading.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import {
  deterministicContentHash,
  type ResolvedRuleRegistrySnapshot,
} from '../interpretation/rule-registry.js';
import { buildNarrativeEvidenceBundle } from '../narrative/evidence-selector.js';
import {
  buildReadingCompositionEvidence as buildAuthorizedReadingCompositionEvidence,
  type GovernedReadingCompositionEvidenceResult,
} from './reading-profile-authorization.js';
import type { ReadingCompositionOptions } from './reading-intent-composition.js';

function matchesList(value: string, accepted: readonly string[] | undefined): boolean {
  return accepted === undefined || accepted.includes(value);
}

function matchesSelector(claim: InterpretationClaim, selector: ReadingClaimSelector): boolean {
  const taxonomy = selector.taxonomy;
  if (taxonomy?.tiers !== undefined && !taxonomy.tiers.includes(claim.taxonomy.tier)) return false;
  if (!matchesList(claim.taxonomy.category, taxonomy?.categories)) return false;
  if (taxonomy?.subcategories !== undefined) {
    if (claim.taxonomy.subcategory === undefined) return false;
    if (!taxonomy.subcategories.includes(claim.taxonomy.subcategory)) return false;
  }
  if (!matchesList(claim.claimType, selector.claimTypes)) return false;
  if (!matchesList(claim.subject, selector.subjects)) return false;
  if (!matchesList(claim.predicate, selector.predicates)) return false;
  return true;
}

function activeEligibleClaims(
  execution: InterpretationExecutionResult,
  profile: DomainReadingProfile,
): readonly InterpretationClaim[] {
  return execution.claims
    .filter((claim) => claim.state === 'active')
    .filter(
      (claim) =>
        !profile.excludedClaimSelectors.some((selector) => matchesSelector(claim, selector)),
    )
    .sort((left, right) => left.claimId.localeCompare(right.claimId));
}

function validateMinimumUsefulReading(profile: DomainReadingProfile): void {
  const policy = profile.minimumUsefulReading;
  if (policy === undefined) return;

  const requirementIds = profile.requiredClaimSelectors.map((group) => group.requirementId);
  const required = new Set(requirementIds);
  const core = new Set(policy.coreRequirementIds);
  const supplementary = new Set(policy.supplementaryRequirementIds);

  if (requirementIds.length !== required.size) {
    throw new TypeError(`Reading profile ${profile.profileId} has duplicate requirement IDs.`);
  }
  if (policy.coreRequirementIds.length !== core.size) {
    throw new TypeError(`Reading profile ${profile.profileId} MUR has duplicate core requirement IDs.`);
  }
  if (policy.supplementaryRequirementIds.length !== supplementary.size) {
    throw new TypeError(
      `Reading profile ${profile.profileId} MUR has duplicate supplementary requirement IDs.`,
    );
  }
  for (const id of core) {
    if (!required.has(id)) {
      throw new TypeError(`Reading profile ${profile.profileId} MUR references unknown core ${id}.`);
    }
    if (supplementary.has(id)) {
      throw new TypeError(`Reading profile ${profile.profileId} MUR overlaps requirement ${id}.`);
    }
  }
  for (const id of supplementary) {
    if (!required.has(id)) {
      throw new TypeError(
        `Reading profile ${profile.profileId} MUR references unknown supplementary ${id}.`,
      );
    }
  }
  if (core.size + supplementary.size !== required.size) {
    throw new TypeError(
      `Reading profile ${profile.profileId} MUR must classify every required selector group.`,
    );
  }
  if (
    !Number.isInteger(policy.minimumSupplementaryMatches) ||
    policy.minimumSupplementaryMatches < 0 ||
    policy.minimumSupplementaryMatches > supplementary.size
  ) {
    throw new TypeError(
      `Reading profile ${profile.profileId} MUR minimumSupplementaryMatches is invalid.`,
    );
  }
}

function scenarioClaims(
  eligible: readonly InterpretationClaim[],
  scenarioRef: string | undefined,
): readonly InterpretationClaim[] {
  if (scenarioRef === undefined) {
    return eligible.filter((claim) => claim.scenarioRef === undefined);
  }
  return eligible.filter(
    (claim) => claim.scenarioRef === undefined || claim.scenarioRef === scenarioRef,
  );
}

function evaluateScenarioCoverage(
  profile: DomainReadingProfile,
  eligible: readonly InterpretationClaim[],
  scenarioRef: string | undefined,
): ReadingScenarioCoverage {
  const scoped = scenarioClaims(eligible, scenarioRef);
  const matchedRequirementIds: string[] = [];
  const targetIds = new Set<string>();

  for (const group of profile.requiredClaimSelectors) {
    const matches = scoped.filter((claim) =>
      group.anyOf.some((selector) => matchesSelector(claim, selector)),
    );
    if (matches.length > 0) {
      matchedRequirementIds.push(group.requirementId);
      for (const claim of matches) targetIds.add(claim.claimId);
    }
  }

  for (const selector of profile.optionalClaimSelectors) {
    for (const claim of scoped) {
      if (matchesSelector(claim, selector)) targetIds.add(claim.claimId);
    }
  }

  const matched = new Set(matchedRequirementIds);
  const policy = profile.minimumUsefulReading;
  let complete = matched.size === profile.requiredClaimSelectors.length;
  let missingRequirements: string[];

  if (policy === undefined) {
    missingRequirements = profile.requiredClaimSelectors
      .map((group) => group.requirementId)
      .filter((requirementId) => !matched.has(requirementId));
  } else {
    const missingCore = policy.coreRequirementIds.filter((requirementId) => !matched.has(requirementId));
    const supplementaryMatches = policy.supplementaryRequirementIds.filter((requirementId) =>
      matched.has(requirementId),
    ).length;
    complete =
      missingCore.length === 0 &&
      supplementaryMatches >= policy.minimumSupplementaryMatches;
    missingRequirements = [...missingCore];
    if (supplementaryMatches < policy.minimumSupplementaryMatches) {
      missingRequirements.push(
        `MUR_SUPPLEMENTARY_MINIMUM_NOT_MET:${supplementaryMatches}/${policy.minimumSupplementaryMatches}`,
      );
    }
  }

  const coverageState: Exclude<ReadingCoverageState, 'unsupported_intent'> = complete
    ? 'complete'
    : matched.size === 0
      ? 'insufficient_evidence'
      : 'partial_coverage';

  return {
    ...(scenarioRef === undefined ? {} : { scenarioRef }),
    coverageState,
    matchedRequirementIds: matchedRequirementIds.sort(),
    missingRequirements: missingRequirements.sort(),
    targetClaimIds: [...targetIds].sort(),
  };
}

export function evaluateScenarioAwareReadingCoverage(
  profile: DomainReadingProfile,
  claims: readonly InterpretationClaim[],
): {
  coverageState: Exclude<ReadingCoverageState, 'unsupported_intent'>;
  targetClaimIds: readonly string[];
  missingRequirements: readonly string[];
  scenarioCoverage: readonly ReadingScenarioCoverage[];
} {
  validateMinimumUsefulReading(profile);
  const eligible = claims
    .filter((claim) => claim.state === 'active')
    .filter(
      (claim) =>
        !profile.excludedClaimSelectors.some((selector) => matchesSelector(claim, selector)),
    )
    .sort((left, right) => left.claimId.localeCompare(right.claimId));
  const scenarioRefs = [
    ...new Set(
      eligible.flatMap((claim) => (claim.scenarioRef === undefined ? [] : [claim.scenarioRef])),
    ),
  ].sort();
  const scenarioCoverage =
    scenarioRefs.length === 0
      ? [evaluateScenarioCoverage(profile, eligible, undefined)]
      : scenarioRefs.map((scenarioRef) => evaluateScenarioCoverage(profile, eligible, scenarioRef));

  const targetIds = new Set<string>();
  for (const scenario of scenarioCoverage) {
    for (const claimId of scenario.targetClaimIds) targetIds.add(claimId);
  }

  const coverageState: Exclude<ReadingCoverageState, 'unsupported_intent'> = scenarioCoverage.every(
    (scenario) => scenario.coverageState === 'complete',
  )
    ? 'complete'
    : scenarioCoverage.every((scenario) => scenario.coverageState === 'insufficient_evidence')
      ? 'insufficient_evidence'
      : 'partial_coverage';

  const missingRequirements = [
    ...new Set(
      scenarioCoverage.flatMap((scenario) => {
        if (scenario.coverageState === 'complete') return [];
        if (scenario.scenarioRef === undefined) return scenario.missingRequirements;
        return scenario.missingRequirements.map(
          (reason) => `SCENARIO[${scenario.scenarioRef}]:${reason}`,
        );
      }),
    ),
  ].sort();

  return {
    coverageState,
    targetClaimIds: [...targetIds].sort(),
    missingRequirements,
    scenarioCoverage,
  };
}

export function buildReadingCompositionEvidence(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
  request: ReadingRequest,
  options: ReadingCompositionOptions,
): GovernedReadingCompositionEvidenceResult {
  const authorized = buildAuthorizedReadingCompositionEvidence(
    snapshot,
    execution,
    registry,
    request,
    options,
  );

  if (
    authorized.profile === undefined ||
    authorized.selection.profileAuthorization.state !== 'authorized' ||
    authorized.selection.coverageState === 'unsupported_intent'
  ) {
    return authorized;
  }

  const eligible = activeEligibleClaims(execution, authorized.profile);
  const hasScenarioClaims = eligible.some((claim) => claim.scenarioRef !== undefined);
  if (!hasScenarioClaims && authorized.profile.minimumUsefulReading === undefined) {
    return authorized;
  }

  const coverage = evaluateScenarioAwareReadingCoverage(authorized.profile, eligible);
  const targetClaimIds = coverage.targetClaimIds;
  const evidence =
    targetClaimIds.length === 0
      ? undefined
      : buildNarrativeEvidenceBundle(snapshot, execution, registry, {
          requestId: request.requestId,
          purpose: request.intent.domain === 'question_specific' ? 'question_answer' : 'section_reading',
          narrativePolicyVersion: options.narrativePolicyVersion,
          targetClaimIds,
          ...(request.outputPreferences?.includeSourceSummaries === true
            ? { includeSourceSummaries: true }
            : {}),
        });
  const selectedClaimIds =
    evidence?.bundle.claims.map((claim) => claim.claimId).sort() ?? [];
  const selected = new Set(selectedClaimIds);
  const active = execution.claims
    .filter((claim) => claim.state === 'active')
    .sort((left, right) => left.claimId.localeCompare(right.claimId));
  const selectedClaims = active.filter((claim) => selected.has(claim.claimId));
  const scenarioRefs = [
    ...new Set(
      selectedClaims.flatMap((claim) => (claim.scenarioRef === undefined ? [] : [claim.scenarioRef])),
    ),
  ].sort();
  const conflictRelationIds = execution.claimRelations
    .filter(
      (relation) =>
        relation.relation === 'contradicts' &&
        selected.has(relation.fromClaimId) &&
        selected.has(relation.toClaimId),
    )
    .map((relation) => relation.relationId)
    .sort();
  const omittedClaimIds = active
    .filter((claim) => !selected.has(claim.claimId))
    .map((claim) => claim.claimId)
    .sort();

  const { selectionId: priorSelectionId, ...priorSelection } = authorized.selection;
  void priorSelectionId;
  const selectionMaterial = {
    ...priorSelection,
    coverageState: coverage.coverageState,
    targetClaimIds,
    selectedClaimIds,
    omittedClaimIds,
    missingRequirements: coverage.missingRequirements,
    scenarioRefs,
    scenarioCoverage: coverage.scenarioCoverage,
    conflictRelationIds,
  };
  const selection = {
    selectionId: `reading_selection_${deterministicContentHash(selectionMaterial).slice(0, 24)}`,
    ...selectionMaterial,
  };

  return {
    ...authorized,
    selection,
    ...(evidence === undefined ? { evidence: undefined } : { evidence }),
  };
}
