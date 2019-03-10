import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt';
import * as moment from 'moment';

import { RedditPost, RedditApp } from '@models';
import { htmlDecode, fixRelativeLinks } from '@utils/helpers';
import { RedditLink } from '@components';
import { cssClasses } from '@utils/conditionalClassList';

type PostProps = {
  post: RedditPost;
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
    const { post, style } = this.props;
    const collapseIcon = this.state.collapsed ? faChevronDown : faChevronUp;

    return (
      <div style={{ ...style /*padding: '0.5em 0' */ }}>
        <article className={cssClasses('submission submission-post')}>
          <header>
            <h1>
              <RedditLink url={post.data.url}>{post.data.title}</RedditLink>
            </h1>

            <h3>
              submitted {moment.unix(post.data.created).fromNow()} by{' '}
              <RedditLink user={post.data.author}>
                {post.data.author}
              </RedditLink>
              {' to '}
              <RedditLink subreddit={post.data.subreddit}>
                {post.data.subreddit}
              </RedditLink>
            </h3>
          </header>
          <aside>
            <RedditLink url={post.data.permalink} title="go to permalink">
              <FontAwesomeIcon icon={faExternalLinkAlt} size="2x" />
            </RedditLink>
          </aside>
        </article>
      </div>
    );
  }
}
