#!/usr/bin/env node

import {
  access,
  mkdir,
  readFile,
  writeFile,
} from 'node:fs/promises';
import {
  dirname,
  isAbsolute,
  relative,
  resolve,
} from 'node:path';
import process from 'node:process';

const PRIVATE_SUMMARY_SCHEMA =
  'multisignal-visible-hairline-private-summary-v1';
const CANDIDATE_DETAIL_SCHEMA =
  'multisignal-visible-hairline-local-candidate-v1';
const WORKSHEET_SCHEMA =
  'multisignal-hairline-human-review-worksheet-v1';
const OUTPUT_SCHEMA =
  'fr308-fr312-local-deidentified-validation-input-v1';

const MODEL_ID =
  'candidate.hairline.multisignal_visible_interface.fr306';
const MODEL_REVISION = '0.2.0';
const RUNNER_CONTRACT_VERSION =
  'MULTISIGNAL-VISIBLE-HAIRLINE-LOCAL-CANDIDATE-v1';
const METHOD_ID =
  'adaptive_skin_edge_texture_continuity';

const PREVIEW_STATES = new Set([
  'visible_interface_candidate',
  'partially_visible_or_occluded',
  'no_visible_hairline_candidate',
  'unavailable',
]);

const FR308_CASES = Object.freeze([
  'clear_unobstructed_central_hairline',
  'partial_bangs_occlusion',
  'heavy_bangs_hairline_substantially_hidden',
  'cropped_upper_forehead',
]);

const FR312_CASES = Object.freeze([
  'm_shaped_or_widows_peak_visible_contour',
  'side_recession_or_asymmetric_visible_hairline',
  'upper_hairline_visibility_loss',
  'dark_hair_dark_background',
  'light_hair_or_low_local_contrast',
  'ordinary_indoor_illumination_variation',
]);

const FAILURE_MODES = new Set([
  'useful_candidate',
  'leakage',
  'hallucination',
  'unavailable',
  'ambiguous',
]);

const FR308_DISPOSITIONS = new Set([
  'supports_further_evaluation',
  'inconclusive',
  'rejects_current_candidate_behavior',
]);

const FR312_DISPOSITIONS = new Set([
  ...FR308_DISPOSITIONS,
  'unavailable',
]);

const PRIVATE_OUTPUT_KEYS = new Set([
  'privateEvidence',
  'candidatePath',
  'overlayPath',
  'sourcePath',
  'sourceImageDigest',
  'boundaryPoints',
  'rawSignals',
  'faceRoi',
  'fileName',
  'subjectId',
  'captureId',
]);

function usage() {
  return `Usage:
  npm run face:review:hairline-multisignal -- --prepare --summary <private-summary.json> --worksheet <worksheet.json>
  npm run face:review:hairline-multisignal -- --compile --worksheet <worksheet.json> --output <private-input.json>
  npm run face:verify:hairline-multisignal-review-packet

All private review material must stay outside the repository or under .cache/face-reading/.
The compiled FR308/310/312 input is deidentified but should still remain local.
`;
}

function parseArgs(argv) {
  const parsed = {
    mode: null,
    summary: null,
    worksheet: null,
    output: null,
    selfCheck: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--prepare') {
      if (parsed.mode !== null) throw new Error('MODE_AMBIGUOUS');
      parsed.mode = 'prepare';
    } else if (arg === '--compile') {
      if (parsed.mode !== null) throw new Error('MODE_AMBIGUOUS');
      parsed.mode = 'compile';
    } else if (arg === '--summary') {
      const value = argv[index + 1];
      if (!value) throw new Error('MISSING_SUMMARY_ARGUMENT');
      parsed.summary = value;
      index += 1;
    } else if (arg === '--worksheet') {
      const value = argv[index + 1];
      if (!value) throw new Error('MISSING_WORKSHEET_ARGUMENT');
      parsed.worksheet = value;
      index += 1;
    } else if (arg === '--output') {
      const value = argv[index + 1];
      if (!value) throw new Error('MISSING_OUTPUT_ARGUMENT');
      parsed.output = value;
      index += 1;
    } else if (arg === '--self-check') {
      parsed.selfCheck = true;
    } else if (arg === '--help' || arg === '-h') {
      parsed.help = true;
    } else {
      throw new Error(`UNKNOWN_ARGUMENT:${arg}`);
    }
  }

  return parsed;
}

function localPrivatePath(path, code) {
  const absolute = resolve(path);
  const cwd = resolve(process.cwd());
  const rel = relative(cwd, absolute);

  if (
    rel !== '' &&
    !rel.startsWith('..') &&
    !isAbsolute(rel) &&
    rel !== '.cache/face-reading' &&
    !rel.startsWith('.cache/face-reading/')
  ) {
    throw new Error(code);
  }

  return absolute;
}

function localOutputPath(path, code) {
  const absolute = resolve(path);
  const cwd = resolve(process.cwd());
  const rel = relative(cwd, absolute);

  if (
    rel === '' ||
    rel.startsWith('..') ||
    isAbsolute(rel) ||
    (
      rel !== '.cache/face-reading' &&
      !rel.startsWith('.cache/face-reading/')
    )
  ) {
    throw new Error(code);
  }

  return absolute;
}

function assertObject(value, code) {
  if (
    value === null ||
    typeof value !== 'object' ||
    Array.isArray(value)
  ) {
    throw new Error(code);
  }
}

function assertBoolean(value, code) {
  if (typeof value !== 'boolean') {
    throw new Error(code);
  }
}

function assertOptionalBoolean(value, code) {
  if (value !== null && typeof value !== 'boolean') {
    throw new Error(code);
  }
}

function assertSafeCompiledOutput(value, path = 'output') {
  if (value === null) return;

  if (Array.isArray(value)) {
    value.forEach((child, index) =>
      assertSafeCompiledOutput(child, `${path}[${index}]`),
    );
    return;
  }

  if (typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      if (PRIVATE_OUTPUT_KEYS.has(key)) {
        throw new Error(`PRIVATE_OUTPUT_KEY:${path}.${key}`);
      }
      assertSafeCompiledOutput(child, `${path}.${key}`);
    }
    return;
  }

  if (
    typeof value === 'string' &&
    (
      /sha256:[0-9a-f]{64}/iu.test(value) ||
      /^[0-9a-f]{64}$/iu.test(value)
    )
  ) {
    throw new Error(`PRIVATE_OUTPUT_DIGEST:${path}`);
  }

  if (typeof value === 'number' && !Number.isFinite(value)) {
    throw new Error(`NON_FINITE_OUTPUT:${path}`);
  }
}

async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

async function writeJson(path, value) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(
    path,
    `${JSON.stringify(value, null, 2)}\n`,
    {
      encoding: 'utf8',
      mode: 0o600,
    },
  );
}

async function assertRegisteredCandidate() {
  const module = await import(
    '../.face-reading-dist/visible-hairline-runtime-candidates-fr306.js'
  );
  if (
    typeof module.resolveFR306EmpiricalRuntimeCandidate !==
    'function'
  ) {
    throw new Error('FR306_CANDIDATE_RESOLVER_EXPORT_MISSING');
  }

  const candidate =
    module.resolveFR306EmpiricalRuntimeCandidate(
      MODEL_ID,
      MODEL_REVISION,
      RUNNER_CONTRACT_VERSION,
    );

  if (
    candidate.candidateId !== MODEL_ID ||
    candidate.runtimeProviderId !== MODEL_ID ||
    candidate.exactRevision !== MODEL_REVISION ||
    candidate.runnerContractVersion !==
      RUNNER_CONTRACT_VERSION
  ) {
    throw new Error('MULTISIGNAL_CANDIDATE_REGISTRY_DRIFT');
  }
}

function blankReview() {
  return {
    reviewCompleted: false,
    visibleHairCandidateObserved: null,
    foreheadSkinCandidateObserved: null,
    diagnosticHairlineCandidateObserved: null,
    grossMislocalizationObserved: null,
    hiddenCompletionObserved: null,
    outOfFrameCompletionObserved: null,
    visibleInterfaceCandidateObserved: null,
    candidateFailureMode: null,
    directPromptAuthoritativeHallucinationRisk: null,
    disposition: null,
  };
}

function blankRouting() {
  return {
    selectedForFR308: false,
    fr308Case: null,
    includeInFR312: false,
    fr312Case: null,
    opaqueSessionLabel: null,
    independentCaptureAttested: null,
    derivedFromAnotherCapture: null,
  };
}

async function prepareWorksheet(summaryPath) {
  await assertRegisteredCandidate();

  const summary = await readJson(summaryPath);
  assertObject(summary, 'PRIVATE_SUMMARY_MUST_BE_OBJECT');

  if (
    summary.schemaVersion !== PRIVATE_SUMMARY_SCHEMA ||
    summary.humanReviewRequired !== true ||
    summary.automaticAdmissionAuthorized !== false ||
    !Array.isArray(summary.results) ||
    summary.results.length === 0 ||
    summary.captureCount !== summary.results.length
  ) {
    throw new Error('MULTISIGNAL_PRIVATE_SUMMARY_DRIFT');
  }

  const records = [];
  const seen = new Set();
  for (const result of summary.results) {
    assertObject(result, 'MULTISIGNAL_RESULT_INVALID');

    if (
      typeof result.recordId !== 'string' ||
      result.recordId.trim().length === 0 ||
      typeof result.experimentTag !== 'string' ||
      !PREVIEW_STATES.has(result.engineeringPreviewState) ||
      result.humanReviewRequired !== true ||
      result.automaticAdmissionAuthorized !== false
    ) {
      throw new Error('MULTISIGNAL_RESULT_IDENTITY_DRIFT');
    }

    if (seen.has(result.recordId)) {
      throw new Error('MULTISIGNAL_DUPLICATE_RECORD_ID');
    }
    seen.add(result.recordId);

    const recordDir = resolve(
      dirname(summaryPath),
      result.recordId,
    );
    const candidatePath = resolve(
      recordDir,
      'candidate.json',
    );
    const overlayPath = resolve(
      recordDir,
      'overlay.jpg',
    );
    await access(candidatePath);
    const candidate = await readJson(candidatePath);

    if (
      candidate.schemaVersion !== CANDIDATE_DETAIL_SCHEMA ||
      candidate.recordId !== result.recordId ||
      candidate.method?.id !== METHOD_ID ||
      candidate.method?.version !== MODEL_REVISION ||
      candidate.method?.hairColorClassificationApplied !==
        false ||
      candidate.method?.demographicInferenceApplied !== false ||
      candidate.method?.hiddenHairlineCompletionApplied !==
        false ||
      candidate.humanReviewRequired !== true ||
      candidate.automaticAdmissionAuthorized !== false ||
      candidate.neutralRuntimeHairlineObservationAuthorized !==
        false ||
      candidate.engineeringPreviewState !==
        result.engineeringPreviewState
    ) {
      throw new Error('MULTISIGNAL_CANDIDATE_DETAIL_DRIFT');
    }

    let overlayAvailable = true;
    try {
      await access(overlayPath);
    } catch {
      overlayAvailable = false;
    }

    records.push({
      recordId: result.recordId,
      experimentTag: result.experimentTag,
      candidateSummary: {
        engineeringPreviewState:
          result.engineeringPreviewState,
        signals: result.signals,
        humanReviewRequired: true,
        automaticAdmissionAuthorized: false,
      },
      privateEvidence: {
        candidatePath,
        overlayPath:
          overlayAvailable ? overlayPath : null,
      },
      review: blankReview(),
      routing: blankRouting(),
    });
  }

  return {
    schemaVersion: WORKSHEET_SCHEMA,
    authorityState:
      'private_local_human_review_required',
    candidate: {
      modelId: MODEL_ID,
      modelRevision: MODEL_REVISION,
      runnerContractVersion:
        RUNNER_CONTRACT_VERSION,
    },
    instructions: {
      previewStateMayDetermineDisposition: false,
      signalValuesMayDetermineValidity: false,
      humanReviewerMustInspectLocalEvidence: true,
      hiddenCompletionMustBeExplicitlyReviewed: true,
      grossMislocalizationMustBeExplicitlyReviewed: true,
      outOfFrameCompletionMustBeExplicitlyReviewed: true,
      noVisibleHairlineStateMustNotBeConvertedIntoAnInventedBoundary:
        true,
      sessionLabelsMustBeOperatorAssignedOpaqueValues: true,
      demographicsMayBeCollectedOrInferred: false,
      legacyPromptNamedFieldsRequireExplicitHumanValues:
        true,
    },
    fr310HumanReview: {
      completed: false,
      privacyReviewConfirmed: false,
      assessmentBlockedCases: [],
      directPromptAuthoritativeMisinterpretationRiskCases: [],
    },
    fr312Review: {
      humanReviewCompleted: false,
      sessionLabelsOpaque: false,
      subjectCoverage: 'unknown',
      demographicAttributesCollected: false,
    },
    records,
  };
}

function validateWorksheetHeader(worksheet) {
  assertObject(worksheet, 'WORKSHEET_MUST_BE_OBJECT');
  if (
    worksheet.schemaVersion !== WORKSHEET_SCHEMA ||
    worksheet.authorityState !==
      'private_local_human_review_required' ||
    worksheet.candidate?.modelId !== MODEL_ID ||
    worksheet.candidate?.modelRevision !== MODEL_REVISION ||
    worksheet.candidate?.runnerContractVersion !==
      RUNNER_CONTRACT_VERSION ||
    !Array.isArray(worksheet.records)
  ) {
    throw new Error('WORKSHEET_IDENTITY_DRIFT');
  }

  if (
    worksheet.instructions
      ?.previewStateMayDetermineDisposition !== false ||
    worksheet.instructions
      ?.signalValuesMayDetermineValidity !== false ||
    worksheet.instructions
      ?.humanReviewerMustInspectLocalEvidence !== true ||
    worksheet.instructions
      ?.sessionLabelsMustBeOperatorAssignedOpaqueValues !==
        true ||
    worksheet.instructions
      ?.demographicsMayBeCollectedOrInferred !== false
  ) {
    throw new Error('WORKSHEET_AUTHORITY_BOUNDARY_DRIFT');
  }
}

function validateCompletedReview(record) {
  assertObject(record.review, 'REVIEW_MISSING');
  if (record.review.reviewCompleted !== true) {
    throw new Error(
      `REVIEW_NOT_COMPLETED:${record.recordId}`,
    );
  }

  for (const key of [
    'visibleHairCandidateObserved',
    'foreheadSkinCandidateObserved',
    'diagnosticHairlineCandidateObserved',
    'grossMislocalizationObserved',
    'hiddenCompletionObserved',
    'outOfFrameCompletionObserved',
    'directPromptAuthoritativeHallucinationRisk',
  ]) {
    assertBoolean(
      record.review[key],
      `REVIEW_BOOLEAN_MISSING:${record.recordId}:${key}`,
    );
  }

  assertOptionalBoolean(
    record.review.visibleInterfaceCandidateObserved,
    `REVIEW_VISIBLE_INTERFACE_INVALID:${record.recordId}`,
  );

  if (!FAILURE_MODES.has(record.review.candidateFailureMode)) {
    throw new Error(
      `REVIEW_FAILURE_MODE_INVALID:${record.recordId}`,
    );
  }
}

function compileWorksheet(worksheet) {
  validateWorksheetHeader(worksheet);

  const selectedFR308 = worksheet.records.filter(
    (record) =>
      record.routing?.selectedForFR308 === true,
  );
  if (selectedFR308.length !== 4) {
    throw new Error(
      'FR308_REQUIRES_EXACTLY_FOUR_SELECTED_RECORDS',
    );
  }

  const fr308Cases = selectedFR308.map(
    (record) => record.routing.fr308Case,
  );
  if (
    fr308Cases.some(
      (caseName) => !FR308_CASES.includes(caseName),
    ) ||
    new Set(fr308Cases).size !== 4 ||
    FR308_CASES.some(
      (caseName) => !fr308Cases.includes(caseName),
    )
  ) {
    throw new Error('FR308_REQUIRED_CASE_SELECTION_INVALID');
  }

  const fr310 = worksheet.fr310HumanReview;
  assertObject(fr310, 'FR310_HUMAN_REVIEW_MISSING');
  if (
    fr310.completed !== true ||
    fr310.privacyReviewConfirmed !== true ||
    !Array.isArray(fr310.assessmentBlockedCases) ||
    !Array.isArray(
      fr310
        .directPromptAuthoritativeMisinterpretationRiskCases,
    )
  ) {
    throw new Error(
      'FR310_HUMAN_REVIEW_ATTESTATION_INCOMPLETE',
    );
  }

  for (const caseName of [
    ...fr310.assessmentBlockedCases,
    ...fr310
      .directPromptAuthoritativeMisinterpretationRiskCases,
  ]) {
    if (!FR308_CASES.includes(caseName)) {
      throw new Error('FR310_HUMAN_REVIEW_CASE_INVALID');
    }
  }

  const caseFindings = selectedFR308
    .slice()
    .sort(
      (a, b) =>
        FR308_CASES.indexOf(a.routing.fr308Case) -
        FR308_CASES.indexOf(b.routing.fr308Case),
    )
    .map((record) => {
      validateCompletedReview(record);
      if (!FR308_DISPOSITIONS.has(record.review.disposition)) {
        throw new Error(
          `FR308_REVIEW_DISPOSITION_INVALID:${record.recordId}`,
        );
      }
      return {
        schemaVersion:
          'fr308-deidentified-hairline-case-finding-v1',
        case: record.routing.fr308Case,
        visibleHairCandidateObserved:
          record.review.visibleHairCandidateObserved,
        foreheadSkinCandidateObserved:
          record.review.foreheadSkinCandidateObserved,
        diagnosticHairlineCandidateObserved:
          record.review.diagnosticHairlineCandidateObserved,
        grossMislocalizationObserved:
          record.review.grossMislocalizationObserved,
        hiddenCompletionObserved:
          record.review.hiddenCompletionObserved,
        outOfFrameCompletionObserved:
          record.review.outOfFrameCompletionObserved,
        visibleInterfaceCandidateObserved:
          record.review.visibleInterfaceCandidateObserved,
        directPromptFailureMode:
          record.review.candidateFailureMode,
        disposition: record.review.disposition,
        containsSourceImage: false,
        containsOverlay: false,
        containsRawPolygonCoordinates: false,
        containsSourceImageDigest: false,
        containsFileNameOrPersonalIdentifier: false,
      };
    });

  const selectedFR312 = worksheet.records.filter(
    (record) =>
      record.routing?.includeInFR312 === true,
  );
  if (selectedFR312.length < 12) {
    throw new Error(
      'FR312_REQUIRES_AT_LEAST_TWELVE_INCLUDED_CAPTURES',
    );
  }

  for (const caseName of FR312_CASES) {
    if (
      selectedFR312.filter(
        (record) =>
          record.routing?.fr312Case === caseName,
      ).length < 2
    ) {
      throw new Error(
        `FR312_CASE_REQUIRES_TWO_CAPTURES:${caseName}`,
      );
    }
  }

  const fr312 = worksheet.fr312Review;
  assertObject(fr312, 'FR312_REVIEW_MISSING');
  if (
    fr312.humanReviewCompleted !== true ||
    fr312.sessionLabelsOpaque !== true ||
    fr312.demographicAttributesCollected !== false ||
    ![
      'single_subject',
      'multiple_subjects',
      'unknown',
    ].includes(fr312.subjectCoverage)
  ) {
    throw new Error('FR312_REVIEW_ATTESTATION_INCOMPLETE');
  }

  const sessions = new Set();
  const perCaseOrdinal = new Map();
  const captures = selectedFR312
    .slice()
    .sort((a, b) =>
      a.recordId.localeCompare(b.recordId),
    )
    .map((record) => {
      validateCompletedReview(record);
      const caseName = record.routing.fr312Case;
      if (!FR312_CASES.includes(caseName)) {
        throw new Error(
          `FR312_CASE_INVALID:${record.recordId}`,
        );
      }
      if (!FR312_DISPOSITIONS.has(record.review.disposition)) {
        throw new Error(
          `FR312_DISPOSITION_INVALID:${record.recordId}`,
        );
      }

      const session =
        record.routing.opaqueSessionLabel?.trim();
      if (!session) {
        throw new Error(
          `FR312_OPAQUE_SESSION_LABEL_REQUIRED:${record.recordId}`,
        );
      }
      sessions.add(session);
      assertBoolean(
        record.routing.independentCaptureAttested,
        `FR312_INDEPENDENCE_ATTESTATION_REQUIRED:${record.recordId}`,
      );
      assertBoolean(
        record.routing.derivedFromAnotherCapture,
        `FR312_DERIVED_CAPTURE_ATTESTATION_REQUIRED:${record.recordId}`,
      );

      const ordinal =
        (perCaseOrdinal.get(caseName) ?? 0) + 1;
      perCaseOrdinal.set(caseName, ordinal);

      return {
        schemaVersion:
          'fr312-deidentified-expanded-capture-finding-v1',
        case: caseName,
        captureOrdinal: ordinal,
        opaqueSessionLabel: session,
        independentCaptureAttested:
          record.routing.independentCaptureAttested,
        derivedFromAnotherCapture:
          record.routing.derivedFromAnotherCapture,
        visibleHairCandidateObserved:
          record.review.visibleHairCandidateObserved,
        foreheadSkinCandidateObserved:
          record.review.foreheadSkinCandidateObserved,
        diagnosticHairlineCandidateObserved:
          record.review.diagnosticHairlineCandidateObserved,
        visibleInterfaceCandidateObserved:
          record.review.visibleInterfaceCandidateObserved,
        grossMislocalizationObserved:
          record.review.grossMislocalizationObserved,
        hiddenCompletionObserved:
          record.review.hiddenCompletionObserved,
        outOfFrameCompletionObserved:
          record.review.outOfFrameCompletionObserved,
        directPromptAuthoritativeHallucinationRisk:
          record.review
            .directPromptAuthoritativeHallucinationRisk,
        disposition: record.review.disposition,
        containsSourceImage: false,
        containsOverlay: false,
        containsRawPolygonCoordinates: false,
        containsSourceImageDigest: false,
        containsFileName: false,
        containsSubjectIdentifier: false,
        containsDemographicAttributes: false,
      };
    });

  if (sessions.size < 3) {
    throw new Error(
      'FR312_REQUIRES_AT_LEAST_THREE_OPAQUE_SESSIONS',
    );
  }

  const compiled = {
    schemaVersion: OUTPUT_SCHEMA,
    candidate: {
      modelId: MODEL_ID,
      modelRevision: MODEL_REVISION,
      runnerContractVersion:
        RUNNER_CONTRACT_VERSION,
    },
    fr308: { caseFindings },
    fr310: {
      humanReview: {
        schemaVersion:
          'fr310-hairline-human-review-attestation-v1',
        completed: true,
        reviewOutputDeidentified: true,
        sourceImageAbsent: true,
        overlayAbsent: true,
        rawPolygonCoordinatesAbsent: true,
        sourceImageDigestAbsent: true,
        fileNameOrPersonalIdentifierAbsent: true,
        assessmentBlockedCases:
          [...fr310.assessmentBlockedCases],
        directPromptAuthoritativeMisinterpretationRiskCases:
          [
            ...fr310
              .directPromptAuthoritativeMisinterpretationRiskCases,
          ],
      },
    },
    fr312: {
      humanReviewCompleted: true,
      sessionLabelsOpaque: true,
      demographicAttributesCollected: false,
      subjectCoverage: fr312.subjectCoverage,
      captures,
    },
  };

  assertSafeCompiledOutput(compiled);
  return compiled;
}

function syntheticWorksheet() {
  const records = [];
  let ordinal = 0;

  const add = (
    fr308Case,
    fr312Case,
    session,
  ) => {
    ordinal += 1;
    records.push({
      recordId:
        `synthetic-${String(ordinal).padStart(2, '0')}`,
      experimentTag: 'synthetic',
      candidateSummary: {
        engineeringPreviewState:
          'visible_interface_candidate',
        signals: {},
        humanReviewRequired: true,
        automaticAdmissionAuthorized: false,
      },
      privateEvidence: {
        candidatePath: '/private/candidate.json',
        overlayPath: '/private/overlay.jpg',
      },
      review: {
        reviewCompleted: true,
        visibleHairCandidateObserved: true,
        foreheadSkinCandidateObserved: true,
        diagnosticHairlineCandidateObserved: true,
        grossMislocalizationObserved: false,
        hiddenCompletionObserved: false,
        outOfFrameCompletionObserved: false,
        visibleInterfaceCandidateObserved: true,
        candidateFailureMode: 'useful_candidate',
        directPromptAuthoritativeHallucinationRisk: false,
        disposition: 'supports_further_evaluation',
      },
      routing: {
        selectedForFR308: fr308Case !== null,
        fr308Case,
        includeInFR312: fr312Case !== null,
        fr312Case,
        opaqueSessionLabel: session,
        independentCaptureAttested:
          fr312Case === null ? null : true,
        derivedFromAnotherCapture:
          fr312Case === null ? null : false,
      },
    });
  };

  FR308_CASES.forEach((caseName) => {\n    add(caseName, null, null);\n  });

  FR312_CASES.forEach((caseName, index) => {
    add(caseName === FR308_CASES[0] ? caseName : null, caseName, `session-${index % 3}`);
    add(null, caseName, `session-${(index + 1) % 3}`);
  });

  return {
    schemaVersion: WORKSHEET_SCHEMA,
    authorityState:
      'private_local_human_review_required',
    candidate: {
      modelId: MODEL_ID,
      modelRevision: MODEL_REVISION,
      runnerContractVersion:
        RUNNER_CONTRACT_VERSION,
    },
    instructions: {
      previewStateMayDetermineDisposition: false,
      signalValuesMayDetermineValidity: false,
      humanReviewerMustInspectLocalEvidence: true,
      hiddenCompletionMustBeExplicitlyReviewed: true,
      grossMislocalizationMustBeExplicitlyReviewed: true,
      outOfFrameCompletionMustBeExplicitlyReviewed: true,
      noVisibleHairlineStateMustNotBeConvertedIntoAnInventedBoundary:
        true,
      sessionLabelsMustBeOperatorAssignedOpaqueValues: true,
      demographicsMayBeCollectedOrInferred: false,
      legacyPromptNamedFieldsRequireExplicitHumanValues:
        true,
    },
    fr310HumanReview: {
      completed: true,
      privacyReviewConfirmed: true,
      assessmentBlockedCases: [],
      directPromptAuthoritativeMisinterpretationRiskCases: [],
    },
    fr312Review: {
      humanReviewCompleted: true,
      sessionLabelsOpaque: true,
      subjectCoverage: 'multiple_subjects',
      demographicAttributesCollected: false,
    },
    records,
  };
}

async function selfCheck() {
  await assertRegisteredCandidate();

  const compiled =
    compileWorksheet(syntheticWorksheet());

  if (
    compiled.candidate.modelId !== MODEL_ID ||
    compiled.fr308.caseFindings.length !== 4 ||
    compiled.fr312.captures.length !== 12
  ) {
    throw new Error(
      'MULTISIGNAL_REVIEW_PACKET_SELF_CHECK_FAILED',
    );
  }

  const serialized = JSON.stringify(compiled);
  if (
    serialized.includes('/private/') ||
    /[0-9a-f]{64}/iu.test(serialized)
  ) {
    throw new Error(
      'MULTISIGNAL_REVIEW_PACKET_PRIVACY_SELF_CHECK_FAILED',
    );
  }

  process.stdout.write(
    `${JSON.stringify({
      schemaVersion:
        'multisignal-hairline-review-packet-self-check-v1',
      status: 'self_check_pass',
      registeredCandidateVerified: true,
      fr308FindingCount: 4,
      fr312CaptureCount: 12,
      humanJudgmentAutomated: false,
      privateEvidenceLeaked: false,
      authorityPromoted: false,
    })}\n`,
  );
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    process.stdout.write(usage());
    return;
  }

  if (args.selfCheck) {
    await selfCheck();
    return;
  }

  if (args.mode === 'prepare') {
    if (!args.summary || !args.worksheet) {
      throw new Error(
        'PREPARE_REQUIRES_SUMMARY_AND_WORKSHEET',
      );
    }
    const summaryPath = localPrivatePath(
      args.summary,
      'MULTISIGNAL_SUMMARY_NOT_LOCAL_PRIVATE',
    );
    const worksheetPath = localOutputPath(
      args.worksheet,
      'WORKSHEET_MUST_STAY_IN_FACE_READING_CACHE',
    );
    const worksheet =
      await prepareWorksheet(summaryPath);
    await writeJson(worksheetPath, worksheet);
    process.stdout.write(
      `${JSON.stringify({
        schemaVersion: WORKSHEET_SCHEMA,
        status: 'worksheet_prepared_human_review_required',
        recordCount: worksheet.records.length,
        worksheetPath,
        humanJudgmentAutomated: false,
        authorityPromoted: false,
      })}\n`,
    );
    return;
  }

  if (args.mode === 'compile') {
    if (!args.worksheet || !args.output) {
      throw new Error(
        'COMPILE_REQUIRES_WORKSHEET_AND_OUTPUT',
      );
    }
    await assertRegisteredCandidate();
    const worksheetPath = localPrivatePath(
      args.worksheet,
      'WORKSHEET_NOT_LOCAL_PRIVATE',
    );
    const outputPath = localOutputPath(
      args.output,
      'COMPILED_OUTPUT_MUST_STAY_IN_FACE_READING_CACHE',
    );
    const worksheet = await readJson(worksheetPath);
    const compiled = compileWorksheet(worksheet);
    await writeJson(outputPath, compiled);
    process.stdout.write(
      `${JSON.stringify({
        schemaVersion: OUTPUT_SCHEMA,
        status: 'compiled_deidentified_input',
        outputPath,
        candidateModelId: MODEL_ID,
        sourceImagesPrinted: false,
        rawBoundariesPrinted: false,
        privatePathsPrinted: false,
        humanJudgmentAutomated: false,
        authorityPromoted: false,
      })}\n`,
    );
    return;
  }

  throw new Error('MODE_REQUIRED');
}

try {
  await main();
} catch (error) {
  const message =
    error instanceof Error ? error.message : String(error);
  process.stderr.write(
    `${JSON.stringify({
      schemaVersion:
        'multisignal-hairline-review-packet-error-v1',
      status: 'error',
      error: message
        .replace(/sha256:[0-9a-f]{64}/giu, '[redacted-digest]')
        .replace(/[0-9a-f]{64}/giu, '[redacted-hex64]'),
      privateInputEchoed: false,
      stackPrinted: false,
      authorityPromoted: false,
    })}\n`,
  );
  process.exitCode = 1;
}
