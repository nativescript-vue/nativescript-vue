function isBundleCheckRequired($injector) {
  try {
    const $staticConfig = $injector.resolve('$staticConfig')
    const version = $staticConfig && $staticConfig.version
    const majorVersion = (version || '').split('.')[0]
    // If the major version is not available, probably we are in some new version of CLI, where the staticConfig is not available
    // So it definitely should work with bundle;
    return !majorVersion || +majorVersion < 6
  } catch (err) {
    return false
  }
}

module.exports.isBundleCheckRequired = isBundleCheckRequired
