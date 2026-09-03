import { startMyeonghwaProductionCalculationProcessV1 } from './production-calculation-process.js';

function reportFailure(phase: string, error: unknown): void {
  const detail = error instanceof Error ? error.message : 'Unknown process failure.';
  console.error(`[saju-production-calculation] ${phase}: ${detail}`);
}

try {
  const runtime = await startMyeonghwaProductionCalculationProcessV1(process.env);
  let shuttingDown = false;

  const shutdown = (): void => {
    if (shuttingDown) return;
    shuttingDown = true;
    void runtime.close().catch((error: unknown) => {
      reportFailure('shutdown failed', error);
      process.exitCode = 1;
    });
  };

  process.once('SIGTERM', shutdown);
  process.once('SIGINT', shutdown);
} catch (error) {
  reportFailure('startup failed', error);
  process.exitCode = 1;
}
