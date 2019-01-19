import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import * as moment from 'moment';

import { RedditPost, RedditApp } from '@models';
import { htmlDecode, fixRelativeLinks } from '@utils/helpers';
import { RedditLink } from '@components';

type PostProps = {
  post: RedditPost;
  redditApp: RedditApp;
  style: any;
  onSelfTextToggle: () => any;
};

type PostState = {
  collapsed: boolean;
};

export class PostComponent extends React.Component<PostProps, PostState> {
  constructor(props) {
    super(props);
    this.state = { collapsed: true };
  }

  onClickCollapse = () => {
    this.props.onSelfTextToggle();
    this.setState(prevState => ({ collapsed: !prevState.collapsed }));
  };

  render() {
    const { post, redditApp, style } = this.props;
    const collapseIcon = this.state.collapsed ? faChevronDown : faChevronUp;

    const RedditLinkWithApp = ({ url, children }) =>
      RedditLink({ app: redditApp, url, children });

    return (
      <div style={{ ...style, padding: '1em 0' }}>
        <article
          className={`article--post ${post.restoredFromFile ? 'restored' : ''}`}
        >
          <header className="article--post__header">
            {post.restoredFromFile ? (
              <span className="article--post__header__restored-badge">
                restored
              </span>
            ) : null}
            <RedditLinkWithApp url={post.data.url}>
              {post.data.title}
            </RedditLinkWithApp>
          </header>
          <section className="article--post__byline">
            submitted {moment.unix(post.data.created).fromNow()} by{' '}
            <RedditLinkWithApp url={`/u/${post.data.author}`}>
              {post.data.author}
            </RedditLinkWithApp>
            {' to '}
            <RedditLinkWithApp url={`/r/${post.data.subreddit}`}>
              r/{post.data.subreddit}
            </RedditLinkWithApp>
          </section>
          <section className="article--post__footer">
            {post.data.selftext ? (
              <button
                className="link-button"
                onClick={() => this.onClickCollapse()}
              >
                <strong>
                  Show self-text <FontAwesomeIcon icon={collapseIcon} />
                </strong>
              </button>
            ) : null}
          </section>
          {this.state.collapsed ? null : (
            <section
              className="article--post__selftext"
              dangerouslySetInnerHTML={{
                __html: fixRelativeLinks(
                  htmlDecode(post.data.selftext_html),
                  redditApp
                ),
              }}
            />
          )}
          <footer className="article--post__footer">
            <RedditLinkWithApp url={post.data.permalink}>
              <strong>{post.data.num_comments} comments</strong>
            </RedditLinkWithApp>
          </footer>
        </article>
      </div>
    );
  }
}
