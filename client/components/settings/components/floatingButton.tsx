import * as React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { cssClasses } from '@utils/conditionalClassList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  onClick: () => void;
  icon: IconDefinition;
  distanceFromTop?: string;
  distanceFromBottom?: string;
  title?: string;
};

export const FloatingButton: React.FunctionComponent<Props> = props => {
  const {
    onClick,
    icon,
    distanceFromTop,
    distanceFromBottom,
    title = '',
  } = props;

  const shouldBeVisible = () => window.pageYOffset > window.innerHeight;
  const [isVisible, setIsVisible] = React.useState(shouldBeVisible());

  const handleScroll = () => setIsVisible(shouldBeVisible());

  React.useEffect(() => {
    document.addEventListener('scroll', handleScroll);

    return function cleanup() {
      document.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <div
      className={cssClasses('floating-button', {
        'floating-button-visible': isVisible,
      })}
      style={{ top: distanceFromTop, bottom: distanceFromBottom }}
    >
      <button className="clear-button" onClick={() => onClick()} title={title}>
        <FontAwesomeIcon icon={icon} size="3x" />
      </button>
    </div>
  );
};

FloatingButton.displayName = 'FloatingButton';
