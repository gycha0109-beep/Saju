import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import * as productReadingResponsePublic from '../src/product-reading-response.js';

describe('Product Reading Response public boundary', () => {
  it('exposes only canonical response admission runtime values', () => {
    expect(Object.keys(productReadingResponsePublic).sort()).toEqual([
      'PRODUCT_READING_RESPONSE_VERSION',
      'admitProductReadingResponse',
      'assertProductReadingResponse',
    ]);
    expect(productReadingResponsePublic).not.toHaveProperty('buildProductReadingResponse');
  });

  it('registers the canonical response admission subpath in the package export map', async () => {
    const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8')) as {
      exports: Record<string, { types: string; default: string }>;
    };

    expect(packageJson.exports['./product-reading-response']).toEqual({
      types: './dist/product-reading-response.d.ts',
      default: './dist/product-reading-response.js',
    });
  });
});
