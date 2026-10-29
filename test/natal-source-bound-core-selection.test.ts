import { describe, expect, it } from 'vitest';
import {
  selectSourceBoundNatalCore,
} from '../src/preview/natal-independent-supporting-axes.js';

interface SourceAxis {
  claimType: string;
  axis: string;
  observedFactPaths: readonly string[];
}

function issued(claimType: string, axis: string, ...paths: string[]): SourceAxis {
  return { claimType, axis, observedFactPaths: paths };
}

describe('source-owned natal T8 center selection preserves genuinely independent evidence', () => {
  const priority = ['core', 'expression', 'boundaries', 'reception'];

  it('recovers two independent source-issued axes without counting the old core twice', () => {
    const root = issued('root-t8', 'core', 'a', 'b', 'c', 'd');
    const expression = issued('expression-t8', 'expression', 'a', 'b', 'c');
    const boundaries = issued('boundaries-t8', 'boundaries', 'c', 'd');
    const coordination = issued('coordination-t8', 'coordination', 'e');
    const result = selectSourceBoundNatalCore(
      [root, expression, boundaries, coordination], priority);
    expect(result.core?.claimType).toBe('expression-t8');
    expect(result.supports?.supporting.map(item => item.claimType))
      .toEqual(['root-t8', 'coordination-t8']);
    // When the former root remains as a distinct-axis support, do not
    // display its original paragraph a second time as a displaced core.
    expect(result.displacedCore).toBeUndefined();
    const paths = new Set(result.core?.observedFactPaths ?? []);
    for (const support of result.supports?.supporting ?? []) {
      expect(support.observedFactPaths.some(path => !paths.has(path))).toBe(true);
      support.observedFactPaths.forEach(path => paths.add(path));
    }
  });

  it('retains original T8 explanation when a better same-axis channel is used', () => {
    const original = issued('core-branch-t8', 'core', 'a', 'b', 'c', 'd');
    const alternate = issued('core-stem-t8', 'core', 'a', 'b');
    const expression = issued('expression-t8', 'expression', 'a', 'c');
    const boundary = issued('boundary-t8', 'boundaries', 'd', 'e');
    const result = selectSourceBoundNatalCore(
      [original, alternate, expression, boundary], priority);
    expect(result.core).toBe(alternate);
    expect(result.supports?.supporting).toEqual([expression, boundary]);
    expect(result.displacedCore).toBe(original);
  });

  it('keeps original source-defined core when two independent supports exist', () => {
    const root = issued('root-t8', 'core', 'a', 'b');
    const expression = issued('expression-t8', 'expression', 'a', 'c');
    const boundary = issued('boundary-t8', 'boundaries', 'b', 'd');
    const result = selectSourceBoundNatalCore(
      [root, expression, boundary], priority);
    expect(result.core).toBe(root);
    expect(result.supports?.supporting).toEqual([expression, boundary]);
    expect(result.displacedCore).toBeUndefined();
  });

  it('does not promote mere repeated interpretations into independent meaning', () => {
    const root = issued('root-t8', 'core', 'a', 'b');
    const expression = issued('expression-t8', 'expression', 'a', 'b');
    const boundary = issued('boundary-t8', 'boundaries', 'a', 'b');
    const result = selectSourceBoundNatalCore(
      [root, expression, boundary], priority);
    expect(result.core).toBe(root);
    expect(result.supports?.supporting).toEqual([]);
    expect(result.displacedCore).toBeUndefined();
  });

  it('does not duplicate a preferred center already retained as supporting evidence', () => {
    const original = issued('original-t8', 'core', 'a', 'b');
    const narrow = issued('narrow-t8', 'expression', 'a');
    const boundary = issued('boundary-t8', 'boundaries', 'c');
    const coordination = issued('coordination-t8', 'coordination', 'd');
    const result = selectSourceBoundNatalCore(
      [original, narrow, boundary, coordination], priority);
    expect(result.core).toBe(original);
    expect(result.supports?.supporting).toHaveLength(2);
    expect(result.displacedCore).toBeUndefined();
  });

  it('preserves partial/no-core status when none was issued', () => {
    const coordination = issued('coordination-t8', 'coordination', 'a', 'b');
    const result = selectSourceBoundNatalCore([coordination], priority);
    expect(result).toEqual({
      core: undefined, supports: undefined, displacedCore: undefined,
    });
  });
});
