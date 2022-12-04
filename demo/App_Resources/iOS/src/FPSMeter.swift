import FPSCounter;

extension UIView {

  @objc func showFPSMeter(
  ) {
      FPSCounter.showInStatusBar()
  }

}
