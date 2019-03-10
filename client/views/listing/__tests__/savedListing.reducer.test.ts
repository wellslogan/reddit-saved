import { SavedListingActions } from '../savedListing.actions';
import { savedListingReducer } from '../savedListing.reducer';
import { MockSubmissions } from '@app/MockData';

describe('Redux: SavedListing reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      loading: false,
      submissionsById: {},
      submissionsAllIds: [],
      subreddits: {},
    };
  });

  it('should update state for addSavedListingError action', () => {
    const action = {
      type: SavedListingActions.ADD_SAVED_LISTING_ERROR,
      error: 'test error',
    };

    const nextState = savedListingReducer(initialState, action);
    expect(nextState).toEqual({
      loading: false,
      submissionsById: {},
      submissionsAllIds: [],
      subreddits: {},
      error: 'test error',
    });
  });

  it('should update state for setSavedListingLoading action', () => {
    const action = {
      type: SavedListingActions.SET_SAVED_LISTING_LOADING,
      loading: true,
    };

    const nextState = savedListingReducer(initialState, action);
    expect(nextState).toEqual({
      loading: true,
      submissionsById: {},
      submissionsAllIds: [],
      subreddits: {},
    });
  });

  it('should update state for addSubmissions action', () => {
    const action = {
      type: SavedListingActions.ADD_SUBMISSIONS,
      submissions: MockSubmissions,
    };
    const nextState = savedListingReducer(initialState, action);
    expect(nextState).toEqual({
      loading: false,
      subreddits: {
        testsubreddit: true,
      },
      submissionsAllIds: ['1', '2', '3'],
      submissionsById: {
        1: MockSubmissions[0],
        2: MockSubmissions[1],
        3: MockSubmissions[2],
      },
    });
  });

  it('should update state for clearSubmissions action', () => {
    initialState = {
      loading: false,
      subreddits: { testsubreddit: true },
      submissionsAllIds: ['1', '2', '3'],
      submissionsById: {
        1: MockSubmissions[0],
        2: MockSubmissions[1],
        3: MockSubmissions[2],
      },
    };

    const action = { type: SavedListingActions.CLEAR_SUBMISSIONS };
    const nextState = savedListingReducer(initialState, action);
    expect(nextState).toEqual({
      loading: false,
      submissionsById: {},
      submissionsAllIds: [],
      subreddits: {},
    });
  });
});
