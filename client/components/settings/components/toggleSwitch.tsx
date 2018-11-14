import * as React from 'react';

type ToggleSwitchProps = {
  checked: boolean;
  onToggle: () => void;
};

export const ToggleSwitch: React.StatelessComponent<ToggleSwitchProps> = ({
  checked,
  onToggle,
}) => {
  return (
    <label className="switch">
      <input type="checkbox" checked={checked} onChange={() => onToggle()} />
      <span className="slider round" />
    </label>
  );
};

ToggleSwitch.displayName = 'ToggleSwitch';
