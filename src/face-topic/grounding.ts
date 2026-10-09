import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  FaceNarrativeBlockResultUnitV1,
  FaceObservationResultUnitV1,
  FaceSemanticClaimResultUnitV1,
  FaceTopicAdmittedExecutionResultV1,
} from './result-receipt.js';

export const FACE_GROUNDING_BUNDLE_SCHEMA_VERSION =
  'face-grounding-bundle-v1' as const;

export interface FaceGroundingObservationUnitV1 {
  readonly unitId: string;
  readonly kind: 'neutral_observation';
  readonly capabilityKey: string;
  readonly observationRef: string;
  readonly qualifiers: readonly string[];
  readonly prohibitedExtensions: readonly string[];
}

export interface FaceGroundingSemanticUnitV1 {
  readonly unitId: string;
  readonly kind: 'traditional_claim';
  readonly claimFamily: string;
  readonly claimRef: string;
  readonly methodologyRef: string;
  readonly inferenceKeys: readonly string[];
  readonly qualifiers: readonly string[];
  readonly prohibitedExtensions: readonly string[];
}

export interface FaceGroundingNarrativeBlockV1 {
  readonly blockRef: string;
  readonly sourceUnitRefs: readonly string[];
  readonly text: string;
  readonly realizationPolicy:
    | 'protected_verbatim'
    | 'bounded_paraphrase';
  readonly prohibitedExtensions: readonly string[];
}

export interface FaceGroundingBundleV1 {
  readonly schemaVersion:
    typeof FACE_GROUNDING_BUNDLE_SCHEMA_VERSION;
  readonly sourceResultHash: string;
  readonly faceEngineVersion: string;
  readonly faceReadingRef?: string;
  readonly observationUnits:
    readonly FaceGroundingObservationUnitV1[];
  readonly semanticClaimUnits:
    readonly FaceGroundingSemanticUnitV1[];
  readonly approvedNarrativeBlocks:
    readonly FaceGroundingNarrativeBlockV1[];
  readonly unavailableSections: readonly string[];
  readonly prohibitedInferences: readonly string[];
  readonly provenanceRefs: readonly string[];
  readonly groundingHash: string;
}

export interface BuildFaceGroundingInputV1 {
  readonly admittedResult: FaceTopicAdmittedExecutionResultV1;
  readonly observations: readonly FaceObservationResultUnitV1[];
  readonly semanticClaims: readonly FaceSemanticClaimResultUnitV1[];
  readonly narrativeBlocks:
    readonly FaceNarrativeBlockResultUnitV1[];
  readonly unavailableSections: readonly string[];
  readonly prohibitedInferences: readonly string[];
}

function sortedUnique(values: readonly string[]): readonly string[] {
  return Object.freeze([...new Set(values)].sort());
}

function observationUnit(
  source: FaceObservationResultUnitV1,
  prohibitedInferences: readonly string[],
): FaceGroundingObservationUnitV1 {
  const identity = Object.freeze({
    kind: 'neutral_observation' as const,
    capabilityKey: source.capabilityKey,
    observationRef: source.observationRef,
    qualifiers: sortedUnique(source.qualifiers),
    prohibitedExtensions: sortedUnique([
      ...prohibitedInferences,
      'traditional_semantic_promotion_without_governed_claim',
    ]),
  });
  return Object.freeze({
    unitId:
      `face-grounding-unit:${deterministicContentHash(identity)}`,
    ...identity,
  });
}

function semanticUnit(
  source: FaceSemanticClaimResultUnitV1,
  prohibitedInferences: readonly string[],
): FaceGroundingSemanticUnitV1 {
  const identity = Object.freeze({
    kind: 'traditional_claim' as const,
    claimFamily: source.claimFamily,
    claimRef: source.claimRef,
    methodologyRef: source.methodologyRef,
    inferenceKeys: sortedUnique(source.inferenceKeys),
    qualifiers: sortedUnique(source.qualifiers),
    prohibitedExtensions: sortedUnique(prohibitedInferences),
  });
  return Object.freeze({
    unitId:
      `face-grounding-unit:${deterministicContentHash(identity)}`,
    ...identity,
  });
}

export function buildFaceGroundingBundle(
  input: BuildFaceGroundingInputV1,
): FaceGroundingBundleV1 {
  const prohibitedInferences = sortedUnique(
    input.prohibitedInferences,
  );
  const observationUnits = Object.freeze(
    input.observations
      .map((source) =>
        observationUnit(source, prohibitedInferences),
      )
      .sort((left, right) =>
        left.unitId.localeCompare(right.unitId),
      ),
  );
  const semanticClaimUnits = Object.freeze(
    input.semanticClaims
      .map((source) =>
        semanticUnit(source, prohibitedInferences),
      )
      .sort((left, right) =>
        left.unitId.localeCompare(right.unitId),
      ),
  );

  const unitBySourceRef = new Map<string, string>([
    ...observationUnits.map(
      (unit) => [unit.observationRef, unit.unitId] as const,
    ),
    ...semanticClaimUnits.map(
      (unit) => [unit.claimRef, unit.unitId] as const,
    ),
  ]);

  const approvedNarrativeBlocks = Object.freeze(
    input.narrativeBlocks
      .map((block): FaceGroundingNarrativeBlockV1 => {
        const sourceUnitRefs = block.sourceRefs.map((sourceRef) => {
          const unitId = unitBySourceRef.get(sourceRef);
          if (unitId === undefined) {
            throw new Error(
              `FACE_GROUNDING_NARRATIVE_SOURCE_NOT_SELECTED:${sourceRef}`,
            );
          }
          return unitId;
        });
        return Object.freeze({
          blockRef: block.blockRef,
          sourceUnitRefs: sortedUnique(sourceUnitRefs),
          text: block.text,
          realizationPolicy: block.realizationPolicy,
          prohibitedExtensions: sortedUnique([
            ...block.prohibitedExtensions,
            ...prohibitedInferences,
          ]),
        });
      })
      .sort((left, right) =>
        left.blockRef.localeCompare(right.blockRef),
      ),
  );

  const unavailableSections = sortedUnique(
    input.unavailableSections,
  );
  const provenanceRefs = sortedUnique([
    ...input.admittedResult.provenanceRefs,
    ...input.observations.flatMap((unit) => unit.provenanceRefs),
    ...input.semanticClaims.flatMap((unit) => unit.provenanceRefs),
  ]);

  const groundingIdentity = Object.freeze({
    schemaVersion: FACE_GROUNDING_BUNDLE_SCHEMA_VERSION,
    observationUnits,
    semanticClaimUnits,
    approvedNarrativeBlocks,
    unavailableSections,
    prohibitedInferences,
  });
  const groundingHash =
    `face-grounding:${deterministicContentHash(
      groundingIdentity,
    )}`;

  return Object.freeze({
    schemaVersion: FACE_GROUNDING_BUNDLE_SCHEMA_VERSION,
    sourceResultHash: input.admittedResult.sourceResultHash,
    faceEngineVersion: input.admittedResult.faceEngineVersion,
    ...(input.admittedResult.faceReadingRef === undefined
      ? {}
      : { faceReadingRef: input.admittedResult.faceReadingRef }),
    observationUnits,
    semanticClaimUnits,
    approvedNarrativeBlocks,
    unavailableSections,
    prohibitedInferences,
    provenanceRefs,
    groundingHash,
  });
}
