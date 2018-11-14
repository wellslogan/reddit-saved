import * as React from 'react';
import { render } from 'react-dom';

import App from './app';
import './styles/main.scss';

// configure FA icons library w/ void import
import './configureIcons';

render(<App />, document.getElementById('app'));
