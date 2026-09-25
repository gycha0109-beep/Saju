import {
  FACE_TRADITIONAL_T4_BLOCKED_SOURCE_GATES,
  FACE_TRADITIONAL_T4_METHOD_REFS,
  FACE_TRADITIONAL_T4_METHODOLOGIES,
  FACE_TRADITIONAL_T4_OBSERVATION_REQUIREMENTS,
  type TraditionalObservationRequirementT4,
  type TraditionalObservationSemanticRefT4,
} from './traditional-three-divisions-methodology-t4.js';
import {
  FACE_TRADITIONAL_T5_AUTHORIZATION,
  FACE_TRADITIONAL_T5_BINDING_PREREQUISITES,
} from './traditional-three-divisions-operationalization-t5.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FRB004_CONTRACT_VERSION =
  'FRB004-T4-CANONICAL-OBSERVATION-BRIDGE-v1' as const;

export type FRB004CanonicalFeatureKey =
  (typeof FR293_PRODUCT_COLUMN_MAP)[number]['featureKey'];

export type FRB004ImplementationState =
  (typeof FR293_PRODUCT_COLUMN_MAP)[number]['implementationState'];

export type FRB004BindingState =
  | 'blocked_engine_observation'
  | 'candidate_not_equivalent'
  | 'no_semantically_admissible_feature';

export type FRB004ObservationState =
  | 'represented_unavailable'
  | 'related_morphology_materialized_not_anchor'
  | 'no_semantically_admissible_feature';

export interface FRB004RequirementBinding {
  readonly methodologyRef: string;
  readonly requirementId: string;
  readonly traditionalObservationRef: TraditionalObservationSemanticRefT4;
  readonly traditionalLabel: string;
  readonly semanticRequirement: string;
  readonly candidateCanonicalFeatureKeys: readonly FRB004CanonicalFeatureKey[];
  readonly candidateImplementationStates: readonly FRB004ImplementationState[];
  readonly rejectedProxyFeatureKeys: readonly FRB004CanonicalFeatureKey[];
  readonly observationState: FRB004ObservationState;
  readonly bindingState: FRB004BindingState;
  readonly traditionalEquivalenceAuthorized: false;
  readonly providerLandmarkBindingAuthorized: false;
  readonly blockerOwner: 'face-observation-engine';
  readonly nextBindingOwner: 'face-bridge';
  readonly detail: string;
}

export interface FRB004MethodologyReadiness {
  readonly methodologyRef: string;
  readonly traditionalTerm: string;
  readonly requirementIds: readonly string[];
  readonly uniqueObservationRefs: readonly TraditionalObservationSemanticRefT4[];
  readonly observationBindingReady: false;
  readonly operationalizationBindingReady: false;
  readonly ruleExecutionReady: false;
  readonly claimEmissionReady: false;
}

export interface FRB004BlockedSourceGate {
  readonly sourceKey:
    | 'shenxiangNlc1925'
    | 'liuzhuangNlc1925'
    | 'taiqingNlc1925'
    | 'renlunSiku';
  readonly status: 'blocked_before_methodology_reconstruction';
  readonly reason: string;
  readonly owner: 'face-traditional-research';
  readonly bridgeSubstitutionAuthorized: false;
}

export interface FRB004T4CanonicalObservationBridgeAudit {
  readonly schemaVersion:
    'frb004-t4-canonical-observation-bridge-audit-v1';
  readonly contractVersion: typeof FRB004_CONTRACT_VERSION;
  readonly track: 'face-bridge';
  readonly engineBaseline: 'FR293_COMPLETE_FR282_SCHEMA';
  readonly completeSchemaInvariant: {
    readonly fr282FeatureCount: 29;
    readonly representedFeatureCount: 29;
    readonly structurallyMissingFeatureCount: 0;
    readonly pendingFeatureCount: 0;
  };
  readonly reconstructedMethodologyCount: 3;
  readonly t4RequirementCount: 16;
  readonly uniqueTraditionalObservationCount: 7;
  readonly requirementBindings: readonly FRB004RequirementBinding[];
  readonly methodologies: readonly FRB004MethodologyReadiness[];
  readonly blockedSourceGates: readonly FRB004BlockedSourceGate[];
  readonly t5Guard: {
    readonly prerequisiteCount: 7;
    readonly allPrerequisitesRemainBlocked: true;
    readonly concreteCoordinateFrameAuthorized: false;
    readonly executableMetricFormulaAuthorized: false;
    readonly numericBalanceToleranceAuthorized: false;
    readonly nearEqualBandAuthorized: false;
    readonly crossLineageMetricIdentityAuthorized: false;
  };
  readonly crossMethodologyPolicy: {
    readonly geometryEqualityImpliesMethodologyIdentity: false;
    readonly geometryEqualityImpliesSemanticIdentity: false;
    readonly blockedSourceMayBorrowAnotherMethodology: false;
    readonly heuristicFeatureNameBindingAuthorized: false;
  };
  readonly authorityBoundary: {
    readonly providerLandmarkIdsIssued: false;
    readonly coordinateFormulaIssued: false;
    readonly numericThresholdIssued: false;
    readonly balanceToleranceIssued: false;
    readonly traditionalOutcomeIssued: false;
    readonly t5SpanExecuted: false;
    readonly t5ComparisonExecuted: false;
    readonly ruleExecuted: false;
    readonly faceClaimIssued: false;
    readonly productionActivated: false;
  };
}

const EXPECTED_METHOD_REFS = Object.freeze([
  FACE_TRADITIONAL_T4_METHOD_REFS.mayiContiguousThreeDivisions,
  FACE_TRADITIONAL_T4_METHOD_REFS.mayiThreeFusThreeGovernors,
  FACE_TRADITIONAL_T4_METHOD_REFS.shenyiFuGujinNoncontiguousThreeDivisions,
] as const);

const EXPECTED_OBSERVATION_REFS = Object.freeze([
  'trad.anchor.hairline',
  'trad.anchor.brow',
  'trad.anchor.yintang',
  'trad.anchor.shangen',
  'trad.anchor.zhuntou',
  'trad.anchor.renzhong',
  'trad.anchor.dige',
] as const satisfies readonly TraditionalObservationSemanticRefT4[]);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FRB-004 ${message}`);
}

function productEntry(featureKey: FRB004CanonicalFeatureKey) {
  const entry = FR293_PRODUCT_COLUMN_MAP.find(
    (candidate) => candidate.featureKey === featureKey,
  );
  if (entry === undefined) {
    fail(`FR293 product column missing: ${featureKey}.`);
  }
  return entry;
}

function explicitAnchorPolicy(
  observationRef: TraditionalObservationSemanticRefT4,
): Omit<
  FRB004RequirementBinding,
  | 'methodologyRef'
  | 'requirementId'
  | 'traditionalObservationRef'
  | 'traditionalLabel'
  | 'semanticRequirement'
> {
  switch (observationRef) {
    case 'trad.anchor.hairline': {
      const candidate = productEntry('forehead.visible_hairline_boundary');
      return Object.freeze({
        candidateCanonicalFeatureKeys: Object.freeze([
          'forehead.visible_hairline_boundary',
        ] as const),
        candidateImplementationStates: Object.freeze([
          candidate.implementationState,
        ]),
        rejectedProxyFeatureKeys: Object.freeze([]),
        observationState: 'represented_unavailable' as const,
        bindingState: 'blocked_engine_observation' as const,
        traditionalEquivalenceAuthorized: false as const,
        providerLandmarkBindingAuthorized: false as const,
        blockerOwner: 'face-observation-engine' as const,
        nextBindingOwner: 'face-bridge' as const,
        detail:
          'The complete canonical schema represents a visible hairline boundary, but the governed vertical-reference capability required by T4/T5 is not materialized. No provider landmark may substitute for the visible boundary.',
      });
    }
    case 'trad.anchor.brow': {
      const proxy = productEntry('eyebrow.span_arch_tail_orientation');
      return Object.freeze({
        candidateCanonicalFeatureKeys: Object.freeze([]),
        candidateImplementationStates: Object.freeze([]),
        rejectedProxyFeatureKeys: Object.freeze([
          'eyebrow.span_arch_tail_orientation',
        ] as const),
        observationState:
          'related_morphology_materialized_not_anchor' as const,
        bindingState: 'candidate_not_equivalent' as const,
        traditionalEquivalenceAuthorized: false as const,
        providerLandmarkBindingAuthorized: false as const,
        blockerOwner: 'face-observation-engine' as const,
        nextBindingOwner: 'face-bridge' as const,
        detail:
          `FR293 materializes eyebrow span/arch/tail morphology (${proxy.implementationState}), but T4/T5 require a governed vertical brow reference. Shape/orientation is not that boundary coordinate.`,
      });
    }
    case 'trad.anchor.yintang':
      return Object.freeze({
        candidateCanonicalFeatureKeys: Object.freeze([]),
        candidateImplementationStates: Object.freeze([]),
        rejectedProxyFeatureKeys: Object.freeze([]),
        observationState: 'no_semantically_admissible_feature' as const,
        bindingState: 'no_semantically_admissible_feature' as const,
        traditionalEquivalenceAuthorized: false as const,
        providerLandmarkBindingAuthorized: false as const,
        blockerOwner: 'face-observation-engine' as const,
        nextBindingOwner: 'face-bridge' as const,
        detail:
          'No governed canonical interbrow/Yintang vertical reference exists in the complete FR282 feature universe.',
      });
    case 'trad.anchor.shangen': {
      const proxy = productEntry('nose.bridge_centerline_deviation');
      return Object.freeze({
        candidateCanonicalFeatureKeys: Object.freeze([]),
        candidateImplementationStates: Object.freeze([]),
        rejectedProxyFeatureKeys: Object.freeze([
          'nose.bridge_centerline_deviation',
        ] as const),
        observationState:
          'related_morphology_materialized_not_anchor' as const,
        bindingState: 'candidate_not_equivalent' as const,
        traditionalEquivalenceAuthorized: false as const,
        providerLandmarkBindingAuthorized: false as const,
        blockerOwner: 'face-observation-engine' as const,
        nextBindingOwner: 'face-bridge' as const,
        detail:
          `FR293 materializes nose bridge-centerline deviation (${proxy.implementationState}), but T4/T5 require a governed Shangen vertical reference. Shape deviation cannot be promoted to that anchor.`,
      });
    }
    case 'trad.anchor.zhuntou': {
      const proxy = productEntry('nose.tip_contour_circularity');
      return Object.freeze({
        candidateCanonicalFeatureKeys: Object.freeze([]),
        candidateImplementationStates: Object.freeze([]),
        rejectedProxyFeatureKeys: Object.freeze([
          'nose.tip_contour_circularity',
        ] as const),
        observationState:
          'related_morphology_materialized_not_anchor' as const,
        bindingState: 'candidate_not_equivalent' as const,
        traditionalEquivalenceAuthorized: false as const,
        providerLandmarkBindingAuthorized: false as const,
        blockerOwner: 'face-observation-engine' as const,
        nextBindingOwner: 'face-bridge' as const,
        detail:
          `FR293 materializes nose-tip contour circularity (${proxy.implementationState}), but a tip-shape metric is not a governed Zhuntou vertical reference.`,
      });
    }
    case 'trad.anchor.renzhong': {
      const proxy = productEntry('mouth.philtrum_length_width');
      return Object.freeze({
        candidateCanonicalFeatureKeys: Object.freeze([]),
        candidateImplementationStates: Object.freeze([]),
        rejectedProxyFeatureKeys: Object.freeze([
          'mouth.philtrum_length_width',
        ] as const),
        observationState:
          'related_morphology_materialized_not_anchor' as const,
        bindingState: 'candidate_not_equivalent' as const,
        traditionalEquivalenceAuthorized: false as const,
        providerLandmarkBindingAuthorized: false as const,
        blockerOwner: 'face-observation-engine' as const,
        nextBindingOwner: 'face-bridge' as const,
        detail:
          `FR293 materializes visible philtrum length/width geometry (${proxy.implementationState}), but T4/T5 require a governed Renzhong vertical reference rather than a morphology ratio.`,
      });
    }
    case 'trad.anchor.dige': {
      const proxy = productEntry('chin_lower_face.visible_contour');
      return Object.freeze({
        candidateCanonicalFeatureKeys: Object.freeze([]),
        candidateImplementationStates: Object.freeze([]),
        rejectedProxyFeatureKeys: Object.freeze([
          'chin_lower_face.visible_contour',
        ] as const),
        observationState:
          'related_morphology_materialized_not_anchor' as const,
        bindingState: 'candidate_not_equivalent' as const,
        traditionalEquivalenceAuthorized: false as const,
        providerLandmarkBindingAuthorized: false as const,
        blockerOwner: 'face-observation-engine' as const,
        nextBindingOwner: 'face-bridge' as const,
        detail:
          `FR293 preserves the materialized visible lower-face contour (${proxy.implementationState}), but the governed soft-tissue contour is not automatically traditional Dige or a Dige vertical reference.`,
      });
    }
  }
}

function bindRequirement(
  requirement: TraditionalObservationRequirementT4,
): FRB004RequirementBinding {
  return Object.freeze({
    methodologyRef: requirement.methodologyRef,
    requirementId: requirement.requirementId,
    traditionalObservationRef: requirement.traditionalObservationRef,
    traditionalLabel: requirement.traditionalLabel,
    semanticRequirement: requirement.semanticRequirement,
    ...explicitAnchorPolicy(requirement.traditionalObservationRef),
  });
}

function methodologyReadiness(
  methodologyRef: string,
  traditionalTerm: string,
  bindings: readonly FRB004RequirementBinding[],
): FRB004MethodologyReadiness {
  const own = bindings.filter(
    (entry) => entry.methodologyRef === methodologyRef,
  );
  if (own.length === 0) {
    fail(`T4 methodology has no observation requirements: ${methodologyRef}.`);
  }
  return Object.freeze({
    methodologyRef,
    traditionalTerm,
    requirementIds: Object.freeze(own.map((entry) => entry.requirementId)),
    uniqueObservationRefs: Object.freeze([
      ...new Set(own.map((entry) => entry.traditionalObservationRef)),
    ]),
    observationBindingReady: false as const,
    operationalizationBindingReady: false as const,
    ruleExecutionReady: false as const,
    claimEmissionReady: false as const,
  });
}

function blockedSourceGates(): readonly FRB004BlockedSourceGate[] {
  return Object.freeze([
    Object.freeze({
      sourceKey: 'shenxiangNlc1925' as const,
      ...FACE_TRADITIONAL_T4_BLOCKED_SOURCE_GATES.shenxiangNlc1925,
      owner: 'face-traditional-research' as const,
      bridgeSubstitutionAuthorized: false as const,
    }),
    Object.freeze({
      sourceKey: 'liuzhuangNlc1925' as const,
      ...FACE_TRADITIONAL_T4_BLOCKED_SOURCE_GATES.liuzhuangNlc1925,
      owner: 'face-traditional-research' as const,
      bridgeSubstitutionAuthorized: false as const,
    }),
    Object.freeze({
      sourceKey: 'taiqingNlc1925' as const,
      ...FACE_TRADITIONAL_T4_BLOCKED_SOURCE_GATES.taiqingNlc1925,
      owner: 'face-traditional-research' as const,
      bridgeSubstitutionAuthorized: false as const,
    }),
    Object.freeze({
      sourceKey: 'renlunSiku' as const,
      ...FACE_TRADITIONAL_T4_BLOCKED_SOURCE_GATES.renlunSiku,
      owner: 'face-traditional-research' as const,
      bridgeSubstitutionAuthorized: false as const,
    }),
  ]);
}

export function buildT4CanonicalObservationBridgeAuditFRB004():
FRB004T4CanonicalObservationBridgeAudit {
  assertFR293ProductColumnMap();

  if (
    FR293_PRODUCT_COLUMN_MAP.length !== 29
    || new Set(FR293_PRODUCT_COLUMN_MAP.map((entry) => entry.featureKey)).size !== 29
  ) {
    fail('complete FR282 canonical feature universe drift.');
  }

  if (
    FACE_TRADITIONAL_T4_METHODOLOGIES.length !== 3
    || FACE_TRADITIONAL_T4_OBSERVATION_REQUIREMENTS.length !== 16
    || FACE_TRADITIONAL_T5_BINDING_PREREQUISITES.length !== 7
  ) {
    fail('T4/T5 upstream cardinality drift.');
  }

  const methodologyRefs = FACE_TRADITIONAL_T4_METHODOLOGIES.map(
    (entry) => `${entry.methodologyId}@${entry.version}`,
  );
  if (
    methodologyRefs.length !== EXPECTED_METHOD_REFS.length
    || EXPECTED_METHOD_REFS.some((ref) => !methodologyRefs.includes(ref))
  ) {
    fail('T4 reconstructed methodology identity drift.');
  }

  const requirementBindings = Object.freeze(
    FACE_TRADITIONAL_T4_OBSERVATION_REQUIREMENTS.map(bindRequirement),
  );

  const uniqueObservationRefs = [
    ...new Set(
      requirementBindings.map((entry) => entry.traditionalObservationRef),
    ),
  ];
  if (
    uniqueObservationRefs.length !== EXPECTED_OBSERVATION_REFS.length
    || EXPECTED_OBSERVATION_REFS.some(
      (ref) => !uniqueObservationRefs.includes(ref),
    )
  ) {
    fail('T4 seven-anchor requirement universe drift.');
  }

  const methodologies = Object.freeze(
    FACE_TRADITIONAL_T4_METHODOLOGIES.map((entry) =>
      methodologyReadiness(
        `${entry.methodologyId}@${entry.version}`,
        entry.traditionalTerm,
        requirementBindings,
      )),
  );

  const audit: FRB004T4CanonicalObservationBridgeAudit = Object.freeze({
    schemaVersion:
      'frb004-t4-canonical-observation-bridge-audit-v1' as const,
    contractVersion: FRB004_CONTRACT_VERSION,
    track: 'face-bridge' as const,
    engineBaseline: 'FR293_COMPLETE_FR282_SCHEMA' as const,
    completeSchemaInvariant: Object.freeze({
      fr282FeatureCount: 29 as const,
      representedFeatureCount: 29 as const,
      structurallyMissingFeatureCount: 0 as const,
      pendingFeatureCount: 0 as const,
    }),
    reconstructedMethodologyCount: 3 as const,
    t4RequirementCount: 16 as const,
    uniqueTraditionalObservationCount: 7 as const,
    requirementBindings,
    methodologies,
    blockedSourceGates: blockedSourceGates(),
    t5Guard: Object.freeze({
      prerequisiteCount: 7 as const,
      allPrerequisitesRemainBlocked: true as const,
      concreteCoordinateFrameAuthorized:
        FACE_TRADITIONAL_T5_AUTHORIZATION.concreteCoordinateFrameAuthorized,
      executableMetricFormulaAuthorized:
        FACE_TRADITIONAL_T5_AUTHORIZATION.executableMetricFormulaAuthorized,
      numericBalanceToleranceAuthorized:
        FACE_TRADITIONAL_T5_AUTHORIZATION.numericBalanceToleranceAuthorized,
      nearEqualBandAuthorized:
        FACE_TRADITIONAL_T5_AUTHORIZATION.nearEqualBandAuthorized,
      crossLineageMetricIdentityAuthorized:
        FACE_TRADITIONAL_T5_AUTHORIZATION.crossLineageMetricIdentityAuthorized,
    }),
    crossMethodologyPolicy: Object.freeze({
      geometryEqualityImpliesMethodologyIdentity: false as const,
      geometryEqualityImpliesSemanticIdentity: false as const,
      blockedSourceMayBorrowAnotherMethodology: false as const,
      heuristicFeatureNameBindingAuthorized: false as const,
    }),
    authorityBoundary: Object.freeze({
      providerLandmarkIdsIssued: false as const,
      coordinateFormulaIssued: false as const,
      numericThresholdIssued: false as const,
      balanceToleranceIssued: false as const,
      traditionalOutcomeIssued: false as const,
      t5SpanExecuted: false as const,
      t5ComparisonExecuted: false as const,
      ruleExecuted: false as const,
      faceClaimIssued: false as const,
      productionActivated: false as const,
    }),
  });

  assertT4CanonicalObservationBridgeAuditFRB004(audit);
  return audit;
}

export function assertT4CanonicalObservationBridgeAuditFRB004(
  audit: FRB004T4CanonicalObservationBridgeAudit,
): void {
  if (
    audit.schemaVersion !==
      'frb004-t4-canonical-observation-bridge-audit-v1'
    || audit.contractVersion !== FRB004_CONTRACT_VERSION
    || audit.track !== 'face-bridge'
    || audit.engineBaseline !== 'FR293_COMPLETE_FR282_SCHEMA'
    || audit.reconstructedMethodologyCount !== 3
    || audit.t4RequirementCount !== 16
    || audit.uniqueTraditionalObservationCount !== 7
  ) {
    fail('audit identity/cardinality drift.');
  }

  if (
    audit.completeSchemaInvariant.fr282FeatureCount !== 29
    || audit.completeSchemaInvariant.representedFeatureCount !== 29
    || audit.completeSchemaInvariant.structurallyMissingFeatureCount !== 0
    || audit.completeSchemaInvariant.pendingFeatureCount !== 0
  ) {
    fail('FR288+ complete-schema invariant widened or regressed.');
  }

  if (
    audit.requirementBindings.length !==
      FACE_TRADITIONAL_T4_OBSERVATION_REQUIREMENTS.length
    || audit.requirementBindings.some((entry) =>
      entry.traditionalEquivalenceAuthorized !== false
      || entry.providerLandmarkBindingAuthorized !== false
      || entry.blockerOwner !== 'face-observation-engine'
      || entry.nextBindingOwner !== 'face-bridge')
  ) {
    fail('requirement binding authority widened.');
  }

  for (const prerequisite of FACE_TRADITIONAL_T5_BINDING_PREREQUISITES) {
    if (
      prerequisite.status !== 'blocked'
      || prerequisite.requiredCapability !== 'governed_vertical_reference'
      || prerequisite.owner !== 'face-observation-engine'
      || prerequisite.bindingOwner !== 'face-reading-binding'
    ) {
      fail(`T5 binding prerequisite widened: ${prerequisite.prerequisiteId}.`);
    }

    const bindings = audit.requirementBindings.filter(
      (entry) =>
        entry.traditionalObservationRef === prerequisite.observationRef,
    );
    if (bindings.length === 0) {
      fail(`T5 prerequisite has no FRB004 requirement binding: ${prerequisite.prerequisiteId}.`);
    }
  }

  const byObservation = (
    ref: TraditionalObservationSemanticRefT4,
  ) => audit.requirementBindings.filter(
    (entry) => entry.traditionalObservationRef === ref,
  );

  const hairline = byObservation('trad.anchor.hairline');
  if (
    hairline.some((entry) =>
      !entry.candidateCanonicalFeatureKeys.includes(
        'forehead.visible_hairline_boundary',
      )
      || entry.bindingState !== 'blocked_engine_observation')
  ) {
    fail('hairline candidate/readiness drift.');
  }

  const rejected: Readonly<Record<
    Exclude<TraditionalObservationSemanticRefT4, 'trad.anchor.hairline' | 'trad.anchor.yintang'>,
    FRB004CanonicalFeatureKey
  >> = Object.freeze({
    'trad.anchor.brow': 'eyebrow.span_arch_tail_orientation',
    'trad.anchor.shangen': 'nose.bridge_centerline_deviation',
    'trad.anchor.zhuntou': 'nose.tip_contour_circularity',
    'trad.anchor.renzhong': 'mouth.philtrum_length_width',
    'trad.anchor.dige': 'chin_lower_face.visible_contour',
  });

  for (const [ref, proxy] of Object.entries(rejected) as readonly [
    keyof typeof rejected,
    FRB004CanonicalFeatureKey,
  ][]) {
    const product = productEntry(proxy);
    if (product.implementationState !== 'canonical_extractor_materialized') {
      fail(`expected FR293 rejected proxy to be materialized: ${proxy}.`);
    }
    if (
      byObservation(ref).some((entry) =>
        !entry.rejectedProxyFeatureKeys.includes(proxy)
        || entry.traditionalEquivalenceAuthorized !== false
        || entry.bindingState !== 'candidate_not_equivalent')
    ) {
      fail(`materialized proxy was promoted or lost: ${proxy} -> ${ref}.`);
    }
  }

  if (
    byObservation('trad.anchor.yintang').some((entry) =>
      entry.candidateCanonicalFeatureKeys.length !== 0
      || entry.rejectedProxyFeatureKeys.length !== 0
      || entry.bindingState !== 'no_semantically_admissible_feature')
  ) {
    fail('Yintang missing-observation boundary drift.');
  }

  const mayiSanfu = audit.methodologies.find(
    (entry) =>
      entry.methodologyRef ===
      FACE_TRADITIONAL_T4_METHOD_REFS.mayiThreeFusThreeGovernors,
  );
  const shenyi = audit.methodologies.find(
    (entry) =>
      entry.methodologyRef ===
      FACE_TRADITIONAL_T4_METHOD_REFS.shenyiFuGujinNoncontiguousThreeDivisions,
  );
  if (
    mayiSanfu === undefined
    || shenyi === undefined
    || mayiSanfu.methodologyRef === shenyi.methodologyRef
    || !(
      mayiSanfu.uniqueObservationRefs.length ===
        shenyi.uniqueObservationRefs.length
      && mayiSanfu.uniqueObservationRefs.every(
        (ref) => shenyi.uniqueObservationRefs.includes(ref),
      )
    )
  ) {
    fail('same-geometry/different-methodology separation drift.');
  }

  if (
    audit.methodologies.some((entry) =>
      entry.observationBindingReady !== false
      || entry.operationalizationBindingReady !== false
      || entry.ruleExecutionReady !== false
      || entry.claimEmissionReady !== false)
    || audit.blockedSourceGates.length !== 4
    || audit.blockedSourceGates.some((entry) =>
      entry.status !== 'blocked_before_methodology_reconstruction'
      || entry.owner !== 'face-traditional-research'
      || entry.bridgeSubstitutionAuthorized !== false)
    || Object.values(audit.crossMethodologyPolicy).some(
      (value) => value !== false,
    )
    || Object.values(audit.authorityBoundary).some(
      (value) => value !== false,
    )
  ) {
    fail('methodology/source/authority gate widened.');
  }

  if (
    audit.t5Guard.prerequisiteCount !== 7
    || audit.t5Guard.allPrerequisitesRemainBlocked !== true
    || audit.t5Guard.concreteCoordinateFrameAuthorized !== false
    || audit.t5Guard.executableMetricFormulaAuthorized !== false
    || audit.t5Guard.numericBalanceToleranceAuthorized !== false
    || audit.t5Guard.nearEqualBandAuthorized !== false
    || audit.t5Guard.crossLineageMetricIdentityAuthorized !== false
  ) {
    fail('T5 fail-closed guard widened.');
  }
}

export const T4_CANONICAL_OBSERVATION_BRIDGE_AUDIT_FRB004 =
  buildT4CanonicalObservationBridgeAuditFRB004();