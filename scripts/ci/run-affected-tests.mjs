import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import process from 'node:process';

export function collectStaticTests(root) {
  const found = [];
  if (!existsSync(root)) return found;
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (['node_modules', 'dist', '.git', '.face-reading-dist'].includes(entry.name)) continue;
    const path = `${root}/${entry.name}`;
    if (entry.isDirectory()) found.push(...collectStaticTests(path));
    else if (/\.(?:test|spec)\.[cm]?[jt]sx?$/u.test(path)
      && /(?:readFile|readdir|node:fs|node:child_process|execFile|execSync|spawnSync)/u.test(readFileSync(path, 'utf8'))) found.push(path);
  }
  return found;
}

const paths = JSON.parse(readFileSync(`${process.env.RUNNER_TEMP}/ci-changed-files.json`, 'utf8'));
const contracts = ['test', 'src', 'packages'].flatMap(collectStaticTests);
const changedTests = paths.filter(path => /\.(?:test|spec)\.[cm]?[jt]sx?$/u.test(path) && existsSync(path));
const explicit = [...new Set([...contracts, ...changedTests])];
const run = args => execFileSync(process.execPath, ['node_modules/vitest/vitest.mjs', ...args], { stdio: 'inherit' });
if (explicit.length) run(['run', ...explicit]);
run(['related', ...paths, '--run', '--passWithNoTests']);
