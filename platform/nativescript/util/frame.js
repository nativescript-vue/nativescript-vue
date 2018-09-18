const frames = new Map()

export function setFrame(id, frame) {
  return frames.set(id, frame)
}

export function getFrame(id) {
  return frames.get(id)
}

export function deleteFrame(id) {
  return frames.delete(id)
}
