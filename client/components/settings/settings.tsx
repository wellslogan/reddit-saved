import * as React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';

import { AppState } from '@models/AppState';
import { setNightMode, setRedditApp, setFixedWidth } from './settings.actions';
import { RedditApp } from '@models';
import { clearSubmissions } from '@components/savedListing/savedListing.actions';
import { cleanSessionStorage } from '@utils/sessionStorage.service';
import { clearUsername } from '@components/login/login.actions';
import { ToggleSwitch } from './components/toggleSwitch';

type SettingsProps = {
  fixedWidth: boolean;
  nightMode: boolean;
  redditApp: RedditApp;
  setNightMode: (boolean) => void;
  setFixedWidth: (boolean) => void;
  setRedditApp: (RedditApp) => void;
  clearSubmissions: () => void;
  clearUsername: () => void;
};

type SettingsState = {
  isOpen: boolean;
};

class Settings extends React.Component<SettingsProps, SettingsState> {
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

  render() {
    const { nightMode, setNightMode, fixedWidth, setFixedWidth } = this.props;
    return (
      <>
        <button
          className="link-button settings-button"
          onClick={() =>
            this.setState(prevState => ({ isOpen: !prevState.isOpen }))
          }
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
        >
          <div className="header__settings__setting">
            <button className="link-button" onClick={() => this.handleLogout()}>
              Logout
            </button>
          </div>
          <div className="header__settings__setting">
            <label>Night Mode</label>
            <ToggleSwitch
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
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  ...state.settings,
});

const mapDispatchToProps = {
  setNightMode,
  setRedditApp,
  setFixedWidth,
  clearSubmissions,
  clearUsername,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
