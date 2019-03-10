import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

type Props = {
  value: string;
  onChange: (nextValue: string) => void;
  label?: string;
  width?: string;
  id?: string;
  placeholder?: string;
  onClear?: () => void;
};

export const InputFilter: React.StatelessComponent<Props> = props => {
  const { value, label, onChange, onClear, id, width, placeholder } = props;

  return (
    <div className="filter" style={{ width }}>
      <input
        type="text"
        id={id}
        className="input-container__input"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />

      {/* {onClear ? (
        <button className={buttonClass} onClick={() => onClear()}>
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
      ) : null} */}
    </div>
  );
};

InputFilter.displayName = 'InputFilter';
