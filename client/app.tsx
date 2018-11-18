import * as React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { createAndPersistStore } from './configureStore';
import { Login, Settings, SavedListing, AboutComponent } from '@components';
import { mergeArrayOrder } from '@utils/createAndParseDiffData';

const { store, persistor } = createAndPersistStore();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <div className="container">
        <BrowserRouter>
          <>
            <header className="header">
              <h1>
                <Link to="/">Saved Browser for Reddit</Link>
              </h1>
              <Settings />
            </header>
            <Route path="/" exact component={Login} />
            <Route path="/about" component={AboutComponent} />
            <Route path="/listing" component={SavedListing} />
          </>
        </BrowserRouter>
      </div>
    </PersistGate>
  </Provider>
);

export default App;
