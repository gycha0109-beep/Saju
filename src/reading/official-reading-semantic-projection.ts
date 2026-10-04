import type { ReadingIntent } from '../contracts/reading.js';
import type { ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import type {
  CanonicalReadingSemanticQualifierBindingV1,
  CanonicalReadingSemanticTextBindingV1,
} from './canonical-reading-semantics.js';
import type { GovernedReadingEvidenceBundleV1 } from './governed-reading-evidence.js';

export interface OfficialReadingSemanticProjectionInputV1 {
  intent: ReadingIntent;
  registry: ResolvedRuleRegistrySnapshot;
  evidence: GovernedReadingEvidenceBundleV1;
  targetClaimIds: readonly string[];
}

export interface OfficialReadingSemanticProjectionV1 {
  semanticTextBindings: readonly CanonicalReadingSemanticTextBindingV1[];
  semanticQualifierBindings: readonly CanonicalReadingSemanticQualifierBindingV1[];
}

export type OfficialReadingSemanticProjectionResolverV1 = (
  input: OfficialReadingSemanticProjectionInputV1,
) =>
  | OfficialReadingSemanticProjectionV1
  | Promise<OfficialReadingSemanticProjectionV1>;
