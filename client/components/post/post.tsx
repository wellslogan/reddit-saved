import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt';
import * as moment from 'moment';

import { RedditPost, RedditApp, RedditComment } from '@models';
import { htmlDecode, fixRelativeLinks } from '@utils/helpers';
import { RedditLink } from '@components';
import { cssClasses } from '@utils/conditionalClassList';

type Props = {
  post: RedditPost;
  style: any;
  redditApp: RedditApp;
};

export const PostComponent: React.FunctionComponent<Props> = props => {
  const { post, style, redditApp } = props;
  const {
    url,
    title,
    created,
    author,
    subreddit,
    permalink,
    selftext_html,
  } = post.data;

  return (
    <div style={{ ...style }}>
      <article className={cssClasses('submission submission-post')}>
        <header>
          <h1>
            <RedditLink url={url}>{title}</RedditLink>
          </h1>

          <h3>
            submitted {moment.unix(created).fromNow()} by{' '}
            <RedditLink user={author}>{author}</RedditLink>
            {' to '}
            <RedditLink subreddit={subreddit}>{subreddit}</RedditLink>
          </h3>
        </header>
        <aside>
          <RedditLink url={permalink} title="go to permalink">
            <FontAwesomeIcon icon={faExternalLinkAlt} size="2x" />
          </RedditLink>
        </aside>
        <main
          dangerouslySetInnerHTML={{
            __html: fixRelativeLinks(htmlDecode(selftext_html), redditApp),
          }}
        />
      </article>
    </div>
  );
};

PostComponent.displayName = 'Post';
