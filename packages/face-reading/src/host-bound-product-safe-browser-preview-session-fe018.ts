import {
  FE016_CONTRACT_VERSION,
  createHostBoundMediaPipeRuntimeFactoryFE016,
  type FE016HostBoundMediaPipeAssetConfig,
} from './host-bound-mediapipe-runtime-assets-fe016.js';
import {
  FE017_CONTRACT_VERSION,
  assertProductSafeBrowserPreviewSessionFE017,
  openProductSafeBrowserPreviewSessionFE017,
  type FE017ProductSafeBrowserPreviewSession,
} from './product-safe-browser-preview-session-fe017.js';
import type {
  FE011PreviewRejectionCode,
  FE011PreviewRejectionStage,
} from './host-safe-browser-preview-engine-fe011.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FE018_CONTRACT_VERSION =
  'FE018-HOST-BOUND-PRODUCT-SAFE-BROWSER-PREVIEW-SESSION-v1' as const;

export interface FE018HostBoundProductSafeBrowserPreviewConfig {
  readonly schemaVersion: 'fe018-host-bound-product-safe-browser-preview-config-v1';
  readonly assets: FE016HostBoundMediaPipeAssetConfig;
}

export interface FE018CompositionReceipt {
  readonly sourceRuntimeAssetContractVersion: typeof FE016_CONTRACT_VERSION;
  readonly sourceReusableSessionContractVersion: typeof FE017_CONTRACT_VERSION;
  readonly runtimeFactoryCreatedInternally: boolean;
  readonly reusableSessionOpenAttempted: boolean;
  readonly runtimeFactoryExposed: false;
  readonly hostAssetRefsExposed: false;
  readonly productSafeAttemptTransportPreserved: true;
}

export interface FE018AuthorityBoundary {
  readonly composesExistingPreviewContractsOnly: true;
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

export interface FE018HostBoundProductSafeOpenSuccess {
  readonly schemaVersion: 'fe018-host-bound-product-safe-open-success-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FE018_CONTRACT_VERSION;
  readonly status: 'ready';
  readonly session: FE017ProductSafeBrowserPreviewSession;
  readonly compositionReceipt: FE018CompositionReceipt & {
    readonly runtimeFactoryCreatedInternally: true;
    readonly reusableSessionOpenAttempted: true;
  };
  readonly authorityBoundary: FE018AuthorityBoundary;
}

export interface FE018HostBoundProductSafeOpenRejected {
  readonly schemaVersion: 'fe018-host-bound-product-safe-open-rejected-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FE018_CONTRACT_VERSION;
  readonly status: 'rejected';
  readonly rejection: {
    readonly code: FE011PreviewRejectionCode;
    readonly stage: FE011PreviewRejectionStage;
  };
  readonly compositionReceipt: FE018CompositionReceipt;
  readonly authorityBoundary: FE018AuthorityBoundary;
}

export type FE018HostBoundProductSafeOpenResult =
  | FE018HostBoundProductSafeOpenSuccess
  | FE018HostBoundProductSafeOpenRejected;

const AUTHORITY_BOUNDARY: FE018AuthorityBoundary = Object.freeze({
  composesExistingPreviewContractsOnly: true as const,
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

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FE-018 ${message}`);
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

function compositionReceipt(
  runtimeFactoryCreatedInternally: boolean,
  reusableSessionOpenAttempted: boolean,
): FE018CompositionReceipt {
  return Object.freeze({
    sourceRuntimeAssetContractVersion: FE016_CONTRACT_VERSION,
    sourceReusableSessionContractVersion: FE017_CONTRACT_VERSION,
    runtimeFactoryCreatedInternally,
    reusableSessionOpenAttempted,
    runtimeFactoryExposed: false as const,
    hostAssetRefsExposed: false as const,
    productSafeAttemptTransportPreserved: true as const,
  });
}

function validateConfig(
  config: FE018HostBoundProductSafeBrowserPreviewConfig,
): void {
  if (typeof config !== 'object' || config === null) {
    fail('config must be an object.');
  }
  exactKeys(config, ['schemaVersion', 'assets'], 'config');
  if (
    config.schemaVersion !==
    'fe018-host-bound-product-safe-browser-preview-config-v1'
  ) {
    fail('config schemaVersion is unsupported.');
  }
  if (typeof config.assets !== 'object' || config.assets === null) {
    fail('config.assets must be an FE016 asset config object.');
  }
}

function rejected(
  code: FE011PreviewRejectionCode,
  stage: FE011PreviewRejectionStage,
  runtimeFactoryCreatedInternally: boolean,
  reusableSessionOpenAttempted: boolean,
): FE018HostBoundProductSafeOpenRejected {
  const result: FE018HostBoundProductSafeOpenRejected = Object.freeze({
    schemaVersion: 'fe018-host-bound-product-safe-open-rejected-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FE018_CONTRACT_VERSION,
    status: 'rejected' as const,
    rejection: Object.freeze({ code, stage }),
    compositionReceipt: compositionReceipt(
      runtimeFactoryCreatedInternally,
      reusableSessionOpenAttempted,
    ),
    authorityBoundary: AUTHORITY_BOUNDARY,
  });
  assertHostBoundProductSafeBrowserPreviewOpenResultFE018(result);
  return result;
}

export async function openHostBoundProductSafeBrowserPreviewSessionFE018(
  config: FE018HostBoundProductSafeBrowserPreviewConfig,
): Promise<FE018HostBoundProductSafeOpenResult> {
  let runtimeFactory;
  try {
    validateConfig(config);
    runtimeFactory = createHostBoundMediaPipeRuntimeFactoryFE016(config.assets);
  } catch {
    return rejected('INVALID_CONFIGURATION', 'open', false, false);
  }

  try {
    const opened = await openProductSafeBrowserPreviewSessionFE017({
      schemaVersion: 'fe010-browser-blob-preview-engine-config-v1',
      runtimeFactory,
    });

    if (opened.status === 'rejected') {
      return rejected(
        opened.rejection.code,
        opened.rejection.stage,
        true,
        true,
      );
    }

    const result: FE018HostBoundProductSafeOpenSuccess = Object.freeze({
      schemaVersion: 'fe018-host-bound-product-safe-open-success-v1' as const,
      artifactVersion: '0.1.0' as const,
      contractVersion: FE018_CONTRACT_VERSION,
      status: 'ready' as const,
      session: opened.session,
      compositionReceipt: compositionReceipt(
        true,
        true,
      ) as FE018HostBoundProductSafeOpenSuccess['compositionReceipt'],
      authorityBoundary: AUTHORITY_BOUNDARY,
    });
    assertHostBoundProductSafeBrowserPreviewOpenResultFE018(result);
    return result;
  } catch {
    return rejected('ENGINE_INITIALIZATION_FAILED', 'open', true, true);
  }
}

export function assertHostBoundProductSafeBrowserPreviewOpenResultFE018(
  result: FE018HostBoundProductSafeOpenResult,
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
          'compositionReceipt',
          'authorityBoundary',
        ]
      : [
          'schemaVersion',
          'artifactVersion',
          'contractVersion',
          'status',
          'rejection',
          'compositionReceipt',
          'authorityBoundary',
        ],
    'result',
  );
  exactKeys(
    result.compositionReceipt,
    [
      'sourceRuntimeAssetContractVersion',
      'sourceReusableSessionContractVersion',
      'runtimeFactoryCreatedInternally',
      'reusableSessionOpenAttempted',
      'runtimeFactoryExposed',
      'hostAssetRefsExposed',
      'productSafeAttemptTransportPreserved',
    ],
    'compositionReceipt',
  );
  exactKeys(
    result.authorityBoundary,
    [
      'composesExistingPreviewContractsOnly',
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
    result.contractVersion !== FE018_CONTRACT_VERSION ||
    result.compositionReceipt.sourceRuntimeAssetContractVersion !==
      FE016_CONTRACT_VERSION ||
    result.compositionReceipt.sourceReusableSessionContractVersion !==
      FE017_CONTRACT_VERSION ||
    result.compositionReceipt.runtimeFactoryExposed !== false ||
    result.compositionReceipt.hostAssetRefsExposed !== false ||
    result.compositionReceipt.productSafeAttemptTransportPreserved !== true
  ) {
    fail('result identity or composition receipt drift.');
  }

  if (
    result.authorityBoundary.composesExistingPreviewContractsOnly !== true ||
    Object.entries(result.authorityBoundary)
      .filter(([key]) => key !== 'composesExistingPreviewContractsOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('result authority widened.');
  }

  if (result.status === 'ready') {
    if (
      result.schemaVersion !==
        'fe018-host-bound-product-safe-open-success-v1' ||
      result.compositionReceipt.runtimeFactoryCreatedInternally !== true ||
      result.compositionReceipt.reusableSessionOpenAttempted !== true
    ) {
      fail('ready result identity drift.');
    }
    assertProductSafeBrowserPreviewSessionFE017(result.session);
  } else {
    exactKeys(result.rejection, ['code', 'stage'], 'rejection');
    if (
      result.schemaVersion !==
        'fe018-host-bound-product-safe-open-rejected-v1' ||
      (
        result.compositionReceipt.reusableSessionOpenAttempted &&
        !result.compositionReceipt.runtimeFactoryCreatedInternally
      )
    ) {
      fail('rejected result identity drift.');
    }
  }

  const serialized = JSON.stringify(result);
  if (
    /"(?:runtimeFactory|wasmRoot|modelAssetPath|providerRunRef|canonicalAssetDigest|executionReceipt)"\s*:/u
      .test(serialized) ||
    serialized.includes('sha256:')
  ) {
    fail('result leaked runtime, host asset, trace, or digest data.');
  }
}
