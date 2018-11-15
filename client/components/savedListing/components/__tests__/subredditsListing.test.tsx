import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { SubredditsListing } from '../subredditsListing';
import { MockSubredditsList } from '@app/MockData';

describe('Component: SubredditsListing', () => {
  it('should render', () => {
    const subreddits = MockSubredditsList;
    const onClickSubreddit = jest.fn();
    const { container } = render(
      <SubredditsListing {...{ subreddits, onClickSubreddit }} />
    );
    expect(container).toMatchSnapshot();
  });

  it('should call onClickSubreddit function onClick', () => {
    const subreddits = MockSubredditsList;
    const onClickSubreddit = jest.fn();
    const { getByTestId } = render(
      <SubredditsListing {...{ subreddits, onClickSubreddit }} />
    );

    fireEvent.click(getByTestId('filterSubBtn-boston'));
    expect(onClickSubreddit).toHaveBeenCalledWith('boston');
  });
});
