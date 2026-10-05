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

const MODEL_ID = 'microsoft/Florence-2-base';
const MODEL_REVISION =
  '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac';
const FR307_SCHEMA =
  'fr307-visible-hairline-empirical-runner-v1';
const WORKSHEET_SCHEMA =
  'fr307-hairline-human-review-worksheet-v1';
const OUTPUT_SCHEMA =
  'fr308-fr312-local-deidentified-validation-input-v1';

const FR308_CASES = Object.freeze([
  'clear_unobstructed_central_hairline',
  'partial_bangs_occlusion',
  'heavy_bangs_hairline_substantially_hidden',
  'cropped_upper_forehead',
]);

const FR312_CASES = Object.freeze([
  'm_shaped_or_widows_peak_visible_contour',
  'side_recession_or_asymmetric_visible_hairline',
  'headwear_occlusion_if_available',
  'dark_hair_dark_background',
  'light_hair_or_low_local_contrast',
  'ordinary_indoor_illumination_variation',
]);

const ALL_CASES = new Set([
  ...FR308_CASES,
  ...FR312_CASES,
]);

const FR308_FAILURE_MODES = new Set([
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
  'supports_further_evaluation',
  'inconclusive',
  'unavailable',
  'rejects_current_candidate_behavior',
]);

const PRIVATE_KEYS = new Set([
  'privateSource',
  'sourceImageSha256',
  'sourceImageName',
  'caseSummaryPath',
  'recordPaths',
  'overlayPaths',
  'sourceImageDigest',
  'sourceImage',
  'overlay',
  'rawPolygonCoordinates',
  'candidatePolygons',
  'rejectedPolygons',
  'rawParsedOutput',
  'generatedText',
  'fileName',
  'subjectIdentifier',
  'subjectId',
  'captureId',
]);

function usage() {
  return `Usage:
  npm run face:review:fr307 -- --prepare --index <index.json> [--index <index.json> ...] --worksheet <worksheet.json>
  npm run face:review:fr307 -- --compile --worksheet <worksheet.json> --output <fr308-fr312-input.json>
  npm run face:verify:fr307-review-packet

Both worksheet and compiled output must stay under .cache/face-reading/.
The worksheet is private local review material.
The compiled output is deidentified contract input.
`;
}

function parseArgs(argv) {
  const parsed = {
    mode: null,
    indexes: [],
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
    } else if (arg === '--index') {
      const value = argv[index + 1];
      if (!value) throw new Error('MISSING_INDEX_ARGUMENT');
      parsed.indexes.push(value);
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

function cachePath(path, code) {
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
    for (let index = 0; index < value.length; index += 1) {
      assertSafeCompiledOutput(
        value[index],
        `${path}[${index}]`,
      );
    }
    return;
  }

  if (typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      if (PRIVATE_KEYS.has(key)) {
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

  if (
    typeof value === 'number' &&
    !Number.isFinite(value)
  ) {
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

async function firstExistingPath(
  ref,
  indexPath,
) {
  const candidates = [
    resolve(process.cwd(), ref),
    resolve(dirname(indexPath), ref),
  ];

  for (const candidate of candidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Try next local candidate.
    }
  }

  throw new Error('FR307_CASE_SUMMARY_NOT_FOUND');
}

function assertFR307Index(index) {
  assertObject(index, 'FR307_INDEX_MUST_BE_OBJECT');

  if (
    index.schemaVersion !== FR307_SCHEMA ||
    index.model?.id !== MODEL_ID ||
    index.model?.revision !== MODEL_REVISION ||
    !Array.isArray(index.cases) ||
    index.privacy?.sourceImagesCommitted !== false ||
    index.privacy
      ?.githubActionsEmpiricalImageUploadAuthorized !== false ||
    index.authority?.candidateEvidenceOnly !== true ||
    index.authority
      ?.runtimeHairlineObservationAuthorized !== false ||
    index.authority?.fr305AdmissionReceiptAuthorized !== false
  ) {
    throw new Error('FR307_INDEX_AUTHORITY_OR_IDENTITY_DRIFT');
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
    directPromptFailureMode: null,
    directPromptAuthoritativeHallucinationRisk: null,
    disposition: null,
  };
}

function blankRouting(captureCase) {
  return {
    selectedForFR308: false,
    includeInFR312: false,
    opaqueSessionLabel: null,
    independentCaptureAttested: null,
    derivedFromAnotherCapture: null,
    eligibleScopes: {
      fr308: FR308_CASES.includes(captureCase),
      fr312: FR312_CASES.includes(captureCase),
    },
  };
}

async function prepareWorksheet(indexPaths) {
  if (indexPaths.length === 0) {
    throw new Error('AT_LEAST_ONE_FR307_INDEX_REQUIRED');
  }

  const records = [];
  let ordinal = 0;

  for (const suppliedPath of indexPaths) {
    const indexPath = cachePath(
      suppliedPath,
      'FR307_INDEX_MUST_STAY_IN_FACE_READING_CACHE',
    );
    const index = await readJson(indexPath);
    assertFR307Index(index);

    for (const sourceCase of index.cases) {
      assertObject(
        sourceCase,
        'FR307_CASE_INDEX_ENTRY_INVALID',
      );

      if (!ALL_CASES.has(sourceCase.captureCase)) {
        throw new Error('FR307_CAPTURE_CASE_NOT_REVIEWABLE');
      }

      if (
        typeof sourceCase.sourceImageSha256 !== 'string' ||
        !/^[0-9a-f]{64}$/u.test(
          sourceCase.sourceImageSha256,
        ) ||
        typeof sourceCase.sourceImageName !== 'string' ||
        sourceCase.sourceImageName.trim().length === 0 ||
        typeof sourceCase.caseSummary !== 'string'
      ) {
        throw new Error('FR307_PRIVATE_SOURCE_BINDING_INVALID');
      }

      const summaryPath =
        await firstExistingPath(
          sourceCase.caseSummary,
          indexPath,
        );
      const summary = await readJson(summaryPath);

      if (
        summary.schemaVersion !== FR307_SCHEMA ||
        summary.authorityState !==
          'candidate_evidence_only_manual_review_required' ||
        summary.capture?.case !== sourceCase.captureCase ||
        summary.sourceImage?.sha256 !==
          sourceCase.sourceImageSha256 ||
        summary.sourceImage?.originalFileName !==
          sourceCase.sourceImageName ||
        summary.result
          ?.validatedVisibleHairlineObservation !== false ||
        summary.result
          ?.automaticBoundaryAcceptanceAuthorized !== false
      ) {
        throw new Error('FR307_CASE_SUMMARY_BINDING_DRIFT');
      }

      ordinal += 1;
      records.push({
        recordId:
          `fr307-review-${String(ordinal).padStart(4, '0')}`,
        captureCase: sourceCase.captureCase,
        privateSource: {
          sourceImageSha256:
            sourceCase.sourceImageSha256,
          sourceImageName:
            sourceCase.sourceImageName,
          caseSummaryPath: summaryPath,
          recordPaths: Array.isArray(sourceCase.records)
            ? sourceCase.records
                .map((entry) => entry?.record)
                .filter((value) => typeof value === 'string')
            : [],
          overlayPaths: Array.isArray(sourceCase.records)
            ? sourceCase.records
                .map((entry) => entry?.overlay)
                .filter((value) => typeof value === 'string')
            : [],
        },
        candidateSummary: {
          state: summary.result?.state ?? null,
          visibleHairCandidateCount:
            summary.result
              ?.visibleHairCandidateCount ?? null,
          foreheadSkinCandidateCount:
            summary.result
              ?.foreheadSkinCandidateCount ?? null,
          diagnosticHairlineCandidateCount:
            summary.result
              ?.diagnosticHairlineCandidateCount ?? null,
          automaticBoundaryAcceptanceAuthorized: false,
        },
        review: blankReview(),
        routing: blankRouting(
          sourceCase.captureCase,
        ),
      });
    }
  }

  return {
    schemaVersion: WORKSHEET_SCHEMA,
    authorityState:
      'private_local_human_review_required',
    model: {
      id: MODEL_ID,
      revision: MODEL_REVISION,
    },
    instructions: {
      modelOutputMayDetermineDisposition: false,
      candidateCountsMayDetermineValidity: false,
      humanReviewerMustInspectLocalEvidence: true,
      hiddenCompletionMustBeExplicitlyReviewed: true,
      grossMislocalizationMustBeExplicitlyReviewed: true,
      sessionLabelsMustBeOperatorAssignedOpaqueValues: true,
      demographicsMayBeCollectedOrInferred: false,
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
  assertObject(
    worksheet,
    'WORKSHEET_MUST_BE_OBJECT',
  );

  if (
    worksheet.schemaVersion !== WORKSHEET_SCHEMA ||
    worksheet.authorityState !==
      'private_local_human_review_required' ||
    worksheet.model?.id !== MODEL_ID ||
    worksheet.model?.revision !== MODEL_REVISION ||
    !Array.isArray(worksheet.records)
  ) {
    throw new Error('WORKSHEET_IDENTITY_DRIFT');
  }

  if (
    worksheet.instructions
      ?.modelOutputMayDetermineDisposition !== false ||
    worksheet.instructions
      ?.candidateCountsMayDetermineValidity !== false ||
    worksheet.instructions
      ?.humanReviewerMustInspectLocalEvidence !== true ||
    worksheet.instructions
      ?.sessionLabelsMustBeOperatorAssignedOpaqueValues !== true ||
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
}

function fr308Finding(record) {
  validateCompletedReview(record);

  if (
    !FR308_FAILURE_MODES.has(
      record.review.directPromptFailureMode,
    ) ||
    !FR308_DISPOSITIONS.has(
      record.review.disposition,
    )
  ) {
    throw new Error(
      `FR308_REVIEW_VOCABULARY_INVALID:${record.recordId}`,
    );
  }

  return {
    schemaVersion:
      'fr308-deidentified-hairline-case-finding-v1',
    case: record.captureCase,
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
      record.review.directPromptFailureMode,
    disposition:
      record.review.disposition,
    containsSourceImage: false,
    containsOverlay: false,
    containsRawPolygonCoordinates: false,
    containsSourceImageDigest: false,
    containsFileNameOrPersonalIdentifier: false,
  };
}

function fr312Capture(record, captureOrdinal) {
  validateCompletedReview(record);

  if (
    !FR312_DISPOSITIONS.has(
      record.review.disposition,
    )
  ) {
    throw new Error(
      `FR312_REVIEW_DISPOSITION_INVALID:${record.recordId}`,
    );
  }

  const label = record.routing.opaqueSessionLabel;
  if (
    typeof label !== 'string' ||
    label.trim().length === 0 ||
    label.length > 128
  ) {
    throw new Error(
      `FR312_OPAQUE_SESSION_LABEL_REQUIRED:${record.recordId}`,
    );
  }

  assertBoolean(
    record.routing.independentCaptureAttested,
    `FR312_INDEPENDENCE_ATTESTATION_REQUIRED:${record.recordId}`,
  );
  assertBoolean(
    record.routing.derivedFromAnotherCapture,
    `FR312_DERIVED_CAPTURE_ATTESTATION_REQUIRED:${record.recordId}`,
  );

  return {
    schemaVersion:
      'fr312-deidentified-expanded-capture-finding-v1',
    case: record.captureCase,
    captureOrdinal,
    opaqueSessionLabel: label.trim(),
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

  const selectedFR308Cases =
    selectedFR308.map(
      (record) => record.captureCase,
    );

  if (
    new Set(selectedFR308Cases).size !== 4 ||
    FR308_CASES.some(
      (captureCase) =>
        !selectedFR308Cases.includes(captureCase),
    )
  ) {
    throw new Error(
      'FR308_REQUIRED_CASE_SELECTION_INVALID',
    );
  }

  const fr310 = worksheet.fr310HumanReview;
  assertObject(
    fr310,
    'FR310_HUMAN_REVIEW_WORKSHEET_MISSING',
  );

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

  for (const captureCase of [
    ...fr310.assessmentBlockedCases,
    ...fr310
      .directPromptAuthoritativeMisinterpretationRiskCases,
  ]) {
    if (!FR308_CASES.includes(captureCase)) {
      throw new Error(
        'FR310_HUMAN_REVIEW_CASE_INVALID',
      );
    }
  }

  const selectedFR312 = worksheet.records.filter(
    (record) =>
      record.routing?.includeInFR312 === true,
  );

  if (selectedFR312.length < 12) {
    throw new Error(
      'FR312_REQUIRES_AT_LEAST_TWELVE_INCLUDED_CAPTURES',
    );
  }

  if (
    selectedFR312.some(
      (record) =>
        !FR312_CASES.includes(record.captureCase),
    )
  ) {
    throw new Error(
      'FR312_INCLUDED_CAPTURE_CASE_INVALID',
    );
  }

  for (const captureCase of FR312_CASES) {
    if (
      selectedFR312.filter(
        (record) =>
          record.captureCase === captureCase,
      ).length < 2
    ) {
      throw new Error(
        `FR312_CASE_REQUIRES_TWO_CAPTURES:${captureCase}`,
      );
    }
  }

  const fr312 = worksheet.fr312Review;
  assertObject(
    fr312,
    'FR312_REVIEW_WORKSHEET_MISSING',
  );

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
    throw new Error(
      'FR312_REVIEW_ATTESTATION_INCOMPLETE',
    );
  }

  const distinctSessions = new Set(
    selectedFR312.map(
      (record) =>
        record.routing?.opaqueSessionLabel?.trim(),
    ),
  );
  distinctSessions.delete(undefined);
  distinctSessions.delete('');

  if (distinctSessions.size < 3) {
    throw new Error(
      'FR312_REQUIRES_AT_LEAST_THREE_OPAQUE_SESSIONS',
    );
  }

  const perCaseOrdinal = new Map();
  const captures = selectedFR312
    .slice()
    .sort((a, b) =>
      a.recordId.localeCompare(b.recordId),
    )
    .map((record) => {
      const next =
        (perCaseOrdinal.get(record.captureCase) ?? 0) + 1;
      perCaseOrdinal.set(record.captureCase, next);
      return fr312Capture(record, next);
    });

  const compiled = {
    schemaVersion: OUTPUT_SCHEMA,
    fr308: {
      caseFindings:
        selectedFR308
          .slice()
          .sort(
            (a, b) =>
              FR308_CASES.indexOf(a.captureCase) -
              FR308_CASES.indexOf(b.captureCase),
          )
          .map(fr308Finding),
    },
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

  for (const captureCase of FR308_CASES) {
    ordinal += 1;
    records.push({
      recordId:
        `synthetic-${String(ordinal).padStart(2, '0')}`,
      captureCase,
      privateSource: {
        sourceImageSha256: 'a'.repeat(64),
        sourceImageName: 'private.jpg',
        caseSummaryPath: '/private/case-summary.json',
        recordPaths: [],
        overlayPaths: [],
      },
      candidateSummary: {
        state:
          'paired_region_candidate_evidence_manual_review_required',
        visibleHairCandidateCount: 1,
        foreheadSkinCandidateCount: 1,
        diagnosticHairlineCandidateCount: 1,
        automaticBoundaryAcceptanceAuthorized: false,
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
        directPromptFailureMode: 'useful_candidate',
        directPromptAuthoritativeHallucinationRisk: false,
        disposition: 'supports_further_evaluation',
      },
      routing: {
        selectedForFR308: true,
        includeInFR312: false,
        opaqueSessionLabel: null,
        independentCaptureAttested: null,
        derivedFromAnotherCapture: null,
        eligibleScopes: {
          fr308: true,
          fr312: false,
        },
      },
    });
  }

  for (const captureCase of FR312_CASES) {
    for (let index = 0; index < 2; index += 1) {
      ordinal += 1;
      records.push({
        recordId:
          `synthetic-${String(ordinal).padStart(2, '0')}`,
        captureCase,
        privateSource: {
          sourceImageSha256: 'b'.repeat(64),
          sourceImageName: 'private.jpg',
          caseSummaryPath: '/private/case-summary.json',
          recordPaths: [],
          overlayPaths: [],
        },
        candidateSummary: {
          state:
            'paired_region_candidate_evidence_manual_review_required',
          visibleHairCandidateCount: 1,
          foreheadSkinCandidateCount: 1,
          diagnosticHairlineCandidateCount: 1,
          automaticBoundaryAcceptanceAuthorized: false,
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
          directPromptFailureMode: 'useful_candidate',
          directPromptAuthoritativeHallucinationRisk: false,
          disposition: 'supports_further_evaluation',
        },
        routing: {
          selectedForFR308: false,
          includeInFR312: true,
          opaqueSessionLabel:
            `session-${(index + FR312_CASES.indexOf(captureCase)) % 3 + 1}`,
          independentCaptureAttested: true,
          derivedFromAnotherCapture: false,
          eligibleScopes: {
            fr308: false,
            fr312: true,
          },
        },
      });
    }
  }

  return {
    schemaVersion: WORKSHEET_SCHEMA,
    authorityState:
      'private_local_human_review_required',
    model: {
      id: MODEL_ID,
      revision: MODEL_REVISION,
    },
    instructions: {
      modelOutputMayDetermineDisposition: false,
      candidateCountsMayDetermineValidity: false,
      humanReviewerMustInspectLocalEvidence: true,
      hiddenCompletionMustBeExplicitlyReviewed: true,
      grossMislocalizationMustBeExplicitlyReviewed: true,
      sessionLabelsMustBeOperatorAssignedOpaqueValues: true,
      demographicsMayBeCollectedOrInferred: false,
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

function selfCheck() {
  const compiled =
    compileWorksheet(syntheticWorksheet());

  if (
    compiled.fr308.caseFindings.length !== 4 ||
    compiled.fr312.captures.length !== 12
  ) {
    throw new Error(
      'REVIEW_PACKET_COMPILE_SELF_CHECK_FAILED',
    );
  }

  assertSafeCompiledOutput(compiled);

  const serialized = JSON.stringify(compiled);
  if (
    serialized.includes('private.jpg') ||
    serialized.includes('case-summary.json') ||
    /[ab]{64}/u.test(serialized)
  ) {
    throw new Error(
      'PRIVATE_SOURCE_LEAK_SELF_CHECK_FAILED',
    );
  }

  process.stdout.write(
    `${JSON.stringify({
      schemaVersion:
        'fr307-review-packet-self-check-v1',
      status: 'self_check_pass',
      fr308FindingCount:
        compiled.fr308.caseFindings.length,
      fr312CaptureCount:
        compiled.fr312.captures.length,
      privateSourceLeakDetected: false,
      automatedHumanJudgment: false,
      demographicsCollectedOrInferred: false,
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
    selfCheck();
    return;
  }

  if (args.mode === 'prepare') {
    if (
      args.indexes.length === 0 ||
      args.worksheet === null
    ) {
      throw new Error(
        'PREPARE_REQUIRES_INDEX_AND_WORKSHEET',
      );
    }

    const worksheetPath = cachePath(
      args.worksheet,
      'WORKSHEET_MUST_STAY_IN_FACE_READING_CACHE',
    );
    const worksheet =
      await prepareWorksheet(args.indexes);
    await writeJson(worksheetPath, worksheet);

    process.stdout.write(
      `${JSON.stringify({
        schemaVersion: WORKSHEET_SCHEMA,
        status: 'review_worksheet_prepared',
        worksheetPath,
        recordCount: worksheet.records.length,
        humanReviewCompleted: false,
        automatedDisposition: false,
      })}\n`,
    );
    return;
  }

  if (args.mode === 'compile') {
    if (
      args.worksheet === null ||
      args.output === null
    ) {
      throw new Error(
        'COMPILE_REQUIRES_WORKSHEET_AND_OUTPUT',
      );
    }

    const worksheetPath = cachePath(
      args.worksheet,
      'WORKSHEET_MUST_STAY_IN_FACE_READING_CACHE',
    );
    const outputPath = cachePath(
      args.output,
      'COMPILED_OUTPUT_MUST_STAY_IN_FACE_READING_CACHE',
    );
    const worksheet =
      await readJson(worksheetPath);
    const compiled =
      compileWorksheet(worksheet);

    await writeJson(outputPath, compiled);

    process.stdout.write(
      `${JSON.stringify({
        schemaVersion: OUTPUT_SCHEMA,
        status: 'deidentified_validation_input_compiled',
        outputPath,
        fr308FindingCount:
          compiled.fr308.caseFindings.length,
        fr312CaptureCount:
          compiled.fr312.captures.length,
        privateSourceMaterialIncluded: false,
        automatedHumanJudgment: false,
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
        'fr307-review-packet-error-v1',
      status: 'error',
      error: message,
      stackPrinted: false,
      privateInputEchoed: false,
    })}\n`,
  );
  process.exitCode = 1;
}
