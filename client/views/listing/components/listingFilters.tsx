import * as React from 'react';
import { TextInput } from '@components/input/input';
import { RadioGroup } from '@components/radioGroup/radioGroup';
import { SelectFilter } from './selectFilter';

type ListingFiltersProps = {
  allSubreddits: string[];
  queryFilter: string;
  onQueryFilterChange: (query: string) => void;
  subredditFilter: string;
  onSubredditFilterChange: (subreddit: string) => void;
  postsOrComments: string;
  onPostsOrCommentsChange: (postsOrComments: string) => void;
};

export const ListingFilters: React.FunctionComponent<
  ListingFiltersProps
> = props => {
  const {
    allSubreddits,
    queryFilter,
    subredditFilter,
    postsOrComments,
    onQueryFilterChange,
    onSubredditFilterChange,
    onPostsOrCommentsChange,
  } = props;

  return (
    <aside className="filter-container">
      <div className="filter">
        <TextInput
          value={queryFilter}
          onChange={onQueryFilterChange}
          onClear={() => onQueryFilterChange('')}
          inputProps={{
            placeholder: 'filter by content',
          }}
        />
      </div>
      <SelectFilter
        selectedValue={subredditFilter}
        defaultOption="filter by subreddit"
        options={allSubreddits}
        onChange={nextSub => onSubredditFilterChange(nextSub)}
        id="subredditFilter"
      />
      <RadioGroup
        options={['Both', 'Posts', 'Comments']}
        value={postsOrComments}
        onChange={next => onPostsOrCommentsChange(next)}
        name="postsorcomments"
      />
    </aside>
  );
};

ListingFilters.displayName = 'ListingFilters';
