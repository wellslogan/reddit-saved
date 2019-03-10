import * as React from 'react';
import { RedditPost, RedditComment, RedditApp } from '@models';
import { CommentComponent as Comment } from '@components';
import { PostComponent as Post } from '@components';
import { ifCommentOrPostDo } from '@utils/helpers';

type Props = {
  submission: RedditPost | RedditComment;
  redditApp: RedditApp;
  style: React.StyleHTMLAttributes<any>;
  postsOrComments: 'Posts' | 'Comments' | 'Both';
};

export const Submission: React.StatelessComponent<Props> = props => {
  const { submission, postsOrComments, ...restProps } = props;

  return ifCommentOrPostDo(
    submission,
    comment => <Comment comment={comment} {...restProps} />,
    post => <Post post={post} {...restProps} onSelfTextToggle={() => {}} />
  );
};
