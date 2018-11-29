import { RedditApp, RedditPost, RedditComment } from '../models';

const appMapping = {
  [RedditApp.None]: 'https://www.reddit.com',
  [RedditApp.Narwhal]: 'narwhal://open-url/https://www.reddit.com',
  [RedditApp.Apollo]: 'apollo://www.reddit.com',
};

/**
 * Format reddit links - relative or absolute - for specific reddit apps
 * @param link the link to format. Formats accepted include
 * - absolute links (e.g. https://www.reddit.com/u/some-user)
 * - relative links (e.g. /u/some-user or u/some-user)
 * @param app (optional) RedditApp to use, or none (will return an absolute reddit link)
 * @returns an absolute reddit link formatted for an app (or not)
 */
export const redditLink = (
  link: string,
  app: RedditApp = RedditApp.None
): string => {
  // convert absolute to root-relative links first
  // eg. https://www.reddit.com/r/sub => r/sub
  link = link.replace(/^http[s]{0,1}:\/\/(www\.){0,1}reddit\.com/, '');

  // add beginning '/' if it's not there
  if (!link.startsWith('/')) {
    return appMapping[app] + '/' + link;
  }

  return appMapping[app] + link;
};

/**
 * Decode encoded raw html
 * @param encodedHtmlInput
 */
export const htmlDecode = encodedHtmlInput => {
  var e = document.createElement('div');
  e.innerHTML = encodedHtmlInput;
  // handle case of empty input
  return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
};

/**
 * Call the proper handler with the given item depending
 * on if it is a comment or a post
 * @param item the potential comment or post
 * @param ifComment invoked if the item is a comment
 * @param ifPost invoked if the item is a post
 */
export const ifCommentOrPostDo = (
  item: RedditComment | RedditPost,
  ifComment: (comment: RedditComment) => any,
  ifPost: (post: RedditPost) => any
): any => {
  return item.kind === 't1'
    ? ifComment(item as RedditComment)
    : ifPost(item as RedditPost);
};

/**
 * Relative links in the html provided by the reddit API
 * need to be corrected to actually go to reddit.com
 * @param htmlString the raw html string of the post or comment
 * @param app the reddit app to use
 */
export const fixRelativeLinks = (
  htmlString: string,
  app: RedditApp = RedditApp.None
): string => {
  return htmlString.replace(/\<a href="\//gm, `<a href="${appMapping[app]}/`);
};

/**
 * Waits for a set amount of time (to throttle Reddit API calls when the limit is reached)
 * @param seconds number of seconds to wait (from X-Ratelimit-Reset header)
 * @returns a Promise that resolves when `seconds` has elapsed
 */
export const waitSeconds = (seconds: number): Promise<{}> =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));
