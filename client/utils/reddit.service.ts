import axios, { AxiosPromise } from 'axios';
import { retrieveRedditToken } from './sessionStorage.service';
import { REDDIT_URI } from '@app/constants';
import { RedditListing } from '@models';

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
