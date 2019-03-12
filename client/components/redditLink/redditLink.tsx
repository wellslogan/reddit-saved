import * as React from 'react';
import { connect } from 'react-redux';
import { redditLink } from '@utils/helpers';
import { RedditApp, AppState } from '@models';
import { Dispatch, AnyAction } from 'redux';

type OwnProps = {
  url?: string;
  user?: string;
  subreddit?: string;
  children: React.ReactChild;
} & React.HTMLAttributes<HTMLAnchorElement>;

type StateProps = {
  redditApp: RedditApp;
  dispatch: Dispatch<AnyAction>;
};

const RedditLink: React.FunctionComponent<OwnProps & StateProps> = ({
  url,
  user,
  subreddit,
  children,
  redditApp = RedditApp.None,
  dispatch,
  ...baseAnchorProps
}) => {
  // three potential types of links:
  // - https://www.reddit.com/u/some-user
  // - /u/some-user
  // - https://www.google.com/
  // first two should go to redditLink(), otherwise use the regular url

  if ((url && user) || (url && subreddit) || (user && subreddit)) {
    console.warn(
      'RedditLink: Only 1 of "url", "user", or "subreddit" should be provided.'
    );
  }

  let href;

  if (user) href = redditLink(`/u/${user}`, redditApp);
  else if (subreddit) href = redditLink(`/r/${subreddit}`, redditApp);
  else if (url.startsWith('https://www.reddit.com') || url.startsWith('/'))
    href = redditLink(url, redditApp);
  else href = url;

  return (
    <a href={href} target="_blank" {...baseAnchorProps}>
      {children}
    </a>
  );
};

RedditLink.displayName = 'RedditLink';

const mapStateToProps = (state: AppState) => ({
  redditApp: state.settings.redditApp,
});

export default connect(mapStateToProps)(RedditLink);
