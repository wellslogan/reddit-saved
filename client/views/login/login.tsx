import * as React from 'react';
import { parse } from 'query-string';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons/faArrowCircleRight';

import { storeRedditToken } from '@utils/sessionStorage.service';
import { AppState } from '@models';
import { Link, RouteComponentProps } from 'react-router-dom';
import { setRedditToken } from './login.actions';

type StateProps = {
  submissionsAllIds: string[];
  username?: string;
  redditToken?: string;
  setRedditToken: (token: string) => void;
};

const LoginComponent: React.FunctionComponent<
  StateProps & RouteComponentProps
> = props => {
  const { username, submissionsAllIds, setRedditToken } = props;

  const handleMount = () => {
    const { success, token } = parse(props.location.search);
    if (success === 'true' && token) {
      setRedditToken(token as string);
      props.history.push('/listing');
    }
  };

  React.useEffect(handleMount, [props.location.search]);

  return (
    <main className="main">
      <div className="container">
        <>
          {username || submissionsAllIds.length ? (
            <p>
              {username ? (
                <>
                  Hi, <strong>{username}</strong>! You're already logged in,{' '}
                </>
              ) : null}
              <Link to="/listing">
                click here to browse the listing{' '}
                <FontAwesomeIcon icon={faArrowCircleRight} />
              </Link>
            </p>
          ) : (
            <>
              <a href="/api/auth/reddit">
                Click me to login <FontAwesomeIcon icon={faArrowCircleRight} />
              </a>
              <p>Or, upload a backup file to browse using the settings menu</p>
            </>
          )}
        </>
        <p>
          <Link to="/about">About</Link> Saved Browser
        </p>
      </div>
    </main>
  );
};

LoginComponent.displayName = 'LoginComponent';

const mapStateToProps = (state: AppState) => ({
  username: state.login.username,
  submissionsAllIds: state.savedListing.submissionsAllIds,
});

export default connect(
  mapStateToProps,
  { setRedditToken }
)(LoginComponent);
