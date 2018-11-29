import * as React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { saveAs } from 'file-saver';
import * as moment from 'moment';

import { AppState } from '@models/AppState';
import { setNightMode, setRedditApp, setFixedWidth } from './settings.actions';
import { RedditApp } from '@models';
import {
  clearSubmissions,
  mergeInSubmissions,
} from '@components/savedListing/savedListing.actions';
import { cleanSessionStorage } from '@utils/sessionStorage.service';
import { clearUsername } from '@components/login/login.actions';
import { ToggleSwitch } from './components/toggleSwitch';
import { Link } from 'react-router-dom';
import {
  generateJsonBackup,
  parseJsonBackup,
} from '@utils/createAndParseDiffData';
import { ImportBackup } from './components/importBackup';
import { NormalizedRedditSubmissions } from '@utils/normalization';

type SettingsProps = {
  fixedWidth: boolean;
  nightMode: boolean;
  redditApp: RedditApp;
  setNightMode: (boolean) => void;
  setFixedWidth: (boolean) => void;
  setRedditApp: (RedditApp) => void;
  clearSubmissions: () => void;
  clearUsername: () => void;
  mergeInSubmissions: (submissions: NormalizedRedditSubmissions) => any;

  submissionsById: any;
  submissionsAllIds: string[];
  subreddits: string[];
};

type SettingsState = {
  isOpen: boolean;
};

class Settings extends React.Component<SettingsProps, SettingsState> {
  private _settingsContainerRef;
  private _closeBtnRef;

  constructor(props: SettingsProps) {
    super(props);
    this.state = { isOpen: false };
  }

  componentWillMount() {
    // Add css class to the <body> here if we get { "nightMode": true }
    // from the store before mount
    if (this.props.nightMode) {
      if (!document.body.classList.contains('night')) {
        document.body.classList.add('night');
      }
    }
    // same for fixedWidth
    if (this.props.fixedWidth) {
      if (!document.body.classList.contains('fixed-width')) {
        document.body.classList.add('fixed-width');
      }
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutsideToClose);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutsideToClose);
  }

  handleClickOutsideToClose = event => {
    if (
      this._settingsContainerRef &&
      !this._settingsContainerRef.contains(event.target) &&
      // prevent race condition w/ close button click
      !this._closeBtnRef.contains(event.target) &&
      this.state.isOpen
    ) {
      this.setState({ isOpen: false });
    }
  };

  // update the DOM
  toggleNightCSSClass() {
    document.body.classList.toggle('night');
  }

  toggleFixedWidthCSSClass() {
    document.body.classList.toggle('fixed-width');
  }

  handleLogout = () => {
    cleanSessionStorage();
    this.props.clearSubmissions();
    this.props.clearUsername();
    window.location.href = '/';
  };

  handleImport = data => {
    // const parsed = parseJsonBackup(data);
    const parsed = data;
    this.props.mergeInSubmissions({
      allIds: parsed.submissionsAllIds,
      byId: parsed.submissionsById,
      subreddits: parsed.subreddits,
    });

    this.setState({ isOpen: false }, () => {
      window.location.href = '/listing';
    });
  };

  render() {
    const { nightMode, setNightMode, fixedWidth, setFixedWidth } = this.props;
    const areSubmissions = this.props.submissionsAllIds.length;
    return (
      <>
        <button
          className="settings-button"
          data-testid="settingsBtn"
          onClick={() =>
            this.setState(prevState => ({ isOpen: !prevState.isOpen }))
          }
          ref={ref => (this._closeBtnRef = ref)}
        >
          <FontAwesomeIcon
            icon={this.state.isOpen ? faTimes : faCog}
            size="2x"
          />
        </button>
        <div
          className={`header__settings ${
            this.state.isOpen ? 'settings-open' : ''
          }`}
          ref={ref => (this._settingsContainerRef = ref)}
        >
          <div className="header__settings__setting">
            <button
              className="btn"
              data-testid="logoutBtn"
              onClick={() => this.handleLogout()}
            >
              Logout
            </button>
          </div>
          <div className="header__settings__setting">
            <label>Night Mode</label>
            <ToggleSwitch
              id="nightModeSwitch"
              checked={nightMode}
              onToggle={() => {
                // redux dispatch
                setNightMode(!nightMode);
                // update the dom
                this.toggleNightCSSClass();
              }}
            />
          </div>
          <div className="header__settings__setting">
            <label>Use Fixed Width on desktop</label>
            <ToggleSwitch
              id="fixedWidthSwitch"
              checked={fixedWidth}
              onToggle={() => {
                // redux dispatch
                setFixedWidth(!fixedWidth);
                // update the dom
                this.toggleFixedWidthCSSClass();
              }}
            />
          </div>
          <div className="header__settings__setting">
            <label htmlFor="redditApp">Reddit App (to open links)</label>
            <select
              id="redditApp"
              onChange={e => this.props.setRedditApp(e.target.value)}
            >
              {Object.keys(RedditApp).map(key => (
                <option value={key} key={key}>
                  {RedditApp[key]}
                </option>
              ))}
            </select>
          </div>
          {areSubmissions ? (
            <div className="header__settings__setting">
              <button
                className="btn"
                data-testid="backupBtn"
                onClick={_ => {
                  const blob = generateJsonBackup(
                    this.props.submissionsById,
                    this.props.submissionsAllIds,
                    this.props.subreddits
                  );
                  saveAs(
                    blob,
                    `${moment().format(
                      'YYYY-MM-DD-HHmm'
                    )}.saved.browser.backup.json`
                  );
                }}
              >
                Download backup
              </button>
            </div>
          ) : null}
          <div className="header__settings__setting">
            <ImportBackup
              onImport={data => {
                this.handleImport(data);
              }}
            />
          </div>
          <p>
            <Link to="/about">About Saved Browser</Link>
          </p>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  ...state.settings,
  submissionsById: state.savedListing.submissionsById,
  submissionsAllIds: state.savedListing.submissionsAllIds,
  subreddits: state.savedListing.subreddits,
});

const mapDispatchToProps = {
  setNightMode,
  setRedditApp,
  setFixedWidth,
  clearSubmissions,
  clearUsername,
  mergeInSubmissions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
