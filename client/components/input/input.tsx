import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

type Props = {
  value: string;
  onChange: (nextValue: string) => void;
  onClear?: () => void;
  inputProps?: React.HTMLAttributes<HTMLInputElement>;
};

export const TextInput: React.FunctionComponent<Props> = props => {
  const { value, onChange, onClear, inputProps } = props;

  return (
    <div className="text-input-container">
      <input
        type="text"
        className="input-container__input"
        value={value}
        onChange={e => onChange(e.target.value)}
        {...inputProps}
      />
      {onClear && value ? (
        <button className="clear-button" onClick={() => onClear()}>
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
      ) : null}
    </div>
  );
};

TextInput.displayName = 'TextInput';
