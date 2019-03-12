export const LoginActionTypes = {
  SET_REDDIT_TOKEN: 'LOGIN:SET_REDDIT_TOKEN',
  ADD_USERNAME: 'LOGIN:ADD_USERNAME',
  CLEAR_USERNAME: 'LOGIN:CLEAR_USERNAME',
};

export const setRedditToken = (redditToken: string) => ({
  type: LoginActionTypes.SET_REDDIT_TOKEN,
  redditToken,
});

export const addUsername = (username: string) => ({
  type: LoginActionTypes.ADD_USERNAME,
  username,
});

export const clearUsername = () => ({
  type: LoginActionTypes.CLEAR_USERNAME,
});
