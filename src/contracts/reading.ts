import type { ContentAddressedVersionedRef } from './common.js';
import type { TaxonomyTier } from './interpretation.js';

export type ReadingDomain =
  | 'general'
  | 'family'
  | 'relationship'
  | 'compatibility'
  | 'career'
  | 'business'
  | 'wealth'
  | 'life_stage'
  | 'question_specific';

export type ReadingTemporalScope = 'natal' | 'annual' | 'monthly' | 'life_stage';

export type ReadingRelationshipScope = 'general' | 'parents' | 'children' | 'spouse';

export interface ReadingIntent {
  domain: ReadingDomain;
  temporalScope: ReadingTemporalScope;
  relationshipScope?: ReadingRelationshipScope;
}

export type ReadingTargetPeriod =
  | {
      scope: 'annual';
      year: number;
      timeZone: 'Asia/Seoul';
      referenceDateTime: string;
      resolution: 'relative_current';
    }
  | {
      scope: 'monthly';
      year: number;
      month: number;
      timeZone: 'Asia/Seoul';
      referenceDateTime: string;
      resolution: 'relative_current';
    };

export interface ReadingRequest {
  requestId: string;
  intent: ReadingIntent;
  targetPeriod?: ReadingTargetPeriod;
  targetPersonRef?: string;
  question?: string;
  outputPreferences?: {
    preferredDetail?: 'concise' | 'standard' | 'detailed';
    includeSourceSummaries?: boolean;
  };
}

export interface ReadingClaimSelector {
  selectorId: string;
  taxonomy?: {
    tiers?: readonly Exclude<TaxonomyTier, 'T0'>[];
    categories?: readonly string[];
    subcategories?: readonly string[];
  };
  claimTypes?: readonly string[];
  subjects?: readonly string[];
  predicates?: readonly string[];
}

export interface ReadingClaimSelectorGroup {
  requirementId: string;
  anyOf: readonly ReadingClaimSelector[];
}

export interface MinimumUsefulReadingPolicy {
  coreRequirementIds: readonly string[];
  supplementaryRequirementIds: readonly string[];
  minimumSupplementaryMatches: number;
  scenarioMode: 'each_scenario';
}

export interface DomainReadingProfile {
  profileId: string;
  version: string;
  registryVersion: string;
  intent: ReadingIntent;
  requiredClaimSelectors: readonly ReadingClaimSelectorGroup[];
  optionalClaimSelectors: readonly ReadingClaimSelector[];
  excludedClaimSelectors: readonly ReadingClaimSelector[];
  temporalRequirements: {
    scope: ReadingTemporalScope;
    periodEvidence: 'not_required' | 'required';
    explicitPeriodSubcategoryRequired: boolean;
  };
  scenarioHandling: 'preserve_claim_scenarios';
  ambiguityHandling: 'preserve';
  conflictPolicy: 'preserve_all';
  minimumEvidencePolicy: {
    complete: 'all_required_groups';
    partial: 'some_required_groups';
    insufficient: 'no_required_groups';
  };
  minimumUsefulReading?: MinimumUsefulReadingPolicy;
}

export type ReadingCoverageState =
  | 'complete'
  | 'partial_coverage'
  | 'insufficient_evidence'
  | 'unsupported_intent';

export interface ReadingScenarioCoverage {
  scenarioRef?: string;
  coverageState: Exclude<ReadingCoverageState, 'unsupported_intent'>;
  matchedRequirementIds: readonly string[];
  missingRequirements: readonly string[];
  targetClaimIds: readonly string[];
}

export interface ReadingEvidenceSelection {
  selectionId: string;
  intent: ReadingIntent;
  profileRef?: ContentAddressedVersionedRef;
  coverageState: ReadingCoverageState;
  targetClaimIds: readonly string[];
  selectedClaimIds: readonly string[];
  omittedClaimIds: readonly string[];
  missingRequirements: readonly string[];
  scenarioRefs: readonly string[];
  scenarioCoverage?: readonly ReadingScenarioCoverage[];
  conflictRelationIds: readonly string[];
  constraints: {
    mayGenerateClaims: false;
    mayResolveConflicts: false;
    mayCollapseScenarios: false;
    mayPromoteResearchAuthority: false;
  };
}

export type ReadingStatus =
  | 'ready'
  | 'ready_with_ambiguity'
  | 'partial'
  | 'cannot_calculate'
  | 'cannot_interpret'
  | 'narrative_fallback';

export interface DisplayFact {
  label: string;
  value?: string;
  status: 'resolved' | 'ambiguous' | 'unavailable';
}

export interface CalculationAmbiguityView {
  ambiguityId: string;
  title: string;
  summary: string;
  affectedPaths: readonly string[];
}

export interface CalculationSummaryView {
  pillars: {
    year: DisplayFact;
    month: DisplayFact;
    day: DisplayFact;
    hour: DisplayFact;
  };
  calendar?: readonly DisplayFact[];
  fiveElements?: readonly DisplayFact[];
  tenGods?: readonly DisplayFact[];
  luckPillars?: readonly DisplayFact[];
  ambiguity?: readonly CalculationAmbiguityView[];
}

export interface ParagraphBlock {
  type: 'paragraph';
  text: string;
}

export interface KeyPointBlock {
  type: 'key_points';
  items: readonly string[];
}

export interface ComparisonBlock {
  type: 'comparison';
  title: string;
  perspectives: readonly {
    label: string;
    text: string;
  }[];
}

export interface AmbiguityBlock {
  type: 'ambiguity';
  summary: string;
  scenarios: readonly {
    label: string;
    text: string;
  }[];
}

export interface TimelineBlock {
  type: 'timeline';
  entries: readonly {
    label: string;
    text: string;
  }[];
}

export interface FactTableBlock {
  type: 'fact_table';
  rows: readonly {
    label: string;
    value: string;
  }[];
}

export interface SourceHintBlock {
  type: 'source_hint';
  text: string;
  explainabilityRef: string;
}

export type ReadingBlockView =
  | ParagraphBlock
  | KeyPointBlock
  | ComparisonBlock
  | AmbiguityBlock
  | TimelineBlock
  | FactTableBlock
  | SourceHintBlock;

export interface ReadingSectionView {
  sectionId: string;
  sectionType:
    | 'overview'
    | 'structure'
    | 'personality'
    | 'career'
    | 'wealth'
    | 'relationship'
    | 'health_tendency'
    | 'timing'
    | 'compatibility'
    | 'custom';
  title: string;
  blocks: readonly ReadingBlockView[];
  state: 'complete' | 'partial' | 'unavailable';
  disclosureRefs?: readonly string[];
  explainabilityRefs?: readonly string[];
}

export interface ReadingDisclosureView {
  disclosureId: string;
  type:
    | 'calculation_ambiguity'
    | 'methodology_difference'
    | 'insufficient_evidence'
    | 'scope_limitation';
  text: string;
}

export interface ExplainabilityIndex {
  entries: readonly {
    explainabilityRef: string;
    claimIds: readonly string[];
    factRefs: readonly string[];
    methodologyIds: readonly string[];
    sourceIds: readonly string[];
  }[];
}

export interface ReadingArtifact {
  readingId: string;
  schemaVersion: string;
  status: ReadingStatus;
  brand: {
    brandId: 'myeonghwa';
    displayName: '명화';
  };
  subject: {
    displayLabel?: string;
    birthInputDisplay: {
      calendarType: 'solar' | 'lunar';
      date: string;
      time?: string;
      timeKnown: boolean;
      leapMonth?: boolean;
      birthplaceLabel?: string;
    };
    calculationState: 'resolved' | 'partially_ambiguous' | 'insufficient_input';
  };
  calculationSummary: CalculationSummaryView;
  sections: readonly ReadingSectionView[];
  disclosures: readonly ReadingDisclosureView[];
  explainability: ExplainabilityIndex;
  provenance: {
    snapshotId: string;
    interpretationRunId: string;
    narrativeRunId?: string;
    readingVersion: string;
  };
  generatedAt: string;
}
