import { default as document } from '../renderer/DocumentNode'
import { trace } from '../util'

export const namespaceMap = {}

export function createElement(tagName, vnode) {
  trace(`CreateElement(${tagName})`)
  return document.createElement(tagName)
}

export function createElementNS(namespace, tagName) {
  trace(`CreateElementNS(${namespace}#${tagName})`)
  return document.createElementNS(namespace, tagName)
}

export function createTextNode(text) {
  trace(`CreateTextNode(${text})`)
  return document.createTextNode(text)
}

export function createComment(text) {
  trace(`CreateComment(${text})`)

  return document.createComment(text)
}

export function insertBefore(parentNode, newNode, referenceNode) {
  trace(`InsertBefore(${parentNode}, ${newNode}, ${referenceNode})`)
  parentNode.insertBefore(newNode, referenceNode)
}

export function removeChild(node, child) {
  trace(`RemoveChild(${node}, ${child})`)
  node.removeChild(child)
}

export function appendChild(node, child) {
  trace(`AppendChild(${node}, ${child})`)

  node.appendChild(child)
}

export function parentNode(node) {
  trace(`ParentNode(${node})`)

  return node.parentNode
}

export function nextSibling(node) {
  trace(`NextSibling(${node})`)

  return node.nextSibling
}

export function tagName(elementNode) {
  trace(`TagName(${elementNode})`)

  return elementNode.tagName
}

export function setTextContent(node, text) {
  trace(`SetTextContent(${node}, ${text})`)

  node.setText(text)
}

export function setAttribute(node, key, val) {
  trace(`SetAttribute(${node}, ${key}, ${val})`)

  node.setAttribute(key, val)
}
