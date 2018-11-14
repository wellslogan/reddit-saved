import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from '@components/input/input';

type ListingFiltersProps = {
  allSubreddits: string[];
  queryFilter: string;
  onQueryFilterChange: (query: string) => void;
  subredditFilter: string;
  onSubredditFilterChange: (subreddit: string) => void;
};

export const ListingFilters: React.StatelessComponent<ListingFiltersProps> = ({
  allSubreddits,
  queryFilter,
  subredditFilter,
  onQueryFilterChange,
  onSubredditFilterChange,
}) => {
  return (
    <>
      <Input
        value={queryFilter}
        onChange={e => onQueryFilterChange(e.target.value)}
        onClear={() => onQueryFilterChange('')}
        type="text"
        placeholder="type to filter"
      />{' '}
      <select
        className="listing__submissions__filter__subreddits"
        onChange={e => onSubredditFilterChange(e.target.value)}
        value={subredditFilter}
      >
        <option value="">filter by subreddit</option>
        {allSubreddits.map(sub => (
          <option key={sub} value={sub}>
            {sub}
          </option>
        ))}
      </select>
      {subredditFilter ? (
        <button
          className="badge-button clear-subreddit"
          onClick={() => onSubredditFilterChange('')}
        >
          sub: {subredditFilter} (
          <FontAwesomeIcon icon="times" />)
        </button>
      ) : null}
    </>
  );
};

ListingFilters.displayName = 'ListingFilters';
