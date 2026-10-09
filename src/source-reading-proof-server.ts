import { startSourceReadingProofProcessV1 } from './source-reading-proof-process.js';

try {
  const runtime = await startSourceReadingProofProcessV1(process.env);
  let shuttingDown = false;
  const shutdown = (): void => {
    if (shuttingDown) return;
    shuttingDown = true;
    void runtime.close().catch(() => {
      console.error('[saju-source-proof] SOURCE_READING_PROOF_SHUTDOWN_FAILED');
      process.exitCode = 1;
    });
  };
  process.once('SIGTERM', shutdown);
  process.once('SIGINT', shutdown);
} catch {
  console.error('[saju-source-proof] SOURCE_READING_PROOF_STARTUP_FAILED');
  process.exitCode = 1;
}
