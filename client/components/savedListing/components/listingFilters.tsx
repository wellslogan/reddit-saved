import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FilterInput } from './filterInput';

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
      <FilterInput
        value={queryFilter}
        onChange={query => onQueryFilterChange(query)}
        onClear={() => onQueryFilterChange('')}
        type="text"
        placeholder="type to filter"
        data-testid="filterInput"
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
          <FontAwesomeIcon icon={faTimes} />)
        </button>
      ) : null}
    </>
  );
};

ListingFilters.displayName = 'ListingFilters';
