import * as React from 'react';
import { connect } from 'react-redux';
import {
  List,
  WindowScroller,
  AutoSizer,
  CellMeasurerCache,
  CellMeasurer,
} from './components/reactVirtualizedComponents';

import {
  RedditApp,
  RedditSubmission,
  PostsOrComments,
  AppState,
} from '@models';
import { ifCommentOrPostDo } from '@utils/helpers';
import { fetchSavedListingAsync } from './savedListing.actions';
import { LoadingGate } from './components/loadingGate';
import { ListingFilters } from './components/listingFilters';
import { Submission } from './components/submission';

type SavedListingProps = {
  redditApp: RedditApp;
  submissionsById: { [id: string]: RedditSubmission };
  submissionsAllIds: string[];
  subreddits: string[];
  error: string;
  loading?: boolean;
  // dispatch functions:
  fetchSavedListingAsync: () => any;
};

type SavedListingState = {
  searchQuery: string;
  visibleSubmissions: string[];
  subredditFilter?: string;
  postsOrComments: PostsOrComments;
};

class SavedListing extends React.Component<
  SavedListingProps,
  SavedListingState
> {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      visibleSubmissions: props.submissionsAllIds || [],
      postsOrComments: 'Both',
    };
  }

  /**
   * pretty much just followed the example for the
   * CellMeasurer auto height list on
   * https://github.com/bvaughn/react-virtualized/blob/master/source/CellMeasurer/CellMeasurer.DynamicHeightList.example.js
   */
  private _cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 100,
  });

  componentDidMount() {
    if (!this.props.submissionsAllIds.length) {
      this.props.fetchSavedListingAsync().then(() => {
        this.setState(() => ({
          visibleSubmissions: this.props.submissionsAllIds,
        }));
      });
    }
  }

  static getDerivedStateFromProps(
    nextProps: SavedListingProps,
    prevState: SavedListingState
  ): Partial<SavedListingState> {
    if (
      !prevState.searchQuery &&
      !prevState.subredditFilter &&
      prevState.postsOrComments === 'Both'
    ) {
      // adding submissions via redux
      if (
        !nextProps.submissionsAllIds.every(id =>
          prevState.visibleSubmissions.includes(id)
        )
      ) {
        return { visibleSubmissions: nextProps.submissionsAllIds };
      }
    }
    return null;
  }

  /**
   * Reset the CellMeasurerCache
   */
  resetCache = (): void => {
    this._cache.clearAll();
    // hack to get the container to actually resize,
    // by forcing a scroll event
    window.dispatchEvent(new Event('scroll'));
  };

  /**
   * Add a search query
   * @param searchQuery the query
   */
  addQueryFilter = (searchQuery: string): void => {
    this.resetCache();

    this.setState(prevState => ({
      visibleSubmissions: SavedListing.filterVisibleSubmissions(
        searchQuery,
        prevState.subredditFilter,
        this.props.submissionsAllIds,
        this.props.submissionsById,
        prevState.postsOrComments
      ),
      searchQuery,
    }));
  };

  /**
   * Add a subreddit filter
   * @param subredditFilter the subredditFilter
   */
  addSubredditFilter = (subredditFilter: string): void => {
    this.resetCache();

    this.setState(prevState => ({
      visibleSubmissions: SavedListing.filterVisibleSubmissions(
        prevState.searchQuery,
        subredditFilter,
        this.props.submissionsAllIds,
        this.props.submissionsById,
        prevState.postsOrComments
      ),
      subredditFilter,
    }));
  };

  handlePostsOrCommentsChange = (postsOrComments: PostsOrComments) => {
    this.resetCache();

    this.setState(prevState => ({
      visibleSubmissions: SavedListing.filterVisibleSubmissions(
        prevState.searchQuery,
        prevState.subredditFilter,
        this.props.submissionsAllIds,
        this.props.submissionsById,
        postsOrComments
      ),
      postsOrComments,
    }));
  };

  render() {
    const { error, loading, subreddits } = this.props;

    if (error) return error;

    return (
      <>
        {loading ? <LoadingGate /> : null}
        <main className="main">
          <div className="container">
            <ListingFilters
              allSubreddits={subreddits}
              queryFilter={this.state.searchQuery}
              subredditFilter={this.state.subredditFilter}
              postsOrComments={this.state.postsOrComments}
              onQueryFilterChange={this.addQueryFilter}
              onSubredditFilterChange={this.addSubredditFilter}
              onPostsOrCommentsChange={this.handlePostsOrCommentsChange}
            />
            <WindowScroller>
              {({ height, isScrolling, onChildScroll, scrollTop }) => (
                <AutoSizer onResize={() => this.resetCache()}>
                  {({ width: autoWidth }) => (
                    <List
                      autoHeight
                      height={height}
                      isScrolling={isScrolling}
                      onScroll={onChildScroll}
                      deferredMeasurementCache={this._cache}
                      rowCount={this.state.visibleSubmissions.length}
                      rowHeight={this._cache.rowHeight}
                      rowRenderer={({
                        index, // Index of row
                        isScrolling, // The List is currently being scrolled
                        isVisible, // This row is visible within the List (eg it is not an overscanned row)
                        key, // Unique key within array of rendered rows
                        parent, // Reference to the parent List (instance)
                        style, // Style object to be applied to row (to position it);
                      }) => {
                        return (
                          <CellMeasurer
                            fixedWidth
                            cache={this._cache}
                            columnIndex={0}
                            key={key}
                            rowIndex={index}
                            parent={parent}
                          >
                            <Submission
                              submission={
                                this.props.submissionsById[
                                  this.state.visibleSubmissions[index]
                                ]
                              }
                              postsOrComments={this.state.postsOrComments}
                              redditApp={this.props.redditApp}
                              style={style}
                            />
                          </CellMeasurer>
                        );
                      }}
                      scrollTop={scrollTop}
                      width={autoWidth}
                    />
                  )}
                </AutoSizer>
              )}
            </WindowScroller>
          </div>
        </main>
      </>
    );
  }

  /**
   * Filter visible submissions using the search query and subreddit filter
   * @param query the search query filter
   * @param subreddit the subreddit filter
   * @param allSubmissionIds all submission IDs
   * @param submissionsById all submissions by ID
   */
  private static filterVisibleSubmissions(
    query: string,
    subreddit: string,
    allSubmissionIds: string[],
    submissionsById: { [id: string]: RedditSubmission },
    postsOrComments: PostsOrComments
  ): string[] {
    if (!query && !subreddit && postsOrComments === 'Both')
      return allSubmissionIds;

    const res = allSubmissionIds.filter(submissionId => {
      const submission = submissionsById[submissionId];
      const submissionType = submission.kind === 't1' ? 'Comments' : 'Posts';

      // postsOrComments mismatch
      if (postsOrComments !== 'Both' && submissionType !== postsOrComments) {
        return false;
      }

      // subreddit mismatch
      if (subreddit && submission.data.subreddit !== subreddit) return false;

      // no query and subreddit match
      if (!query && submission.data.subreddit === subreddit) return true;

      // convert query to lowercase
      const lcQuery = query.toLowerCase();

      // no subreddit but there is a query, check post content
      return ifCommentOrPostDo(
        submission,
        comment => {
          return (
            comment.data.body.toLowerCase().includes(lcQuery) ||
            comment.data.link_title.toLowerCase().includes(lcQuery) ||
            comment.data.author.toLowerCase().includes(lcQuery) ||
            comment.data.link_author.toLowerCase().includes(lcQuery)
          );
        },
        post => {
          return (
            post.data.selftext.toLowerCase().includes(lcQuery) ||
            post.data.title.toLowerCase().includes(lcQuery) ||
            post.data.author.toLowerCase().includes(lcQuery)
          );
        }
      );
    });
    return res;
  }
}

const mapStateToProps = (state: AppState) => ({
  loading: state.savedListing.loading,
  error: state.savedListing.error,
  submissionsById: state.savedListing.submissionsById,
  submissionsAllIds: state.savedListing.submissionsAllIds,
  subreddits: Object.keys(state.savedListing.subreddits).sort((a, b) =>
    a.localeCompare(b)
  ),
  redditApp: state.settings.redditApp,
});

const mapDispatchToProps = {
  fetchSavedListingAsync,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedListing);
