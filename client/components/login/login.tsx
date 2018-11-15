import * as React from 'react';
import { parse } from 'query-string';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons/faArrowCircleRight';

import { readJsonDataAsync } from '@utils/fileReaderAsync';
import { storeRedditToken } from '@utils/sessionStorage.service';
import { AppState } from '@models';
import { Link } from 'react-router-dom';

type LoginComponentProps = {
  location: { search: string };
  username?: string;
};

class LoginComponent extends React.Component<LoginComponentProps, {}> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { success, token } = parse(this.props.location.search);
    if (success === 'true' && token) {
      storeRedditToken(token);
      window.location.href = '/listing';
    }
  }

  render() {
    const { username } = this.props;
    if (username) {
      return (
        <div>
          Hi, <strong>{username}</strong>! You're already logged in,{' '}
          <Link to="/listing">
            click here to browse the listing{' '}
            <FontAwesomeIcon icon={faArrowCircleRight} />
          </Link>
        </div>
      );
    }
    return (
      <>
        <a href="/api/auth/reddit">Click me to login</a>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  username: state.login.username,
});

export default connect(mapStateToProps)(LoginComponent);

// class TestFileImport extends React.Component<any, any> {
//   private _filePickerRef;

//   constructor(props) {
//     super(props);
//     this.state = {
//       file: null,
//     };
//   }

//   onImport = async () => {
//     const f = this._filePickerRef.files.item(0);
//     const data = await readJsonDataAsync(f);
//     this.setState({
//       file: JSON.stringify(data),
//     });
//   };

//   render() {
//     return (
//       <>
//         <input
//           type="file"
//           ref={ref => {
//             this._filePickerRef = ref;
//           }}
//         />
//         <button onClick={e => this.onImport()}>Import</button>
//         <p>{this.state.file}</p>
//       </>
//     );
//   }
// }
