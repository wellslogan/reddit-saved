interface RedditContent<TData> {
  data: TData;
  kind: 'listing' | 't3' | 't1';
  restoredFromFile?: boolean;
  restoredData?: TData;
}

interface RedditListingData {
  after: string;
  before: string;
  children: RedditSubmission[];
  dist: number;
}

interface RedditCommentData {
  author: string;
  body: string;
  body_html: string;
  created: number;
  id: string;
  score: number;
  link_title: string;
  link_url: string;
  link_permalink: string;
  link_author: string;
  num_comments: number;
  subreddit: string;
  permalink: string;
}

interface RedditPostData {
  author: string;
  created: number;
  domain: string;
  id: string;
  score: number;
  selftext: string;
  selftext_html: string;
  subreddit: string;
  title: string;
  url: string;
  permalink: string;
  num_comments: number;
}

export interface RedditListing extends RedditContent<RedditListingData> {}
export interface RedditPost extends RedditContent<RedditPostData> {}
export interface RedditComment extends RedditContent<RedditCommentData> {}

export type RedditSubmission = RedditPost | RedditComment;
