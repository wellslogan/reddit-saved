import { SettingsActionTypes } from './settings.actions';
import { RedditApp } from '@models';

export type SettingsState = {
  nightMode: boolean;
  tttEnabled: boolean;
  redditApp?: RedditApp;
};

export const initialSettingsState = {
  nightMode: false,
  tttEnabled: true,
};

export const settingsReducer = (
  state: SettingsState = initialSettingsState,
  action
) => {
  const actionHandlers = {
    [SettingsActionTypes.SET_NIGHT_MODE]: () => ({
      ...state,
      nightMode: action.nightMode,
    }),
    [SettingsActionTypes.SET_REDDIT_APP]: () => ({
      ...state,
      redditApp: action.redditApp,
    }),
    [SettingsActionTypes.SET_FIXED_WIDTH]: () => ({
      ...state,
      fixedWidth: action.fixedWidth,
    }),
    [SettingsActionTypes.SET_TTT_ENABLED]: () => ({
      ...state,
      tttEnabled: action.tttEnabled,
    }),
  };

  const getNextState = actionHandlers[action.type] || (() => state);
  return getNextState();
};
