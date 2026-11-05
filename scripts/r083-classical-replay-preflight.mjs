import process from 'node:process';
import {
  buildR083ClassicalReplayPreflightReport,
} from '../dist/research/general-natal-classical-replay-preflight.js';

const args = process.argv.slice(2);
if ((args.length !== 0 && (args.length !== 2 || args[0] !== '--case' ||
    args[1].trim().length === 0)) || args.includes('--help')) {
  throw new RangeError(
    'Usage: npm run research:r083:preflight -- [--case REGISTERED-R082-ID]',
  );
}
const report = buildR083ClassicalReplayPreflightReport(
  args.length === 0 ? undefined : args[1],
);
process.stdout.write(JSON.stringify(report, null, 2) + '\n');
