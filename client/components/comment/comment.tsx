import * as React from 'react';
import * as moment from 'moment';

import { RedditLink } from '@components';
import { RedditComment, RedditApp } from '@models';
import { htmlDecode, fixRelativeLinks } from '@utils/helpers';

type CommentProps = {
  comment: RedditComment;
  redditApp: RedditApp;
  style: any;
};

export const CommentComponent: React.StatelessComponent<CommentProps> = ({
  redditApp,
  comment,
  style,
}) => {
  const RedditLinkWithApp = ({ url, children }) =>
    RedditLink({ app: redditApp, url, children });

  return (
    <div style={{ ...style, padding: '0.5em 0' }}>
      <article
        className={`article--comment ${
          comment.restoredFromFile ? 'restored' : ''
        }`}
      >
        <header className="article--comment__header">
          {comment.restoredFromFile ? (
            <span className="article--comment__header__restored-badge">
              restored
            </span>
          ) : null}
          <div className="article--comment__header__post-info">
            <RedditLinkWithApp url={comment.data.link_url}>
              {comment.data.link_title}
            </RedditLinkWithApp>{' '}
            <span className="article--comment__header__post-info__byline">
              by{' '}
              <RedditLinkWithApp url={`/u/${comment.data.link_author}`}>
                {comment.data.link_author}
              </RedditLinkWithApp>{' '}
              in{' '}
              <RedditLinkWithApp url={`/r/${comment.data.subreddit}`}>
                {comment.data.subreddit}
              </RedditLinkWithApp>
            </span>
          </div>
          <div className="article--comment__header__byline">
            <RedditLinkWithApp url={`/u/${comment.data.author}`}>
              <strong>{comment.data.author}</strong>
            </RedditLinkWithApp>{' '}
            <strong>{comment.data.score} points</strong>{' '}
            {moment.unix(comment.data.created).fromNow()}
          </div>
        </header>
        <main
          className="article--comment__main"
          dangerouslySetInnerHTML={{
            __html: fixRelativeLinks(
              htmlDecode(comment.data.body_html),
              redditApp
            ),
          }}
        />
        <footer className="article--comment__footer">
          <RedditLinkWithApp url={comment.data.permalink}>
            <strong>Permalink</strong>
          </RedditLinkWithApp>
        </footer>
      </article>
    </div>
  );
};

CommentComponent.displayName = 'Comment';
