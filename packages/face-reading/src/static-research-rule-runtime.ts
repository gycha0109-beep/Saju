import type { FaceObservationState, SharedFaceObservationBundleV3 } from './contracts.js';
import type { FaceResearchAssertionAuthority } from './research-diagnosis-runtime.js';
import {
  FACE_AUTHORITY_RESEARCH_REGISTRY_V0,
  FACE_RESEARCH_PACK_V0,
  FACE_THREE_DIVISION_METRICS_V0,
  FACE_THREE_DIVISION_OPERATIONALIZATIONS_V0,
  FACE_THREE_DIVISION_RULES_V0,
} from './research-pack-v0.js';
import {
  evaluateRegisteredFaceRule,
  type FaceRegisteredRuleEvaluation,
} from './rule-evaluation.js';
import {
  evaluateThreeDivisionRelativeOrder,
  type ThreeDivisionRelativeClass,
} from './three-divisions.js';
import { adaptMyeongHaStaticFaceObservation, FaceAuthorityValidationError } from './validation.js';

export const FACE_STATIC_RESEARCH_RULE_ENGINE_VERSION = 'face-static-research-rules@0.1.0';

export interface FaceStaticResearchRuleInput {
  readonly sourceSnapshotRef: string;
  readonly assertionAuthority: FaceResearchAssertionAuthority;
  readonly observation: SharedFaceObservationBundleV3;
}

export interface FaceStaticResearchRuleRun {
  readonly status: 'research_only';
  readonly engineVersion: typeof FACE_STATIC_RESEARCH_RULE_ENGINE_VERSION;
  readonly assertionAuthority: FaceResearchAssertionAuthority;
  readonly sourceSnapshotRef: string;
  readonly observationVersions: Readonly<
    Pick<
      SharedFaceObservationBundleV3,
      'schemaVersion' | 'capabilityVersion' | 'extractorVersion' | 'modelVersion'
    >
  >;
  readonly observationState: FaceObservationState;
  readonly unavailableRegions: readonly string[];
  readonly evidenceRefs: readonly string[];
  readonly operationalization: {
    readonly ref: string;
    readonly inputMetricRefs: readonly string[];
    readonly missingMetricRefs: readonly string[];
    readonly unavailableRegionKeys: readonly string[];
    readonly relation: ThreeDivisionRelativeClass | null;
  };
  readonly evaluations: readonly FaceRegisteredRuleEvaluation[];
  readonly productionExecutionAuthorized: false;
  readonly traditionalBindingIssued: false;
  readonly characterPublicationAuthorized: false;
}

const PACK_REF = `${FACE_RESEARCH_PACK_V0.packId}@${FACE_RESEARCH_PACK_V0.version}`;
const OPERATION = FACE_THREE_DIVISION_OPERATIONALIZATIONS_V0[0];
// These are the existing research definitions, not a new neutral-to-traditional map.
const LENGTHS = Object.freeze({
  upper: FACE_THREE_DIVISION_METRICS_V0[0],
  middle: FACE_THREE_DIVISION_METRICS_V0[1],
  lower: FACE_THREE_DIVISION_METRICS_V0[2],
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`Static research rule input: ${message}`);
}

function dataObject(value: unknown, keys: readonly string[]): void {
  if (
    value === null ||
    typeof value !== 'object' ||
    ![Object.prototype, null].includes(Object.getPrototypeOf(value))
  )
    fail('plain data object required');
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key)!;
    if (
      typeof key !== 'string' ||
      !keys.includes(key) ||
      !descriptor.enumerable ||
      !('value' in descriptor)
    ) {
      fail('unexpected or executable property');
    }
  }
}

function dataArray(value: unknown): asserts value is readonly unknown[] {
  if (
    !Array.isArray(value) ||
    Object.getPrototypeOf(value) !== Array.prototype ||
    value.length > 2048 ||
    Reflect.ownKeys(value).length !== value.length + 1
  )
    fail('invalid data array');
  for (let index = 0; index < value.length; index++) {
    const descriptor = Object.getOwnPropertyDescriptor(value, String(index));
    if (descriptor === undefined || !('value' in descriptor)) fail('sparse or executable array');
  }
}

function reference(value: unknown): asserts value is string {
  if (typeof value !== 'string' || value.length === 0 || value.length > 256 || /\s/u.test(value)) {
    fail('bounded non-empty reference required');
  }
}

function references(value: unknown): asserts value is readonly string[] {
  dataArray(value);
  for (const entry of value) reference(entry);
  if (new Set(value).size !== value.length) fail('duplicate reference');
}

function finite(value: unknown): asserts value is number {
  if (typeof value !== 'number' || !Number.isFinite(value)) fail('finite numeric value required');
}

function validate(input: FaceStaticResearchRuleInput): void {
  dataObject(input, ['sourceSnapshotRef', 'assertionAuthority', 'observation']);
  reference(input.sourceSnapshotRef);
  if (!['research_fixture', 'human_label_assertion'].includes(input.assertionAuthority))
    fail('explicit research assertion authority required');
  const bundle = input.observation;
  dataObject(bundle, [
    'schemaVersion',
    'capabilityVersion',
    'extractorVersion',
    'modelVersion',
    'eligibility',
    'quality',
    'geometry',
    'observations',
    'evidenceRefs',
  ]);
  for (const version of [
    bundle.schemaVersion,
    bundle.capabilityVersion,
    bundle.extractorVersion,
    bundle.modelVersion,
  ])
    reference(version);
  dataObject(bundle.eligibility, ['status', 'humanFaceCount', 'reasons']);
  if (!['eligible', 'section_limited', 'ineligible'].includes(bundle.eligibility.status))
    fail('unknown eligibility');
  if (
    bundle.eligibility.humanFaceCount !== null &&
    (!Number.isSafeInteger(bundle.eligibility.humanFaceCount) ||
      bundle.eligibility.humanFaceCount < 0)
  )
    fail('invalid face count');
  dataArray(bundle.eligibility.reasons);
  if (!bundle.eligibility.reasons.every((entry) => typeof entry === 'string'))
    fail('invalid eligibility reasons');
  dataObject(bundle.quality, ['pose', 'sharpness', 'exposure', 'lighting', 'occludedRegions']);
  dataObject(bundle.quality.pose, ['yaw', 'pitch', 'roll']);
  for (const value of Object.values(bundle.quality.pose)) finite(value);
  for (const value of [
    bundle.quality.sharpness,
    bundle.quality.exposure,
    bundle.quality.lighting,
  ]) {
    if (value !== undefined && typeof value !== 'string') fail('invalid descriptive quality');
  }
  references(bundle.quality.occludedRegions);
  dataObject(bundle.observations, [
    'outline',
    'verticalBalance',
    'eyes',
    'featureLayout',
    'visualLanguage',
    'colorAppearance',
  ]);
  dataObject(bundle.geometry, ['metrics']);
  dataArray(bundle.geometry.metrics);
  const seen = new Set<string>();
  for (const metric of bundle.geometry.metrics) {
    dataObject(metric, [
      'metricKey',
      'metricVersion',
      'value',
      'unit',
      'confidence',
      'viewAgreement',
      'sourceLandmarks',
    ]);
    reference(metric.metricKey);
    reference(metric.metricVersion);
    finite(metric.value);
    finite(metric.confidence);
    if (metric.viewAgreement !== undefined) finite(metric.viewAgreement);
    if (!['ratio', 'degree', 'normalized_distance'].includes(metric.unit))
      fail('unknown metric unit');
    const ref = `${metric.metricKey}@${metric.metricVersion}`;
    if (seen.has(ref)) fail('duplicate metric identity');
    seen.add(ref);
  }
  references(bundle.evidenceRefs);
  if (bundle.evidenceRefs.length === 0) fail('observation evidence required');
}

/** Existing research metrics -> existing relative-order operation -> registered rules. */
export function evaluateStaticFaceResearchRules(
  input: FaceStaticResearchRuleInput,
): FaceStaticResearchRuleRun {
  validate(input);
  const snapshot = adaptMyeongHaStaticFaceObservation(input.observation);
  const metrics = new Map(
    snapshot.geometry.metrics.map((metric) => [
      `${metric.metricKey}@${metric.metricVersion}`,
      metric,
    ]),
  );
  const missingMetricRefs: string[] = [];
  const unavailableRegionKeys: string[] = [];
  const lengths: Partial<Record<keyof typeof LENGTHS, number>> = {};
  for (const region of ['upper', 'middle', 'lower'] as const) {
    const definition = LENGTHS[region];
    const ref = `${definition.metricKey}@${definition.version}`;
    const metric = metrics.get(ref);
    if (metric !== undefined && metric.unit !== definition.unit)
      fail('registered metric unit mismatch');
    if (snapshot.unavailableRegions.includes(region)) unavailableRegionKeys.push(region);
    if (
      metric === undefined ||
      snapshot.unavailableRegions.includes(region) ||
      snapshot.observationState === 'recapture_required'
    ) {
      missingMetricRefs.push(ref);
    } else {
      lengths[region] = metric.value;
    }
  }
  let relation: ThreeDivisionRelativeClass | null = null;
  if (missingMetricRefs.length === 0) {
    const complete = { upper: lengths.upper!, middle: lengths.middle!, lower: lengths.lower! };
    if (!Number.isFinite(complete.upper + complete.middle + complete.lower))
      fail('length aggregation overflow');
    relation = evaluateThreeDivisionRelativeOrder(complete).relation;
  }
  const evaluations = FACE_THREE_DIVISION_RULES_V0.map((rule) =>
    evaluateRegisteredFaceRule({
      registry: FACE_AUTHORITY_RESEARCH_REGISTRY_V0,
      methodologyPackRef: PACK_REF,
      ruleRef: `${rule.ruleId}@${rule.version}`,
      executionStatus: 'research',
      inputs: { threeDivisionRelation: relation },
    }),
  );
  return Object.freeze({
    status: 'research_only',
    engineVersion: FACE_STATIC_RESEARCH_RULE_ENGINE_VERSION,
    assertionAuthority: input.assertionAuthority,
    sourceSnapshotRef: input.sourceSnapshotRef,
    observationVersions: Object.freeze({
      schemaVersion: snapshot.schemaVersion,
      capabilityVersion: snapshot.capabilityVersion,
      extractorVersion: snapshot.extractorVersion,
      modelVersion: snapshot.modelVersion,
    }),
    observationState: snapshot.observationState,
    unavailableRegions: Object.freeze([...snapshot.unavailableRegions]),
    evidenceRefs: Object.freeze([...snapshot.evidenceRefs]),
    operationalization: Object.freeze({
      ref: OPERATION.operationalizationId,
      inputMetricRefs: Object.freeze([...OPERATION.inputMetricRefs]),
      missingMetricRefs: Object.freeze(missingMetricRefs),
      unavailableRegionKeys: Object.freeze(unavailableRegionKeys),
      relation,
    }),
    evaluations: Object.freeze(evaluations),
    productionExecutionAuthorized: false,
    traditionalBindingIssued: false,
    characterPublicationAuthorized: false,
  });
}
