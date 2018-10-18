import * as React from 'react';
import { AppState } from '@models/AppState';
import { setNightMode, setRedditApp } from './settings.actions';
import { connect } from 'react-redux';
import { RedditApp } from '@models';

type SettingsProps = {
  nightMode: boolean;
  redditApp: RedditApp;
  setNightMode: (boolean) => void;
  setRedditApp: (RedditApp) => void;
};

type SettingsState = {};

class Settings extends React.Component<SettingsProps, SettingsState> {
  constructor(props: SettingsProps) {
    super(props);
  }

  componentWillMount() {
    // Add css class to the <body> here if we get { "nightMode": true }
    // from the store before mount
    if (this.props.nightMode) {
      if (!document.body.classList.contains('night')) {
        document.body.classList.add('night');
      }
    }
  }

  // update the DOM
  toggleNightCSSClass() {
    document.body.classList.toggle('night');
  }

  render() {
    const { nightMode, setNightMode } = this.props;
    return (
      <section className="header__settings">
        Night Mode{' '}
        <label className="switch">
          <input
            type="checkbox"
            checked={nightMode}
            onChange={() => {
              // redux dispatch
              setNightMode(!nightMode);
              // update the dom
              this.toggleNightCSSClass();
            }}
          />
          <span className="slider round" />
        </label>{' '}
        <label htmlFor="redditApp">Reddit App (to open links)</label>
        <select
          id="redditApp"
          onChange={e => this.props.setRedditApp(e.target.value)}
        >
          {Object.keys(RedditApp).map(key => (
            <option value={key}>{RedditApp[key]}</option>
          ))}
        </select>
      </section>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  ...state.settings,
});

const mapDispatchToProps = {
  setNightMode,
  setRedditApp,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
