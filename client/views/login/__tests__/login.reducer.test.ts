import { LoginActionTypes } from '../login.actions';
import { loginReducer } from '../login.reducer';

describe('Redux: Login Reducer', () => {
  it('should update state for addUsername action', () => {
    const initialState = {};
    const action = {
      type: LoginActionTypes.ADD_USERNAME,
      username: 'test-user',
    };

    const nextState = loginReducer(initialState, action);
    expect(nextState).toEqual({ username: 'test-user' });
  });

  it('should update state for clearUsername action', () => {
    const initialState = { username: 'test-user' };
    const action = { type: LoginActionTypes.CLEAR_USERNAME };

    const nextState = loginReducer(initialState, action);
    expect(nextState).toEqual({});
  });
});
