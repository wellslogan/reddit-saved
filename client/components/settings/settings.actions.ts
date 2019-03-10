import { RedditApp } from '@models';

export const SettingsActionTypes = {
  SET_NIGHT_MODE: 'SETTINGS:SET_NIGHT_MODE',
  SET_REDDIT_APP: 'SETTINGS:SET_REDDIT_APP',
  SET_FIXED_WIDTH: 'SETTINGS:SET_FIXED_WIDTH',
  SET_TTT_ENABLED: 'SETTINGS:SET_TTT_ENABLED',
};

export const setNightMode = (nightMode: boolean) => ({
  type: SettingsActionTypes.SET_NIGHT_MODE,
  nightMode,
});

export const setRedditApp = (redditApp: RedditApp) => ({
  type: SettingsActionTypes.SET_REDDIT_APP,
  redditApp,
});

export const setFixedWidth = (fixedWidth: boolean) => ({
  type: SettingsActionTypes.SET_FIXED_WIDTH,
  fixedWidth,
});

export const setTTTEnabled = (tttEnabled: boolean) => ({
  type: SettingsActionTypes.SET_TTT_ENABLED,
  tttEnabled,
});
