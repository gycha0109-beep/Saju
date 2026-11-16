// Private fresh-photo routing contract shared by the existing /two-view
// server and the existing 29-feature coverage runner.
export const FRESH_RESEARCH_INTAKE_VERSION = 'engineering.fresh-two-view-research-intake@0.1.0';

export function validateFreshResearchIntake(marker, baseInventory, additions) {
  if (
    !marker ||
    Object.keys(marker).sort().join(',') !==
      [
        'schemaVersion',
        'researchOnly',
        'poseIndependentlyVerified',
        'current2dExtractorsExecuted',
        'viewRoleRouting',
        'photoCount',
      ]
        .sort()
        .join(',') ||
    marker.schemaVersion !== FRESH_RESEARCH_INTAKE_VERSION ||
    marker.researchOnly !== true ||
    marker.poseIndependentlyVerified !== false ||
    marker.current2dExtractorsExecuted !== false ||
    marker.viewRoleRouting !== 'provisional_frontal_for_research_only' ||
    !Number.isInteger(marker.photoCount) ||
    !Array.isArray(baseInventory) ||
    baseInventory.length !== 0 ||
    !Array.isArray(additions) ||
    marker.photoCount !== additions.length ||
    additions.length < 1 ||
    additions.some((item) => item.viewRole !== 'frontal')
  )
    throw Error('FRESH_RESEARCH_INTAKE_INVALID');
  return true;
}
