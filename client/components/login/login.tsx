import * as React from 'react';
import { parse } from 'query-string';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons/faArrowCircleRight';

import { storeRedditToken } from '@utils/sessionStorage.service';
import { AppState } from '@models';
import { Link } from 'react-router-dom';

type LoginComponentProps = {
  location: { search: string };
  submissionsAllIds: string[];
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
    const areSubmissions = this.props.submissionsAllIds.length;
    return (
      <>
        <p>
          {username || areSubmissions ? (
            <>
              {username ? (
                <>
                  Hi, <strong>{username}</strong>! You're already logged in,{' '}
                </>
              ) : null}
              <Link to="/listing">
                click here to browse the listing{' '}
                <FontAwesomeIcon icon={faArrowCircleRight} />
              </Link>
            </>
          ) : (
            <>
              <a href="/api/auth/reddit">
                Click me to login <FontAwesomeIcon icon={faArrowCircleRight} />
              </a>
              <p>Or, upload a backup file to browse using the settings menu</p>
            </>
          )}
        </p>
        <p>
          <Link to="/about">About</Link> Saved Browser
        </p>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  username: state.login.username,
  submissionsAllIds: state.savedListing.submissionsAllIds,
});

export default connect(mapStateToProps)(LoginComponent);
