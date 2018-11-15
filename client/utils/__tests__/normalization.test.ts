import { MockSubmissions } from '../../MockData';
import { normalizeRedditSubmissions } from '../normalization';

describe('Utils: normalization', () => {
  it('should normalize submissions', () => {
    const actual = normalizeRedditSubmissions(MockSubmissions);
    const expected = {
      subreddits: { testsubreddit: true },
      allIds: ['1', '2', '3'],
      byId: {
        1: MockSubmissions[0],
        2: MockSubmissions[1],
        3: MockSubmissions[2],
      },
    };

    expect(actual).toEqual(expected);
  });
});
