import {
  FR265_RULE_REF,
  issueFullFaceNeutralCanonicalMetricXYProjectionRuleFR265,
  projectNeutralCanonicalMetricGeometryToXYFR265,
  type CanonicalMetricPoint3DFR265,
} from './full-face-neutral-canonical-metric-xy-projection-rule-fr265.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR266_REFERENCE_REF =
  'neutral.face.nasal_apex.vertical_coordinate@0.1.0' as const;
export const FR266_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr266-provider-independent-nasal-apex-reference.md' as const;
export const FR266_NEXT_FRONTIER =
  'evaluate_automated_neutral_nasal_apex_candidates_against_frozen_provider_independent_annotations_before_zhuntou_admission' as const;

export interface ProviderIndependentNasalApexEvidenceFR266V1 {
  readonly evidenceId: string;
  readonly sourceRef: string;
  readonly definition:
    | 'most_protruded_point_of_apex_nasi'
    | 'most_prominent_midline_point_of_nasal_tip'
    | 'most_protruded_point_of_nasal_tip';
  readonly supportsProviderIndependentNasalApexAnnotation: true;
  readonly supportsTraditionalZhuntouEquivalence: false;
  readonly note: string;
}

export interface ProviderIndependentNasalApexAnnotationFR266V1 {
  readonly schemaVersion: 'fr266-provider-independent-nasal-apex-annotation-v1';
  readonly subjectId: string;
  readonly captureId: string;
  readonly annotatorId: string;
  readonly coordinateFrame: 'canonical_aligned_right_handed_metric_3d';
  readonly unit: 'centimeter';
  readonly point: CanonicalMetricPoint3DFR265;
  readonly annotationDefinition:
    'most_prominent_midline_nasal_apex_point_in_canonical_aligned_metric_3d';
  readonly providerOutputVisibleDuringAnnotation: false;
  readonly providerIndicesVisibleDuringAnnotation: false;
  readonly traditionalLabelVisibleDuringAnnotation: false;
  readonly annotationFrozenBeforeProviderScoring: true;
}

export interface NeutralNasalApexVerticalReferenceFR266V1 {
  readonly schemaVersion: 'fr266-neutral-nasal-apex-vertical-reference-v1';
  readonly artifactVersion: '0.1.0';
  readonly referenceRef: typeof FR266_REFERENCE_REF;
  readonly watchtowerTrack: 'face-research';
  readonly authorityState:
    'provider_independent_research_annotation_vertical_reference_only';
  readonly value: number;
  readonly unit: 'centimeter';
  readonly coordinateFrame: 'canonical_aligned_right_handed_metric_xy';
  readonly source: {
    readonly subjectId: string;
    readonly captureId: string;
    readonly annotatorId: string;
    readonly sourceCoordinateFrame:
      'canonical_aligned_right_handed_metric_3d';
    readonly projectionRuleRef: typeof FR265_RULE_REF;
    readonly annotationDefinition:
      'most_prominent_midline_nasal_apex_point_in_canonical_aligned_metric_3d';
    readonly providerBlind: true;
    readonly traditionalLabelBlind: true;
    readonly frozenBeforeProviderScoring: true;
  };
  readonly authorityBoundary: {
    readonly neutralResearchReferenceOnly: true;
    readonly automatedExtractionIssued: false;
    readonly providerIndexIssued: false;
    readonly providerIndexSemanticBindingIssued: false;
    readonly anthropometricPronasaleIdentityPromotedToProduct: false;
    readonly traditionalZhuntouEquivalenceIssued: false;
    readonly threeDivisionsSpanIssued: false;
    readonly thresholdIssued: false;
    readonly calibrationIssued: false;
    readonly classifierIssued: false;
    readonly F1ClaimIssued: false;
    readonly F6ClaimIssued: false;
    readonly fortuneClaimIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly researchNoteRef: typeof FR266_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR266_NEXT_FRONTIER;
}

export interface ProviderIndependentNasalApexAuthorityFR266V1 {
  readonly schemaVersion: 'fr266-provider-independent-nasal-apex-authority-v1';
  readonly artifactVersion: '0.1.0';
  readonly baselineMainSha: 'af88ed04fe2f6efa0fa271cfeda31f99d200250b';
  readonly watchtowerTrack: 'face-research';
  readonly authorityState:
    'provider_independent_nasal_apex_annotation_and_vertical_reference_defined';
  readonly evidence: readonly ProviderIndependentNasalApexEvidenceFR266V1[];
  readonly protocol: {
    readonly target:
      'provider_independent_midline_nasal_apex_reference_for_research_validation';
    readonly sourceFrame:
      'canonical_aligned_right_handed_metric_3d';
    readonly projectionRuleRef: typeof FR265_RULE_REF;
    readonly outputFrame:
      'canonical_aligned_right_handed_metric_xy';
    readonly providerBlindAnnotationRequired: true;
    readonly providerIndexBlindAnnotationRequired: true;
    readonly traditionalLabelBlindAnnotationRequired: true;
    readonly freezeBeforeProviderScoringRequired: true;
  };
  readonly authorityBoundary: {
    readonly literatureSupportsProviderIndependentNasalApexDefinition: true;
    readonly literatureEstablishesTraditionalZhuntouEquivalence: false;
    readonly providerMappingIssued: false;
    readonly automatedExtractionIssued: false;
    readonly traditionalSemanticProjectionAllowed: false;
    readonly productionGeometryAuthorized: false;
  };
  readonly researchNoteRef: typeof FR266_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR266_NEXT_FRONTIER;
}

const EVIDENCE: readonly ProviderIndependentNasalApexEvidenceFR266V1[] =
  Object.freeze([
    Object.freeze({
      evidenceId: 'evidence.fr266.twin_study_pronasale_definition',
      sourceRef: 'PMCID:PMC5008732',
      definition: 'most_protruded_point_of_apex_nasi' as const,
      supportsProviderIndependentNasalApexAnnotation: true as const,
      supportsTraditionalZhuntouEquivalence: false as const,
      note:
        '3D facial anthropometry defines pronasale as the most protruded point of the apex nasi; this supports a provider-independent neutral research landmark only.',
    }),
    Object.freeze({
      evidenceId: 'evidence.fr266.malay_3d_pronasale_definition',
      sourceRef: 'PMCID:PMC5051712',
      definition: 'most_prominent_midline_point_of_nasal_tip' as const,
      supportsProviderIndependentNasalApexAnnotation: true as const,
      supportsTraditionalZhuntouEquivalence: false as const,
      note:
        'The study defines pronasale as the most prominent midline point on the nose tip.',
    }),
    Object.freeze({
      evidenceId: 'evidence.fr266.smartphone_3d_landmark_definition',
      sourceRef: 'PMCID:PMC10172784',
      definition: 'most_protruded_point_of_nasal_tip' as const,
      supportsProviderIndependentNasalApexAnnotation: true as const,
      supportsTraditionalZhuntouEquivalence: false as const,
      note:
        '3D facial imaging validation uses pronasale as the most protruded point of the nasal tip.',
    }),
    Object.freeze({
      evidenceId: 'evidence.fr266.automated_3d_landmark_definition',
      sourceRef: 'PMCID:PMC10252224',
      definition: 'most_protruded_point_of_apex_nasi' as const,
      supportsProviderIndependentNasalApexAnnotation: true as const,
      supportsTraditionalZhuntouEquivalence: false as const,
      note:
        'Automated 3D landmark research independently uses the anteriorly protruded apex nasi definition.',
    }),
  ]);

export const PROVIDER_INDEPENDENT_NASAL_APEX_AUTHORITY_FR266:
ProviderIndependentNasalApexAuthorityFR266V1 = Object.freeze({
  schemaVersion: 'fr266-provider-independent-nasal-apex-authority-v1' as const,
  artifactVersion: '0.1.0' as const,
  baselineMainSha: 'af88ed04fe2f6efa0fa271cfeda31f99d200250b' as const,
  watchtowerTrack: 'face-research' as const,
  authorityState:
    'provider_independent_nasal_apex_annotation_and_vertical_reference_defined' as const,
  evidence: EVIDENCE,
  protocol: Object.freeze({
    target:
      'provider_independent_midline_nasal_apex_reference_for_research_validation' as const,
    sourceFrame: 'canonical_aligned_right_handed_metric_3d' as const,
    projectionRuleRef: FR265_RULE_REF,
    outputFrame: 'canonical_aligned_right_handed_metric_xy' as const,
    providerBlindAnnotationRequired: true as const,
    providerIndexBlindAnnotationRequired: true as const,
    traditionalLabelBlindAnnotationRequired: true as const,
    freezeBeforeProviderScoringRequired: true as const,
  }),
  authorityBoundary: Object.freeze({
    literatureSupportsProviderIndependentNasalApexDefinition: true as const,
    literatureEstablishesTraditionalZhuntouEquivalence: false as const,
    providerMappingIssued: false as const,
    automatedExtractionIssued: false as const,
    traditionalSemanticProjectionAllowed: false as const,
    productionGeometryAuthorized: false as const,
  }),
  researchNoteRef: FR266_RESEARCH_NOTE_REF,
  nextFrontier: FR266_NEXT_FRONTIER,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-266 ${message}`);
}

function nonEmpty(value: string, label: string): string {
  const trimmed = value.trim();
  if (trimmed.length === 0) fail(`${label} must be non-empty.`);
  return trimmed;
}

function assertFinitePoint(point: CanonicalMetricPoint3DFR265): void {
  if (
    !Number.isFinite(point.x) ||
    !Number.isFinite(point.y) ||
    !Number.isFinite(point.z)
  ) fail('annotation point must contain finite x/y/z.');
}

export function assertProviderIndependentNasalApexAuthorityFR266(
  authority: ProviderIndependentNasalApexAuthorityFR266V1,
): void {
  const projectionRule =
    issueFullFaceNeutralCanonicalMetricXYProjectionRuleFR265();

  if (
    authority.schemaVersion !==
      'fr266-provider-independent-nasal-apex-authority-v1' ||
    authority.artifactVersion !== '0.1.0' ||
    authority.baselineMainSha !==
      'af88ed04fe2f6efa0fa271cfeda31f99d200250b' ||
    authority.watchtowerTrack !== 'face-research' ||
    authority.authorityState !==
      'provider_independent_nasal_apex_annotation_and_vertical_reference_defined'
  ) fail('authority identity/baseline drift.');

  if (
    projectionRule.ruleRef !== FR265_RULE_REF ||
    projectionRule.targetCoordinateFrame !==
      'canonical_aligned_right_handed_metric_xy' ||
    projectionRule.authorityBoundary.traditionalAnchorIdentityIssued !== false
  ) fail('FR265 projection predecessor boundary drift.');

  if (
    authority.evidence.length < 3 ||
    authority.evidence.some(
      (entry) =>
        entry.supportsProviderIndependentNasalApexAnnotation !== true ||
        entry.supportsTraditionalZhuntouEquivalence !== false ||
        entry.sourceRef.trim().length === 0,
    )
  ) fail('provider-independent nasal-apex evidence drift.');

  if (
    authority.protocol.sourceFrame !==
      'canonical_aligned_right_handed_metric_3d' ||
    authority.protocol.projectionRuleRef !== FR265_RULE_REF ||
    authority.protocol.outputFrame !==
      'canonical_aligned_right_handed_metric_xy' ||
    authority.protocol.providerBlindAnnotationRequired !== true ||
    authority.protocol.providerIndexBlindAnnotationRequired !== true ||
    authority.protocol.traditionalLabelBlindAnnotationRequired !== true ||
    authority.protocol.freezeBeforeProviderScoringRequired !== true
  ) fail('annotation protocol drift.');

  if (
    authority.authorityBoundary
      .literatureSupportsProviderIndependentNasalApexDefinition !== true ||
    authority.authorityBoundary
      .literatureEstablishesTraditionalZhuntouEquivalence !== false ||
    authority.authorityBoundary.providerMappingIssued !== false ||
    authority.authorityBoundary.automatedExtractionIssued !== false ||
    authority.authorityBoundary.traditionalSemanticProjectionAllowed !== false ||
    authority.authorityBoundary.productionGeometryAuthorized !== false
  ) fail('authority widened beyond provider-independent research reference.');

  if (
    authority.researchNoteRef !== FR266_RESEARCH_NOTE_REF ||
    authority.nextFrontier !== FR266_NEXT_FRONTIER
  ) fail('research continuation drift.');
}

export function deriveNeutralNasalApexVerticalReferenceFR266(
  annotation: ProviderIndependentNasalApexAnnotationFR266V1,
): NeutralNasalApexVerticalReferenceFR266V1 {
  assertProviderIndependentNasalApexAuthorityFR266(
    PROVIDER_INDEPENDENT_NASAL_APEX_AUTHORITY_FR266,
  );

  if (
    annotation.schemaVersion !==
      'fr266-provider-independent-nasal-apex-annotation-v1' ||
    annotation.coordinateFrame !==
      'canonical_aligned_right_handed_metric_3d' ||
    annotation.unit !== 'centimeter' ||
    annotation.annotationDefinition !==
      'most_prominent_midline_nasal_apex_point_in_canonical_aligned_metric_3d' ||
    annotation.providerOutputVisibleDuringAnnotation !== false ||
    annotation.providerIndicesVisibleDuringAnnotation !== false ||
    annotation.traditionalLabelVisibleDuringAnnotation !== false ||
    annotation.annotationFrozenBeforeProviderScoring !== true
  ) fail('annotation protocol boundary drift.');

  const subjectId = nonEmpty(annotation.subjectId, 'subjectId');
  const captureId = nonEmpty(annotation.captureId, 'captureId');
  const annotatorId = nonEmpty(annotation.annotatorId, 'annotatorId');
  assertFinitePoint(annotation.point);

  const projectionRule =
    issueFullFaceNeutralCanonicalMetricXYProjectionRuleFR265();
  const projected = projectNeutralCanonicalMetricGeometryToXYFR265(
    {
      sourceCoordinateFrame:
        'canonical_aligned_right_handed_metric_3d',
      sourceUnit: 'centimeter',
      canonicalInversePoseAligned: true,
      sourceGeometryRef:
        `fr266:provider_independent_nasal_apex:${subjectId}:${captureId}`,
      points: Object.freeze([Object.freeze({ ...annotation.point })]),
    },
    projectionRule,
  );

  const point = projected.points[0];
  if (point === undefined || !Number.isFinite(point.y)) {
    fail('FR265 projection did not return one finite nasal-apex point.');
  }

  const result: NeutralNasalApexVerticalReferenceFR266V1 = Object.freeze({
    schemaVersion:
      'fr266-neutral-nasal-apex-vertical-reference-v1' as const,
    artifactVersion: '0.1.0' as const,
    referenceRef: FR266_REFERENCE_REF,
    watchtowerTrack: 'face-research' as const,
    authorityState:
      'provider_independent_research_annotation_vertical_reference_only' as const,
    value: point.y,
    unit: 'centimeter' as const,
    coordinateFrame:
      'canonical_aligned_right_handed_metric_xy' as const,
    source: Object.freeze({
      subjectId,
      captureId,
      annotatorId,
      sourceCoordinateFrame:
        'canonical_aligned_right_handed_metric_3d' as const,
      projectionRuleRef: FR265_RULE_REF,
      annotationDefinition: annotation.annotationDefinition,
      providerBlind: true as const,
      traditionalLabelBlind: true as const,
      frozenBeforeProviderScoring: true as const,
    }),
    authorityBoundary: Object.freeze({
      neutralResearchReferenceOnly: true as const,
      automatedExtractionIssued: false as const,
      providerIndexIssued: false as const,
      providerIndexSemanticBindingIssued: false as const,
      anthropometricPronasaleIdentityPromotedToProduct: false as const,
      traditionalZhuntouEquivalenceIssued: false as const,
      threeDivisionsSpanIssued: false as const,
      thresholdIssued: false as const,
      calibrationIssued: false as const,
      classifierIssued: false as const,
      F1ClaimIssued: false as const,
      F6ClaimIssued: false as const,
      fortuneClaimIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    researchNoteRef: FR266_RESEARCH_NOTE_REF,
    nextFrontier: FR266_NEXT_FRONTIER,
  });

  assertNeutralNasalApexVerticalReferenceFR266(result);
  return result;
}

export function assertNeutralNasalApexVerticalReferenceFR266(
  result: NeutralNasalApexVerticalReferenceFR266V1,
): void {
  if (
    result.schemaVersion !==
      'fr266-neutral-nasal-apex-vertical-reference-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.referenceRef !== FR266_REFERENCE_REF ||
    result.watchtowerTrack !== 'face-research' ||
    result.authorityState !==
      'provider_independent_research_annotation_vertical_reference_only' ||
    !Number.isFinite(result.value) ||
    result.unit !== 'centimeter' ||
    result.coordinateFrame !==
      'canonical_aligned_right_handed_metric_xy' ||
    result.source.projectionRuleRef !== FR265_RULE_REF ||
    result.source.providerBlind !== true ||
    result.source.traditionalLabelBlind !== true ||
    result.source.frozenBeforeProviderScoring !== true
  ) fail('vertical-reference identity/source drift.');

  if (
    result.authorityBoundary.neutralResearchReferenceOnly !== true ||
    Object.entries(result.authorityBoundary)
      .filter(([key]) => key !== 'neutralResearchReferenceOnly')
      .some(([, value]) => value !== false)
  ) fail('vertical-reference authority widened.');

  if (
    result.researchNoteRef !== FR266_RESEARCH_NOTE_REF ||
    result.nextFrontier !== FR266_NEXT_FRONTIER
  ) fail('vertical-reference continuation drift.');
}
