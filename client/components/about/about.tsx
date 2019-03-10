import * as React from 'react';

export const AboutComponent: React.StatelessComponent<{}> = _ => (
  <div className="container">
    <h2>About Saved Browser</h2>
    <p>
      Saved Browser for reddit is an{' '}
      <a href="https://github.com/wellslogan/saved-reddit" target="_blank">
        open-source project
      </a>{' '}
      with the goal of making it easier to go through your saved posts and
      comments. None of your data is stored on our servers - once you
      authenticate with your Reddit account, we communicate directly with the
      Reddit API to present your saved content here.
    </p>
    <p>
      Please post any concerns you may have{' '}
      <a
        href="https://github.com/wellslogan/saved-reddit/issues"
        target="_blank"
      >
        on Github
      </a>{' '}
      😀
    </p>
    <p>
      Favicon provided by{' '}
      <a href="https://github.com/twitter/twemoji" target="_blank">
        twemoji
      </a>
      .
    </p>
  </div>
);

AboutComponent.displayName = 'AboutComponent';
