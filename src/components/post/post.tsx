import * as React from 'react';
import { RedditPost } from 'src/models';
import { redditLink } from 'src/utils/helpers';

type PostProps = {
  data: RedditPost;
};

type PostState = {
  collapsed: boolean;
};

export class PostComponent extends React.Component<PostProps, PostState> {
  constructor(props) {
    super(props);
    this.state = { collapsed: false };
  }

  render() {
    const { data } = this.props.data;
    return (
      <article className="article--post">
        <header className="article--post__header">
          <a href={data.url}>{data.title}</a>
        </header>
        <section className="article--post__byline">
          submitted 19 days ago by{' '}
          <a href={redditLink(`u/${data.author}`)}>{data.author}</a> to{' '}
          <a href={redditLink(`r/${data.subreddit}`)}>
            r/
            {data.subreddit}
          </a>
        </section>
        <footer className="article--post__footer">
          <a href={redditLink(data.permalink)}>
            <strong>{data.num_comments} comments</strong>
          </a>
        </footer>
      </article>
    );
  }
}
