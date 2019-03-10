import { LoginActionTypes } from './login.actions';

export type LoginState = {
  username?: string;
  redditToken?: string;
};

export const initialLoginState = {};

export const loginReducer = (state: LoginState = initialLoginState, action) => {
  const actionHandlers = {
    [LoginActionTypes.SET_REDDIT_TOKEN]: () => ({
      ...state,
      redditToken: action.redditToken,
    }),
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
