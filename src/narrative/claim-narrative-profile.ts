import type { InterpretationClaim } from '../contracts/interpretation.js';
import type {
  ClaimNarrativeProfile,
  NarrativeAssertion,
  NarrativeEpistemicType,
  NarrativeEvidenceBundle,
  NarrativeSection,
} from '../contracts/narrative.js';

export const CLAIM_NARRATIVE_PROFILE_RENDERER_VERSION =
  'myeonghwa-claim-narrative-profile-renderer-v1';

export const DETERMINISTIC_NARRATIVE_AXIS_ORDER = Object.freeze([
  'core',
  'execution',
  'decision',
  'environment',
  'responsibility',
  'collaboration',
  'tension',
  'limitations',
] as const);

export type DeterministicNarrativeAxis =
  (typeof DETERMINISTIC_NARRATIVE_AXIS_ORDER)[number];

export type ClaimNarrativeProfileErrorCode =
  | 'DUPLICATE_PROFILE_CLAIM_TYPE'
  | 'MISSING_RENDERING_AXIS'
  | 'INVALID_RENDERING_AXIS'
  | 'MISSING_RENDERING_ORDER'
  | 'INVALID_RENDERING_ORDER'
  | 'MISSING_HEADLINE_TEMPLATE'
  | 'MISSING_SUMMARY_TEMPLATE'
  | 'AMBIGUOUS_EPISTEMIC_TYPE'
  | 'PROHIBITED_PHRASE_PRESENT';

export class ClaimNarrativeProfileError extends Error {
  readonly code: ClaimNarrativeProfileErrorCode;
  readonly profileId: string;

  constructor(
    code: ClaimNarrativeProfileErrorCode,
    profileId: string,
    message: string,
  ) {
    super(message);
    this.name = 'ClaimNarrativeProfileError';
    this.code = code;
    this.profileId = profileId;
  }
}

export interface DeterministicNarrativePlanItem {
  claimType: string;
  semanticKeys?: readonly string[];
  profileRef: {
    id: string;
    version: string;
  };
  axis: DeterministicNarrativeAxis;
  order: number;
  language: string;
  sectionTitle: string;
  assertionText: string;
  epistemicType: NarrativeEpistemicType;
  requiredMethodAttribution: boolean;
}

export interface DeterministicNarrativePlan {
  rendererVersion: string;
  language: string;
  items: readonly DeterministicNarrativePlanItem[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value === null || typeof value !== 'object') return value;

  const record = value as Record<string, unknown>;
  return Object.fromEntries(
    Object.keys(record)
      .sort()
      .filter((key) => record[key] !== undefined)
      .map((key) => [key, canonicalize(record[key])]),
  );
}

function claimSemanticKey(claim: InterpretationClaim): string {
  return (
    JSON.stringify(
      canonicalize({
        taxonomy: claim.taxonomy,
        claimType: claim.claimType,
        subject: claim.subject,
        predicate: claim.predicate,
        value: claim.value,
        methodologyRef: claim.methodologyRef,
        polarity: claim.polarity,
        emphasis: claim.emphasis,
      }),
    ) ?? ''
  );
}

function claimProfileSemanticKey(claim: InterpretationClaim): string | undefined {
  if (!isRecord(claim.value)) return undefined;
  const value = claim.value.semanticKey;
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function normalizedSemanticKeys(profile: ClaimNarrativeProfile): readonly string[] | undefined {
  if (profile.semanticKeys === undefined || profile.semanticKeys.length === 0) return undefined;
  return [...new Set(profile.semanticKeys.filter((key) => key.length > 0))].sort();
}

function profileMatchesClaim(profile: ClaimNarrativeProfile, claim: InterpretationClaim): boolean {
  if (profile.claimType !== claim.claimType) return false;
  const semanticKeys = normalizedSemanticKeys(profile);
  if (semanticKeys === undefined) return true;
  const semanticKey = claimProfileSemanticKey(claim);
  return semanticKey !== undefined && semanticKeys.includes(semanticKey);
}

function assertProfileSelectionUnambiguous(profiles: readonly ClaimNarrativeProfile[]): void {
  const byClaimType = new Map<string, ClaimNarrativeProfile[]>();
  for (const profile of profiles) {
    const group = byClaimType.get(profile.claimType) ?? [];
    group.push(profile);
    byClaimType.set(profile.claimType, group);
  }

  for (const [claimType, group] of byClaimType) {
    if (group.length < 2) continue;
    for (let leftIndex = 0; leftIndex < group.length; leftIndex += 1) {
      const left = group[leftIndex];
      if (left === undefined) continue;
      const leftKeys = normalizedSemanticKeys(left);
      for (let rightIndex = leftIndex + 1; rightIndex < group.length; rightIndex += 1) {
        const right = group[rightIndex];
        if (right === undefined) continue;
        const rightKeys = normalizedSemanticKeys(right);
        const ambiguous =
          leftKeys === undefined ||
          rightKeys === undefined ||
          leftKeys.some((key) => rightKeys.includes(key));
        if (!ambiguous) continue;
        throw new ClaimNarrativeProfileError(
          'DUPLICATE_PROFILE_CLAIM_TYPE',
          right.profileId,
          `ClaimNarrativeProfiles ${left.profileId} and ${right.profileId} ambiguously target claimType ${claimType}.`,
        );
      }
    }
  }
}

function hint(profile: ClaimNarrativeProfile, prefix: string): string | undefined {
  return profile.renderingHints?.find((value) => value.startsWith(prefix))?.slice(prefix.length);
}

function renderingAxis(profile: ClaimNarrativeProfile): DeterministicNarrativeAxis {
  const value = hint(profile, 'axis:');
  if (value === undefined || value.length === 0) {
    throw new ClaimNarrativeProfileError(
      'MISSING_RENDERING_AXIS',
      profile.profileId,
      `ClaimNarrativeProfile ${profile.profileId} must declare axis:<name>.`,
    );
  }
  if (!(DETERMINISTIC_NARRATIVE_AXIS_ORDER as readonly string[]).includes(value)) {
    throw new ClaimNarrativeProfileError(
      'INVALID_RENDERING_AXIS',
      profile.profileId,
      `ClaimNarrativeProfile ${profile.profileId} declares unsupported narrative axis ${value}.`,
    );
  }
  return value as DeterministicNarrativeAxis;
}

function renderingOrder(profile: ClaimNarrativeProfile): number {
  const value = hint(profile, 'order:');
  if (value === undefined || value.length === 0) {
    throw new ClaimNarrativeProfileError(
      'MISSING_RENDERING_ORDER',
      profile.profileId,
      `ClaimNarrativeProfile ${profile.profileId} must declare order:<integer>.`,
    );
  }
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new ClaimNarrativeProfileError(
      'INVALID_RENDERING_ORDER',
      profile.profileId,
      `ClaimNarrativeProfile ${profile.profileId} declares invalid narrative order ${value}.`,
    );
  }
  return parsed;
}

function template(
  profile: ClaimNarrativeProfile,
  templateKey: 'headline' | 'summary',
  language: string,
): string {
  const value = profile.templates?.find(
    (candidate) => candidate.templateKey === templateKey && candidate.language === language,
  )?.text;
  if (value === undefined || value.trim().length === 0) {
    throw new ClaimNarrativeProfileError(
      templateKey === 'headline' ? 'MISSING_HEADLINE_TEMPLATE' : 'MISSING_SUMMARY_TEMPLATE',
      profile.profileId,
      `ClaimNarrativeProfile ${profile.profileId} is missing ${language}/${templateKey}.`,
    );
  }
  return value;
}

function epistemicType(profile: ClaimNarrativeProfile): NarrativeEpistemicType {
  if (profile.allowedEpistemicTypes.length !== 1) {
    throw new ClaimNarrativeProfileError(
      'AMBIGUOUS_EPISTEMIC_TYPE',
      profile.profileId,
      `Deterministic rendering requires exactly one allowed epistemic type for ${profile.profileId}.`,
    );
  }
  const only = profile.allowedEpistemicTypes[0];
  if (only === undefined) {
    throw new ClaimNarrativeProfileError(
      'AMBIGUOUS_EPISTEMIC_TYPE',
      profile.profileId,
      `Deterministic rendering requires one epistemic type for ${profile.profileId}.`,
    );
  }
  return only;
}

function assertAllowedText(profile: ClaimNarrativeProfile, text: string): void {
  const normalized = text.toLocaleLowerCase();
  for (const phrase of profile.prohibitedPhrases ?? []) {
    if (phrase.trim().length === 0) continue;
    if (normalized.includes(phrase.toLocaleLowerCase())) {
      throw new ClaimNarrativeProfileError(
        'PROHIBITED_PHRASE_PRESENT',
        profile.profileId,
        `ClaimNarrativeProfile ${profile.profileId} renders prohibited phrase: ${phrase}.`,
      );
    }
  }
}

function axisRank(axis: DeterministicNarrativeAxis): number {
  return DETERMINISTIC_NARRATIVE_AXIS_ORDER.indexOf(axis);
}

function planItem(
  profile: ClaimNarrativeProfile,
  language: string,
): DeterministicNarrativePlanItem {
  const headline = template(profile, 'headline', language);
  const summary = template(profile, 'summary', language);
  const assertionText =
    profile.mandatoryQualifier === undefined
      ? summary
      : `${summary} ${profile.mandatoryQualifier}`;
  assertAllowedText(profile, headline);
  assertAllowedText(profile, assertionText);
  const semanticKeys = normalizedSemanticKeys(profile);

  return {
    claimType: profile.claimType,
    ...(semanticKeys === undefined ? {} : { semanticKeys }),
    profileRef: { id: profile.profileId, version: profile.version },
    axis: renderingAxis(profile),
    order: renderingOrder(profile),
    language,
    sectionTitle: headline,
    assertionText,
    epistemicType: epistemicType(profile),
    requiredMethodAttribution: profile.requiredMethodAttribution,
  };
}

function itemMatchesClaim(item: DeterministicNarrativePlanItem, claim: InterpretationClaim): boolean {
  if (claim.claimType !== item.claimType) return false;
  if (item.semanticKeys === undefined) return true;
  const semanticKey = claimProfileSemanticKey(claim);
  return semanticKey !== undefined && item.semanticKeys.includes(semanticKey);
}

export function buildClaimNarrativePlan(
  bundle: NarrativeEvidenceBundle,
  profiles: readonly ClaimNarrativeProfile[],
  language = 'ko',
): DeterministicNarrativePlan {
  assertProfileSelectionUnambiguous(profiles);
  const activeClaims = bundle.claims.filter((claim) => claim.state === 'active');
  const items = profiles
    .filter((profile) => activeClaims.some((claim) => profileMatchesClaim(profile, claim)))
    .map((profile) => planItem(profile, language))
    .sort((left, right) => {
      const axisDifference = axisRank(left.axis) - axisRank(right.axis);
      if (axisDifference !== 0) return axisDifference;
      const orderDifference = left.order - right.order;
      if (orderDifference !== 0) return orderDifference;
      const claimTypeDifference = left.claimType.localeCompare(right.claimType);
      if (claimTypeDifference !== 0) return claimTypeDifference;
      return left.profileRef.id.localeCompare(right.profileRef.id);
    });

  return {
    rendererVersion: CLAIM_NARRATIVE_PROFILE_RENDERER_VERSION,
    language,
    items,
  };
}

function profileAssertion(
  claim: InterpretationClaim,
  item: DeterministicNarrativePlanItem,
): NarrativeAssertion {
  return {
    type: 'assertion',
    text: item.assertionText,
    epistemicType: item.epistemicType,
    evidenceRefs: [{ sourceType: 'claim', ref: claim.claimId }],
    methodologyRefs: [claim.methodologyRef],
  };
}

export function renderClaimNarrativeProfileSections(
  bundle: NarrativeEvidenceBundle,
  profiles: readonly ClaimNarrativeProfile[],
  language = 'ko',
): readonly NarrativeSection[] {
  const plan = buildClaimNarrativePlan(bundle, profiles, language);
  return plan.items.map((item) => {
    const claims = bundle.claims
      .filter((claim) => claim.state === 'active' && itemMatchesClaim(item, claim))
      .sort((left, right) => claimSemanticKey(left).localeCompare(claimSemanticKey(right)));

    return {
      sectionId: `claim-profile:${item.profileRef.id}:${item.claimType}`,
      title: item.sectionTitle,
      blocks: claims.map((claim) => profileAssertion(claim, item)),
    };
  });
}

export function claimTypesCoveredByNarrativeProfiles(
  bundle: NarrativeEvidenceBundle,
  profiles: readonly ClaimNarrativeProfile[],
): ReadonlySet<string> {
  assertProfileSelectionUnambiguous(profiles);
  return new Set(
    bundle.claims
      .filter(
        (claim) =>
          claim.state === 'active' && profiles.some((profile) => profileMatchesClaim(profile, claim)),
      )
      .map((claim) => claim.claimType),
  );
}
