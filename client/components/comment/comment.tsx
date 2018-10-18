import * as React from 'react';

import { RedditComment, RedditApp } from '@models';
import { redditLink as makeRedditLink, htmlDecode } from '@utils/helpers';

type CommentProps = {
  comment: RedditComment;
  redditApp: RedditApp;
};

type CommentState = {
  collapsed: boolean;
};

export class CommentComponent extends React.Component<
  CommentProps,
  CommentState
> {
  constructor(props) {
    super(props);
    this.state = { collapsed: false };
  }

  toggleCollapsed = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed,
    }));
  };

  render() {
    const { data } = this.props.comment;
    const redditLink = relativeUrl =>
      makeRedditLink(relativeUrl, this.props.redditApp);

    return (
      <article className="article--comment">
        <header className="article--comment__header">
          <div className="article--comment__header__post-info">
            <a href={data.link_url}>{data.link_title}</a>
            <span className="article--comment__header__post-info__byline">
              by{' '}
              <a href={redditLink(`u/${data.link_author}`)}>
                {data.link_author}
              </a>{' '}
              in{' '}
              <a href={redditLink(`r/${data.subreddit}`)}>{data.subreddit}</a>
            </span>
          </div>
          <div className="article--comment__header__byline">
            <button
              className="link-button"
              onClick={() => this.toggleCollapsed()}
            >
              {this.state.collapsed ? '[+]' : '[-]'}
            </button>{' '}
            <a href={redditLink(`u/${data.author}`)}>
              <strong>{data.author}</strong>
            </a>{' '}
            <strong>{data.score} points</strong> 5 days ago
          </div>
        </header>
        {this.state.collapsed ? null : (
          <main
            className="article--comment__main"
            dangerouslySetInnerHTML={{ __html: htmlDecode(data.body_html) }}
          />
        )}
        <footer className="article--comment__footer">
          <a href={redditLink(data.permalink)} target="_blank">
            <strong>Permalink</strong>
          </a>
        </footer>
      </article>
    );
  }
}
