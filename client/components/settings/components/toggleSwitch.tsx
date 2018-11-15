import * as React from 'react';

type ToggleSwitchProps = {
  checked: boolean;
  onToggle: () => void;
  id: string;
};

export const ToggleSwitch: React.StatelessComponent<ToggleSwitchProps> = ({
  checked,
  onToggle,
  id,
}) => {
  return (
    <label className="switch">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={() => onToggle()}
        data-testid={`toggleSwitch-${id}`}
      />
      <span className="slider round" />
    </label>
  );
};

ToggleSwitch.displayName = 'ToggleSwitch';
