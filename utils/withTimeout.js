function withTimeout(promise, timeout) {
  if (!promise || typeof promise.then !== 'function') {
    return Promise.reject(new Error('Invalid promise provided'));
  }
  if (timeout <= 0) {
    return Promise.reject(new RangeError('Timeout must be greater than 0'));
  }
  let timerId;

  const timeoutPromise = new Promise((_, reject) => {
    timerId = setTimeout(() => {
      reject(new Error(`Operation timed out after ${timeout} ms`));
    }, timeout);
  });

  return Promise.race([promise, timeoutPromise])
    .finally(() => {
      clearTimeout(timerId);
    });
}
export { withTimeout };