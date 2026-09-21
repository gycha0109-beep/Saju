import {
  FE022_CONTRACT_VERSION,
  createDigestBoundMediaPipeRuntimeFactoryFE022,
  type FE022DigestBoundMediaPipeModelConfig,
} from './digest-bound-mediapipe-model-runtime-fe022.js';
import {
  FE017_CONTRACT_VERSION,
  openProductSafeBrowserPreviewSessionFE017,
  type FE017ProductSafeBrowserPreviewSession,
  type FE017ProductSafePreviewAttempt,
  type FE017ProductSafeSessionCloseResult,
} from './product-safe-browser-preview-session-fe017.js';
import type {
  FE011PreviewRejectionCode,
  FE011PreviewRejectionStage,
} from './host-safe-browser-preview-engine-fe011.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FE023_CONTRACT_VERSION =
  'FE023-DIGEST-BOUND-DIRECT-BLOB-PRODUCT-PREVIEW-SESSION-v1' as const;

export interface FE023DigestBoundProductPreviewConfig {
  readonly schemaVersion: 'fe023-digest-bound-product-preview-config-v1';
  readonly assets: FE022DigestBoundMediaPipeModelConfig;
}

export interface FE023AuthorityBoundary {
  readonly composesExistingDigestBoundProductSafeContractsOnly: true;
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

export interface FE023DigestBoundProductPreviewSession {
  readonly schemaVersion: 'fe023-digest-bound-product-preview-session-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FE023_CONTRACT_VERSION;
  readonly sessionState: 'digest_bound_product_direct_blob_session_only';
  readonly compositionReceipt: {
    readonly sourceRuntimeAssetContractVersion: typeof FE022_CONTRACT_VERSION;
    readonly sourceReusableSessionContractVersion: typeof FE017_CONTRACT_VERSION;
    readonly digestBoundRuntimeFactoryCreatedInternally: true;
    readonly modelDigestRequiredBeforeRuntimeReady: true;
    readonly runtimeFactoryExposed: false;
    readonly hostAssetRefsExposed: false;
    readonly modelDigestExposed: false;
    readonly lowerLevelAnalysisRequestSchemaHidden: true;
    readonly innerSessionExposed: false;
    readonly productSafeAttemptResultPreserved: true;
    readonly productSafeCloseResultPreserved: true;
  };
  readonly authorityBoundary: FE023AuthorityBoundary;
  readonly analyze: (blob: Blob) => Promise<FE017ProductSafePreviewAttempt>;
  readonly close: () => Promise<FE017ProductSafeSessionCloseResult>;
}

export interface FE023DigestBoundProductPreviewOpenSuccess {
  readonly schemaVersion: 'fe023-digest-bound-product-preview-open-success-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FE023_CONTRACT_VERSION;
  readonly status: 'ready';
  readonly session: FE023DigestBoundProductPreviewSession;
  readonly authorityBoundary: FE023AuthorityBoundary;
}

export interface FE023DigestBoundProductPreviewOpenRejected {
  readonly schemaVersion: 'fe023-digest-bound-product-preview-open-rejected-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FE023_CONTRACT_VERSION;
  readonly status: 'rejected';
  readonly rejection: {
    readonly code: FE011PreviewRejectionCode;
    readonly stage: FE011PreviewRejectionStage;
  };
  readonly authorityBoundary: FE023AuthorityBoundary;
}

export type FE023DigestBoundProductPreviewOpenResult =
  | FE023DigestBoundProductPreviewOpenSuccess
  | FE023DigestBoundProductPreviewOpenRejected;

const AUTHORITY_BOUNDARY: FE023AuthorityBoundary = Object.freeze({
  composesExistingDigestBoundProductSafeContractsOnly: true as const,
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
  sourceRuntimeAssetContractVersion: FE022_CONTRACT_VERSION,
  sourceReusableSessionContractVersion: FE017_CONTRACT_VERSION,
  digestBoundRuntimeFactoryCreatedInternally: true as const,
  modelDigestRequiredBeforeRuntimeReady: true as const,
  runtimeFactoryExposed: false as const,
  hostAssetRefsExposed: false as const,
  modelDigestExposed: false as const,
  lowerLevelAnalysisRequestSchemaHidden: true as const,
  innerSessionExposed: false as const,
  productSafeAttemptResultPreserved: true as const,
  productSafeCloseResultPreserved: true as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FE-023 ${message}`);
}

function exactKeys(value: object, allowed: readonly string[], path: string): void {
  const allowedSet = new Set(allowed);
  const unexpected = Object.keys(value).find((key) => !allowedSet.has(key));
  if (unexpected !== undefined) {
    fail(`${path} contains unauthorized field: ${unexpected}.`);
  }
}

function validateConfig(config: FE023DigestBoundProductPreviewConfig): void {
  if (typeof config !== 'object' || config === null) {
    fail('config must be an object.');
  }
  exactKeys(config, ['schemaVersion', 'assets'], 'config');
  if (config.schemaVersion !== 'fe023-digest-bound-product-preview-config-v1') {
    fail('config schemaVersion is unsupported.');
  }
  if (typeof config.assets !== 'object' || config.assets === null) {
    fail('config.assets must be an FE022 asset config object.');
  }
}

function rejected(
  code: FE011PreviewRejectionCode,
  stage: FE011PreviewRejectionStage,
): FE023DigestBoundProductPreviewOpenRejected {
  const result: FE023DigestBoundProductPreviewOpenRejected = Object.freeze({
    schemaVersion: 'fe023-digest-bound-product-preview-open-rejected-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FE023_CONTRACT_VERSION,
    status: 'rejected' as const,
    rejection: Object.freeze({ code, stage }),
    authorityBoundary: AUTHORITY_BOUNDARY,
  });
  assertDigestBoundProductPreviewOpenResultFE023(result);
  return result;
}

function wrapSession(
  inner: FE017ProductSafeBrowserPreviewSession,
): FE023DigestBoundProductPreviewSession {
  const session: FE023DigestBoundProductPreviewSession = Object.freeze({
    schemaVersion: 'fe023-digest-bound-product-preview-session-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FE023_CONTRACT_VERSION,
    sessionState: 'digest_bound_product_direct_blob_session_only' as const,
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
  assertDigestBoundProductPreviewSessionFE023(session);
  return session;
}

export async function openDigestBoundProductPreviewSessionFE023(
  config: FE023DigestBoundProductPreviewConfig,
): Promise<FE023DigestBoundProductPreviewOpenResult> {
  let runtimeFactory;
  try {
    validateConfig(config);
    runtimeFactory = createDigestBoundMediaPipeRuntimeFactoryFE022(config.assets);
  } catch {
    return rejected('INVALID_CONFIGURATION', 'open');
  }

  try {
    const opened = await openProductSafeBrowserPreviewSessionFE017({
      schemaVersion: 'fe010-browser-blob-preview-engine-config-v1',
      runtimeFactory,
    });
    if (opened.status === 'rejected') {
      return rejected(opened.rejection.code, opened.rejection.stage);
    }

    const result: FE023DigestBoundProductPreviewOpenSuccess = Object.freeze({
      schemaVersion: 'fe023-digest-bound-product-preview-open-success-v1' as const,
      artifactVersion: '0.1.0' as const,
      contractVersion: FE023_CONTRACT_VERSION,
      status: 'ready' as const,
      session: wrapSession(opened.session),
      authorityBoundary: AUTHORITY_BOUNDARY,
    });
    assertDigestBoundProductPreviewOpenResultFE023(result);
    return result;
  } catch {
    return rejected('ENGINE_INITIALIZATION_FAILED', 'open');
  }
}

export function assertDigestBoundProductPreviewSessionFE023(
  session: FE023DigestBoundProductPreviewSession,
): void {
  exactKeys(session, [
    'schemaVersion',
    'artifactVersion',
    'contractVersion',
    'sessionState',
    'compositionReceipt',
    'authorityBoundary',
    'analyze',
    'close',
  ], 'session');
  exactKeys(session.compositionReceipt, [
    'sourceRuntimeAssetContractVersion',
    'sourceReusableSessionContractVersion',
    'digestBoundRuntimeFactoryCreatedInternally',
    'modelDigestRequiredBeforeRuntimeReady',
    'runtimeFactoryExposed',
    'hostAssetRefsExposed',
    'modelDigestExposed',
    'lowerLevelAnalysisRequestSchemaHidden',
    'innerSessionExposed',
    'productSafeAttemptResultPreserved',
    'productSafeCloseResultPreserved',
  ], 'compositionReceipt');
  exactKeys(session.authorityBoundary, [
    'composesExistingDigestBoundProductSafeContractsOnly',
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
  ], 'authorityBoundary');

  if (
    session.schemaVersion !== 'fe023-digest-bound-product-preview-session-v1' ||
    session.artifactVersion !== '0.1.0' ||
    session.contractVersion !== FE023_CONTRACT_VERSION ||
    session.sessionState !== 'digest_bound_product_direct_blob_session_only' ||
    session.compositionReceipt.sourceRuntimeAssetContractVersion !== FE022_CONTRACT_VERSION ||
    session.compositionReceipt.sourceReusableSessionContractVersion !== FE017_CONTRACT_VERSION ||
    session.compositionReceipt.digestBoundRuntimeFactoryCreatedInternally !== true ||
    session.compositionReceipt.modelDigestRequiredBeforeRuntimeReady !== true ||
    session.compositionReceipt.runtimeFactoryExposed !== false ||
    session.compositionReceipt.hostAssetRefsExposed !== false ||
    session.compositionReceipt.modelDigestExposed !== false ||
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
    session.authorityBoundary.composesExistingDigestBoundProductSafeContractsOnly !== true ||
    Object.entries(session.authorityBoundary)
      .filter(([key]) => key !== 'composesExistingDigestBoundProductSafeContractsOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('session authority widened.');
  }
}

export function assertDigestBoundProductPreviewOpenResultFE023(
  result: FE023DigestBoundProductPreviewOpenResult,
): void {
  exactKeys(result, result.status === 'ready'
    ? ['schemaVersion', 'artifactVersion', 'contractVersion', 'status', 'session', 'authorityBoundary']
    : ['schemaVersion', 'artifactVersion', 'contractVersion', 'status', 'rejection', 'authorityBoundary'],
  'result');

  if (
    result.artifactVersion !== '0.1.0' ||
    result.contractVersion !== FE023_CONTRACT_VERSION ||
    result.authorityBoundary.composesExistingDigestBoundProductSafeContractsOnly !== true ||
    Object.entries(result.authorityBoundary)
      .filter(([key]) => key !== 'composesExistingDigestBoundProductSafeContractsOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('result identity or authority drift.');
  }

  if (result.status === 'ready') {
    if (result.schemaVersion !== 'fe023-digest-bound-product-preview-open-success-v1') {
      fail('ready result identity drift.');
    }
    assertDigestBoundProductPreviewSessionFE023(result.session);
  } else {
    exactKeys(result.rejection, ['code', 'stage'], 'rejection');
    if (result.schemaVersion !== 'fe023-digest-bound-product-preview-open-rejected-v1') {
      fail('rejected result identity drift.');
    }
  }

  const serialized = JSON.stringify(result);
  if (
    /"(?:analyzeBlob|runtimeFactory|wasmRoot|modelAssetPath|modelAssetSha256|providerRunRef|canonicalAssetDigest|executionReceipt)"\s*:/u
      .test(serialized) ||
    serialized.includes('sha256:')
  ) {
    fail('result leaked lower-level session, runtime, host asset, trace, or digest data.');
  }
}
