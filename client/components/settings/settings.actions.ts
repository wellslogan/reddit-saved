import { RedditApp } from '@models';

export const SettingsActions = {
  SET_NIGHT_MODE: 'SETTINGS:SET_NIGHT_MODE',
  SET_REDDIT_APP: 'SETTINGS:SET_REDDIT_APP',
};

export const setNightMode = (nightMode: boolean) => ({
  type: SettingsActions.SET_NIGHT_MODE,
  nightMode,
});

export const setRedditApp = (redditApp: RedditApp) => ({
  type: SettingsActions.SET_REDDIT_APP,
  redditApp,
});
