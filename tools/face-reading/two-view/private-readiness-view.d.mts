export const LOCAL_READINESS_VIEW_VERSION: 'private-face-readiness-view@0.1.0';
export interface ReadinessView {
  readonly schemaVersion: typeof LOCAL_READINESS_VIEW_VERSION;
  readonly status: 'available';
  readonly captureCount: number;
  readonly statusCounts: Readonly<Record<string, number>>;
  readonly independentAccuracyValidated: false;
  readonly canonicalPhotoMeasurementVerified: false;
  readonly captures: Readonly<
    Record<
      string,
      {
        readonly viewRole: 'frontal' | 'profile';
        readonly hasPersistedExecutionEvidence: boolean;
        readonly features: readonly {
          readonly featureKey: string;
          readonly state: string;
          readonly reason: string;
        }[];
      }
    >
  >;
}
export function projectPrivatePhotoReadiness(
  report: unknown,
  expectedCaptures: readonly { captureRef: string; viewRole: 'frontal' | 'profile' }[],
  expectedKeys: readonly string[],
  versions: { metric: string; parsing: string },
): ReadinessView;
