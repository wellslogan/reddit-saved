import * as React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { createAndPersistStore } from './configureStore';
import { Header, TTT } from '@components';
import { Login, AboutComponent, SavedListing } from '@views';

const { store, persistor } = createAndPersistStore();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <>
          <TTT />
          <Header />
          <Route path="/" exact component={Login} />
          <Route path="/about" component={AboutComponent} />
          <Route path="/listing" component={SavedListing} />
        </>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default App;
