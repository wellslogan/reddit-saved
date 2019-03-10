import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FilterInput } from './filterInput';
import { TextInput } from '@components/input/input';
import { Select } from '@components/select/select';
import { RadioGroup } from '@components/radioGroup/radioGroup';
import { SelectFilter } from './selectFilter';
import { InputFilter } from './inputFilter';

type ListingFiltersProps = {
  allSubreddits: string[];
  queryFilter: string;
  onQueryFilterChange: (query: string) => void;
  subredditFilter: string;
  onSubredditFilterChange: (subreddit: string) => void;
  postsOrComments: string;
  onPostsOrCommentsChange: (postsOrComments: string) => void;
};

export const ListingFilters: React.StatelessComponent<ListingFiltersProps> = ({
  allSubreddits,
  queryFilter,
  subredditFilter,
  postsOrComments,
  onQueryFilterChange,
  onSubredditFilterChange,
  onPostsOrCommentsChange,
}) => {
  return (
    <aside className="filter-container">
      <InputFilter
        value={queryFilter}
        onChange={query => onQueryFilterChange(query)}
        placeholder="filter by content"
      />
      &nbsp;
      <SelectFilter
        selectedValue={subredditFilter}
        defaultOption="filter by subreddit"
        options={allSubreddits}
        onChange={nextSub => onSubredditFilterChange(nextSub)}
        id="subredditFilter"
      />
      &nbsp;
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
