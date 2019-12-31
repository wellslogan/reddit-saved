import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { saveAs } from 'file-saver';
import * as moment from 'moment';

import { AppState } from '@models/AppState';
import {
  setNightMode,
  setRedditApp,
  setFixedWidth,
  setTTTEnabled,
} from './settings.actions';
import { RedditApp } from '@models';
import {
  clearSubmissions,
  mergeInSubmissions,
} from '@views/listing/savedListing.actions';
import { clearUsername } from '@views/login/login.actions';
import { ToggleSwitch } from './components/toggleSwitch';
import { generateJsonBackup } from '@utils/createAndParseDiffData';
import { ImportBackup } from './components/importBackup';
import { NormalizedRedditSubmissions } from '@utils/normalization';
import { cssClasses } from '@utils/conditionalClassList';
import { Select } from '@components';
import { bindActionCreators, AnyAction, Dispatch } from 'redux';
import { RESET_STATE_ACTION } from '@app/constants';
import { updateGlobalCSSSetting } from '@utils/helpers';

type SettingsProps = {
  username?: string;
  fixedWidth: boolean;
  nightMode: boolean;
  tttEnabled: boolean;
  redditApp: RedditApp;
  setNightMode: (nightMode: boolean) => void;
  setTTTEnabled: (enabled: boolean) => void;
  setRedditApp: (app: RedditApp) => void;
  clearSubmissions: () => void;
  clearUsername: () => void;
  mergeInSubmissions: (submissions: NormalizedRedditSubmissions) => any;

  submissionsById: any;
  submissionsAllIds: string[];
  subreddits: string[];

  isOpen: boolean;
  handleClose: () => void;

  dispatch: Dispatch<AnyAction>;
} & RouteComponentProps<{}>;

const Settings: React.FunctionComponent<SettingsProps> = props => {
  const {
    isOpen,
    handleClose,
    nightMode,
    tttEnabled,
    setTTTEnabled,
    username,
    setNightMode,
    redditApp,
    setRedditApp,
    dispatch,
  } = props;
  const settingsDiv = React.createRef<HTMLDivElement>();

  const handleClickOutsideToClose = event => {
    if (
      isOpen &&
      settingsDiv.current &&
      !settingsDiv.current.contains(event.target)
    ) {
      handleClose();
    }
  };

  const handleLogout = () => {
    // reset the redux store
    dispatch({ type: RESET_STATE_ACTION });
    handleClose();

    // set night mode to system default
    const darkModeQuery = window.matchMedia('prefer-dark-mode: dark');
    const systemDarkMode = darkModeQuery.media && darkModeQuery.matches;
    setNightMode(systemDarkMode);

    props.history.push('/');
  };

  const handleDownloadBackup = () => {
    const blob = generateJsonBackup(
      props.submissionsById,
      props.submissionsAllIds,
      props.subreddits
    );
    saveAs(
      blob,
      `${moment().format('YYYY-MM-DD-HHmm')}.saved.browser.backup.json`
    );
  };

  const handleImport = parsedData => {
    props.mergeInSubmissions({
      allIds: parsedData.submissionsAllIds,
      byId: parsedData.submissionsById,
      subreddits: parsedData.subreddits,
    });

    props.history.push('/listing');
    handleClose();
  };

  React.useEffect(() => {
    // some settings require global <body> classes
    updateGlobalCSSSetting(!tttEnabled, 'disable-floating-buttons');
    updateGlobalCSSSetting(nightMode, 'dark');

    document.addEventListener('mousedown', handleClickOutsideToClose);

    return function cleanup() {
      document.removeEventListener('mousedown', handleClickOutsideToClose);
    };
  });

  return (
    <>
      <div
        className={cssClasses('settings', { 'settings-open': isOpen })}
        ref={settingsDiv}
      >
        <header>
          <h2>Settings</h2>
          <button className="clear-button" onClick={handleClose}>
            <FontAwesomeIcon icon={faTimes} size="2x" />
          </button>
        </header>
        <section>
          <label>
            <ToggleSwitch
              id="tttToggle"
              checked={nightMode}
              onToggle={() => setNightMode(!nightMode)}
            />
            <span className="pl-half">Dark mode</span>
          </label>
        </section>
        <section>
          <label>
            <ToggleSwitch
              id="tttToggle"
              checked={tttEnabled}
              onToggle={() => setTTTEnabled(!tttEnabled)}
            />
            <span className="pl-half">Show "to the top" button</span>
          </label>
        </section>
        <section>
          <label className="mb-half">Reddit app (to open links)</label>
          <Select
            options={Object.keys(RedditApp)}
            selectedValue={redditApp}
            onChange={next => setRedditApp(next)}
          />
        </section>
        <section>
          <button className="btn" onClick={handleDownloadBackup}>
            Download backup
          </button>
        </section>
        <section>
          <ImportBackup onImport={handleImport} />
        </section>
        {username ? (
          <section>
            <button className="btn" onClick={handleLogout}>
              Log out
            </button>
          </section>
        ) : null}
      </div>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  ...state.settings,
  submissionsById: state.savedListing.submissionsById,
  submissionsAllIds: state.savedListing.submissionsAllIds,
  subreddits: state.savedListing.subreddits,
  username: state.login.username,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  ...bindActionCreators(
    {
      setNightMode,
      setTTTEnabled,
      setRedditApp,
      setFixedWidth,
      clearSubmissions,
      clearUsername,
      mergeInSubmissions,
    },
    dispatch
  ),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Settings)
) as any;
