import { RedditPost, RedditComment, AppState } from '@models';
import axios from 'axios';
import tryAsync from '@utils/tryAsync';

export const SavedListingActions = {
  SET_SAVED_LISTING_LOADING: 'SAVEDLISTING:SET_SAVED_LISTING_LOADING',
  ADD_SAVED_LISTING_DATA: 'SAVEDLISTING:ADD_SAVED_LISTING_DATA',
  ADD_SAVED_LISTING_ERROR: 'SAVEDLISTING:ADD_SAVED_LISTING_ERROR',
  CLEAR_SAVED_LISTING_DATA: 'SAVEDLISTING:CLEAR_SAVED_LISTING_DATA',
};

export const setSavedListingLoading = (loading?: boolean) => ({
  type: SavedListingActions.SET_SAVED_LISTING_LOADING,
  loading,
});

export const addSavedListingData = (
  listing: (RedditPost | RedditComment)[]
) => ({
  type: SavedListingActions.ADD_SAVED_LISTING_DATA,
  listing,
});

export const clearSavedListingData = () => ({
  type: SavedListingActions.CLEAR_SAVED_LISTING_DATA,
});

export const addSavedListingError = (error: String) => ({
  type: SavedListingActions.ADD_SAVED_LISTING_ERROR,
  error,
});

type StateGetter = () => AppState;

export const fetchSavedListingAsync = () => async (
  dispatch,
  getState: StateGetter
) => {
  dispatch(setSavedListingLoading(true));

  // const listing = await axios.get('http://localhost:5000/listing');
  const { err, data } = await tryAsync<any>(axios.get('http://localhost:5000'));
  if (err) dispatch(addSavedListingError(err));

  dispatch(addSavedListingData(data));
};
