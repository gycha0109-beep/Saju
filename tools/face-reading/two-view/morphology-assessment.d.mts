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
