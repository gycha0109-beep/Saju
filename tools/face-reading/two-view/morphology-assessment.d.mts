import { readingCatalogue } from './reading-catalogue.mjs';
export type MorphologyCard = ReturnType<typeof readingCatalogue>['items'][number] & {
  status: 'observed' | 'partial' | 'unavailable';
  classification: string | null;
  observation: string;
  measurements: string[];
  missing: string[];
};
export function assessMorphology(input: {
  record: { captureRef: string; viewRole: 'frontal' | 'profile' };
  result?: { parsing?: unknown; previousParsing?: unknown; metrics?: unknown[] };
  catalogue: ReturnType<typeof readingCatalogue>;
  previous?: boolean;
}): MorphologyCard[];

export function summarizeMorphologyReadingEvidence(
  cards: ReadonlyArray<
    Pick<
      MorphologyCard,
      | 'id'
      | 'title'
      | 'status'
      | 'observation'
      | 'missing'
      | 'sourceRefs'
      | 'traditionalBindingAuthorized'
    >
  >,
  captureScreenEligibility?: 'frontal_candidate' | 'pending' | 'rejected' | 'unavailable',
): Readonly<{
  version: 'local-whole-face-reading-evidence@0.1.0';
  lifecycle: 'local_research_only';
  regionCount: number;
  modelCandidateRegionCount: number;
  withheldRegionCount: number;
  sourceContextRegionCount: number;
  observations: ReadonlyArray<
    Readonly<{
      id: string;
      title: string;
      evidenceState: 'withheld' | 'model_candidate_only';
      description: string;
    }>
  >;
  independentHumanAccuracyValidated: false;
  canonicalF0Admitted: false;
  traditionalF1Matched: false;
  traditionalInterpretationAuthorized: false;
  productionAuthorized: false;
  rawBiometricDataIncluded: false;
}>;
