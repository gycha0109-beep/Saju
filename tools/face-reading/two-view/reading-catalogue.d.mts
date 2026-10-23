export function readingCatalogue(): {
  version: string;
  items: {
    id: string;
    termKey: string | null;
    title: string;
    sourceExpression: string;
    sourceDescription: string;
    sourceRefs: string[];
    verificationState: string;
    traditionalBindingAuthorized: false;
    requiredObservation: string;
    evidenceMeaning: string;
  }[];
};
