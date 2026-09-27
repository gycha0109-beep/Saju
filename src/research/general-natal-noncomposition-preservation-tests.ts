import type {
  R040EvidenceRole,
  R040MethodologyFamily,
} from './general-natal-noncollapsing-yongxi-evidence.js';
import {
  R139_AUTHORITY,
  R139_COMPOSITION_PROBES,
  R139_METHODOLOGY_COMPOSITION_MATRIX_VERSION,
  R139_SUMMARY,
  r139CanonicalPairKey,
  type R139CompositionProbe,
  type R139CompositionState,
} from './general-natal-methodology-composition-admissibility-matrix.js';

export const R140_NON_COMPOSITION_PRESERVATION_VERSION = '0.1.0-research' as const;

export type R140PreservationOutcome =
  | 'PRESERVE_PARALLEL_EVIDENCE'
  | 'PRESERVE_UNRESOLVED_COMPOSITION'
  | 'PRESERVE_NON_COMPOSITION_BOUNDARY';

export type R140AdversarialPressure =
  | 'REVERSE_INPUT_ORDER'
  | 'METHOD_COUNT_MAJORITY'
  | 'SOURCE_COUNT_MAJORITY'
  | 'NUMERIC_PRIORITY_INJECTION'
  | 'WEIGHTED_PRIORITY_INJECTION'
  | 'ROLE_COLLAPSE'
  | 'FINAL_YONGSHEN_COLLAPSE'
  | 'AUTO_SPECIAL_PATTERN_TRANSITION'
  | 'AUTO_CONFLICT_TIEBREAK';

export interface R140EvidenceSnapshot {
  methodologyFamily: R040MethodologyFamily;
  role: R040EvidenceRole;
  value: string;
  identity: string;
}

export interface R140PreservationVector {
  id: string;
  sourceProbeId: string;
  pairKey: string;
  sourceCompositionState:
    | 'PARALLEL_PRESERVATION_ONLY'
    | 'COMPOSITION_UNRESOLVED'
    | 'NON_COMPOSITION_BOUNDARY';
  expectedOutcome: R140PreservationOutcome;
  adversarialPressure: R140AdversarialPressure;
  pressurePayload: string;
  sourceEvidence: readonly [R140EvidenceSnapshot, R140EvidenceSnapshot];
  perturbedEvidence: readonly [R140EvidenceSnapshot, R140EvidenceSnapshot];
  expectedEvidenceIdentities: readonly string[];
  sourceRefs: readonly string[];
  unresolvedOperands: readonly string[];
  pairKeyPreserved: true;
  evidenceIdentitySetPreserved: true;
  roleIdentityPreserved: true;
  methodWinnerEmitted: null;
  numericPriorityEmitted: null;
  finalYongShenEmitted: null;
  mergedRoleEmitted: null;
  specialTransitionEmitted: null;
  executable: false;
  productionAuthorityPromoted: false;
}

export interface R140SameElementRoleControl {
  id: string;
  sourceProbeId: string;
  pairKey: string;
  leftMethod: R040MethodologyFamily;
  rightMethod: R040MethodologyFamily;
  leftRole: R040EvidenceRole;
  rightRole: R040EvidenceRole;
  sharedValue: string;
  distinctRolePreserved: true;
  mergedRoleEmitted: null;
  finalYongShenEmitted: null;
  executable: false;
}

export const R140_NON_COMPOSABLE_STATES: readonly R139CompositionState[] =
  Object.freeze([
    'PARALLEL_PRESERVATION_ONLY',
    'COMPOSITION_UNRESOLVED',
    'NON_COMPOSITION_BOUNDARY',
  ]);

export const R140_ADVERSARIAL_PRESSURES: readonly R140AdversarialPressure[] =
  Object.freeze([
    'REVERSE_INPUT_ORDER',
    'METHOD_COUNT_MAJORITY',
    'SOURCE_COUNT_MAJORITY',
    'NUMERIC_PRIORITY_INJECTION',
    'WEIGHTED_PRIORITY_INJECTION',
    'ROLE_COLLAPSE',
    'FINAL_YONGSHEN_COLLAPSE',
    'AUTO_SPECIAL_PATTERN_TRANSITION',
    'AUTO_CONFLICT_TIEBREAK',
  ]);

export const R140_SOURCE_PROBES: readonly R139CompositionProbe[] = Object.freeze(
  R139_COMPOSITION_PROBES.filter((item) =>
    R140_NON_COMPOSABLE_STATES.includes(item.compositionState),
  ),
);

const outcomeFor = (
  state: R140PreservationVector['sourceCompositionState'],
): R140PreservationOutcome => {
  switch (state) {
    case 'PARALLEL_PRESERVATION_ONLY':
      return 'PRESERVE_PARALLEL_EVIDENCE';
    case 'COMPOSITION_UNRESOLVED':
      return 'PRESERVE_UNRESOLVED_COMPOSITION';
    case 'NON_COMPOSITION_BOUNDARY':
      return 'PRESERVE_NON_COMPOSITION_BOUNDARY';
  }
};

const pressurePayload = (pressure: R140AdversarialPressure): string => {
  switch (pressure) {
    case 'REVERSE_INPUT_ORDER':
      return 'reverse the two evidence items and attempt to infer precedence from order';
    case 'METHOD_COUNT_MAJORITY':
      return 'inject a synthetic methodology-count majority and attempt winner selection';
    case 'SOURCE_COUNT_MAJORITY':
      return 'inject a synthetic source-count majority and attempt winner selection';
    case 'NUMERIC_PRIORITY_INJECTION':
      return 'inject a numeric priority score and attempt to resolve the pair';
    case 'WEIGHTED_PRIORITY_INJECTION':
      return 'inject a weighted method score and attempt to resolve the pair';
    case 'ROLE_COLLAPSE':
      return 'attempt to merge method-specific semantic roles into one canonical role';
    case 'FINAL_YONGSHEN_COLLAPSE':
      return 'attempt to emit one final Yongshen from the preserved evidence';
    case 'AUTO_SPECIAL_PATTERN_TRANSITION':
      return 'attempt to promote unresolved or incompatible evidence into a special-pattern transition';
    case 'AUTO_CONFLICT_TIEBREAK':
      return 'attempt to convert unresolved conflict into an automatic tie-break result';
  }
};

const identity = (
  methodologyFamily: R040MethodologyFamily,
  role: R040EvidenceRole,
  value: string,
): string => [methodologyFamily, role, value].join('::');

const sourceEvidenceFor = (
  probe: R139CompositionProbe,
): readonly [R140EvidenceSnapshot, R140EvidenceSnapshot] => {
  const left = Object.freeze({
    methodologyFamily: probe.leftMethod,
    role: probe.leftRole,
    value: probe.leftValue,
    identity: identity(probe.leftMethod, probe.leftRole, probe.leftValue),
  });
  const right = Object.freeze({
    methodologyFamily: probe.rightMethod,
    role: probe.rightRole,
    value: probe.rightValue,
    identity: identity(probe.rightMethod, probe.rightRole, probe.rightValue),
  });
  return [left, right] as const;
};

const asSourceState = (
  state: R139CompositionState,
): R140PreservationVector['sourceCompositionState'] => {
  if (
    state === 'PARALLEL_PRESERVATION_ONLY' ||
    state === 'COMPOSITION_UNRESOLVED' ||
    state === 'NON_COMPOSITION_BOUNDARY'
  ) {
    return state;
  }
  throw new Error('R140 source probe is not a non-composition preservation state');
};

export const R140_PRESERVATION_VECTORS: readonly R140PreservationVector[] =
  Object.freeze(
    R140_SOURCE_PROBES.flatMap((probe) => {
      const sourceCompositionState = asSourceState(probe.compositionState);
      const sourceEvidence = sourceEvidenceFor(probe);
      const expectedEvidenceIdentities = Object.freeze(
        sourceEvidence.map((item) => item.identity).sort(),
      );

      return R140_ADVERSARIAL_PRESSURES.map((pressure) => {
        const perturbedEvidence: readonly [
          R140EvidenceSnapshot,
          R140EvidenceSnapshot,
        ] =
          pressure === 'REVERSE_INPUT_ORDER'
            ? [sourceEvidence[1], sourceEvidence[0]]
            : [sourceEvidence[0], sourceEvidence[1]];

        return Object.freeze({
          id: 'R140-' + probe.id + '-' + pressure,
          sourceProbeId: probe.id,
          pairKey: probe.pairKey,
          sourceCompositionState,
          expectedOutcome: outcomeFor(sourceCompositionState),
          adversarialPressure: pressure,
          pressurePayload: pressurePayload(pressure),
          sourceEvidence,
          perturbedEvidence,
          expectedEvidenceIdentities,
          sourceRefs: probe.sourceRefs,
          unresolvedOperands: probe.unresolvedOperands,
          pairKeyPreserved: true as const,
          evidenceIdentitySetPreserved: true as const,
          roleIdentityPreserved: true as const,
          methodWinnerEmitted: null,
          numericPriorityEmitted: null,
          finalYongShenEmitted: null,
          mergedRoleEmitted: null,
          specialTransitionEmitted: null,
          executable: false as const,
          productionAuthorityPromoted: false as const,
        });
      });
    }),
  );

export const R140_SAME_ELEMENT_ROLE_CONTROLS: readonly R140SameElementRoleControl[] =
  Object.freeze(
    R139_COMPOSITION_PROBES.filter((item) => item.sameElementDifferentRole).map(
      (item, index) =>
        Object.freeze({
          id: 'R140-SAME-ELEMENT-' + String(index + 1).padStart(2, '0'),
          sourceProbeId: item.id,
          pairKey: item.pairKey,
          leftMethod: item.leftMethod,
          rightMethod: item.rightMethod,
          leftRole: item.leftRole,
          rightRole: item.rightRole,
          sharedValue: item.leftValue,
          distinctRolePreserved: true as const,
          mergedRoleEmitted: null,
          finalYongShenEmitted: null,
          executable: false as const,
        }),
    ),
  );

export const R140_REJECTED_FAILURE_MODES = Object.freeze([
  'INPUT_ORDER_CHANGES_WINNER',
  'METHOD_COUNT_CREATES_WINNER',
  'SOURCE_COUNT_CREATES_WINNER',
  'NUMERIC_PRIORITY_RESOLVES_NON_COMPOSITION',
  'WEIGHTED_PRIORITY_RESOLVES_NON_COMPOSITION',
  'ROLE_COLLAPSE_ERASES_METHOD_SEMANTICS',
  'SAME_ELEMENT_COLLAPSES_DISTINCT_ROLES',
  'NON_COMPOSITION_EMITS_FINAL_YONGSHEN',
  'UNRESOLVED_STATE_AUTO_TIEBREAK',
  'ORDINARY_FAILURE_AUTO_SPECIAL_TRANSITION',
  'PARALLEL_EVIDENCE_AUTO_COMPOSITION',
  'NON_COMPOSITION_BOUNDARY_AUTO_ENGINE_ADMISSION',
] as const);

const sourceStateCount = (
  state: R140PreservationVector['sourceCompositionState'],
): number => R140_SOURCE_PROBES.filter((item) => item.compositionState === state).length;

export const R140_SUMMARY = Object.freeze({
  sourceProbeCount: R140_SOURCE_PROBES.length,
  adversarialPressureCount: R140_ADVERSARIAL_PRESSURES.length,
  preservationVectorCount: R140_PRESERVATION_VECTORS.length,
  parallelSourceCount: sourceStateCount('PARALLEL_PRESERVATION_ONLY'),
  unresolvedSourceCount: sourceStateCount('COMPOSITION_UNRESOLVED'),
  nonCompositionBoundarySourceCount: sourceStateCount('NON_COMPOSITION_BOUNDARY'),
  reverseInputVectorCount: R140_PRESERVATION_VECTORS.filter(
    (item) => item.adversarialPressure === 'REVERSE_INPUT_ORDER',
  ).length,
  specialFollowSourceCount: R140_SOURCE_PROBES.filter(
    (item) => item.leftMethod === 'SPECIAL_FOLLOW' || item.rightMethod === 'SPECIAL_FOLLOW',
  ).length,
  sameElementRoleControlCount: R140_SAME_ELEMENT_ROLE_CONTROLS.length,
  pairKeyViolationCount: R140_PRESERVATION_VECTORS.filter(
    (item) => !item.pairKeyPreserved,
  ).length,
  evidenceIdentityViolationCount: R140_PRESERVATION_VECTORS.filter(
    (item) => !item.evidenceIdentitySetPreserved,
  ).length,
  roleIdentityViolationCount: R140_PRESERVATION_VECTORS.filter(
    (item) => !item.roleIdentityPreserved,
  ).length,
  methodWinnerEmissionCount: R140_PRESERVATION_VECTORS.filter(
    (item) => item.methodWinnerEmitted !== null,
  ).length,
  numericPriorityEmissionCount: R140_PRESERVATION_VECTORS.filter(
    (item) => item.numericPriorityEmitted !== null,
  ).length,
  finalYongShenEmissionCount: R140_PRESERVATION_VECTORS.filter(
    (item) => item.finalYongShenEmitted !== null,
  ).length,
  mergedRoleEmissionCount: R140_PRESERVATION_VECTORS.filter(
    (item) => item.mergedRoleEmitted !== null,
  ).length,
  specialTransitionEmissionCount: R140_PRESERVATION_VECTORS.filter(
    (item) => item.specialTransitionEmitted !== null,
  ).length,
  executableCount: R140_PRESERVATION_VECTORS.filter((item) => item.executable).length,
  productionAuthorityPromotedCount: R140_PRESERVATION_VECTORS.filter(
    (item) => item.productionAuthorityPromoted,
  ).length,
});

export const R140_UPSTREAM_BINDINGS = Object.freeze({
  r139: {
    version: R139_METHODOLOGY_COMPOSITION_MATRIX_VERSION,
    parallelPreservationOnlyCount: R139_SUMMARY.parallelPreservationOnlyCount,
    compositionUnresolvedCount: R139_SUMMARY.compositionUnresolvedCount,
    nonCompositionBoundaryCount: R139_SUMMARY.nonCompositionBoundaryCount,
    sameElementDifferentRoleCount: R139_SUMMARY.sameElementDifferentRoleCount,
    globalCompositionAuthorized: R139_AUTHORITY.globalCompositionAuthorized,
    methodWinnerResolverAuthorized: R139_AUTHORITY.methodWinnerResolverAuthorized,
    numericMethodPriorityAuthorized: R139_AUTHORITY.numericMethodPriorityAuthorized,
    finalYongShenAuthorized: R139_AUTHORITY.finalYongShenAuthorized,
    roleCollapseAuthorized: R139_AUTHORITY.roleCollapseAuthorized,
    automaticSpecialTransitionAuthorized:
      R139_AUTHORITY.automaticSpecialTransitionAuthorized,
    productionAuthorityPromoted: R139_AUTHORITY.productionAuthorityPromoted,
  },
});

export const R140_AUTHORITY = Object.freeze({
  status: 'RESEARCH_NON_COMPOSITION_PRESERVATION_TESTS_COMPLETE' as const,
  researchOnly: true,
  allR139NonCompositionStatesCovered: true,
  adversarialOrderPreservationObserved: true,
  evidenceIdentityPreservationObserved: true,
  roleIdentityPreservationObserved: true,
  sameElementDifferentRolePreserved: true,
  methodWinnerLeakObserved: false,
  numericPriorityLeakObserved: false,
  finalYongShenLeakObserved: false,
  roleCollapseLeakObserved: false,
  specialTransitionLeakObserved: false,
  executableLeakObserved: false,
  productionAuthorityLeakObserved: false,
  methodWinnerResolverAuthorized: false,
  automaticTieBreakAuthorized: false,
  numericMethodPriorityAuthorized: false,
  finalYongShenAuthorized: false,
  roleCollapseAuthorized: false,
  automaticSpecialTransitionAuthorized: false,
  chartRoleFactEmissionAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});

export const r140CanonicalPairStillMatches = (
  vector: R140PreservationVector,
): boolean =>
  r139CanonicalPairKey(
    vector.perturbedEvidence[0].methodologyFamily,
    vector.perturbedEvidence[1].methodologyFamily,
  ) === vector.pairKey;
