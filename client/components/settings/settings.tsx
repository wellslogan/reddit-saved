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
} from '@components/savedListing/savedListing.actions';
import { clearUsername } from '@components/login/login.actions';
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
    updateGlobalCSSSetting(!tttEnabled, 'disable-to-the-top');

    document.addEventListener('mousedown', handleClickOutsideToClose);

    return function cleanup() {
      document.removeEventListener('mousedown', handleClickOutsideToClose);
    };
  });

  return (
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
  );
};
//#region old
// class Settings extends React.Component<SettingsProps, SettingsState> {
//   private _settingsContainerRef;
//   private _closeBtnRef;

//   constructor(props: SettingsProps) {
//     super(props);
//     this.state = { isOpen: false };
//   }

//   componentWillMount() {
//     // Add css class to the <body> here if we get { "nightMode": true }
//     // from the store before mount
//     if (this.props.nightMode) {
//       if (!document.body.classList.contains('night')) {
//         document.body.classList.add('night');
//       }
//     }
//     // same for fixedWidth
//     if (this.props.fixedWidth) {
//       if (!document.body.classList.contains('fixed-width')) {
//         document.body.classList.add('fixed-width');
//       }
//     }
//   }

//   componentDidMount() {
//     document.addEventListener('mousedown', this.handleClickOutsideToClose);
//   }

//   componentWillUnmount() {
//     document.removeEventListener('mousedown', this.handleClickOutsideToClose);
//   }

//   handleClickOutsideToClose = event => {
//     if (
//       this._settingsContainerRef &&
//       !this._settingsContainerRef.contains(event.target) &&
//       // prevent race condition w/ close button click
//       !this._closeBtnRef.contains(event.target) &&
//       this.state.isOpen
//     ) {
//       this.setState({ isOpen: false });
//     }
//   };

//   // update the DOM
//   toggleNightCSSClass() {
//     document.body.classList.toggle('night');
//   }

//   toggleFixedWidthCSSClass() {
//     document.body.classList.toggle('fixed-width');
//   }

//   handleLogout = () => {
//     cleanSessionStorage();
//     this.props.clearSubmissions();
//     this.props.clearUsername();
//     window.location.href = '/';
//   };

//   handleImport = data => {
//     // const parsed = parseJsonBackup(data);
//     const parsed = data;
//     this.props.mergeInSubmissions({
//       allIds: parsed.submissionsAllIds,
//       byId: parsed.submissionsById,
//       subreddits: parsed.subreddits,
//     });

//     this.setState({ isOpen: false }, () => {
//       window.location.href = '/listing';
//     });
//   };

//   render() {
//     const { nightMode, setNightMode, fixedWidth, setFixedWidth } = this.props;
//     const areSubmissions = this.props.submissionsAllIds.length;
//     return (
//       <div
//         className={`settings ${this.state.isOpen ? 'settings-open' : ''}`}
//         ref={ref => (this._settingsContainerRef = ref)}
//       >
//         <div className="header__settings__setting">
//           <button
//             className="btn"
//             data-testid="logoutBtn"
//             onClick={() => this.handleLogout()}
//           >
//             Logout
//           </button>
//         </div>
//         <div className="header__settings__setting">
//           <label>Night Mode</label>
//           <ToggleSwitch
//             id="nightModeSwitch"
//             checked={nightMode}
//             onToggle={() => {
//               // redux dispatch
//               setNightMode(!nightMode);
//               // update the dom
//               this.toggleNightCSSClass();
//             }}
//           />
//         </div>
//         <div className="header__settings__setting">
//           <label>Use Fixed Width on desktop</label>
//           <ToggleSwitch
//             id="fixedWidthSwitch"
//             checked={fixedWidth}
//             onToggle={() => {
//               // redux dispatch
//               setFixedWidth(!fixedWidth);
//               // update the dom
//               this.toggleFixedWidthCSSClass();
//             }}
//           />
//         </div>
//         <div className="header__settings__setting">
//           <label htmlFor="redditApp">Reddit App (to open links)</label>
//           <select
//             id="redditApp"
//             onChange={e => this.props.setRedditApp(e.target.value)}
//           >
//             {Object.keys(RedditApp).map(key => (
//               <option value={key} key={key}>
//                 {RedditApp[key]}
//               </option>
//             ))}
//           </select>
//         </div>
//         {areSubmissions ? (
//           <div className="header__settings__setting">
//             <button
//               className="btn"
//               data-testid="backupBtn"
//               onClick={_ => {
//                 const blob = generateJsonBackup(
//                   this.props.submissionsById,
//                   this.props.submissionsAllIds,
//                   this.props.subreddits
//                 );
//                 saveAs(
//                   blob,
//                   `${moment().format(
//                     'YYYY-MM-DD-HHmm'
//                   )}.saved.browser.backup.json`
//                 );
//               }}
//             >
//               Download backup
//             </button>
//           </div>
//         ) : null}
//         <div className="header__settings__setting">
//           <ImportBackup
//             onImport={data => {
//               this.handleImport(data);
//             }}
//           />
//         </div>
//         <p>
//           <Link to="/about">About Saved Browser</Link>
//         </p>
//       </div>
//     );
//   }
// }
//#endregion

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
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Settings)
) as any;
