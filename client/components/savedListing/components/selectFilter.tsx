import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';

type Props = {
  defaultOption?: string;
  options: string[];
  selectedValue: string;
  onChange: (nextValue: string) => void;
  id?: string;
};

export const SelectFilter: React.StatelessComponent<Props> = props => {
  const {
    defaultOption,
    options,
    selectedValue,
    onChange,
    ...baseProps
  } = props;

  return (
    <div className="filter">
      <div className="select-container">
        <FontAwesomeIcon icon={faChevronDown} />
        <select
          value={selectedValue}
          onChange={e => onChange(e.target.value)}
          {...baseProps}
        >
          {defaultOption ? <option value="">{defaultOption}</option> : null}
          {options.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

SelectFilter.displayName = 'SelectFilter';
