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
