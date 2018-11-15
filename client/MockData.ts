import { RedditPost, RedditComment } from '@models';

export const MockSubredditsList = [
  'AskReddit',
  'boston',
  'news',
  'Politics',
  'Patriots',
  'bestoflegaladvice',
];

export const MockSubmissions = [
  {
    kind: 't3',
    data: {
      author: 'test-user',
      created: 1542247776,
      domain: 'example.com',
      id: '1',
      score: 945,
      selftext: '**some** self text with [markdown](https://example.com)',
      selftext_html:
        '<b>some</b> self text with <a href="https://example.com">markdown',
      subreddit: 'testsubreddit',
      title: 'Test Post 1',
      url: 'https://www.reddit.com',
      permalink: 'https://www.reddit.com',
      num_comments: 23,
    },
  } as RedditPost,
  {
    kind: 't1',
    data: {
      author: 'test-user',
      body: '**some** text with [markdown](https://example.com)',
      body_html: '<b>some</b> text with <a href="https://example.com">markdown',
      created: 1542247776,
      id: '2',
      score: 101,
      link_title: 'https://www.reddit.com',
      link_url: 'https://www.reddit.com',
      link_permalink: 'https://www.reddit.com',
      link_author: 'test-user2',
      num_comments: 3089,
      subreddit: 'testsubreddit',
      permalink: 'https://www.reddit.com',
    },
  } as RedditComment,
  {
    kind: 't3',
    data: {
      author: 'test-user',
      created: 1542247776,
      domain: 'example.com',
      id: '3',
      score: 945,
      selftext: '**some** self text with [markdown](https://example.com)',
      selftext_html:
        '<b>some</b> self text with <a href="https://example.com">markdown',
      subreddit: 'testsubreddit',
      title: 'Test Post 1',
      url: 'https://www.reddit.com',
      permalink: 'https://www.reddit.com',
      num_comments: 23,
    },
  } as RedditPost,
];

export const MockIdentity = {
  name: 'test-user',
};
