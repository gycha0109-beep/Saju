import { readFile } from 'node:fs/promises';
import { Buffer } from 'node:buffer';
import { URL } from 'node:url';
import process from 'node:process';
import { evaluateStaticFaceResearchRules } from '../.face-reading-dist/static-research-rule-runtime.js';

try {
  if (process.argv.length === 3 && process.argv[2] === '--self-check-mayi') {
    const { selfCheckMayiCandidateLogic } =
      await import('../.face-reading-dist/mayi-three-divisions-rule-candidates.js');
    process.stdout.write(
      `${JSON.stringify({ status: 'candidate_logic_self_check', assertionAuthority: 'research_fixture', evaluations: selfCheckMayiCandidateLogic(), personalReadingIssued: false })}\n`,
    );
  } else if (process.argv[2] === '--image') {
    const { runLocalFacePhotoResearch } = await import('./local-face-photo-research.mjs');
    process.stdout.write(
      `${JSON.stringify(await runLocalFacePhotoResearch(process.argv.slice(2)))}\n`,
    );
  } else {
    const selfCheck = process.argv.length === 3 && process.argv[2] === '--self-check';
    if (process.argv.length !== 2 && !selfCheck) throw new Error('unsupported arguments');
    let source;
    if (selfCheck) {
      source = await readFile(
        new URL('../test/fixtures/face-static-research-snapshot.json', import.meta.url),
        'utf8',
      );
    } else {
      const chunks = [];
      let size = 0;
      for await (const chunk of process.stdin) {
        size += chunk.length;
        if (size > 262144) throw new Error('input limit');
        chunks.push(chunk);
      }
      source = Buffer.concat(chunks).toString('utf8');
    }
    const result = evaluateStaticFaceResearchRules(JSON.parse(source));
    if (
      selfCheck &&
      (result.operationalization.relation !== 'upper_longest' ||
        result.evaluations.filter((entry) => entry.outcome === 'matched').length !== 1 ||
        result.productionExecutionAuthorized !== false)
    )
      throw new Error('compiled path check failed');
    process.stdout.write(
      `${JSON.stringify(selfCheck ? { status: 'self_check_pass', authority: result.status, relation: result.operationalization.relation, productionExecutionAuthorized: false } : result)}\n`,
    );
  }
} catch {
  // Never echo the supplied snapshot, values or private paths on failure.
  const error =
    process.argv[2] === '--image'
      ? 'LOCAL_FACE_PHOTO_RESEARCH_FAILED'
      : 'STATIC_FACE_RESEARCH_INPUT_INVALID';
  process.stderr.write(`${JSON.stringify({ status: 'rejected', error })}\n`);
  process.exitCode = 1;
}
