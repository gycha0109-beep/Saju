export type NeutralEarAnatomicalSemanticWitnessStateFR104V1 =
  | 'direct_anatomical_semantic_witness_admitted'
  | 'provider_named_side_only'
  | 'conflicting_or_ambiguous';

export interface NeutralEarAnatomicalSemanticSourceWitnessFR104V1 {
  readonly repository: 'google-ai-edge/mediapipe';
  readonly releaseTag: 'v0.10.35';
  readonly releaseCommit:
    'f8ef212d5c962c0e853db7e59d217056b187084b';
  readonly path: string;
  readonly gitBlobSha: string;
  readonly evidenceRole:
    | 'published_named_eye_topology'
    | 'face_landmarker_public_api_comment'
    | 'face_landmarker_rotation_comment';
}

export const NEUTRAL_EAR_ANATOMICAL_SEMANTIC_SOURCE_WITNESSES_FR104:
readonly NeutralEarAnatomicalSemanticSourceWitnessFR104V1[] =
  Object.freeze([
    Object.freeze({
      repository: 'google-ai-edge/mediapipe' as const,
      releaseTag: 'v0.10.35' as const,
      releaseCommit:
        'f8ef212d5c962c0e853db7e59d217056b187084b' as const,
      path:
        'mediapipe/tasks/web/vision/face_landmarker/face_landmarks_connections.ts',
      gitBlobSha:
        '644de9d8c7cd90880d92b2393b4913fa93ace927',
      evidenceRole:
        'published_named_eye_topology' as const,
    }),
    Object.freeze({
      repository: 'google-ai-edge/mediapipe' as const,
      releaseTag: 'v0.10.35' as const,
      releaseCommit:
        'f8ef212d5c962c0e853db7e59d217056b187084b' as const,
      path:
        'mediapipe/tasks/web/vision/face_landmarker/face_landmarker.ts',
      gitBlobSha:
        '6d9b2f713345fb576301f40c3d520829ab5f23be',
      evidenceRole:
        'face_landmarker_public_api_comment' as const,
    }),
    Object.freeze({
      repository: 'google-ai-edge/mediapipe' as const,
      releaseTag: 'v0.10.35' as const,
      releaseCommit:
        'f8ef212d5c962c0e853db7e59d217056b187084b' as const,
      path:
        'mediapipe/tasks/cc/vision/face_landmarker/face_landmarks_detector_graph.cc',
      gitBlobSha:
        'b17c528ceb03ddb0eef858cd6ec74e20425703f9',
      evidenceRole:
        'face_landmarker_rotation_comment' as const,
    }),
  ]);

export const NEUTRAL_EAR_ANATOMICAL_SIDE_SEMANTIC_WITNESS_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-neutral-ear-anatomical-side-semantic-witness-v1' as const,
    authorityState:
      'conflicting_or_ambiguous' as NeutralEarAnatomicalSemanticWitnessStateFR104V1,

    pinnedProviderSurface: Object.freeze({
      releaseTag: 'v0.10.35' as const,
      releaseCommit:
        'f8ef212d5c962c0e853db7e59d217056b187084b' as const,

      namedTopology: Object.freeze({
        leftEyeGroupContainsIndex263: true as const,
        leftEyeGroupContainsIndex33: false as const,
        rightEyeGroupContainsIndex33: true as const,
        rightEyeGroupContainsIndex263: false as const,
        commentsCallGroupsLeftEyeAndRightEye: true as const,
        subjectRelativePerspectiveExplicitlyDocumented:
          false as const,
        viewerRelativePerspectiveExplicitlyDocumented:
          false as const,
      }),

      publicApiComment: Object.freeze({
        leftEyePhrase:
          "Landmark connections to draw the connection between a face's left eye." as const,
        rightEyePhrase:
          "Landmark connections to draw the connection between a face's right eye." as const,
        subjectRelativePerspectiveExplicitlyDocumented:
          false as const,
        viewerRelativePerspectiveExplicitlyDocumented:
          false as const,
      }),

      rotationCommentConflict: Object.freeze({
        startIndex: 33 as const,
        startComment:
          'Left side of left eye.' as const,
        endIndex: 263 as const,
        endComment:
          'Right side of right eye.' as const,
        startIndexBelongsToPublishedRightEyeGroup:
          true as const,
        endIndexBelongsToPublishedLeftEyeGroup:
          true as const,
        conflictWithPublishedNamedTopologyDetected:
          true as const,
      }),
    }),

    adjacentGoogleConvention: Object.freeze({
      sourceFamily:
        'google_ml_kit_face_api_not_mediapipe_face_landmarker' as const,
      subjectRelativeLeftRightDocumented:
        true as const,
      mayAuthorizeFaceLandmarkerAnatomicalSemantics:
        false as const,
      reason:
        'adjacent product semantics cannot resolve conflicting or perspective-ambiguous exact FaceLandmarker release sources' as const,
    }),

    decision: Object.freeze({
      directAnatomicalSemanticWitnessAdmitted:
        false as const,
      providerNamedSideOnly:
        false as const,
      conflictingOrAmbiguous:
        true as const,
      providerLeftMayBeCalledSubjectAnatomicalLeft:
        false as const,
      providerRightMayBeCalledSubjectAnatomicalRight:
        false as const,
      anatomicalSideMappingMayProceed:
        false as const,
      nextGate:
        'retain anatomical mapping closed; continue transform-parity and same-frame verification work, then require an independently governed anatomical-side witness or controlled anatomical reference protocol' as const,
    }),

    prohibitedShortcuts: Object.freeze([
      'treat_FACE_LANDMARKS_LEFT_EYE_name_as_subject_anatomical_left',
      'treat_FACE_LANDMARKS_RIGHT_EYE_name_as_subject_anatomical_right',
      'import_adjacent_google_product_subject_relative_semantics_as_face_landmarker_authority',
      'resolve_exact_release_source_conflict_by_convention_or_common_knowledge',
      'use_florence_prompt_side_as_anatomical_authority',
      'use_image_space_x_sign_as_anatomical_authority',
    ] as const),

    authority: Object.freeze({
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservationAuthorized:
        false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });
