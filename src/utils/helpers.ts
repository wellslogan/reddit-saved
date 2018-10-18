import { RedditApp } from '../models';

// export const redditLink = (relativeLink: string): string =>
//   'https://reddit.com/' + relativeLink;

const appMapping = {
  [RedditApp.None]: 'https://www.reddit.com/',
  [RedditApp.Narwhal]: 'narwhal://open-url/https://www.reddit.com/',
  [RedditApp.Apollo]: 'apollo://www.reddit.com/',
};

export const redditLink = (
  relativeLink: string,
  app: RedditApp = RedditApp.None
) => {
  // some rel. links from the api start with '/' already
  if (relativeLink.startsWith('/')) {
    return appMapping[app] + relativeLink.slice(1);
  }
  return appMapping[app] + relativeLink;
};

export const htmlDecode = encodedHtmlInput => {
  var e = document.createElement('div');
  e.innerHTML = encodedHtmlInput;
  // handle case of empty input
  return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
};
