import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { InterpretationPack, InterpretationClaim } from '../contracts/interpretation.js';
import {
  runInterpretation,
  type InterpretationRunOptions,
} from './interpretation-engine.js';
import { createRuleRegistrySnapshot } from './rule-registry.js';
import { createBusinessNatalReadingCandidateRegistry } from '../research/business-natal-reading-candidate.js';
import { createCareerT6BranchClashContextRegistry } from '../research/career-personalized-t6-branch-clash-hidden-stem-context.js';
import type {
  CareerT6PublicClassicBoundedScopeMethodologyReviewReport,
} from '../research/career-personalization-t6-public-classic-bounded-scope-methodology-review.js';
import { GENERAL_NATAL_POSITION_QUALIFIED_T5_RULES } from './general-natal-position-qualified-reading.js';
import {
  bindGeneralNatalStemInteractionWitnesses,
} from './general-natal-stem-interaction-witness.js';
import type { GeneralNatalC2StemEvidence } from './general-natal-position-qualified-reading.js';
import { bindGeneralNatalC3StructuralEvidence } from './general-natal-c3-structural-evidence.js';
import { bindGeneralNatalC4MethodScopedEvidence } from './general-natal-c4-method-scoped-evidence.js';
import { buildReadingCompositionEvidence } from '../reading/reading-intent-composition.js';

export const GENERAL_NATAL_C5_SHARED_DOMAIN_VERSION = '0.1.0-research' as const;
export type GeneralNatalC5Domain = 'career' | 'wealth' | 'business' | 'relationship';
const DOMAINS = ['career', 'wealth', 'business', 'relationship'] as const satisfies readonly GeneralNatalC5Domain[];

/**
 * Use the existing cumulative Business natal registry as the only T8 source:
 * it already contains the established four independent domain T8 methods.
 * Add exact-slot T5 witnesses and the pre-gated bounded Career T6 facts;
 * no copied T8 rule, newly invented domain semantics, or parallel calculator.
 */
export function createGeneralNatalC5SharedDomainResearchRegistry(
  p4Report: CareerT6PublicClassicBoundedScopeMethodologyReviewReport,
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  const domains = createBusinessNatalReadingCandidateRegistry(createdAt);
  const careerT6 = createCareerT6BranchClashContextRegistry(p4Report, createdAt);
  const addedRuleSets = [
    ...GENERAL_NATAL_POSITION_QUALIFIED_T5_RULES.map((rule) => rule.ruleSetId),
    ...careerT6.pack.enabledRuleSets,
  ];
  const pack: InterpretationPack = {
    ...domains.pack,
    packId: 'PACK-GENERAL-NATAL-C5-FOUR-DOMAIN-SHARED-RESEARCH',
    name: 'Existing four-domain natal T8 with positioned T5 and gated Career T6 (research)',
    methodologyRefs: [...domains.pack.methodologyRefs, ...careerT6.pack.methodologyRefs],
    enabledRuleSets: [...new Set([...domains.pack.enabledRuleSets, ...addedRuleSets])],
    compositionPolicyRef: {
      id: 'COMPOSITION-GENERAL-NATAL-C5-FOUR-DOMAIN-RESEARCH',
      version: GENERAL_NATAL_C5_SHARED_DOMAIN_VERSION,
    },
    status: 'research',
  };
  return createRuleRegistrySnapshot(
    {
      rules: [
        ...domains.rules,
        ...GENERAL_NATAL_POSITION_QUALIFIED_T5_RULES,
        ...careerT6.rules,
      ],
      methodologies: [...domains.methodologies, ...careerT6.methodologies],
      sources: [...domains.sources, ...careerT6.sources],
      claimTypeDefinitions: careerT6.claimTypeDefinitions,
      claimValueSchemas: careerT6.claimValueSchemas,
    },
    pack,
    createdAt,
  );
}

function stemEvidence(
  snapshot: CanonicalSajuSnapshot,
  interpretation: ReturnType<typeof runInterpretation>,
): GeneralNatalC2StemEvidence {
  const settlement = snapshot.derivedFacts.stemInteractionSettlements;
  if (settlement === undefined) {
    return { status: 'unavailable', reasonCode: 'canonical_stem_settlement_absent' };
  }
  if (settlement.status === 'unavailable') {
    return { status: 'unavailable', reasonCode: settlement.reasonCode };
  }
  if (settlement.status === 'ambiguous') {
    return { status: 'ambiguous', reasonCodes: [...settlement.reasonCodes] };
  }
  return {
    status: 'resolved',
    witnesses: bindGeneralNatalStemInteractionWitnesses(snapshot, interpretation),
  };
}

function exactDomainTargets(
  domain: GeneralNatalC5Domain,
  selection: ReturnType<typeof buildReadingCompositionEvidence>['selection'],
  interpretation: ReturnType<typeof runInterpretation>,
  domainRuleIds: ReadonlySet<string>,
) {
  return selection.targetClaimIds.map((id) => {
    const claim: InterpretationClaim | undefined = interpretation.claims.find(
      (item) => item.claimId === id,
    );
    if (
      claim === undefined ||
      claim.state !== 'active' ||
      claim.taxonomy.tier !== 'T8' ||
      claim.taxonomy.category !== domain ||
      !claim.ruleRefs.some((ref) => domainRuleIds.has(ref.ruleId))
    ) {
      throw new Error('WS_C5_DOMAIN_TARGET_AUTHORITY_MISMATCH');
    }
    return {
      claimId: claim.claimId,
      claimType: claim.claimType,
      methodologyRef: claim.methodologyRef,
      upstreamClaimRefs: [...claim.upstreamClaimRefs],
      factRefs: [...claim.factRefs],
    };
  });
}

/**
 * One canonical snapshot + one registry + one interpretation run.
 * The four domain profiles select only existing domain T8 targets. C2/C3/C4
 * evidence stays independent context; none is silently promoted to a domain
 * inference, consumer authorization or production claim.
 */
export function executeGeneralNatalC5SharedDomainResearch(
  snapshot: CanonicalSajuSnapshot,
  p4Report: CareerT6PublicClassicBoundedScopeMethodologyReviewReport,
  options: InterpretationRunOptions = {},
) {
  const registry = createGeneralNatalC5SharedDomainResearchRegistry(
    p4Report, options.now?.toISOString(),
  );
  const interpretation = runInterpretation(snapshot, registry, options);
  if (!interpretation.integrity.valid || interpretation.run.status === 'failed') {
    throw new Error('WS_C5_INTERPRETATION_INVALID');
  }
  // A partial research run is legitimate when some optional rules are not
  // applicable; each domain ReadingProfile reports its own coverage state.
  const domainSource = createBusinessNatalReadingCandidateRegistry(
    options.now?.toISOString(),
  );
  const approvedExistingRuleIds = new Set(
    domainSource.rules.filter((rule) =>
      rule.taxonomy.tier === 'T8' &&
      DOMAINS.some((domain) => rule.taxonomy.category === domain)
    ).map((rule) => rule.ruleId),
  );
  const c3Evidence = bindGeneralNatalC3StructuralEvidence(snapshot, interpretation);
  const c4Evidence = bindGeneralNatalC4MethodScopedEvidence(
    snapshot, interpretation, c3Evidence,
  );
  const domainReadings = Object.fromEntries(
    DOMAINS.map((domain) => {
      const reading = buildReadingCompositionEvidence(
        snapshot,
        interpretation,
        registry,
        {
          requestId: (options.requestId ?? 'ws-c5-shared') + '-' + domain,
          intent: domain === 'relationship'
            ? { domain, temporalScope: 'natal', relationshipScope: 'general' }
            : { domain, temporalScope: 'natal' },
        },
      );
      if (reading.profile === undefined) {
        throw new Error('WS_C5_DOMAIN_PROFILE_MISSING');
      }
      const targets = exactDomainTargets(
        domain, reading.selection, interpretation, approvedExistingRuleIds,
      );
      return [domain, {
        profileId: reading.profile.profileId,
        selection: reading.selection,
        targetClaims: targets,
        semantics: 'existing_research_t8_only' as const,
        sharedContextUsedAsDomainPremise: false as const,
        consumerAuthorizationGranted: false as const,
      }];
    }),
  ) as Record<GeneralNatalC5Domain, {
    profileId: string;
    selection: ReturnType<typeof buildReadingCompositionEvidence>['selection'];
    targetClaims: ReturnType<typeof exactDomainTargets>;
    semantics: 'existing_research_t8_only';
    sharedContextUsedAsDomainPremise: false;
    consumerAuthorizationGranted: false;
  }>;

  return {
    schemaVersion: GENERAL_NATAL_C5_SHARED_DOMAIN_VERSION,
    registry,
    interpretation,
    executionCompleteness: interpretation.run.completeness,
    stemEvidence: stemEvidence(snapshot, interpretation),
    c3Evidence,
    c4Evidence,
    domainReadings,
    productionAuthorityPromoted: false as const,
    newT8SemanticsIntroduced: false as const,
  };
}
