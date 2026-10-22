export function readingCatalogue(): {
  version: string;
  items: {
    termKey: string;
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
