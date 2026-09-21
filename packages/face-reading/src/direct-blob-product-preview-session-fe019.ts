import {
  FE018_CONTRACT_VERSION,
  openHostBoundProductSafeBrowserPreviewSessionFE018,
  type FE018HostBoundProductSafeBrowserPreviewConfig,
} from './host-bound-product-safe-browser-preview-session-fe018.js';
import type {
  FE017ProductSafeBrowserPreviewSession,
  FE017ProductSafePreviewAttempt,
  FE017ProductSafeSessionCloseResult,
} from './product-safe-browser-preview-session-fe017.js';
import type {
  FE011PreviewRejectionCode,
  FE011PreviewRejectionStage,
} from './host-safe-browser-preview-engine-fe011.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FE019_CONTRACT_VERSION =
  'FE019-DIRECT-BLOB-PRODUCT-SAFE-BROWSER-PREVIEW-SESSION-v1' as const;

export interface FE019DirectBlobProductPreviewSession {
  readonly schemaVersion: 'fe019-direct-blob-product-preview-session-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FE019_CONTRACT_VERSION;
  readonly sessionState: 'product_direct_blob_session_only';
  readonly compositionReceipt: {
    readonly sourceHostBoundContractVersion: typeof FE018_CONTRACT_VERSION;
    readonly lowerLevelAnalysisRequestSchemaHidden: true;
    readonly innerSessionExposed: false;
    readonly productSafeAttemptResultPreserved: true;
    readonly productSafeCloseResultPreserved: true;
  };
  readonly authorityBoundary: FE019AuthorityBoundary;
  readonly analyze: (blob: Blob) => Promise<FE017ProductSafePreviewAttempt>;
  readonly close: () => Promise<FE017ProductSafeSessionCloseResult>;
}

export interface FE019AuthorityBoundary {
  readonly composesExistingProductSafeSessionOnly: true;
  readonly performsResearchDecision: false;
  readonly performsValidationDecision: false;
  readonly classificationIssued: false;
  readonly scoreIssued: false;
  readonly rankIssued: false;
  readonly traditionalInterpretationIssued: false;
  readonly physiognomyClaimIssued: false;
  readonly fortuneClaimIssued: false;
  readonly productionActivated: false;
  readonly commerceActivated: false;
}

export interface FE019DirectBlobProductPreviewOpenSuccess {
  readonly schemaVersion: 'fe019-direct-blob-product-preview-open-success-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FE019_CONTRACT_VERSION;
  readonly status: 'ready';
  readonly session: FE019DirectBlobProductPreviewSession;
  readonly authorityBoundary: FE019AuthorityBoundary;
}

export interface FE019DirectBlobProductPreviewOpenRejected {
  readonly schemaVersion: 'fe019-direct-blob-product-preview-open-rejected-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FE019_CONTRACT_VERSION;
  readonly status: 'rejected';
  readonly rejection: {
    readonly code: FE011PreviewRejectionCode;
    readonly stage: FE011PreviewRejectionStage;
  };
  readonly authorityBoundary: FE019AuthorityBoundary;
}

export type FE019DirectBlobProductPreviewOpenResult =
  | FE019DirectBlobProductPreviewOpenSuccess
  | FE019DirectBlobProductPreviewOpenRejected;

const AUTHORITY_BOUNDARY: FE019AuthorityBoundary = Object.freeze({
  composesExistingProductSafeSessionOnly: true as const,
  performsResearchDecision: false as const,
  performsValidationDecision: false as const,
  classificationIssued: false as const,
  scoreIssued: false as const,
  rankIssued: false as const,
  traditionalInterpretationIssued: false as const,
  physiognomyClaimIssued: false as const,
  fortuneClaimIssued: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

const SESSION_RECEIPT = Object.freeze({
  sourceHostBoundContractVersion: FE018_CONTRACT_VERSION,
  lowerLevelAnalysisRequestSchemaHidden: true as const,
  innerSessionExposed: false as const,
  productSafeAttemptResultPreserved: true as const,
  productSafeCloseResultPreserved: true as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FE-019 ${message}`);
}

function exactKeys(
  value: object,
  allowed: readonly string[],
  path: string,
): void {
  const allowedSet = new Set(allowed);
  const unexpected = Object.keys(value).find((key) => !allowedSet.has(key));
  if (unexpected !== undefined) {
    fail(`${path} contains unauthorized field: ${unexpected}.`);
  }
}

function rejected(
  code: FE011PreviewRejectionCode,
  stage: FE011PreviewRejectionStage,
): FE019DirectBlobProductPreviewOpenRejected {
  const result: FE019DirectBlobProductPreviewOpenRejected = Object.freeze({
    schemaVersion: 'fe019-direct-blob-product-preview-open-rejected-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FE019_CONTRACT_VERSION,
    status: 'rejected' as const,
    rejection: Object.freeze({ code, stage }),
    authorityBoundary: AUTHORITY_BOUNDARY,
  });
  assertDirectBlobProductPreviewOpenResultFE019(result);
  return result;
}

function wrapSession(
  inner: FE017ProductSafeBrowserPreviewSession,
): FE019DirectBlobProductPreviewSession {
  const session: FE019DirectBlobProductPreviewSession = Object.freeze({
    schemaVersion: 'fe019-direct-blob-product-preview-session-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FE019_CONTRACT_VERSION,
    sessionState: 'product_direct_blob_session_only' as const,
    compositionReceipt: SESSION_RECEIPT,
    authorityBoundary: AUTHORITY_BOUNDARY,
    analyze(blob: Blob): Promise<FE017ProductSafePreviewAttempt> {
      return inner.analyzeBlob({
        schemaVersion: 'fe010-browser-blob-analysis-request-v1',
        blob,
      });
    },
    close(): Promise<FE017ProductSafeSessionCloseResult> {
      return inner.close();
    },
  });

  assertDirectBlobProductPreviewSessionFE019(session);
  return session;
}

export async function openDirectBlobProductPreviewSessionFE019(
  config: FE018HostBoundProductSafeBrowserPreviewConfig,
): Promise<FE019DirectBlobProductPreviewOpenResult> {
  try {
    const opened =
      await openHostBoundProductSafeBrowserPreviewSessionFE018(config);

    if (opened.status === 'rejected') {
      return rejected(opened.rejection.code, opened.rejection.stage);
    }

    const result: FE019DirectBlobProductPreviewOpenSuccess = Object.freeze({
      schemaVersion: 'fe019-direct-blob-product-preview-open-success-v1' as const,
      artifactVersion: '0.1.0' as const,
      contractVersion: FE019_CONTRACT_VERSION,
      status: 'ready' as const,
      session: wrapSession(opened.session),
      authorityBoundary: AUTHORITY_BOUNDARY,
    });
    assertDirectBlobProductPreviewOpenResultFE019(result);
    return result;
  } catch {
    return rejected('ENGINE_INITIALIZATION_FAILED', 'open');
  }
}

export function assertDirectBlobProductPreviewSessionFE019(
  session: FE019DirectBlobProductPreviewSession,
): void {
  exactKeys(
    session,
    [
      'schemaVersion',
      'artifactVersion',
      'contractVersion',
      'sessionState',
      'compositionReceipt',
      'authorityBoundary',
      'analyze',
      'close',
    ],
    'session',
  );
  exactKeys(
    session.compositionReceipt,
    [
      'sourceHostBoundContractVersion',
      'lowerLevelAnalysisRequestSchemaHidden',
      'innerSessionExposed',
      'productSafeAttemptResultPreserved',
      'productSafeCloseResultPreserved',
    ],
    'compositionReceipt',
  );
  exactKeys(
    session.authorityBoundary,
    [
      'composesExistingProductSafeSessionOnly',
      'performsResearchDecision',
      'performsValidationDecision',
      'classificationIssued',
      'scoreIssued',
      'rankIssued',
      'traditionalInterpretationIssued',
      'physiognomyClaimIssued',
      'fortuneClaimIssued',
      'productionActivated',
      'commerceActivated',
    ],
    'authorityBoundary',
  );

  if (
    session.schemaVersion !== 'fe019-direct-blob-product-preview-session-v1' ||
    session.artifactVersion !== '0.1.0' ||
    session.contractVersion !== FE019_CONTRACT_VERSION ||
    session.sessionState !== 'product_direct_blob_session_only' ||
    session.compositionReceipt.sourceHostBoundContractVersion !==
      FE018_CONTRACT_VERSION ||
    session.compositionReceipt.lowerLevelAnalysisRequestSchemaHidden !== true ||
    session.compositionReceipt.innerSessionExposed !== false ||
    session.compositionReceipt.productSafeAttemptResultPreserved !== true ||
    session.compositionReceipt.productSafeCloseResultPreserved !== true ||
    typeof session.analyze !== 'function' ||
    typeof session.close !== 'function'
  ) {
    fail('session identity or composition receipt drift.');
  }

  if (
    session.authorityBoundary.composesExistingProductSafeSessionOnly !== true ||
    Object.entries(session.authorityBoundary)
      .filter(([key]) => key !== 'composesExistingProductSafeSessionOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('session authority widened.');
  }
}

export function assertDirectBlobProductPreviewOpenResultFE019(
  result: FE019DirectBlobProductPreviewOpenResult,
): void {
  exactKeys(
    result,
    result.status === 'ready'
      ? [
          'schemaVersion',
          'artifactVersion',
          'contractVersion',
          'status',
          'session',
          'authorityBoundary',
        ]
      : [
          'schemaVersion',
          'artifactVersion',
          'contractVersion',
          'status',
          'rejection',
          'authorityBoundary',
        ],
    'result',
  );
  exactKeys(
    result.authorityBoundary,
    [
      'composesExistingProductSafeSessionOnly',
      'performsResearchDecision',
      'performsValidationDecision',
      'classificationIssued',
      'scoreIssued',
      'rankIssued',
      'traditionalInterpretationIssued',
      'physiognomyClaimIssued',
      'fortuneClaimIssued',
      'productionActivated',
      'commerceActivated',
    ],
    'authorityBoundary',
  );

  if (
    result.artifactVersion !== '0.1.0' ||
    result.contractVersion !== FE019_CONTRACT_VERSION ||
    result.authorityBoundary.composesExistingProductSafeSessionOnly !== true ||
    Object.entries(result.authorityBoundary)
      .filter(([key]) => key !== 'composesExistingProductSafeSessionOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('result identity or authority drift.');
  }

  if (result.status === 'ready') {
    if (
      result.schemaVersion !==
      'fe019-direct-blob-product-preview-open-success-v1'
    ) {
      fail('ready result identity drift.');
    }
    assertDirectBlobProductPreviewSessionFE019(result.session);
  } else {
    exactKeys(result.rejection, ['code', 'stage'], 'rejection');
    if (
      result.schemaVersion !==
      'fe019-direct-blob-product-preview-open-rejected-v1'
    ) {
      fail('rejected result identity drift.');
    }
  }

  const serialized = JSON.stringify(result);
  if (
    /"(?:analyzeBlob|runtimeFactory|wasmRoot|modelAssetPath|providerRunRef|canonicalAssetDigest|executionReceipt)"\s*:/u
      .test(serialized) ||
    serialized.includes('sha256:')
  ) {
    fail('result leaked lower-level session, runtime, host asset, trace, or digest data.');
  }
}