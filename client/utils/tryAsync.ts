/**
 * A utility to allow error handling with async/await
 * without the need for try/catch blocks.
 * Inspired by https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
 * @param promise the promise to resolve
 */
function tryAsync<T = any>(
  promise: Promise<T>
): Promise<{ data?: T; err: string }> {
  return promise.then(data => ({ err: null, data })).catch(err => ({ err }));
}

export default tryAsync;
