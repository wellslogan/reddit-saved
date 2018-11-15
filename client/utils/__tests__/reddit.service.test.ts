import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchIdentity, fetchSaved } from '@utils/reddit.service';

describe('Utils: RedditService', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  describe('Method: fetchIdentity', () => {
    it('should call get with correct headers', async () => {
      jest.spyOn(axios, 'get');
      mockAxios.onGet('https://oauth.reddit.com/api/v1/me').reply(200, {
        username: 'test-user',
      });

      const expectedRequestOptions = {
        headers: {
          Authorization: 'bearer some-token',
        },
      };

      await fetchIdentity('some-token');

      expect(axios.get).toHaveBeenCalledWith(
        'https://oauth.reddit.com/api/v1/me',
        expectedRequestOptions
      );
    });
  });

  describe('Method: fetchSaved', () => {
    beforeEach(() => {
      jest.spyOn(axios, 'get');
      mockAxios.onGet(/https:\/\/oauth\.reddit\.com\/.+/).reply(200, {});
    });

    it('should call get with correct url params and headers', async () => {
      const expectedRequestOptions = {
        headers: {
          Authorization: 'bearer some-token',
        },
      };

      const expectedRequestUrl =
        'https://oauth.reddit.com/user/test-user/saved?limit=100&after=null';

      await fetchSaved('some-token', 'test-user', null);

      expect(axios.get).toHaveBeenCalledWith(
        expectedRequestUrl,
        expectedRequestOptions
      );
    });

    it('should call get with correct url params and headers when "after" param is provided', async () => {
      const expectedRequestOptions = {
        headers: {
          Authorization: 'bearer some-token',
        },
      };

      const expectedRequestUrl =
        'https://oauth.reddit.com/user/test-user/saved?limit=100&after=t12345';

      await fetchSaved('some-token', 'test-user', 't12345');

      expect(axios.get).toHaveBeenCalledWith(
        expectedRequestUrl,
        expectedRequestOptions
      );
    });
  });
});
