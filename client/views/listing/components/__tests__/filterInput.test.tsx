import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { FilterInput } from '../filterInput';

describe('Component: FilterInput', () => {
  it('should render', () => {
    const { container } = render(
      <FilterInput value="test" onChange={jest.fn()} onClear={jest.fn()} />
    );
    expect(container).toMatchSnapshot();
  });

  it('should call onChange function on change', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <FilterInput
        value="test"
        onChange={onChange}
        onClear={jest.fn()}
        data-testid="testInput"
      />
    );

    fireEvent.change(getByTestId('testInput'), {
      target: { value: 'some text' },
    });
    expect(onChange).toHaveBeenCalledWith('some text');
  });

  it('should call onClear function when clear button is clicked', () => {
    const onClear = jest.fn();
    const { getByTestId } = render(
      <FilterInput
        value="test"
        onChange={jest.fn()}
        onClear={onClear}
        data-testid="testInput"
      />
    );
    fireEvent.click(getByTestId('filterInputClearBtn'));
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
