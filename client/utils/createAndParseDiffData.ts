import { RedditSubmission } from '@models';
import { NormalizedRedditSubmissions } from './normalization';

export const generateJsonBackup = (
  submissionsById: { [id: string]: RedditSubmission },
  submissionsAllIds: string[]
) => {
  const stringified = JSON.stringify({
    version: '1.0',
    submissionsById,
    submissionsAllIds,
  });
  return new Blob([stringified], { type: 'application/json' });
};

const parseJsonBackup = (stringified: string) => {
  const backup = JSON.parse(stringified);

  if (!backup.version || backup.version !== '1.0') {
    console.log('error parsing backup file');
  }

  return backup;
};

// const mergeJsonBackup = (
//   serverSubmissions: NormalizedRedditSubmissions,
//   fromFileSubmissions: NormalizedRedditSubmissions
// ): NormalizedRedditSubmissions => {

// };

// const normalizeSubmissions = (
//   submissions: RedditSubmission[]
// ): { [key: string]: RedditSubmission } => {
//   return submissions.reduce((acc, current: RedditSubmission) => {
//     acc[current.data.id] = {
//       ...current,
//       restoredFromFile: true,
//     };
//     return acc;
//   }, Object.create(null));
// };

// export const generateJsonFileContents = (
//   submissions: RedditSubmission[]
// ): string => {
//   const exportData = {
//     version: '1.0',
//     submissions: normalizeSubmissions(submissions),
//   };

//   return JSON.stringify(exportData);
// };

// export const parseJsonFileContents = (contents: string) => {
//   const parsed = JSON.parse(contents);

//   if (parsed.version !== '1.0') {
//     console.error('invalid file');
//     return;
//   }

//   return parsed;
// };
