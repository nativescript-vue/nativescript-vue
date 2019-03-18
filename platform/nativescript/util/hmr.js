let hmrChecking = false

export const isHMRChecking = () => {
  return hmrChecking
}

export const resetHMRChecking = () => {
  hmrChecking = false
}

if (module.hot) {
  module.hot.addStatusHandler(status => {
    if (status === 'check') {
      hmrChecking = true
    }
  })
}
