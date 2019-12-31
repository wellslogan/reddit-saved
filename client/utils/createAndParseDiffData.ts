import { RedditSubmission, RedditPost } from '@models';
import { NormalizedRedditSubmissions } from './normalization';
import { REMOVED_REGEX } from '@app/constants';

export const generateJsonBackup = (
  submissionsById: { [id: string]: RedditSubmission },
  submissionsAllIds: string[],
  subreddits: string[]
) => {
  const stringified = JSON.stringify({
    version: '1.0',
    submissionsById,
    submissionsAllIds,
    subreddits,
  });
  return new Blob([stringified], { type: 'application/json' });
};

export const parseJsonBackup = (stringified: string) => {
  const backup = JSON.parse(stringified);

  if (!backup.version || backup.version !== '1.0') {
    console.log('error parsing backup file');
  }

  return backup;
};

export const mergeJsonBackup = (
  serverSubmissions: NormalizedRedditSubmissions,
  fromFileSubmissions: NormalizedRedditSubmissions
): NormalizedRedditSubmissions => {
  // add 'restoredFromFile' flag for fromFile submissions
  fromFileSubmissions.allIds.forEach(id => {
    fromFileSubmissions.byId[id].restoredFromFile = true;
  });

  const resultById = {
    ...fromFileSubmissions.byId,
    ...serverSubmissions.byId,
  };
  const resultAllIds = mergeArrayOrder(
    serverSubmissions.allIds,
    fromFileSubmissions.allIds
  );

  const resultSubreddits = {
    ...serverSubmissions.subreddits,
    ...fromFileSubmissions.subreddits,
  };

  return {
    allIds: resultAllIds,
    byId: resultById,
    subreddits: resultSubreddits,
  };
};

export const mergeArrayOrder = (fromServer: any[], fromFile: any[]) => {
  if (!fromServer.length) return fromFile;

  let result = [];
  let lastFileIdx = -1;

  for (let i = 0; i < fromServer.length; i++) {
    const serverCur = fromServer[i];

    // check index on fromFile
    let idxOnFromFile = fromFile.indexOf(serverCur);

    if (idxOnFromFile < 0) {
      // not present on fromFile
      result.push(serverCur);
    } else {
      // present on fromFile
      if (idxOnFromFile >= lastFileIdx + 1) {
        // need to reconstruct
        result = [
          ...result,
          ...reconstruct(fromFile, lastFileIdx, idxOnFromFile),
        ];
        lastFileIdx = idxOnFromFile;
      }
    }

    // if this is the last server id, and we haven't covered the full
    // fromFile array, append it
    if (i === fromServer.length - 1 && lastFileIdx < fromFile.length - 1) {
      result = [...result, ...fromFile.slice(fromFile.indexOf(serverCur) + 1)];
    }
  }

  return result;
};

const reconstruct = (ids, start, end) => ids.slice(start + 1, end + 1);

const restorePost = (
  fromServer: RedditPost,
  fromFile: RedditPost
): RedditPost => {
  // we will only restore if the entire content of the post is [removed] or [deleted]
  if (REMOVED_REGEX.test(fromServer.data.selftext)) {
    return {
      ...fromServer,
      restoredData: fromFile.data,
      restoredFromFile: true,
    };
  }
  return fromServer;
};
