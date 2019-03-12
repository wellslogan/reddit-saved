import { SettingsState } from '@components/settings/settings.reducer';
import { SavedListingState } from '@views/listing/savedListing.reducer';
import { LoginState } from '@views/login/login.reducer';

export type AppState = {
  settings: SettingsState;
  savedListing: SavedListingState;
  login: LoginState;
};
