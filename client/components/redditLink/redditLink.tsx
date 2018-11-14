import * as React from 'react';
import { redditLink } from '@utils/helpers';
import { RedditApp } from '@models';

type RedditLinkProps = {
  url: string;
  children: React.ReactChild;
  app?: RedditApp;
};

export const RedditLink: React.StatelessComponent<RedditLinkProps> = ({
  url,
  children,
  app = RedditApp.None,
}) => {
  // three potential types of links:
  // - https://www.reddit.com/u/some-user
  // - /u/some-user
  // - https://www.google.com/
  // first two should go to redditLink(), otherwise use the regular url
  const href =
    url.startsWith('https://www.reddit.com') || url.startsWith('/')
      ? redditLink(url, app)
      : url;
  return (
    <a href={href} target="_blank">
      {children}
    </a>
  );
};

RedditLink.displayName = 'RedditLink';
