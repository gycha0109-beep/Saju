import { FaceAuthorityValidationError } from './validation.js';

export type NeutralEarProviderCompensatedOutputFrameEvidenceFR104V1 =
  Readonly<{
    schemaVersion:
      'fr104-provider-compensated-output-frame-evidence-v1';
    authorityState:
      'original_input_frame_supported_retrospective_audit_admitted';
    resultSha256: string;
    state: 'original_input_frame_supported';
    selectedHypothesis: 'original_input_image_frame';
    providerCompensatedOutputFrameAudited: true;
    providerCompensatedOutputFrame:
      'original_input_image_frame';
    composedProviderOrientationNormalizationAvailableForExactFixture:
      true;
    anatomicalMappingReviewOutcome: 'hold';
    providerLabelMappedToAnatomicalSide: false;
    anatomicalLateralityAuthorized: false;
    traditionalBindingAuthorized: false;
    productionAuthorization: false;
  }>;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-104 compensated output frame ${message}`,
  );
}
function object(
  value: unknown,
  label: string,
): Record<string, unknown> {
  if (
    typeof value !== 'object'
    || value === null
    || Array.isArray(value)
  ) {
    fail(`${label} must be an object.`);
  }
  return value as Record<string, unknown>;
}
function exact(
  actual: unknown,
  expected: string | number | boolean | null,
  label: string,
): void {
  if (!Object.is(actual, expected)) {
    fail(`${label} must equal the governed value.`);
  }
}

export function admitNeutralEarProviderCompensatedOutputFrameResultFR104(
  input: unknown,
  resultSha256: string,
): NeutralEarProviderCompensatedOutputFrameEvidenceFR104V1 {
  exact(
    resultSha256,
    '732268b973592f70f606000ffcbd0219e67afcc20b920e57906d14978f5cbb05',
    'resultSha256',
  );

  const root = object(input, 'result');
  exact(
    root.schemaVersion,
    'fr104-provider-compensated-output-frame-result-v1',
    'schemaVersion',
  );
  exact(
    root.authorityState,
    'bounded_coordinate_frame_candidate_no_anatomical_mapping',
    'authorityState',
  );
  exact(
    root.studyKind,
    'retrospective_coordinate_frame_audit',
    'studyKind',
  );

  const predecessor = object(root.predecessor, 'predecessor');
  exact(
    predecessor.resultSha256,
    '9b278cf355ec497f5978ce3ae22f5cf94a84bc0ce94908990157e04322a14a0c',
    'predecessor.resultSha256',
  );
  exact(
    predecessor.liveReplayVerified,
    true,
    'predecessor.liveReplayVerified',
  );
  exact(
    predecessor.repositoryPersistence,
    false,
    'predecessor.repositoryPersistence',
  );

  const summary = object(root.summary, 'summary');
  exact(
    summary.state,
    'original_input_frame_supported',
    'summary.state',
  );
  exact(
    summary.selectedHypothesis,
    'original_input_image_frame',
    'summary.selectedHypothesis',
  );
  exact(
    summary.quarterTurnOriginalInputFrameStrictDominance,
    true,
    'summary.quarterTurnOriginalInputFrameStrictDominance',
  );
  exact(
    summary.halfTurnIdentityRejected,
    true,
    'summary.halfTurnIdentityRejected',
  );
  exact(
    summary.providerLabelsUsedToChooseFrame,
    false,
    'summary.providerLabelsUsedToChooseFrame',
  );
  exact(
    summary.anatomicalInterpretationUsed,
    false,
    'summary.anatomicalInterpretationUsed',
  );
  exact(
    summary.anatomicalMappingReviewOutcome,
    'hold',
    'summary.anatomicalMappingReviewOutcome',
  );

  const aggregate = object(
    summary.aggregateUnorderedPairCost,
    'summary.aggregateUnorderedPairCost',
  );
  exact(
    aggregate.canonical_output_frame,
    1.1000092040019644,
    'aggregate.canonical_output_frame',
  );
  exact(
    aggregate.original_input_image_frame,
    0.017798602734814976,
    'aggregate.original_input_image_frame',
  );
  exact(
    aggregate.opposite_rotated_output_frame,
    0.2062558418317363,
    'aggregate.opposite_rotated_output_frame',
  );

  if (
    JSON.stringify(summary.selectedSameLabelCaseIds)
      !== JSON.stringify([
        'R0','R90','R180','R270',
        'M0','M90','M180','M270',
      ])
  ) {
    fail('selectedSameLabelCaseIds mismatch.');
  }
  if (
    JSON.stringify(summary.selectedCrossLabelCaseIds)
      !== JSON.stringify([])
  ) {
    fail('selectedCrossLabelCaseIds mismatch.');
  }

  const sourceAuthority = object(root.authority, 'authority');
  for (const key of [
    'providerCompensatedOutputFrameAudited',
    'composedProviderOrientationNormalizationAvailableForExactFixture',
    'providerLabelMappedToAnatomicalSide',
    'globalProviderAnatomicalSemanticsEstablished',
    'anatomicalReferenceAdmitted',
    'anatomicalLateralityAuthorized',
    'validatedExternalEarObservationAuthorized',
    'traditionalBindingAuthorized',
    'productionAuthorization',
  ] as const) {
    exact(sourceAuthority[key], false, `authority.${key}`);
  }
  exact(
    sourceAuthority.providerCompensatedOutputFrame,
    'unresolved',
    'authority.providerCompensatedOutputFrame',
  );

  return Object.freeze({
    schemaVersion:
      'fr104-provider-compensated-output-frame-evidence-v1' as const,
    authorityState:
      'original_input_frame_supported_retrospective_audit_admitted' as const,
    resultSha256,
    state: 'original_input_frame_supported' as const,
    selectedHypothesis:
      'original_input_image_frame' as const,
    providerCompensatedOutputFrameAudited: true as const,
    providerCompensatedOutputFrame:
      'original_input_image_frame' as const,
    composedProviderOrientationNormalizationAvailableForExactFixture:
      true as const,
    anatomicalMappingReviewOutcome: 'hold' as const,
    providerLabelMappedToAnatomicalSide: false as const,
    anatomicalLateralityAuthorized: false as const,
    traditionalBindingAuthorized: false as const,
    productionAuthorization: false as const,
  });
}
