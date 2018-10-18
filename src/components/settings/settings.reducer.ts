import { SettingsActions } from './settings.actions';
import { RedditApp } from 'src/models';

export type SettingsState = {
  nightMode: boolean;
  redditApp?: RedditApp;
};

export const initialSettingsState = {
  nightMode: false,
};

export const settingsReducer = (
  state: SettingsState = initialSettingsState,
  action
) => {
  const actionHandlers = {
    [SettingsActions.SET_NIGHT_MODE]: () => ({
      ...state,
      nightMode: action.nightMode,
    }),
    [SettingsActions.SET_REDDIT_APP]: () => ({
      ...state,
      redditApp: action.redditApp,
    }),
  };

  const getNewState = actionHandlers[action.type] || (() => state);
  return getNewState();
};
