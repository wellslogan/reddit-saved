import * as React from 'react';

type Props = {
  options: string[];
  name: string;
  value: string;
  onChange: (nextValue: string) => void;
};

export const RadioGroup: React.StatelessComponent<Props> = props => {
  const { options, name, value, onChange } = props;
  return (
    <div className="filter filter-radio">
      {options.map((option, idx) => (
        <label key={idx} className="radio-option">
          <input
            type="radio"
            name={name}
            defaultChecked={value === option}
            onChange={e => onChange(option)}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
};

RadioGroup.displayName = 'RadioGroup';
