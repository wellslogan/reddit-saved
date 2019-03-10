import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import { cssClasses } from '@utils/conditionalClassList';

export const TTT: React.FunctionComponent<{}> = () => {
  const shouldBeVisible = () => window.pageYOffset > window.innerHeight;
  const [isVisible, setIsVisible] = React.useState(shouldBeVisible());

  const handleClick = () => window.scrollTo(0, 0);
  const handleScroll = () => setIsVisible(shouldBeVisible());

  React.useEffect(() => {
    document.addEventListener('scroll', handleScroll);

    return function cleanup() {
      document.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <div
      className={cssClasses('to-the-top', {
        'to-the-top-visible': isVisible,
      })}
    >
      <button className="clear-button" onClick={handleClick}>
        <FontAwesomeIcon icon={faArrowUp} size="3x" />
      </button>
    </div>
  );
};
