import { RedditPost, RedditComment, RedditSubmission } from '@models';
import { SavedListingActions } from './savedListing.actions';
import { ifCommentOrPostDo } from '@utils/helpers';
import { normalizeRedditSubmissions } from '@utils/normalization';

export type SavedListingState = {
  loading: boolean;
  error?: string;
  submissionsById?: { [id: string]: RedditSubmission };
  submissionsAllIds?: string[];
  subreddits: { [subreddit: string]: boolean }; // fake Set
};

export const initialSavedListingState = {
  loading: false,
  submissionsById: {},
  submissionsAllIds: [],
  subreddits: {},
};

export const savedListingReducer = (
  state: SavedListingState = initialSavedListingState,
  action
) => {
  const actionHandlers = {
    [SavedListingActions.ADD_SAVED_LISTING_ERROR]: () => ({
      ...state,
      error: action.error,
    }),
    [SavedListingActions.SET_SAVED_LISTING_LOADING]: () => ({
      ...state,
      loading: action.loading,
    }),
    [SavedListingActions.ADD_SUBMISSIONS]: () => {
      const { byId, allIds, subreddits } = normalizeRedditSubmissions(
        action.submissions
      );
      return {
        ...state,
        submissionsById: { ...state.submissionsById, ...byId },
        submissionsAllIds: [...state.submissionsAllIds, ...allIds],
        subreddits: { ...state.subreddits, ...subreddits },
      };
    },
    [SavedListingActions.CLEAR_SUBMISSIONS]: () => ({
      ...state,
      submissionsById: {},
      submissionsAllIds: [],
      subreddits: {},
    }),
  };

  const getNextState = actionHandlers[action.type] || (() => state);
  return getNextState();
};
