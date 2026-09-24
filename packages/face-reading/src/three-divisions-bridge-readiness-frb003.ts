import {
  issueMayiThreeDivisionsSourceContextAdjudicationFR261,
} from './mayi-three-divisions-source-context-adjudication-fr261.js';
import {
  MAYI_CONTIGUOUS_THREE_DIVISIONS_NEUTRAL_ANCHOR_AUTHORITY_FR262,
  assertMayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262,
} from './mayi-contiguous-three-divisions-neutral-anchor-requirements-fr262.js';
import {
  issueShenyiFuNoncontiguousThreeDivisionsTransmissionWitnessFR263,
} from './shenyi-fu-noncontiguous-three-divisions-transmission-witness-fr263.js';
import {
  THREE_DIVISIONS_SUCCESSOR_COORDINATE_FRAME_ADJUDICATION_FR264,
  assertThreeDivisionsSuccessorCoordinateFrameAdjudicationFR264,
} from './three-divisions-successor-coordinate-frame-adjudication-fr264.js';
import {
  THREE_DIVISIONS_NEUTRAL_REFERENCE_REUSE_AUDIT_FR259,
  assertThreeDivisionsNeutralReferenceReuseAuditFR259,
} from './three-divisions-neutral-reference-reuse-audit-fr259.js';
import {
  FACE_AUTHORITY_RESEARCH_REGISTRY_V0,
} from './research-pack-v0.js';
import {
  FR286_PRODUCT_COLUMN_MAP,
  assertFR286ProductColumnMap,
} from './rgb-selfie-product-column-map-fr286.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FRB003_CONTRACT_VERSION =
  'FRB003-THREE-DIVISIONS-BRIDGE-READINESS-v1' as const;

export const FRB003_T2_CONCEPT_REGISTRY_REF =
  'repo:research/face-traditional-research/t2-concept-registry-three-divisions-v1.md' as const;

export type FRB003ConceptKey =
  | 'trad.face.mayi_1925.santing.contiguous'
  | 'trad.face.shenxiang_gujin.santing.contiguous'
  | 'trad.face.shenyi_fu_gujin.santing.noncontiguous'
  | 'trad.face.liuzhuang.santing.candidate';

export type FRB003TraditionalAnchor =
  | 'hairline'
  | 'brow'
  | 'yintang'
  | 'shangen'
  | 'zhuntou'
  | 'renzhong'
  | 'dige';

export type FRB003GapOwner =
  | 'face-observation-engine'
  | 'face-traditional-research'
  | 'face-bridge';

export type FRB003GapCode =
  | 'anchor_feature_not_materialized'
  | 'anchor_reference_missing'
  | 'candidate_feature_not_equivalent'
  | 'direct_source_witness_gap'
  | 'primary_lineage_witness_gap'
  | 'runtime_methodology_missing'
  | 'metric_contract_missing'
  | 'metric_binding_missing';

export interface FRB003AnchorReadiness {
  readonly anchor: FRB003TraditionalAnchor;
  readonly readiness:
    | 'feature_not_materialized'
    | 'no_acceptable_canonical_reference'
    | 'bounded_candidate_not_equivalent';
  readonly candidateFeatureKey: string | null;
  readonly candidateImplementationState:
    | 'canonical_extractor_materialized'
    | 'source_extractor_exists_binding_missing'
    | 'extractor_required'
    | 'deferred_unavailable'
    | null;
  readonly rejectedProxyFeatureKeys: readonly string[];
  readonly traditionalEquivalenceAuthorized: false;
  readonly providerLandmarkBindingAuthorized: false;
  readonly detail: string;
}

export interface FRB003Gap {
  readonly owner: FRB003GapOwner;
  readonly code: FRB003GapCode;
  readonly conceptKey: FRB003ConceptKey;
  readonly anchor?: FRB003TraditionalAnchor;
  readonly detail: string;
}

export interface FRB003ConceptReadiness {
  readonly conceptKey: FRB003ConceptKey;
  readonly sourceContext: string;
  readonly sourcePassageRefs: readonly string[];
  readonly sourceReadiness:
    | 'scan_context_re_reviewed'
    | 'indexed_transmission_direct_witness_gap'
    | 'compilation_page_pinned_primary_lineage_gap'
    | 'candidate_direct_scan_required';
  readonly requiredAnchors: readonly FRB003TraditionalAnchor[];
  readonly spanKind: 'contiguous' | 'noncontiguous' | 'segmented_noncontiguous';
  readonly runtimeMethodologyRef: string | null;
  readonly methodologyReadiness:
    | 'research_definition_present'
    | 'runtime_methodology_missing';
  readonly metricOperationalizationReadiness:
    | 'research_metric_contract_present_unbound'
    | 'metric_contract_missing'
    | 'runtime_methodology_missing';
  readonly anchorReadiness: readonly FRB003AnchorReadiness[];
  readonly observationReadiness: 'blocked';
  readonly overallBridgeReadiness: 'blocked';
  readonly readyForRuleExecution: false;
  readonly gaps: readonly FRB003Gap[];
}

export interface FRB003ThreeDivisionsBridgeReadinessAudit {
  readonly schemaVersion: 'frb003-three-divisions-bridge-readiness-audit-v1';
  readonly contractVersion: typeof FRB003_CONTRACT_VERSION;
  readonly track: 'face-bridge';
  readonly traditionalRegistryRef: typeof FRB003_T2_CONCEPT_REGISTRY_REF;
  readonly engineBaseline: 'FR286';
  readonly conceptCount: 4;
  readonly concepts: readonly FRB003ConceptReadiness[];
  readonly crossConceptPolicy: {
    readonly geometryEqualityImpliesSemanticIdentity: false;
    readonly universalThreeDivisionsFormulaIssued: false;
    readonly globalSantingSancaiSanzhuAliasIssued: false;
    readonly sourceVariantSelectedToFitEngineGeometry: false;
  };
  readonly coordinateFrameBoundary: {
    readonly upstreamState:
      'research_successor_coordinate_frame_selected_projection_and_anchor_execution_blocked';
    readonly bridgeProjectionIssued: false;
    readonly crossFrameCollapseAllowed: false;
  };
  readonly authorityBoundary: {
    readonly providerLandmarkIdsIssued: false;
    readonly thresholdIssued: false;
    readonly balanceToleranceIssued: false;
    readonly calibrationIssued: false;
    readonly traditionalOutcomeIssued: false;
    readonly ruleExecuted: false;
    readonly claimIssued: false;
    readonly productionActivated: false;
  };
}

const CONCEPT_KEYS: readonly FRB003ConceptKey[] = Object.freeze([
  'trad.face.mayi_1925.santing.contiguous',
  'trad.face.shenxiang_gujin.santing.contiguous',
  'trad.face.shenyi_fu_gujin.santing.noncontiguous',
  'trad.face.liuzhuang.santing.candidate',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FRB-003 ${message}`);
}

function productState(featureKey: string):
FRB003AnchorReadiness['candidateImplementationState'] {
  const entry = FR286_PRODUCT_COLUMN_MAP.find(
    (candidate) => candidate.featureKey === featureKey,
  );
  return entry?.implementationState ?? null;
}

function anchorReadiness(anchor: FRB003TraditionalAnchor):
FRB003AnchorReadiness {
  const fr259 = THREE_DIVISIONS_NEUTRAL_REFERENCE_REUSE_AUDIT_FR259.entries.find(
    (entry) => entry.traditionalAnchorRef === anchor,
  );
  if (fr259 === undefined) fail(`FR259 anchor missing: ${anchor}.`);

  switch (anchor) {
    case 'hairline':
      return Object.freeze({
        anchor,
        readiness: 'feature_not_materialized' as const,
        candidateFeatureKey: 'forehead.visible_hairline_boundary',
        candidateImplementationState:
          productState('forehead.visible_hairline_boundary'),
        rejectedProxyFeatureKeys: Object.freeze([]),
        traditionalEquivalenceAuthorized: false as const,
        providerLandmarkBindingAuthorized: false as const,
        detail:
          'FR282/FR286 name a visible hairline-boundary product feature, but its extractor is not materialized. No provider landmark may substitute for a visible hair/skin boundary.',
      });
    case 'brow':
      return Object.freeze({
        anchor,
        readiness: 'no_acceptable_canonical_reference' as const,
        candidateFeatureKey: null,
        candidateImplementationState: null,
        rejectedProxyFeatureKeys: Object.freeze([
          'eyebrow.span_arch_tail_orientation',
        ]),
        traditionalEquivalenceAuthorized: false as const,
        providerLandmarkBindingAuthorized: false as const,
        detail:
          'FR259 keeps the brow vertical-reference dependency blocked. Eyebrow span/arch/tail morphology is not a governed brow-midline vertical reference.',
      });
    case 'yintang':
      return Object.freeze({
        anchor,
        readiness: 'no_acceptable_canonical_reference' as const,
        candidateFeatureKey: null,
        candidateImplementationState: null,
        rejectedProxyFeatureKeys: Object.freeze([]),
        traditionalEquivalenceAuthorized: false as const,
        providerLandmarkBindingAuthorized: false as const,
        detail:
          'No governed canonical interbrow/Yintang vertical reference currently exists.',
      });
    case 'shangen':
      return Object.freeze({
        anchor,
        readiness: 'no_acceptable_canonical_reference' as const,
        candidateFeatureKey: null,
        candidateImplementationState: null,
        rejectedProxyFeatureKeys: Object.freeze([
          'nose.bridge_centerline_deviation',
        ]),
        traditionalEquivalenceAuthorized: false as const,
        providerLandmarkBindingAuthorized: false as const,
        detail:
          'Nose bridge-centerline shape geometry is not a governed Shangen vertical anchor and cannot be reused as one.',
      });
    case 'zhuntou':
      return Object.freeze({
        anchor,
        readiness: 'no_acceptable_canonical_reference' as const,
        candidateFeatureKey: null,
        candidateImplementationState: null,
        rejectedProxyFeatureKeys: Object.freeze([
          'nose.tip_contour_circularity',
        ]),
        traditionalEquivalenceAuthorized: false as const,
        providerLandmarkBindingAuthorized: false as const,
        detail:
          'Visible nose-tip contour circularity is a shape metric, not a governed Zhuntou vertical reference.',
      });
    case 'renzhong':
      return Object.freeze({
        anchor,
        readiness: 'no_acceptable_canonical_reference' as const,
        candidateFeatureKey: null,
        candidateImplementationState: null,
        rejectedProxyFeatureKeys: Object.freeze([
          'mouth.philtrum_length_width',
        ]),
        traditionalEquivalenceAuthorized: false as const,
        providerLandmarkBindingAuthorized: false as const,
        detail:
          'The philtrum morphology column is not a governed Renzhong vertical anchor; it is also not materialized in FR286.',
      });
    case 'dige':
      return Object.freeze({
        anchor,
        readiness: 'bounded_candidate_not_equivalent' as const,
        candidateFeatureKey: 'chin_lower_face.visible_contour',
        candidateImplementationState:
          productState('chin_lower_face.visible_contour'),
        rejectedProxyFeatureKeys: Object.freeze([]),
        traditionalEquivalenceAuthorized: false as const,
        providerLandmarkBindingAuthorized: false as const,
        detail:
          'FR286 materializes the visible soft-tissue lower-face contour, but FR259 explicitly forbids treating that contour as anatomical chin or traditional Dige equivalence.',
      });
  }
}

function observationGap(
  conceptKey: FRB003ConceptKey,
  anchorState: FRB003AnchorReadiness,
): FRB003Gap {
  const code: FRB003GapCode =
    anchorState.readiness === 'feature_not_materialized'
      ? 'anchor_feature_not_materialized'
      : anchorState.readiness === 'bounded_candidate_not_equivalent'
        ? 'candidate_feature_not_equivalent'
        : 'anchor_reference_missing';
  return Object.freeze({
    owner: 'face-observation-engine' as const,
    code,
    conceptKey,
    anchor: anchorState.anchor,
    detail: anchorState.detail,
  });
}

function registryMethodologyState(methodologyRef: string | null): {
  readonly methodologyReadiness:
    FRB003ConceptReadiness['methodologyReadiness'];
  readonly metricOperationalizationReadiness:
    FRB003ConceptReadiness['metricOperationalizationReadiness'];
  readonly methodologyGap: FRB003GapCode | null;
} {
  if (methodologyRef === null) {
    return Object.freeze({
      methodologyReadiness: 'runtime_methodology_missing' as const,
      metricOperationalizationReadiness: 'runtime_methodology_missing' as const,
      methodologyGap: 'runtime_methodology_missing' as const,
    });
  }

  const methodologyExists =
    FACE_AUTHORITY_RESEARCH_REGISTRY_V0.methodologies.some(
      (entry) =>
        `${entry.methodologyId}@${entry.version}` === methodologyRef,
    );
  if (!methodologyExists) {
    return Object.freeze({
      methodologyReadiness: 'runtime_methodology_missing' as const,
      metricOperationalizationReadiness: 'runtime_methodology_missing' as const,
      methodologyGap: 'runtime_methodology_missing' as const,
    });
  }

  const metrics = FACE_AUTHORITY_RESEARCH_REGISTRY_V0.metrics.filter(
    (entry) => entry.methodologyRef === methodologyRef,
  );
  const operationalizations =
    FACE_AUTHORITY_RESEARCH_REGISTRY_V0.operationalizations.filter(
      (entry) => entry.methodologyRef === methodologyRef,
    );

  if (metrics.length === 0 || operationalizations.length === 0) {
    return Object.freeze({
      methodologyReadiness: 'research_definition_present' as const,
      metricOperationalizationReadiness: 'metric_contract_missing' as const,
      methodologyGap: 'metric_contract_missing' as const,
    });
  }

  return Object.freeze({
    methodologyReadiness: 'research_definition_present' as const,
    metricOperationalizationReadiness:
      'research_metric_contract_present_unbound' as const,
    methodologyGap: 'metric_binding_missing' as const,
  });
}

function concept(input: {
  readonly conceptKey: FRB003ConceptKey;
  readonly sourceContext: string;
  readonly sourcePassageRefs: readonly string[];
  readonly sourceReadiness: FRB003ConceptReadiness['sourceReadiness'];
  readonly requiredAnchors: readonly FRB003TraditionalAnchor[];
  readonly spanKind: FRB003ConceptReadiness['spanKind'];
  readonly runtimeMethodologyRef: string | null;
  readonly sourceGap?: Extract<
    FRB003GapCode,
    'direct_source_witness_gap' | 'primary_lineage_witness_gap'
  >;
}): FRB003ConceptReadiness {
  const anchorStates = Object.freeze(input.requiredAnchors.map(anchorReadiness));
  const runtime = registryMethodologyState(input.runtimeMethodologyRef);
  const gaps: FRB003Gap[] = anchorStates.map((entry) =>
    observationGap(input.conceptKey, entry));

  if (input.sourceGap !== undefined) {
    gaps.push(Object.freeze({
      owner: 'face-traditional-research' as const,
      code: input.sourceGap,
      conceptKey: input.conceptKey,
      detail:
        input.sourceGap === 'primary_lineage_witness_gap'
          ? 'The exact compilation transmission is pinned, but an earlier/independent primary-lineage witness is still unresolved.'
          : 'The concept is retained from a transmitted/indexed or candidate text context whose direct target witness is not yet admitted as source authority.',
    }));
  }

  if (runtime.methodologyGap !== null) {
    gaps.push(Object.freeze({
      owner:
        runtime.methodologyGap === 'metric_binding_missing'
          ? 'face-bridge' as const
          : 'face-traditional-research' as const,
      code: runtime.methodologyGap,
      conceptKey: input.conceptKey,
      detail:
        runtime.methodologyGap === 'metric_binding_missing'
          ? 'Research metric/operationalization contracts exist, but no canonical observation binding is admitted.'
          : runtime.methodologyGap === 'metric_contract_missing'
            ? 'A research methodology definition exists, but no executable metric/operationalization contract is currently registered for this methodology.'
            : 'No runtime methodology definition is registered for this source-qualified concept.',
    }));
  }

  return Object.freeze({
    conceptKey: input.conceptKey,
    sourceContext: input.sourceContext,
    sourcePassageRefs: Object.freeze([...input.sourcePassageRefs]),
    sourceReadiness: input.sourceReadiness,
    requiredAnchors: Object.freeze([...input.requiredAnchors]),
    spanKind: input.spanKind,
    runtimeMethodologyRef: input.runtimeMethodologyRef,
    methodologyReadiness: runtime.methodologyReadiness,
    metricOperationalizationReadiness:
      runtime.metricOperationalizationReadiness,
    anchorReadiness: anchorStates,
    observationReadiness: 'blocked' as const,
    overallBridgeReadiness: 'blocked' as const,
    readyForRuleExecution: false as const,
    gaps: Object.freeze(gaps),
  });
}

export function buildThreeDivisionsBridgeReadinessAuditFRB003():
FRB003ThreeDivisionsBridgeReadinessAudit {
  assertFR286ProductColumnMap();
  assertThreeDivisionsNeutralReferenceReuseAuditFR259(
    THREE_DIVISIONS_NEUTRAL_REFERENCE_REUSE_AUDIT_FR259,
  );
  assertMayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262(
    MAYI_CONTIGUOUS_THREE_DIVISIONS_NEUTRAL_ANCHOR_AUTHORITY_FR262,
  );
  assertThreeDivisionsSuccessorCoordinateFrameAdjudicationFR264(
    THREE_DIVISIONS_SUCCESSOR_COORDINATE_FRAME_ADJUDICATION_FR264,
  );

  const mayi = issueMayiThreeDivisionsSourceContextAdjudicationFR261();
  const shenyi =
    issueShenyiFuNoncontiguousThreeDivisionsTransmissionWitnessFR263();

  if (
    mayi.mayiWitness.directScanReReviewed !== true
    || mayi.mayiWitness.secondTriplet.classification !==
      'contiguous_mayi_face_three_divisions_context'
    || shenyi.sourceIdentity.exactPagePinned !== true
    || shenyi.unresolvedSourceGap.earlierIndependentRareBookScanStillNeeded !==
      true
  ) {
    fail('source-context predecessor boundary drift.');
  }

  const concepts = Object.freeze([
    concept({
      conceptKey: 'trad.face.mayi_1925.santing.contiguous',
      sourceContext: '麻衣相法 卷一 / 三才三停論',
      sourcePassageRefs: Object.freeze([
        'passage.mayi.sancai_three_divisions.boundaries',
        'passage.mayi.sancai_three_divisions.period',
      ]),
      sourceReadiness: 'scan_context_re_reviewed',
      requiredAnchors: Object.freeze([
        'hairline',
        'brow',
        'zhuntou',
        'dige',
      ] as const),
      spanKind: 'contiguous',
      runtimeMethodologyRef:
        'method.mayi.face_three_divisions@0.1.0',
    }),
    concept({
      conceptKey: 'trad.face.shenxiang_gujin.santing.contiguous',
      sourceContext:
        '欽定古今圖書集成 藝術典 第632卷 / 神相全編二 / 三才三停論',
      sourcePassageRefs: Object.freeze([
        'passage.shenxiang.sancai_three_divisions',
      ]),
      sourceReadiness: 'indexed_transmission_direct_witness_gap',
      sourceGap: 'direct_source_witness_gap',
      requiredAnchors: Object.freeze([
        'hairline',
        'brow',
        'zhuntou',
        'dige',
      ] as const),
      spanKind: 'contiguous',
      runtimeMethodologyRef:
        'method.shenxiang.face_three_divisions@0.1.0',
    }),
    concept({
      conceptKey:
        'trad.face.shenyi_fu_gujin.santing.noncontiguous',
      sourceContext:
        '欽定古今圖書集成 藝術典 第636卷 / 神異賦 transmission',
      sourcePassageRefs: Object.freeze([
        'fr263:gujin-shenyi-fu-page-48',
      ]),
      sourceReadiness:
        'compilation_page_pinned_primary_lineage_gap',
      sourceGap: 'primary_lineage_witness_gap',
      requiredAnchors: Object.freeze([
        'hairline',
        'yintang',
        'shangen',
        'zhuntou',
        'renzhong',
        'dige',
      ] as const),
      spanKind: 'noncontiguous',
      runtimeMethodologyRef: null,
    }),
    concept({
      conceptKey: 'trad.face.liuzhuang.santing.candidate',
      sourceContext: '柳莊相法 / 永樂百問 / 三停有面有身何說',
      sourcePassageRefs: Object.freeze([
        'passage.liuzhuang.three_divisions',
      ]),
      sourceReadiness: 'candidate_direct_scan_required',
      sourceGap: 'direct_source_witness_gap',
      requiredAnchors: Object.freeze([
        'hairline',
        'shangen',
        'zhuntou',
        'renzhong',
        'dige',
      ] as const),
      spanKind: 'segmented_noncontiguous',
      runtimeMethodologyRef:
        'method.liuzhuang.face_three_divisions@0.1.0',
    }),
  ] satisfies readonly FRB003ConceptReadiness[]);

  const audit: FRB003ThreeDivisionsBridgeReadinessAudit = Object.freeze({
    schemaVersion:
      'frb003-three-divisions-bridge-readiness-audit-v1' as const,
    contractVersion: FRB003_CONTRACT_VERSION,
    track: 'face-bridge' as const,
    traditionalRegistryRef: FRB003_T2_CONCEPT_REGISTRY_REF,
    engineBaseline: 'FR286' as const,
    conceptCount: 4 as const,
    concepts,
    crossConceptPolicy: Object.freeze({
      geometryEqualityImpliesSemanticIdentity: false as const,
      universalThreeDivisionsFormulaIssued: false as const,
      globalSantingSancaiSanzhuAliasIssued: false as const,
      sourceVariantSelectedToFitEngineGeometry: false as const,
    }),
    coordinateFrameBoundary: Object.freeze({
      upstreamState:
        'research_successor_coordinate_frame_selected_projection_and_anchor_execution_blocked' as const,
      bridgeProjectionIssued: false as const,
      crossFrameCollapseAllowed: false as const,
    }),
    authorityBoundary: Object.freeze({
      providerLandmarkIdsIssued: false as const,
      thresholdIssued: false as const,
      balanceToleranceIssued: false as const,
      calibrationIssued: false as const,
      traditionalOutcomeIssued: false as const,
      ruleExecuted: false as const,
      claimIssued: false as const,
      productionActivated: false as const,
    }),
  });

  assertThreeDivisionsBridgeReadinessAuditFRB003(audit);
  return audit;
}

function sameSequence<T>(left: readonly T[], right: readonly T[]): boolean {
  return left.length === right.length
    && left.every((entry, index) => entry === right[index]);
}

export function assertThreeDivisionsBridgeReadinessAuditFRB003(
  audit: FRB003ThreeDivisionsBridgeReadinessAudit,
): void {
  if (
    audit.schemaVersion !==
      'frb003-three-divisions-bridge-readiness-audit-v1'
    || audit.contractVersion !== FRB003_CONTRACT_VERSION
    || audit.track !== 'face-bridge'
    || audit.traditionalRegistryRef !== FRB003_T2_CONCEPT_REGISTRY_REF
    || audit.engineBaseline !== 'FR286'
    || audit.conceptCount !== 4
  ) {
    fail('identity/baseline drift.');
  }

  if (
    !sameSequence(
      audit.concepts.map((entry) => entry.conceptKey),
      CONCEPT_KEYS,
    )
    || new Set(audit.concepts.map((entry) => entry.conceptKey)).size !== 4
  ) {
    fail('source-qualified concept identity/order drift.');
  }

  const mayi = audit.concepts[0]!;
  const shenxiang = audit.concepts[1]!;
  const shenyi = audit.concepts[2]!;
  const liuzhuang = audit.concepts[3]!;

  if (
    !sameSequence(mayi.requiredAnchors, [
      'hairline', 'brow', 'zhuntou', 'dige',
    ] as const)
    || !sameSequence(shenxiang.requiredAnchors, [
      'hairline', 'brow', 'zhuntou', 'dige',
    ] as const)
    || !sameSequence(shenyi.requiredAnchors, [
      'hairline', 'yintang', 'shangen', 'zhuntou', 'renzhong', 'dige',
    ] as const)
    || !sameSequence(liuzhuang.requiredAnchors, [
      'hairline', 'shangen', 'zhuntou', 'renzhong', 'dige',
    ] as const)
  ) {
    fail('T2 observation-requirement anchor drift.');
  }

  if (
    audit.concepts.some((entry) =>
      entry.observationReadiness !== 'blocked'
      || entry.overallBridgeReadiness !== 'blocked'
      || entry.readyForRuleExecution !== false
      || entry.anchorReadiness.length !== entry.requiredAnchors.length
      || entry.anchorReadiness.some((anchor) =>
        anchor.traditionalEquivalenceAuthorized !== false
        || anchor.providerLandmarkBindingAuthorized !== false))
  ) {
    fail('blocked bridge/readiness authority widened.');
  }

  const hairline = mayi.anchorReadiness.find(
    (entry) => entry.anchor === 'hairline',
  );
  const dige = mayi.anchorReadiness.find(
    (entry) => entry.anchor === 'dige',
  );
  if (
    hairline?.candidateFeatureKey !== 'forehead.visible_hairline_boundary'
    || hairline.candidateImplementationState !== 'extractor_required'
    || dige?.candidateFeatureKey !== 'chin_lower_face.visible_contour'
    || dige.candidateImplementationState !==
      'canonical_extractor_materialized'
    || dige.readiness !== 'bounded_candidate_not_equivalent'
  ) {
    fail('FR286 anchor-candidate capability drift.');
  }

  if (
    THREE_DIVISIONS_SUCCESSOR_COORDINATE_FRAME_ADJUDICATION_FR264.authorityState
      !==
        'research_successor_coordinate_frame_selected_projection_and_anchor_execution_blocked'
    || audit.coordinateFrameBoundary.upstreamState !==
      THREE_DIVISIONS_SUCCESSOR_COORDINATE_FRAME_ADJUDICATION_FR264.authorityState
    || audit.coordinateFrameBoundary.bridgeProjectionIssued !== false
    || audit.coordinateFrameBoundary.crossFrameCollapseAllowed !== false
  ) {
    fail('FR264 coordinate-frame boundary drift.');
  }

  if (
    shenxiang.metricOperationalizationReadiness !==
      'research_metric_contract_present_unbound'
    || !shenxiang.gaps.some((entry) =>
      entry.owner === 'face-bridge'
      && entry.code === 'metric_binding_missing')
    || mayi.metricOperationalizationReadiness !== 'metric_contract_missing'
    || liuzhuang.metricOperationalizationReadiness !==
      'metric_contract_missing'
    || shenyi.methodologyReadiness !== 'runtime_methodology_missing'
  ) {
    fail('methodology/metric readiness routing drift.');
  }

  if (
    shenxiang.sourceReadiness !==
      'indexed_transmission_direct_witness_gap'
    || shenyi.sourceReadiness !==
      'compilation_page_pinned_primary_lineage_gap'
    || liuzhuang.sourceReadiness !==
      'candidate_direct_scan_required'
    || ![shenxiang, shenyi, liuzhuang].every((entry) =>
      entry.gaps.some((gap) =>
        gap.owner === 'face-traditional-research'))
  ) {
    fail('traditional-source handoff routing drift.');
  }

  if (
    Object.values(audit.crossConceptPolicy).some((value) => value !== false)
    || Object.values(audit.authorityBoundary).some((value) => value !== false)
  ) {
    fail('cross-concept or authority boundary widened.');
  }
}

export const THREE_DIVISIONS_BRIDGE_READINESS_AUDIT_FRB003 =
  buildThreeDivisionsBridgeReadinessAuditFRB003();
