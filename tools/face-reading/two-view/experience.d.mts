export const EXPERIENCE_VERSION: string;
export const TOPICS: readonly { id: string; label: string; question: string }[];
export const DIRECTIONS: readonly { id: string; label: string }[];
export function buildExperience(input: unknown): {
  version: string;
  fictional: true;
  basis: 'user_selection_only';
  photoUsedForReading: false;
  topic: string;
  direction: string;
  title: string;
  narrative: string;
  sections: { title: string; text: string }[];
  disclosure: string;
  provenance: string;
};
