const { isBundleCheckRequired } = require('./helpers')

module.exports = function(hookArgs, $errors, $injector) {
  const shouldCheckBundleOption = isBundleCheckRequired($injector)

  if (shouldCheckBundleOption) {
    const bundle =
      hookArgs &&
      hookArgs.checkForChangesOpts &&
      hookArgs.checkForChangesOpts.projectChangesOptions &&
      hookArgs.checkForChangesOpts.projectChangesOptions.bundle

    if (!bundle) {
      $errors.failWithoutHelp(
        "Nativescript-vue doesn't work without --bundle option. Please specify --bundle option to the command and execute it again."
      )
    }
  }
}
