import * as React from 'react';
import * as moment from 'moment';

import { RedditLink } from '@components';
import { RedditComment, RedditApp } from '@models';
import { htmlDecode, fixRelativeLinks } from '@utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt';

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
  const {
    link_url,
    link_title,
    link_author,
    subreddit,
    author,
    score,
    created,
    body_html,
    permalink,
  } = comment.data;

  return (
    <div style={{ ...style /*padding: '0.5em 0' */ }}>
      <article className="submission submission-comment">
        <header>
          <h3>
            <RedditLink url={link_url}>{link_title}</RedditLink>
            {' by '}
            <RedditLink user={link_author}>{link_author}</RedditLink>
            {' in '}
            <RedditLink subreddit={subreddit}>{subreddit}</RedditLink>
          </h3>
          <h1>
            <strong>
              <RedditLink user={author}>{author}</RedditLink> {score} points{' '}
            </strong>
            {moment.unix(created).fromNow()}
          </h1>
        </header>
        <aside>
          <RedditLink url={permalink} title="go to permalink">
            <FontAwesomeIcon icon={faExternalLinkAlt} size="2x" />
          </RedditLink>
        </aside>
        <main
          dangerouslySetInnerHTML={{
            __html: fixRelativeLinks(htmlDecode(body_html), redditApp),
          }}
        />
      </article>
    </div>
  );
};

CommentComponent.displayName = 'Comment';
