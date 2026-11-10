import type { Server } from 'node:http';
import type { MyeonghwaProductHostDependencies } from './host/product-host.js';
import { createMyeonghwaSourceReadingProofIssuerHttpServerV1 } from './host/source-reading-proof-issuer-http.js';
import { createApprovedSourceProofPreviewDependenciesV1 } from './preview/preview-product-host.js';
import { runInterpretation } from './interpretation/interpretation-engine.js';
import { createGeneralAnnualReadingCandidateRegistry } from './research/general-annual-reading-candidate.js';
import { createGeneralMonthlyReadingCandidateRegistry } from './research/general-monthly-reading-candidate.js';
import { GENERAL_ANNUAL_CLAIM_NARRATIVE_PROFILES } from './research/general-annual-narrative-profiles.js';
import { GENERAL_MONTHLY_CLAIM_NARRATIVE_PROFILES } from './research/general-monthly-narrative-profiles.js';
import { readSourceProofProcessConfigV1, type SourceProofEnvironmentV1 } from './source-reading-proof-runtime-config.js';

export interface SourceReadingProofProcessV1 {
  readonly server: Server;
  readonly host: string;
  readonly port: number;
}
export interface StartedSourceReadingProofProcessV1 extends SourceReadingProofProcessV1 {
  close(): Promise<void>;
}
export class SourceReadingProofStartupErrorV1 extends Error {
  readonly code = 'SOURCE_READING_PROOF_STARTUP_FAILED' as const;
  constructor() {
    super('SOURCE_READING_PROOF_STARTUP_FAILED');
    this.name = 'SourceReadingProofStartupErrorV1';
  }
}

/** The isolated issuer can inspect temporal research through the same Product Reading pipeline. */
export function createSourceReadingProofStagingDependencies(): MyeonghwaProductHostDependencies {
  const preview = createApprovedSourceProofPreviewDependenciesV1();
  const claimNarrativeProfiles = [
    ...(preview.readingOptions.claimNarrativeProfiles ?? []),
    ...GENERAL_ANNUAL_CLAIM_NARRATIVE_PROFILES,
    ...GENERAL_MONTHLY_CLAIM_NARRATIVE_PROFILES,
  ];
  return {
    ...preview,
    interpret(snapshot, context, temporal, resolved) {
      if (resolved?.intent.domain !== 'general' || temporal === undefined) {
        return preview.interpret(snapshot, context, temporal, resolved);
      }
      const createRegistry = temporal.temporalContext.scope === 'annual'
        ? createGeneralAnnualReadingCandidateRegistry
        : createGeneralMonthlyReadingCandidateRegistry;
      const registry = createRegistry(context.requestedAt);
      const interpretation = runInterpretation(snapshot, registry, {
        requestId: context.requestId,
        now: new Date(context.requestedAt),
        temporalFacts: temporal.temporalFacts,
      });
      return { registry, interpretation };
    },
    readingOptionsForRequest(context) {
      return {
        ...(preview.readingOptionsForRequest?.(context) ?? preview.readingOptions),
        claimNarrativeProfiles,
      };
    },
  };
}

export function createSourceReadingProofProcessV1(
  env: SourceProofEnvironmentV1 = process.env,
  dependencyFactory: () => MyeonghwaProductHostDependencies =
    createSourceReadingProofStagingDependencies,
): SourceReadingProofProcessV1 {
  const config = readSourceProofProcessConfigV1(env);
  const dependencies = dependencyFactory();
  return {
    server: createMyeonghwaSourceReadingProofIssuerHttpServerV1(
      dependencies, config.issuerOptions,
    ),
    host: config.host,
    port: config.port,
  };
}

function listen(server: Server, port: number, host: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const onError = (): void => {
      server.off('listening', onListening);
      reject(new SourceReadingProofStartupErrorV1());
    };
    const onListening = (): void => {
      server.off('error', onError);
      resolve();
    };
    server.once('error', onError);
    server.once('listening', onListening);
    try {
      server.listen(port, host);
    } catch {
      server.off('error', onError);
      server.off('listening', onListening);
      reject(new SourceReadingProofStartupErrorV1());
    }
  });
}
function closeServer(server: Server): Promise<void> {
  if (!server.listening) return Promise.resolve();
  return new Promise((resolve, reject) => {
    server.close(error => {
      if (error !== undefined) reject(new SourceReadingProofStartupErrorV1());
      else resolve();
    });
    server.closeAllConnections();
  });
}
export async function startSourceReadingProofProcessV1(
  env: SourceProofEnvironmentV1 = process.env,
  dependencyFactory: () => MyeonghwaProductHostDependencies =
    createSourceReadingProofStagingDependencies,
): Promise<StartedSourceReadingProofProcessV1> {
  const runtime = createSourceReadingProofProcessV1(env, dependencyFactory);
  try {
    await listen(runtime.server, runtime.port, runtime.host);
  } catch {
    await closeServer(runtime.server).catch(() => undefined);
    throw new SourceReadingProofStartupErrorV1();
  }
  let closing: Promise<void> | undefined;
  return {
    ...runtime,
    close: () => {
      closing ??= closeServer(runtime.server);
      return closing;
    },
  };
}
