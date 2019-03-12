import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { Settings } from '@components';
import { Link } from 'react-router-dom';

export const Header: React.StatelessComponent<any> = props => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <header className="header">
      <Settings isOpen={isOpen} handleClose={handleClose} />
      <div className="container">
        <h1>
          <Link to="/">Saved Browser (for Reddit)</Link>
        </h1>
        <button className="clear-button" onClick={_ => setIsOpen(!isOpen)}>
          <FontAwesomeIcon icon={faBars} size="2x" />
        </button>
      </div>
    </header>
  );
};

Header.displayName = 'Header';
