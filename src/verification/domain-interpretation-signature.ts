import type {
  ClaimRelation,
  InterpretationClaim,
} from '../contracts/interpretation.js';
import type { ReadingEvidenceSelection, ReadingScenarioCoverage } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const DOMAIN_INTERPRETATION_SIGNATURE_VERSION =
  'myeonghwa-domain-interpretation-signature-v1' as const;

const PRESENTATION_ONLY_VALUE_KEYS = new Set([
  'consumerText',
  'displayText',
  'headline',
  'narrative',
  'summary',
]);

export interface DomainInterpretationSignatureClaimMaterial {
  taxonomy: {
    tier: 'T8';
    category: string;
    subcategory?: string;
  };
  claimType: string;
  subject: string;
  predicate: string;
  value: unknown;
  polarity?: InterpretationClaim['polarity'];
  emphasis?: InterpretationClaim['emphasis'];
}

export interface DomainInterpretationSignatureRelationMaterial {
  relation: ClaimRelation['relation'];
  fromSemanticKey: string;
  toSemanticKey: string;
}

export interface DomainInterpretationSignatureMaterial {
  domain: string;
  claims: readonly DomainInterpretationSignatureClaimMaterial[];
  relations: readonly DomainInterpretationSignatureRelationMaterial[];
}

export interface DomainInterpretationSignature {
  version: typeof DOMAIN_INTERPRETATION_SIGNATURE_VERSION;
  scenarioRef?: string;
  signature: string;
  material: DomainInterpretationSignatureMaterial;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function semanticValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map((item) => semanticValue(item));
  if (!isRecord(value)) return value;

  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !PRESENTATION_ONLY_VALUE_KEYS.has(key))
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, nested]) => [key, semanticValue(nested)]),
  );
}

function claimMaterial(claim: InterpretationClaim): DomainInterpretationSignatureClaimMaterial {
  return {
    taxonomy: {
      tier: 'T8',
      category: claim.taxonomy.category,
      ...(claim.taxonomy.subcategory === undefined
        ? {}
        : { subcategory: claim.taxonomy.subcategory }),
    },
    claimType: claim.claimType,
    subject: claim.subject,
    predicate: claim.predicate,
    value: semanticValue(claim.value),
    ...(claim.polarity === undefined ? {} : { polarity: claim.polarity }),
    ...(claim.emphasis === undefined ? {} : { emphasis: claim.emphasis }),
  };
}

function semanticKey(material: DomainInterpretationSignatureClaimMaterial): string {
  return deterministicContentHash(material);
}

function scenarioRefs(selection: ReadingEvidenceSelection): readonly (string | undefined)[] {
  const fromCoverage = selection.scenarioCoverage
    ?.map((coverage: ReadingScenarioCoverage) => coverage.scenarioRef)
    .filter((scenarioRef): scenarioRef is string => scenarioRef !== undefined);
  const refs =
    fromCoverage !== undefined && fromCoverage.length > 0
      ? fromCoverage
      : selection.scenarioRefs;
  const unique = [...new Set(refs)].sort();
  return unique.length === 0 ? [undefined] : unique;
}

function signatureForScenario(
  claims: readonly InterpretationClaim[],
  relations: readonly ClaimRelation[],
  selection: ReadingEvidenceSelection,
  scenarioRef: string | undefined,
): DomainInterpretationSignature | undefined {
  const selected = new Set(selection.selectedClaimIds);
  const domainClaims = claims
    .filter((claim) => selected.has(claim.claimId))
    .filter((claim) => claim.state === 'active')
    .filter((claim) => claim.taxonomy.tier === 'T8')
    .filter((claim) => claim.taxonomy.category === selection.intent.domain)
    .filter((claim) =>
      scenarioRef === undefined
        ? claim.scenarioRef === undefined
        : claim.scenarioRef === undefined || claim.scenarioRef === scenarioRef,
    );

  if (domainClaims.length === 0) return undefined;

  const materialByClaimId = new Map(
    domainClaims.map((claim) => {
      const material = claimMaterial(claim);
      return [claim.claimId, { material, semanticKey: semanticKey(material) }] as const;
    }),
  );

  const normalizedClaims = [...materialByClaimId.values()]
    .map(({ material }) => material)
    .sort((left, right) => semanticKey(left).localeCompare(semanticKey(right)));

  const normalizedRelations = relations
    .flatMap((relation): DomainInterpretationSignatureRelationMaterial[] => {
      const from = materialByClaimId.get(relation.fromClaimId);
      const to = materialByClaimId.get(relation.toClaimId);
      if (from === undefined || to === undefined) return [];
      return [
        {
          relation: relation.relation,
          fromSemanticKey: from.semanticKey,
          toSemanticKey: to.semanticKey,
        },
      ];
    })
    .sort((left, right) =>
      deterministicContentHash(left).localeCompare(deterministicContentHash(right)),
    );

  const material: DomainInterpretationSignatureMaterial = {
    domain: selection.intent.domain,
    claims: normalizedClaims,
    relations: normalizedRelations,
  };
  const hash = deterministicContentHash(material);
  return {
    version: DOMAIN_INTERPRETATION_SIGNATURE_VERSION,
    ...(scenarioRef === undefined ? {} : { scenarioRef }),
    signature: `domain_interpretation_signature_${hash}`,
    material,
  };
}

export function deriveDomainInterpretationSignatures(
  claims: readonly InterpretationClaim[],
  relations: readonly ClaimRelation[],
  selection: ReadingEvidenceSelection,
): readonly DomainInterpretationSignature[] {
  return scenarioRefs(selection).flatMap((scenarioRef) => {
    const signature = signatureForScenario(claims, relations, selection, scenarioRef);
    return signature === undefined ? [] : [signature];
  });
}
