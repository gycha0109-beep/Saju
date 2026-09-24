import type { TenGod } from '../contracts/calculation.js';
import type { GovernedReadingEvidenceBundleV1 } from '../reading/governed-reading-evidence.js';
import type { ReadingIntent } from '../contracts/reading.js';
import type { ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import {
  CAREER_NATAL_READING_METHODOLOGY,
} from '../research/career-natal-reading-candidate.js';
import {
  CAREER_TEN_GOD_SEMANTIC_SPECS,
  careerTenGodClaimType,
  type CareerTenGodChannel,
} from '../research/career-natal-reading-schema.js';
import { careerNatalSemanticText } from '../research/career-natal-semantic-copy.js';
import type { CanonicalReadingSemanticTextBindingV1 } from '../reading/canonical-reading-semantics.js';
import {
  PREVIEW_SEMANTIC_ADMISSION_REGISTRY_VERSION,
  requirePreviewSemanticAdmissionV1,
} from './preview-semantic-admission.js';

export const PREVIEW_SEMANTIC_TEXT_PROJECTION_VERSION =
  'myeonghwa-preview-semantic-text-projection-v1' as const;

export interface PreviewSemanticTextProjectionInputV1 {
  intent: ReadingIntent;
  registry: ResolvedRuleRegistrySnapshot;
  evidence: GovernedReadingEvidenceBundleV1;
  targetClaimIds: readonly string[];
}

function isCareerNatal(intent: ReadingIntent): boolean {
  return intent.domain === 'career' && intent.temporalScope === 'natal';
}

function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isCareerTenGod(value: unknown): value is TenGod {
  return (
    typeof value === 'string' &&
    Object.prototype.hasOwnProperty.call(CAREER_TEN_GOD_SEMANTIC_SPECS, value)
  );
}

function isCareerChannel(value: unknown): value is CareerTenGodChannel {
  return value === 'visible_stems' || value === 'branches';
}

export function buildPreviewSemanticTextBindingsV1(
  input: PreviewSemanticTextProjectionInputV1,
): readonly CanonicalReadingSemanticTextBindingV1[] {
  if (!isCareerNatal(input.intent)) return [];

  const targetClaimIds = new Set(input.targetClaimIds);
  const careerTargets = input.evidence.claims.filter(
    (claim) =>
      targetClaimIds.has(claim.claimId) &&
      claim.taxonomy.tier === 'T8' &&
      claim.taxonomy.category === 'career' &&
      (claim.predicate === 'career_conclusion' || claim.predicate === 'career_context'),
  );
  if (careerTargets.length === 0) return [];

  if (input.registry.pack.status !== 'research') {
    throw new TypeError(
      'Preview semantic text projection refuses Career research semantics in a non-research pack.',
    );
  }

  const admission = requirePreviewSemanticAdmissionV1(
    'CAREER_NATAL_READING_CANDIDATE',
    'career:natal',
  );
  if (admission.disposition !== 'claim') {
    throw new TypeError('Career Preview semantic text requires claim admission.');
  }

  return careerTargets
    .map((claim): CanonicalReadingSemanticTextBindingV1 => {
      if (
        claim.methodologyRef.id !== CAREER_NATAL_READING_METHODOLOGY.methodologyId ||
        claim.methodologyRef.version !== CAREER_NATAL_READING_METHODOLOGY.version
      ) {
        throw new TypeError(
          `Career Preview semantic text refuses an unrecognized methodology: ${claim.claimId}`,
        );
      }
      if (!isRecord(claim.value)) {
        throw new TypeError(`Career Preview semantic text requires object claim value: ${claim.claimId}`);
      }
      const tenGod = claim.value.tenGod;
      const channel = claim.value.channel;
      if (!isCareerTenGod(tenGod) || !isCareerChannel(channel)) {
        throw new TypeError(
          `Career Preview semantic text requires exact Ten-God and channel: ${claim.claimId}`,
        );
      }
      if (claim.claimType !== careerTenGodClaimType(tenGod, channel)) {
        throw new TypeError(
          `Career Preview semantic text claim type does not match its semantic keys: ${claim.claimId}`,
        );
      }

      return {
        targetClaimId: claim.claimId,
        canonicalText: careerNatalSemanticText(tenGod, channel),
        provenance: {
          admissionId: admission.admissionId,
          admissionRegistryVersion: PREVIEW_SEMANTIC_ADMISSION_REGISTRY_VERSION,
          researchId: admission.researchRef.researchId,
          researchVersion: admission.researchRef.observedVersion,
          authorityState: admission.researchRef.observedAuthorityState,
        },
      };
    })
    .sort((left, right) => left.targetClaimId.localeCompare(right.targetClaimId));
}
