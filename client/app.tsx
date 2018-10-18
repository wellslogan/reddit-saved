import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createAndPersistStore } from './configureStore';
import { RedditListing } from './models';
import SavedListing from './components/savedListing/savedListing';
import Settings from './components/settings/settings';

// import * as testData from '../test-data.json';

const store = createAndPersistStore();

const App = () => (
  <Provider store={store}>
    <div className="container">
      <header>
        <h1>Saved Viewer for Reddit</h1>
        <Settings />
      </header>
      <SavedListing />
    </div>
  </Provider>
);

export default App;
