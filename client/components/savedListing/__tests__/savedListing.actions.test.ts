import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  setSavedListingLoading,
  SavedListingActions,
  addSavedListingError,
  addSubredditsList,
  addSubmissions,
  clearSubmissions,
  fetchSavedListingAsync,
} from '../savedListing.actions';
import * as RedditService from '@utils/reddit.service';
import * as SessionStorageService from '@utils/sessionStorage.service';
import {
  MockSubredditsList,
  MockSubmissions,
  MockIdentity,
} from '@app/MockData';
import { LoginActionTypes } from '@components/login/login.actions';
import { NO_SAVED_POSTS } from '@app/constants';

const mockStore = configureStore([thunk]);

describe('Redux: SavedListing actions', () => {
  let initialState, store;

  beforeEach(() => {
    initialState = {
      listing: {},
    };
    store = mockStore(initialState);
  });

  it('should dispatch setSavedListingLoading action', () => {
    store.dispatch(setSavedListingLoading(true));

    const actions = store.getActions();
    const expected = {
      type: SavedListingActions.SET_SAVED_LISTING_LOADING,
      loading: true,
    };
    expect(actions).toEqual([expected]);
  });

  it('should dispatch addSavedListingError action', () => {
    store.dispatch(addSavedListingError('error'));

    const actions = store.getActions();
    const expected = {
      type: SavedListingActions.ADD_SAVED_LISTING_ERROR,
      error: 'error',
    };
    expect(actions).toEqual([expected]);
  });

  it('should dispatch addSubredditList action', () => {
    store.dispatch(addSubredditsList(MockSubredditsList));

    const actions = store.getActions();
    const expected = {
      type: SavedListingActions.ADD_SUBREDDITS_LIST,
      subs: MockSubredditsList,
    };
    expect(actions).toEqual([expected]);
  });

  it('should dispatch addSubmissions action', () => {
    store.dispatch(addSubmissions(MockSubmissions));

    const actions = store.getActions();
    const expected = {
      type: SavedListingActions.ADD_SUBMISSIONS,
      submissions: MockSubmissions,
    };
    expect(actions).toEqual([expected]);
  });

  it('should dispatch clearSubmissions action', () => {
    store.dispatch(clearSubmissions());

    const actions = store.getActions();
    const expected = { type: SavedListingActions.CLEAR_SUBMISSIONS };
    expect(actions).toEqual([expected]);
  });

  describe('Async Action: fetchSavedListingAsync', () => {
    it('should dispatch actions', async () => {
      jest
        .spyOn(SessionStorageService, 'retrieveRedditToken')
        .mockReturnValue('token');
      jest
        .spyOn(RedditService, 'fetchIdentity')
        .mockReturnValue(Promise.resolve({ data: MockIdentity }));
      jest.spyOn(RedditService, 'fetchSaved').mockReturnValue(
        Promise.resolve({
          data: { data: { children: MockSubmissions, after: null, dist: 3 } },
        })
      );

      await store.dispatch(fetchSavedListingAsync());
      const actions = store.getActions();

      expect(actions.length).toBe(4);
      expect(actions[0]).toEqual({
        type: SavedListingActions.SET_SAVED_LISTING_LOADING,
        loading: true,
      });
      expect(actions[1]).toEqual({
        type: LoginActionTypes.ADD_USERNAME,
        username: 'test-user',
      });
      expect(actions[2]).toEqual({
        type: SavedListingActions.ADD_SUBMISSIONS,
        submissions: MockSubmissions,
      });
      expect(actions[3]).toEqual({
        type: SavedListingActions.SET_SAVED_LISTING_LOADING,
        loading: false,
      });
    });

    it('should dispatch error if no saved submissions', async () => {
      jest
        .spyOn(SessionStorageService, 'retrieveRedditToken')
        .mockReturnValue('token');
      jest
        .spyOn(RedditService, 'fetchIdentity')
        .mockReturnValue(Promise.resolve({ data: MockIdentity }));
      jest.spyOn(RedditService, 'fetchSaved').mockReturnValue(
        Promise.resolve({
          data: { data: { dist: 0 } },
        })
      );

      await store.dispatch(fetchSavedListingAsync());
      const actions = store.getActions();

      expect(actions.length).toBe(5);
      expect(actions[3]).toEqual({
        type: SavedListingActions.ADD_SAVED_LISTING_ERROR,
        error: NO_SAVED_POSTS,
      });
    });
  });
});
