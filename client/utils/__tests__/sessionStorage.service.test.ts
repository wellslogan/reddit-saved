import {
  storeRedditToken,
  retrieveRedditToken,
  cleanSessionStorage,
} from '@utils/sessionStorage.service';
import { REDDIT_TOKEN_SESSION_STORAGE_KEY } from '@app/constants';

describe('Utils: SessionStorageService', () => {
  describe('Method: storeRedditToken', () => {
    it('should store token in storage', () => {
      storeRedditToken('test-token');
      expect(sessionStorage.setItem).toHaveBeenCalledWith(
        REDDIT_TOKEN_SESSION_STORAGE_KEY,
        'test-token'
      );
      expect(sessionStorage.__STORE__[REDDIT_TOKEN_SESSION_STORAGE_KEY]).toBe(
        'test-token'
      );
    });
  });

  describe('Method: retrieveRedditToken', () => {
    it('should get token from storage', () => {
      retrieveRedditToken();
      expect(sessionStorage.getItem).toHaveBeenCalledWith(
        REDDIT_TOKEN_SESSION_STORAGE_KEY
      );
    });
  });

  describe('Method: cleanSessionStorage', () => {
    it('should clear session storage', () => {
      storeRedditToken('test-token');
      expect(sessionStorage.__STORE__[REDDIT_TOKEN_SESSION_STORAGE_KEY]).toBe(
        'test-token'
      );
      cleanSessionStorage();
      expect(sessionStorage.removeItem).toHaveBeenCalledWith(
        REDDIT_TOKEN_SESSION_STORAGE_KEY
      );
      expect(sessionStorage.__STORE__).toEqual({});
    });
  });
});
