import axios, { AxiosPromise, AxiosInstance, AxiosResponse } from 'axios';
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

const rateLimitResponseInterceptor = async (response: AxiosResponse<any>) => {
  if (parseFloat(response.headers['x-ratelimit-remaining']) === 0) {
    await waitSeconds(response.headers['x-ratelimit-reset']);
  }
  return response;
};

export class RedditApiService {
  private api: AxiosInstance;

  constructor(authToken: string, axiosInstance?: AxiosInstance) {
    this.api =
      axiosInstance ||
      axios.create({
        baseURL: REDDIT_URI,
        headers: {
          Authorization: `bearer ${authToken}`,
        },
      });

    this.api.interceptors.response.use(rateLimitResponseInterceptor, err =>
      Promise.reject(err)
    );
  }

  public fetchIdentity() {
    return this.api.get('/api/v1/me');
  }

  public fetchSaved(
    username: string,
    after: string
  ): AxiosPromise<RedditListing> {
    return this.api.get(
      `/user/${username}/saved?limit=100&after=${after || 'null'}`
    );
  }
}
