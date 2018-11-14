import { LoginActionTypes } from './login.actions';

export type LoginState = {
  username?: string;
};

export const initialLoginState = {};

export const loginReducer = (state: LoginState = initialLoginState, action) => {
  const actionHandlers = {
    [LoginActionTypes.ADD_USERNAME]: () => ({
      ...state,
      username: action.username,
    }),
    [LoginActionTypes.CLEAR_USERNAME]: () => ({
      ...state,
      username: undefined,
    }),
  };

  const getNextState = actionHandlers[action.type] || (() => state);
  return getNextState();
};
