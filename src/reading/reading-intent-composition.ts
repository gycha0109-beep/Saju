import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import type { InterpretationClaim } from '../contracts/interpretation.js';
import type {
  DomainReadingProfile,
  ReadingClaimSelector,
  ReadingClaimSelectorGroup,
  ReadingCoverageState,
  ReadingEvidenceSelection,
  ReadingIntent,
  ReadingRequest,
  ReadingTemporalScope,
} from '../contracts/reading.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import {
  deterministicContentHash,
  type ResolvedRuleRegistrySnapshot,
} from '../interpretation/rule-registry.js';
import {
  EvidenceSelectionError,
  buildNarrativeEvidenceBundle,
  type BuiltNarrativeEvidenceBundle,
} from '../narrative/evidence-selector.js';

export const READING_PROFILE_REGISTRY_VERSION = 'myeonghwa-reading-profile-registry-v1';
const READING_PROFILE_VERSION = '1.0.0';

export interface ResolvedDomainReadingProfile {
  profile: DomainReadingProfile;
  profileRef: ContentAddressedVersionedRef;
}

export interface ReadingCompositionOptions {
  narrativePolicyVersion: string;
}

export interface ReadingCompositionEvidenceResult {
  selection: ReadingEvidenceSelection;
  profile?: DomainReadingProfile;
  evidence?: BuiltNarrativeEvidenceBundle;
}

function taxonomySelector(
  selectorId: string,
  tier: 'T8' | 'T9' | 'T10' | 'T11',
  category?: string,
  subcategory?: string,
): ReadingClaimSelector {
  return {
    selectorId,
    taxonomy: {
      tiers: [tier],
      ...(category === undefined ? {} : { categories: [category] }),
      ...(subcategory === undefined ? {} : { subcategories: [subcategory] }),
    },
  };
}

function requiredGroup(
  requirementId: string,
  ...selectors: readonly ReadingClaimSelector[]
): ReadingClaimSelectorGroup {
  return { requirementId, anyOf: selectors };
}

function oppositePeriod(scope: ReadingTemporalScope): 'annual' | 'monthly' | undefined {
  if (scope === 'annual') return 'monthly';
  if (scope === 'monthly') return 'annual';
  return undefined;
}

function normalizedIntent(intent: ReadingIntent): ReadingIntent {
  return {
    domain: intent.domain,
    temporalScope: intent.temporalScope,
    ...(intent.relationshipScope === undefined
      ? {}
      : { relationshipScope: intent.relationshipScope }),
  };
}

function makeProfile(
  intent: ReadingIntent,
  profileKey: string,
  requiredClaimSelectors: readonly ReadingClaimSelectorGroup[],
  excludedClaimSelectors: readonly ReadingClaimSelector[],
): DomainReadingProfile {
  const periodEvidence =
    intent.temporalScope === 'annual' ||
    intent.temporalScope === 'monthly' ||
    intent.temporalScope === 'life_stage';

  return {
    profileId: `myeonghwa-reading-profile-${profileKey}`,
    version: READING_PROFILE_VERSION,
    registryVersion: READING_PROFILE_REGISTRY_VERSION,
    intent: normalizedIntent(intent),
    requiredClaimSelectors,
    optionalClaimSelectors: [],
    excludedClaimSelectors,
    temporalRequirements: {
      scope: intent.temporalScope,
      periodEvidence: periodEvidence ? 'required' : 'not_required',
      explicitPeriodSubcategoryRequired:
        intent.temporalScope === 'annual' || intent.temporalScope === 'monthly',
    },
    scenarioHandling: 'preserve_claim_scenarios',
    ambiguityHandling: 'preserve',
    conflictPolicy: 'preserve_all',
    minimumEvidencePolicy: {
      complete: 'all_required_groups',
      partial: 'some_required_groups',
      insufficient: 'no_required_groups',
    },
  };
}

function periodProfile(
  intent: ReadingIntent,
  domainCategory: 'career' | 'business' | 'wealth',
): DomainReadingProfile | undefined {
  if (intent.relationshipScope !== undefined) return undefined;
  if (intent.temporalScope === 'natal') {
    return makeProfile(
      intent,
      `${domainCategory}-natal-v1`,
      [
        requiredGroup(
          `NATAL_${domainCategory.toUpperCase()}_DOMAIN_CLAIM_REQUIRED`,
          taxonomySelector(`target-${domainCategory}-natal`, 'T8', domainCategory),
        ),
      ],
      [taxonomySelector(`exclude-${domainCategory}-period`, 'T9', domainCategory)],
    );
  }
  if (intent.temporalScope !== 'annual' && intent.temporalScope !== 'monthly') {
    return undefined;
  }

  const opposite = oppositePeriod(intent.temporalScope);
  return makeProfile(
    intent,
    `${domainCategory}-${intent.temporalScope}-v1`,
    [
      requiredGroup(
        `NATAL_${domainCategory.toUpperCase()}_DOMAIN_CLAIM_REQUIRED`,
        taxonomySelector(`target-${domainCategory}-natal`, 'T8', domainCategory),
      ),
      requiredGroup(
        `${intent.temporalScope.toUpperCase()}_${domainCategory.toUpperCase()}_PERIOD_CLAIM_REQUIRED`,
        taxonomySelector(
          `target-${domainCategory}-${intent.temporalScope}`,
          'T9',
          domainCategory,
          intent.temporalScope,
        ),
      ),
    ],
    opposite === undefined
      ? []
      : [taxonomySelector(`exclude-${domainCategory}-${opposite}`, 'T9', domainCategory, opposite)],
  );
}

function buildProfile(intent: ReadingIntent): DomainReadingProfile | undefined {
  switch (intent.domain) {
    case 'general': {
      if (intent.relationshipScope !== undefined) return undefined;
      if (intent.temporalScope === 'natal') {
        return makeProfile(
          intent,
          'general-natal-v1',
          [
            requiredGroup(
              'NATAL_DOMAIN_SYNTHESIS_CLAIM_REQUIRED',
              taxonomySelector('target-general-natal', 'T8', 'general'),
            ),
          ],
          [
            taxonomySelector('exclude-general-period', 'T9'),
            taxonomySelector('exclude-general-compatibility', 'T10'),
            taxonomySelector('exclude-general-question', 'T11'),
          ],
        );
      }
      if (intent.temporalScope === 'annual' || intent.temporalScope === 'monthly') {
        const opposite = oppositePeriod(intent.temporalScope);
        return makeProfile(
          intent,
          `general-${intent.temporalScope}-v1`,
          [
            requiredGroup(
              `${intent.temporalScope.toUpperCase()}_PERIOD_CLAIM_REQUIRED`,
              taxonomySelector(
                `target-general-${intent.temporalScope}`,
                'T9',
                undefined,
                intent.temporalScope,
              ),
            ),
          ],
          opposite === undefined
            ? []
            : [taxonomySelector(`exclude-general-${opposite}`, 'T9', undefined, opposite)],
        );
      }
      return undefined;
    }
    case 'family': {
      if (intent.temporalScope !== 'natal') return undefined;
      if (intent.relationshipScope !== 'parents' && intent.relationshipScope !== 'children') {
        return undefined;
      }
      const opposite = intent.relationshipScope === 'parents' ? 'children' : 'parents';
      return makeProfile(
        intent,
        `family-${intent.relationshipScope}-natal-v1`,
        [
          requiredGroup(
            `FAMILY_${intent.relationshipScope.toUpperCase()}_DOMAIN_CLAIM_REQUIRED`,
            taxonomySelector(
              `target-family-${intent.relationshipScope}`,
              'T8',
              'family',
              intent.relationshipScope,
            ),
          ),
        ],
        [taxonomySelector(`exclude-family-${opposite}`, 'T8', 'family', opposite)],
      );
    }
    case 'relationship': {
      if (intent.temporalScope !== 'natal') return undefined;
      if (intent.relationshipScope !== 'general' && intent.relationshipScope !== 'spouse') {
        return undefined;
      }
      return makeProfile(
        intent,
        `relationship-${intent.relationshipScope}-natal-v1`,
        [
          requiredGroup(
            `RELATIONSHIP_${intent.relationshipScope.toUpperCase()}_DOMAIN_CLAIM_REQUIRED`,
            taxonomySelector(
              `target-relationship-${intent.relationshipScope}`,
              'T8',
              'relationship',
              intent.relationshipScope === 'general' ? undefined : 'spouse',
            ),
          ),
        ],
        intent.relationshipScope === 'spouse'
          ? [taxonomySelector('exclude-relationship-general', 'T8', 'relationship', 'general')]
          : [],
      );
    }
    case 'compatibility':
      if (intent.temporalScope !== 'natal' || intent.relationshipScope !== undefined) return undefined;
      return makeProfile(
        intent,
        'compatibility-natal-v1',
        [requiredGroup('COMPATIBILITY_CLAIM_REQUIRED', taxonomySelector('target-compatibility', 'T10'))],
        [],
      );
    case 'career':
      return periodProfile(intent, 'career');
    case 'business':
      return periodProfile(intent, 'business');
    case 'wealth':
      return periodProfile(intent, 'wealth');
    case 'life_stage':
      if (intent.temporalScope !== 'life_stage' || intent.relationshipScope !== undefined) return undefined;
      return makeProfile(
        intent,
        'life-stage-general-v1',
        [
          requiredGroup(
            'LIFE_STAGE_PERIOD_CLAIM_REQUIRED',
            taxonomySelector('target-life-stage', 'T9', 'life_stage'),
          ),
        ],
        [],
      );
    case 'question_specific':
      if (intent.temporalScope !== 'natal' || intent.relationshipScope !== undefined) return undefined;
      return makeProfile(
        intent,
        'question-specific-v1',
        [requiredGroup('QUESTION_SPECIFIC_CLAIM_REQUIRED', taxonomySelector('target-question-specific', 'T11'))],
        [],
      );
  }
}

export function resolveDomainReadingProfile(
  intent: ReadingIntent,
): ResolvedDomainReadingProfile | undefined {
  const profile = buildProfile(intent);
  if (profile === undefined) return undefined;
  return {
    profile,
    profileRef: {
      id: profile.profileId,
      version: profile.version,
      contentHash: deterministicContentHash(profile),
    },
  };
}

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

function activeClaims(execution: InterpretationExecutionResult): readonly InterpretationClaim[] {
  return execution.claims
    .filter((claim) => claim.state === 'active')
    .sort((left, right) => left.claimId.localeCompare(right.claimId));
}

function targetSelection(
  execution: InterpretationExecutionResult,
  profile: DomainReadingProfile,
): {
  targetClaimIds: readonly string[];
  missingRequirements: readonly string[];
  coverageState: Exclude<ReadingCoverageState, 'unsupported_intent'>;
} {
  const active = activeClaims(execution);
  const eligible = active.filter(
    (claim) => !profile.excludedClaimSelectors.some((selector) => matchesSelector(claim, selector)),
  );
  const targetIds = new Set<string>();
  const missingRequirements: string[] = [];
  let matchedRequiredGroups = 0;

  for (const group of profile.requiredClaimSelectors) {
    const matches = eligible.filter((claim) =>
      group.anyOf.some((selector) => matchesSelector(claim, selector)),
    );
    if (matches.length === 0) {
      missingRequirements.push(group.requirementId);
      continue;
    }
    matchedRequiredGroups += 1;
    for (const claim of matches) targetIds.add(claim.claimId);
  }

  for (const selector of profile.optionalClaimSelectors) {
    for (const claim of eligible) {
      if (matchesSelector(claim, selector)) targetIds.add(claim.claimId);
    }
  }

  const coverageState: Exclude<ReadingCoverageState, 'unsupported_intent'> =
    matchedRequiredGroups === profile.requiredClaimSelectors.length
      ? 'complete'
      : matchedRequiredGroups === 0
        ? 'insufficient_evidence'
        : 'partial_coverage';

  return {
    targetClaimIds: [...targetIds].sort(),
    missingRequirements: missingRequirements.sort(),
    coverageState,
  };
}

function assertIdentity(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
): void {
  if (execution.run.snapshotId !== snapshot.snapshotId) {
    throw new EvidenceSelectionError(
      'RUN_SNAPSHOT_MISMATCH',
      `Interpretation run snapshot ${execution.run.snapshotId} does not match ${snapshot.snapshotId}.`,
    );
  }
  if (execution.run.registrySnapshotId !== registry.snapshot.registrySnapshotId) {
    throw new EvidenceSelectionError(
      'RUN_REGISTRY_MISMATCH',
      'Interpretation run and Registry Snapshot identities do not match.',
    );
  }
}

function finalizeSelection(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
  intent: ReadingIntent,
  profileRef: ContentAddressedVersionedRef | undefined,
  coverageState: ReadingCoverageState,
  targetClaimIds: readonly string[],
  selectedClaimIds: readonly string[],
  missingRequirements: readonly string[],
): ReadingEvidenceSelection {
  const active = activeClaims(execution);
  const selected = new Set(selectedClaimIds);
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
  const material = {
    intent: normalizedIntent(intent),
    ...(profileRef === undefined ? {} : { profileRef }),
    snapshotId: snapshot.snapshotId,
    interpretationRunId: execution.run.interpretationRunId,
    coverageState,
    targetClaimIds: [...targetClaimIds].sort(),
    selectedClaimIds: [...selectedClaimIds].sort(),
    omittedClaimIds,
    missingRequirements: [...missingRequirements].sort(),
    scenarioRefs,
    conflictRelationIds,
    constraints: {
      mayGenerateClaims: false as const,
      mayResolveConflicts: false as const,
      mayCollapseScenarios: false as const,
      mayPromoteResearchAuthority: false as const,
    },
  };

  return {
    selectionId: `reading_selection_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function unsupportedSelection(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
  request: ReadingRequest,
  reason: string,
): ReadingEvidenceSelection {
  return finalizeSelection(
    snapshot,
    execution,
    request.intent,
    undefined,
    'unsupported_intent',
    [],
    [],
    [reason],
  );
}

export function buildReadingCompositionEvidence(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
  request: ReadingRequest,
  options: ReadingCompositionOptions,
): ReadingCompositionEvidenceResult {
  if (options.narrativePolicyVersion.trim().length === 0) {
    throw new TypeError('narrativePolicyVersion must be a non-empty string.');
  }
  assertIdentity(snapshot, execution, registry);

  if (
    request.intent.domain === 'question_specific' &&
    (request.question === undefined || request.question.trim().length === 0)
  ) {
    return {
      selection: unsupportedSelection(
        snapshot,
        execution,
        request,
        'QUESTION_TEXT_REQUIRED_FOR_QUESTION_SPECIFIC_INTENT',
      ),
    };
  }
  if (request.intent.domain === 'compatibility' && request.targetPersonRef === undefined) {
    return {
      selection: unsupportedSelection(
        snapshot,
        execution,
        request,
        'TARGET_PERSON_REFERENCE_REQUIRED_FOR_COMPATIBILITY_INTENT',
      ),
    };
  }

  const resolvedProfile = resolveDomainReadingProfile(request.intent);
  if (resolvedProfile === undefined) {
    return {
      selection: unsupportedSelection(
        snapshot,
        execution,
        request,
        'READING_PROFILE_NOT_AVAILABLE_FOR_INTENT',
      ),
    };
  }

  const targets = targetSelection(execution, resolvedProfile.profile);
  if (targets.targetClaimIds.length === 0) {
    return {
      profile: resolvedProfile.profile,
      selection: finalizeSelection(
        snapshot,
        execution,
        request.intent,
        resolvedProfile.profileRef,
        targets.coverageState,
        targets.targetClaimIds,
        [],
        targets.missingRequirements,
      ),
    };
  }

  const evidence = buildNarrativeEvidenceBundle(snapshot, execution, registry, {
    requestId: request.requestId,
    purpose: request.intent.domain === 'question_specific' ? 'question_answer' : 'section_reading',
    narrativePolicyVersion: options.narrativePolicyVersion,
    targetClaimIds: targets.targetClaimIds,
    ...(request.outputPreferences?.includeSourceSummaries === true
      ? { includeSourceSummaries: true }
      : {}),
  });
  const selectedClaimIds = evidence.bundle.claims.map((claim) => claim.claimId).sort();

  return {
    profile: resolvedProfile.profile,
    evidence,
    selection: finalizeSelection(
      snapshot,
      execution,
      request.intent,
      resolvedProfile.profileRef,
      targets.coverageState,
      targets.targetClaimIds,
      selectedClaimIds,
      targets.missingRequirements,
    ),
  };
}
