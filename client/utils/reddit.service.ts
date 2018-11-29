import axios, { AxiosPromise } from 'axios';
import { REDDIT_URI } from '@app/constants';
import { RedditListing } from '@models';
import { waitSeconds } from './helpers';

const createRequestOptions = token => ({
  headers: {
    Authorization: `bearer ${token}`,
  },
});

export const fetchIdentity = (token: string) => {
  return axios.get(REDDIT_URI + '/api/v1/me', createRequestOptions(token));
};

export const fetchSaved = (
  token: string,
  username: string,
  after: string
): AxiosPromise<RedditListing> => {
  return axios.get(
    REDDIT_URI + `/user/${username}/saved?limit=100&after=${after || 'null'}`,
    createRequestOptions(token)
  );
};

export const checkRateLimitAndWait = (headers: any): Promise<{}> => {
  return new Promise(async resolve => {
    if (parseFloat(headers['x-ratelimit-remaining']) === 0) {
      await waitSeconds(headers['x-ratelimit-reset']);
    }
    resolve();
  });
};
