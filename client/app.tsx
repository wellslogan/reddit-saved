import * as React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { createAndPersistStore } from './configureStore';
import { Header, TTT } from '@components';
import { Login, AboutComponent, SavedListing } from '@views';
import { setNightMode } from '@components/settings/settings.actions';
import { updateGlobalCSSSetting } from '@utils/helpers';

const { store, persistor } = createAndPersistStore();

const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

const checkDarkMode = darkModeOn => {
  store.dispatch(setNightMode(darkModeOn));
  updateGlobalCSSSetting(darkModeOn, 'dark');
};

if (darkModeMediaQuery.media !== 'not all') {
  checkDarkMode(darkModeMediaQuery.matches);
  darkModeMediaQuery.addListener(e => checkDarkMode(e.matches));
}

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <>
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
