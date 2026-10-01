import { execFileSync } from 'node:child_process';
import { writeFileSync, appendFileSync } from 'node:fs';
import process from 'node:process';
import console from 'node:console';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export function resolveTestPlan(paths, { staged = false, event = 'pull_request', candidateHead = '' } = {}) {
  const full = Boolean(candidateHead) || !staged || event !== 'pull_request' || !paths.length || paths.some(path =>
    !/^(?:src\/(?:research\/)?[^/]+\.ts|test\/.*)$/u.test(path)
    || /^(?:src\/(?:index|production[^/]*|product[^/]*|character[^/]*|types|runtime|engine|config)(?:\.ts|\/))/u.test(path));
  return { full };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const staged = process.env.CI_STAGED_VERIFICATION === 'true';
  const event = process.env.GITHUB_EVENT_NAME;
  let paths = [];
  if (staged && event === 'pull_request') {
    const base = process.env.BASE_SHA;
    const head = process.env.HEAD_SHA;
    if (![base, head].every(sha => /^[a-f0-9]{40}$/u.test(sha ?? ''))) throw new Error('Missing PR comparison SHAs');
    paths = execFileSync('git', ['diff', '--name-only', `${base}...${head}`], { encoding: 'utf8' }).trim().split(/\r?\n/u).filter(Boolean);
  }
  const plan = resolveTestPlan(paths, { staged, event, candidateHead: process.env.CANDIDATE_HEAD });
  appendFileSync(process.env.GITHUB_OUTPUT, `full=${plan.full}\n`);
  if (!plan.full) writeFileSync(`${process.env.RUNNER_TEMP}/ci-changed-files.json`, JSON.stringify(paths));
  // No project or track name controls test coverage.
  console.log(`CI selection: ${plan.full ? 'full regression' : 'import consumers + changed tests + static contracts'}`);
}
