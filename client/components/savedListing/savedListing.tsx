import * as React from 'react';
import { connect } from 'react-redux';
import { RedditListing, RedditPost, RedditComment, RedditApp } from '@models';
import { PostComponent as Post } from '../post/post';
import { CommentComponent as Comment } from '../comment/comment';
import { AppState } from '@models/AppState';

import * as testData from 'testData';

type SavedListingProps = {
  redditListing: RedditListing;
  redditApp: RedditApp;
};

type SavedListingComponent = React.StatelessComponent<SavedListingProps>;

const SavedListing: SavedListingComponent = ({ redditListing, redditApp }) => {
  return (
    <>
      {redditListing.data.children.map(
        commentOrPost =>
          commentOrPost.kind === 't1' ? (
            <Comment
              comment={commentOrPost as RedditComment}
              redditApp={redditApp}
            />
          ) : (
            <Post data={commentOrPost as RedditPost} />
          )
      )}
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  redditListing: testData,
  redditApp: state.settings.redditApp,
});

export default connect(mapStateToProps)(SavedListing);
