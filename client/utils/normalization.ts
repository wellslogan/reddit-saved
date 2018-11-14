import { RedditSubmission } from '@models';

export type NormalizedRedditSubmissions = {
  allIds: string[];
  byId: { [id: string]: RedditSubmission };
  subreddits: { [subreddit: string]: boolean }; // fake "Set" for the redux store
};

export const normalizeRedditSubmissions = (
  submissions: RedditSubmission[]
): NormalizedRedditSubmissions => {
  const allIds = [];
  const byId = {};
  const subreddits = {};

  submissions.forEach(submission => {
    const { id } = submission.data;
    allIds.push(id);
    byId[id] = submission;
    subreddits[submission.data.subreddit] = true;
  });

  return {
    allIds,
    byId,
    subreddits,
  };
};
