import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { settingsReducer } from './components/settings/settings.reducer';

const finalCreateStore = composeWithDevTools(applyMiddleware(thunk))(
  createStore
);

const combinedReducers = combineReducers({
  settings: settingsReducer,
});

export const createAndPersistStore = () => {
  return finalCreateStore(combinedReducers);
};
