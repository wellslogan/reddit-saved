import { RedditPost, RedditComment } from '@models';
import { SavedListingActions } from './savedListing.actions';

export type SavedListingState = {
  data: (RedditPost | RedditComment)[];
  loading: boolean;
  error?: String;
};

export const initialSavedListingState = {
  data: [],
  loading: false,
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
    [SavedListingActions.ADD_SAVED_LISTING_DATA]: () => ({
      ...state,
      data: [...state.data, ...action.listing],
    }),
    [SavedListingActions.CLEAR_SAVED_LISTING_DATA]: () => ({
      ...state,
      data: [],
    }),
  };

  const getNextState = actionHandlers[action.type] || (() => state);
  return getNextState();
};
