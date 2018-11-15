import * as React from 'react';

type SubredditsListingProps = {
  subreddits: string[];
  onClickSubreddit: (subreddit: string) => void;
};

export const SubredditsListing: React.StatelessComponent<
  SubredditsListingProps
> = ({ subreddits, onClickSubreddit }) => (
  <ul>
    <li>filter by sub:</li>
    {subreddits.map(sub => (
      <li key={sub}>
        <button
          className="link-button"
          onClick={() => onClickSubreddit(sub)}
          data-testid={`filterSubBtn-${sub}`}
        >
          {sub}
        </button>
      </li>
    ))}
  </ul>
);

SubredditsListing.displayName = 'SubredditListing';
