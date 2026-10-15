import { runInterpretation } from '../interpretation/interpretation-engine.js';
import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import { attachGeneralNatalCalculatedRoleObservation } from '../preview/general-natal-consumer-role-observation.js';
import { attachGeneralNatalCalculatedContext } from '../preview/general-natal-consumer-fact-context.js';
import { createGeneralNatalIntegratedReadingRegistry } from '../interpretation/general-natal-integrated-reading-registry.js';
import { SUPPORTED_NARRATIVE_OUTPUT_SCHEMA } from '../llm/prompt-compiler.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../production/production-calculation-runtime.js';
import {
  createMyeonghwaProductHost,
  type MyeonghwaProductHost,
  type MyeonghwaProductHostDependencies,
} from './product-host.js';

export const GENERAL_NATAL_INTEGRATED_PREVIEW_HOST_VERSION =
  'myeonghwa-general-natal-integrated-preview-host-v1' as const;

export interface GeneralNatalIntegratedPreviewHostOptions {
  requestIdFactory?: MyeonghwaProductHostDependencies['requestIdFactory'];
  requestNowFactory?: MyeonghwaProductHostDependencies['requestNowFactory'];
}

/**
 * Opt-in, bounded Preview execution of the existing General Natal producers.
 *
 * Delegates calculation, interpretation, profile selection, evidence binding,
 * rendering, and transport to their canonical engines. Neither this host
 * nor the integrated Research pack grants Production interpretation authority.
 * Non-General/Natal requests have no domain/temporal T8/T9 claims and fail
 * through the existing coverage guards instead of falling back to General.
 */
export function createGeneralNatalIntegratedPreviewProductHost(
  options: GeneralNatalIntegratedPreviewHostOptions = {},
): MyeonghwaProductHost {
  return {
    async requestReading(body: unknown) {
      // A request-local snapshot binding prevents cross-user context leakage
      // when concurrent consumer reads share the same exported host instance.
      let observedSnapshot: CanonicalSajuSnapshot | undefined;
      const host = createMyeonghwaProductHost({
        calculate(input, context) {
          const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot(input, {
            now: new Date(context.requestedAt),
          }).snapshot;
          observedSnapshot = snapshot;
          return snapshot;
        },
    interpret(snapshot, context) {
      const registry = createGeneralNatalIntegratedReadingRegistry(context.requestedAt);
      const interpretation = runInterpretation(snapshot, registry, {
        requestId: context.requestId,
        now: new Date(context.requestedAt),
      });
      return { registry, interpretation };
    },
    readingOptions: {
      outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
      readingVersion: GENERAL_NATAL_INTEGRATED_PREVIEW_HOST_VERSION,
    },
    readingOptionsForRequest(context) {
      return {
        outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
        readingVersion: GENERAL_NATAL_INTEGRATED_PREVIEW_HOST_VERSION,
        artifactGeneratedAt: new Date(context.requestedAt),
      };
    },
    ...(options.requestIdFactory === undefined
      ? {}
      : { requestIdFactory: options.requestIdFactory }),
    ...(options.requestNowFactory === undefined
      ? {}
      : { requestNowFactory: options.requestNowFactory }),
      });
      const response = await host.requestReading(body);
      const grounded = attachGeneralNatalCalculatedContext(response);
      return observedSnapshot === undefined
        ? grounded
        : attachGeneralNatalCalculatedRoleObservation(grounded, observedSnapshot);
    },
  };
}
