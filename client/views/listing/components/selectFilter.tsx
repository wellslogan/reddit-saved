import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { cssClasses } from '@utils/conditionalClassList';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

type Props = {
  defaultOption?: string;
  options: string[];
  selectedValue: string;
  onChange: (nextValue: string) => void;
  id?: string;
};

export const SelectFilter: React.FunctionComponent<Props> = props => {
  const {
    defaultOption,
    options,
    selectedValue,
    onChange,
    ...baseProps
  } = props;

  return (
    <div className="filter">
      <div
        className={cssClasses('select-container', {
          'select-container-selected': selectedValue,
        })}
      >
        <button className="clear-button" onClick={() => onChange('')}>
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
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
