export const LoginActionTypes = {
  ADD_USERNAME: 'LOGIN:ADD_USERNAME',
  CLEAR_USERNAME: 'LOGIN:CLEAR_USERNAME',
};

export const addUsername = (username: string) => ({
  type: LoginActionTypes.ADD_USERNAME,
  username,
});

export const clearUsername = () => ({
  type: LoginActionTypes.CLEAR_USERNAME,
});
