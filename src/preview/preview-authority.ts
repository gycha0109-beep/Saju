export const PREVIEW_E2E_AUTHORITY_VERSION = 'myeonghwa-preview-e2e-authority-v1' as const;

export const PREVIEW_E2E_APPROVAL = Object.freeze({
  authorityVersion: PREVIEW_E2E_AUTHORITY_VERSION,
  approvalId: 'owner-provisional-preview-2026-09-19',
  lifecycle: 'preview',
  approved: true,
  researchContinues: true,
  productionInterpretationAuthorityGranted: false,
  commerceAuthorityGranted: false,
  persistenceAuthorityGranted: false,
  publicGeneralAvailabilityAuthorityGranted: false,
  purpose: 'consumer-screen-e2e-observation',
  supportedReadingSections: Object.freeze([
    'general:natal',
    'career:natal',
    'wealth:natal',
    'relationship:natal:general',
    'business:natal',
  ] as const),
});

export type PreviewE2eSupportedReadingSection =
  (typeof PREVIEW_E2E_APPROVAL.supportedReadingSections)[number];

const supported = new Set<string>(PREVIEW_E2E_APPROVAL.supportedReadingSections);

export function isPreviewE2eSupportedReadingSection(
  value: string | undefined,
): value is PreviewE2eSupportedReadingSection {
  return value !== undefined && supported.has(value);
}
