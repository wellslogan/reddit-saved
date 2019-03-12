import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistStore, persistReducer } from 'redux-persist';
import storageLocal from 'redux-persist/lib/storage';
import * as localforage from 'localforage';

import { settingsReducer } from './components/settings/settings.reducer';
import { savedListingReducer } from '@views/listing/savedListing.reducer';
import { loginReducer } from '@views/login/login.reducer';
import { RESET_STATE_ACTION } from './constants';

const finalCreateStore = composeWithDevTools(applyMiddleware(thunk))(
  createStore
);

const persistConfig = {
  key: 'root',
  storage: localforage,
  blacklist: ['settings'],
};

const settingsPersistConfig = {
  key: 'settings',
  storage: storageLocal,
};

const combinedReducer = combineReducers({
  settings: persistReducer(settingsPersistConfig, settingsReducer),
  savedListing: savedListingReducer,
  login: loginReducer,
});

const rootReducer = (state, action) => {
  if (action.type === RESET_STATE_ACTION) {
    state = undefined;
  }
  return combinedReducer(state, action);
};

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const createAndPersistStore = () => {
  const store = finalCreateStore(persistedRootReducer);
  const persistor = persistStore(store);
  return { store, persistor };
};
