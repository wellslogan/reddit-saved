import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons/faArrowCircleRight';

import { AppState } from '@models';

type HomepageProps = {
  username?: string;
};

const Homepage: React.StatelessComponent<HomepageProps> = ({ username }) => {
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

  return <Link to="/login">Please login</Link>;
};

const mapStateToProps = (state: AppState) => ({
  ...state.login,
});

export default connect(mapStateToProps)(Homepage);
