import type { CanonicalReadingSemanticTextV1 } from './canonical-reading-semantics.js';

export type OfficialReadingConciseDomainKeyV1 =
  | 'general:natal'
  | 'career:natal'
  | 'wealth:natal'
  | 'relationship:natal:general'
  | 'business:natal';

export interface ApprovedOfficialReadingConciseDefinitionV1 {
  owner: OfficialReadingConciseDomainKeyV1;
  profileId: string;
  profileVersion: '1';
  claimType: string;
  methodologyRef: {
    id: string;
    version: string;
  };
  standardText: CanonicalReadingSemanticTextV1;
  semanticQualifiers: readonly unknown[];
  prohibitedExtensions: readonly string[];
  conciseText: string;
}

export const OFFICIAL_READING_CONCISE_NO_QUALIFIERS: readonly unknown[] =
  Object.freeze([]);
