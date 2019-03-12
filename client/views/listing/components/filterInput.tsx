import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

type FilterInputProps = {
  value: string;
  onChange: (query: string) => void;
  onClear?: () => void;
} & React.InputHTMLAttributes<any>;

type FilterInputComponent = React.StatelessComponent<FilterInputProps>;

export const FilterInput: FilterInputComponent = (props: FilterInputProps) => {
  const { value, onChange, onClear, ...restProps } = props;
  return (
    <div className="input-with-button">
      <button
        className="link-button"
        onClick={() => onClear()}
        data-testid="filterInputClearBtn"
      >
        <FontAwesomeIcon icon={faTimes} size="lg" />
      </button>
      <input
        className="filter-query"
        value={value}
        onChange={e => onChange(e.target.value)}
        {...restProps}
      />
    </div>
  );
};

FilterInput.displayName = 'FilterInput';
