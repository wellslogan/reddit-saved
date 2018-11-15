import * as React from 'react';
import { render } from 'react-testing-library';

import { LoadingGate } from '../loadingGate';

describe('Component: LoadingGate', () => {
  it('should render', () => {
    const { container } = render(<LoadingGate />);
    expect(container).toMatchSnapshot();
  });
});
