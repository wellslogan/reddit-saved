import {
  redditLink,
  htmlDecode,
  ifCommentOrPostDo,
  fixRelativeLinks,
} from '@utils/helpers';
import { RedditApp } from '@models';
import { MockSubmissions } from '@app/MockData';

describe('Utils: helpers', () => {
  describe('Helper: redditLink', () => {
    it('should preserve absolute link with no app', () => {
      const actual = redditLink('https://www.reddit.com/u/someuser');
      const expected = 'https://www.reddit.com/u/someuser';
      expect(actual).toBe(expected);
    });

    it('should map absolute link with apollo', () => {
      const actual = redditLink(
        'https://reddit.com/u/someuser',
        RedditApp.Apollo
      );
      const expected = 'apollo://www.reddit.com/u/someuser';
      expect(actual).toBe(expected);
    });

    it('should map absolute link with narwhal', () => {
      const actual = redditLink(
        'https://reddit.com/u/someuser',
        RedditApp.Narwhal
      );
      const expected = 'narwhal://open-url/https://www.reddit.com/u/someuser';
      expect(actual).toBe(expected);
    });

    it('should handle relative link with no app', () => {
      const actual = redditLink('/u/someuser');
      const expected = 'https://www.reddit.com/u/someuser';
      expect(actual).toBe(expected);
    });

    it('should map relative link with apollo', () => {
      const actual = redditLink('/u/someuser', RedditApp.Apollo);
      const expected = 'apollo://www.reddit.com/u/someuser';
      expect(actual).toBe(expected);
    });

    it('should map relative link with narwhal', () => {
      const actual = redditLink('/u/someuser', RedditApp.Narwhal);
      const expected = 'narwhal://open-url/https://www.reddit.com/u/someuser';
      expect(actual).toBe(expected);
    });

    it('should handle relative link (no starting "/") with no app', () => {
      const actual = redditLink('u/someuser');
      const expected = 'https://www.reddit.com/u/someuser';
      expect(actual).toBe(expected);
    });

    it('should map relative link (no starting "/") with apollo', () => {
      const actual = redditLink('u/someuser', RedditApp.Apollo);
      const expected = 'apollo://www.reddit.com/u/someuser';
      expect(actual).toBe(expected);
    });

    it('should map relative link (no starting "/") with narwhal', () => {
      const actual = redditLink('u/someuser', RedditApp.Narwhal);
      const expected = 'narwhal://open-url/https://www.reddit.com/u/someuser';
      expect(actual).toBe(expected);
    });
  });

  describe('Helper: htmlDecode', () => {
    it('decodes html', () => {
      const actual = htmlDecode(
        '&lt;div&gt;&lt;h1&gt;Hello World&lt;/h1&gt;&lt;/div&gt;'
      );
      const expected = '<div><h1>Hello World</h1></div>';
      expect(actual).toBe(expected);
    });
  });

  describe('Helper: ifCommentOrPostDo', () => {
    it('should evaluate comment function if the item is a comment', () => {
      const comment = MockSubmissions[1];
      const actual = ifCommentOrPostDo(comment, comment => 1, post => 2);
      expect(comment.kind).toBe('t1');
      expect(actual).toBe(1);
    });

    it('should evaluate post function if the item is a post', () => {
      const post = MockSubmissions[0];
      const actual = ifCommentOrPostDo(post, comment => 1, post => 2);
      expect(post.kind).toBe('t3');
      expect(actual).toBe(2);
    });
  });

  describe('Helper: fixRelativeLinks', () => {
    it('should convert relative links into absolute links', () => {
      const actual = fixRelativeLinks(
        '<a href="/u/some-user">/u/some-user</a>'
      );
      const expected =
        '<a href="https://www.reddit.com/u/some-user">/u/some-user</a>';
      expect(actual).toBe(expected);
    });

    it('should add app mapping', () => {
      const actual = fixRelativeLinks(
        '<a href="/u/some-user">/u/some-user</a>',
        RedditApp.Narwhal
      );
      const expected =
        '<a href="narwhal://open-url/https://www.reddit.com/u/some-user">/u/some-user</a>';
      expect(actual).toBe(expected);
    });

    it('should work with multiple links', () => {
      const actual = fixRelativeLinks(`
        <div>
          <a href="/u/test">/u/test</a>
        </div>
        <a href="/r/subreddit">/r/subreddit</a>
        <p>
          <span>
            <a href="/r/test">/r/test</a>
          </span>
        </p>
      `);

      const expected = `
        <div>
          <a href="https://www.reddit.com/u/test">/u/test</a>
        </div>
        <a href="https://www.reddit.com/r/subreddit">/r/subreddit</a>
        <p>
          <span>
            <a href="https://www.reddit.com/r/test">/r/test</a>
          </span>
        </p>
      `;

      expect(actual).toBe(expected);
    });

    it('should not convert other absolute links', () => {
      const actual = fixRelativeLinks(`
        <a href="https://google.com">google</a>
        <a href="/u/user">/u/user</a>
      `);

      const expected = `
        <a href="https://google.com">google</a>
        <a href="https://www.reddit.com/u/user">/u/user</a>
      `;

      expect(actual).toBe(expected);
    });
  });
});
