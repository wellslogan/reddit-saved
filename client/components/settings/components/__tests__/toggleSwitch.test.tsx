import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';

import { ToggleSwitch } from '../toggleSwitch';

describe('Component: ToggleSwitch', () => {
  it('should render checked', () => {
    const { container } = render(
      <ToggleSwitch id="test" checked={true} onToggle={jest.fn()} />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render unchecked', () => {
    const { container } = render(
      <ToggleSwitch id="test" checked={false} onToggle={jest.fn()} />
    );
    expect(container).toMatchSnapshot();
  });

  it('should call onToggle function on check', () => {
    const onToggle = jest.fn();
    const { getByTestId } = render(
      <ToggleSwitch id="test" checked={false} onToggle={onToggle} />
    );
    fireEvent.click(getByTestId('toggleSwitch-test'));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
