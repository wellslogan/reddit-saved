import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

import { settingsReducer } from './components/settings/settings.reducer';
import { savedListingReducer } from '@components/savedListing/savedListing.reducer';
import { loginReducer } from '@components/login/login.reducer';

const finalCreateStore = composeWithDevTools(applyMiddleware(thunk))(
  createStore
);

const persistConfig = {
  key: 'root',
  storage: storageSession,
};

const combinedReducers = combineReducers({
  settings: settingsReducer,
  savedListing: savedListingReducer,
  login: loginReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const createAndPersistStore = () => {
  const store = finalCreateStore(persistedReducer);
  const persistor = persistStore(store);
  return { store, persistor };
};
