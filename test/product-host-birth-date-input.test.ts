import { describe, expect, it } from 'vitest';
import { parseProductHostReadingRequest } from '../src/host/product-host.js';
import { PRODUCT_HOST_APP_SCRIPT, PRODUCT_HOST_PAGE } from '../src/host/static-page.js';

describe('product host birth date direct input regression', () => {
  it('uses a direct-typing text field instead of the browser native date segment editor', () => {
    expect(PRODUCT_HOST_PAGE).toContain('id="birth-date"');
    expect(PRODUCT_HOST_PAGE).toContain('type="text"');
    expect(PRODUCT_HOST_PAGE).toContain('inputmode="numeric"');
    expect(PRODUCT_HOST_PAGE).toContain('maxlength="10"');
    expect(PRODUCT_HOST_PAGE).toContain('placeholder="YYYY-MM-DD"');
    expect(PRODUCT_HOST_PAGE).not.toContain('id="birth-date" name="date" type="date"');
  });

  it('ships the eight-digit normalization and pre-submit date validation contract', () => {
    expect(PRODUCT_HOST_APP_SCRIPT).toContain("replace(/\\D/g, '').slice(0, 8)");
    expect(PRODUCT_HOST_APP_SCRIPT).toContain("digits.slice(0, 4) + '-' + digits.slice(4, 6) + '-' + digits.slice(6)");
    expect(PRODUCT_HOST_APP_SCRIPT).toContain('birthDateValidationMessage');
    expect(PRODUCT_HOST_APP_SCRIPT).toContain('birthDate.reportValidity()');
  });

  it('keeps malformed six-digit years fail-closed at the host boundary', () => {
    expect(() =>
      parseProductHostReadingRequest({
        birth: {
          calendarType: 'solar',
          date: '199601-09-24',
          time: '12:00',
          sex: 'unspecified',
        },
        reading: { text: '사주' },
      }),
    ).toThrowError(/birth\.date must be YYYY-MM-DD/u);
  });

  it('still accepts a normalized four-digit-year date', () => {
    const parsed = parseProductHostReadingRequest({
      birth: {
        calendarType: 'solar',
        date: '1988-12-31',
        time: '12:00',
        sex: 'unspecified',
      },
      reading: { text: '사주' },
    });
    expect(parsed.birth.date).toBe('1988-12-31');
  });
});
