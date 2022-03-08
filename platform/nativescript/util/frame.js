import { VUE_ELEMENT_REF } from '../renderer/ElementNode'

const frames = new Map()

export function setFrame(id, frame) {
  return frames.set(id, frame)
}

export function getFrame(id, fallback) {
  if (frames.has(id)) {
    return frames.get(id)
  }

  // handle a fallback case where the frame with a same id might have been unmounted, but another one with the same id exists as a fallback...
  if (fallback) {
    const frameVM = fallback[VUE_ELEMENT_REF]['__vue__']
    setFrame(id, frameVM)

    return frameVM
  }

  return null
}

export function deleteFrame(id) {
  return frames.delete(id)
}
