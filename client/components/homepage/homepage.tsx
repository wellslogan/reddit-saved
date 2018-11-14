import * as React from 'react';
import { AppState } from '@models';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

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
          <FontAwesomeIcon icon="arrow-circle-right" />
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
