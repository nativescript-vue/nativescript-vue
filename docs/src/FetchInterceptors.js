export function FetchInterceptors(og_fetch) {
  fetch = (...args) => {
    const promises = [
      () => og_fetch.apply(this, args),
      ...fetch.interceptors
    ]
    return promises.reduce((prev, curr) => {
      return prev.then(curr)
    }, Promise.resolve())
  }

  fetch.interceptors = []

  return fetch;
}
