import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { addUsername, LoginActionTypes, clearUsername } from '../login.actions';

const mockStore = configureStore([thunk]);

describe('Redux: Login Actions', () => {
  let initialState, store;

  beforeEach(() => {
    initialState = {
      login: {},
    };
    store = mockStore(initialState);
  });

  it('should dispatch addUsername action', () => {
    store.dispatch(addUsername('test-user'));

    const actions = store.getActions();
    const expected = {
      type: LoginActionTypes.ADD_USERNAME,
      username: 'test-user',
    };
    expect(actions).toEqual([expected]);
  });

  it('should dispatch clearUsername action', () => {
    store.dispatch(clearUsername());

    const actions = store.getActions();
    const expected = { type: LoginActionTypes.CLEAR_USERNAME };
    expect(actions).toEqual([expected]);
  });
});
