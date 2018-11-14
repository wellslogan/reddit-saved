import { REDDIT_TOKEN_SESSION_STORAGE_KEY } from '../constants';

/**
 * Store the reddit token in session storage
 * @param token the token to store
 */
export const storeRedditToken = (token: string): void => {
  window.sessionStorage.setItem(REDDIT_TOKEN_SESSION_STORAGE_KEY, token);
};

/**
 * Retrieve the reddit token from session storage
 * @returns the token
 */
export const retrieveRedditToken = (): string => {
  return window.sessionStorage.getItem(REDDIT_TOKEN_SESSION_STORAGE_KEY);
};

/**
 * Clean session storage by removing token(s). Not using
 * clear() in order to preserve the persisted Redux store
 */
export const cleanSessionStorage = (): void => {
  window.sessionStorage.removeItem(REDDIT_TOKEN_SESSION_STORAGE_KEY);
};
