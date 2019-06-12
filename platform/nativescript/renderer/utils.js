export function isView(view) {
  return view instanceof require('tns-core-modules/ui/core/view').View
}

export function isLayout(view) {
  return (
    view instanceof
    require('tns-core-modules/ui/layouts/layout-base').LayoutBase
  )
}

export function isContentView(view) {
  return view instanceof require('tns-core-modules/ui/content-view').ContentView
}

export function insertChild(parentNode, childNode, atIndex = -1) {
  if (!parentNode) {
    return
  }

  if (parentNode.meta && typeof parentNode.meta.insertChild === 'function') {
    return parentNode.meta.insertChild(parentNode, childNode, atIndex)
  }

  if (childNode.meta.skipAddToDom) {
    return
  }

  const parentView = parentNode.nativeView
  const childView = childNode.nativeView

  if (isLayout(parentView)) {
    if (childView.parent === parentView) {
      let index = parentView.getChildIndex(childView)
      if (index !== -1) {
        parentView.removeChild(childView)
      }
    }
    if (atIndex !== -1) {
      parentView.insertChild(childView, atIndex)
    } else {
      parentView.addChild(childView)
    }
  } else if (isContentView(parentView)) {
    if (childNode.nodeType === 8) {
      parentView._addView(childView, atIndex)
    } else {
      parentView.content = childView
    }
  } else if (parentView && parentView._addChildFromBuilder) {
    parentView._addChildFromBuilder(
      childNode._nativeView.constructor.name,
      childView
    )
  } else {
    // throw new Error("Parent can"t contain children: " + parent.nodeName + ", " + parent);
  }
}

export function removeChild(parentNode, childNode) {
  if (!parentNode) {
    return
  }

  if (parentNode.meta && typeof parentNode.meta.removeChild === 'function') {
    return parentNode.meta.removeChild(parentNode, childNode)
  }

  if (childNode.meta.skipAddToDom) {
    return
  }

  const parentView = parentNode.nativeView
  const childView = childNode.nativeView

  if (isLayout(parentView)) {
    parentView.removeChild(childView)
  } else if (isContentView(parentView)) {
    if (parentView.content === childView) {
      parentView.content = null
    }

    if (childNode.nodeType === 8) {
      parentView._removeView(childView)
    }
  } else if (isView(parentView)) {
    parentView._removeView(childView)
  } else {
    // throw new Error("Unknown parent type: " + parent);
  }
}
